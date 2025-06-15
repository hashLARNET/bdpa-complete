// ============================================================================
// BDPA - js/documentacion.js - Documentación
// ============================================================================

/**
 * Módulo de documentación
 */

let documentosData = [];

/**
 * Cargar documentos
 */
async function cargarDocumentos() {
    try {
        console.log('[DOCUMENTACION] Cargando documentos...');
        
        const response = await callAPI('obtenerDocumentos');
        
        if (response.success) {
            documentosData = response.datos || [];
            mostrarExito('Documentos cargados correctamente');
        } else {
            mostrarError('Error al cargar documentos: ' + response.message);
        }
        
    } catch (error) {
        console.error('[DOCUMENTACION] Error cargando documentos:', error);
        mostrarError('Error al cargar documentos');
    }
}

console.log('[DOCUMENTACION] Módulo de documentación cargado');