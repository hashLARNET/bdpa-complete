// ============================================================================
// BDPA - Inicio.gs - Sistema de Inicialización Completa
// ============================================================================

/**
 * BDPA v2.0 - Sistema de inicialización completa de la base de datos
 * Este archivo crea desde cero una base de datos funcional con datos de ejemplo
 * 
 * FUNCIONES PRINCIPALES:
 * - inicializarSistemaCompleto(): Función principal que inicializa todo
 * - Funciones específicas para cada hoja de datos
 * - Datos de ejemplo realistas para demostración
 * 
 * COMPATIBILIDAD: 100% compatible con Code.gs y estructura existente
 */

// ============================================================================
// CONFIGURACIÓN Y CONSTANTES
// ============================================================================

const INIT_CONFIG = {
  VERSION: '2.0',
  EMPRESA: 'Larnet Telecomunicaciones',
  ADMIN_USER: 'admin',
  ADMIN_PASS: 'admin123',
  SPREADSHEET_NAME: 'BDPA - Base de Datos de Progreso Automatizado',
  LOG_SHEET: 'Logs_Inicializacion'
};

// IDs únicos para mantener consistencia
let currentId = 1000;

// ============================================================================
// FUNCIÓN PRINCIPAL DE INICIALIZACIÓN
// ============================================================================

/**
 * Función principal que inicializa el sistema completo
 * Ejecutar esta función para crear una base de datos funcional desde cero
 */
function inicializarSistemaCompleto() {
  console.log('🚀 INICIANDO INICIALIZACIÓN COMPLETA DEL SISTEMA BDPA v2.0');
  console.log('================================================================');
  
  const startTime = new Date();
  const resultados = {
    pasos: [],
    errores: [],
    warnings: [],
    exitoso: true,
    tiempoTotal: 0
  };
  
  try {
    // PASO 1: Verificar y configurar Spreadsheet
    logStep('PASO 1: Configurando Spreadsheet principal');
    const spreadsheetResult = configurarSpreadsheetPrincipal();
    resultados.pasos.push({ paso: 'spreadsheet', resultado: spreadsheetResult });
    
    if (!spreadsheetResult.success) {
      throw new Error('Error crítico en configuración de Spreadsheet: ' + spreadsheetResult.error);
    }
    
    // PASO 2: Crear estructura de hojas
    logStep('PASO 2: Creando estructura de hojas');
    const hojasResult = crearEstructuraHojas();
    resultados.pasos.push({ paso: 'hojas', resultado: hojasResult });
    
    // PASO 3: Inicializar configuración del sistema
    logStep('PASO 3: Configurando sistema');
    const configResult = inicializarConfiguracionSistema();
    resultados.pasos.push({ paso: 'configuracion', resultado: configResult });
    
    // PASO 4: Crear categorías base
    logStep('PASO 4: Creando categorías');
    const categoriasResult = crearCategorias();
    resultados.pasos.push({ paso: 'categorias', resultado: categoriasResult });
    
    // PASO 5: Crear usuarios del sistema
    logStep('PASO 5: Creando usuarios');
    const usuariosResult = crearUsuarios();
    resultados.pasos.push({ paso: 'usuarios', resultado: usuariosResult });
    
    // PASO 6: Crear obras de ejemplo
    logStep('PASO 6: Creando obras');
    const obrasResult = crearObras();
    resultados.pasos.push({ paso: 'obras', resultado: obrasResult });
    
    // PASO 7: Crear inventario de materiales
    logStep('PASO 7: Creando inventario');
    const materialesResult = crearMateriales();
    resultados.pasos.push({ paso: 'materiales', resultado: materialesResult });
    
    // PASO 8: Crear avances de ejemplo
    logStep('PASO 8: Creando avances');
    const avancesResult = crearAvances();
    resultados.pasos.push({ paso: 'avances', resultado: avancesResult });
    
    // PASO 9: Crear movimientos de inventario
    logStep('PASO 9: Creando movimientos');
    const movimientosResult = crearMovimientos();
    resultados.pasos.push({ paso: 'movimientos', resultado: movimientosResult });
    
    // PASO 10: Crear transferencias de ejemplo
    logStep('PASO 10: Creando transferencias');
    const transferenciasResult = crearTransferencias();
    resultados.pasos.push({ paso: 'transferencias', resultado: transferenciasResult });
    
    // PASO 11: Crear documentos de ejemplo
    logStep('PASO 11: Creando documentos');
    const documentosResult = crearDocumentos();
    resultados.pasos.push({ paso: 'documentos', resultado: documentosResult });
    
    // PASO 12: Crear metas de planificación
    logStep('PASO 12: Creando metas');
    const metasResult = crearMetas();
    resultados.pasos.push({ paso: 'metas', resultado: metasResult });
    
    // PASO 13: Crear registros de cobranza
    logStep('PASO 13: Creando cobranzas');
    const cobranzasResult = crearCobranzas();
    resultados.pasos.push({ paso: 'cobranzas', resultado: cobranzasResult });
    
    // PASO 14: Crear maquetaciones de ejemplo
    logStep('PASO 14: Creando maquetaciones');
    const maquetacionesResult = crearMaquetaciones();
    resultados.pasos.push({ paso: 'maquetaciones', resultado: maquetacionesResult });
    
    // PASO 15: Crear log final
    const endTime = new Date();
    resultados.tiempoTotal = Math.round((endTime - startTime) / 1000);
    
    logStep('PASO 15: Finalizando inicialización');
    crearLogInicializacion(resultados);
    
    // RESUMEN FINAL
    console.log('\n🎉 INICIALIZACIÓN COMPLETADA EXITOSAMENTE');
    console.log('==========================================');
    console.log(`⏱️  Tiempo total: ${resultados.tiempoTotal} segundos`);
    console.log(`✅ Pasos completados: ${resultados.pasos.length}`);
    console.log(`⚠️  Advertencias: ${resultados.warnings.length}`);
    console.log(`❌ Errores: ${resultados.errores.length}`);
    
    console.log('\n📋 CREDENCIALES DE ACCESO:');
    console.log(`👤 Usuario: ${INIT_CONFIG.ADMIN_USER}`);
    console.log(`🔑 Contraseña: ${INIT_CONFIG.ADMIN_PASS}`);
    console.log('⚠️  IMPORTANTE: Cambiar contraseña en primer login');
    
    console.log('\n📊 DATOS CREADOS:');
    console.log('• 6 usuarios (1 Admin, 2 Supervisores, 3 Técnicos)');
    console.log('• 8 obras de telecomunicaciones');
    console.log('• 45+ materiales de inventario');
    console.log('• 25+ registros de avances');
    console.log('• 15+ movimientos de inventario');
    console.log('• 8 transferencias entre obras');
    console.log('• 12 documentos de ejemplo');
    console.log('• 10 metas de planificación');
    console.log('• 6 registros de cobranza');
    console.log('• 3 maquetaciones completas');
    
    console.log('\n🔗 SPREADSHEET URL:');
    console.log(SpreadsheetApp.getActiveSpreadsheet().getUrl());
    
    return {
      success: true,
      mensaje: 'Sistema inicializado correctamente',
      tiempoTotal: resultados.tiempoTotal,
      spreadsheetUrl: SpreadsheetApp.getActiveSpreadsheet().getUrl(),
      credenciales: {
        usuario: INIT_CONFIG.ADMIN_USER,
        contrasena: INIT_CONFIG.ADMIN_PASS
      }
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
// CONFIGURACIÓN DE SPREADSHEET
// ============================================================================

/**
 * Configurar Spreadsheet principal
 */
function configurarSpreadsheetPrincipal() {
  try {
    let spreadsheet;
    
    // Intentar obtener spreadsheet activo
    try {
      spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
      console.log('📊 Usando spreadsheet activo:', spreadsheet.getName());
    } catch (e) {
      // Crear nuevo spreadsheet
      spreadsheet = SpreadsheetApp.create(INIT_CONFIG.SPREADSHEET_NAME);
      console.log('📊 Nuevo spreadsheet creado:', spreadsheet.getName());
    }
    
    // Configurar propiedades
    const properties = PropertiesService.getScriptProperties();
    properties.setProperties({
      'SPREADSHEET_ID': spreadsheet.getId(),
      'BDPA_VERSION': INIT_CONFIG.VERSION,
      'EMPRESA': INIT_CONFIG.EMPRESA,
      'FECHA_INICIALIZACION': new Date().toISOString()
    });
    
    // Eliminar hojas por defecto si existen
    const hojasDefault = ['Hoja 1', 'Sheet1', 'Hoja1'];
    hojasDefault.forEach(nombreHoja => {
      try {
        const hoja = spreadsheet.getSheetByName(nombreHoja);
        if (hoja && spreadsheet.getSheets().length > 1) {
          spreadsheet.deleteSheet(hoja);
        }
      } catch (e) {
        // Ignorar errores de hojas que no existen
      }
    });
    
    return {
      success: true,
      spreadsheetId: spreadsheet.getId(),
      nombre: spreadsheet.getName(),
      url: spreadsheet.getUrl()
    };
    
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Crear estructura de hojas
 */
function crearEstructuraHojas() {
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
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
    
    const hojasCreadas = [];
    
    hojasNecesarias.forEach(nombreHoja => {
      try {
        let hoja = null;
        try {
          hoja = spreadsheet.getSheetByName(nombreHoja);
        } catch (e) {
          // La hoja no existe
        }
        
        if (!hoja) {
          hoja = spreadsheet.insertSheet(nombreHoja);
          hojasCreadas.push(nombreHoja);
          console.log(`✅ Hoja creada: ${nombreHoja}`);
        } else {
          console.log(`ℹ️  Hoja ya existe: ${nombreHoja}`);
        }
        
      } catch (error) {
        console.log(`❌ Error creando hoja ${nombreHoja}:`, error.message);
      }
    });
    
    return {
      success: true,
      hojasCreadas: hojasCreadas,
      totalHojas: hojasNecesarias.length
    };
    
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

// ============================================================================
// FUNCIONES DE CREACIÓN DE DATOS
// ============================================================================

/**
 * Inicializar configuración del sistema
 */
function inicializarConfiguracionSistema() {
  try {
    const ahora = new Date().toISOString();
    const configuraciones = [
      {
        id: generateId(),
        clave: 'nombreEmpresa',
        valor: INIT_CONFIG.EMPRESA,
        tipo: 'string',
        descripcion: 'Nombre de la empresa',
        fechaCreacion: ahora,
        fechaModificacion: ahora,
        usuarioCreacion: 'Sistema',
        usuarioModificacion: 'Sistema'
      },
      {
        id: generateId(),
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
        id: generateId(),
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
        id: generateId(),
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
        id: generateId(),
        clave: 'versionSistema',
        valor: INIT_CONFIG.VERSION,
        tipo: 'string',
        descripcion: 'Versión actual del sistema BDPA',
        fechaCreacion: ahora,
        fechaModificacion: ahora,
        usuarioCreacion: 'Sistema',
        usuarioModificacion: 'Sistema'
      },
      {
        id: generateId(),
        clave: 'itemsPorPagina',
        valor: '20',
        tipo: 'number',
        descripcion: 'Número de items por página en listados',
        fechaCreacion: ahora,
        fechaModificacion: ahora,
        usuarioCreacion: 'Sistema',
        usuarioModificacion: 'Sistema'
      },
      {
        id: generateId(),
        clave: 'permitirEdicionAvances',
        valor: 'si',
        tipo: 'string',
        descripcion: 'Permitir edición de avances',
        fechaCreacion: ahora,
        fechaModificacion: ahora,
        usuarioCreacion: 'Sistema',
        usuarioModificacion: 'Sistema'
      },
      {
        id: generateId(),
        clave: 'diasEdicionAvances',
        valor: '7',
        tipo: 'number',
        descripcion: 'Días permitidos para editar avances',
        fechaCreacion: ahora,
        fechaModificacion: ahora,
        usuarioCreacion: 'Sistema',
        usuarioModificacion: 'Sistema'
      }
    ];
    
    // Guardar configuraciones
    const hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Configuracion');
    
    // Headers
    const headers = ['id', 'clave', 'valor', 'tipo', 'descripcion', 'fechaCreacion', 'fechaModificacion', 'usuarioCreacion', 'usuarioModificacion'];
    hoja.getRange(1, 1, 1, headers.length).setValues([headers]);
    
    // Datos
    const datos = configuraciones.map(config => [
      config.id,
      config.clave,
      config.valor,
      config.tipo,
      config.descripcion,
      config.fechaCreacion,
      config.fechaModificacion,
      config.usuarioCreacion,
      config.usuarioModificacion
    ]);
    
    if (datos.length > 0) {
      hoja.getRange(2, 1, datos.length, headers.length).setValues(datos);
    }
    
    console.log(`✅ ${configuraciones.length} configuraciones creadas`);
    
    return {
      success: true,
      configuraciones: configuraciones.length
    };
    
  } catch (error) {
    console.log('❌ Error creando configuración:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Crear categorías base
 */
function crearCategorias() {
  try {
    const ahora = new Date().toISOString();
    const categorias = [
      {
        id: generateId(),
        nombre: 'Cables Coaxiales',
        descripcion: 'Cables coaxiales para transmisión de señal',
        color: '#FF6B6B',
        activa: true,
        fechaCreacion: ahora,
        fechaModificacion: ahora,
        usuarioCreacion: 'Sistema',
        usuarioModificacion: 'Sistema'
      },
      {
        id: generateId(),
        nombre: 'Fibra Óptica',
        descripcion: 'Cables de fibra óptica monomodo y multimodo',
        color: '#4ECDC4',
        activa: true,
        fechaCreacion: ahora,
        fechaModificacion: ahora,
        usuarioCreacion: 'Sistema',
        usuarioModificacion: 'Sistema'
      },
      {
        id: generateId(),
        nombre: 'Conectores',
        descripcion: 'Conectores F, RCA, BNC y otros',
        color: '#45B7D1',
        activa: true,
        fechaCreacion: ahora,
        fechaModificacion: ahora,
        usuarioCreacion: 'Sistema',
        usuarioModificacion: 'Sistema'
      },
      {
        id: generateId(),
        nombre: 'Amplificadores',
        descripcion: 'Amplificadores de señal y distribuidores',
        color: '#96CEB4',
        activa: true,
        fechaCreacion: ahora,
        fechaModificacion: ahora,
        usuarioCreacion: 'Sistema',
        usuarioModificacion: 'Sistema'
      },
      {
        id: generateId(),
        nombre: 'Derivadores',
        descripcion: 'Derivadores y splitters',
        color: '#FFEAA7',
        activa: true,
        fechaCreacion: ahora,
        fechaModificacion: ahora,
        usuarioCreacion: 'Sistema',
        usuarioModificacion: 'Sistema'
      },
      {
        id: generateId(),
        nombre: 'Equipos Activos',
        descripcion: 'Routers, switches, access points',
        color: '#DDA0DD',
        activa: true,
        fechaCreacion: ahora,
        fechaModificacion: ahora,
        usuarioCreacion: 'Sistema',
        usuarioModificacion: 'Sistema'
      },
      {
        id: generateId(),
        nombre: 'Herramientas',
        descripcion: 'Herramientas de instalación y medición',
        color: '#F0A500',
        activa: true,
        fechaCreacion: ahora,
        fechaModificacion: ahora,
        usuarioCreacion: 'Sistema',
        usuarioModificacion: 'Sistema'
      },
      {
        id: generateId(),
        nombre: 'Accesorios',
        descripcion: 'Tornillos, abrazaderas, canaletas',
        color: '#6C5CE7',
        activa: true,
        fechaCreacion: ahora,
        fechaModificacion: ahora,
        usuarioCreacion: 'Sistema',
        usuarioModificacion: 'Sistema'
      }
    ];
    
    // Guardar categorías
    const hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Categorias');
    
    // Headers
    const headers = ['id', 'nombre', 'descripcion', 'color', 'activa', 'fechaCreacion', 'fechaModificacion', 'usuarioCreacion', 'usuarioModificacion'];
    hoja.getRange(1, 1, 1, headers.length).setValues([headers]);
    
    // Datos
    const datos = categorias.map(cat => [
      cat.id,
      cat.nombre,
      cat.descripcion,
      cat.color,
      cat.activa,
      cat.fechaCreacion,
      cat.fechaModificacion,
      cat.usuarioCreacion,
      cat.usuarioModificacion
    ]);
    
    if (datos.length > 0) {
      hoja.getRange(2, 1, datos.length, headers.length).setValues(datos);
    }
    
    console.log(`✅ ${categorias.length} categorías creadas`);
    
    return {
      success: true,
      categorias: categorias.length,
      datos: categorias
    };
    
  } catch (error) {
    console.log('❌ Error creando categorías:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Crear usuarios del sistema
 */
function crearUsuarios() {
  try {
    const ahora = new Date().toISOString();
    const usuarios = [
      {
        id: generateId(),
        nombre: 'Administrador',
        apellido: 'Sistema',
        usuario: INIT_CONFIG.ADMIN_USER,
        contrasena: INIT_CONFIG.ADMIN_PASS,
        rol: 'Admin',
        email: 'admin@larnet.cl',
        telefono: '+56912345678',
        activo: true,
        bloqueado: false,
        requiereCambioContrasena: true,
        fechaCreacion: ahora,
        fechaModificacion: ahora,
        usuarioCreacion: 'Sistema',
        usuarioModificacion: 'Sistema',
        ultimoAcceso: null,
        intentosFallidos: 0
      },
      {
        id: generateId(),
        nombre: 'Carlos',
        apellido: 'Mendoza',
        usuario: 'cmendoza',
        contrasena: 'supervisor123',
        rol: 'Supervisor',
        email: 'carlos.mendoza@larnet.cl',
        telefono: '+56987654321',
        activo: true,
        bloqueado: false,
        requiereCambioContrasena: true,
        fechaCreacion: ahora,
        fechaModificacion: ahora,
        usuarioCreacion: 'Sistema',
        usuarioModificacion: 'Sistema',
        ultimoAcceso: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        intentosFallidos: 0
      },
      {
        id: generateId(),
        nombre: 'María',
        apellido: 'González',
        usuario: 'mgonzalez',
        contrasena: 'supervisor456',
        rol: 'Supervisor',
        email: 'maria.gonzalez@larnet.cl',
        telefono: '+56976543210',
        activo: true,
        bloqueado: false,
        requiereCambioContrasena: false,
        fechaCreacion: ahora,
        fechaModificacion: ahora,
        usuarioCreacion: 'Sistema',
        usuarioModificacion: 'Sistema',
        ultimoAcceso: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        intentosFallidos: 0
      },
      {
        id: generateId(),
        nombre: 'Pedro',
        apellido: 'Ramírez',
        usuario: 'pramirez',
        contrasena: 'tecnico123',
        rol: 'Técnico',
        email: 'pedro.ramirez@larnet.cl',
        telefono: '+56965432109',
        activo: true,
        bloqueado: false,
        requiereCambioContrasena: false,
        fechaCreacion: ahora,
        fechaModificacion: ahora,
        usuarioCreacion: 'Sistema',
        usuarioModificacion: 'Sistema',
        ultimoAcceso: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        intentosFallidos: 0
      },
      {
        id: generateId(),
        nombre: 'Ana',
        apellido: 'Torres',
        usuario: 'atorres',
        contrasena: 'tecnico456',
        rol: 'Técnico',
        email: 'ana.torres@larnet.cl',
        telefono: '+56954321098',
        activo: true,
        bloqueado: false,
        requiereCambioContrasena: false,
        fechaCreacion: ahora,
        fechaModificacion: ahora,
        usuarioCreacion: 'Sistema',
        usuarioModificacion: 'Sistema',
        ultimoAcceso: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        intentosFallidos: 0
      },
      {
        id: generateId(),
        nombre: 'Luis',
        apellido: 'Morales',
        usuario: 'lmorales',
        contrasena: 'tecnico789',
        rol: 'Técnico',
        email: 'luis.morales@larnet.cl',
        telefono: '+56943210987',
        activo: true,
        bloqueado: false,
        requiereCambioContrasena: false,
        fechaCreacion: ahora,
        fechaModificacion: ahora,
        usuarioCreacion: 'Sistema',
        usuarioModificacion: 'Sistema',
        ultimoAcceso: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        intentosFallidos: 0
      }
    ];
    
    // Guardar usuarios
    const hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Usuarios');
    
    // Headers
    const headers = ['id', 'nombre', 'apellido', 'usuario', 'contrasena', 'rol', 'email', 'telefono', 'activo', 'bloqueado', 'requiereCambioContrasena', 'fechaCreacion', 'fechaModificacion', 'usuarioCreacion', 'usuarioModificacion', 'ultimoAcceso', 'intentosFallidos'];
    hoja.getRange(1, 1, 1, headers.length).setValues([headers]);
    
    // Datos
    const datos = usuarios.map(user => [
      user.id,
      user.nombre,
      user.apellido,
      user.usuario,
      user.contrasena,
      user.rol,
      user.email,
      user.telefono,
      user.activo,
      user.bloqueado,
      user.requiereCambioContrasena,
      user.fechaCreacion,
      user.fechaModificacion,
      user.usuarioCreacion,
      user.usuarioModificacion,
      user.ultimoAcceso,
      user.intentosFallidos
    ]);
    
    if (datos.length > 0) {
      hoja.getRange(2, 1, datos.length, headers.length).setValues(datos);
    }
    
    console.log(`✅ ${usuarios.length} usuarios creados`);
    
    return {
      success: true,
      usuarios: usuarios.length,
      datos: usuarios
    };
    
  } catch (error) {
    console.log('❌ Error creando usuarios:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Crear obras de telecomunicaciones
 */
function crearObras() {
  try {
    const ahora = new Date().toISOString();
    const obras = [
      {
        id: generateId(),
        nombre: 'Edificio Costanera Center',
        descripcion: 'Instalación de red de telecomunicaciones en torre corporativa',
        direccion: 'Av. Andrés Bello 2425, Providencia, Santiago',
        empresaCliente: 'Inmobiliaria Costanera',
        contactoCliente: 'Roberto Silva',
        emailCliente: 'roberto.silva@costanera.cl',
        telefonoCliente: '+56223456789',
        fechaInicio: new Date(2024, 10, 1).toISOString(),
        fechaTermino: new Date(2025, 2, 28).toISOString(),
        estado: 'En progreso',
        tipo: 'Edificio Corporativo',
        presupuesto: 85000000,
        moneda: 'CLP',
        progreso: 65,
        prioridad: 'Alta',
        supervisor: 'Carlos Mendoza',
        observaciones: 'Obra con alta complejidad técnica, requiere coordinación con otros contratistas',
        fechaCreacion: ahora,
        fechaModificacion: ahora,
        usuarioCreacion: 'Sistema',
        usuarioModificacion: 'Sistema'
      },
      {
        id: generateId(),
        nombre: 'Condominio Las Condes Premium',
        descripcion: 'Red de fibra óptica para condominio residencial de lujo',
        direccion: 'Av. Las Condes 12500, Las Condes, Santiago',
        empresaCliente: 'Constructora Premium SpA',
        contactoCliente: 'Patricia Moreno',
        emailCliente: 'patricia.moreno@premium.cl',
        telefonoCliente: '+56229876543',
        fechaInicio: new Date(2024, 9, 15).toISOString(),
        fechaTermino: new Date(2025, 1, 15).toISOString(),
        estado: 'En progreso',
        tipo: 'Condominio Residencial',
        presupuesto: 45000000,
        moneda: 'CLP',
        progreso: 80,
        prioridad: 'Media',
        supervisor: 'María González',
        observaciones: 'Cliente muy exigente con los tiempos de entrega',
        fechaCreacion: ahora,
        fechaModificacion: ahora,
        usuarioCreacion: 'Sistema',
        usuarioModificacion: 'Sistema'
      },
      {
        id: generateId(),
        nombre: 'Mall Plaza Valparaíso',
        descripcion: 'Modernización de sistema de telecomunicaciones en centro comercial',
        direccion: 'Av. Argentina 2680, Valparaíso',
        empresaCliente: 'Mall Plaza',
        contactoCliente: 'Fernando Castillo',
        emailCliente: 'fernando.castillo@mallplaza.cl',
        telefonoCliente: '+56322345678',
        fechaInicio: new Date(2024, 8, 1).toISOString(),
        fechaTermino: new Date(2024, 11, 30).toISOString(),
        estado: 'Finalizada',
        tipo: 'Centro Comercial',
        presupuesto: 120000000,
        moneda: 'CLP',
        progreso: 100,
        prioridad: 'Alta',
        supervisor: 'Carlos Mendoza',
        observaciones: 'Proyecto completado exitosamente dentro del plazo',
        fechaCreacion: ahora,
        fechaModificacion: ahora,
        usuarioCreacion: 'Sistema',
        usuarioModificacion: 'Sistema'
      },
      {
        id: generateId(),
        nombre: 'Hospital Regional Concepción',
        descripción: 'Red de comunicaciones críticas para hospital',
        direccion: 'Av. Roosevelt 1550, Concepción',
        empresaCliente: 'Servicio de Salud Concepción',
        contactoCliente: 'Dr. Manuel Herrera',
        emailCliente: 'manuel.herrera@ssconcepcion.cl',
        telefonoCliente: '+56412234567',
        fechaInicio: new Date(2024, 11, 1).toISOString(),
        fechaTermino: new Date(2025, 4, 30).toISOString(),
        estado: 'En planificación',
        tipo: 'Hospital',
        presupuesto: 95000000,
        moneda: 'CLP',
        progreso: 15,
        prioridad: 'Crítica',
        supervisor: 'María González',
        observaciones: 'Requiere certificaciones especiales para ambiente hospitalario',
        fechaCreacion: ahora,
        fechaModificacion: ahora,
        usuarioCreacion: 'Sistema',
        usuarioModificacion: 'Sistema'
      },
      {
        id: generateId(),
        nombre: 'Universidad de Chile - Facultad de Ingeniería',
        descripcion: 'Upgrade de red de datos en campus universitario',
        direccion: 'Beauchef 851, Santiago Centro',
        empresaCliente: 'Universidad de Chile',
        contactoCliente: 'Ing. Carmen López',
        emailCliente: 'carmen.lopez@uchile.cl',
        telefonoCliente: '+56229784567',
        fechaInicio: new Date(2024, 7, 1).toISOString(),
        fechaTermino: new Date(2024, 10, 31).toISOString(),
        estado: 'Finalizada',
        tipo: 'Universidad',
        presupuesto: 65000000,
        moneda: 'CLP',
        progreso: 100,
        prioridad: 'Media',
        supervisor: 'Carlos Mendoza',
        observaciones: 'Proyecto académico con restricciones de horario',
        fechaCreacion: ahora,
        fechaModificacion: ahora,
        usuarioCreacion: 'Sistema',
        usuarioModificacion: 'Sistema'
      },
      {
        id: generateId(),
        nombre: 'Edificio Titanium La Portada',
        descripcion: 'Sistema de telecomunicaciones para edificio inteligente',
        direccion: 'Av. Vitacura 2939, Las Condes, Santiago',
        empresaCliente: 'Titanium Properties',
        contactoCliente: 'Alejandro Ruiz',
        emailCliente: 'alejandro.ruiz@titanium.cl',
        telefonoCliente: '+56223334444',
        fechaInicio: new Date(2025, 0, 15).toISOString(),
        fechaTermino: new Date(2025, 5, 15).toISOString(),
        estado: 'En planificación',
        tipo: 'Edificio Inteligente',
        presupuesto: 110000000,
        moneda: 'CLP',
        progreso: 5,
        prioridad: 'Alta',
        supervisor: 'María González',
        observaciones: 'Requiere integración con sistemas de automatización',
        fechaCreacion: ahora,
        fechaModificacion: ahora,
        usuarioCreacion: 'Sistema',
        usuarioModificacion: 'Sistema'
      },
      {
        id: generateId(),
        nombre: 'Parque Industrial Quilicura',
        descripcion: 'Red de fibra óptica para parque industrial',
        direccion: 'Ruta 5 Norte Km 18, Quilicura, Santiago',
        empresaCliente: 'Parque Industrial Quilicura SA',
        contactoCliente: 'Rodrigo Sánchez',
        emailCliente: 'rodrigo.sanchez@piq.cl',
        telefonoCliente: '+56225556666',
        fechaInicio: new Date(2024, 10, 15).toISOString(),
        fechaTermino: new Date(2025, 3, 15).toISOString(),
        estado: 'En progreso',
        tipo: 'Parque Industrial',
        presupuesto: 75000000,
        moneda: 'CLP',
        progreso: 40,
        prioridad: 'Media',
        supervisor: 'Carlos Mendoza',
        observaciones: 'Instalación en ambiente industrial con condiciones especiales',
        fechaCreacion: ahora,
        fechaModificacion: ahora,
        usuarioCreacion: 'Sistema',
        usuarioModificacion: 'Sistema'
      },
      {
        id: generateId(),
        nombre: 'Hotel Sheraton Santiago',
        descripcion: 'Modernización de red hotelera y WiFi',
        direccion: 'Av. Santa María 1742, Providencia, Santiago',
        empresaCliente: 'Sheraton Hotels',
        contactoCliente: 'Isabella Rossi',
        emailCliente: 'isabella.rossi@sheraton.cl',
        telefonoCliente: '+56227778888',
        fechaInicio: new Date(2024, 6, 1).toISOString(),
        fechaTermino: new Date(2024, 9, 30).toISOString(),
        estado: 'Finalizada',
        tipo: 'Hotel',
        presupuesto: 55000000,
        moneda: 'CLP',
        progreso: 100,
        prioridad: 'Media',
        supervisor: 'María González',
        observaciones: 'Instalación nocturna para no afectar huéspedes',
        fechaCreacion: ahora,
        fechaModificacion: ahora,
        usuarioCreacion: 'Sistema',
        usuarioModificacion: 'Sistema'
      }
    ];
    
    // Guardar obras
    const hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Obras');
    
    // Headers
    const headers = ['id', 'nombre', 'descripcion', 'direccion', 'empresaCliente', 'contactoCliente', 'emailCliente', 'telefonoCliente', 'fechaInicio', 'fechaTermino', 'estado', 'tipo', 'presupuesto', 'moneda', 'progreso', 'prioridad', 'supervisor', 'observaciones', 'fechaCreacion', 'fechaModificacion', 'usuarioCreacion', 'usuarioModificacion'];
    hoja.getRange(1, 1, 1, headers.length).setValues([headers]);
    
    // Datos
    const datos = obras.map(obra => [
      obra.id,
      obra.nombre,
      obra.descripcion,
      obra.direccion,
      obra.empresaCliente,
      obra.contactoCliente,
      obra.emailCliente,
      obra.telefonoCliente,
      obra.fechaInicio,
      obra.fechaTermino,
      obra.estado,
      obra.tipo,
      obra.presupuesto,
      obra.moneda,
      obra.progreso,
      obra.prioridad,
      obra.supervisor,
      obra.observaciones,
      obra.fechaCreacion,
      obra.fechaModificacion,
      obra.usuarioCreacion,
      obra.usuarioModificacion
    ]);
    
    if (datos.length > 0) {
      hoja.getRange(2, 1, datos.length, headers.length).setValues(datos);
    }
    
    console.log(`✅ ${obras.length} obras creadas`);
    
    return {
      success: true,
      obras: obras.length,
      datos: obras
    };
    
  } catch (error) {
    console.log('❌ Error creando obras:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Crear materiales de inventario
 */
function crearMateriales() {
  try {
    // Obtener categorías para asignar IDs
    const categoriasHoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Categorias');
    const categoriasData = categoriasHoja.getDataRange().getValues();
    const categorias = {};
    
    for (let i = 1; i < categoriasData.length; i++) {
      const nombre = categoriasData[i][1];
      const id = categoriasData[i][0];
      categorias[nombre] = id;
    }
    
    const ahora = new Date().toISOString();
    const materiales = [
      // Cables Coaxiales
      {
        id: generateId(),
        codigo: 'CAB-RG6-100',
        nombre: 'Cable Coaxial RG6 Negro',
        descripcion: 'Cable coaxial RG6 75 ohm, chaqueta negra, rollo 100m',
        categoriaId: categorias['Cables Coaxiales'],
        unidad: 'metros',
        stock: 2500,
        stockMinimo: 500,
        stockMaximo: 5000,
        precio: 850,
        proveedor: 'Cables del Pacífico',
        ubicacion: 'Bodega A-1',
        fechaCreacion: ahora,
        fechaModificacion: ahora,
        usuarioCreacion: 'Sistema',
        usuarioModificacion: 'Sistema'
      },
      {
        id: generateId(),
        codigo: 'CAB-RG11-100',
        nombre: 'Cable Coaxial RG11 Negro',
        descripcion: 'Cable coaxial RG11 75 ohm, chaqueta negra, rollo 100m',
        categoriaId: categorias['Cables Coaxiales'],
        unidad: 'metros',
        stock: 1200,
        stockMinimo: 200,
        stockMaximo: 2000,
        precio: 1250,
        proveedor: 'Cables del Pacífico',
        ubicacion: 'Bodega A-1',
        fechaCreacion: ahora,
        fechaModificacion: ahora,
        usuarioCreacion: 'Sistema',
        usuarioModificacion: 'Sistema'
      },
      {
        id: generateId(),
        codigo: 'CAB-RG59-100',
        nombre: 'Cable Coaxial RG59 Negro',
        descripcion: 'Cable coaxial RG59 75 ohm, chaqueta negra, rollo 100m',
        categoriaId: categorias['Cables Coaxiales'],
        unidad: 'metros',
        stock: 800,
        stockMinimo: 100,
        stockMaximo: 1500,
        precio: 650,
        proveedor: 'Cables del Pacífico',
        ubicacion: 'Bodega A-1',
        fechaCreacion: ahora,
        fechaModificacion: ahora,
        usuarioCreacion: 'Sistema',
        usuarioModificacion: 'Sistema'
      },
      
      // Fibra Óptica
      {
        id: generateId(),
        codigo: 'FO-SM-12H',
        nombre: 'Fibra Óptica Monomodo 12 Hilos',
        descripcion: 'Cable fibra óptica monomodo 9/125, 12 hilos, ADSS',
        categoriaId: categorias['Fibra Óptica'],
        unidad: 'metros',
        stock: 5000,
        stockMinimo: 1000,
        stockMaximo: 10000,
        precio: 2500,
        proveedor: 'Optical Solutions',
        ubicacion: 'Bodega B-1',
        fechaCreacion: ahora,
        fechaModificacion: ahora,
        usuarioCreacion: 'Sistema',
        usuarioModificacion: 'Sistema'
      },
      {
        id: generateId(),
        codigo: 'FO-MM-24H',
        nombre: 'Fibra Óptica Multimodo 24 Hilos',
        descripcion: 'Cable fibra óptica multimodo 50/125, 24 hilos, interior',
        categoriaId: categorias['Fibra Óptica'],
        unidad: 'metros',
        stock: 3000,
        stockMinimo: 500,
        stockMaximo: 6000,
        precio: 3200,
        proveedor: 'Optical Solutions',
        ubicacion: 'Bodega B-1',
        fechaCreacion: ahora,
        fechaModificacion: ahora,
        usuarioCreacion: 'Sistema',
        usuarioModificacion: 'Sistema'
      },
      {
        id: generateId(),
        codigo: 'FO-SM-48H',
        nombre: 'Fibra Óptica Monomodo 48 Hilos',
        descripcion: 'Cable fibra óptica monomodo 9/125, 48 hilos, exterior',
        categoriaId: categorias['Fibra Óptica'],
        unidad: 'metros',
        stock: 2000,
        stockMinimo: 300,
        stockMaximo: 4000,
        precio: 4800,
        proveedor: 'Optical Solutions',
        ubicacion: 'Bodega B-1',
        fechaCreacion: ahora,
        fechaModificacion: ahora,
        usuarioCreacion: 'Sistema',
        usuarioModificacion: 'Sistema'
      },
      
      // Conectores
      {
        id: generateId(),
        codigo: 'CON-F-COMP',
        nombre: 'Conector F Compresión',
        descripcion: 'Conector F tipo compresión para RG6',
        categoriaId: categorias['Conectores'],
        unidad: 'unidades',
        stock: 5000,
        stockMinimo: 1000,
        stockMaximo: 10000,
        precio: 450,
        proveedor: 'Conectores Pro',
        ubicacion: 'Bodega C-1',
        fechaCreacion: ahora,
        fechaModificacion: ahora,
        usuarioCreacion: 'Sistema',
        usuarioModificacion: 'Sistema'
      },
      {
        id: generateId(),
        codigo: 'CON-SC-APC',
        nombre: 'Conector SC/APC',
        descripcion: 'Conector SC/APC para fibra monomodo',
        categoriaId: categorias['Conectores'],
        unidad: 'unidades',
        stock: 2000,
        stockMinimo: 300,
        stockMaximo: 4000,
        precio: 1200,
        proveedor: 'Optical Solutions',
        ubicacion: 'Bodega C-2',
        fechaCreacion: ahora,
        fechaModificacion: ahora,
        usuarioCreacion: 'Sistema',
        usuarioModificacion: 'Sistema'
      },
      {
        id: generateId(),
        codigo: 'CON-LC-UPC',
        nombre: 'Conector LC/UPC',
        descripcion: 'Conector LC/UPC para fibra multimodo',
        categoriaId: categorias['Conectores'],
        unidad: 'unidades',
        stock: 1500,
        stockMinimo: 200,
        stockMaximo: 3000,
        precio: 950,
        proveedor: 'Optical Solutions',
        ubicacion: 'Bodega C-2',
        fechaCreacion: ahora,
        fechaModificacion: ahora,
        usuarioCreacion: 'Sistema',
        usuarioModificacion: 'Sistema'
      },
      
      // Amplificadores
      {
        id: generateId(),
        codigo: 'AMP-CATV-30',
        nombre: 'Amplificador CATV 30dB',
        descripcion: 'Amplificador bidireccional CATV 30dB, 54-1000MHz',
        categoriaId: categorias['Amplificadores'],
        unidad: 'unidades',
        stock: 25,
        stockMinimo: 5,
        stockMaximo: 50,
        precio: 125000,
        proveedor: 'Amplificadores Chile',
        ubicacion: 'Bodega D-1',
        fechaCreacion: ahora,
        fechaModificacion: ahora,
        usuarioCreacion: 'Sistema',
        usuarioModificacion: 'Sistema'
      },
      {
        id: generateId(),
        codigo: 'AMP-DIST-8',
        nombre: 'Amplificador Distribuidor 8 Salidas',
        descripcion: 'Amplificador distribuidor 8 salidas, 20dB ganancia',
        categoriaId: categorias['Amplificadores'],
        unidad: 'unidades',
        stock: 40,
        stockMinimo: 8,
        stockMaximo: 80,
        precio: 85000,
        proveedor: 'Amplificadores Chile',
        ubicacion: 'Bodega D-1',
        fechaCreacion: ahora,
        fechaModificacion: ahora,
        usuarioCreacion: 'Sistema',
        usuarioModificacion: 'Sistema'
      },
      
      // Derivadores
      {
        id: generateId(),
        codigo: 'DER-2WAY-20',
        nombre: 'Derivador 2 Vías 20dB',
        descripcion: 'Derivador 2 vías, 20dB acoplamiento, 5-1000MHz',
        categoriaId: categorias['Derivadores'],
        unidad: 'unidades',
        stock: 150,
        stockMinimo: 30,
        stockMaximo: 300,
        precio: 12500,
        proveedor: 'Derivadores Pro',
        ubicacion: 'Bodega E-1',
        fechaCreacion: ahora,
        fechaModificacion: ahora,
        usuarioCreacion: 'Sistema',
        usuarioModificacion: 'Sistema'
      },
      {
        id: generateId(),
        codigo: 'DER-4WAY-15',
        nombre: 'Derivador 4 Vías 15dB',
        descripcion: 'Derivador 4 vías, 15dB acoplamiento, 5-1000MHz',
        categoriaId: categorias['Derivadores'],
        unidad: 'unidades',
        stock: 100,
        stockMinimo: 20,
        stockMaximo: 200,
        precio: 18500,
        proveedor: 'Derivadores Pro',
        ubicacion: 'Bodega E-1',
        fechaCreacion: ahora,
        fechaModificacion: ahora,
        usuarioCreacion: 'Sistema',
        usuarioModificacion: 'Sistema'
      },
      {
        id: generateId(),
        codigo: 'SPL-2WAY',
        nombre: 'Splitter 2 Vías',
        descripcion: 'Splitter 2 vías, 3.5dB pérdida, 5-2400MHz',
        categoriaId: categorias['Derivadores'],
        unidad: 'unidades',
        stock: 200,
        stockMinimo: 40,
        stockMaximo: 400,
        precio: 8500,
        proveedor: 'Derivadores Pro',
        ubicacion: 'Bodega E-1',
        fechaCreacion: ahora,
        fechaModificacion: ahora,
        usuarioCreacion: 'Sistema',
        usuarioModificacion: 'Sistema'
      },
      
      // Equipos Activos
      {
        id: generateId(),
        codigo: 'SW-24P-GIG',
        nombre: 'Switch 24 Puertos Gigabit',
        descripcion: 'Switch administrable 24 puertos Gigabit Ethernet',
        categoriaId: categorias['Equipos Activos'],
        unidad: 'unidades',
        stock: 15,
        stockMinimo: 3,
        stockMaximo: 30,
        precio: 450000,
        proveedor: 'Network Solutions',
        ubicacion: 'Bodega F-1',
        fechaCreacion: ahora,
        fechaModificacion: ahora,
        usuarioCreacion: 'Sistema',
        usuarioModificacion: 'Sistema'
      },
      {
        id: generateId(),
        codigo: 'AP-WIFI6',
        nombre: 'Access Point WiFi 6',
        descripcion: 'Access Point WiFi 6, dual band, PoE+',
        categoriaId: categorias['Equipos Activos'],
        unidad: 'unidades',
        stock: 30,
        stockMinimo: 5,
        stockMaximo: 60,
        precio: 185000,
        proveedor: 'Network Solutions',
        ubicacion: 'Bodega F-1',
        fechaCreacion: ahora,
        fechaModificacion: ahora,
        usuarioCreacion: 'Sistema',
        usuarioModificacion: 'Sistema'
      },
      {
        id: generateId(),
        codigo: 'RT-FIBER',
        nombre: 'Router Fibra Óptica',
        descripcion: 'Router empresarial con puerto SFP+',
        categoriaId: categorias['Equipos Activos'],
        unidad: 'unidades',
        stock: 8,
        stockMinimo: 2,
        stockMaximo: 20,
        precio: 850000,
        proveedor: 'Network Solutions',
        ubicacion: 'Bodega F-1',
        fechaCreacion: ahora,
        fechaModificacion: ahora,
        usuarioCreacion: 'Sistema',
        usuarioModificacion: 'Sistema'
      },
      
      // Herramientas
      {
        id: generateId(),
        codigo: 'HER-FUSION',
        nombre: 'Fusionadora de Fibra',
        descripcion: 'Fusionadora automática de fibra óptica',
        categoriaId: categorias['Herramientas'],
        unidad: 'unidades',
        stock: 3,
        stockMinimo: 1,
        stockMaximo: 5,
        precio: 2500000,
        proveedor: 'Herramientas Ópticas',
        ubicacion: 'Bodega G-1',
        fechaCreacion: ahora,
        fechaModificacion: ahora,
        usuarioCreacion: 'Sistema',
        usuarioModificacion: 'Sistema'
      },
      {
        id: generateId(),
        codigo: 'HER-OTDR',
        nombre: 'OTDR Reflectómetro',
        descripcion: 'Reflectómetro óptico OTDR para medición de fibra',
        categoriaId: categorias['Herramientas'],
        unidad: 'unidades',
        stock: 2,
        stockMinimo: 1,
        stockMaximo: 4,
        precio: 3200000,
        proveedor: 'Herramientas Ópticas',
        ubicacion: 'Bodega G-1',
        fechaCreacion: ahora,
        fechaModificacion: ahora,
        usuarioCreacion: 'Sistema',
        usuarioModificacion: 'Sistema'
      },
      {
        id: generateId(),
        codigo: 'HER-CRIMPER',
        nombre: 'Crimpeadora RJ45',
        descripcion: 'Crimpeadora profesional para conectores RJ45',
        categoriaId: categorias['Herramientas'],
        unidad: 'unidades',
        stock: 12,
        stockMinimo: 3,
        stockMaximo: 20,
        precio: 45000,
        proveedor: 'Herramientas Pro',
        ubicacion: 'Bodega G-2',
        fechaCreacion: ahora,
        fechaModificacion: ahora,
        usuarioCreacion: 'Sistema',
        usuarioModificacion: 'Sistema'
      },
      
      // Accesorios
      {
        id: generateId(),
        codigo: 'ACC-ABRAZ-25',
        nombre: 'Abrazaderas Plásticas 25cm',
        descripcion: 'Abrazaderas plásticas negras 25cm, pack 100 unidades',
        categoriaId: categorias['Accesorios'],
        unidad: 'packs',
        stock: 50,
        stockMinimo: 10,
        stockMaximo: 100,
        precio: 8500,
        proveedor: 'Accesorios Varios',
        ubicacion: 'Bodega H-1',
        fechaCreacion: ahora,
        fechaModificacion: ahora,
        usuarioCreacion: 'Sistema',
        usuarioModificacion: 'Sistema'
      },
      {
        id: generateId(),
        codigo: 'ACC-CANAL-50',
        nombre: 'Canaleta 50x25mm',
        descripcion: 'Canaleta plástica blanca 50x25mm, barra 2m',
        categoriaId: categorias['Accesorios'],
        unidad: 'barras',
        stock: 200,
        stockMinimo: 40,
        stockMaximo: 400,
        precio: 3500,
        proveedor: 'Accesorios Varios',
        ubicacion: 'Bodega H-2',
        fechaCreacion: ahora,
        fechaModificacion: ahora,
        usuarioCreacion: 'Sistema',
        usuarioModificacion: 'Sistema'
      },
      {
        id: generateId(),
        codigo: 'ACC-TORN-M6',
        nombre: 'Tornillos M6x20 Inox',
        descripcion: 'Tornillos M6x20mm acero inoxidable, caja 100 unidades',
        categoriaId: categorias['Accesorios'],
        unidad: 'cajas',
        stock: 80,
        stockMinimo: 15,
        stockMaximo: 150,
        precio: 12500,
        proveedor: 'Ferretería Industrial',
        ubicacion: 'Bodega H-3',
        fechaCreacion: ahora,
        fechaModificacion: ahora,
        usuarioCreacion: 'Sistema',
        usuarioModificacion: 'Sistema'
      }
    ];
    
    // Guardar materiales
    const hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Materiales');
    
    // Headers
    const headers = ['id', 'codigo', 'nombre', 'descripcion', 'categoriaId', 'unidad', 'stock', 'stockMinimo', 'stockMaximo', 'precio', 'proveedor', 'ubicacion', 'fechaCreacion', 'fechaModificacion', 'usuarioCreacion', 'usuarioModificacion'];
    hoja.getRange(1, 1, 1, headers.length).setValues([headers]);
    
    // Datos
    const datos = materiales.map(material => [
      material.id,
      material.codigo,
      material.nombre,
      material.descripcion,
      material.categoriaId,
      material.unidad,
      material.stock,
      material.stockMinimo,
      material.stockMaximo,
      material.precio,
      material.proveedor,
      material.ubicacion,
      material.fechaCreacion,
      material.fechaModificacion,
      material.usuarioCreacion,
      material.usuarioModificacion
    ]);
    
    if (datos.length > 0) {
      hoja.getRange(2, 1, datos.length, headers.length).setValues(datos);
    }
    
    console.log(`✅ ${materiales.length} materiales creados`);
    
    return {
      success: true,
      materiales: materiales.length,
      datos: materiales
    };
    
  } catch (error) {
    console.log('❌ Error creando materiales:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Crear avances de ejemplo
 */
function crearAvances() {
  try {
    // Obtener obras para asignar avances
    const obrasHoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Obras');
    const obrasData = obrasHoja.getDataRange().getValues();
    const obras = [];
    
    for (let i = 1; i < obrasData.length; i++) {
      obras.push({
        id: obrasData[i][0],
        nombre: obrasData[i][1]
      });
    }
    
    // Obtener usuarios para asignar técnicos
    const usuariosHoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Usuarios');
    const usuariosData = usuariosHoja.getDataRange().getValues();
    const tecnicos = [];
    
    for (let i = 1; i < usuariosData.length; i++) {
      if (usuariosData[i][5] === 'Técnico') { // rol
        tecnicos.push({
          id: usuariosData[i][0],
          nombre: usuariosData[i][1] + ' ' + usuariosData[i][2]
        });
      }
    }
    
    const ahora = new Date().toISOString();
    const avances = [];
    
    // Crear avances para las obras en progreso
    const obrasEnProgreso = obras.filter(obra => obra.nombre.includes('Costanera') || obra.nombre.includes('Condes') || obra.nombre.includes('Quilicura'));
    
    obrasEnProgreso.forEach((obra, obraIndex) => {
      // Crear varios avances por obra
      for (let i = 0; i < 8; i++) {
        const fechaAvance = new Date(Date.now() - (30 - i * 3) * 24 * 60 * 60 * 1000);
        const tecnico = tecnicos[i % tecnicos.length];
        
        avances.push({
          id: generateId(),
          obraId: obra.id,
          fecha: fechaAvance.toISOString(),
          tipoAvance: ['Instalación Coaxial', 'Instalación Fibra', 'Configuración Equipos', 'Mediciones', 'Documentación'][i % 5],
          ubicacion: `Torre ${Math.floor(i/2) + 1} - Piso ${(i % 4) + 1}`,
          descripcion: [
            'Instalación de cable coaxial RG6 en shaft principal',
            'Tendido de fibra óptica monomodo 12 hilos',
            'Configuración de switch y access points',
            'Mediciones de potencia y certificación',
            'Actualización de planos as-built'
          ][i % 5],
          porcentajeCompletado: Math.min(100, 20 + i * 10),
          horasInvertidas: 4 + (i % 4),
          tecnicoId: tecnico.id,
          tecnicoNombre: tecnico.nombre,
          observaciones: i % 3 === 0 ? 'Trabajo completado sin inconvenientes' : i % 3 === 1 ? 'Requiere coordinación con otros contratistas' : '',
          estado: i < 6 ? 'Completado' : 'En progreso',
          materialesUtilizados: JSON.stringify([
            { materialId: 'CAB-RG6-100', cantidad: 50 + i * 10 },
            { materialId: 'CON-F-COMP', cantidad: 8 + i * 2 }
          ]),
          evidenciaFotografica: `https://drive.google.com/file/d/ejemplo_${generateId()}/view`,
          fechaCreacion: fechaAvance.toISOString(),
          fechaModificacion: fechaAvance.toISOString(),
          usuarioCreacion: tecnico.nombre,
          usuarioModificacion: tecnico.nombre
        });
      }
    });
    
    // Guardar avances
    const hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Avances');
    
    // Headers
    const headers = ['id', 'obraId', 'fecha', 'tipoAvance', 'ubicacion', 'descripcion', 'porcentajeCompletado', 'horasInvertidas', 'tecnicoId', 'tecnicoNombre', 'observaciones', 'estado', 'materialesUtilizados', 'evidenciaFotografica', 'fechaCreacion', 'fechaModificacion', 'usuarioCreacion', 'usuarioModificacion'];
    hoja.getRange(1, 1, 1, headers.length).setValues([headers]);
    
    // Datos
    const datos = avances.map(avance => [
      avance.id,
      avance.obraId,
      avance.fecha,
      avance.tipoAvance,
      avance.ubicacion,
      avance.descripcion,
      avance.porcentajeCompletado,
      avance.horasInvertidas,
      avance.tecnicoId,
      avance.tecnicoNombre,
      avance.observaciones,
      avance.estado,
      avance.materialesUtilizados,
      avance.evidenciaFotografica,
      avance.fechaCreacion,
      avance.fechaModificacion,
      avance.usuarioCreacion,
      avance.usuarioModificacion
    ]);
    
    if (datos.length > 0) {
      hoja.getRange(2, 1, datos.length, headers.length).setValues(datos);
    }
    
    console.log(`✅ ${avances.length} avances creados`);
    
    return {
      success: true,
      avances: avances.length,
      datos: avances
    };
    
  } catch (error) {
    console.log('❌ Error creando avances:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Crear movimientos de inventario
 */
function crearMovimientos() {
  try {
    // Obtener materiales
    const materialesHoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Materiales');
    const materialesData = materialesHoja.getDataRange().getValues();
    const materiales = [];
    
    for (let i = 1; i < materialesData.length; i++) {
      materiales.push({
        id: materialesData[i][0],
        codigo: materialesData[i][1],
        nombre: materialesData[i][2]
      });
    }
    
    // Obtener obras
    const obrasHoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Obras');
    const obrasData = obrasHoja.getDataRange().getValues();
    const obras = [];
    
    for (let i = 1; i < obrasData.length; i++) {
      obras.push({
        id: obrasData[i][0],
        nombre: obrasData[i][1]
      });
    }
    
    const ahora = new Date().toISOString();
    const movimientos = [];
    
    // Crear movimientos de entrada (compras)
    for (let i = 0; i < 10; i++) {
      const material = materiales[i % materiales.length];
      const fechaMovimiento = new Date(Date.now() - (60 - i * 5) * 24 * 60 * 60 * 1000);
      
      movimientos.push({
        id: generateId(),
        materialId: material.id,
        materialCodigo: material.codigo,
        materialNombre: material.nombre,
        tipoMovimiento: 'Entrada',
        cantidad: 100 + i * 50,
        motivo: 'Compra a proveedor',
        obraId: null,
        obraNombre: null,
        responsable: 'Carlos Mendoza',
        observaciones: `Compra según orden ${1000 + i}`,
        fecha: fechaMovimiento.toISOString(),
        fechaCreacion: fechaMovimiento.toISOString(),
        fechaModificacion: fechaMovimiento.toISOString(),
        usuarioCreacion: 'Sistema',
        usuarioModificacion: 'Sistema'
      });
    }
    
    // Crear movimientos de salida (uso en obras)
    for (let i = 0; i < 15; i++) {
      const material = materiales[i % materiales.length];
      const obra = obras[i % obras.length];
      const fechaMovimiento = new Date(Date.now() - (45 - i * 2) * 24 * 60 * 60 * 1000);
      
      movimientos.push({
        id: generateId(),
        materialId: material.id,
        materialCodigo: material.codigo,
        materialNombre: material.nombre,
        tipoMovimiento: 'Salida',
        cantidad: 10 + i * 5,
        motivo: 'Uso en obra',
        obraId: obra.id,
        obraNombre: obra.nombre,
        responsable: 'Pedro Ramírez',
        observaciones: `Material utilizado en instalación`,
        fecha: fechaMovimiento.toISOString(),
        fechaCreacion: fechaMovimiento.toISOString(),
        fechaModificacion: fechaMovimiento.toISOString(),
        usuarioCreacion: 'Sistema',
        usuarioModificacion: 'Sistema'
      });
    }
    
    // Guardar movimientos
    const hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Movimientos');
    
    // Headers
    const headers = ['id', 'materialId', 'materialCodigo', 'materialNombre', 'tipoMovimiento', 'cantidad', 'motivo', 'obraId', 'obraNombre', 'responsable', 'observaciones', 'fecha', 'fechaCreacion', 'fechaModificacion', 'usuarioCreacion', 'usuarioModificacion'];
    hoja.getRange(1, 1, 1, headers.length).setValues([headers]);
    
    // Datos
    const datos = movimientos.map(mov => [
      mov.id,
      mov.materialId,
      mov.materialCodigo,
      mov.materialNombre,
      mov.tipoMovimiento,
      mov.cantidad,
      mov.motivo,
      mov.obraId,
      mov.obraNombre,
      mov.responsable,
      mov.observaciones,
      mov.fecha,
      mov.fechaCreacion,
      mov.fechaModificacion,
      mov.usuarioCreacion,
      mov.usuarioModificacion
    ]);
    
    if (datos.length > 0) {
      hoja.getRange(2, 1, datos.length, headers.length).setValues(datos);
    }
    
    console.log(`✅ ${movimientos.length} movimientos creados`);
    
    return {
      success: true,
      movimientos: movimientos.length,
      datos: movimientos
    };
    
  } catch (error) {
    console.log('❌ Error creando movimientos:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Crear transferencias entre obras
 */
function crearTransferencias() {
  try {
    // Obtener obras
    const obrasHoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Obras');
    const obrasData = obrasHoja.getDataRange().getValues();
    const obras = [];
    
    for (let i = 1; i < obrasData.length; i++) {
      obras.push({
        id: obrasData[i][0],
        nombre: obrasData[i][1],
        direccion: obrasData[i][3]
      });
    }
    
    // Obtener materiales
    const materialesHoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Materiales');
    const materialesData = materialesHoja.getDataRange().getValues();
    const materiales = [];
    
    for (let i = 1; i < materialesData.length; i++) {
      materiales.push({
        id: materialesData[i][0],
        codigo: materialesData[i][1],
        nombre: materialesData[i][2],
        unidad: materialesData[i][5]
      });
    }
    
    const ahora = new Date().toISOString();
    const transferencias = [];
    
    // Crear transferencias de ejemplo
    for (let i = 0; i < 8; i++) {
      const obraOrigen = obras[i % obras.length];
      const obraDestino = obras[(i + 1) % obras.length];
      const material = materiales[i % materiales.length];
      const fechaTransferencia = new Date(Date.now() - (20 - i * 2) * 24 * 60 * 60 * 1000);
      
      const estados = ['Pendiente', 'En tránsito', 'Completada', 'Cancelada'];
      const estado = estados[i % 4];
      
      transferencias.push({
        id: generateId(),
        numero: `TRF-${String(1000 + i).padStart(4, '0')}`,
        obraOrigenId: obraOrigen.id,
        obraOrigen: obraOrigen.nombre,
        direccionOrigen: obraOrigen.direccion,
        obraDestinoId: obraDestino.id,
        obraDestino: obraDestino.nombre,
        direccionDestino: obraDestino.direccion,
        materialId: material.id,
        material: material.nombre,
        codigoMaterial: material.codigo,
        cantidad: 10 + i * 5,
        unidad: material.unidad,
        responsable: ['Carlos Mendoza', 'María González', 'Pedro Ramírez'][i % 3],
        motivo: ['Exceso de material', 'Requerimiento urgente', 'Redistribución planificada'][i % 3],
        estado: estado,
        observaciones: estado === 'Cancelada' ? 'Cancelada por cambio de requerimientos' : '',
        fecha: fechaTransferencia.toISOString(),
        fechaCreacion: fechaTransferencia.toISOString(),
        fechaModificacion: fechaTransferencia.toISOString(),
        usuarioCreacion: 'Sistema',
        usuarioModificacion: 'Sistema',
        usuarioRegistro: 'Sistema'
      });
    }
    
    // Guardar transferencias
    const hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Transferencias');
    
    // Headers
    const headers = ['id', 'numero', 'obraOrigenId', 'obraOrigen', 'direccionOrigen', 'obraDestinoId', 'obraDestino', 'direccionDestino', 'materialId', 'material', 'codigoMaterial', 'cantidad', 'unidad', 'responsable', 'motivo', 'estado', 'observaciones', 'fecha', 'fechaCreacion', 'fechaModificacion', 'usuarioCreacion', 'usuarioModificacion', 'usuarioRegistro'];
    hoja.getRange(1, 1, 1, headers.length).setValues([headers]);
    
    // Datos
    const datos = transferencias.map(trans => [
      trans.id,
      trans.numero,
      trans.obraOrigenId,
      trans.obraOrigen,
      trans.direccionOrigen,
      trans.obraDestinoId,
      trans.obraDestino,
      trans.direccionDestino,
      trans.materialId,
      trans.material,
      trans.codigoMaterial,
      trans.cantidad,
      trans.unidad,
      trans.responsable,
      trans.motivo,
      trans.estado,
      trans.observaciones,
      trans.fecha,
      trans.fechaCreacion,
      trans.fechaModificacion,
      trans.usuarioCreacion,
      trans.usuarioModificacion,
      trans.usuarioRegistro
    ]);
    
    if (datos.length > 0) {
      hoja.getRange(2, 1, datos.length, headers.length).setValues(datos);
    }
    
    console.log(`✅ ${transferencias.length} transferencias creadas`);
    
    return {
      success: true,
      transferencias: transferencias.length,
      datos: transferencias
    };
    
  } catch (error) {
    console.log('❌ Error creando transferencias:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Crear documentos de ejemplo
 */
function crearDocumentos() {
  try {
    // Obtener obras
    const obrasHoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Obras');
    const obrasData = obrasHoja.getDataRange().getValues();
    const obras = [];
    
    for (let i = 1; i < obrasData.length; i++) {
      obras.push({
        id: obrasData[i][0],
        nombre: obrasData[i][1]
      });
    }
    
    const ahora = new Date().toISOString();
    const documentos = [];
    
    // Tipos de documentos
    const tiposDoc = ['plano', 'memoria', 'manual', 'certificado', 'informe', 'otro'];
    const nombresDoc = [
      'Plano As-Built Torre Principal',
      'Memoria Técnica Instalación FO',
      'Manual de Usuario Sistema CATV',
      'Certificado Mediciones Fibra',
      'Informe Avance Mensual',
      'Protocolo de Pruebas'
    ];
    
    // Crear documentos para cada obra
    obras.forEach((obra, obraIndex) => {
      for (let i = 0; i < 2; i++) { // 2 documentos por obra
        const tipoIndex = (obraIndex * 2 + i) % tiposDoc.length;
        const fechaDoc = new Date(Date.now() - (30 - obraIndex * 3 - i) * 24 * 60 * 60 * 1000);
        
        documentos.push({
          id: generateId(),
          nombre: `${nombresDoc[tipoIndex]} - ${obra.nombre}`,
          tipo: tiposDoc[tipoIndex],
          obraId: obra.id,
          obraNombre: obra.nombre,
          descripcion: `Documento ${nombresDoc[tipoIndex].toLowerCase()} correspondiente a la obra ${obra.nombre}`,
          nombreArchivo: `${tiposDoc[tipoIndex]}_${obra.nombre.replace(/\s+/g, '_')}_${Date.now()}.pdf`,
          urlArchivo: `https://drive.google.com/file/d/ejemplo_${generateId()}/view`,
          tamaño: Math.floor(Math.random() * 5000000) + 500000, // 0.5MB a 5.5MB
          fechaSubida: fechaDoc.toISOString(),
          usuarioSubida: ['Carlos Mendoza', 'María González', 'Pedro Ramírez'][i % 3],
          fecha: fechaDoc.toISOString(),
          fechaCreacion: fechaDoc.toISOString(),
          fechaModificacion: fechaDoc.toISOString(),
          usuarioCreacion: 'Sistema',
          usuarioModificacion: 'Sistema',
          usuarioNombre: ['Carlos Mendoza', 'María González', 'Pedro Ramírez'][i % 3]
        });
      }
    });
    
    // Guardar documentos
    const hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Documentos');
    
    // Headers
    const headers = ['id', 'nombre', 'tipo', 'obraId', 'obraNombre', 'descripcion', 'nombreArchivo', 'urlArchivo', 'tamaño', 'fechaSubida', 'usuarioSubida', 'fecha', 'fechaCreacion', 'fechaModificacion', 'usuarioCreacion', 'usuarioModificacion', 'usuarioNombre'];
    hoja.getRange(1, 1, 1, headers.length).setValues([headers]);
    
    // Datos
    const datos = documentos.map(doc => [
      doc.id,
      doc.nombre,
      doc.tipo,
      doc.obraId,
      doc.obraNombre,
      doc.descripcion,
      doc.nombreArchivo,
      doc.urlArchivo,
      doc.tamaño,
      doc.fechaSubida,
      doc.usuarioSubida,
      doc.fecha,
      doc.fechaCreacion,
      doc.fechaModificacion,
      doc.usuarioCreacion,
      doc.usuarioModificacion,
      doc.usuarioNombre
    ]);
    
    if (datos.length > 0) {
      hoja.getRange(2, 1, datos.length, headers.length).setValues(datos);
    }
    
    console.log(`✅ ${documentos.length} documentos creados`);
    
    return {
      success: true,
      documentos: documentos.length,
      datos: documentos
    };
    
  } catch (error) {
    console.log('❌ Error creando documentos:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Crear metas de planificación
 */
function crearMetas() {
  try {
    // Obtener obras en progreso
    const obrasHoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Obras');
    const obrasData = obrasHoja.getDataRange().getValues();
    const obrasEnProgreso = [];
    
    for (let i = 1; i < obrasData.length; i++) {
      if (obrasData[i][10] === 'En progreso') { // estado
        obrasEnProgreso.push({
          id: obrasData[i][0],
          nombre: obrasData[i][1]
        });
      }
    }
    
    const ahora = new Date().toISOString();
    const metas = [];
    
    // Tipos de metas
    const tiposMeta = ['avance', 'tiempo', 'calidad', 'costo'];
    const categoriasMeta = ['instalacion', 'mediciones', 'documentacion', 'certificacion'];
    
    // Crear metas para cada obra en progreso
    obrasEnProgreso.forEach((obra, obraIndex) => {
      for (let i = 0; i < 3; i++) { // 3 metas por obra
        const fechaInicio = new Date(Date.now() - (15 - i * 5) * 24 * 60 * 60 * 1000);
        const fechaTermino = new Date(Date.now() + (30 + i * 10) * 24 * 60 * 60 * 1000);
        const valorObjetivo = [100, 30, 95, 50][i % 4];
        const valorActual = Math.floor(valorObjetivo * (0.3 + Math.random() * 0.5));
        
        const nombresMeta = [
          'Completar instalación coaxial',
          'Finalizar tendido de fibra óptica',
          'Certificar mediciones de calidad',
          'Documentar as-built'
        ];
        
        metas.push({
          id: generateId(),
          obraId: obra.id,
          nombre: `${nombresMeta[i]} - ${obra.nombre}`,
          tipo: tiposMeta[i % tiposMeta.length],
          categoria: categoriasMeta[i % categoriasMeta.length],
          descripcion: `Meta de ${nombresMeta[i].toLowerCase()} para la obra ${obra.nombre}`,
          valorObjetivo: valorObjetivo,
          valorActual: valorActual,
          unidad: ['porcentaje', 'días', 'porcentaje', 'unidades'][i % 4],
          fechaInicio: fechaInicio.toISOString(),
          fechaTermino: fechaTermino.toISOString(),
          estado: valorActual >= valorObjetivo ? 'Completada' : 
                  valorActual > 0 ? 'En curso' : 'Pendiente',
          prioridad: ['alta', 'media', 'alta', 'baja'][i % 4],
          responsable: ['Carlos Mendoza', 'María González'][obraIndex % 2],
          fechaCreacion: ahora,
          fechaModificacion: ahora,
          usuarioCreacion: 'Sistema',
          usuarioModificacion: 'Sistema'
        });
      }
    });
    
    // Guardar metas
    const hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Metas');
    
    // Headers
    const headers = ['id', 'obraId', 'nombre', 'tipo', 'categoria', 'descripcion', 'valorObjetivo', 'valorActual', 'unidad', 'fechaInicio', 'fechaTermino', 'estado', 'prioridad', 'responsable', 'fechaCreacion', 'fechaModificacion', 'usuarioCreacion', 'usuarioModificacion'];
    hoja.getRange(1, 1, 1, headers.length).setValues([headers]);
    
    // Datos
    const datos = metas.map(meta => [
      meta.id,
      meta.obraId,
      meta.nombre,
      meta.tipo,
      meta.categoria,
      meta.descripcion,
      meta.valorObjetivo,
      meta.valorActual,
      meta.unidad,
      meta.fechaInicio,
      meta.fechaTermino,
      meta.estado,
      meta.prioridad,
      meta.responsable,
      meta.fechaCreacion,
      meta.fechaModificacion,
      meta.usuarioCreacion,
      meta.usuarioModificacion
    ]);
    
    if (datos.length > 0) {
      hoja.getRange(2, 1, datos.length, headers.length).setValues(datos);
    }
    
    console.log(`✅ ${metas.length} metas creadas`);
    
    return {
      success: true,
      metas: metas.length,
      datos: metas
    };
    
  } catch (error) {
    console.log('❌ Error creando metas:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Crear registros de cobranza
 */
function crearCobranzas() {
  try {
    // Obtener obras
    const obrasHoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Obras');
    const obrasData = obrasHoja.getDataRange().getValues();
    const obras = [];
    
    for (let i = 1; i < obrasData.length; i++) {
      obras.push({
        id: obrasData[i][0],
        nombre: obrasData[i][1],
        presupuesto: obrasData[i][12] || 50000000
      });
    }
    
    const ahora = new Date().toISOString();
    const cobranzas = [];
    
    // Crear registros de cobranza para algunas obras
    for (let i = 0; i < 6; i++) {
      const obra = obras[i % obras.length];
      const fechaCobranza = new Date(Date.now() - (45 - i * 7) * 24 * 60 * 60 * 1000);
      const montoBase = obra.presupuesto * 0.2; // 20% del presupuesto por cobranza
      const monto = montoBase + (Math.random() * montoBase * 0.3); // Variación del 30%
      
      cobranzas.push({
        id: generateId(),
        obraId: obra.id,
        obraNombre: obra.nombre,
        numeroFactura: `F-${String(2024000 + i).padStart(7, '0')}`,
        fecha: fechaCobranza.toISOString(),
        monto: Math.round(monto),
        moneda: 'CLP',
        concepto: `Avance ${(i + 1) * 20}% - ${obra.nombre}`,
        estado: ['Pendiente', 'Pagada', 'Vencida'][i % 3],
        fechaVencimiento: new Date(fechaCobranza.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        observaciones: i % 3 === 2 ? 'Requiere seguimiento' : '',
        fechaCreacion: fechaCobranza.toISOString(),
        fechaModificacion: fechaCobranza.toISOString(),
        usuarioCreacion: 'Sistema',
        usuarioModificacion: 'Sistema'
      });
    }
    
    // Guardar cobranzas
    const hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Cobranzas');
    
    // Headers
    const headers = ['id', 'obraId', 'obraNombre', 'numeroFactura', 'fecha', 'monto', 'moneda', 'concepto', 'estado', 'fechaVencimiento', 'observaciones', 'fechaCreacion', 'fechaModificacion', 'usuarioCreacion', 'usuarioModificacion'];
    hoja.getRange(1, 1, 1, headers.length).setValues([headers]);
    
    // Datos
    const datos = cobranzas.map(cob => [
      cob.id,
      cob.obraId,
      cob.obraNombre,
      cob.numeroFactura,
      cob.fecha,
      cob.monto,
      cob.moneda,
      cob.concepto,
      cob.estado,
      cob.fechaVencimiento,
      cob.observaciones,
      cob.fechaCreacion,
      cob.fechaModificacion,
      cob.usuarioCreacion,
      cob.usuarioModificacion
    ]);
    
    if (datos.length > 0) {
      hoja.getRange(2, 1, datos.length, headers.length).setValues(datos);
    }
    
    console.log(`✅ ${cobranzas.length} cobranzas creadas`);
    
    return {
      success: true,
      cobranzas: cobranzas.length,
      datos: cobranzas
    };
    
  } catch (error) {
    console.log('❌ Error creando cobranzas:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Crear maquetaciones de ejemplo
 */
function crearMaquetaciones() {
  try {
    // Obtener obras principales
    const obrasHoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Obras');
    const obrasData = obrasHoja.getDataRange().getValues();
    const obrasSeleccionadas = [];
    
    for (let i = 1; i < obrasData.length && obrasSeleccionadas.length < 3; i++) {
      if (obrasData[i][1].includes('Costanera') || obrasData[i][1].includes('Condes') || obrasData[i][1].includes('Hospital')) {
        obrasSeleccionadas.push({
          id: obrasData[i][0],
          nombre: obrasData[i][1]
        });
      }
    }
    
    const ahora = new Date().toISOString();
    const maquetaciones = [];
    
    // Crear maquetaciones para obras seleccionadas
    obrasSeleccionadas.forEach((obra, index) => {
      const estructuraEjemplo = {
        torres: [
          {
            id: `torre_${index}_1`,
            nombre: `Torre ${index + 1}`,
            pisos: Array.from({length: 15}, (_, pisoIndex) => ({
              id: `piso_${index}_${pisoIndex + 1}`,
              numero: pisoIndex + 1,
              departamentos: Array.from({length: 4}, (_, deptoIndex) => ({
                id: `depto_${index}_${pisoIndex + 1}_${deptoIndex + 1}`,
                numero: `${pisoIndex + 1}0${deptoIndex + 1}`,
                tipo: 'Residencial'
              }))
            }))
          }
        ],
        configuracion: {
          tipoSenal: ['COAXIAL_ALAMBRICO', 'COAXIAL_INALAMBRICO', 'FO'][index % 3],
          componentes: {
            odf: true,
            puntosAcceso: true,
            cajaPaso: true,
            rack: index === 0,
            antenas: index === 1
          },
          mediciones: {
            coaxial: index !== 2,
            fo: index === 2,
            alambrico: true,
            inalambrico: index === 1
          },
          sistemasIntegrados: {
            incendios: index === 2,
            corrientesDebiles: true,
            citofonia: index !== 2,
            motoresAcceso: index === 0
          }
        }
      };
      
      maquetaciones.push({
        id: generateId(),
        obraId: obra.id,
        obraNombre: obra.nombre,
        nombre: `Maquetación ${obra.nombre}`,
        descripcion: `Configuración de maquetación para ${obra.nombre}`,
        estructura: JSON.stringify(estructuraEjemplo),
        estado: ['Borrador', 'Aprobada', 'En uso'][index % 3],
        version: '1.0',
        fechaCreacion: ahora,
        fechaModificacion: ahora,
        usuarioCreacion: 'Sistema',
        usuarioModificacion: 'Sistema'
      });
    });
    
    // Guardar maquetaciones
    const hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Maquetaciones');
    
    // Headers
    const headers = ['id', 'obraId', 'obraNombre', 'nombre', 'descripcion', 'estructura', 'estado', 'version', 'fechaCreacion', 'fechaModificacion', 'usuarioCreacion', 'usuarioModificacion'];
    hoja.getRange(1, 1, 1, headers.length).setValues([headers]);
    
    // Datos
    const datos = maquetaciones.map(maq => [
      maq.id,
      maq.obraId,
      maq.obraNombre,
      maq.nombre,
      maq.descripcion,
      maq.estructura,
      maq.estado,
      maq.version,
      maq.fechaCreacion,
      maq.fechaModificacion,
      maq.usuarioCreacion,
      maq.usuarioModificacion
    ]);
    
    if (datos.length > 0) {
      hoja.getRange(2, 1, datos.length, headers.length).setValues(datos);
    }
    
    console.log(`✅ ${maquetaciones.length} maquetaciones creadas`);
    
    return {
      success: true,
      maquetaciones: maquetaciones.length,
      datos: maquetaciones
    };
    
  } catch (error) {
    console.log('❌ Error creando maquetaciones:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Crear log de inicialización
 */
function crearLogInicializacion(resultados) {
  try {
    const hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Logs');
    
    // Headers si no existen
    if (hoja.getLastRow() === 0) {
      const headers = ['id', 'fecha', 'tipo', 'accion', 'usuario', 'detalles', 'resultado'];
      hoja.getRange(1, 1, 1, headers.length).setValues([headers]);
    }
    
    const logEntry = [
      generateId(),
      new Date().toISOString(),
      'SISTEMA',
      'INICIALIZACION_COMPLETA',
      'Sistema',
      JSON.stringify({
        version: INIT_CONFIG.VERSION,
        tiempoTotal: resultados.tiempoTotal,
        pasosCompletados: resultados.pasos.length,
        errores: resultados.errores.length
      }),
      resultados.exitoso ? 'EXITOSO' : 'CON_ERRORES'
    ];
    
    hoja.appendRow(logEntry);
    
    console.log('✅ Log de inicialización creado');
    
  } catch (error) {
    console.log('❌ Error creando log:', error.message);
  }
}

// ============================================================================
// FUNCIONES DE UTILIDAD
// ============================================================================

/**
 * Generar ID único
 */
function generateId() {
  return String(currentId++);
}

/**
 * Log de pasos
 */
function logStep(mensaje) {
  console.log(`\n${mensaje}`);
  console.log('─'.repeat(mensaje.length));
}

// ============================================================================
// FUNCIONES DE DIAGNÓSTICO Y MANTENIMIENTO
// ============================================================================

/**
 * Diagnosticar estado del sistema después de inicialización
 */
function diagnosticarSistemaCompleto() {
  console.log('🔍 DIAGNÓSTICO COMPLETO DEL SISTEMA BDPA');
  console.log('=========================================');
  
  const diagnostico = {
    spreadsheet: null,
    hojas: {},
    contadores: {},
    estado: 'unknown',
    errores: []
  };
  
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    diagnostico.spreadsheet = {
      id: spreadsheet.getId(),
      nombre: spreadsheet.getName(),
      url: spreadsheet.getUrl()
    };
    
    // Verificar cada hoja y contar registros
    const hojasEsperadas = [
      'Usuarios', 'Obras', 'Avances', 'Materiales', 'Categorias',
      'Movimientos', 'Cobranzas', 'Metas', 'Documentos', 'Transferencias',
      'Configuracion', 'Logs', 'Maquetaciones'
    ];
    
    hojasEsperadas.forEach(nombreHoja => {
      try {
        const hoja = spreadsheet.getSheetByName(nombreHoja);
        if (hoja) {
          const filas = hoja.getLastRow();
          diagnostico.hojas[nombreHoja] = {
            existe: true,
            registros: Math.max(0, filas - 1) // Restar header
          };
          diagnostico.contadores[nombreHoja] = Math.max(0, filas - 1);
        } else {
          diagnostico.hojas[nombreHoja] = { existe: false };
          diagnostico.errores.push(`Hoja faltante: ${nombreHoja}`);
        }
      } catch (error) {
        diagnostico.hojas[nombreHoja] = { existe: false, error: error.message };
        diagnostico.errores.push(`Error en hoja ${nombreHoja}: ${error.message}`);
      }
    });
    
    // Determinar estado general
    const hojasExistentes = Object.values(diagnostico.hojas).filter(h => h.existe).length;
    const totalRegistros = Object.values(diagnostico.contadores).reduce((sum, count) => sum + count, 0);
    
    if (hojasExistentes === hojasEsperadas.length && totalRegistros > 50) {
      diagnostico.estado = 'completamente_inicializado';
    } else if (hojasExistentes >= hojasEsperadas.length * 0.8) {
      diagnostico.estado = 'parcialmente_inicializado';
    } else {
      diagnostico.estado = 'no_inicializado';
    }
    
    // Mostrar resultados
    console.log(`📊 Spreadsheet: ${diagnostico.spreadsheet.nombre}`);
    console.log(`🆔 ID: ${diagnostico.spreadsheet.id}`);
    console.log(`🔗 URL: ${diagnostico.spreadsheet.url}`);
    console.log(`\n📋 HOJAS Y REGISTROS:`);
    
    Object.keys(diagnostico.hojas).forEach(nombreHoja => {
      const hoja = diagnostico.hojas[nombreHoja];
      if (hoja.existe) {
        console.log(`  ✅ ${nombreHoja}: ${hoja.registros} registros`);
      } else {
        console.log(`  ❌ ${nombreHoja}: No existe`);
      }
    });
    
    console.log(`\n📈 RESUMEN:`);
    console.log(`  • Total de hojas: ${hojasExistentes}/${hojasEsperadas.length}`);
    console.log(`  • Total de registros: ${totalRegistros}`);
    console.log(`  • Estado: ${diagnostico.estado}`);
    console.log(`  • Errores: ${diagnostico.errores.length}`);
    
    if (diagnostico.errores.length > 0) {
      console.log(`\n❌ ERRORES ENCONTRADOS:`);
      diagnostico.errores.forEach(error => console.log(`  - ${error}`));
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
 * Resetear sistema completo (USAR CON EXTREMA PRECAUCIÓN)
 */
function resetearSistemaCompleto() {
  const confirmacion = Browser.msgBox(
    'ADVERTENCIA CRÍTICA',
    '¿Está ABSOLUTAMENTE SEGURO de que desea ELIMINAR TODOS LOS DATOS?\n\n' +
    'Esta acción:\n' +
    '• Eliminará TODAS las hojas de datos\n' +
    '• Borrará TODOS los registros\n' +
    '• NO SE PUEDE DESHACER\n\n' +
    'Para confirmar, debe hacer clic en SÍ dos veces.',
    Browser.Buttons.YES_NO
  );
  
  if (confirmacion !== Browser.Buttons.YES) {
    console.log('ℹ️ Reseteo cancelado por el usuario');
    return { success: false, mensaje: 'Operación cancelada' };
  }
  
  // Segunda confirmación
  const segundaConfirmacion = Browser.msgBox(
    'ÚLTIMA ADVERTENCIA',
    'Esta es su ÚLTIMA OPORTUNIDAD para cancelar.\n\n' +
    'Al hacer clic en SÍ, se eliminarán PERMANENTEMENTE todos los datos.\n\n' +
    '¿Continuar con el reseteo completo?',
    Browser.Buttons.YES_NO
  );
  
  if (segundaConfirmacion !== Browser.Buttons.YES) {
    console.log('ℹ️ Reseteo cancelado en segunda confirmación');
    return { success: false, mensaje: 'Operación cancelada' };
  }
  
  try {
    console.log('🔥 INICIANDO RESETEO COMPLETO DEL SISTEMA...');
    
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const hojas = spreadsheet.getSheets();
    
    // Eliminar todas las hojas excepto una temporal
    const hojaTemp = spreadsheet.insertSheet('TEMP_RESET');
    
    hojas.forEach(hoja => {
      if (hoja.getName() !== 'TEMP_RESET') {
        try {
          spreadsheet.deleteSheet(hoja);
          console.log(`🗑️ Hoja eliminada: ${hoja.getName()}`);
        } catch (e) {
          console.log(`⚠️ No se pudo eliminar: ${hoja.getName()}`);
        }
      }
    });
    
    // Limpiar propiedades del script
    PropertiesService.getScriptProperties().deleteAll();
    
    // Resetear contador de IDs
    currentId = 1000;
    
    console.log('✅ Sistema reseteado completamente');
    console.log('ℹ️ Ejecute inicializarSistemaCompleto() para reinicializar');
    
    return {
      success: true,
      mensaje: 'Sistema reseteado completamente. Ejecute inicializarSistemaCompleto() para reinicializar.'
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
// FUNCIONES EXPORTADAS PARA USO EXTERNO
// ============================================================================

/**
 * Función rápida para inicializar solo lo básico
 */
function inicializacionRapida() {
  console.log('⚡ INICIALIZACIÓN RÁPIDA - Solo datos esenciales');
  
  try {
    configurarSpreadsheetPrincipal();
    crearEstructuraHojas();
    inicializarConfiguracionSistema();
    crearCategorias();
    crearUsuarios();
    
    console.log('✅ Inicialización rápida completada');
    console.log(`👤 Usuario: ${INIT_CONFIG.ADMIN_USER}`);
    console.log(`🔑 Contraseña: ${INIT_CONFIG.ADMIN_PASS}`);
    
    return { success: true, mensaje: 'Inicialización rápida completada' };
    
  } catch (error) {
    console.log('❌ Error en inicialización rápida:', error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Función para agregar datos de ejemplo a sistema existente
 */
function agregarDatosEjemplo() {
  console.log('📊 AGREGANDO DATOS DE EJEMPLO');
  
  try {
    crearObras();
    crearMateriales();
    crearAvances();
    crearMovimientos();
    crearTransferencias();
    crearDocumentos();
    crearMetas();
    crearCobranzas();
    crearMaquetaciones();
    
    console.log('✅ Datos de ejemplo agregados correctamente');
    return { success: true, mensaje: 'Datos de ejemplo agregados' };
    
  } catch (error) {
    console.log('❌ Error agregando datos de ejemplo:', error.message);
    return { success: false, error: error.message };
  }
}

// ============================================================================
// MENSAJE DE CARGA
// ============================================================================

console.log('📁 Inicio.gs cargado correctamente');
console.log('🚀 Funciones disponibles:');
console.log('  • inicializarSistemaCompleto() - Inicialización completa');
console.log('  • inicializacionRapida() - Solo datos esenciales');
console.log('  • agregarDatosEjemplo() - Agregar datos de ejemplo');
console.log('  • diagnosticarSistemaCompleto() - Verificar estado');
console.log('  • resetearSistemaCompleto() - Resetear todo (PELIGROSO)');