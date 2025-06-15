// ============================================================================
// BDPA - js/configuracion.js - Configuración
// ============================================================================

/**
 * Módulo de configuración
 */

let configuracionData = {};

/**
 * Inicializar configuración
 */
async function inicializarConfiguracion() {
    try {
        console.log('[CONFIGURACION] Inicializando configuración...');
        
        const response = await callAPI('obtenerConfiguracion');
        
        if (response.success) {
            configuracionData = response.datos || {};
            mostrarExito('Configuración cargada correctamente');
        } else {
            mostrarError('Error al cargar configuración: ' + response.message);
        }
        
    } catch (error) {
        console.error('[CONFIGURACION] Error cargando configuración:', error);
        mostrarError('Error al cargar configuración');
    }
}

console.log('[CONFIGURACION] Módulo de configuración cargado');