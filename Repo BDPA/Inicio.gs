// ============================================================================
// BDPA - inicio.gs - Funciones de Inicialización del Sistema
// ============================================================================

/**
 * BDPA v2.0 - Funciones de inicialización y configuración inicial
 * Archivo separado para mantener organizadas las funciones de setup
 */

// ============================================================================
// FUNCIONES DE VERIFICACIÓN Y CONFIGURACIÓN
// ============================================================================

/**
 * Verificar que el Spreadsheet existe y es accesible
 */
function verificarSpreadsheet() {
  try {
    const SPREADSHEET_ID = CONFIG.SPREADSHEET_ID || '1ilctQV0Hc__lYhNrMYd1DKvIZ7z5ou3rf9jv76au0jM';
    console.log('🔍 Verificando spreadsheet:', SPREADSHEET_ID);
    
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const nombre = spreadsheet.getName();
    const url = spreadsheet.getUrl();
    
    console.log('✅ Spreadsheet encontrado:', nombre);
    console.log('📍 URL:', url);
    
    return {
      success: true,
      id: SPREADSHEET_ID,
      nombre: nombre,
      url: url,
      hojas: spreadsheet.getSheets().length
    };
    
  } catch (error) {
    console.log('❌ Error accediendo al spreadsheet:', error.message);
    return {
      success: false,
      error: error.message,
      codigo: error.name
    };
  }
}

/**
 * Crear nuevo Spreadsheet para BDPA
 */
function crearSpreadsheetBDPA() {
  try {
    console.log('🔨 Creando nuevo spreadsheet para BDPA...');
    
    // Crear spreadsheet con nombre descriptivo
    const spreadsheet = SpreadsheetApp.create('BDPA - Base de Datos de Progreso Automatizado');
    const id = spreadsheet.getId();
    const url = spreadsheet.getUrl();
    
    console.log('✅ Spreadsheet creado exitosamente');
    console.log('🆔 ID:', id);
    console.log('📍 URL:', url);
    
    // Actualizar configuración con el nuevo ID
    PropertiesService.getScriptProperties().setProperty('SPREADSHEET_ID', id);
    console.log('⚙️ ID guardado en configuración');
    
    // Eliminar la hoja por defecto y crear estructura inicial
    const hojaDefault = spreadsheet.getSheetByName('Hoja 1') || 
                       spreadsheet.getSheetByName('Sheet1');
    if (hojaDefault) {
      spreadsheet.deleteSheet(hojaDefault);
    }
    
    return {
      success: true,
      id: id,
      nombre: spreadsheet.getName(),
      url: url,
      mensaje: 'Spreadsheet creado correctamente'
    };
    
  } catch (error) {
    console.log('❌ Error creando spreadsheet:', error.message);
    return {
      success: false,
      error: error.message,
      codigo: error.name
    };
  }
}

/**
 * Configurar ID de Spreadsheet manualmente
 */
function configurarSpreadsheetID(nuevoId) {
  try {
    if (!nuevoId) {
      throw new Error('Debe proporcionar un ID de Spreadsheet válido');
    }
    
    console.log('⚙️ Configurando nuevo Spreadsheet ID:', nuevoId);
    
    // Verificar que el ID funciona
    const spreadsheet = SpreadsheetApp.openById(nuevoId);
    const nombre = spreadsheet.getName();
    
    // Guardar en configuración
    PropertiesService.getScriptProperties().setProperty('SPREADSHEET_ID', nuevoId);
    
    console.log('✅ ID configurado correctamente');
    console.log('📊 Spreadsheet:', nombre);
    
    return {
      success: true,
      id: nuevoId,
      nombre: nombre,
      url: spreadsheet.getUrl()
    };
    
  } catch (error) {
    console.log('❌ Error configurando ID:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

// ============================================================================
// FUNCIONES DE INICIALIZACIÓN DE HOJAS
// ============================================================================

/**
 * Crear todas las hojas necesarias del sistema
 */
function crearHojasDelSistema() {
  try {
    const spreadsheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    const hojasCreadas = [];
    
    console.log('📋 Creando hojas del sistema...');
    
    // Lista de hojas a crear
    const hojasNecesarias = [
      'Usuarios',
      'Obras', 
      'Avances',
      'Materiales',
      'Categorias',
      'Movimientos',
      'Cobranzas',
      'Metas',
      'Documentos',
      'Transferencias',
      'Configuracion',
      'Logs',
      'Maquetaciones'
    ];
    
    hojasNecesarias.forEach(nombreHoja => {
      try {
        // Verificar si la hoja ya existe
        let hoja = null;
        try {
          hoja = spreadsheet.getSheetByName(nombreHoja);
        } catch (e) {
          // La hoja no existe, crear nueva
        }
        
        if (!hoja) {
          hoja = spreadsheet.insertSheet(nombreHoja);
          hojasCreadas.push(nombreHoja);
          console.log(`✅ Hoja creada: ${nombreHoja}`);
        } else {
          console.log(`ℹ️ Hoja ya existe: ${nombreHoja}`);
        }
        
      } catch (error) {
        console.log(`❌ Error creando hoja ${nombreHoja}:`, error.message);
      }
    });
    
    console.log(`🎉 Proceso completado. ${hojasCreadas.length} hojas creadas.`);
    
    return {
      success: true,
      hojasCreadas: hojasCreadas,
      totalHojas: hojasNecesarias.length
    };
    
  } catch (error) {
    console.log('❌ Error en creación de hojas:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Crear usuario administrador por defecto
 */
function crearUsuarioAdminInicial() {
  try {
    console.log('👤 Creando usuario administrador inicial...');
    
    // Verificar si ya existe
    const usuarios = obtenerDatosHoja(CONFIG.SHEETS.USUARIOS);
    if (usuarios && usuarios.length > 0) {
      console.log('ℹ️ Ya existen usuarios en el sistema');
      return {
        success: true,
        mensaje: 'Usuarios ya existen',
        usuarios: usuarios.length
      };
    }
    
    // Crear usuario admin
    const ahora = new Date().toISOString();
    const usuarioAdmin = {
      id: generarId(),
      nombre: 'Administrador',
      apellido: 'Sistema',
      usuario: 'admin',
      contrasena: 'admin123',
      rol: 'Admin',
      email: 'admin@bdpa.larnet.cl',
      telefono: '',
      activo: true,
      bloqueado: false,
      requiereCambioContrasena: true,
      fechaCreacion: ahora,
      fechaModificacion: ahora,
      usuarioCreacion: 'Sistema',
      usuarioModificacion: 'Sistema',
      ultimoAcceso: null,
      intentosFallidos: 0
    };
    
    guardarDatosHoja(CONFIG.SHEETS.USUARIOS, [usuarioAdmin]);
    
    console.log('✅ Usuario administrador creado');
    console.log('👤 Usuario: admin');
    console.log('🔑 Contraseña: admin123');
    console.log('⚠️ IMPORTANTE: Cambiar contraseña en primer login');
    
    return {
      success: true,
      usuario: 'admin',
      contrasena: 'admin123',
      mensaje: 'Usuario administrador creado correctamente'
    };
    
  } catch (error) {
    console.log('❌ Error creando usuario admin:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Crear configuración inicial del sistema
 */
function crearConfiguracionInicial() {
  try {
    console.log('⚙️ Creando configuración inicial...');
    
    const ahora = new Date().toISOString();
    const configuracionInicial = [
      {
        clave: 'nombreEmpresa',
        valor: 'Larnet Telecomunicaciones',
        tipo: 'string',
        descripcion: 'Nombre de la empresa',
        fechaCreacion: ahora,
        fechaModificacion: ahora,
        usuarioCreacion: 'Sistema',
        usuarioModificacion: 'Sistema'
      },
      {
        clave: 'emailNotificaciones',
        valor: 'notificaciones@larnet.cl',
        tipo: 'email',
        descripcion: 'Email para notificaciones del sistema',
        fechaCreacion: ahora,
        fechaModificacion: ahora,
        usuarioCreacion: 'Sistema',
        usuarioModificacion: 'Sistema'
      },
      {
        clave: 'stockMinimoGlobal',
        valor: '10',
        tipo: 'number',
        descripcion: 'Stock mínimo por defecto para materiales',
        fechaCreacion: ahora,
        fechaModificacion: ahora,
        usuarioCreacion: 'Sistema',
        usuarioModificacion: 'Sistema'
      },
      {
        clave: 'backupAutomatico',
        valor: 'true',
        tipo: 'boolean',
        descripcion: 'Activar backup automático',
        fechaCreacion: ahora,
        fechaModificacion: ahora,
        usuarioCreacion: 'Sistema',
        usuarioModificacion: 'Sistema'
      },
      {
        clave: 'versionSistema',
        valor: '2.0',
        tipo: 'string',
        descripcion: 'Versión actual del sistema BDPA',
        fechaCreacion: ahora,
        fechaModificacion: ahora,
        usuarioCreacion: 'Sistema',
        usuarioModificacion: 'Sistema'
      }
    ];
    
    guardarDatosHoja(CONFIG.SHEETS.CONFIGURACION, configuracionInicial);
    
    console.log(`✅ ${configuracionInicial.length} configuraciones creadas`);
    
    return {
      success: true,
      configuraciones: configuracionInicial.length
    };
    
  } catch (error) {
    console.log('❌ Error creando configuración:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

// ============================================================================
// FUNCIÓN PRINCIPAL DE INICIALIZACIÓN
// ============================================================================

/**
 * Inicializar sistema completo paso a paso
 */
function inicializarSistemaPasoAPaso() {
  console.log('🚀 INICIANDO CONFIGURACIÓN COMPLETA DE BDPA v2.0');
  console.log('================================================');
  
  const resultados = {
    pasos: [],
    errores: [],
    exitoso: true
  };
  
  try {
    // Paso 1: Verificar Spreadsheet
    console.log('\n📋 PASO 1: Verificando Spreadsheet...');
    const verificacion = verificarSpreadsheet();
    resultados.pasos.push({ paso: 'verificacion', resultado: verificacion });
    
    if (!verificacion.success) {
      console.log('📋 Spreadsheet no encontrado, creando uno nuevo...');
      const creacion = crearSpreadsheetBDPA();
      resultados.pasos.push({ paso: 'creacion', resultado: creacion });
      
      if (!creacion.success) {
        throw new Error('No se pudo crear el spreadsheet: ' + creacion.error);
      }
    }
    
    // Paso 2: Crear hojas del sistema
    console.log('\n📊 PASO 2: Creando hojas del sistema...');
    const hojas = crearHojasDelSistema();
    resultados.pasos.push({ paso: 'hojas', resultado: hojas });
    
    if (!hojas.success) {
      resultados.errores.push('Error creando hojas: ' + hojas.error);
    }
    
    // Paso 3: Crear usuario administrador
    console.log('\n👤 PASO 3: Creando usuario administrador...');
    const admin = crearUsuarioAdminInicial();
    resultados.pasos.push({ paso: 'admin', resultado: admin });
    
    if (!admin.success) {
      resultados.errores.push('Error creando admin: ' + admin.error);
    }
    
    // Paso 4: Configuración inicial
    console.log('\n⚙️ PASO 4: Creando configuración inicial...');
    const config = crearConfiguracionInicial();
    resultados.pasos.push({ paso: 'configuracion', resultado: config });
    
    if (!config.success) {
      resultados.errores.push('Error en configuración: ' + config.error);
    }
    
    // Resumen final
    console.log('\n🎉 INICIALIZACIÓN COMPLETADA');
    console.log('============================');
    
    if (resultados.errores.length === 0) {
      console.log('✅ Sistema inicializado correctamente');
      console.log('👤 Usuario: admin');
      console.log('🔑 Contraseña: admin123');
      console.log('⚠️ IMPORTANTE: Cambiar contraseña en primer login');
      
      // Log de éxito
      logAction('Sistema Inicializado', {
        version: CONFIG.VERSION,
        hojas: hojas.hojasCreadas,
        timestamp: new Date().toISOString()
      });
      
    } else {
      console.log('⚠️ Inicialización completada con advertencias:');
      resultados.errores.forEach(error => console.log('  - ' + error));
      resultados.exitoso = false;
    }
    
    return {
      success: resultados.errores.length === 0,
      resultados: resultados,
      mensaje: resultados.errores.length === 0 ? 
        'Sistema inicializado correctamente' : 
        'Inicialización completada con advertencias'
    };
    
  } catch (error) {
    console.log('❌ ERROR CRÍTICO EN INICIALIZACIÓN:', error.message);
    resultados.errores.push(error.message);
    resultados.exitoso = false;
    
    return {
      success: false,
      error: error.message,
      resultados: resultados
    };
  }
}

// ============================================================================
// FUNCIONES DE DIAGNÓSTICO
// ============================================================================

/**
 * Diagnosticar estado del sistema
 */
function diagnosticarSistema() {
  console.log('🔍 DIAGNÓSTICO DEL SISTEMA BDPA');
  console.log('===============================');
  
  const diagnostico = {
    spreadsheet: null,
    hojas: [],
    usuarios: null,
    configuracion: null,
    estado: 'unknown'
  };
  
  try {
    // Verificar spreadsheet
    const verificacion = verificarSpreadsheet();
    diagnostico.spreadsheet = verificacion;
    
    if (verificacion.success) {
      // Verificar hojas
      const spreadsheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
      const hojas = spreadsheet.getSheets().map(hoja => hoja.getName());
      diagnostico.hojas = hojas;
      
      console.log(`📊 Hojas encontradas: ${hojas.length}`);
      hojas.forEach(hoja => console.log(`  - ${hoja}`));
      
      // Verificar usuarios
      try {
        const usuarios = obtenerDatosHoja(CONFIG.SHEETS.USUARIOS);
        diagnostico.usuarios = {
          existe: true,
          cantidad: usuarios ? usuarios.length : 0
        };
        console.log(`👤 Usuarios en sistema: ${diagnostico.usuarios.cantidad}`);
      } catch (e) {
        diagnostico.usuarios = { existe: false, error: e.message };
        console.log('❌ Error accediendo a usuarios:', e.message);
      }
      
      // Verificar configuración
      try {
        const config = obtenerDatosHoja(CONFIG.SHEETS.CONFIGURACION);
        diagnostico.configuracion = {
          existe: true,
          cantidad: config ? config.length : 0
        };
        console.log(`⚙️ Configuraciones: ${diagnostico.configuracion.cantidad}`);
      } catch (e) {
        diagnostico.configuracion = { existe: false, error: e.message };
        console.log('❌ Error accediendo a configuración:', e.message);
      }
      
      // Determinar estado general
      if (diagnostico.usuarios?.existe && diagnostico.configuracion?.existe) {
        diagnostico.estado = 'inicializado';
        console.log('✅ Sistema correctamente inicializado');
      } else {
        diagnostico.estado = 'parcial';
        console.log('⚠️ Sistema parcialmente inicializado');
      }
      
    } else {
      diagnostico.estado = 'no_inicializado';
      console.log('❌ Sistema no inicializado');
    }
    
    return diagnostico;
    
  } catch (error) {
    console.log('❌ Error en diagnóstico:', error.message);
    diagnostico.estado = 'error';
    diagnostico.error = error.message;
    return diagnostico;
  }
}

/**
 * Resetear sistema completo (usar con cuidado)
 */
function resetearSistemaCompleto() {
  const confirmacion = Browser.msgBox(
    'ADVERTENCIA',
    '¿Está seguro de que desea resetear completamente el sistema?\n\n' +
    'Esto eliminará TODOS los datos incluyendo:\n' +
    '- Usuarios\n' +
    '- Obras\n' +
    '- Avances\n' +
    '- Inventario\n' +
    '- Configuración\n\n' +
    'Esta acción NO se puede deshacer.',
    Browser.Buttons.YES_NO
  );
  
  if (confirmacion !== Browser.Buttons.YES) {
    console.log('ℹ️ Reseteo cancelado por el usuario');
    return { success: false, mensaje: 'Operación cancelada' };
  }
  
  try {
    console.log('🔥 RESETEANDO SISTEMA COMPLETO...');
    
    const spreadsheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    const hojas = spreadsheet.getSheets();
    
    // Eliminar todas las hojas existentes
    hojas.forEach(hoja => {
      try {
        spreadsheet.deleteSheet(hoja);
        console.log(`🗑️ Hoja eliminada: ${hoja.getName()}`);
      } catch (e) {
        console.log(`⚠️ No se pudo eliminar: ${hoja.getName()}`);
      }
    });
    
    // Crear hoja temporal
    spreadsheet.insertSheet('Temp');
    
    // Limpiar propiedades
    PropertiesService.getScriptProperties().deleteAll();
    
    console.log('✅ Sistema reseteado completamente');
    console.log('ℹ️ Ejecute inicializarSistemaPasoAPaso() para reinicializar');
    
    return {
      success: true,
      mensaje: 'Sistema reseteado correctamente'
    };
    
  } catch (error) {
    console.log('❌ Error en reseteo:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

// ============================================================================
// EXPORTACIÓN DE FUNCIONES
// ============================================================================

// Funciones principales disponibles:
// - verificarSpreadsheet()
// - crearSpreadsheetBDPA()
// - inicializarSistemaPasoAPaso()
// - diagnosticarSistema()
// - resetearSistemaCompleto()

console.log('📁 inicio.gs cargado correctamente');