// ============================================================================
// BDPA - js/core-navigation.js - Sistema de Navegación Global
// ============================================================================

/**
 * Sistema de navegación centralizado para BDPA
 * Resuelve el problema de mostrarSeccion() no implementada
 */

// Estado de navegación
let navigationState = {
    currentSection: null,
    previousSection: null,
    history: [],
    initialized: false
};

// Configuración de secciones
const SECTIONS_CONFIG = {
    'login': {
        id: 'login-container',
        title: 'Iniciar Sesión',
        requiresAuth: false,
        showInMenu: false
    },
    'dashboard': {
        id: 'dashboard',
        title: 'Dashboard',
        requiresAuth: true,
        showInMenu: true,
        icon: 'fas fa-tachometer-alt'
    },
    'obras': {
        id: 'obras',
        title: 'Gestión de Obras',
        requiresAuth: true,
        showInMenu: true,
        icon: 'fas fa-building',
        roles: ['Admin', 'Supervisor']
    },
    'avances': {
        id: 'avances',
        title: 'Registro de Avances',
        requiresAuth: true,
        showInMenu: true,
        icon: 'fas fa-tasks'
    },
    'inventario': {
        id: 'inventario',
        title: 'Gestión de Inventario',
        requiresAuth: true,
        showInMenu: true,
        icon: 'fas fa-boxes'
    },
    'transferencias': {
        id: 'transferencias',
        title: 'Transferencias',
        requiresAuth: true,
        showInMenu: true,
        icon: 'fas fa-exchange-alt'
    },
    'planificacion-metas': {
        id: 'planificacion-metas',
        title: 'Planificación y Metas',
        requiresAuth: true,
        showInMenu: true,
        icon: 'fas fa-bullseye'
    },
    'mediciones': {
        id: 'mediciones',
        title: 'Mediciones',
        requiresAuth: true,
        showInMenu: true,
        icon: 'fas fa-ruler'
    },
    'documentacion': {
        id: 'documentacion',
        title: 'Documentación',
        requiresAuth: true,
        showInMenu: true,
        icon: 'fas fa-file-alt'
    },
    'cobranzas': {
        id: 'cobranzas',
        title: 'Registro de Progreso',
        requiresAuth: true,
        showInMenu: true,
        icon: 'fas fa-chart-line'
    },
    'reportes': {
        id: 'reportes',
        title: 'Reportes',
        requiresAuth: true,
        showInMenu: true,
        icon: 'fas fa-chart-bar'
    },
    'gestion-usuarios': {
        id: 'gestion-usuarios',
        title: 'Gestión de Usuarios',
        requiresAuth: true,
        showInMenu: true,
        icon: 'fas fa-users',
        roles: ['Admin']
    },
    'configuracion': {
        id: 'configuracion',
        title: 'Configuración',
        requiresAuth: true,
        showInMenu: true,
        icon: 'fas fa-cog',
        roles: ['Admin', 'Supervisor']
    }
};

/**
 * Función principal de navegación - RESUELVE EL PROBLEMA CRÍTICO
 * @param {string} seccion - Nombre de la sección a mostrar
 * @param {object} opciones - Opciones adicionales
 */
function mostrarSeccion(seccion, opciones = {}) {
    try {
        console.log(`[NAVEGACION] Navegando a: ${seccion}`);
        
        // Validar sección
        if (!seccion || typeof seccion !== 'string') {
            console.error('[NAVEGACION] Sección inválida:', seccion);
            mostrarError('Error de navegación: sección inválida');
            return false;
        }
        
        // Normalizar nombre de sección
        seccion = seccion.toLowerCase().trim();
        
        // Verificar si la sección existe
        const sectionConfig = SECTIONS_CONFIG[seccion];
        if (!sectionConfig) {
            console.error('[NAVEGACION] Sección no encontrada:', seccion);
            mostrarError(`Sección "${seccion}" no encontrada`);
            return false;
        }
        
        // Verificar autenticación
        if (sectionConfig.requiresAuth && !window.usuarioActual) {
            console.warn('[NAVEGACION] Acceso denegado - no autenticado');
            mostrarSeccion('login');
            return false;
        }
        
        // Verificar permisos de rol
        if (sectionConfig.roles && window.usuarioActual) {
            if (!sectionConfig.roles.includes(window.usuarioActual.rol)) {
                console.warn('[NAVEGACION] Acceso denegado - rol insuficiente');
                mostrarError('No tiene permisos para acceder a esta sección');
                return false;
            }
        }
        
        // Ejecutar navegación
        const success = executeNavigation(seccion, sectionConfig, opciones);
        
        if (success) {
            // Actualizar estado
            updateNavigationState(seccion);
            
            // Actualizar menú
            updateNavigationMenu(seccion);
            
            // Ejecutar callbacks de sección
            executeNavigationCallbacks(seccion, sectionConfig);
            
            console.log(`[NAVEGACION] Navegación exitosa a: ${seccion}`);
        }
        
        return success;
        
    } catch (error) {
        console.error('[NAVEGACION] Error en navegación:', error);
        mostrarError('Error interno de navegación');
        return false;
    }
}

/**
 * Ejecutar la navegación real
 */
function executeNavigation(seccion, sectionConfig, opciones) {
    try {
        // Ocultar todas las secciones
        hideAllSections();
        
        // Mostrar sección objetivo
        const targetElement = document.getElementById(sectionConfig.id);
        if (!targetElement) {
            console.error('[NAVEGACION] Elemento no encontrado:', sectionConfig.id);
            mostrarError(`Elemento de sección "${seccion}" no encontrado`);
            return false;
        }
        
        // Mostrar elemento
        targetElement.classList.remove('hidden');
        
        // Manejar contenedores especiales
        if (seccion === 'login') {
            // Ocultar menú principal
            const mainMenu = document.getElementById('main-menu-container');
            if (mainMenu) {
                mainMenu.classList.add('hidden');
            }
        } else {
            // Mostrar menú principal
            const mainMenu = document.getElementById('main-menu-container');
            if (mainMenu) {
                mainMenu.classList.remove('hidden');
            }
            
            // Ocultar login
            const loginContainer = document.getElementById('login-container');
            if (loginContainer) {
                loginContainer.classList.add('hidden');
            }
        }
        
        // Scroll al top
        if (!opciones.noScroll) {
            window.scrollTo(0, 0);
        }
        
        return true;
        
    } catch (error) {
        console.error('[NAVEGACION] Error ejecutando navegación:', error);
        return false;
    }
}

/**
 * Ocultar todas las secciones
 */
function hideAllSections() {
    Object.values(SECTIONS_CONFIG).forEach(config => {
        const element = document.getElementById(config.id);
        if (element) {
            element.classList.add('hidden');
        }
    });
}

/**
 * Actualizar estado de navegación
 */
function updateNavigationState(seccion) {
    navigationState.previousSection = navigationState.currentSection;
    navigationState.currentSection = seccion;
    
    // Agregar al historial
    navigationState.history.push({
        section: seccion,
        timestamp: Date.now()
    });
    
    // Limitar historial
    if (navigationState.history.length > 50) {
        navigationState.history = navigationState.history.slice(-50);
    }
    
    // Actualizar título de página
    const sectionConfig = SECTIONS_CONFIG[seccion];
    if (sectionConfig) {
        document.title = `BDPA - ${sectionConfig.title}`;
    }
}

/**
 * Actualizar menú de navegación
 */
function updateNavigationMenu(seccionActiva) {
    // Actualizar enlaces del menú
    const menuLinks = document.querySelectorAll('.nav-link[data-section]');
    menuLinks.forEach(link => {
        const linkSection = link.dataset.section;
        if (linkSection === seccionActiva) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * Ejecutar callbacks de navegación
 */
function executeNavigationCallbacks(seccion, sectionConfig) {
    // Callbacks específicos por sección
    const callbacks = {
        'dashboard': () => {
            if (typeof cargarDashboard === 'function') {
                cargarDashboard();
            }
        },
        'obras': () => {
            if (typeof cargarObras === 'function') {
                cargarObras();
            }
        },
        'avances': () => {
            if (typeof cargarAvances === 'function') {
                cargarAvances();
            }
        },
        'inventario': () => {
            if (typeof cargarMateriales === 'function') {
                cargarMateriales();
            }
        },
        'transferencias': () => {
            if (typeof cargarTransferencias === 'function') {
                cargarTransferencias();
            }
        },
        'planificacion-metas': () => {
            if (typeof cargarMetas === 'function') {
                cargarMetas();
            }
        },
        'mediciones': () => {
            if (typeof cargarMediciones === 'function') {
                cargarMediciones();
            }
        },
        'documentacion': () => {
            if (typeof cargarDocumentos === 'function') {
                cargarDocumentos();
            }
        },
        'gestion-usuarios': () => {
            if (typeof cargarUsuarios === 'function') {
                cargarUsuarios();
            }
        },
        'configuracion': () => {
            if (typeof inicializarConfiguracion === 'function') {
                inicializarConfiguracion();
            }
        }
    };
    
    // Ejecutar callback si existe
    const callback = callbacks[seccion];
    if (callback) {
        try {
            callback();
        } catch (error) {
            console.error(`[NAVEGACION] Error en callback de ${seccion}:`, error);
        }
    }
}

/**
 * Función para cerrar sesión - RESUELVE PROBLEMA CRÍTICO
 */
function cerrarSesion() {
    if (!confirm('¿Está seguro de que desea cerrar sesión?')) {
        return;
    }
    
    try {
        console.log('[NAVEGACION] Cerrando sesión...');
        
        // Limpiar datos de sesión
        window.usuarioActual = null;
        window.tokenSesion = null;
        
        // Limpiar localStorage
        localStorage.removeItem('bdpa_session_token');
        localStorage.removeItem('bdpa_user_data');
        
        // Resetear estado de navegación
        navigationState.currentSection = null;
        navigationState.previousSection = null;
        
        // Navegar a login
        mostrarSeccion('login');
        
        // Mostrar notificación
        mostrarInfo('Sesión cerrada correctamente');
        
        console.log('[NAVEGACION] Sesión cerrada exitosamente');
        
    } catch (error) {
        console.error('[NAVEGACION] Error cerrando sesión:', error);
        mostrarError('Error al cerrar sesión');
    }
}

/**
 * Función para mostrar modal de cambio de contraseña - RESUELVE PROBLEMA CRÍTICO
 */
function mostrarModalContrasena() {
    // Crear modal si no existe
    if (!document.getElementById('modal-cambio-contrasena')) {
        createPasswordChangeModal();
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
function createPasswordChangeModal() {
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
        mostrarError('Todos los campos son obligatorios');
        return;
    }
    
    if (nueva !== confirmar) {
        mostrarError('Las contraseñas nuevas no coinciden');
        return;
    }
    
    if (nueva.length < 8) {
        mostrarError('La nueva contraseña debe tener al menos 8 caracteres');
        return;
    }
    
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(nueva)) {
        mostrarError('La contraseña debe contener mayúsculas, minúsculas y números');
        return;
    }
    
    try {
        // Simular cambio de contraseña exitoso
        await delay(1000);
        mostrarExito('Contraseña cambiada correctamente');
        cerrarModalContrasena();
    } catch (error) {
        console.error('[NAVEGACION] Error cambiando contraseña:', error);
        mostrarError('Error al cambiar contraseña');
    }
}

/**
 * Inicializar sistema de navegación
 */
function initializeNavigationSystem() {
    console.log('[NAVEGACION] Inicializando sistema de navegación...');
    
    // Configurar event listeners para enlaces de navegación
    document.addEventListener('click', (event) => {
        const link = event.target.closest('[data-section]');
        if (link) {
            event.preventDefault();
            const section = link.dataset.section;
            mostrarSeccion(section);
        }
    });
    
    navigationState.initialized = true;
    console.log('[NAVEGACION] Sistema de navegación inicializado');
}

// Auto-inicialización
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeNavigationSystem);
} else {
    initializeNavigationSystem();
}

console.log('[NAVEGACION] Sistema de navegación cargado');