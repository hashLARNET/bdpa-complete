// ============================================================================
// BDPA - js/avances.js - Registro de Avances
// ============================================================================

/**
 * Módulo de registro de avances
 */

let avancesData = [];

/**
 * Cargar avances
 */
async function cargarAvances() {
    try {
        console.log('[AVANCES] Cargando avances...');
        
        const response = await callAPI('obtenerAvances');
        
        if (response.success) {
            avancesData = response.datos || [];
            mostrarExito('Avances cargados correctamente');
        } else {
            mostrarError('Error al cargar avances: ' + response.message);
        }
        
    } catch (error) {
        console.error('[AVANCES] Error cargando avances:', error);
        mostrarError('Error al cargar avances');
    }
}

console.log('[AVANCES] Módulo de avances cargado');