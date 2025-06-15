// ============================================================================
// BDPA - js/inventario.js - Gestión de Inventario
// ============================================================================

/**
 * Módulo de gestión de inventario
 */

let materialesData = [];

/**
 * Cargar materiales
 */
async function cargarMateriales() {
    try {
        console.log('[INVENTARIO] Cargando materiales...');
        
        const response = await callAPI('obtenerMateriales');
        
        if (response.success) {
            materialesData = response.datos || [];
            mostrarExito('Materiales cargados correctamente');
        } else {
            mostrarError('Error al cargar materiales: ' + response.message);
        }
        
    } catch (error) {
        console.error('[INVENTARIO] Error cargando materiales:', error);
        mostrarError('Error al cargar materiales');
    }
}

console.log('[INVENTARIO] Módulo de inventario cargado');