// ============================================================================
// BDPA - js/transferencias.js - Transferencias
// ============================================================================

/**
 * Módulo de transferencias
 */

let transferenciasData = [];

/**
 * Cargar transferencias
 */
async function cargarTransferencias() {
    try {
        console.log('[TRANSFERENCIAS] Cargando transferencias...');
        
        const response = await callAPI('obtenerTransferencias');
        
        if (response.success) {
            transferenciasData = response.datos || [];
            mostrarExito('Transferencias cargadas correctamente');
        } else {
            mostrarError('Error al cargar transferencias: ' + response.message);
        }
        
    } catch (error) {
        console.error('[TRANSFERENCIAS] Error cargando transferencias:', error);
        mostrarError('Error al cargar transferencias');
    }
}

console.log('[TRANSFERENCIAS] Módulo de transferencias cargado');