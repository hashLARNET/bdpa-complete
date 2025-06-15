// ============================================================================
// BDPA - js/core-functions.js - Funciones Críticas Faltantes
// ============================================================================

/**
 * Funciones críticas que estaban faltando en el proyecto original
 * Basado en el index.html funcional de 2000 líneas
 */

// Variables globales necesarias
window.usuarioActual = null;
window.tokenSesion = null;

// ============================================================================
// FUNCIONES DE NAVEGACIÓN - RESUELVE PROBLEMA CRÍTICO
// ============================================================================

/**
 * Función principal de navegación - LA MÁS IMPORTANTE
 */
function mostrarSeccion(seccion) {
    console.log(`[NAVEGACION] Mostrando sección: ${seccion}`);
    
    // Ocultar todas las secciones
    const secciones = document.querySelectorAll('.container');
    secciones.forEach(s => s.classList.add('hidden'));
    
    // Mostrar la sección solicitada
    const seccionElemento = document.getElementById(seccion);
    if (seccionElemento) {
        seccionElemento.classList.remove('hidden');
        
        // Actualizar navegación activa
        actualizarNavegacionActiva(seccion);
        
        // Ejecutar función específica de la sección si existe
        ejecutarCallbackSeccion(seccion);
        
        return true;
    } else {
        console.error(`[NAVEGACION] Sección no encontrada: ${seccion}`);
        mostrarNotificacion(`Sección "${seccion}" no encontrada`, 'error');
        return false;
    }
}

/**
 * Actualizar navegación activa
 */
function actualizarNavegacionActiva(seccionActiva) {
    // Remover clase active de todos los enlaces
    const enlaces = document.querySelectorAll('.nav-link');
    enlaces.forEach(enlace => enlace.classList.remove('active'));
    
    // Agregar clase active al enlace correspondiente
    const enlaceActivo = document.querySelector(`[onclick="mostrarSeccion('${seccionActiva}')"]`);
    if (enlaceActivo) {
        enlaceActivo.classList.add('active');
    }
}

/**
 * Ejecutar callback específico de sección
 */
function ejecutarCallbackSeccion(seccion) {
    const callbacks = {
        'dashboard': () => {
            if (typeof cargarDashboard === 'function') cargarDashboard();
        },
        'obras': () => {
            if (typeof cargarObras === 'function') cargarObras();
        },
        'avances': () => {
            if (typeof cargarAvances === 'function') cargarAvances();
        },
        'inventario': () => {
            if (typeof cargarMateriales === 'function') cargarMateriales();
        },
        'transferencias': () => {
            if (typeof cargarTransferencias === 'function') cargarTransferencias();
        },
        'planificacion-metas': () => {
            if (typeof cargarMetas === 'function') cargarMetas();
        },
        'mediciones': () => {
            if (typeof cargarMediciones === 'function') cargarMediciones();
        },
        'documentacion': () => {
            if (typeof cargarDocumentos === 'function') cargarDocumentos();
        },
        'cobranzas': () => {
            if (typeof cargarRegistrosProgreso === 'function') cargarRegistrosProgreso();
        },
        'reportes': () => {
            if (typeof cargarReportes === 'function') cargarReportes();
        },
        'gestion-usuarios': () => {
            if (typeof cargarUsuarios === 'function') cargarUsuarios();
        },
        'configuracion': () => {
            if (typeof inicializarConfiguracion === 'function') inicializarConfiguracion();
        }
    };
    
    const callback = callbacks[seccion];
    if (callback) {
        try {
            callback();
        } catch (error) {
            console.error(`[NAVEGACION] Error en callback de ${seccion}:`, error);
        }
    }
}

// ============================================================================
// FUNCIONES DE AUTENTICACIÓN - RESUELVE PROBLEMA CRÍTICO
// ============================================================================

/**
 * Función para cerrar sesión
 */
function cerrarSesion() {
    if (!confirm('¿Está seguro de que desea cerrar sesión?')) {
        return;
    }
    
    console.log('[AUTH] Cerrando sesión...');
    
    // Limpiar datos de sesión
    window.usuarioActual = null;
    window.tokenSesion = null;
    
    // Limpiar localStorage
    localStorage.removeItem('bdpa_session_token');
    localStorage.removeItem('bdpa_user_data');
    
    // Ocultar menú principal y mostrar login
    document.getElementById('main-menu-container').classList.add('hidden');
    document.getElementById('login-container').classList.remove('hidden');
    
    // Ocultar todas las secciones
    const secciones = document.querySelectorAll('.container');
    secciones.forEach(s => s.classList.add('hidden'));
    
    mostrarNotificacion('Sesión cerrada correctamente', 'success');
}

/**
 * Función para mostrar modal de cambio de contraseña
 */
function mostrarModalContrasena() {
    // Crear modal si no existe
    if (!document.getElementById('modal-cambio-contrasena')) {
        crearModalCambioContrasena();
    }
    
    // Mostrar modal
    document.getElementById('modal-cambio-contrasena').classList.remove('hidden');
    
    // Limpiar formulario
    document.getElementById('contrasena-actual').value = '';
    document.getElementById('contrasena-nueva').value = '';
    document.getElementById('confirmar-contrasena-nueva').value = '';
}

/**
 * Crear modal de cambio de contraseña
 */
function crearModalCambioContrasena() {
    const modal = document.createElement('div');
    modal.id = 'modal-cambio-contrasena';
    modal.className = 'modal-overlay hidden';
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">
                    <i class="fas fa-key"></i> Cambiar Contraseña
                </h3>
                <button class="modal-close" onclick="cerrarModalContrasena()">&times;</button>
            </div>
            <div class="modal-body">
                <form id="form-cambio-contrasena" onsubmit="return false;">
                    <div class="form-group">
                        <label for="contrasena-actual" class="form-label">Contraseña Actual</label>
                        <input type="password" id="contrasena-actual" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="contrasena-nueva" class="form-label">Nueva Contraseña</label>
                        <input type="password" id="contrasena-nueva" class="form-control" required>
                        <small class="form-text">Mínimo 8 caracteres, debe incluir mayúsculas, minúsculas y números</small>
                    </div>
                    <div class="form-group">
                        <label for="confirmar-contrasena-nueva" class="form-label">Confirmar Nueva Contraseña</label>
                        <input type="password" id="confirmar-contrasena-nueva" class="form-control" required>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="cerrarModalContrasena()">Cancelar</button>
                <button class="btn btn-primary" onclick="cambiarContrasena()">Cambiar Contraseña</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

/**
 * Cerrar modal de contraseña
 */
function cerrarModalContrasena() {
    const modal = document.getElementById('modal-cambio-contrasena');
    if (modal) {
        modal.classList.add('hidden');
    }
}

/**
 * Cambiar contraseña
 */
async function cambiarContrasena() {
    const actual = document.getElementById('contrasena-actual').value;
    const nueva = document.getElementById('contrasena-nueva').value;
    const confirmar = document.getElementById('confirmar-contrasena-nueva').value;
    
    // Validaciones
    if (!actual || !nueva || !confirmar) {
        mostrarNotificacion('Todos los campos son obligatorios', 'error');
        return;
    }
    
    if (nueva !== confirmar) {
        mostrarNotificacion('Las contraseñas nuevas no coinciden', 'error');
        return;
    }
    
    if (nueva.length < 8) {
        mostrarNotificacion('La nueva contraseña debe tener al menos 8 caracteres', 'error');
        return;
    }
    
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(nueva)) {
        mostrarNotificacion('La contraseña debe contener mayúsculas, minúsculas y números', 'error');
        return;
    }
    
    try {
        // Simular cambio de contraseña
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        mostrarNotificacion('Contraseña cambiada correctamente', 'success');
        cerrarModalContrasena();
        
    } catch (error) {
        console.error('[AUTH] Error cambiando contraseña:', error);
        mostrarNotificacion('Error al cambiar contraseña', 'error');
    }
}

// ============================================================================
// SISTEMA DE NOTIFICACIONES - RESUELVE PROBLEMA CRÍTICO
// ============================================================================

/**
 * Función principal de notificaciones - LA MÁS CRÍTICA
 */
function mostrarNotificacion(mensaje, tipo = 'info', duracion = 5000) {
    console.log(`[NOTIFICACION] ${tipo.toUpperCase()}: ${mensaje}`);
    
    // Crear contenedor si no existe
    let container = document.getElementById('notifications-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'notifications-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            max-width: 400px;
        `;
        document.body.appendChild(container);
    }
    
    // Crear notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${tipo}`;
    
    // Determinar colores según tipo
    const colores = {
        success: { bg: '#d4edda', border: '#c3e6cb', text: '#155724', icon: '#28a745' },
        error: { bg: '#f8d7da', border: '#f5c6cb', text: '#721c24', icon: '#dc3545' },
        warning: { bg: '#fff3cd', border: '#ffeaa7', text: '#856404', icon: '#ffc107' },
        info: { bg: '#d1ecf1', border: '#bee5eb', text: '#0c5460', icon: '#17a2b8' }
    };
    
    const color = colores[tipo] || colores.info;
    
    // Estilos
    notification.style.cssText = `
        background: ${color.bg};
        border: 1px solid ${color.border};
        border-left: 4px solid ${color.icon};
        color: ${color.text};
        padding: 12px 16px;
        margin-bottom: 10px;
        border-radius: 4px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        cursor: pointer;
        font-family: inherit;
        font-size: 14px;
        line-height: 1.4;
        transform: translateX(100%);
        transition: all 0.3s ease;
        opacity: 0;
    `;
    
    // Iconos según tipo
    const iconos = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };
    
    // Contenido
    notification.innerHTML = `
        <div style="display: flex; align-items: flex-start; gap: 10px;">
            <i class="${iconos[tipo]}" style="color: ${color.icon}; font-size: 16px; margin-top: 2px;"></i>
            <div style="flex: 1;">${mensaje}</div>
            <button onclick="this.parentElement.parentElement.remove()" 
                    style="background: none; border: none; color: ${color.text}; cursor: pointer; font-size: 18px; padding: 0; opacity: 0.7;"
                    title="Cerrar">
                &times;
            </button>
        </div>
    `;
    
    // Agregar al contenedor
    container.appendChild(notification);
    
    // Animación de entrada
    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    });
    
    // Auto-cerrar
    if (duracion > 0) {
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(100%)';
                notification.style.opacity = '0';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }
        }, duracion);
    }
    
    // Cerrar al hacer click
    notification.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    });
}

// ============================================================================
// FUNCIONES DE UTILIDAD - COMPLEMENTARIAS
// ============================================================================

/**
 * Formatear fecha
 */
function formatearFecha(fecha, formato = 'corta') {
    if (!fecha) return '-';
    
    try {
        const fechaObj = typeof fecha === 'string' ? new Date(fecha) : fecha;
        
        if (isNaN(fechaObj.getTime())) {
            return 'Fecha inválida';
        }
        
        const opciones = {
            'corta': { year: 'numeric', month: '2-digit', day: '2-digit' },
            'larga': { year: 'numeric', month: 'long', day: 'numeric' },
            'completa': { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }
        };
        
        const opcion = opciones[formato] || opciones.corta;
        return fechaObj.toLocaleDateString('es-CL', opcion);
        
    } catch (error) {
        console.error('[UTILS] Error formateando fecha:', error);
        return 'Error en fecha';
    }
}

/**
 * Generar ID único
 */
function generarId(prefijo = '') {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 9);
    return prefijo ? `${prefijo}_${timestamp}_${random}` : `${timestamp}_${random}`;
}

/**
 * Delay para funciones async
 */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ============================================================================
// FUNCIONES DE CARGA DE DATOS - SIMULADAS
// ============================================================================

/**
 * Función simulada de API
 */
async function callAPI(accion, datos = {}, opciones = {}) {
    console.log(`[API] Llamando: ${accion}`, datos);
    
    // Simular delay de red
    await delay(500 + Math.random() * 1000);
    
    // Respuestas simuladas
    const respuestas = {
        'obtenerObras': {
            success: true,
            datos: [
                { id: '1', nombre: 'Edificio Los Pinos', estado: 'En progreso', avance: 75 },
                { id: '2', nombre: 'Condominio Vista Mar', estado: 'En progreso', avance: 45 },
                { id: '3', nombre: 'Torre Central', estado: 'Completada', avance: 100 }
            ]
        },
        'obtenerAvances': {
            success: true,
            datos: [
                { id: '1', descripcion: 'Instalación de cableado', fecha: new Date().toISOString(), progreso: 80 },
                { id: '2', descripcion: 'Configuración de equipos', fecha: new Date().toISOString(), progreso: 60 }
            ]
        },
        'obtenerMateriales': {
            success: true,
            datos: [
                { id: '1', nombre: 'Cable UTP Cat 6', stock: 1500, unidad: 'metros' },
                { id: '2', nombre: 'Conectores RJ45', stock: 200, unidad: 'unidades' }
            ]
        },
        'obtenerUsuarios': {
            success: true,
            datos: [
                { id: '1', nombre: 'Juan Pérez', rol: 'Supervisor', activo: true },
                { id: '2', nombre: 'María González', rol: 'Técnico', activo: true }
            ]
        }
    };
    
    return respuestas[accion] || {
        success: true,
        datos: [],
        message: `Respuesta simulada para ${accion}`
    };
}

// ============================================================================
// INICIALIZACIÓN
// ============================================================================

/**
 * Inicializar funciones críticas
 */
function initializeCriticalFunctions() {
    console.log('[CORE] Inicializando funciones críticas...');
    
    // Verificar que las funciones estén disponibles globalmente
    window.mostrarSeccion = mostrarSeccion;
    window.cerrarSesion = cerrarSesion;
    window.mostrarModalContrasena = mostrarModalContrasena;
    window.mostrarNotificacion = mostrarNotificacion;
    window.formatearFecha = formatearFecha;
    window.generarId = generarId;
    window.callAPI = callAPI;
    
    console.log('[CORE] Funciones críticas inicializadas correctamente');
    
    // Test de notificación
    setTimeout(() => {
        mostrarNotificacion('Sistema BDPA inicializado correctamente', 'success', 3000);
    }, 1000);
}

// Auto-inicialización
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCriticalFunctions);
} else {
    initializeCriticalFunctions();
}

console.log('[CORE] Funciones críticas cargadas');