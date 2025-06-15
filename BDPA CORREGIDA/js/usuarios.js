// ============================================================================
// BDPA - js/usuarios.js - Gestión de Usuarios
// ============================================================================

/**
 * Módulo de gestión de usuarios
 */

let usuariosData = [];

/**
 * Cargar usuarios
 */
async function cargarUsuarios() {
    try {
        console.log('[USUARIOS] Cargando usuarios...');
        
        const response = await callAPI('obtenerUsuarios');
        
        if (response.success) {
            usuariosData = response.datos || [];
            mostrarExito('Usuarios cargados correctamente');
        } else {
            mostrarError('Error al cargar usuarios: ' + response.message);
        }
        
    } catch (error) {
        console.error('[USUARIOS] Error cargando usuarios:', error);
        mostrarError('Error al cargar usuarios');
    }
}

console.log('[USUARIOS] Módulo de usuarios cargado');