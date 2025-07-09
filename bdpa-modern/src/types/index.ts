// Tipos principales del sistema BDPA
export interface Usuario {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  rol: 'Admin' | 'Supervisor' | 'Tecnico';
  activo: boolean;
  ultimoAcceso?: string;
}

export interface Obra {
  id: string;
  nombre: string;
  direccion: string;
  estado: 'En progreso' | 'Completada' | 'Pausada';
  fechaInicio: string;
  fechaTermino?: string;
  empresa: string;
}

export interface EspacioObra {
  id: string;
  obraId: string;
  torre: string;
  piso?: number;
  sector?: string;
  tipoEspacio: 'Unidad' | 'SOTU' | 'Shaft' | 'Lateral' | 'Antena';
  identificador: string;
  activo: boolean;
}

export interface Avance {
  id: string;
  fecha: string;
  espacioId: string;
  categoria: string;
  porcentaje: number;
  observaciones?: string;
  fotos?: string[];
  usuario: string;
  timestamp: string;
}

export interface Medicion {
  id: string;
  fecha: string;
  espacioId: string;
  tipoMedicion: 'alambrico-t1' | 'alambrico-t2' | 'coaxial' | 'fibra' | 'wifi' | 'certificacion';
  valores: Record<string, number | string>;
  estado: 'OK' | 'ADVERTENCIA' | 'FALLA';
  observaciones?: string;
  usuario: string;
  timestamp: string;
}

export interface ProgresoResumen {
  obraId: string;
  totalEspacios: number;
  espaciosCompletados: number;
  porcentajeGeneral: number;
  progresoPorTorre: Record<string, number>;
  progresoPorTipo: Record<string, number>;
  ultimaActualizacion: string;
}

export interface FiltrosProgreso {
  obra?: string;
  torre?: string;
  tipoEspacio?: string;
  fechaDesde?: string;
  fechaHasta?: string;
  usuario?: string;
  estado?: string;
}