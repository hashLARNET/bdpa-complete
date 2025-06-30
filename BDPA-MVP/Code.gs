/**
 * BDPA MVP - Google Apps Script Backend
 * Sistema simplificado para control de progreso de obra Los Encinos
 */

// Configuración global
const CONFIG = {
  SPREADSHEET_ID: 'TU_SPREADSHEET_ID_AQUI', // Reemplazar con el ID real
  SHEETS: {
    CONFIG: 'Config',
    USUARIOS: 'Usuarios', 
    ESTRUCTURA: 'Estructura',
    AVANCES: 'Avances',
    MEDICIONES: 'Mediciones'
  }
};

/**
 * Función principal para servir la aplicación web
 */
function doGet() {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('BDPA MVP - Los Encinos')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Función para incluir archivos HTML/CSS/JS
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * Función principal de la API
 */
function processAPI(payload) {
  try {
    console.log('API Request:', payload);
    
    const { action, data } = payload;
    
    switch(action) {
      case 'login':
        return handleLogin(data);
      case 'getEstructura':
        return handleGetEstructura();
      case 'getUnidadesPorTorrePiso':
        return handleGetUnidadesPorTorrePiso(data);
      case 'guardarAvance':
        return handleGuardarAvance(data);
      case 'getAvances':
        return handleGetAvances(data);
      case 'getProgreso':
        return handleGetProgreso();
      case 'guardarMedicion':
        return handleGuardarMedicion(data);
      case 'getMediciones':
        return handleGetMediciones();
      default:
        return { success: false, message: 'Acción no reconocida: ' + action };
    }
    
  } catch (error) {
    console.error('Error en processAPI:', error);
    return { 
      success: false, 
      message: 'Error interno del servidor: ' + error.message 
    };
  }
}

/**
 * Manejo de login
 */
function handleLogin(data) {
  try {
    const { username, password } = data;
    
    const sheet = getSheet(CONFIG.SHEETS.USUARIOS);
    const usuarios = sheet.getDataRange().getValues();
    
    // Buscar usuario (saltando header)
    for (let i = 1; i < usuarios.length; i++) {
      const [id, user, pass, nombre, rol, activo] = usuarios[i];
      
      if (user === username && pass === password && activo) {
        // Actualizar último acceso
        sheet.getRange(i + 1, 7).setValue(new Date());
        
        return {
          success: true,
          usuario: {
            id: id,
            username: user,
            nombre: nombre,
            rol: rol
          }
        };
      }
    }
    
    return { success: false, message: 'Credenciales incorrectas' };
    
  } catch (error) {
    console.error('Error en login:', error);
    return { success: false, message: 'Error en autenticación' };
  }
}

/**
 * Obtener estructura de la obra
 */
function handleGetEstructura() {
  try {
    const configSheet = getSheet(CONFIG.SHEETS.CONFIG);
    const estructuraSheet = getSheet(CONFIG.SHEETS.ESTRUCTURA);
    
    // Obtener configuración básica
    const config = {};
    const configData = configSheet.getDataRange().getValues();
    for (let i = 1; i < configData.length; i++) {
      config[configData[i][0]] = configData[i][1];
    }
    
    // Obtener estructura
    const estructura = estructuraSheet.getDataRange().getValues();
    const torres = [...new Set(estructura.slice(1).map(row => row[0]))];
    const pisos = [...new Set(estructura.slice(1).map(row => row[1]).filter(p => p))];
    
    return {
      success: true,
      data: {
        obra: config.NombreObra || 'Los Encinos',
        direccion: config.DireccionObra || '',
        estado: config.EstadoObra || 'En progreso',
        torres: torres.sort(),
        pisos: pisos.sort(),
        totalElementos: estructura.length - 1
      }
    };
    
  } catch (error) {
    console.error('Error obteniendo estructura:', error);
    return { success: false, message: 'Error al cargar estructura' };
  }
}

/**
 * Obtener unidades por torre y piso
 */
function handleGetUnidadesPorTorrePiso(data) {
  try {
    const { torre, piso } = data;
    
    if (!torre || !piso) {
      return { success: false, message: 'Torre y piso son requeridos' };
    }
    
    const sheet = getSheet(CONFIG.SHEETS.ESTRUCTURA);
    const estructura = sheet.getDataRange().getValues();
    
    // Filtrar unidades por torre, piso y tipo 'Unidad'
    const unidades = [];
    for (let i = 1; i < estructura.length; i++) {
      const [torreRow, pisoRow, sector, tipoEspacio, identificador, activo] = estructura[i];
      
      if (torreRow === torre && 
          pisoRow == piso && 
          tipoEspacio === 'Unidad' && 
          activo) {
        unidades.push({
          torre: torreRow,
          piso: pisoRow,
          sector: sector,
          identificador: identificador,
          tipoEspacio: tipoEspacio
        });
      }
    }
    
    // Ordenar por identificador
    unidades.sort((a, b) => a.identificador.localeCompare(b.identificador));
    
    return {
      success: true,
      data: unidades
    };
    
  } catch (error) {
    console.error('Error obteniendo unidades:', error);
    return { success: false, message: 'Error al cargar unidades' };
  }
}

/**
 * Guardar avance
 */
function handleGuardarAvance(data) {
  try {
    const sheet = getSheet(CONFIG.SHEETS.AVANCES);
    
    // Generar ID único
    const id = Utilities.getUuid();
    const timestamp = new Date();
    
    // Preparar datos para insertar
    const rowData = [
      id,
      data.fecha || timestamp.toISOString(),
      data.torre,
      data.piso || '',
      data.tipoEspacio,
      data.ubicacion,
      data.categoria,
      data.porcentaje,
      data.foto ? 'SI' : 'NO', // Indicador de foto
      data.observaciones || '',
      data.usuario,
      timestamp
    ];
    
    // Insertar en la hoja
    sheet.appendRow(rowData);
    
    // Si hay foto, guardarla en Drive (opcional)
    if (data.foto) {
      try {
        savePhotoToDrive(id, data.foto);
      } catch (photoError) {
        console.error('Error guardando foto:', photoError);
        // No fallar por error de foto
      }
    }
    
    return { success: true, id: id };
    
  } catch (error) {
    console.error('Error guardando avance:', error);
    return { success: false, message: 'Error al guardar avance' };
  }
}

/**
 * Obtener avances
 */
function handleGetAvances(filtros = {}) {
  try {
    const sheet = getSheet(CONFIG.SHEETS.AVANCES);
    const data = sheet.getDataRange().getValues();
    
    if (data.length <= 1) {
      return { success: true, data: [] };
    }
    
    // Convertir a objetos
    const avances = [];
    for (let i = 1; i < data.length; i++) {
      const [id, fecha, torre, piso, tipoEspacio, ubicacion, categoria, porcentaje, fotos, observaciones, usuario, timestamp] = data[i];
      
      const avance = {
        id,
        fecha,
        torre,
        piso,
        tipoEspacio,
        ubicacion,
        categoria,
        porcentaje: Number(porcentaje) || 0,
        fotos: fotos === 'SI',
        observaciones,
        usuario,
        timestamp
      };
      
      // Aplicar filtros
      if (filtros.torre && avance.torre !== filtros.torre) continue;
      if (filtros.tipo && avance.tipoEspacio !== filtros.tipo) continue;
      
      avances.push(avance);
    }
    
    // Ordenar por fecha descendente
    avances.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    
    return { success: true, data: avances };
    
  } catch (error) {
    console.error('Error obteniendo avances:', error);
    return { success: false, message: 'Error al cargar avances' };
  }
}

/**
 * Obtener progreso general
 */
function handleGetProgreso() {
  try {
    const avancesResponse = handleGetAvances();
    if (!avancesResponse.success) {
      return avancesResponse;
    }
    
    const avances = avancesResponse.data;
    const total = avances.length;
    
    if (total === 0) {
      return {
        success: true,
        data: {
          totalUnidades: 0,
          unidadesCompletadas: 0,
          porcentajeGeneral: 0,
          totalAvances: 0,
          porTorre: {}
        }
      };
    }
    
    // Calcular estadísticas
    const completados = avances.filter(a => a.porcentaje >= 100).length;
    const promedioGeneral = avances.reduce((sum, a) => sum + a.porcentaje, 0) / total;
    
    // Progreso por torre
    const torres = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const porTorre = {};
    
    torres.forEach(torre => {
      const avancesTorre = avances.filter(a => a.torre === torre);
      if (avancesTorre.length > 0) {
        const completadosTorre = avancesTorre.filter(a => a.porcentaje >= 100).length;
        porTorre[torre] = (completadosTorre / avancesTorre.length) * 100;
      } else {
        porTorre[torre] = 0;
      }
    });
    
    return {
      success: true,
      data: {
        totalUnidades: 1247, // Número fijo para Los Encinos
        unidadesCompletadas: completados,
        porcentajeGeneral: Math.round(promedioGeneral),
        totalAvances: total,
        porTorre: porTorre
      }
    };
    
  } catch (error) {
    console.error('Error calculando progreso:', error);
    return { success: false, message: 'Error al calcular progreso' };
  }
}

/**
 * Guardar medición
 */
function handleGuardarMedicion(data) {
  try {
    const sheet = getSheet(CONFIG.SHEETS.MEDICIONES);
    
    // Generar ID único
    const id = Utilities.getUuid();
    const timestamp = new Date();
    
    // Preparar datos para insertar según la nueva estructura
    const rowData = [
      id,                           // ID
      data.fecha || timestamp.toISOString(), // Fecha
      data.torre,                   // Torre
      data.piso,                    // Piso
      data.identificador,           // Identificador (nuevo campo)
      data.tipoMedicion,           // TipoMedicion
      data.valores,                // Valores (JSON string)
      data.estado,                 // Estado
      data.usuario,                // Usuario
      data.observaciones || '',    // Observaciones
      timestamp                    // Timestamp
    ];
    
    // Insertar en la hoja
    sheet.appendRow(rowData);
    
    return { success: true, id: id };
    
  } catch (error) {
    console.error('Error guardando medición:', error);
    return { success: false, message: 'Error al guardar medición' };
  }
}

/**
 * Obtener mediciones
 */
function handleGetMediciones() {
  try {
    const sheet = getSheet(CONFIG.SHEETS.MEDICIONES);
    const data = sheet.getDataRange().getValues();
    
    if (data.length <= 1) {
      return { success: true, data: [] };
    }
    
    // Convertir a objetos según la nueva estructura
    const mediciones = [];
    for (let i = 1; i < data.length; i++) {
      const [id, fecha, torre, piso, identificador, tipoMedicion, valores, estado, usuario, observaciones, timestamp] = data[i];
      
      mediciones.push({
        id,
        fecha,
        torre,
        piso,
        identificador,
        tipoMedicion,
        valores,
        estado,
        usuario,
        observaciones,
        timestamp
      });
    }
    
    // Ordenar por fecha descendente
    mediciones.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    
    return { success: true, data: mediciones };
    
  } catch (error) {
    console.error('Error obteniendo mediciones:', error);
    return { success: false, message: 'Error al cargar mediciones' };
  }
}

/**
 * Función auxiliar para obtener hoja de cálculo
 */
function getSheet(sheetName) {
  const spreadsheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  let sheet = spreadsheet.getSheetByName(sheetName);
  
  if (!sheet) {
    // Crear hoja si no existe
    sheet = spreadsheet.insertSheet(sheetName);
    initializeSheet(sheet, sheetName);
  }
  
  return sheet;
}

/**
 * Inicializar hojas con headers
 */
function initializeSheet(sheet, sheetName) {
  let headers = [];
  
  switch(sheetName) {
    case CONFIG.SHEETS.CONFIG:
      headers = ['Parametro', 'Valor'];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      // Agregar datos iniciales
      sheet.getRange(2, 1, 4, 2).setValues([
        ['NombreObra', 'Los Encinos'],
        ['DireccionObra', 'Dirección de la obra'],
        ['EstadoObra', 'En progreso'],
        ['FechaInicio', new Date()]
      ]);
      break;
      
    case CONFIG.SHEETS.USUARIOS:
      headers = ['ID', 'Username', 'Password', 'Nombre', 'Rol', 'Activo', 'UltimoAcceso'];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      // Agregar usuarios por defecto
      sheet.getRange(2, 1, 3, 7).setValues([
        [1, 'admin', 'admin123', 'Administrador', 'Admin', true, ''],
        [2, 'supervisor', 'sup123', 'Supervisor Campo', 'Supervisor', true, ''],
        [3, 'tecnico1', 'tec123', 'Técnico 1', 'Tecnico', true, '']
      ]);
      break;
      
    case CONFIG.SHEETS.ESTRUCTURA:
      headers = ['Torre', 'Piso', 'Sector', 'TipoEspacio', 'Identificador', 'Activo'];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      break;
      
    case CONFIG.SHEETS.AVANCES:
      headers = ['ID', 'Fecha', 'Torre', 'Piso', 'TipoEspacio', 'Identificador', 'Categoria', 'Porcentaje', 'Fotos', 'Observaciones', 'Usuario', 'Timestamp'];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      break;
      
    case CONFIG.SHEETS.MEDICIONES:
      headers = ['ID', 'Fecha', 'Torre', 'Piso', 'Identificador', 'TipoMedicion', 'Valores', 'Estado', 'Usuario', 'Observaciones', 'Timestamp'];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      break;
  }
}

/**
 * Guardar foto en Google Drive (opcional)
 */
function savePhotoToDrive(avanceId, fotoData) {
  try {
    // Crear carpeta si no existe
    const folders = DriveApp.getFoldersByName('BDPA_Fotos');
    let folder;
    if (folders.hasNext()) {
      folder = folders.next();
    } else {
      folder = DriveApp.createFolder('BDPA_Fotos');
    }
    
    // Decodificar base64 y crear archivo
    const blob = Utilities.newBlob(
      Utilities.base64Decode(fotoData.datos),
      fotoData.tipo,
      `${avanceId}_${fotoData.nombre}`
    );
    
    const file = folder.createFile(blob);
    
    // Hacer el archivo público (opcional)
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    
    return file.getUrl();
    
  } catch (error) {
    console.error('Error guardando foto en Drive:', error);
    throw error;
  }
}

/**
 * Función para testing (opcional)
 */
function testAPI() {
  // Test login
  const loginResult = processAPI({
    action: 'login',
    data: { username: 'admin', password: 'admin123' }
  });
  console.log('Login test:', loginResult);
  
  // Test estructura
  const estructuraResult = processAPI({
    action: 'getEstructura',
    data: {}
  });
  console.log('Estructura test:', estructuraResult);
  
  // Test unidades por torre y piso
  const unidadesResult = processAPI({
    action: 'getUnidadesPorTorrePiso',
    data: { torre: 'A', piso: 1 }
  });
  console.log('Unidades test:', unidadesResult);
}