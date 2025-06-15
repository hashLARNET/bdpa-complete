// ============================================================================
// BDPA - js/reportes.js - Reportes
// ============================================================================

/**
 * Módulo de reportes
 */

let reportesData = [];

/**
 * Cargar reportes
 */
async function cargarReportes() {
    try {
        console.log('[REPORTES] Cargando reportes...');
        
        const response = await callAPI('obtenerReportes');
        
        if (response.success) {
            reportesData = response.datos || [];
            mostrarExito('Reportes cargados correctamente');
        } else {
            mostrarError('Error al cargar reportes: ' + response.message);
        }
        
    } catch (error) {
        console.error('[REPORTES] Error cargando reportes:', error);
        mostrarError('Error al cargar reportes');
    }
}

console.log('[REPORTES] Módulo de reportes cargado');