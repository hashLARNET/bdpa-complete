import { supabase, TABLES } from '../lib/supabase';
import type { Usuario, Obra, EspacioObra, Avance, Medicion, ProgresoResumen, FiltrosProgreso } from '../types';

// ==================== AUTENTICACIÓN ====================
export const authService = {
  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) throw error;
    
    // Obtener datos del usuario
    const { data: userData } = await supabase
      .from(TABLES.USUARIOS)
      .select('*')
      .eq('email', email)
      .single();
    
    return { user: data.user, userData };
  },

  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data: userData } = await supabase
      .from(TABLES.USUARIOS)
      .select('*')
      .eq('email', user.email)
      .single();

    return { user, userData };
  }
};

// ==================== OBRAS ====================
export const obrasService = {
  async getObras(): Promise<Obra[]> {
    const { data, error } = await supabase
      .from(TABLES.OBRAS)
      .select('*')
      .order('nombre');
    
    if (error) throw error;
    return data || [];
  },

  async getObraById(id: string): Promise<Obra | null> {
    const { data, error } = await supabase
      .from(TABLES.OBRAS)
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async createObra(obra: Omit<Obra, 'id'>): Promise<Obra> {
    const { data, error } = await supabase
      .from(TABLES.OBRAS)
      .insert(obra)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};

// ==================== ESPACIOS ====================
export const espaciosService = {
  async getEspaciosByObra(obraId: string): Promise<EspacioObra[]> {
    const { data, error } = await supabase
      .from(TABLES.ESPACIOS)
      .select('*')
      .eq('obraId', obraId)
      .eq('activo', true)
      .order('torre, piso, identificador');
    
    if (error) throw error;
    return data || [];
  },

  async getEspaciosByTorrePiso(obraId: string, torre: string, piso?: number): Promise<EspacioObra[]> {
    let query = supabase
      .from(TABLES.ESPACIOS)
      .select('*')
      .eq('obraId', obraId)
      .eq('torre', torre)
      .eq('activo', true);

    if (piso !== undefined) {
      query = query.eq('piso', piso);
    }

    const { data, error } = await query.order('identificador');
    
    if (error) throw error;
    return data || [];
  },

  async getTorresDisponibles(obraId: string): Promise<string[]> {
    const { data, error } = await supabase
      .from(TABLES.ESPACIOS)
      .select('torre')
      .eq('obraId', obraId)
      .eq('activo', true);
    
    if (error) throw error;
    
    const torres = [...new Set(data?.map(item => item.torre) || [])];
    return torres.sort();
  }
};

// ==================== AVANCES ====================
export const avancesService = {
  async getAvances(filtros: FiltrosProgreso = {}): Promise<Avance[]> {
    let query = supabase
      .from(TABLES.AVANCES)
      .select(`
        *,
        espacio:espacios_obra(torre, piso, identificador, tipoEspacio),
        obra:obras(nombre)
      `);

    // Aplicar filtros
    if (filtros.obra) {
      query = query.eq('espacio.obraId', filtros.obra);
    }
    if (filtros.torre) {
      query = query.eq('espacio.torre', filtros.torre);
    }
    if (filtros.fechaDesde) {
      query = query.gte('fecha', filtros.fechaDesde);
    }
    if (filtros.fechaHasta) {
      query = query.lte('fecha', filtros.fechaHasta);
    }
    if (filtros.usuario) {
      query = query.eq('usuario', filtros.usuario);
    }

    const { data, error } = await query.order('fecha', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async createAvance(avance: Omit<Avance, 'id' | 'timestamp'>): Promise<Avance> {
    const { data, error } = await supabase
      .from(TABLES.AVANCES)
      .insert({
        ...avance,
        timestamp: new Date().toISOString()
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getProgresoResumen(obraId: string): Promise<ProgresoResumen> {
    // Obtener todos los espacios de la obra
    const espacios = await espaciosService.getEspaciosByObra(obraId);
    
    // Obtener avances más recientes por espacio
    const { data: avancesData, error } = await supabase
      .from(TABLES.AVANCES)
      .select(`
        espacioId,
        porcentaje,
        espacio:espacios_obra(torre, tipoEspacio)
      `)
      .in('espacioId', espacios.map(e => e.id));

    if (error) throw error;

    // Calcular estadísticas
    const totalEspacios = espacios.length;
    const espaciosConAvance = new Set(avancesData?.map(a => a.espacioId) || []);
    const espaciosCompletados = avancesData?.filter(a => a.porcentaje >= 100).length || 0;
    
    // Progreso por torre
    const progresoPorTorre: Record<string, number> = {};
    const progresoPorTipo: Record<string, number> = {};
    
    espacios.forEach(espacio => {
      const avancesEspacio = avancesData?.filter(a => a.espacioId === espacio.id) || [];
      const ultimoAvance = avancesEspacio.sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )[0];
      
      const porcentaje = ultimoAvance?.porcentaje || 0;
      
      // Por torre
      if (!progresoPorTorre[espacio.torre]) {
        progresoPorTorre[espacio.torre] = 0;
      }
      progresoPorTorre[espacio.torre] += porcentaje;
      
      // Por tipo
      if (!progresoPorTipo[espacio.tipoEspacio]) {
        progresoPorTipo[espacio.tipoEspacio] = 0;
      }
      progresoPorTipo[espacio.tipoEspacio] += porcentaje;
    });

    // Promediar por cantidad de espacios
    Object.keys(progresoPorTorre).forEach(torre => {
      const espaciosTorre = espacios.filter(e => e.torre === torre).length;
      progresoPorTorre[torre] = Math.round(progresoPorTorre[torre] / espaciosTorre);
    });

    Object.keys(progresoPorTipo).forEach(tipo => {
      const espaciosTipo = espacios.filter(e => e.tipoEspacio === tipo).length;
      progresoPorTipo[tipo] = Math.round(progresoPorTipo[tipo] / espaciosTipo);
    });

    const porcentajeGeneral = totalEspacios > 0 
      ? Math.round((espaciosCompletados / totalEspacios) * 100)
      : 0;

    return {
      obraId,
      totalEspacios,
      espaciosCompletados,
      porcentajeGeneral,
      progresoPorTorre,
      progresoPorTipo,
      ultimaActualizacion: new Date().toISOString()
    };
  }
};

// ==================== MEDICIONES ====================
export const medicionesService = {
  async getMediciones(filtros: FiltrosProgreso = {}): Promise<Medicion[]> {
    let query = supabase
      .from(TABLES.MEDICIONES)
      .select(`
        *,
        espacio:espacios_obra(torre, piso, identificador, tipoEspacio),
        obra:obras(nombre)
      `);

    // Aplicar filtros similares a avances
    if (filtros.obra) {
      query = query.eq('espacio.obraId', filtros.obra);
    }
    if (filtros.torre) {
      query = query.eq('espacio.torre', filtros.torre);
    }

    const { data, error } = await query.order('fecha', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async getMedicionesByEspacio(espacioId: string): Promise<Medicion[]> {
    const { data, error } = await supabase
      .from(TABLES.MEDICIONES)
      .select('*')
      .eq('espacioId', espacioId)
      .order('fecha', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async createMedicion(medicion: Omit<Medicion, 'id' | 'timestamp'>): Promise<Medicion> {
    const { data, error } = await supabase
      .from(TABLES.MEDICIONES)
      .insert({
        ...medicion,
        timestamp: new Date().toISOString()
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};