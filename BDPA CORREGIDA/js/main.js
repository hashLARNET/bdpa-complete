// ============================================================================
// BDPA - js/main.js - Script Principal
// ============================================================================

/**
 * Script principal que inicializa todo el sistema BDPA
 */

// Estado global del sistema
window.sistemaEstado = {
    inicializado: false,
    version: '2.0',
    entorno: 'desarrollo'
};

/**
 * Inicializar sistema completo
 */
async function initializeBDPA() {
    try {
        console.log('[BDPA] Inicializando sistema BDPA v2.0...');
        
        // Verificar que las dependencias estén cargadas
        if (!verificarDependencias()) {
            throw new Error('Faltan dependencias críticas del sistema');
        }
        
        // Inicializar sistemas core
        await initializeCoreModules();
        
        // Configurar event listeners globales
        setupGlobalEventListeners();
        
        // Marcar como inicializado
        window.sistemaEstado.inicializado = true;
        
        console.log('[BDPA] Sistema inicializado correctamente');
        
        // Mostrar notificación de bienvenida si no hay usuario autenticado
        if (!window.usuarioActual) {
            setTimeout(() => {
                mostrarInfo('Sistema BDPA v2.0 inicializado. Por favor, inicie sesión.', 3000);
            }, 1000);
        }
        
    } catch (error) {
        console.error('[BDPA] Error crítico en inicialización:', error);
        mostrarError('Error crítico al inicializar el sistema');
    }
}

/**
 * Verificar que las dependencias estén cargadas
 */
function verificarDependencias() {
    const dependenciasRequeridas = [
        'mostrarNotificacion',
        'mostrarSeccion',
        'formatearFecha',
        'generarId',
        'callAPI'
    ];
    
    const dependenciasFaltantes = dependenciasRequeridas.filter(dep => 
        typeof window[dep] !== 'function'
    );
    
    if (dependenciasFaltantes.length > 0) {
        console.error('[BDPA] Dependencias faltantes:', dependenciasFaltantes);
        return false;
    }
    
    return true;
}

/**
 * Inicializar módulos core
 */
async function initializeCoreModules() {
    console.log('[BDPA] Inicializando módulos core...');
    
    // Los módulos core ya se inicializan automáticamente
    // Aquí podemos agregar inicializaciones adicionales si es necesario
    
    // Verificar integridad del sistema
    setTimeout(verificarIntegridadSistema, 2000);
}

/**
 * Configurar event listeners globales
 */
function setupGlobalEventListeners() {
    // Manejar errores globales
    window.addEventListener('error', (event) => {
        console.error('[BDPA] Error global:', event.error);
        if (window.sistemaEstado.inicializado) {
            mostrarError('Se ha producido un error inesperado');
        }
    });
    
    // Manejar promesas rechazadas
    window.addEventListener('unhandledrejection', (event) => {
        console.error('[BDPA] Promise rejection:', event.reason);
        if (window.sistemaEstado.inicializado) {
            mostrarError('Error en operación asíncrona');
        }
    });
    
    // Manejar cambios de conectividad
    window.addEventListener('online', () => {
        mostrarExito('Conexión restaurada');
    });
    
    window.addEventListener('offline', () => {
        mostrarAdvertencia('Sin conexión a internet');
    });
    
    // Prevenir cierre accidental
    window.addEventListener('beforeunload', (event) => {
        if (window.usuarioActual) {
            event.preventDefault();
            event.returnValue = '¿Está seguro de que desea salir?';
        }
    });
}

/**
 * Verificar integridad del sistema
 */
function verificarIntegridadSistema() {
    const errores = [];
    
    // Verificar elementos críticos del DOM
    const elementosCriticos = [
        'login-container',
        'main-menu-container',
        'dashboard'
    ];
    
    elementosCriticos.forEach(id => {
        if (!document.getElementById(id)) {
            errores.push(`Elemento requerido no encontrado: ${id}`);
        }
    });
    
    // Verificar funciones críticas
    const funcionesCriticas = [
        'mostrarSeccion',
        'cerrarSesion',
        'mostrarNotificacion',
        'callAPI'
    ];
    
    funcionesCriticas.forEach(fn => {
        if (typeof window[fn] !== 'function') {
            errores.push(`Función crítica no encontrada: ${fn}`);
        }
    });
    
    if (errores.length > 0) {
        console.error('[BDPA] Errores de integridad del sistema:', errores.join(','));
    } else {
        console.log('[BDPA] Verificación de integridad exitosa');
    }
}

/**
 * Funciones de utilidad global
 */

// Función para recargar el sistema
function recargarSistema() {
    if (confirm('¿Está seguro de que desea recargar el sistema?')) {
        window.location.reload();
    }
}

// Función para obtener información del sistema
function obtenerInfoSistema() {
    return {
        version: window.sistemaEstado.version,
        inicializado: window.sistemaEstado.inicializado,
        usuario: window.usuarioActual,
        navegador: obtenerInfoNavegador(),
        timestamp: new Date().toISOString()
    };
}

// Función para exportar logs del sistema
function exportarLogs() {
    const logs = {
        sistema: obtenerInfoSistema(),
        errores: [], // Aquí se podrían agregar logs de errores
        timestamp: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(logs, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `bdpa_logs_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
}

// Hacer funciones disponibles globalmente
window.recargarSistema = recargarSistema;
window.obtenerInfoSistema = obtenerInfoSistema;
window.exportarLogs = exportarLogs;

// Auto-inicialización
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeBDPA);
} else {
    initializeBDPA();
}

console.log('[BDPA] Script principal cargado');