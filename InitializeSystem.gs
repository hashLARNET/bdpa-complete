```javascript
/**
 * SCRIPT DE INICIALIZACIÓN COMPLETA - BDPA MVP
 * Ejecutar una sola vez para configurar todo el sistema
 */

// --- CONSTANTES GLOBALES PARA LA ESTRUCTURA DE LA OBRA ---
const OBRA_CONFIG_INIT = {
  nombre: "Los Encinos",
  direccion: "Av. Principal 123, Santiago", // Dirección de ejemplo
  estado: "En progreso",
  fechaInicio: new Date(),
  torres: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
  pisos: [1, 3],
  sectores: {
    normal: ["Norte", "Poniente", "Oriente"],
    sinNorte: ["Poniente", "Oriente"] // Para torres C y H
  }
};

const USUARIOS_INICIALES = [
  { id: 1, username: 'admin', password: 'admin123', nombre: 'Administrador', rol: 'Admin', activo: true },
  { id: 2, username: 'supervisor', password: 'sup123', nombre: 'Supervisor Campo', rol: 'Supervisor', activo: true },
  { id: 3, username: 'tecnico1', password: 'tec123', nombre: 'Técnico 1', rol: 'Tecnico', activo: true }
];

// Estructura detallada de unidades por torre
const ESTRUCTURA_UNIDADES_INIT = {
  A: {
    1: { Oriente: ["A101", "A102", "A103", "A104", "A105", "A106", "A107", "A108", "A109"] },
    3: { Oriente: ["A301", "A302", "A303", "A304", "A305", "A306", "A307", "A308", "A309"] }
  },
  B: {
    1: {
      Poniente: ["B107", "B108", "B109", "B110"],
      Norte: ["B101", "B102", "B103", "B104", "B105", "B106"],
      Oriente: ["B111", "B112", "B113", "B114", "B115"]
    },
    3: {
      Poniente: ["B307", "B308", "B309", "B310"],
      Norte: ["B301", "B302", "B303", "B304", "B305", "B306"],
      Oriente: ["B311", "B312", "B313", "B314", "B315"]
    }
  },
  C: {
    1: {
      Poniente: ["C101", "C102", "C103", "C104", "C105", "C106", "C107"],
      Oriente: ["C108", "C109", "C110", "C111", "C112", "C113", "C114"]
    },
    3: {
      Poniente: ["C301", "C302", "C303", "C304", "C305", "C306", "C307"],
      Oriente: ["C308", "C309", "C310", "C311", "C312", "C313", "C314"]
    }
  },
  D: {
    1: {
      Poniente: ["D107", "D108", "D109", "D110", "D111"],
      Norte: ["D101", "D102", "D103", "D104", "D105", "D106"],
      Oriente: ["D112", "D113", "D114", "D115", "D116"]
    },
    3: {
      Poniente: ["D307", "D308", "D309", "D310", "D311"],
      Norte: ["D301", "D302", "D303", "D304", "D305", "D306"],
      Oriente: ["D312", "D313", "D314", "D315", "D316"]
    }
  },
  E: {
    1: {
      Poniente: ["E107", "E108", "E109", "E110", "E111"],
      Norte: ["E101", "E102", "E103", "E104", "E105", "E106"],
      Oriente: ["E112", "E113", "E114", "E115", "E116"]
    },
    3: {
      Poniente: ["E307", "E308", "E309", "E310", "E311"],
      Norte: ["E301", "E302", "E303", "E304", "E305", "E306"],
      Oriente: ["E312", "E313", "E314", "E315", "E316"]
    }
  },
  F: {
    1: {
      Poniente: ["F107", "F108", "F109", "F110"],
      Norte: ["F101", "F102", "F103", "F104", "F105", "F106"],
      Oriente: ["F111", "F112", "F113", "F114", "F115"]
    },
    3: {
      Poniente: ["F307", "F308", "F309", "F310"],
      Norte: ["F301", "F302", "F303", "F304", "F305", "F306"],
      Oriente: ["F311", "F312", "F313", "F314", "F315"]
    }
  },
  G: {
    1: {
      Poniente: ["G107", "G109", "G110"],
      Norte: ["G101", "G102", "G103", "G104", "G105", "G106"],
      Oriente: ["G111", "G112", "G113", "G114", "G115"]
    },
    3: {
      Poniente: ["G307", "G309", "G310"],
      Norte: ["G301", "G302", "G303", "G304", "G305", "G306"],
      Oriente: ["G311", "G312", "G313", "G314", "G315"]
    }
  },
  H: {
    1: {
      Poniente: ["H101", "H102", "H103", "H104", "H105", "H106", "H107"],
      Oriente: ["H108", "H109", "H110", "H111", "H112", "H113", "H114"]
    },
    3: {
      Poniente: ["H301", "H302", "H303", "H304", "H305", "H306", "H307"],
      Oriente: ["H308", "H309", "H310", "H311", "H312", "H313", "H314"]
    }
  },
  I: {
    1: {
      Poniente: ["I107", "I108", "I109", "I110", "I111"],
      Norte: ["I101", "I102", "I103", "I104", "I105", "I106"],
      Oriente: ["I112", "I113", "I114", "I115", "I116"]
    },
    3: {
      Poniente: ["I307", "I308", "I309", "I310", "I311"],
      Norte: ["I301", "I302", "I303", "I304", "I305", "I306"],
      Oriente: ["I312", "I313", "I314", "I315", "I316"]
    }
  },
  J: {
    1: {
      Poniente: ["J109", "J110", "J111", "J112"],
      Norte: ["J101", "J102", "J103", "J104", "J105", "J106", "J107", "J108"],
      Oriente: ["J113", "J114", "J115", "J116", "J117"]
    },
    3: {
      Poniente: ["J309", "J310", "J311", "J312"],
      Norte: ["J301", "J302", "J303", "J304", "J305", "J306", "J307", "J308"],
      Oriente: ["J313", "J314", "J315", "J316", "J317"]
    }
  }
};

const SHEET_NAMES = {
  CONFIG: 'Config',
  USUARIOS: 'Usuarios',
  ESTRUCTURA: 'Estructura',
  AVANCES: 'Avances',
  MEDICIONES: 'Mediciones'
};

const HEADERS = {
  [SHEET_NAMES.CONFIG]: ['Parametro', 'Valor'],
  [SHEET_NAMES.USUARIOS]: ['ID', 'Username', 'Password', 'Nombre', 'Rol', 'Activo', 'UltimoAcceso'],
  [SHEET_NAMES.ESTRUCTURA]: ['Torre', 'Piso', 'Sector', 'TipoEspacio', 'Identificador', 'Activo'],
  [SHEET_NAMES.AVANCES]: ['ID', 'Fecha', 'Torre', 'Piso', 'TipoEspacio', 'Identificador', 'Categoria', 'Porcentaje', 'Fotos', 'Observaciones', 'Usuario', 'Timestamp'],
  [SHEET_NAMES.MEDICIONES]: ['ID', 'Fecha', 'Torre', 'Piso', 'TipoMedicion', 'Valores', 'Estado', 'Usuario', 'Observaciones', 'Timestamp']
};

/**
 * SCRIPT DE INICIALIZACIÓN COMPLETA - BDPA MVP
 * Ejecutar una sola vez para configurar todo el sistema
 */
function initializeCompleteSystem() {
  const startTime = new Date();
  let spreadsheetId = null;
  let mainDriveFolderId = null;
  const summary = {
    spreadsheetUrl: '',
    sheetsCreated: [],
    foldersCreated: [],
    usersCreated: [],
    structureStats: {
      totalUnidades: 0,
      totalSOTU: 0,
      totalShafts: 0,
      totalAntenas: 0,
      totalLaterales: 0,
      totalEspacios: 0
    }
  };

  try {
    console.log('🚀 Iniciando configuración completa de BDPA MVP...');

    // Paso 1: Crear o verificar Spreadsheet
    console.log('1. Creando/Verificando Google Spreadsheet...');
    spreadsheetId = createOrGetSpreadsheet();
    summary.spreadsheetUrl = SpreadsheetApp.openById(spreadsheetId).getUrl();
    console.log(`   ✅ Spreadsheet ID: ${spreadsheetId}`);

    // Paso 2: Crear estructura de hojas
    console.log('2. Creando hojas necesarias...');
    for (const sheetName of Object.values(SHEET_NAMES)) {
      createSheet(spreadsheetId, sheetName);
      summary.sheetsCreated.push(sheetName);
    }
    console.log(`   ✅ Hojas creadas/verificadas: ${summary.sheetsCreated.join(', ')}`);

    // Paso 3: Inicializar datos de configuración
    console.log('3. Inicializando datos de configuración...');
    initializeConfigData(spreadsheetId);
    console.log('   ✅ Datos de configuración inicializados.');

    // Paso 4: Crear usuarios iniciales
    console.log('4. Creando usuarios iniciales...');
    initializeUsers(spreadsheetId);
    summary.usersCreated = USUARIOS_INICIALES.map(u => u.username);
    console.log(`   ✅ Usuarios iniciales creados: ${summary.usersCreated.join(', ')}`);

    // Paso 5: Crear estructura completa de Los Encinos
    console.log('5. Creando estructura completa de Los Encinos...');
    const stats = initializeCompleteStructure(spreadsheetId);
    summary.structureStats = stats;
    console.log(`   ✅ Estructura de Los Encinos creada:`);
    console.log(`      - ${stats.totalUnidades} Unidades`);
    console.log(`      - ${stats.totalSOTU} SOTU`);
    console.log(`      - ${stats.totalShafts} Shafts`);
    console.log(`      - ${stats.totalAntenas} Antenas`);
    console.log(`      - ${stats.totalLaterales} Laterales`);
    console.log(`      - Total: ${stats.totalEspacios} espacios`);

    // Paso 6: Crear carpetas en Drive
    console.log('6. Creando carpetas en Drive...');
    mainDriveFolderId = initializeDriveFolders();
    summary.foldersCreated = ['BDPA_MVP_LosEncinos', 'Fotos_Avances', 'Documentos', 'Reportes', 'Backups'];
    console.log(`   ✅ Carpetas en Drive creadas. ID Carpeta Principal: ${mainDriveFolderId}`);

    // Paso 7: Configurar propiedades del script
    console.log('7. Configurando propiedades del script...');
    setScriptProperties(spreadsheetId);
    console.log('   ✅ Propiedades configuradas.');

    // Paso 8: Crear datos de prueba iniciales
    console.log('8. Creando datos de prueba iniciales...');
    createInitialTestData(spreadsheetId);
    console.log('   ✅ Datos de prueba creados.');

    // Paso 9: Crear triggers automáticos (placeholder)
    console.log('9. Creando triggers automáticos (si aplica)...');
    createTriggers(); // Placeholder
    console.log('   ✅ Triggers configurados (si aplica).');

    const endTime = new Date();
    const totalTime = (endTime.getTime() - startTime.getTime()) / 1000; // Segundos

    console.log('✅ Sistema BDPA MVP inicializado correctamente!');
    console.log(`📊 Tiempo total de inicialización: ${totalTime.toFixed(2)} segundos`);

    // Mostrar resumen final
    showInitializationSummary(summary);

  } catch (error) {
    console.error('❌ Error en la inicialización:', error);
    // Considerar un rollback o limpieza si el error es crítico y la inicialización no es idempotente
    // Para este script, la idempotencia maneja la mayoría de los casos.
    throw error;
  }
}

/**
 * INSTRUCCIONES DE USO:
 *
 * 1. Abrir el editor de Apps Script
 * 2. Copiar este código en un nuevo archivo InitializeSystem.gs
 * 3. Guardar el proyecto
 * 4. Ejecutar la función: initializeCompleteSystem()
 * 5. Autorizar los permisos cuando se solicite
 * 6. Esperar a que termine (aproximadamente 2-3 minutos)
 * 7. Verificar el resultado con: verifyInstallation()
 *
 * IMPORTANTE:
 * - Ejecutar solo UNA VEZ (la primera vez creará todo, las siguientes actualizará)
 * - Tener una cuenta de Google con permisos para crear archivos
 * - El script creará aproximadamente 300+ registros
 */

// --- FUNCIONES AUXILIARES ---

/**
 * Genera un ID único universal (UUID).
 * @returns {string} Un UUID.
 */
function generateUniqueId() {
  return Utilities.getUuid();
}

/**
 * Formatea una fecha a un string específico.
 * @param {Date} date La fecha a formatear.
 * @returns {string} La fecha formateada.
 */
function formatDate(date) {
  // Usar la zona horaria del script para consistencia
  return Utilities.formatDate(date, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');
}

/**
 * Escribe datos en una hoja en lotes para evitar límites de API.
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet La hoja donde escribir.
 * @param {Array<Array<any>>} data Los datos a escribir.
 * @param {number} batchSize El tamaño de cada lote.
 */
function batchCreateData(sheet, data, batchSize = 500) {
  if (data.length === 0) return;

  // Obtener la última fila con contenido para empezar a escribir
  const startRow = sheet.getLastRow() + 1;

  for (let i = 0; i < data.length; i += batchSize) {
    const batch = data.slice(i, i + batchSize);
    // Asegurarse de que el rango tenga el número correcto de columnas
    const numColumns = batch[0].length;
    const range = sheet.getRange(startRow + i, 1, batch.length, numColumns);
    range.setValues(batch);
    SpreadsheetApp.flush(); // Forzar la escritura
    Utilities.sleep(100); // Pequeña pausa para evitar sobrecargar la API
  }
}

/**
 * Crea una hoja de cálculo de Google o recupera su ID si ya existe.
 * @returns {string} El ID de la hoja de cálculo.
 */
function createOrGetSpreadsheet() {
  const spreadsheetName = 'BDPA MVP - Los Encinos';
  const scriptProperties = PropertiesService.getScriptProperties();
  let spreadsheetId = scriptProperties.getProperty('BDPA_MVP_SPREADSHEET_ID');

  if (spreadsheetId) {
    try {
      // Verificar si el spreadsheet aún existe y es accesible
      SpreadsheetApp.openById(spreadsheetId);
      console.log(`   Spreadsheet existente encontrado: ${spreadsheetName}`);
      return spreadsheetId;
    } catch (e) {
      console.warn(`   Spreadsheet con ID ${spreadsheetId} no encontrado o inaccesible. Creando uno nuevo.`);
      spreadsheetId = null; // Forzar la creación de uno nuevo
    }
  }

  if (!spreadsheetId) {
    const newSpreadsheet = SpreadsheetApp.create(spreadsheetName);
    spreadsheetId = newSpreadsheet.getId();
    scriptProperties.setProperty('BDPA_MVP_SPREADSHEET_ID', spreadsheetId);
    console.log(`   Nuevo Spreadsheet creado: ${newSpreadsheet.getUrl()}`);
  }
  return spreadsheetId;
}

/**
 * Crea una hoja específica dentro del Spreadsheet si no existe y establece sus encabezados.
 * @param {string} spreadsheetId El ID del Spreadsheet.
 * @param {string} sheetName El nombre de la hoja a crear.
 */
function createSheet(spreadsheetId, sheetName) {
  const ss = SpreadsheetApp.openById(spreadsheetId);
  let sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    console.log(`   Hoja '${sheetName}' creada.`);
  } else {
    // Limpiar contenido existente excepto la primera fila (encabezados)
    if (sheet.getLastRow() > 1) {
      sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).clearContent();
      console.log(`   Hoja '${sheetName}' limpiada.`);
    }
  }

  // Establecer encabezados si la hoja está vacía o no tiene encabezados
  const headerRange = sheet.getRange(1, 1, 1, HEADERS[sheetName].length);
  if (headerRange.getDisplayValues()[0].join('') !== HEADERS[sheetName].join('')) {
    headerRange.setValues([HEADERS[sheetName]]);
    console.log(`   Encabezados para '${sheetName}' establecidos.`);
  }
}

/**
 * Inicializa los datos de configuración en la hoja 'Config'.
 * @param {string} spreadsheetId El ID del Spreadsheet.
 */
function initializeConfigData(spreadsheetId) {
  const ss = SpreadsheetApp.openById(spreadsheetId);
  const sheet = ss.getSheetByName(SHEET_NAMES.CONFIG);

  // Limpiar datos existentes (excepto encabezados)
  if (sheet.getLastRow() > 1) {
    sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).clearContent();
  }

  const configData = [
    ['NombreObra', OBRA_CONFIG_INIT.nombre],
    ['DireccionObra', OBRA_CONFIG_INIT.direccion],
    ['EstadoObra', OBRA_CONFIG_INIT.estado],
    ['FechaInicio', formatDate(OBRA_CONFIG_INIT.fechaInicio)]
  ];
  sheet.getRange(2, 1, configData.length, configData[0].length).setValues(configData);
}

/**
 * Inicializa los usuarios en la hoja 'Usuarios'.
 * @param {string} spreadsheetId El ID del Spreadsheet.
 */
function initializeUsers(spreadsheetId) {
  const ss = SpreadsheetApp.openById(spreadsheetId);
  const sheet = ss.getSheetByName(SHEET_NAMES.USUARIOS);

  // Limpiar datos existentes (excepto encabezados)
  if (sheet.getLastRow() > 1) {
    sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).clearContent();
  }

  const userData = USUARIOS_INICIALES.map(user => [
    user.id,
    user.username,
    user.password,
    user.nombre,
    user.rol,
    user.activo,
    '' // UltimoAcceso
  ]);
  sheet.getRange(2, 1, userData.length, userData[0].length).setValues(userData);
}

/**
 * Crea la estructura completa de la obra "Los Encinos" en la hoja 'Estructura'.
 * @param {string} spreadsheetId El ID del Spreadsheet.
 * @returns {object} Estadísticas de la estructura creada.
 */
function initializeCompleteStructure(spreadsheetId) {
  const ss = SpreadsheetApp.openById(spreadsheetId);
  const sheet = ss.getSheetByName(SHEET_NAMES.ESTRUCTURA);

  // Limpiar datos existentes (excepto encabezados)
  if (sheet.getLastRow() > 1) {
    sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).clearContent();
  }

  const estructuraCompleta = [];
  let totalUnidades = 0;
  let totalSOTU = 0;
  let totalShafts = 0;
  let totalAntenas = 0;
  let totalLaterales = 0;

  OBRA_CONFIG_INIT.torres.forEach(torre => {
    // Generar Unidades
    if (ESTRUCTURA_UNIDADES_INIT[torre]) {
      OBRA_CONFIG_INIT.pisos.forEach(piso => {
        const sectores = (torre === 'C' || torre === 'H') ? OBRA_CONFIG_INIT.sectores.sinNorte : OBRA_CONFIG_INIT.sectores.normal;
        sectores.forEach(sector => {
          if (ESTRUCTURA_UNIDADES_INIT[torre][piso] && ESTRUCTURA_UNIDADES_INIT[torre][piso][sector]) {
            ESTRUCTURA_UNIDADES_INIT[torre][piso][sector].forEach(identificador => {
              estructuraCompleta.push([torre, piso, sector, 'Unidad', identificador, true]);
              totalUnidades++;
            });
          }
        });
      });
    }

    // Generar SOTU (2 por torre, uno por piso relevante)
    estructuraCompleta.push([torre, OBRA_CONFIG_INIT.pisos[0], '-', 'SOTU', `SOTU-${torre}${OBRA_CONFIG_INIT.pisos[0]}`, true]);
    estructuraCompleta.push([torre, OBRA_CONFIG_INIT.pisos[1], '-', 'SOTU', `SOTU-${torre}${OBRA_CONFIG_INIT.pisos[1]}`, true]);
    totalSOTU += 2;

    // Generar Shafts (1 por torre)
    estructuraCompleta.push([torre, '-', '-', 'Shaft', `SHAFT-${torre}`, true]);
    totalShafts++;

    // Generar Antenas (2 por torre)
    estructuraCompleta.push([torre, '-', '-', 'Antena', `ANT-${torre}1`, true]);
    estructuraCompleta.push([torre, '-', '-', 'Antena', `ANT-${torre}2`, true]);
    totalAntenas += 2;

    // Generar Laterales (ejemplo: 3 por torre, genéricos)
    estructuraCompleta.push([torre, '-', '-', 'Lateral', `LAT-${torre}-1`, true]);
    estructuraCompleta.push([torre, '-', '-', 'Lateral', `LAT-${torre}-2`, true]);
    estructuraCompleta.push([torre, '-', '-', 'Lateral', `LAT-${torre}-3`, true]);
    totalLaterales += 3;
  });

  batchCreateData(sheet, estructuraCompleta);

  return {
    totalUnidades: totalUnidades,
    totalSOTU: totalSOTU,
    totalShafts: totalShafts,
    totalAntenas: totalAntenas,
    totalLaterales: totalLaterales,
    totalEspacios: totalUnidades + totalSOTU + totalShafts + totalAntenas + totalLaterales
  };
}

/**
 * Crea las carpetas necesarias en Google Drive.
 * @returns {string} El ID de la carpeta principal creada.
 */
function initializeDriveFolders() {
  const mainFolderName = 'BDPA_MVP_LosEncinos';
  const subFoldersToCreate = ['Fotos_Avances', 'Documentos', 'Reportes', 'Backups'];

  let mainFolder = null;
  const folders = DriveApp.getFoldersByName(mainFolderName);
  if (folders.hasNext()) {
    mainFolder = folders.next();
    console.log(`   Carpeta principal '${mainFolderName}' ya existe.`);
  } else {
    mainFolder = DriveApp.createFolder(mainFolderName);
    console.log(`   Carpeta principal '${mainFolderName}' creada.`);
  }

  subFoldersToCreate.forEach(folderName => {
    const subFolders = mainFolder.getFoldersByName(folderName);
    if (!subFolders.hasNext()) {
      mainFolder.createFolder(folderName);
      console.log(`   Subcarpeta '${folderName}' creada.`);
    } else {
      console.log(`   Subcarpeta '${folderName}' ya existe.`);
    }
  });
  return mainFolder.getId();
}

/**
 * Configura las propiedades del script para que el Code.gs pueda acceder al Spreadsheet ID.
 * @param {string} spreadsheetId El ID del Spreadsheet.
 */
function setScriptProperties(spreadsheetId) {
  const scriptProperties = PropertiesService.getScriptProperties();
  scriptProperties.setProperty('BDPA_MVP_SPREADSHEET_ID', spreadsheetId);
}

/**
 * Crea datos de prueba iniciales en las hojas 'Avances' y 'Mediciones'.
 * @param {string} spreadsheetId El ID del Spreadsheet.
 */
function createInitialTestData(spreadsheetId) {
  const ss = SpreadsheetApp.openById(spreadsheetId);
  const avancesSheet = ss.getSheetByName(SHEET_NAMES.AVANCES);
  const medicionesSheet = ss.getSheetByName(SHEET_NAMES.MEDICIONES);

  // Limpiar datos existentes (excepto encabezados)
  if (avancesSheet.getLastRow() > 1) {
    avancesSheet.getRange(2, 1, avancesSheet.getLastRow() - 1, avancesSheet.getLastColumn()).clearContent();
  }
  if (medicionesSheet.getLastRow() > 1) {
    medicionesSheet.getRange(2, 1, medicionesSheet.getLastRow() - 1, medicionesSheet.getLastColumn()).clearContent();
  }

  const now = new Date();
  const avancesIniciales = [
    [generateUniqueId(), formatDate(now), 'A', 1, 'Unidad', 'A101', 'Cableado alámbrico T1', 100, 'NO', 'Avance completado', 'admin', now],
    [generateUniqueId(), formatDate(now), 'B', 1, 'SOTU', 'SOTU-B1', 'Instalación de dispositivos', 75, 'NO', 'Dispositivos principales instalados', 'supervisor', now],
    [generateUniqueId(), formatDate(now), 'C', '-', 'Shaft', 'SHAFT-C', 'Tendido de troncales', 50, 'NO', '50% de troncales tendidas', 'tecnico1', now],
    [generateUniqueId(), formatDate(now), 'D', 3, 'Unidad', 'D305', 'Instalación PAU', 25, 'NO', 'PAU iniciado', 'tecnico1', now]
  ];
  batchCreateData(avancesSheet, avancesIniciales);

  const medicionesIniciales = [
    [generateUniqueId(), formatDate(now), 'A', 1, 'coaxial', JSON.stringify({ principal: 60.5, secundario: null }), 'OK', 'admin', 'Medición inicial de coaxial', now],
    [generateUniqueId(), formatDate(now), 'B', 1, 'fibra', JSON.stringify({ principal: -20.1, secundario: -21.0 }), 'ADVERTENCIA', 'supervisor', 'Potencia RX un poco baja', now]
  ];
  batchCreateData(medicionesSheet, medicionesIniciales);
}

/**
 * Crea triggers automáticos (placeholder).
 * Para este MVP, no se requieren triggers complejos.
 */
function createTriggers() {
  // Ejemplo de trigger: ejecutar una función diariamente
  // ScriptApp.newTrigger('myDailyFunction')
  //   .timeBased()
  //   .everyDays(1)
  //   .atHour(3) // Ejecutar a las 3 AM
  //   .create();
  console.log('   No se crearon triggers automáticos específicos para este MVP.');
}

/**
 * Muestra un resumen de la inicialización en la consola.
 * @param {object} summary Objeto con el resumen de la inicialización.
 */
function showInitializationSummary(summary) {
  console.log('\n--- RESUMEN DE INICIALIZACIÓN ---');
  console.log(`🔗 URL del Spreadsheet: ${summary.spreadsheetUrl}`);
  console.log(`✅ Hojas creadas: ${summary.sheetsCreated.join(', ')}`);
  console.log(`✅ Usuarios iniciales: ${summary.usersCreated.join(', ')}`);
  console.log(`✅ Estructura de Los Encinos:`);
  console.log(`   - Unidades: ${summary.structureStats.totalUnidades}`);
  console.log(`   - SOTU: ${summary.structureStats.totalSOTU}`);
  console.log(`   - Shafts: ${summary.structureStats.totalShafts}`);
  console.log(`   - Antenas: ${summary.structureStats.totalAntenas}`);
  console.log(`   - Laterales: ${summary.structureStats.totalLaterales}`);
  console.log(`   - Total Espacios: ${summary.structureStats.totalEspacios}`);
  console.log(`✅ Carpetas en Drive: ${summary.foldersCreated.join(', ')}`);
  console.log('\n¡El sistema BDPA MVP está listo para usar!');
  console.log('Recuerda actualizar el SPREADSHEET_ID en Code.gs con el ID de tu nuevo Spreadsheet.');
}

/**
 * Función para verificar la instalación.
 * Se puede ejecutar después de initializeCompleteSystem() para confirmar.
 */
function verifyInstallation() {
  console.log('🔍 Verificando instalación...');
  const scriptProperties = PropertiesService.getScriptProperties();
  const spreadsheetId = scriptProperties.getProperty('BDPA_MVP_SPREADSHEET_ID');

  if (!spreadsheetId) {
    console.error('❌ Error: No se encontró el ID del Spreadsheet en las propiedades del script.');
    return false;
  }

  try {
    const ss = SpreadsheetApp.openById(spreadsheetId);
    console.log(`   ✅ Spreadsheet encontrado: ${ss.getUrl()}`);

    let allSheetsExist = true;
    for (const sheetName of Object.values(SHEET_NAMES)) {
      const sheet = ss.getSheetByName(sheetName);
      if (!sheet) {
        console.error(`   ❌ Hoja '${sheetName}' no encontrada.`);
        allSheetsExist = false;
      } else {
        console.log(`   ✅ Hoja '${sheetName}' encontrada.`);
        if (sheet.getLastRow() < 2) { // Asumiendo que al menos hay encabezados y 1 fila de datos
          console.warn(`      ⚠️ Hoja '${sheetName}' parece vacía o con pocos datos.`);
        }
      }
    }

    const mainFolderName = 'BDPA_MVP_LosEncinos';
    const folders = DriveApp.getFoldersByName(mainFolderName);
    if (folders.hasNext()) {
      console.log(`   ✅ Carpeta principal de Drive '${mainFolderName}' encontrada.`);
    } else {
      console.error(`   ❌ Carpeta principal de Drive '${mainFolderName}' no encontrada.`);
    }

    if (allSheetsExist) {
      console.log('✅ Verificación completada: La instalación parece correcta.');
      return true;
    } else {
      console.error('❌ Verificación completada: Se encontraron problemas en la instalación.');
      return false;
    }

  } catch (error) {
    console.error('❌ Error durante la verificación:', error);
    return false;
  }
}
```