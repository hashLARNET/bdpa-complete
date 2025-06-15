// ============================================================================
// BDPA - js/api.js - Sistema de Comunicación con API
// ============================================================================

/**
 * Sistema de comunicación con la API de Google Apps Script
 */

// Configuración de la API
const API_CONFIG = {
    baseUrl: 'https://script.google.com/macros/s/AKfycbznW8BbpJFn7jIkDfrKp97VIdxcvNlf-ofv1SPk8p8w4f_1iwRNJSlcJO0TWbmHLP2K/exec',
    timeout: 30000,
    retryAttempts: 3,
    retryDelay: 1000
};

// Estado de la conexión
let connectionState = {
    isOnline: true,
    lastPing: null,
    retryCount: 0
};

// Cache para respuestas
const apiCache = new Map();
const cacheExpiration = 5 * 60 * 1000; // 5 minutos

/**
 * Función principal para llamadas a la API
 * @param {string} accion - Acción a ejecutar
 * @param {object} datos - Datos a enviar
 * @param {object} opciones - Opciones adicionales
 * @returns {Promise} Respuesta de la API
 */
async function callAPI(accion, datos = {}, opciones = {}) {
    const requestId = generateRequestId();
    const startTime = Date.now();
    
    try {
        console.log(`[API] ${requestId} - Iniciando petición: ${accion}`, datos);
        
        // Verificar cache si está habilitado
        if (opciones.useCache !== false) {
            const cachedResponse = getCachedResponse(accion, datos);
            if (cachedResponse) {
                console.log(`[API] ${requestId} - Respuesta desde cache`);
                return cachedResponse;
            }
        }
        
        // Preparar datos de la petición
        const requestData = {
            action: accion,
            data: datos,
            timestamp: Date.now(),
            sessionToken: window.tokenSesion,
            requestId: requestId
        };
        
        // Realizar petición con reintentos
        const response = await makeRequestWithRetry(requestData, opciones);
        
        // Procesar respuesta
        const processedResponse = processAPIResponse(response, accion);
        
        // Guardar en cache si es apropiado
        if (shouldCacheResponse(accion, processedResponse)) {
            setCachedResponse(accion, datos, processedResponse);
        }
        
        const duration = Date.now() - startTime;
        console.log(`[API] ${requestId} - Completada en ${duration}ms`);
        
        return processedResponse;
        
    } catch (error) {
        const duration = Date.now() - startTime;
        console.error(`[API] ${requestId} - Error después de ${duration}ms:`, error);
        return handleAPIError(error, accion, datos, opciones);
    }
}

/**
 * Realizar petición con reintentos
 */
async function makeRequestWithRetry(requestData, opciones = {}) {
    let lastError = null;
    const maxRetries = opciones.maxRetries || API_CONFIG.retryAttempts;
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            if (attempt > 0) {
                console.log(`[API] Reintento ${attempt}/${maxRetries}`);
                await delay(API_CONFIG.retryDelay * attempt);
            }
            
            const response = await makeHTTPRequest(requestData, opciones);
            
            // Reset contador en caso de éxito
            connectionState.retryCount = 0;
            connectionState.isOnline = true;
            connectionState.lastPing = Date.now();
            
            return response;
            
        } catch (error) {
            lastError = error;
            
            if (isNonRetryableError(error)) {
                throw error;
            }
            
            if (attempt === maxRetries) {
                connectionState.isOnline = false;
                connectionState.retryCount++;
            }
        }
    }
    
    throw lastError;
}

/**
 * Realizar petición HTTP real
 */
async function makeHTTPRequest(requestData, opciones = {}) {
    const timeout = opciones.timeout || API_CONFIG.timeout;
    
    // Simular respuesta para desarrollo
    if (window.location.hostname === 'localhost' || requestData.action === 'test') {
        return await simulateAPIResponse(requestData);
    }
    
    // Para Google Apps Script
    if (typeof google !== 'undefined' && google.script && google.script.run) {
        return await new Promise((resolve, reject) => {
            const timeoutId = setTimeout(() => {
                reject(new Error('Request timeout'));
            }, timeout);
            
            google.script.run
                .withSuccessHandler(response => {
                    clearTimeout(timeoutId);
                    resolve(response);
                })
                .withFailureHandler(error => {
                    clearTimeout(timeoutId);
                    reject(new Error(error.message || 'Google Script error'));
                })
                .procesarAPI(requestData.action, requestData.data, requestData.sessionToken);
        });
    }
    
    // Fallback para peticiones HTTP normales
    const response = await fetch(API_CONFIG.baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
        signal: AbortSignal.timeout(timeout)
    });
    
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
}

/**
 * Simular respuesta de API para desarrollo
 */
async function simulateAPIResponse(requestData) {
    await delay(500 + Math.random() * 1000); // Simular latencia
    
    const { action, data } = requestData;
    
    // Respuestas simuladas por acción
    const responses = {
        'obtenerObras': {
            success: true,
            datos: [
                { id: '1', nombre: 'Edificio Los Pinos', estado: 'En progreso', avance: 75 },
                { id: '2', nombre: 'Condominio Vista Mar', estado: 'En progreso', avance: 45 },
                { id: '3', nombre: 'Torre Central', estado: 'Completada', avance: 100 }
            ]
        },
        'obtenerAvances': {
            success: true,
            datos: [
                { id: '1', descripcion: 'Instalación de cableado', fecha: new Date().toISOString(), progreso: 80 },
                { id: '2', descripcion: 'Configuración de equipos', fecha: new Date().toISOString(), progreso: 60 }
            ]
        },
        'obtenerMateriales': {
            success: true,
            datos: [
                { id: '1', nombre: 'Cable UTP Cat 6', stock: 1500, unidad: 'metros' },
                { id: '2', nombre: 'Conectores RJ45', stock: 200, unidad: 'unidades' },
                { id: '3', nombre: 'Switch 24 puertos', stock: 5, unidad: 'unidades' }
            ]
        },
        'obtenerUsuarios': {
            success: true,
            datos: [
                { id: '1', nombre: 'Juan Pérez', rol: 'Supervisor', activo: true },
                { id: '2', nombre: 'María González', rol: 'Técnico', activo: true }
            ]
        }
    };
    
    return responses[action] || {
        success: true,
        datos: [],
        message: `Respuesta simulada para ${action}`
    };
}

/**
 * Procesar respuesta de la API
 */
function processAPIResponse(response, accion) {
    if (typeof response !== 'object' || response === null) {
        throw new Error('Respuesta inválida del servidor');
    }
    
    if (response.error) {
        const error = new Error(response.message || 'Error del servidor');
        error.code = response.code || 'SERVER_ERROR';
        error.details = response.details || {};
        throw error;
    }
    
    if (response.sessionExpired) {
        handleSessionExpired();
        throw new Error('Sesión expirada');
    }
    
    if (response.newToken) {
        window.tokenSesion = response.newToken;
        localStorage.setItem('bdpa_session_token', window.tokenSesion);
    }
    
    return response;
}

/**
 * Manejar errores de API
 */
function handleAPIError(error, accion, datos, opciones) {
    console.error(`[API] Error en ${accion}:`, error);
    
    if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        connectionState.isOnline = false;
        return {
            success: false,
            error: true,
            message: 'Sin conexión a internet',
            code: 'NETWORK_ERROR'
        };
    }
    
    if (error.name === 'AbortError' || error.message.includes('timeout')) {
        return {
            success: false,
            error: true,
            message: 'La petición ha tardado demasiado. Intente nuevamente.',
            code: 'TIMEOUT'
        };
    }
    
    if (error.message.includes('Sesión expirada')) {
        return {
            success: false,
            error: true,
            message: 'Su sesión ha expirado. Por favor, inicie sesión nuevamente.',
            code: 'SESSION_EXPIRED'
        };
    }
    
    return {
        success: false,
        error: true,
        message: error.message || 'Error desconocido',
        code: error.code || 'UNKNOWN_ERROR',
        details: error.details || {}
    };
}

/**
 * Manejar sesión expirada
 */
function handleSessionExpired() {
    console.log('[API] Sesión expirada - Redirigiendo al login');
    
    window.usuarioActual = null;
    window.tokenSesion = null;
    localStorage.removeItem('bdpa_session_token');
    localStorage.removeItem('bdpa_user_data');
    
    mostrarSeccion('login');
    mostrarAdvertencia('Su sesión ha expirado. Por favor, inicie sesión nuevamente.');
}

/**
 * Gestión de cache
 */
function getCachedResponse(accion, datos) {
    const cacheKey = generateCacheKey(accion, datos);
    const cached = apiCache.get(cacheKey);
    
    if (!cached) return null;
    
    const isExpired = Date.now() - cached.timestamp > cacheExpiration;
    
    if (isExpired) {
        apiCache.delete(cacheKey);
        return null;
    }
    
    return {
        ...cached.data,
        fromCache: true
    };
}

function setCachedResponse(accion, datos, response) {
    const cacheKey = generateCacheKey(accion, datos);
    apiCache.set(cacheKey, {
        data: response,
        timestamp: Date.now()
    });
    
    if (apiCache.size > 100) {
        cleanupCache();
    }
}

function shouldCacheResponse(accion, response) {
    if (response.error) return false;
    
    const cacheableActions = [
        'obtenerObras',
        'obtenerMateriales',
        'obtenerCategorias',
        'obtenerUsuarios',
        'obtenerTiposAvance'
    ];
    
    return cacheableActions.includes(accion);
}

function cleanupCache() {
    const now = Date.now();
    for (const [key, value] of apiCache.entries()) {
        if (now - value.timestamp > cacheExpiration) {
            apiCache.delete(key);
        }
    }
}

/**
 * Utilidades
 */
function generateRequestId() {
    return 'req_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function generateCacheKey(accion, datos) {
    return accion + '_' + JSON.stringify(datos);
}

function isNonRetryableError(error) {
    const nonRetryableCodes = ['INVALID_CREDENTIALS', 'PERMISSION_DENIED', 'VALIDATION_ERROR'];
    return nonRetryableCodes.includes(error.code);
}

/**
 * Limpiar todo el cache
 */
function clearAllCache() {
    apiCache.clear();
    console.log('[API] Cache completamente limpiado');
}

console.log('[API] Sistema de API cargado');