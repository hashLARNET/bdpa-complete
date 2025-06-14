// ============================================================================
// BDPA - Code.gs - PARTE 1: Configuración y funciones principales
// ============================================================================

/**
 * BDPA v2.0 - Base de Datos de Progreso Automatizado
 * Sistema de gestión de obras de telecomunicaciones
 * Desarrollado por Larnet Telecomunicaciones
 */

// ============================================================================
// CONFIGURACIÓN GLOBAL
// ============================================================================

const CONFIG = {
  VERSION: '2.0',
  APP_NAME: 'BDPA - Base de Datos de Progreso Automatizado',
  DEVELOPER: 'Larnet Telecomunicaciones',
  
  // IDs de hojas de cálculo (configurar según tu proyecto)
  SPREADSHEET_ID: PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID') || '1ilctQV0Hc__lYhNrMYd1DKvIZ7z5ou3rf9jv76au0jM',
  
  // Nombres de las hojas
  SHEETS: {
    USUARIOS: 'Usuarios',
    OBRAS: 'Obras',
    AVANCES: 'Avances',
    MATERIALES: 'Materiales',
    CATEGORIAS: 'Categorias',
    MOVIMIENTOS: 'Movimientos',
    COBRANZAS: 'Cobranzas',
    METAS: 'Metas',
    DOCUMENTOS: 'Documentos',
    TRANSFERENCIAS: 'Transferencias',
    CONFIGURACION: 'Configuracion',
    LOGS: 'Logs'
  },
  
  // Configuración de sesiones
  SESSION_TIMEOUT: 8 * 60 * 60 * 1000, // 8 horas en milisegundos
  
  // Configuración de archivos
  DRIVE_FOLDER: PropertiesService.getScriptProperties().getProperty('DRIVE_FOLDER') || '',
  
  // Configuración de correo
  EMAIL_CONFIG: {
    FROM_NAME: 'BDPA Sistema',
    TEMPLATE_FOLDER: 'BDPA_Templates'
  }
};

// ============================================================================
// FUNCIÓN PRINCIPAL DE API
// ============================================================================

/**
 * Función principal que procesa todas las llamadas API desde el frontend
 * @param {string} accion - La acción a ejecutar
 * @param {Object} datos - Los datos enviados desde el frontend
 * @param {string} token - Token de sesión del usuario
 * @returns {Object} Respuesta de la API
 */
function procesarAPI(accion, datos = {}, token = null) {
  try {
    // Log de la petición
    logAction(`API Call: ${accion}`, datos, token);
    
    // Verificar autenticación para acciones que lo requieren
    const accionesPublicas = ['iniciarSesion', 'ping'];
    
    if (!accionesPublicas.includes(accion)) {
      const usuario = verificarSesion(token);
      if (!usuario) {
        return {
          success: false,
          error: true,
          message: 'Sesión expirada. Por favor, inicie sesión nuevamente.',
          requiresLogin: true
        };
      }
      
      // Agregar usuario a los datos para uso en las funciones
      datos.usuarioActual = usuario;
    }
    
    // Rutear la acción a la función correspondiente
    let resultado;
    
    switch (accion) {
      // ===== AUTENTICACIÓN =====
      case 'iniciarSesion':
        resultado = iniciarSesion(datos.username, datos.password);
        break;
        
      case 'cerrarSesion':
        resultado = cerrarSesion(token);
        break;
        
      case 'cambiarContrasena':
        resultado = cambiarContrasena(datos, token);
        break;
        
      case 'renovarSesion':
        resultado = renovarSesion(token);
        break;
        
      // ===== OBRAS =====
      case 'obtenerObras':
        resultado = obtenerObras(datos);
        break;
        
      case 'guardarObra':
        resultado = guardarObra(datos);
        break;
        
      case 'eliminarObra':
        resultado = eliminarObra(datos.id);
        break;
        
      case 'obtenerTorresObra':
        resultado = obtenerTorresObra(datos.obraId);
        break;
        
      case 'obtenerPisosTorre':
        resultado = obtenerPisosTorre(datos.torreId);
        break;
        
      case 'obtenerDepartamentosPiso':
        resultado = obtenerDepartamentosPiso(datos.pisoId);
        break;
        
      // ===== MAQUETACIÓN =====
      case 'guardarMaquetacion':
        resultado = guardarMaquetacion(datos);
        break;
        
      case 'obtenerMaquetacion':
        resultado = obtenerMaquetacion(datos.obraId);
        break;
        
      // ===== AVANCES =====
      case 'registrarAvance':
        resultado = registrarAvance(datos);
        break;
        
      case 'obtenerAvances':
        resultado = obtenerAvances(datos);
        break;
        
      case 'obtenerDetalleAvance':
        resultado = obtenerDetalleAvance(datos.id);
        break;
        
      case 'obtenerTiposAvance':
        resultado = obtenerTiposAvance(datos);
        break;
        
      case 'obtenerEspaciosComunes':
        resultado = obtenerEspaciosComunes(datos.obraId);
        break;
        
      // ===== INVENTARIO =====
      case 'obtenerMateriales':
        resultado = obtenerMateriales(datos);
        break;
        
      case 'guardarMaterial':
        resultado = guardarMaterial(datos);
        break;
        
      case 'eliminarMaterial':
        resultado = eliminarMaterial(datos.materialId);
        break;
        
      case 'registrarEntradaMaterial':
        resultado = registrarEntradaMaterial(datos);
        break;
        
      case 'registrarSalidaMaterial':
        resultado = registrarSalidaMaterial(datos);
        break;
        
      case 'obtenerMovimientosInventario':
        resultado = obtenerMovimientosInventario(datos);
        break;
        
      // ===== CATEGORÍAS =====
      case 'obtenerCategorias':
        resultado = obtenerCategorias();
        break;
        
      case 'guardarCategoria':
        resultado = guardarCategoria(datos);
        break;
        
      case 'eliminarCategoria':
        resultado = eliminarCategoria(datos.categoriaId);
        break;
        
      // ===== USUARIOS =====
      case 'obtenerUsuarios':
        resultado = obtenerUsuarios();
        break;
        
      case 'guardarUsuario':
        resultado = guardarUsuario(datos);
        break;
        
      case 'eliminarUsuario':
        resultado = eliminarUsuario(datos.id);
        break;
        
      // ===== REPORTES =====
      case 'generarReporteAvances':
        resultado = generarReporteAvances(datos);
        break;
        
      case 'exportarReporteAvances':
        resultado = exportarReporteAvances(datos);
        break;
        
      case 'generarReporteInventario':
        resultado = generarReporteInventario(datos);
        break;
        
      case 'exportarReporteInventario':
        resultado = exportarReporteInventario(datos);
        break;
        
      // ===== COBRANZAS =====
      case 'obtenerResumenCobranza':
        resultado = obtenerResumenCobranza(datos.obraId);
        break;
        
      case 'registrarCobranza':
        resultado = registrarCobranza(datos);
        break;
        
      case 'obtenerHistorialCobranzas':
        resultado = obtenerHistorialCobranzas(datos.obraId);
        break;
        
      // ===== TRANSFERENCIAS =====
      case 'obtenerMaterialesDisponiblesObra':
        resultado = obtenerMaterialesDisponiblesObra(datos.obraId);
        break;
        
      case 'registrarTransferencia':
        resultado = registrarTransferencia(datos);
        break;
        
      // ===== UTILIDADES =====
      case 'ping':
        resultado = { success: true, message: 'Conexión exitosa', timestamp: new Date() };
        break;
        
      default:
        resultado = {
          success: false,
          error: true,
          message: `Acción no reconocida: ${accion}`
        };
    }
    
    // Log del resultado exitoso
    if (resultado && resultado.success !== false) {
      logAction(`API Success: ${accion}`, { hasData: !!resultado.datos }, token);
    }
    
    return resultado;
    
  } catch (error) {
    // Log del error
    logError(`API Error: ${accion}`, error, { datos, token });
    
    return {
      success: false,
      error: true,
      message: `Error interno del servidor: ${error.message}`,
      details: CONFIG.DEBUG ? error.toString() : undefined
    };
  }
}

// ============================================================================
// FUNCIONES DE AUTENTICACIÓN
// ============================================================================

/**
 * Iniciar sesión de usuario
 * @param {string} username - Nombre de usuario
 * @param {string} password - Contraseña
 * @returns {Object} Resultado de la autenticación
 */
function iniciarSesion(username, password) {
  try {
    if (!username || !password) {
      return {
        success: false,
        message: 'Usuario y contraseña son requeridos'
      };
    }
    
    const usuarios = obtenerDatosHoja(CONFIG.SHEETS.USUARIOS);
    const usuario = usuarios.find(u => u.usuario === username && u.activo !== false);
    
    if (!usuario) {
      logAction('Login Failed: Usuario no encontrado', { username });
      return {
        success: false,
        message: 'Usuario no encontrado o inactivo'
      };
    }
    
    // Verificar contraseña (en producción debería usar hash)
    if (usuario.contrasena !== password) {
      logAction('Login Failed: Contraseña incorrecta', { username });
      return {
        success: false,
        message: 'Contraseña incorrecta'
      };
    }
    
    // Generar token de sesión
    const token = generarToken();
    const ahora = new Date();
    
    // Guardar sesión
    const sesion = {
      token: token,
      usuarioId: usuario.id,
      usuario: usuario,
      fechaInicio: ahora.toISOString(),
      ultimaActividad: ahora.toISOString(),
      activa: true
    };
    
    guardarSesion(sesion);
    
    // Actualizar último acceso del usuario
    actualizarUltimoAcceso(usuario.id);
    
    logAction('Login Success', { username, userId: usuario.id });
    
    return {
      success: true,
      token: token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        usuario: usuario.usuario,
        rol: usuario.rol,
        email: usuario.email,
        requiereCambioContrasena: usuario.requiereCambioContrasena || false
      },
      message: 'Sesión iniciada correctamente'
    };
    
  } catch (error) {
    logError('iniciarSesion', error, { username });
    return {
      success: false,
      message: 'Error al iniciar sesión'
    };
  }
}

/**
 * Verificar sesión activa
 * @param {string} token - Token de sesión
 * @returns {Object|null} Usuario si la sesión es válida, null si no
 */
function verificarSesion(token) {
  try {
    if (!token) return null;
    
    const sesion = obtenerSesion(token);
    if (!sesion || !sesion.activa) return null;
    
    const ahora = new Date();
    const ultimaActividad = new Date(sesion.ultimaActividad);
    
    // Verificar si la sesión ha expirado
    if (ahora.getTime() - ultimaActividad.getTime() > CONFIG.SESSION_TIMEOUT) {
      cerrarSesion(token);
      return null;
    }
    
    // Actualizar última actividad
    sesion.ultimaActividad = ahora.toISOString();
    guardarSesion(sesion);
    
    return sesion.usuario;
    
  } catch (error) {
    logError('verificarSesion', error, { token });
    return null;
  }
}

/**
 * Cerrar sesión
 * @param {string} token - Token de sesión
 * @returns {Object} Resultado de cerrar sesión
 */
function cerrarSesion(token) {
  try {
    if (token) {
      const sesion = obtenerSesion(token);
      if (sesion) {
        sesion.activa = false;
        sesion.fechaCierre = new Date().toISOString();
        guardarSesion(sesion);
        logAction('Logout', { userId: sesion.usuarioId });
      }
    }
    
    return {
      success: true,
      message: 'Sesión cerrada correctamente'
    };
    
  } catch (error) {
    logError('cerrarSesion', error, { token });
    return {
      success: false,
      message: 'Error al cerrar sesión'
    };
  }
}

/**
 * Cambiar contraseña del usuario
 * @param {Object} datos - Datos para cambio de contraseña
 * @param {string} token - Token de sesión
 * @returns {Object} Resultado del cambio
 */
function cambiarContrasena(datos, token) {
  try {
    const usuario = verificarSesion(token);
    if (!usuario) {
      return {
        success: false,
        message: 'Sesión no válida'
      };
    }
    
    const { contrasenaActual, nuevaContrasena } = datos;
    
    if (!contrasenaActual || !nuevaContrasena) {
      return {
        success: false,
        message: 'Contraseña actual y nueva son requeridas'
      };
    }
    
    if (nuevaContrasena.length < 8) {
      return {
        success: false,
        message: 'La nueva contraseña debe tener al menos 8 caracteres'
      };
    }
    
    // Verificar contraseña actual
    const usuarios = obtenerDatosHoja(CONFIG.SHEETS.USUARIOS);
    const usuarioActual = usuarios.find(u => u.id === usuario.id);
    
    if (!usuarioActual || usuarioActual.contrasena !== contrasenaActual) {
      return {
        success: false,
        message: 'La contraseña actual es incorrecta'
      };
    }
    
    // Actualizar contraseña
    usuarioActual.contrasena = nuevaContrasena;
    usuarioActual.requiereCambioContrasena = false;
    usuarioActual.fechaCambioContrasena = new Date().toISOString();
    
    guardarDatosHoja(CONFIG.SHEETS.USUARIOS, usuarios);
    
    logAction('Password Changed', { userId: usuario.id });
    
    return {
      success: true,
      message: 'Contraseña cambiada correctamente'
    };
    
  } catch (error) {
    logError('cambiarContrasena', error, { token });
    return {
      success: false,
      message: 'Error al cambiar la contraseña'
    };
  }
}

// ============================================================================
// FUNCIONES DE UTILIDAD PARA SESIONES
// ============================================================================

/**
 * Generar token único para sesión
 * @returns {string} Token generado
 */
function generarToken() {
  const timestamp = new Date().getTime();
  const random = Math.random().toString(36).substring(2);
  return `${timestamp}_${random}`;
}

/**
 * Guardar sesión en caché
 * @param {Object} sesion - Datos de la sesión
 */
function guardarSesion(sesion) {
  const cache = CacheService.getScriptCache();
  const key = `session_${sesion.token}`;
  cache.put(key, JSON.stringify(sesion), CONFIG.SESSION_TIMEOUT / 1000);
}

/**
 * Obtener sesión desde caché
 * @param {string} token - Token de sesión
 * @returns {Object|null} Datos de la sesión
 */
function obtenerSesion(token) {
  try {
    const cache = CacheService.getScriptCache();
    const key = `session_${token}`;
    const sesionStr = cache.get(key);
    
    return sesionStr ? JSON.parse(sesionStr) : null;
  } catch (error) {
    logError('obtenerSesion', error, { token });
    return null;
  }
}

/**
 * Actualizar último acceso del usuario
 * @param {string} usuarioId - ID del usuario
 */
function actualizarUltimoAcceso(usuarioId) {
  try {
    const usuarios = obtenerDatosHoja(CONFIG.SHEETS.USUARIOS);
    const usuario = usuarios.find(u => u.id === usuarioId);
    
    if (usuario) {
      usuario.ultimoAcceso = new Date().toISOString();
      guardarDatosHoja(CONFIG.SHEETS.USUARIOS, usuarios);
    }
  } catch (error) {
    logError('actualizarUltimoAcceso', error, { usuarioId });
  }
}

/**
 * Renovar sesión existente
 * @param {string} token - Token de sesión
 * @returns {Object} Resultado de la renovación
 */
function renovarSesion(token) {
  try {
    const usuario = verificarSesion(token);
    if (usuario) {
      return {
        success: true,
        message: 'Sesión renovada',
        usuario: usuario
      };
    } else {
      return {
        success: false,
        message: 'Sesión expirada',
        requiresLogin: true
      };
    }
  } catch (error) {
    return {
      success: false,
      message: 'Error al renovar sesión'
    };
  }
}
// ============================================================================
// BDPA - Code.gs - PARTE 2: Gestión de Obras y Maquetación
// ============================================================================

// ============================================================================
// FUNCIONES DE GESTIÓN DE OBRAS
// ============================================================================

/**
 * Obtener todas las obras con filtros opcionales
 * @param {Object} datos - Filtros y opciones de búsqueda
 * @returns {Object} Lista de obras
 */
function obtenerObras(datos = {}) {
  try {
    const { filtros = {}, busqueda = '', ordenarPor = 'fechaCreacion', orden = 'desc' } = datos;
    
    let obras = obtenerDatosHoja(CONFIG.SHEETS.OBRAS);
    
    if (!obras) {
      // Inicializar hoja si no existe
      inicializarHojaObras();
      obras = [];
    }
    
    // Aplicar búsqueda
    if (busqueda) {
      const busquedaLower = busqueda.toLowerCase();
      obras = obras.filter(obra => 
        obra.nombre.toLowerCase().includes(busquedaLower) ||
        obra.direccion.toLowerCase().includes(busquedaLower) ||
        obra.cliente.toLowerCase().includes(busquedaLower) ||
        obra.estado.toLowerCase().includes(busquedaLower)
      );
    }
    
    // Aplicar filtros
    if (filtros.estado) {
      obras = obras.filter(obra => obra.estado === filtros.estado);
    }
    
    if (filtros.tipo) {
      obras = obras.filter(obra => obra.tipo === filtros.tipo);
    }
    
    if (filtros.supervisor) {
      obras = obras.filter(obra => obra.supervisor === filtros.supervisor);
    }
    
    if (filtros.fechaInicio && filtros.fechaFin) {
      obras = obras.filter(obra => {
        const fechaObra = new Date(obra.fechaInicio);
        return fechaObra >= new Date(filtros.fechaInicio) && 
               fechaObra <= new Date(filtros.fechaFin);
      });
    }
    
    // Ordenar resultados
    obras.sort((a, b) => {
      let valorA = a[ordenarPor];
      let valorB = b[ordenarPor];
      
      if (ordenarPor.includes('fecha')) {
        valorA = new Date(valorA);
        valorB = new Date(valorB);
      }
      
      if (orden === 'desc') {
        return valorB > valorA ? 1 : -1;
      } else {
        return valorA > valorB ? 1 : -1;
      }
    });
    
    // Calcular estadísticas
    const estadisticas = {
      total: obras.length,
      enPlanificacion: obras.filter(o => o.estado === 'Planificación').length,
      enProgreso: obras.filter(o => o.estado === 'En progreso').length,
      finalizadas: obras.filter(o => o.estado === 'Finalizada').length,
      suspendidas: obras.filter(o => o.estado === 'Suspendida').length
    };
    
    return {
      success: true,
      datos: obras,
      estadisticas: estadisticas,
      total: obras.length
    };
    
  } catch (error) {
    logError('obtenerObras', error, datos);
    return {
      success: false,
      message: 'Error al obtener las obras'
    };
  }
}

/**
 * Guardar una obra (crear o actualizar)
 * @param {Object} datos - Datos de la obra
 * @returns {Object} Resultado de la operación
 */
function guardarObra(datos) {
  try {
    const { 
      id, nombre, direccion, estado, tipo, cliente, supervisor,
      fechaInicio, fechaFin, descripcion, presupuesto, 
      contactoCliente, telefonoCliente, emailCliente,
      observaciones, prioridad = 'Media'
    } = datos;
    
    // Validaciones
    if (!nombre || !direccion || !estado || !tipo) {
      return {
        success: false,
        message: 'Nombre, dirección, estado y tipo son campos obligatorios'
      };
    }
    
    const obras = obtenerDatosHoja(CONFIG.SHEETS.OBRAS);
    const ahora = new Date().toISOString();
    
    if (id) {
      // Actualizar obra existente
      const index = obras.findIndex(o => o.id === id);
      if (index === -1) {
        return {
          success: false,
          message: 'Obra no encontrada'
        };
      }
      
      // Mantener algunos campos de la obra original
      const obraOriginal = obras[index];
      
      obras[index] = {
        ...obraOriginal,
        nombre,
        direccion,
        estado,
        tipo,
        cliente,
        supervisor,
        fechaInicio,
        fechaFin,
        descripcion,
        presupuesto: presupuesto ? parseFloat(presupuesto) : 0,
        contactoCliente,
        telefonoCliente,
        emailCliente,
        observaciones,
        prioridad,
        fechaModificacion: ahora,
        usuarioModificacion: datos.usuarioActual?.id || 'Sistema'
      };
      
      logAction('Obra Actualizada', { obraId: id, nombre });
      
    } else {
      // Crear nueva obra
      const nuevoId = generarId();
      const nuevaObra = {
        id: nuevoId,
        nombre,
        direccion,
        estado,
        tipo,
        cliente,
        supervisor,
        fechaInicio,
        fechaFin,
        descripcion,
        presupuesto: presupuesto ? parseFloat(presupuesto) : 0,
        contactoCliente,
        telefonoCliente,
        emailCliente,
        observaciones,
        prioridad,
        progreso: 0,
        fechaCreacion: ahora,
        fechaModificacion: ahora,
        usuarioCreacion: datos.usuarioActual?.id || 'Sistema',
        usuarioModificacion: datos.usuarioActual?.id || 'Sistema',
        activa: true
      };
      
      obras.push(nuevaObra);
      
      logAction('Obra Creada', { obraId: nuevoId, nombre });
    }
    
    guardarDatosHoja(CONFIG.SHEETS.OBRAS, obras);
    
    return {
      success: true,
      message: id ? 'Obra actualizada correctamente' : 'Obra creada correctamente',
      id: id || nuevoId
    };
    
  } catch (error) {
    logError('guardarObra', error, datos);
    return {
      success: false,
      message: 'Error al guardar la obra'
    };
  }
}

/**
 * Eliminar una obra
 * @param {string} id - ID de la obra
 * @returns {Object} Resultado de la operación
 */
function eliminarObra(id) {
  try {
    if (!id) {
      return {
        success: false,
        message: 'ID de obra requerido'
      };
    }
    
    const obras = obtenerDatosHoja(CONFIG.SHEETS.OBRAS);
    const index = obras.findIndex(o => o.id === id);
    
    if (index === -1) {
      return {
        success: false,
        message: 'Obra no encontrada'
      };
    }
    
    // Verificar si la obra tiene avances o datos asociados
    const avances = obtenerDatosHoja(CONFIG.SHEETS.AVANCES);
    const tieneAvances = avances.some(a => a.obraId === id);
    
    if (tieneAvances) {
      return {
        success: false,
        message: 'No se puede eliminar la obra porque tiene avances registrados'
      };
    }
    
    const obraNombre = obras[index].nombre;
    obras.splice(index, 1);
    
    guardarDatosHoja(CONFIG.SHEETS.OBRAS, obras);
    
    logAction('Obra Eliminada', { obraId: id, nombre: obraNombre });
    
    return {
      success: true,
      message: 'Obra eliminada correctamente'
    };
    
  } catch (error) {
    logError('eliminarObra', error, { id });
    return {
      success: false,
      message: 'Error al eliminar la obra'
    };
  }
}

// ============================================================================
// FUNCIONES DE MAQUETACIÓN
// ============================================================================

/**
 * Guardar configuración de maquetación de una obra
 * @param {Object} datos - Configuración de maquetación
 * @returns {Object} Resultado de la operación
 */
function guardarMaquetacion(datos) {
  try {
    const { obraId, configuracion } = datos;
    
    if (!obraId || !configuracion) {
      return {
        success: false,
        message: 'ID de obra y configuración son requeridos'
      };
    }
    
    // Validar que la obra existe
    const obras = obtenerDatosHoja(CONFIG.SHEETS.OBRAS);
    const obra = obras.find(o => o.id === obraId);
    
    if (!obra) {
      return {
        success: false,
        message: 'Obra no encontrada'
      };
    }
    
    // Validar estructura de configuración
    const validacion = validarConfiguracionMaquetacion(configuracion);
    if (!validacion.valida) {
      return {
        success: false,
        message: validacion.errores.join(', ')
      };
    }
    
    // Guardar en una hoja específica de maquetaciones
    let maquetaciones = obtenerDatosHoja('Maquetaciones') || [];
    
    const ahora = new Date().toISOString();
    const maquetacionExistente = maquetaciones.findIndex(m => m.obraId === obraId);
    
    const maquetacionData = {
      obraId: obraId,
      configuracion: configuracion,
      fechaModificacion: ahora,
      usuarioModificacion: datos.usuarioActual?.id || 'Sistema',
      version: (maquetacionExistente >= 0 ? maquetaciones[maquetacionExistente].version + 1 : 1)
    };
    
    if (maquetacionExistente >= 0) {
      // Actualizar existente
      maquetacionData.fechaCreacion = maquetaciones[maquetacionExistente].fechaCreacion;
      maquetacionData.usuarioCreacion = maquetaciones[maquetacionExistente].usuarioCreacion;
      maquetaciones[maquetacionExistente] = maquetacionData;
    } else {
      // Crear nueva
      maquetacionData.fechaCreacion = ahora;
      maquetacionData.usuarioCreacion = datos.usuarioActual?.id || 'Sistema';
      maquetaciones.push(maquetacionData);
    }
    
    guardarDatosHoja('Maquetaciones', maquetaciones);
    
    // Actualizar progreso de la obra
    actualizarProgresoObra(obraId);
    
    logAction('Maquetación Guardada', { obraId, version: maquetacionData.version });
    
    return {
      success: true,
      message: 'Configuración de maquetación guardada correctamente',
      version: maquetacionData.version
    };
    
  } catch (error) {
    logError('guardarMaquetacion', error, datos);
    return {
      success: false,
      message: 'Error al guardar la configuración de maquetación'
    };
  }
}

/**
 * Obtener configuración de maquetación de una obra
 * @param {string} obraId - ID de la obra
 * @returns {Object} Configuración de maquetación
 */
function obtenerMaquetacion(obraId) {
  try {
    if (!obraId) {
      return {
        success: false,
        message: 'ID de obra requerido'
      };
    }
    
    const maquetaciones = obtenerDatosHoja('Maquetaciones') || [];
    const maquetacion = maquetaciones.find(m => m.obraId === obraId);
    
    if (!maquetacion) {
      // Retornar configuración por defecto
      return {
        success: true,
        datos: {
          obraId: obraId,
          configuracion: generarConfiguracionPorDefecto(),
          version: 0,
          esNueva: true
        }
      };
    }
    
    return {
      success: true,
      datos: {
        obraId: maquetacion.obraId,
        configuracion: maquetacion.configuracion,
        version: maquetacion.version,
        fechaCreacion: maquetacion.fechaCreacion,
        fechaModificacion: maquetacion.fechaModificacion,
        usuarioCreacion: maquetacion.usuarioCreacion,
        usuarioModificacion: maquetacion.usuarioModificacion,
        esNueva: false
      }
    };
    
  } catch (error) {
    logError('obtenerMaquetacion', error, { obraId });
    return {
      success: false,
      message: 'Error al obtener la configuración de maquetación'
    };
  }
}

/**
 * Validar estructura de configuración de maquetación
 * @param {Object} configuracion - Configuración a validar
 * @returns {Object} Resultado de validación
 */
function validarConfiguracionMaquetacion(configuracion) {
  const errores = [];
  
  try {
    // Validar información básica
    if (!configuracion.informacionBasica) {
      errores.push('Información básica requerida');
    }
    
    // Validar infraestructura
    if (configuracion.infraestructura) {
      const { torres, espaciosComunes } = configuracion.infraestructura;
      
      if (torres && torres.length > 0) {
        torres.forEach((torre, index) => {
          if (!torre.nombre || !torre.pisos) {
            errores.push(`Torre ${index + 1}: nombre y pisos son requeridos`);
          }
          
          if (torre.pisos && torre.pisos.length > 0) {
            torre.pisos.forEach((piso, pisoIndex) => {
              if (!piso.numero || !piso.departamentos) {
                errores.push(`Torre ${index + 1}, Piso ${pisoIndex + 1}: número y departamentos requeridos`);
              }
            });
          }
        });
      }
    }
    
    // Validar red de telecomunicaciones
    if (configuracion.redTelecomunicaciones) {
      const { topologia, tipoRed } = configuracion.redTelecomunicaciones;
      
      if (!topologia) {
        errores.push('Topología de red requerida');
      }
      
      if (!tipoRed || tipoRed.length === 0) {
        errores.push('Al menos un tipo de red debe estar configurado');
      }
    }
    
    return {
      valida: errores.length === 0,
      errores: errores
    };
    
  } catch (error) {
    return {
      valida: false,
      errores: ['Error al validar configuración: ' + error.message]
    };
  }
}

/**
 * Generar configuración por defecto para maquetación
 * @returns {Object} Configuración por defecto
 */
function generarConfiguracionPorDefecto() {
  return {
    informacionBasica: {
      tipoObra: '',
      areaTotal: 0,
      numeroUnidades: 0,
      numeroTorres: 1,
      observaciones: ''
    },
    infraestructura: {
      torres: [],
      espaciosComunes: [],
      ctr: [],
      shaft: [],
      sotu: [],
      camarasPaso: []
    },
    redTelecomunicaciones: {
      topologia: 'Estrella',
      tipoRed: [],
      coaxial: {
        alambrico: false,
        inalambrico: false,
        configuracion: {}
      },
      fibraOptica: {
        monomodo: false,
        multimodo: false,
        gpon: false,
        configuracion: {}
      },
      pau: [],
      dispositivos: []
    },
    mediciones: {
      certificacionFO: false,
      certificacionCoaxial: false,
      configuracion: {}
    },
    sistemasIntegrados: {
      redIncendios: false,
      corrientesDebiles: false,
      citofonia: false,
      motoresAcceso: false,
      configuracion: {}
    }
  };
}

/**
 * Actualizar progreso de una obra basado en su maquetación y avances
 * @param {string} obraId - ID de la obra
 */
function actualizarProgresoObra(obraId) {
  try {
    const obras = obtenerDatosHoja(CONFIG.SHEETS.OBRAS);
    const obraIndex = obras.findIndex(o => o.id === obraId);
    
    if (obraIndex === -1) return;
    
    // Calcular progreso basado en maquetación y avances
    const maquetacion = obtenerMaquetacion(obraId);
    const avances = obtenerDatosHoja(CONFIG.SHEETS.AVANCES) || [];
    const avancesObra = avances.filter(a => a.obraId === obraId);
    
    let progreso = 0;
    
    // 20% por tener maquetación configurada
    if (maquetacion.success && !maquetacion.datos.esNueva) {
      progreso += 20;
    }
    
    // 80% distribuido entre avances
    if (avancesObra.length > 0) {
      // Calcular progreso basado en avances completados
      const avancesCompletados = avancesObra.filter(a => a.estado === 'Completado');
      const porcentajeAvances = avancesObra.length > 0 ? (avancesCompletados.length / avancesObra.length) * 80 : 0;
      progreso += porcentajeAvances;
    }
    
    // Actualizar progreso en la obra
    obras[obraIndex].progreso = Math.round(progreso);
    obras[obraIndex].fechaModificacion = new Date().toISOString();
    
    guardarDatosHoja(CONFIG.SHEETS.OBRAS, obras);
    
  } catch (error) {
    logError('actualizarProgresoObra', error, { obraId });
  }
}
// ============================================================================
// BDPA - Code.gs - PARTE 3: Gestión de Avances e Inventario
// ============================================================================

// ============================================================================
// FUNCIONES DE GESTIÓN DE AVANCES
// ============================================================================

/**
 * Registrar un nuevo avance
 * @param {Object} datos - Datos del avance
 * @returns {Object} Resultado de la operación
 */
function registrarAvance(datos) {
  try {
    const {
      obraId, torreId, pisoId, departamentoId, espacioComun,
      tipoAvance, categoria, subcategoria, descripcion,
      observaciones, fotos = [], materiales = [], estado = 'En progreso',
      fechaInicio, fechaFin, porcentajeCompletado = 0
    } = datos;
    
    // Validaciones básicas
    if (!obraId || !tipoAvance || !categoria) {
      return {
        success: false,
        message: 'Obra, tipo de avance y categoría son requeridos'
      };
    }
    
    // Validar que la obra existe
    const obras = obtenerDatosHoja(CONFIG.SHEETS.OBRAS);
    const obra = obras.find(o => o.id === obraId);
    
    if (!obra) {
      return {
        success: false,
        message: 'Obra no encontrada'
      };
    }
    
    // Procesar fotos (convertir base64 y guardar en Drive)
    const fotosGuardadas = [];
    if (fotos && fotos.length > 0) {
      for (let i = 0; i < fotos.length; i++) {
        try {
          const fotoUrl = guardarFotoAvance(fotos[i], obraId, tipoAvance);
          if (fotoUrl) {
            fotosGuardadas.push({
              url: fotoUrl,
              nombre: `avance_${Date.now()}_${i + 1}.jpg`,
              fechaSubida: new Date().toISOString()
            });
          }
        } catch (error) {
          logError('Error guardando foto', error, { obraId, foto: i });
        }
      }
    }
    
    const avances = obtenerDatosHoja(CONFIG.SHEETS.AVANCES) || [];
    const nuevoId = generarId();
    const ahora = new Date().toISOString();
    
    const nuevoAvance = {
      id: nuevoId,
      obraId,
      torreId: torreId || null,
      pisoId: pisoId || null,
      departamentoId: departamentoId || null,
      espacioComun: espacioComun || null,
      tipoAvance,
      categoria,
      subcategoria: subcategoria || '',
      descripcion: descripcion || '',
      observaciones: observaciones || '',
      estado,
      porcentajeCompletado: Math.max(0, Math.min(100, porcentajeCompletado)),
      fechaInicio: fechaInicio || ahora,
      fechaFin: fechaFin || null,
      fechaRegistro: ahora,
      usuarioRegistro: datos.usuarioActual?.id || 'Sistema',
      fotos: fotosGuardadas,
      materiales: materiales || [],
      activo: true
    };
    
    avances.push(nuevoAvance);
    guardarDatosHoja(CONFIG.SHEETS.AVANCES, avances);
    
    // Registrar movimientos de materiales si hay
    if (materiales && materiales.length > 0) {
      registrarMovimientosMateriales(materiales, obraId, nuevoId, 'salida');
    }
    
    // Actualizar progreso de la obra
    actualizarProgresoObra(obraId);
    
    logAction('Avance Registrado', { 
      avanceId: nuevoId, 
      obraId, 
      tipoAvance, 
      categoria 
    });
    
    return {
      success: true,
      message: 'Avance registrado correctamente',
      id: nuevoId,
      fotosGuardadas: fotosGuardadas.length
    };
    
  } catch (error) {
    logError('registrarAvance', error, datos);
    return {
      success: false,
      message: 'Error al registrar el avance'
    };
  }
}

/**
 * Obtener avances con filtros
 * @param {Object} datos - Filtros y opciones
 * @returns {Object} Lista de avances
 */
function obtenerAvances(datos = {}) {
  try {
    const { 
      obraId, torreId, pisoId, tipoAvance, categoria, estado,
      fechaInicio, fechaFin, busqueda = '', 
      pagina = 1, porPagina = 50 
    } = datos;
    
    let avances = obtenerDatosHoja(CONFIG.SHEETS.AVANCES) || [];
    
    // Aplicar filtros
    if (obraId) {
      avances = avances.filter(a => a.obraId === obraId);
    }
    
    if (torreId) {
      avances = avances.filter(a => a.torreId === torreId);
    }
    
    if (pisoId) {
      avances = avances.filter(a => a.pisoId === pisoId);
    }
    
    if (tipoAvance) {
      avances = avances.filter(a => a.tipoAvance === tipoAvance);
    }
    
    if (categoria) {
      avances = avances.filter(a => a.categoria === categoria);
    }
    
    if (estado) {
      avances = avances.filter(a => a.estado === estado);
    }
    
    // Filtro por rango de fechas
    if (fechaInicio && fechaFin) {
      const inicio = new Date(fechaInicio);
      const fin = new Date(fechaFin);
      
      avances = avances.filter(a => {
        const fechaAvance = new Date(a.fechaRegistro);
        return fechaAvance >= inicio && fechaAvance <= fin;
      });
    }
    
    // Búsqueda en texto
    if (busqueda) {
      const busquedaLower = busqueda.toLowerCase();
      avances = avances.filter(a => 
        a.descripcion.toLowerCase().includes(busquedaLower) ||
        a.observaciones.toLowerCase().includes(busquedaLower) ||
        a.tipoAvance.toLowerCase().includes(busquedaLower) ||
        a.categoria.toLowerCase().includes(busquedaLower)
      );
    }
    
    // Ordenar por fecha de registro (más recientes primero)
    avances.sort((a, b) => new Date(b.fechaRegistro) - new Date(a.fechaRegistro));
    
    // Paginación
    const total = avances.length;
    const inicio = (pagina - 1) * porPagina;
    const fin = inicio + porPagina;
    const avancesPaginados = avances.slice(inicio, fin);
    
    // Enriquecer datos con información de obras
    const obras = obtenerDatosHoja(CONFIG.SHEETS.OBRAS) || [];
    const avancesEnriquecidos = avancesPaginados.map(avance => {
      const obra = obras.find(o => o.id === avance.obraId);
      return {
        ...avance,
        nombreObra: obra ? obra.nombre : 'Obra no encontrada'
      };
    });
    
    return {
      success: true,
      datos: avancesEnriquecidos,
      paginacion: {
        pagina,
        porPagina,
        total,
        totalPaginas: Math.ceil(total / porPagina)
      },
      estadisticas: {
        total: total,
        enProgreso: avances.filter(a => a.estado === 'En progreso').length,
        completados: avances.filter(a => a.estado === 'Completado').length,
        pendientes: avances.filter(a => a.estado === 'Pendiente').length
      }
    };
    
  } catch (error) {
    logError('obtenerAvances', error, datos);
    return {
      success: false,
      message: 'Error al obtener los avances'
    };
  }
}

/**
 * Obtener detalle completo de un avance
 * @param {string} id - ID del avance
 * @returns {Object} Detalle del avance
 */
function obtenerDetalleAvance(id) {
  try {
    if (!id) {
      return {
        success: false,
        message: 'ID de avance requerido'
      };
    }
    
    const avances = obtenerDatosHoja(CONFIG.SHEETS.AVANCES) || [];
    const avance = avances.find(a => a.id === id);
    
    if (!avance) {
      return {
        success: false,
        message: 'Avance no encontrado'
      };
    }
    
    // Enriquecer con datos adicionales
    const obras = obtenerDatosHoja(CONFIG.SHEETS.OBRAS) || [];
    const obra = obras.find(o => o.id === avance.obraId);
    
    const usuarios = obtenerDatosHoja(CONFIG.SHEETS.USUARIOS) || [];
    const usuario = usuarios.find(u => u.id === avance.usuarioRegistro);
    
    const detalleCompleto = {
      ...avance,
      obra: obra ? {
        id: obra.id,
        nombre: obra.nombre,
        direccion: obra.direccion,
        cliente: obra.cliente
      } : null,
      usuarioRegistroInfo: usuario ? {
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        rol: usuario.rol
      } : null
    };
    
    return {
      success: true,
      datos: detalleCompleto
    };
    
  } catch (error) {
    logError('obtenerDetalleAvance', error, { id });
    return {
      success: false,
      message: 'Error al obtener el detalle del avance'
    };
  }
}

/**
 * Guardar foto de avance en Google Drive
 * @param {string} fotoBase64 - Foto en formato base64
 * @param {string} obraId - ID de la obra
 * @param {string} tipoAvance - Tipo de avance
 * @returns {string} URL de la foto guardada
 */
function guardarFotoAvance(fotoBase64, obraId, tipoAvance) {
  try {
    if (!fotoBase64 || !fotoBase64.startsWith('data:image/')) {
      throw new Error('Formato de imagen inválido');
    }
    
    // Extraer datos de la imagen
    const [header, data] = fotoBase64.split(',');
    const mimeType = header.match(/data:([^;]+)/)[1];
    const extension = mimeType.split('/')[1];
    
    // Decodificar base64
    const blob = Utilities.newBlob(
      Utilities.base64Decode(data), 
      mimeType, 
      `avance_${Date.now()}.${extension}`
    );
    
    // Crear estructura de carpetas en Drive
    const carpetaRaiz = obtenerOCrearCarpeta('BDPA_Fotos');
    const carpetaObra = obtenerOCrearCarpeta(`Obra_${obraId}`, carpetaRaiz);
    const carpetaTipo = obtenerOCrearCarpeta(tipoAvance, carpetaObra);
    
    // Guardar archivo
    const archivo = carpetaTipo.createFile(blob);
    archivo.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    
    return archivo.getUrl();
    
  } catch (error) {
    logError('guardarFotoAvance', error, { obraId, tipoAvance });
    return null;
  }
}

/**
 * Obtener o crear carpeta en Drive
 * @param {string} nombre - Nombre de la carpeta
 * @param {Object} carpetaPadre - Carpeta padre (opcional)
 * @returns {Object} Carpeta de Drive
 */
function obtenerOCrearCarpeta(nombre, carpetaPadre = null) {
  try {
    const padre = carpetaPadre || DriveApp.getRootFolder();
    const carpetas = padre.getFoldersByName(nombre);
    
    if (carpetas.hasNext()) {
      return carpetas.next();
    } else {
      return padre.createFolder(nombre);
    }
  } catch (error) {
    logError('obtenerOCrearCarpeta', error, { nombre });
    throw error;
  }
}

// ============================================================================
// FUNCIONES DE GESTIÓN DE INVENTARIO
// ============================================================================

/**
 * Obtener materiales con filtros
 * @param {Object} datos - Filtros y opciones
 * @returns {Object} Lista de materiales
 */
function obtenerMateriales(datos = {}) {
  try {
    const { categoria, busqueda = '', stockBajo = false } = datos;
    
    let materiales = obtenerDatosHoja(CONFIG.SHEETS.MATERIALES) || [];
    
    // Aplicar filtros
    if (categoria) {
      materiales = materiales.filter(m => m.categoria === categoria);
    }
    
    if (busqueda) {
      const busquedaLower = busqueda.toLowerCase();
      materiales = materiales.filter(m => 
        m.nombre.toLowerCase().includes(busquedaLower) ||
        m.descripcion.toLowerCase().includes(busquedaLower) ||
        m.codigo.toLowerCase().includes(busquedaLower)
      );
    }
    
    if (stockBajo) {
      materiales = materiales.filter(m => m.stockActual <= m.stockMinimo);
    }
    
    // Calcular estado de stock para cada material
    materiales = materiales.map(material => ({
      ...material,
      estadoStock: determinarEstadoStock(material.stockActual, material.stockMinimo),
      valorTotal: material.stockActual * (material.precioUnitario || 0)
    }));
    
    // Obtener categorías disponibles
    const categorias = obtenerCategorias();
    
    // Estadísticas
    const estadisticas = {
      total: materiales.length,
      stockBajo: materiales.filter(m => m.estadoStock === 'bajo').length,
      stockCritico: materiales.filter(m => m.estadoStock === 'critico').length,
      valorTotalInventario: materiales.reduce((total, m) => total + m.valorTotal, 0)
    };
    
    return {
      success: true,
      datos: materiales,
      categorias: categorias.success ? categorias.datos : [],
      estadisticas
    };
    
  } catch (error) {
    logError('obtenerMateriales', error, datos);
    return {
      success: false,
      message: 'Error al obtener los materiales'
    };
  }
}

/**
 * Guardar material (crear o actualizar)
 * @param {Object} datos - Datos del material
 * @returns {Object} Resultado de la operación
 */
function guardarMaterial(datos) {
  try {
    const {
      id, codigo, nombre, descripcion, categoria, unidad,
      stockActual, stockMinimo, stockMaximo, precioUnitario,
      proveedor, ubicacion, observaciones
    } = datos;
    
    // Validaciones
    if (!codigo || !nombre || !categoria || !unidad) {
      return {
        success: false,
        message: 'Código, nombre, categoría y unidad son campos obligatorios'
      };
    }
    
    const materiales = obtenerDatosHoja(CONFIG.SHEETS.MATERIALES) || [];
    
    // Verificar código único
    const codigoExistente = materiales.find(m => m.codigo === codigo && m.id !== id);
    if (codigoExistente) {
      return {
        success: false,
        message: 'Ya existe un material con este código'
      };
    }
    
    const ahora = new Date().toISOString();
    
    if (id) {
      // Actualizar material existente
      const index = materiales.findIndex(m => m.id === id);
      if (index === -1) {
        return {
          success: false,
          message: 'Material no encontrado'
        };
      }
      
      const materialOriginal = materiales[index];
      
      materiales[index] = {
        ...materialOriginal,
        codigo,
        nombre,
        descripcion: descripcion || '',
        categoria,
        unidad,
        stockMinimo: parseInt(stockMinimo) || 0,
        stockMaximo: parseInt(stockMaximo) || 0,
        precioUnitario: parseFloat(precioUnitario) || 0,
        proveedor: proveedor || '',
        ubicacion: ubicacion || '',
        observaciones: observaciones || '',
        fechaModificacion: ahora,
        usuarioModificacion: datos.usuarioActual?.id || 'Sistema'
      };
      
      // Mantener stock actual sin cambiar en actualizaciones
      
    } else {
      // Crear nuevo material
      const nuevoId = generarId();
      const nuevoMaterial = {
        id: nuevoId,
        codigo,
        nombre,
        descripcion: descripcion || '',
        categoria,
        unidad,
        stockActual: parseInt(stockActual) || 0,
        stockMinimo: parseInt(stockMinimo) || 0,
        stockMaximo: parseInt(stockMaximo) || 0,
        precioUnitario: parseFloat(precioUnitario) || 0,
        proveedor: proveedor || '',
        ubicacion: ubicacion || '',
        observaciones: observaciones || '',
        fechaCreacion: ahora,
        fechaModificacion: ahora,
        usuarioCreacion: datos.usuarioActual?.id || 'Sistema',
        usuarioModificacion: datos.usuarioActual?.id || 'Sistema',
        activo: true
      };
      
      materiales.push(nuevoMaterial);
      
      // Registrar movimiento inicial de stock si hay
      if (parseInt(stockActual) > 0) {
        registrarMovimientoInventario({
          materialId: nuevoId,
          tipoMovimiento: 'entrada',
          cantidad: parseInt(stockActual),
          motivo: 'Stock inicial',
          observaciones: 'Creación de material'
        });
      }
    }
    
    guardarDatosHoja(CONFIG.SHEETS.MATERIALES, materiales);
    
    logAction('Material Guardado', { 
      materialId: id || nuevoId, 
      codigo, 
      nombre 
    });
    
    return {
      success: true,
      message: id ? 'Material actualizado correctamente' : 'Material creado correctamente',
      id: id || nuevoId
    };
    
  } catch (error) {
    logError('guardarMaterial', error, datos);
    return {
      success: false,
      message: 'Error al guardar el material'
    };
  }
}

/**
 * Determinar estado de stock de un material
 * @param {number} stockActual - Stock actual
 * @param {number} stockMinimo - Stock mínimo
 * @returns {string} Estado del stock
 */
function determinarEstadoStock(stockActual, stockMinimo) {
  if (stockActual === 0) return 'agotado';
  if (stockActual <= stockMinimo * 0.5) return 'critico';
  if (stockActual <= stockMinimo) return 'bajo';
  return 'normal';
}

/**
 * Registrar movimiento de inventario
 * @param {Object} datos - Datos del movimiento
 * @returns {Object} Resultado de la operación
 */
function registrarMovimientoInventario(datos) {
  try {
    const {
      materialId, tipoMovimiento, cantidad, motivo,
      obraId, avanceId, observaciones, numeroFactura
    } = datos;
    
    if (!materialId || !tipoMovimiento || !cantidad || cantidad <= 0) {
      return {
        success: false,
        message: 'Material, tipo de movimiento y cantidad válida son requeridos'
      };
    }
    
    // Validar material existe
    const materiales = obtenerDatosHoja(CONFIG.SHEETS.MATERIALES) || [];
    const materialIndex = materiales.findIndex(m => m.id === materialId);
    
    if (materialIndex === -1) {
      return {
        success: false,
        message: 'Material no encontrado'
      };
    }
    
    const material = materiales[materialIndex];
    const cantidadNum = parseInt(cantidad);
    
    // Validar stock suficiente para salidas
    if (tipoMovimiento === 'salida' && material.stockActual < cantidadNum) {
      return {
        success: false,
        message: `Stock insuficiente. Disponible: ${material.stockActual}`
      };
    }
    
    // Actualizar stock del material
    if (tipoMovimiento === 'entrada') {
      materiales[materialIndex].stockActual += cantidadNum;
    } else {
      materiales[materialIndex].stockActual -= cantidadNum;
    }
    
    materiales[materialIndex].fechaModificacion = new Date().toISOString();
    
    // Registrar movimiento
    const movimientos = obtenerDatosHoja(CONFIG.SHEETS.MOVIMIENTOS) || [];
    const nuevoId = generarId();
    const ahora = new Date().toISOString();
    
    const nuevoMovimiento = {
      id: nuevoId,
      materialId,
      tipoMovimiento,
      cantidad: cantidadNum,
      motivo: motivo || '',
      obraId: obraId || null,
      avanceId: avanceId || null,
      observaciones: observaciones || '',
      numeroFactura: numeroFactura || '',
      stockAnterior: tipoMovimiento === 'entrada' ? 
        material.stockActual : material.stockActual + cantidadNum,
      stockNuevo: materiales[materialIndex].stockActual,
      fechaMovimiento: ahora,
      usuarioMovimiento: datos.usuarioActual?.id || 'Sistema'
    };
    
    movimientos.push(nuevoMovimiento);
    
    // Guardar cambios
    guardarDatosHoja(CONFIG.SHEETS.MATERIALES, materiales);
    guardarDatosHoja(CONFIG.SHEETS.MOVIMIENTOS, movimientos);
    
    logAction('Movimiento Inventario', {
      movimientoId: nuevoId,
      materialId,
      tipoMovimiento,
      cantidad: cantidadNum
    });
    
    return {
      success: true,
      message: 'Movimiento registrado correctamente',
      id: nuevoId,
      stockNuevo: materiales[materialIndex].stockActual
    };
    
  } catch (error) {
    logError('registrarMovimientoInventario', error, datos);
    return {
      success: false,
      message: 'Error al registrar el movimiento'
    };
  }
}
// ============================================================================
// BDPA - Code.gs - PARTE 4: Usuarios, Reportes y Utilidades
// ============================================================================
// ============================================================================
// FUNCIONES DE COBRANZAS
// ============================================================================

/**
 * Obtener avances para cobranza de una obra
 */
function obtenerAvancesParaCobranza(datos) {
  try {
    const { obraId } = datos;
    
    if (!obraId) {
      return {
        success: false,
        message: 'ID de obra requerido'
      };
    }
    
    // Obtener todos los avances de la obra
    const avances = obtenerDatosHoja(CONFIG.SHEETS.AVANCES) || [];
    const avancesObra = avances.filter(a => a.obraId === obraId);
    
    // Agrupar por tipo de señal
    const avancesPorTipo = {
      alambrico: { total: 0, completados: 0, porcentaje: 0, porcentajeCobrado: 0 },
      inalambrico: { total: 0, completados: 0, porcentaje: 0, porcentajeCobrado: 0 },
      fo: { total: 0, completados: 0, porcentaje: 0, porcentajeCobrado: 0 }
    };
    
    // Contar avances por tipo
    avancesObra.forEach(avance => {
      let tipo = null;
      
      if (avance.categoria === 'Alámbrico') {
        tipo = 'alambrico';
      } else if (avance.categoria === 'Inalámbrico') {
        tipo = 'inalambrico';
      } else if (avance.categoria === 'Fibra Óptica') {
        tipo = 'fo';
      }
      
      if (tipo && avancesPorTipo[tipo]) {
        avancesPorTipo[tipo].total++;
        if (avance.estado === 'Completado' || avance.porcentaje >= 100) {
          avancesPorTipo[tipo].completados++;
        }
      }
    });
    
    // Calcular porcentajes
    Object.keys(avancesPorTipo).forEach(tipo => {
      const data = avancesPorTipo[tipo];
      if (data.total > 0) {
        data.porcentaje = Math.round((data.completados / data.total) * 100);
      }
    });
    
    // Obtener último cobro de la obra
    const cobranzas = obtenerDatosHoja(CONFIG.SHEETS.COBRANZAS) || [];
    const cobranzasObra = cobranzas
      .filter(c => c.obraId === obraId && c.estado !== 'Anulado')
      .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    
    let ultimoCobro = null;
    if (cobranzasObra.length > 0) {
      const ultima = cobranzasObra[0];
      ultimoCobro = {
        fecha: ultima.fecha,
        total: ultima.total,
        numeroFactura: ultima.numeroFactura,
        detalleAvances: ultima.detalles.map(d => {
          const tipo = d.tipoSenal === 'fo' ? 'FO' : 
                       d.tipoSenal.charAt(0).toUpperCase() + d.tipoSenal.slice(1);
          return `${tipo}: ${d.porcentajeAvance}%`;
        }).join(', ')
      };
      
      // Calcular porcentaje ya cobrado
      ultima.detalles.forEach(detalle => {
        if (avancesPorTipo[detalle.tipoSenal]) {
          avancesPorTipo[detalle.tipoSenal].porcentajeCobrado = detalle.porcentajeAvance;
        }
      });
    }
    
    return {
      success: true,
      avancesPorTipo,
      ultimoCobro
    };
    
  } catch (error) {
    logError('obtenerAvancesParaCobranza', error, datos);
    return {
      success: false,
      message: 'Error al obtener avances para cobranza'
    };
  }
}

/**
 * Guardar cobranza
 */
function guardarCobranza(datos) {
  try {
    const {
      obraId,
      obraNombre,
      empresa,
      fecha,
      numeroFactura,
      descripcion,
      detalles,
      total
    } = datos;
    
    // Validaciones
    if (!obraId || !empresa || !fecha || !detalles || detalles.length === 0) {
      return {
        success: false,
        message: 'Datos incompletos para generar cobranza'
      };
    }
    
    const ahora = new Date().toISOString();
    const cobranzas = obtenerDatosHoja(CONFIG.SHEETS.COBRANZAS) || [];
    
    const nuevaCobranza = {
      id: generarId(),
      obraId,
      obraNombre,
      empresa,
      fecha,
      numeroFactura: numeroFactura || '',
      descripcion: descripcion || 'Cobranza por avance de obra',
      detalles,
      total,
      estado: 'Pendiente',
      fechaCreacion: ahora,
      usuarioId: datos.usuarioActual?.id || 'Sistema',
      usuarioNombre: datos.usuarioActual ? 
        `${datos.usuarioActual.nombre} ${datos.usuarioActual.apellido}` : 'Sistema'
    };
    
    cobranzas.push(nuevaCobranza);
    guardarDatosHoja(CONFIG.SHEETS.COBRANZAS, cobranzas);
    
    logAction('Cobranza generada', {
      cobranzaId: nuevaCobranza.id,
      obra: obraNombre,
      total
    });
    
    return {
      success: true,
      message: 'Cobranza registrada correctamente',
      id: nuevaCobranza.id
    };
    
  } catch (error) {
    logError('guardarCobranza', error, datos);
    return {
      success: false,
      message: 'Error al guardar cobranza'
    };
  }
}
// ============================================================================
// FUNCIONES DE GESTIÓN DE USUARIOS
// ============================================================================

/**
 * Obtener todos los usuarios
 * @returns {Object} Lista de usuarios
 */
function obtenerUsuarios() {
  try {
    let usuarios = obtenerDatosHoja(CONFIG.SHEETS.USUARIOS) || [];
    
    // Filtrar información sensible
    usuarios = usuarios.map(usuario => ({
      id: usuario.id,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      usuario: usuario.usuario,
      rol: usuario.rol,
      email: usuario.email,
      telefono: usuario.telefono,
      activo: usuario.activo !== false,
      bloqueado: usuario.bloqueado || false,
      fechaCreacion: usuario.fechaCreacion,
      ultimoAcceso: usuario.ultimoAcceso,
      requiereCambioContrasena: usuario.requiereCambioContrasena || false
    }));
    
    return {
      success: true,
      datos: usuarios
    };
    
  } catch (error) {
    logError('obtenerUsuarios', error);
    return {
      success: false,
      message: 'Error al obtener los usuarios'
    };
  }
}

/**
 * Guardar usuario (crear o actualizar)
 * @param {Object} datos - Datos del usuario
 * @returns {Object} Resultado de la operación
 */
function guardarUsuario(datos) {
  try {
    const {
      id, nombre, apellido, usuario, contrasena, rol, email,
      telefono, activo = true, requiereCambioContrasena = false
    } = datos;
    
    // Validaciones
    if (!nombre || !apellido || !usuario || !rol) {
      return {
        success: false,
        message: 'Nombre, apellido, usuario y rol son campos obligatorios'
      };
    }
    
    if (!id && !contrasena) {
      return {
        success: false,
        message: 'Contraseña es requerida para usuarios nuevos'
      };
    }
    
    const usuarios = obtenerDatosHoja(CONFIG.SHEETS.USUARIOS) || [];
    
    // Verificar username único
    const usuarioExistente = usuarios.find(u => u.usuario === usuario && u.id !== id);
    if (usuarioExistente) {
      return {
        success: false,
        message: 'Ya existe un usuario con este nombre de usuario'
      };
    }
    
    // Verificar email único si se proporciona
    if (email) {
      const emailExistente = usuarios.find(u => u.email === email && u.id !== id);
      if (emailExistente) {
        return {
          success: false,
          message: 'Ya existe un usuario con este email'
        };
      }
    }
    
    const ahora = new Date().toISOString();
    
    if (id) {
      // Actualizar usuario existente
      const index = usuarios.findIndex(u => u.id === id);
      if (index === -1) {
        return {
          success: false,
          message: 'Usuario no encontrado'
        };
      }
      
      const usuarioOriginal = usuarios[index];
      
      usuarios[index] = {
        ...usuarioOriginal,
        nombre,
        apellido,
        usuario,
        rol,
        email: email || '',
        telefono: telefono || '',
        activo,
        requiereCambioContrasena,
        fechaModificacion: ahora,
        usuarioModificacion: datos.usuarioActual?.id || 'Sistema'
      };
      
      // Solo actualizar contraseña si se proporciona
      if (contrasena) {
        usuarios[index].contrasena = contrasena;
        usuarios[index].fechaCambioContrasena = ahora;
      }
      
    } else {
      // Crear nuevo usuario
      const nuevoId = generarId();
      const nuevoUsuario = {
        id: nuevoId,
        nombre,
        apellido,
        usuario,
        contrasena,
        rol,
        email: email || '',
        telefono: telefono || '',
        activo,
        bloqueado: false,
        requiereCambioContrasena,
        fechaCreacion: ahora,
        fechaModificacion: ahora,
        fechaCambioContrasena: ahora,
        usuarioCreacion: datos.usuarioActual?.id || 'Sistema',
        usuarioModificacion: datos.usuarioActual?.id || 'Sistema',
        ultimoAcceso: null,
        intentosFallidos: 0
      };
      
      usuarios.push(nuevoUsuario);
    }
    
    guardarDatosHoja(CONFIG.SHEETS.USUARIOS, usuarios);
    
    logAction('Usuario Guardado', {
      usuarioId: id || nuevoId,
      username: usuario,
      rol
    });
    
    return {
      success: true,
      message: id ? 'Usuario actualizado correctamente' : 'Usuario creado correctamente',
      id: id || nuevoId
    };
    
  } catch (error) {
    logError('guardarUsuario', error, datos);
    return {
      success: false,
      message: 'Error al guardar el usuario'
    };
  }
}

/**
 * Eliminar usuario
 * @param {string} id - ID del usuario
 * @returns {Object} Resultado de la operación
 */
function eliminarUsuario(id) {
  try {
    if (!id) {
      return {
        success: false,
        message: 'ID de usuario requerido'
      };
    }
    
    const usuarios = obtenerDatosHoja(CONFIG.SHEETS.USUARIOS) || [];
    const index = usuarios.findIndex(u => u.id === id);
    
    if (index === -1) {
      return {
        success: false,
        message: 'Usuario no encontrado'
      };
    }
    
    // Verificar que no es el último admin
    const admins = usuarios.filter(u => u.rol === 'Admin' && u.activo && u.id !== id);
    if (usuarios[index].rol === 'Admin' && admins.length === 0) {
      return {
        success: false,
        message: 'No se puede eliminar el último administrador del sistema'
      };
    }
    
    const usuarioNombre = `${usuarios[index].nombre} ${usuarios[index].apellido}`;
    usuarios.splice(index, 1);
    
    guardarDatosHoja(CONFIG.SHEETS.USUARIOS, usuarios);
    
    logAction('Usuario Eliminado', { usuarioId: id, nombre: usuarioNombre });
    
    return {
      success: true,
      message: 'Usuario eliminado correctamente'
    };
    
  } catch (error) {
    logError('eliminarUsuario', error, { id });
    return {
      success: false,
      message: 'Error al eliminar el usuario'
    };
  }
}

/**
 * Bloquear usuario
 * @param {Object} datos - Datos del bloqueo
 * @returns {Object} Resultado de la operación
 */
function bloquearUsuario(datos) {
  try {
    const { id, motivo = 'Sin motivo especificado' } = datos;
    
    if (!id) {
      return {
        success: false,
        message: 'ID de usuario requerido'
      };
    }
    
    const usuarios = obtenerDatosHoja(CONFIG.SHEETS.USUARIOS) || [];
    const index = usuarios.findIndex(u => u.id === id);
    
    if (index === -1) {
      return {
        success: false,
        message: 'Usuario no encontrado'
      };
    }
    
    usuarios[index].bloqueado = true;
    usuarios[index].fechaBloqueo = new Date().toISOString();
    usuarios[index].motivoBloqueo = motivo;
    usuarios[index].usuarioBloqueo = datos.usuarioActual?.id || 'Sistema';
    
    guardarDatosHoja(CONFIG.SHEETS.USUARIOS, usuarios);
    
    logAction('Usuario Bloqueado', { usuarioId: id, motivo });
    
    return {
      success: true,
      message: 'Usuario bloqueado correctamente'
    };
    
  } catch (error) {
    logError('bloquearUsuario', error, datos);
    return {
      success: false,
      message: 'Error al bloquear el usuario'
    };
  }
}

/**
 * Desbloquear usuario
 * @param {Object} datos - Datos del desbloqueo
 * @returns {Object} Resultado de la operación
 */
function desbloquearUsuario(datos) {
  try {
    const { id } = datos;
    
    if (!id) {
      return {
        success: false,
        message: 'ID de usuario requerido'
      };
    }
    
    const usuarios = obtenerDatosHoja(CONFIG.SHEETS.USUARIOS) || [];
    const index = usuarios.findIndex(u => u.id === id);
    
    if (index === -1) {
      return {
        success: false,
        message: 'Usuario no encontrado'
      };
    }
    
    usuarios[index].bloqueado = false;
    usuarios[index].fechaDesbloqueo = new Date().toISOString();
    usuarios[index].usuarioDesbloqueo = datos.usuarioActual?.id || 'Sistema';
    usuarios[index].intentosFallidos = 0;
    
    guardarDatosHoja(CONFIG.SHEETS.USUARIOS, usuarios);
    
    logAction('Usuario Desbloqueado', { usuarioId: id });
    
    return {
      success: true,
      message: 'Usuario desbloqueado correctamente'
    };
    
  } catch (error) {
    logError('desbloquearUsuario', error, datos);
    return {
      success: false,
      message: 'Error al desbloquear el usuario'
    };
  }
}

/**
 * Resetear contraseña de usuario
 * @param {Object} datos - Datos del reset
 * @returns {Object} Resultado de la operación
 */
function resetearContrasenaUsuario(datos) {
  try {
    const { id } = datos;
    
    if (!id) {
      return {
        success: false,
        message: 'ID de usuario requerido'
      };
    }
    
    const usuarios = obtenerDatosHoja(CONFIG.SHEETS.USUARIOS) || [];
    const index = usuarios.findIndex(u => u.id === id);
    
    if (index === -1) {
      return {
        success: false,
        message: 'Usuario no encontrado'
      };
    }
    
    // Generar nueva contraseña temporal
    const nuevaContrasena = generarContrasenaAleatoria();
    
    usuarios[index].contrasena = nuevaContrasena;
    usuarios[index].requiereCambioContrasena = true;
    usuarios[index].fechaCambioContrasena = new Date().toISOString();
    usuarios[index].usuarioResetContrasena = datos.usuarioActual?.id || 'Sistema';
    
    guardarDatosHoja(CONFIG.SHEETS.USUARIOS, usuarios);
    
    logAction('Contraseña Reseteada', { usuarioId: id });
    
    return {
      success: true,
      message: 'Contraseña reseteada correctamente',
      nuevaContrasena: nuevaContrasena
    };
    
  } catch (error) {
    logError('resetearContrasenaUsuario', error, datos);
    return {
      success: false,
      message: 'Error al resetear la contraseña'
    };
  }
}

/**
 * Generar contraseña aleatoria segura
 * @returns {string} Contraseña generada
 */
function generarContrasenaAleatoria() {
  const mayusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const minusculas = 'abcdefghijklmnopqrstuvwxyz';
  const numeros = '0123456789';
  const simbolos = '!@#$%^&*';
  
  let contrasena = '';
  
  // Asegurar al menos un carácter de cada tipo
  contrasena += mayusculas[Math.floor(Math.random() * mayusculas.length)];
  contrasena += minusculas[Math.floor(Math.random() * minusculas.length)];
  contrasena += numeros[Math.floor(Math.random() * numeros.length)];
  contrasena += simbolos[Math.floor(Math.random() * simbolos.length)];
  
  // Completar hasta 12 caracteres
  const todoCaracteres = mayusculas + minusculas + numeros + simbolos;
  for (let i = 4; i < 12; i++) {
    contrasena += todoCaracteres[Math.floor(Math.random() * todoCaracteres.length)];
  }
  
  // Mezclar caracteres
  return contrasena.split('').sort(() => Math.random() - 0.5).join('');
}

// ============================================================================
// FUNCIONES DE REPORTES
// ============================================================================

/**
 * Generar reporte de avances
 * @param {Object} datos - Filtros del reporte
 * @returns {Object} Datos del reporte
 */
function generarReporteAvances(datos = {}) {
  try {
    const { obraId, fechaInicio, fechaFin, tipoAvance, categoria } = datos;
    
    let avances = obtenerDatosHoja(CONFIG.SHEETS.AVANCES) || [];
    const obras = obtenerDatosHoja(CONFIG.SHEETS.OBRAS) || [];
    
    // Aplicar filtros
    if (obraId) {
      avances = avances.filter(a => a.obraId === obraId);
    }
    
    if (fechaInicio && fechaFin) {
      const inicio = new Date(fechaInicio);
      const fin = new Date(fechaFin);
      avances = avances.filter(a => {
        const fecha = new Date(a.fechaRegistro);
        return fecha >= inicio && fecha <= fin;
      });
    }
    
    if (tipoAvance) {
      avances = avances.filter(a => a.tipoAvance === tipoAvance);
    }
    
    if (categoria) {
      avances = avances.filter(a => a.categoria === categoria);
    }
    
    // Enriquecer con datos de obras
    const avancesEnriquecidos = avances.map(avance => {
      const obra = obras.find(o => o.id === avance.obraId);
      return {
        ...avance,
        nombreObra: obra ? obra.nombre : 'N/A',
        clienteObra: obra ? obra.cliente : 'N/A'
      };
    });
    
    // Generar estadísticas
    const estadisticas = {
      totalAvances: avancesEnriquecidos.length,
      avancesPorEstado: {},
      avancesPorTipo: {},
      avancesPorCategoria: {},
      avancesPorObra: {},
      progresoPromedio: 0
    };
    
    // Calcular estadísticas
    avancesEnriquecidos.forEach(avance => {
      // Por estado
      estadisticas.avancesPorEstado[avance.estado] = 
        (estadisticas.avancesPorEstado[avance.estado] || 0) + 1;
      
      // Por tipo
      estadisticas.avancesPorTipo[avance.tipoAvance] = 
        (estadisticas.avancesPorTipo[avance.tipoAvance] || 0) + 1;
      
      // Por categoría
      estadisticas.avancesPorCategoria[avance.categoria] = 
        (estadisticas.avancesPorCategoria[avance.categoria] || 0) + 1;
      
      // Por obra
      estadisticas.avancesPorObra[avance.nombreObra] = 
        (estadisticas.avancesPorObra[avance.nombreObra] || 0) + 1;
    });
    
    // Calcular progreso promedio
    if (avancesEnriquecidos.length > 0) {
      const sumaProgreso = avancesEnriquecidos.reduce((sum, a) => sum + a.porcentajeCompletado, 0);
      estadisticas.progresoPromedio = Math.round(sumaProgreso / avancesEnriquecidos.length);
    }
    
    return {
      success: true,
      datos: {
        avances: avancesEnriquecidos,
        estadisticas: estadisticas,
        filtros: { obraId, fechaInicio, fechaFin, tipoAvance, categoria },
        fechaGeneracion: new Date().toISOString()
      }
    };
    
  } catch (error) {
    logError('generarReporteAvances', error, datos);
    return {
      success: false,
      message: 'Error al generar el reporte de avances'
    };
  }
}

/**
 * Generar reporte de inventario
 * @param {Object} datos - Filtros del reporte
 * @returns {Object} Datos del reporte
 */
function generarReporteInventario(datos = {}) {
  try {
    const { categoria, stockBajo = false } = datos;
    
    let materiales = obtenerDatosHoja(CONFIG.SHEETS.MATERIALES) || [];
    const movimientos = obtenerDatosHoja(CONFIG.SHEETS.MOVIMIENTOS) || [];
    
    // Aplicar filtros
    if (categoria) {
      materiales = materiales.filter(m => m.categoria === categoria);
    }
    
    if (stockBajo) {
      materiales = materiales.filter(m => m.stockActual <= m.stockMinimo);
    }
    
    // Enriquecer materiales con datos calculados
    const materialesEnriquecidos = materiales.map(material => {
      const movimientosMaterial = movimientos.filter(m => m.materialId === material.id);
      
      return {
        ...material,
        estadoStock: determinarEstadoStock(material.stockActual, material.stockMinimo),
        valorTotal: material.stockActual * (material.precioUnitario || 0),
        totalMovimientos: movimientosMaterial.length,
        ultimoMovimiento: movimientosMaterial.length > 0 ? 
          movimientosMaterial.sort((a, b) => new Date(b.fechaMovimiento) - new Date(a.fechaMovimiento))[0] : null
      };
    });
    
    // Generar estadísticas
    const estadisticas = {
      totalMateriales: materialesEnriquecidos.length,
      valorTotalInventario: materialesEnriquecidos.reduce((total, m) => total + m.valorTotal, 0),
      materialesPorCategoria: {},
      materialesPorEstado: {},
      stockCritico: materialesEnriquecidos.filter(m => m.estadoStock === 'critico').length,
      stockBajo: materialesEnriquecidos.filter(m => m.estadoStock === 'bajo').length,
      stockNormal: materialesEnriquecidos.filter(m => m.estadoStock === 'normal').length,
      stockAgotado: materialesEnriquecidos.filter(m => m.estadoStock === 'agotado').length
    };
    
    // Estadísticas por categoría
    materialesEnriquecidos.forEach(material => {
      estadisticas.materialesPorCategoria[material.categoria] = 
        (estadisticas.materialesPorCategoria[material.categoria] || 0) + 1;
      
      estadisticas.materialesPorEstado[material.estadoStock] = 
        (estadisticas.materialesPorEstado[material.estadoStock] || 0) + 1;
    });
    
    return {
      success: true,
      datos: {
        materiales: materialesEnriquecidos,
        estadisticas: estadisticas,
        filtros: { categoria, stockBajo },
        fechaGeneracion: new Date().toISOString()
      }
    };
    
  } catch (error) {
    logError('generarReporteInventario', error, datos);
    return {
      success: false,
      message: 'Error al generar el reporte de inventario'
    };
  }
}

// ============================================================================
// FUNCIONES DE UTILIDADES Y MANTENIMIENTO
// ============================================================================

/**
 * Inicializar hojas del sistema
 */
function inicializarSistema() {
  try {
    const hojas = [
      CONFIG.SHEETS.USUARIOS,
      CONFIG.SHEETS.OBRAS,
      CONFIG.SHEETS.AVANCES,
      CONFIG.SHEETS.MATERIALES,
      CONFIG.SHEETS.CATEGORIAS,
      CONFIG.SHEETS.MOVIMIENTOS,
      CONFIG.SHEETS.COBRANZAS,
      CONFIG.SHEETS.METAS,
      CONFIG.SHEETS.DOCUMENTOS,
      CONFIG.SHEETS.TRANSFERENCIAS,
      CONFIG.SHEETS.CONFIGURACION,
      CONFIG.SHEETS.LOGS,
      'Maquetaciones'
    ];
    
    hojas.forEach(nombreHoja => {
      inicializarHoja(nombreHoja);
    });
    
    // Crear usuario administrador por defecto si no existe
    const usuarios = obtenerDatosHoja(CONFIG.SHEETS.USUARIOS);
    if (!usuarios || usuarios.length === 0) {
      crearUsuarioAdminPorDefecto();
    }
    
    logAction('Sistema Inicializado', { hojas: hojas.length });
    
    return {
      success: true,
      message: 'Sistema inicializado correctamente'
    };
    
  } catch (error) {
    logError('inicializarSistema', error);
    return {
      success: false,
      message: 'Error al inicializar el sistema'
    };
  }
}

/**
 * Crear usuario administrador por defecto
 */
function crearUsuarioAdminPorDefecto() {
  try {
    const usuarioAdmin = {
      id: generarId(),
      nombre: 'Administrador',
      apellido: 'Sistema',
      usuario: 'admin',
      contrasena: 'admin123',
      rol: 'Admin',
      email: 'admin@bdpa.com',
      telefono: '',
      activo: true,
      bloqueado: false,
      requiereCambioContrasena: true,
      fechaCreacion: new Date().toISOString(),
      fechaModificacion: new Date().toISOString(),
      usuarioCreacion: 'Sistema',
      usuarioModificacion: 'Sistema',
      ultimoAcceso: null,
      intentosFallidos: 0
    };
    
    guardarDatosHoja(CONFIG.SHEETS.USUARIOS, [usuarioAdmin]);
    
    logAction('Usuario Admin Creado', { username: 'admin' });
    
  } catch (error) {
    logError('crearUsuarioAdminPorDefecto', error);
  }
}

/**
 * Generar ID único
 * @returns {string} ID generado
 */
function generarId() {
  return Utilities.getUuid().replace(/-/g, '').substring(0, 16);
}

/**
 * Logging de acciones
 * @param {string} accion - Acción realizada
 * @param {Object} datos - Datos adicionales
 * @param {string} token - Token del usuario (opcional)
 */
function logAction(accion, datos = {}, token = null) {
  try {
    const logs = obtenerDatosHoja(CONFIG.SHEETS.LOGS) || [];
    
    const logEntry = {
      id: generarId(),
      fecha: new Date().toISOString(),
      accion: accion,
      datos: JSON.stringify(datos),
      token: token,
      usuario: datos.usuarioActual?.id || 'Sistema'
    };
    
    logs.push(logEntry);
    
    // Mantener solo los últimos 1000 logs
    if (logs.length > 1000) {
      logs.splice(0, logs.length - 1000);
    }
    
    guardarDatosHoja(CONFIG.SHEETS.LOGS, logs);
    
  } catch (error) {
    console.error('Error en logAction:', error);
  }
}

/**
 * Logging de errores
 * @param {string} funcion - Función donde ocurrió el error
 * @param {Error} error - Error ocurrido
 * @param {Object} contexto - Contexto adicional
 */
function logError(funcion, error, contexto = {}) {
  try {
    const errorLog = {
      id: generarId(),
      fecha: new Date().toISOString(),
      funcion: funcion,
      error: error.message || error.toString(),
      stack: error.stack || '',
      contexto: JSON.stringify(contexto)
    };
    
    console.error('BDPA Error:', errorLog);
    
    // Opcional: guardar errores en una hoja separada
    logAction('ERROR', errorLog);
    
  } catch (logErr) {
    console.error('Error en logError:', logErr);
  }
}
// ============================================================================
// BDPA - Code.gs - PARTE 5 FINAL: Categorías, Configuración y Auxiliares
// ============================================================================

// ============================================================================
// FUNCIONES DE GESTIÓN DE CATEGORÍAS
// ============================================================================

/**
 * Obtener todas las categorías
 * @returns {Object} Lista de categorías
 */
function obtenerCategorias() {
  try {
    let categorias = obtenerDatosHoja(CONFIG.SHEETS.CATEGORIAS);
    
    if (!categorias || categorias.length === 0) {
      // Crear categorías por defecto si no existen
      categorias = crearCategoriasPorDefecto();
    }
    
    // Ordenar por nombre
    categorias.sort((a, b) => a.nombre.localeCompare(b.nombre));
    
    return {
      success: true,
      datos: categorias
    };
    
  } catch (error) {
    logError('obtenerCategorias', error);
    return {
      success: false,
      message: 'Error al obtener las categorías'
    };
  }
}

/**
 * Guardar categoría (crear o actualizar)
 * @param {Object} datos - Datos de la categoría
 * @returns {Object} Resultado de la operación
 */
function guardarCategoria(datos) {
  try {
    const { id, nombre, descripcion, color, tipo = 'material', activa = true } = datos;
    
    if (!nombre) {
      return {
        success: false,
        message: 'Nombre de categoría es requerido'
      };
    }
    
    const categorias = obtenerDatosHoja(CONFIG.SHEETS.CATEGORIAS) || [];
    
    // Verificar nombre único
    const nombreExistente = categorias.find(c => c.nombre === nombre && c.id !== id);
    if (nombreExistente) {
      return {
        success: false,
        message: 'Ya existe una categoría con este nombre'
      };
    }
    
    const ahora = new Date().toISOString();
    
    if (id) {
      // Actualizar categoría existente
      const index = categorias.findIndex(c => c.id === id);
      if (index === -1) {
        return {
          success: false,
          message: 'Categoría no encontrada'
        };
      }
      
      categorias[index] = {
        ...categorias[index],
        nombre,
        descripcion: descripcion || '',
        color: color || '#007bff',
        tipo,
        activa,
        fechaModificacion: ahora,
        usuarioModificacion: datos.usuarioActual?.id || 'Sistema'
      };
      
    } else {
      // Crear nueva categoría
      const nuevoId = generarId();
      const nuevaCategoria = {
        id: nuevoId,
        nombre,
        descripcion: descripcion || '',
        color: color || '#007bff',
        tipo,
        activa,
        fechaCreacion: ahora,
        fechaModificacion: ahora,
        usuarioCreacion: datos.usuarioActual?.id || 'Sistema',
        usuarioModificacion: datos.usuarioActual?.id || 'Sistema'
      };
      
      categorias.push(nuevaCategoria);
    }
    
    guardarDatosHoja(CONFIG.SHEETS.CATEGORIAS, categorias);
    
    logAction('Categoría Guardada', { categoriaId: id || nuevoId, nombre });
    
    return {
      success: true,
      message: id ? 'Categoría actualizada correctamente' : 'Categoría creada correctamente',
      id: id || nuevoId
    };
    
  } catch (error) {
    logError('guardarCategoria', error, datos);
    return {
      success: false,
      message: 'Error al guardar la categoría'
    };
  }
}

/**
 * Eliminar categoría
 * @param {string} categoriaId - ID de la categoría
 * @returns {Object} Resultado de la operación
 */
function eliminarCategoria(categoriaId) {
  try {
    if (!categoriaId) {
      return {
        success: false,
        message: 'ID de categoría requerido'
      };
    }
    
    // Verificar que no esté siendo usada
    const materiales = obtenerDatosHoja(CONFIG.SHEETS.MATERIALES) || [];
    const enUso = materiales.some(m => m.categoria === categoriaId);
    
    if (enUso) {
      return {
        success: false,
        message: 'No se puede eliminar la categoría porque está siendo utilizada por materiales'
      };
    }
    
    const categorias = obtenerDatosHoja(CONFIG.SHEETS.CATEGORIAS) || [];
    const index = categorias.findIndex(c => c.id === categoriaId);
    
    if (index === -1) {
      return {
        success: false,
        message: 'Categoría no encontrada'
      };
    }
    
    const categoriaNombre = categorias[index].nombre;
    categorias.splice(index, 1);
    
    guardarDatosHoja(CONFIG.SHEETS.CATEGORIAS, categorias);
    
    logAction('Categoría Eliminada', { categoriaId, nombre: categoriaNombre });
    
    return {
      success: true,
      message: 'Categoría eliminada correctamente'
    };
    
  } catch (error) {
    logError('eliminarCategoria', error, { categoriaId });
    return {
      success: false,
      message: 'Error al eliminar la categoría'
    };
  }
}

/**
 * Crear categorías por defecto
 * @returns {Array} Categorías por defecto
 */
function crearCategoriasPorDefecto() {
  const categoriasPorDefecto = [
    { nombre: 'Cables Coaxiales', descripcion: 'Cables para señales de TV y datos', color: '#ff6b6b', tipo: 'material' },
    { nombre: 'Fibra Óptica', descripcion: 'Cables de fibra óptica', color: '#4ecdc4', tipo: 'material' },
    { nombre: 'Conectores', descripcion: 'Conectores y adaptadores', color: '#45b7d1', tipo: 'material' },
    { nombre: 'Derivadores', descripcion: 'Derivadores y splitters', color: '#96ceb4', tipo: 'material' },
    { nombre: 'Amplificadores', descripcion: 'Amplificadores de señal', color: '#feca57', tipo: 'material' },
    { nombre: 'Antenas', descripcion: 'Antenas y equipos de recepción', color: '#ff9ff3', tipo: 'material' },
    { nombre: 'Herramientas', descripcion: 'Herramientas de instalación', color: '#54a0ff', tipo: 'material' },
    { nombre: 'Materiales Eléctricos', descripcion: 'Componentes eléctricos diversos', color: '#5f27cd', tipo: 'material' },
    
    // Categorías de avances
    { nombre: 'Alámbrico', descripcion: 'Instalaciones alámbricas', color: '#ff6b6b', tipo: 'avance' },
    { nombre: 'Inalámbrico', descripcion: 'Instalaciones inalámbricas', color: '#4ecdc4', tipo: 'avance' },
    { nombre: 'Fibra Óptica', descripcion: 'Instalaciones de fibra óptica', color: '#45b7d1', tipo: 'avance' },
    { nombre: 'Señales', descripcion: 'Configuración de señales', color: '#96ceb4', tipo: 'avance' },
    { nombre: 'Mediciones', descripcion: 'Mediciones y certificaciones', color: '#feca57', tipo: 'avance' }
  ];
  
  const ahora = new Date().toISOString();
  const categorias = categoriasPorDefecto.map(cat => ({
    id: generarId(),
    ...cat,
    activa: true,
    fechaCreacion: ahora,
    fechaModificacion: ahora,
    usuarioCreacion: 'Sistema',
    usuarioModificacion: 'Sistema'
  }));
  
  guardarDatosHoja(CONFIG.SHEETS.CATEGORIAS, categorias);
  return categorias;
}

// ============================================================================
// FUNCIONES DE COBRANZAS
// ============================================================================

/**
 * Obtener resumen de cobranza por obra
 * @param {string} obraId - ID de la obra
 * @returns {Object} Resumen de cobranza
 */
function obtenerResumenCobranza(obraId) {
  try {
    if (!obraId) {
      return {
        success: false,
        message: 'ID de obra requerido'
      };
    }
    
    const avances = obtenerDatosHoja(CONFIG.SHEETS.AVANCES) || [];
    const cobranzas = obtenerDatosHoja(CONFIG.SHEETS.COBRANZAS) || [];
    
    const avancesObra = avances.filter(a => a.obraId === obraId);
    const cobranzasObra = cobranzas.filter(c => c.obraId === obraId);
    
    // Agrupar por categoría
    const resumenPorCategoria = {};
    
    avancesObra.forEach(avance => {
      if (!resumenPorCategoria[avance.categoria]) {
        resumenPorCategoria[avance.categoria] = {
          categoria: avance.categoria,
          totalAvances: 0,
          avancesCompletados: 0,
          porcentajeCompletado: 0,
          montoFacturado: 0,
          montoPendiente: 0
        };
      }
      
      resumenPorCategoria[avance.categoria].totalAvances++;
      if (avance.estado === 'Completado') {
        resumenPorCategoria[avance.categoria].avancesCompletados++;
      }
    });
    
    // Calcular porcentajes y montos
    Object.keys(resumenPorCategoria).forEach(categoria => {
      const resumen = resumenPorCategoria[categoria];
      resumen.porcentajeCompletado = resumen.totalAvances > 0 ? 
        Math.round((resumen.avancesCompletados / resumen.totalAvances) * 100) : 0;
      
      // Calcular montos desde cobranzas
      const cobranzasCategoria = cobranzasObra.filter(c => c.categoria === categoria);
      resumen.montoFacturado = cobranzasCategoria
        .filter(c => c.estado === 'Facturado')
        .reduce((sum, c) => sum + (c.monto || 0), 0);
      
      resumen.montoPendiente = cobranzasCategoria
        .filter(c => c.estado === 'Pendiente')
        .reduce((sum, c) => sum + (c.monto || 0), 0);
    });
    
    return {
      success: true,
      datos: {
        obraId,
        resumenPorCategoria: Object.values(resumenPorCategoria),
        totales: {
          totalAvances: avancesObra.length,
          avancesCompletados: avancesObra.filter(a => a.estado === 'Completado').length,
          montoTotalFacturado: cobranzasObra
            .filter(c => c.estado === 'Facturado')
            .reduce((sum, c) => sum + (c.monto || 0), 0),
          montoTotalPendiente: cobranzasObra
            .filter(c => c.estado === 'Pendiente')
            .reduce((sum, c) => sum + (c.monto || 0), 0)
        }
      }
    };
    
  } catch (error) {
    logError('obtenerResumenCobranza', error, { obraId });
    return {
      success: false,
      message: 'Error al obtener el resumen de cobranza'
    };
  }
}

/**
 * Registrar cobranza
 * @param {Object} datos - Datos de la cobranza
 * @returns {Object} Resultado de la operación
 */
function registrarCobranza(datos) {
  try {
    const {
      obraId, categoria, descripcion, monto, 
      numeroFactura, fechaFactura, estado = 'Pendiente',
      observaciones
    } = datos;
    
    if (!obraId || !categoria || !monto) {
      return {
        success: false,
        message: 'Obra, categoría y monto son requeridos'
      };
    }
    
    const cobranzas = obtenerDatosHoja(CONFIG.SHEETS.COBRANZAS) || [];
    const nuevoId = generarId();
    const ahora = new Date().toISOString();
    
    const nuevaCobranza = {
      id: nuevoId,
      obraId,
      categoria,
      descripcion: descripcion || '',
      monto: parseFloat(monto),
      numeroFactura: numeroFactura || '',
      fechaFactura: fechaFactura || ahora,
      estado,
      observaciones: observaciones || '',
      fechaRegistro: ahora,
      usuarioRegistro: datos.usuarioActual?.id || 'Sistema'
    };
    
    cobranzas.push(nuevaCobranza);
    guardarDatosHoja(CONFIG.SHEETS.COBRANZAS, cobranzas);
    
    logAction('Cobranza Registrada', { 
      cobranzaId: nuevoId, 
      obraId, 
      categoria, 
      monto 
    });
    
    return {
      success: true,
      message: 'Cobranza registrada correctamente',
      id: nuevoId
    };
    
  } catch (error) {
    logError('registrarCobranza', error, datos);
    return {
      success: false,
      message: 'Error al registrar la cobranza'
    };
  }
}

// ============================================================================
// FUNCIONES DE CONFIGURACIÓN DEL SISTEMA
// ============================================================================

/**
 * Obtener configuración del sistema
 * @returns {Object} Configuración actual
 */
function obtenerConfiguracion() {
  try {
    let configuracion = obtenerDatosHoja(CONFIG.SHEETS.CONFIGURACION);
    
    if (!configuracion || configuracion.length === 0) {
      configuracion = crearConfiguracionPorDefecto();
    }
    
    // Convertir array a objeto
    const configObj = {};
    configuracion.forEach(item => {
      configObj[item.clave] = {
        valor: item.valor,
        tipo: item.tipo,
        descripcion: item.descripcion
      };
    });
    
    return {
      success: true,
      datos: configObj
    };
    
  } catch (error) {
    logError('obtenerConfiguracion', error);
    return {
      success: false,
      message: 'Error al obtener la configuración'
    };
  }
}

/**
 * Guardar configuración del sistema
 * @param {Object} datos - Nueva configuración
 * @returns {Object} Resultado de la operación
 */
function guardarConfiguracion(datos) {
  try {
    const { configuracion } = datos;
    
    if (!configuracion) {
      return {
        success: false,
        message: 'Datos de configuración requeridos'
      };
    }
    
    let configActual = obtenerDatosHoja(CONFIG.SHEETS.CONFIGURACION) || [];
    const ahora = new Date().toISOString();
    
    // Actualizar valores existentes o crear nuevos
    Object.keys(configuracion).forEach(clave => {
      const item = configuracion[clave];
      const index = configActual.findIndex(c => c.clave === clave);
      
      const configItem = {
        clave,
        valor: item.valor,
        tipo: item.tipo || 'string',
        descripcion: item.descripcion || '',
        fechaModificacion: ahora,
        usuarioModificacion: datos.usuarioActual?.id || 'Sistema'
      };
      
      if (index >= 0) {
        configActual[index] = {
          ...configActual[index],
          ...configItem
        };
      } else {
        configItem.fechaCreacion = ahora;
        configItem.usuarioCreacion = datos.usuarioActual?.id || 'Sistema';
        configActual.push(configItem);
      }
    });
    
    guardarDatosHoja(CONFIG.SHEETS.CONFIGURACION, configActual);
    
    logAction('Configuración Actualizada', { claves: Object.keys(configuracion) });
    
    return {
      success: true,
      message: 'Configuración guardada correctamente'
    };
    
  } catch (error) {
    logError('guardarConfiguracion', error, datos);
    return {
      success: false,
      message: 'Error al guardar la configuración'
    };
  }
}

/**
 * Crear configuración por defecto
 * @returns {Array} Configuración por defecto
 */
function crearConfiguracionPorDefecto() {
  const configPorDefecto = [
    {
      clave: 'nombreEmpresa',
      valor: 'Larnet Telecomunicaciones',
      tipo: 'string',
      descripcion: 'Nombre de la empresa'
    },
    {
      clave: 'emailNotificaciones',
      valor: 'notificaciones@larnet.cl',
      tipo: 'email',
      descripcion: 'Email para notificaciones del sistema'
    },
    {
      clave: 'stockMinimoGlobal',
      valor: '10',
      tipo: 'number',
      descripcion: 'Stock mínimo por defecto para materiales'
    },
    {
      clave: 'backupAutomatico',
      valor: 'true',
      tipo: 'boolean',
      descripcion: 'Activar backup automático'
    },
    {
      clave: 'notificarStockBajo',
      valor: 'true',
      tipo: 'boolean',
      descripción: 'Notificar cuando el stock esté bajo'
    },
    {
      clave: 'formatoFechas',
      valor: 'DD/MM/YYYY',
      tipo: 'string',
      descripcion: 'Formato de fechas en el sistema'
    }
  ];
  
  const ahora = new Date().toISOString();
  const configuracion = configPorDefecto.map(config => ({
    ...config,
    fechaCreacion: ahora,
    fechaModificacion: ahora,
    usuarioCreacion: 'Sistema',
    usuarioModificacion: 'Sistema'
  }));
  
  guardarDatosHoja(CONFIG.SHEETS.CONFIGURACION, configuracion);
  return configuracion;
}

// ============================================================================
// FUNCIONES AUXILIARES DE BASE DE DATOS
// ============================================================================

/**
 * Obtener datos de una hoja
 * @param {string} nombreHoja - Nombre de la hoja
 * @returns {Array} Datos de la hoja
 */
function obtenerDatosHoja(nombreHoja) {
  try {
    const spreadsheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    let sheet;
    
    try {
      sheet = spreadsheet.getSheetByName(nombreHoja);
    } catch (e) {
      // La hoja no existe, crearla
      sheet = spreadsheet.insertSheet(nombreHoja);
      return [];
    }
    
    const lastRow = sheet.getLastRow();
    if (lastRow <= 1) return []; // No hay datos o solo headers
    
    const lastCol = sheet.getLastColumn();
    if (lastCol === 0) return [];
    
    const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
    const data = sheet.getRange(2, 1, lastRow - 1, lastCol).getValues();
    
    return data.map(row => {
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = row[index];
      });
      return obj;
    });
    
  } catch (error) {
    logError('obtenerDatosHoja', error, { nombreHoja });
    return [];
  }
}

/**
 * Guardar datos en una hoja
 * @param {string} nombreHoja - Nombre de la hoja
 * @param {Array} datos - Datos a guardar
 */
function guardarDatosHoja(nombreHoja, datos) {
  try {
    if (!datos || datos.length === 0) return;
    
    const spreadsheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    let sheet;
    
    try {
      sheet = spreadsheet.getSheetByName(nombreHoja);
    } catch (e) {
      sheet = spreadsheet.insertSheet(nombreHoja);
    }
    
    // Limpiar hoja
    sheet.clear();
    
    // Obtener headers del primer objeto
    const headers = Object.keys(datos[0]);
    
    // Escribir headers
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    
    // Escribir datos
    const values = datos.map(obj => headers.map(header => obj[header] || ''));
    if (values.length > 0) {
      sheet.getRange(2, 1, values.length, headers.length).setValues(values);
    }
    
  } catch (error) {
    logError('guardarDatosHoja', error, { nombreHoja, cantidadDatos: datos?.length });
    throw error;
  }
}

/**
 * Inicializar una hoja específica
 * @param {string} nombreHoja - Nombre de la hoja
 */
function inicializarHoja(nombreHoja) {
  try {
    const spreadsheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    
    try {
      spreadsheet.getSheetByName(nombreHoja);
      // La hoja ya existe
    } catch (e) {
      // Crear la hoja
      spreadsheet.insertSheet(nombreHoja);
      logAction('Hoja Creada', { nombreHoja });
    }
    
  } catch (error) {
    logError('inicializarHoja', error, { nombreHoja });
  }
}

/**
 * Realizar backup de datos
 * @returns {Object} Resultado del backup
 */
function realizarBackup() {
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const nombreBackup = `BDPA_Backup_${timestamp}`;
    
    // Crear copia del spreadsheet
    const spreadsheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    const backup = spreadsheet.copy(nombreBackup);
    
    // Mover a carpeta de backups
    const carpetaBackups = obtenerOCrearCarpeta('BDPA_Backups');
    DriveApp.getFileById(backup.getId()).moveTo(carpetaBackups);
    
    logAction('Backup Realizado', { nombreBackup, id: backup.getId() });
    
    return {
      success: true,
      message: 'Backup realizado correctamente',
      nombreArchivo: nombreBackup,
      id: backup.getId()
    };
    
  } catch (error) {
    logError('realizarBackup', error);
    return {
      success: false,
      message: 'Error al realizar el backup'
    };
  }
}

// ============================================================================
// FUNCIÓN DE CONFIGURACIÓN INICIAL
// ============================================================================

/**
 * Configurar el ID del Spreadsheet
 * @param {string} spreadsheetId - ID del spreadsheet
 */
function configurarSpreadsheet(spreadsheetId) {
  PropertiesService.getScriptProperties().setProperty('SPREADSHEET_ID', spreadsheetId);
  CONFIG.SPREADSHEET_ID = spreadsheetId;
}

/**
 * Función de prueba de conexión
 * @returns {Object} Estado de la conexión
 */
function testConexion() {
  try {
    const spreadsheetId = CONFIG.SPREADSHEET_ID;
    
    if (!spreadsheetId) {
      return {
        success: false,
        message: 'ID de Spreadsheet no configurado'
      };
    }
    
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    const nombre = spreadsheet.getName();
    
    return {
      success: true,
      message: 'Conexión exitosa',
      spreadsheetNombre: nombre,
      spreadsheetId: spreadsheetId,
      timestamp: new Date().toISOString()
    };
    
  } catch (error) {
    return {
      success: false,
      message: 'Error de conexión: ' + error.message
    };
  }
}
// Función para generar Excel de mediciones
function generarExcelMediciones(datos) {
  try {
    const { obra, torre, tipoSenal, mediciones } = datos;
    
    // Crear nuevo spreadsheet
    const ss = SpreadsheetApp.create(`Mediciones_${obra}_${torre}_${tipoSenal}`);
    const sheet = ss.getActiveSheet();
    
    // Configurar encabezados según tipo
    if (tipoSenal === 'FO') {
      configurarHojaFO(sheet, mediciones);
    } else {
      configurarHojaCoaxial(sheet, mediciones, tipoSenal);
    }
    
    // Aplicar formato
    aplicarFormatoMediciones(sheet);
    
    // Generar URL de descarga
    const file = DriveApp.getFileById(ss.getId());
    const blob = file.getBlob();
    const base64 = Utilities.base64Encode(blob.getBytes());
    
    return {
      success: true,
      url: `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${base64}`,
      fileId: ss.getId()
    };
    
  } catch (error) {
    console.error('Error generando Excel:', error);
    return {
      success: false,
      message: error.message
    };
  }
}

// Configurar hoja para mediciones coaxiales
function configurarHojaCoaxial(sheet, mediciones, tipo) {
  // Título
  sheet.getRange('A1').setValue(`MEDICIONES ${tipo.replace('_', ' ')}`);
  sheet.getRange('A1:J1').merge();
  
  // Encabezados
  const headers = [
    ['Piso', 'N° Depto', 'Pwr/Lev (dBμV) 53 Mhz', 'Pwr/Lev (dBμV) 400 Mhz', 
     'Pwr/Lev (dBμV) 800 Mhz', 'Pwr/Lev (dBμV) 1220 Mhz', 
     '(dB) 53 Mhz', '(dB) 400 Mhz', '(dB) 800 Mhz', '(dB) 1220 Mhz']
  ];
  
  sheet.getRange('A3:J3').setValues(headers);
  
  // Base trazado
  sheet.getRange('A5').setValue('Base Trazado');
  sheet.getRange('C5').setValue('60.3');
  sheet.getRange('D5').setValue('57.1');
  sheet.getRange('E5').setValue('53.7');
  sheet.getRange('F5').setValue('50.8');
  sheet.getRange('G5:J5').setValue('0');
  
  // Datos
  let row = 6;
  Object.values(mediciones).forEach(depto => {
    const rowData = [
      depto.piso,
      depto.numeroDepto,
      depto.mediciones['53']?.pwr || '',
      depto.mediciones['400']?.pwr || '',
      depto.mediciones['800']?.pwr || '',
      depto.mediciones['1220']?.pwr || '',
      depto.mediciones['53']?.db || '',
      depto.mediciones['400']?.db || '',
      depto.mediciones['800']?.db || '',
      depto.mediciones['1220']?.db || ''
    ];
    
    sheet.getRange(row, 1, 1, 10).setValues([rowData]);
    
    // Aplicar formato condicional para valores fuera de rango
    aplicarFormatoCondicional(sheet, row);
    
    row++;
  });
}

// Aplicar formato a la hoja
function aplicarFormatoMediciones(sheet) {
  // Formato general
  sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns())
    .setFontFamily('Arial')
    .setFontSize(10)
    .setBorder(true, true, true, true, true, true);
    
  // Título
  sheet.getRange('A1')
    .setFontSize(14)
    .setFontWeight('bold')
    .setHorizontalAlignment('center');
    
  // Encabezados
  sheet.getRange('A3:J3')
    .setFontWeight('bold')
    .setBackground('#f0f0f0')
    .setHorizontalAlignment('center');
    
  // Ajustar anchos de columna
  sheet.setColumnWidth(1, 60);  // Piso
  sheet.setColumnWidth(2, 80);  // N° Depto
  for (let i = 3; i <= 10; i++) {
    sheet.setColumnWidth(i, 100);
  }
}
// ============================================================================
// FUNCIONES DE DOCUMENTACIÓN
// ============================================================================

/**
 * Obtener documentos con filtros
 */
function obtenerDocumentos(datos = {}) {
  try {
    const { tipo, obra, busqueda } = datos;
    
    let documentos = obtenerDatosHoja(CONFIG.SHEETS.DOCUMENTOS) || [];
    
    // Aplicar filtros
    if (tipo) {
      documentos = documentos.filter(d => d.tipo === tipo);
    }
    
    if (obra) {
      documentos = documentos.filter(d => d.obraId === obra);
    }
    
    if (busqueda) {
      const busquedaLower = busqueda.toLowerCase();
      documentos = documentos.filter(d => 
        d.nombre.toLowerCase().includes(busquedaLower) ||
        (d.descripcion && d.descripcion.toLowerCase().includes(busquedaLower))
      );
    }
    
    // Enriquecer con datos de obra y usuario
    const obras = obtenerDatosHoja(CONFIG.SHEETS.OBRAS) || [];
    const usuarios = obtenerDatosHoja(CONFIG.SHEETS.USUARIOS) || [];
    
    documentos = documentos.map(doc => {
      const obra = obras.find(o => o.id === doc.obraId);
      const usuario = usuarios.find(u => u.id === doc.usuarioId);
      
      return {
        ...doc,
        obraNombre: obra?.nombre,
        usuarioNombre: usuario ? `${usuario.nombre} ${usuario.apellido}` : 'Sistema'
      };
    });
    
    // Ordenar por fecha descendente
    documentos.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    
    return {
      success: true,
      datos: documentos
    };
    
  } catch (error) {
    logError('obtenerDocumentos', error, datos);
    return {
      success: false,
      message: 'Error al obtener documentos'
    };
  }
}

/**
 * Guardar documento
 */
function guardarDocumento(datos) {
  try {
    const { id, nombre, tipo, obraId, descripcion, archivo } = datos;
    
    // Validaciones
    if (!nombre) {
      return {
        success: false,
        message: 'El nombre del documento es requerido'
      };
    }
    
    const ahora = new Date().toISOString();
    let documentos = obtenerDatosHoja(CONFIG.SHEETS.DOCUMENTOS) || [];
    
    let urlArchivo = null;
    let nombreArchivo = null;
    
    // Si hay archivo nuevo, guardarlo en Drive
    if (archivo) {
      const blob = Utilities.newBlob(
        Utilities.base64Decode(archivo.datos),
        archivo.tipo,
        archivo.nombre
      );
      
      urlArchivo = guardarArchivoEnDrive(blob, 'Documentos', obraId);
      nombreArchivo = archivo.nombre;
    }
    
    if (id) {
      // Actualizar documento existente
      const index = documentos.findIndex(d => d.id === id);
      if (index === -1) {
        return {
          success: false,
          message: 'Documento no encontrado'
        };
      }
      
      documentos[index] = {
        ...documentos[index],
        nombre,
        tipo,
        obraId,
        descripcion,
        urlArchivo: urlArchivo || documentos[index].urlArchivo,
        nombreArchivo: nombreArchivo || documentos[index].nombreArchivo,
        fechaModificacion: ahora,
        usuarioModificacion: datos.usuarioActual?.id || 'Sistema'
      };
      
    } else {
      // Crear nuevo documento
      if (!archivo) {
        return {
          success: false,
          message: 'Debe proporcionar un archivo para crear un documento'
        };
      }
      
      const nuevoId = generarId();
      documentos.push({
        id: nuevoId,
        nombre,
        tipo,
        obraId,
        descripcion,
        urlArchivo,
        nombreArchivo,
        fecha: ahora,
        fechaCreacion: ahora,
        usuarioId: datos.usuarioActual?.id || 'Sistema',
        activo: true
      });
    }
    
    guardarDatosHoja(CONFIG.SHEETS.DOCUMENTOS, documentos);
    
    logAction('Documento guardado', { id: id || 'nuevo', nombre });
    
    return {
      success: true,
      message: 'Documento guardado correctamente'
    };
    
  } catch (error) {
    logError('guardarDocumento', error, datos);
    return {
      success: false,
      message: 'Error al guardar documento'
    };
  }
}

/**
 * Guardar archivo en Drive
 */
function guardarArchivoEnDrive(blob, carpetaTipo, obraId) {
  try {
    // Obtener carpeta principal
    const carpetaPrincipal = obtenerOCrearCarpeta('BDPA_Documentos');
    
    // Obtener carpeta de tipo
    const carpetaTipoDoc = obtenerOCrearCarpeta(carpetaTipo, carpetaPrincipal);
    
    // Si hay obra, crear subcarpeta
    let carpetaFinal = carpetaTipoDoc;
    if (obraId) {
      const obras = obtenerDatosHoja(CONFIG.SHEETS.OBRAS) || [];
      const obra = obras.find(o => o.id === obraId);
      if (obra) {
        carpetaFinal = obtenerOCrearCarpeta(obra.nombre, carpetaTipoDoc);
      }
    }
    
    // Guardar archivo
    const archivo = carpetaFinal.createFile(blob);
    archivo.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    
    return archivo.getUrl();
    
  } catch (error) {
    logError('guardarArchivoEnDrive', error);
    throw error;
  }
}

/**
 * Obtener URL de documento
 */
function obtenerUrlDocumento(datos) {
  try {
    const { id, preview } = datos;
    
    const documentos = obtenerDatosHoja(CONFIG.SHEETS.DOCUMENTOS) || [];
    const documento = documentos.find(d => d.id === id);
   
   if (!documento) {
     return {
       success: false,
       message: 'Documento no encontrado'
     };
   }
   
   // Para preview, verificar si es compatible
   if (preview) {
     const extensionesPreview = ['.pdf', '.jpg', '.jpeg', '.png'];
     const tienePreview = extensionesPreview.some(ext => 
       documento.nombreArchivo.toLowerCase().endsWith(ext)
     );
     
     if (!tienePreview) {
       return {
         success: false,
         message: 'Este tipo de archivo no soporta vista previa'
       };
     }
   }
   
   return {
     success: true,
     url: documento.urlArchivo,
     nombreArchivo: documento.nombreArchivo
   };
   
 } catch (error) {
   logError('obtenerUrlDocumento', error, datos);
   return {
     success: false,
     message: 'Error al obtener URL del documento'
   };
 }
}

/**
* Descargar documento
*/
function descargarDocumento(datos) {
 try {
   const { id } = datos;
   
   const documentos = obtenerDatosHoja(CONFIG.SHEETS.DOCUMENTOS) || [];
   const documento = documentos.find(d => d.id === id);
   
   if (!documento) {
     return {
       success: false,
       message: 'Documento no encontrado'
     };
   }
   
   // Registrar descarga
   logAction('Documento descargado', { 
     documentoId: id, 
     nombre: documento.nombre,
     usuario: datos.usuarioActual?.id 
   });
   
   return {
     success: true,
     url: documento.urlArchivo,
     nombreArchivo: documento.nombreArchivo
   };
   
 } catch (error) {
   logError('descargarDocumento', error, datos);
   return {
     success: false,
     message: 'Error al descargar documento'
   };
 }
}

/**
* Eliminar documento
*/
function eliminarDocumento(datos) {
 try {
   const { id } = datos;
   
   if (!id) {
     return {
       success: false,
       message: 'ID de documento requerido'
     };
   }
   
   const documentos = obtenerDatosHoja(CONFIG.SHEETS.DOCUMENTOS) || [];
   const index = documentos.findIndex(d => d.id === id);
   
   if (index === -1) {
     return {
       success: false,
       message: 'Documento no encontrado'
     };
   }
   
   const documento = documentos[index];
   
   // Marcar como inactivo en lugar de eliminar físicamente
   documentos[index] = {
     ...documento,
     activo: false,
     fechaEliminacion: new Date().toISOString(),
     usuarioEliminacion: datos.usuarioActual?.id || 'Sistema'
   };
   
   guardarDatosHoja(CONFIG.SHEETS.DOCUMENTOS, documentos);
   
   logAction('Documento eliminado', { 
     documentoId: id, 
     nombre: documento.nombre 
   });
   
   return {
     success: true,
     message: 'Documento eliminado correctamente'
   };
   
 } catch (error) {
   logError('eliminarDocumento', error, datos);
   return {
     success: false,
     message: 'Error al eliminar documento'
   };
 }
}

// ============================================================================
// EXPORTACIÓN FINAL
// ============================================================================

/**
 * Función principal exportada que debe ser llamada desde el frontend
 * Esta función reemplaza a procesarAPI para evitar conflictos
 */
function callAPI(accion, datos = {}, token = null) {
  return procesarAPI(accion, datos, token);
}
// ============================================================================
// FUNCIÓN PARA WEB APP - OBLIGATORIA
// ============================================================================

/**
 * Función requerida para Google Apps Script Web App
 * Esta función se ejecuta cuando alguien accede a la URL de la aplicación
 */
function doGet(e) {
  try {
    console.log('Acceso a Web App desde:', e.parameter);
    
    // Crear template HTML principal
    const template = HtmlService.createTemplateFromFile('index');
    
    // Agregar parámetros del sistema
    template.APP_NAME = CONFIG.APP_NAME;
    template.VERSION = CONFIG.VERSION;
    template.DEVELOPER = CONFIG.DEVELOPER;
    
    // Evaluar el template y crear output
    const output = template.evaluate();
    
    // Configurar propiedades del HTML
    output.setTitle(CONFIG.APP_NAME);
    output.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
    output.addMetaTag('viewport', 'width=device-width, initial-scale=1.0');
    
    console.log('Web App cargada exitosamente');
    
    return output;
    
  } catch (error) {
    console.error('Error en doGet:', error);
    
    // Crear página de error básica
    return HtmlService.createHtmlOutput(`
      <html>
        <head>
          <title>Error - BDPA</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; margin-top: 50px; }
            .error { color: #dc3545; }
          </style>
        </head>
        <body>
          <h1 class="error">Error al cargar BDPA</h1>
          <p>Ha ocurrido un error al inicializar la aplicación.</p>
          <p><strong>Error:</strong> ${error.message}</p>
          <p>Por favor, contacte al administrador del sistema.</p>
        </body>
      </html>
    `);
  }
}

/**
 * Función auxiliar para incluir archivos HTML
 * Permite usar <?!= include('archivo') ?> en templates
 */
function include(filename) {
  try {
    return HtmlService.createHtmlOutputFromFile(filename).getContent();
  } catch (error) {
    console.error('Error incluyendo archivo:', filename, error);
    return `<!-- Error cargando ${filename}: ${error.message} -->`;
  }
}

/**
 * Función principal de API para el frontend
 * Esta función maneja todas las llamadas desde JavaScript del cliente
 */
function callAPI(accion, datos, token) {
  return procesarAPI(accion, datos, token);
}