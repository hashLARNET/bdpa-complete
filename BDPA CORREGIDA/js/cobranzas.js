// ============================================================================
// BDPA - js/cobranzas.js - Registro de Progreso
// ============================================================================

/**
 * Módulo de registro de progreso para cobranzas
 */

let progresoData = [];

/**
 * Cargar progreso
 */
async function cargarProgreso() {
    try {
        console.log('[PROGRESO] Cargando progreso...');
        
        const response = await callAPI('obtenerProgreso');
        
        if (response.success) {
            progresoData = response.datos || [];
            mostrarExito('Progreso cargado correctamente');
        } else {
            mostrarError('Error al cargar progreso: ' + response.message);
        }
        
    } catch (error) {
        console.error('[PROGRESO] Error cargando progreso:', error);
        mostrarError('Error al cargar progreso');
    }
}

console.log('[PROGRESO] Módulo de progreso cargado');