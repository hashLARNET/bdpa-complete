// ============================================================================
// BDPA - js/obras.js - Gestión de Obras
// ============================================================================

/**
 * Módulo de gestión de obras
 */

let obrasData = [];
let obraEditando = null;

/**
 * Cargar obras
 */
async function cargarObras() {
    try {
        console.log('[OBRAS] Cargando obras...');
        
        const response = await callAPI('obtenerObras');
        
        if (response.success) {
            obrasData = response.datos || [];
            mostrarExito('Obras cargadas correctamente');
        } else {
            mostrarError('Error al cargar obras: ' + response.message);
        }
        
    } catch (error) {
        console.error('[OBRAS] Error cargando obras:', error);
        mostrarError('Error al cargar obras');
    }
}

console.log('[OBRAS] Módulo de obras cargado');