// ============================================================================
// BDPA - js/mediciones.js - Mediciones
// ============================================================================

/**
 * Módulo de mediciones
 */

let medicionesData = [];

/**
 * Cargar mediciones
 */
async function cargarMediciones() {
    try {
        console.log('[MEDICIONES] Cargando mediciones...');
        
        const response = await callAPI('obtenerMediciones');
        
        if (response.success) {
            medicionesData = response.datos || [];
            mostrarExito('Mediciones cargadas correctamente');
        } else {
            mostrarError('Error al cargar mediciones: ' + response.message);
        }
        
    } catch (error) {
        console.error('[MEDICIONES] Error cargando mediciones:', error);
        mostrarError('Error al cargar mediciones');
    }
}

console.log('[MEDICIONES] Módulo de mediciones cargado');