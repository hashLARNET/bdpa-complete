// ============================================================================
// BDPA - js/planificacion.js - Planificación y Metas
// ============================================================================

/**
 * Módulo de planificación y metas
 */

let metasData = [];

/**
 * Cargar metas
 */
async function cargarMetas() {
    try {
        console.log('[PLANIFICACION] Cargando metas...');
        
        const response = await callAPI('obtenerMetas');
        
        if (response.success) {
            metasData = response.datos || [];
            mostrarExito('Metas cargadas correctamente');
        } else {
            mostrarError('Error al cargar metas: ' + response.message);
        }
        
    } catch (error) {
        console.error('[PLANIFICACION] Error cargando metas:', error);
        mostrarError('Error al cargar metas');
    }
}

console.log('[PLANIFICACION] Módulo de planificación cargado');