// ============================================================================
// BDPA - js/core-auth.js - Sistema de Autenticación
// ============================================================================

/**
 * Sistema de autenticación centralizado para BDPA
 */

// Variables globales de autenticación
window.usuarioActual = null;
window.tokenSesion = null;

// Estado del sistema de autenticación
let authState = {
    isAuthenticated: false,
    isLoading: false,
    loginAttempts: 0,
    maxLoginAttempts: 5
};

/**
 * Inicializar sistema de autenticación
 */
function initializeAuthSystem() {
    console.log('[AUTH] Inicializando sistema de autenticación...');
    
    // Configurar formulario de login
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    }
    
    // Verificar sesión guardada
    checkSavedSession();
    
    console.log('[AUTH] Sistema de autenticación inicializado');
}

/**
 * Manejar envío del formulario de login
 */
async function handleLoginSubmit(event) {
    event.preventDefault();
    
    if (authState.isLoading) {
        return;
    }
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    
    // Validar campos
    if (!username || !password) {
        showLoginError('Por favor ingrese usuario y contraseña');
        return;
    }
    
    // Verificar límite de intentos
    if (authState.loginAttempts >= authState.maxLoginAttempts) {
        showLoginError('Demasiados intentos fallidos. Intente más tarde.');
        return;
    }
    
    try {
        authState.isLoading = true;
        showLoginLoading(true);
        
        console.log('[AUTH] Intentando login para usuario:', username);
        
        // Simular llamada a API de login
        const response = await simulateLogin(username, password);
        
        if (response.success) {
            console.log('[AUTH] Login exitoso');
            await processSuccessfulLogin(response);
        } else {
            console.log('[AUTH] Login fallido:', response.message);
            authState.loginAttempts++;
            showLoginError(response.message || 'Credenciales incorrectas');
        }
        
    } catch (error) {
        console.error('[AUTH] Error en login:', error);
        authState.loginAttempts++;
        showLoginError('Error al iniciar sesión. Intente nuevamente.');
    } finally {
        authState.isLoading = false;
        showLoginLoading(false);
    }
}

/**
 * Simular login con la API (reemplazar con llamada real)
 */
async function simulateLogin(username, password) {
    // Simular delay de red
    await delay(1500);
    
    // Credenciales de prueba
    const validCredentials = [
        { username: 'admin', password: 'admin123', rol: 'Admin', nombre: 'Administrador', apellido: 'Sistema' },
        { username: 'supervisor', password: 'super123', rol: 'Supervisor', nombre: 'Juan', apellido: 'Pérez' },
        { username: 'tecnico', password: 'tecnico123', rol: 'Técnico', nombre: 'María', apellido: 'González' }
    ];
    
    const user = validCredentials.find(cred => 
        cred.username === username && cred.password === password
    );
    
    if (user) {
        return {
            success: true,
            token: generateSessionToken(),
            usuario: {
                id: generarId('user'),
                nombre: user.nombre,
                apellido: user.apellido,
                usuario: user.username,
                rol: user.rol,
                email: `${user.username}@bdpa.larnet.cl`,
                fechaUltimoAcceso: new Date().toISOString()
            }
        };
    } else {
        return {
            success: false,
            message: 'Usuario o contraseña incorrectos'
        };
    }
}

/**
 * Procesar login exitoso
 */
async function processSuccessfulLogin(response) {
    try {
        // Guardar datos de sesión
        window.usuarioActual = response.usuario;
        window.tokenSesion = response.token;
        
        // Guardar en localStorage
        localStorage.setItem('bdpa_session_token', response.token);
        localStorage.setItem('bdpa_user_data', JSON.stringify(response.usuario));
        
        // Actualizar estado
        authState.isAuthenticated = true;
        authState.loginAttempts = 0;
        
        // Actualizar UI
        updateUserInfo(response.usuario);
        
        // Navegar al dashboard
        mostrarSeccion('dashboard');
        
        // Mostrar notificación de bienvenida
        mostrarExito(`Bienvenido, ${response.usuario.nombre}!`);
        
        console.log('[AUTH] Sesión iniciada correctamente');
        
    } catch (error) {
        console.error('[AUTH] Error procesando login exitoso:', error);
        showLoginError('Error al procesar el inicio de sesión');
    }
}

/**
 * Verificar sesión guardada
 */
function checkSavedSession() {
    try {
        const savedToken = localStorage.getItem('bdpa_session_token');
        const savedUser = localStorage.getItem('bdpa_user_data');
        
        if (savedToken && savedUser) {
            const userData = JSON.parse(savedUser);
            
            // Validar que los datos sean válidos
            if (userData.id && userData.nombre && userData.rol) {
                window.usuarioActual = userData;
                window.tokenSesion = savedToken;
                authState.isAuthenticated = true;
                
                updateUserInfo(userData);
                mostrarSeccion('dashboard');
                
                console.log('[AUTH] Sesión recuperada desde localStorage');
                mostrarInfo('Sesión restaurada correctamente');
                return;
            }
        }
        
        // Si no hay sesión válida, mostrar login
        mostrarSeccion('login');
        
    } catch (error) {
        console.error('[AUTH] Error verificando sesión guardada:', error);
        // En caso de error, limpiar y mostrar login
        clearSession();
        mostrarSeccion('login');
    }
}

/**
 * Actualizar información del usuario en la UI
 */
function updateUserInfo(usuario) {
    const currentUserElement = document.getElementById('current-user');
    const currentRoleElement = document.getElementById('current-role');
    
    if (currentUserElement) {
        currentUserElement.textContent = `${usuario.nombre} ${usuario.apellido}`;
    }
    
    if (currentRoleElement) {
        currentRoleElement.textContent = usuario.rol;
    }
}

/**
 * Mostrar/ocultar loader de login
 */
function showLoginLoading(show) {
    const loginText = document.getElementById('login-text');
    const loginLoader = document.getElementById('login-loader');
    const loginButton = document.querySelector('#login-form button[type="submit"]');
    
    if (show) {
        if (loginText) loginText.classList.add('hidden');
        if (loginLoader) loginLoader.classList.remove('hidden');
        if (loginButton) loginButton.disabled = true;
    } else {
        if (loginText) loginText.classList.remove('hidden');
        if (loginLoader) loginLoader.classList.add('hidden');
        if (loginButton) loginButton.disabled = false;
    }
}

/**
 * Mostrar error de login
 */
function showLoginError(message) {
    const errorElement = document.getElementById('login-error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
        
        // Ocultar después de 5 segundos
        setTimeout(() => {
            errorElement.classList.add('hidden');
        }, 5000);
    }
}

/**
 * Limpiar sesión
 */
function clearSession() {
    window.usuarioActual = null;
    window.tokenSesion = null;
    authState.isAuthenticated = false;
    
    localStorage.removeItem('bdpa_session_token');
    localStorage.removeItem('bdpa_user_data');
}

/**
 * Generar token de sesión
 */
function generateSessionToken() {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 9);
    return `bdpa_${timestamp}_${random}`;
}

/**
 * Verificar si el usuario está autenticado
 */
function isAuthenticated() {
    return authState.isAuthenticated && window.usuarioActual && window.tokenSesion;
}

/**
 * Obtener usuario actual
 */
function getCurrentUser() {
    return window.usuarioActual;
}

/**
 * Verificar si el usuario tiene un rol específico
 */
function hasRole(role) {
    return window.usuarioActual && window.usuarioActual.rol === role;
}

/**
 * Verificar si el usuario tiene alguno de los roles especificados
 */
function hasAnyRole(roles) {
    return window.usuarioActual && roles.includes(window.usuarioActual.rol);
}

// Auto-inicialización
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAuthSystem);
} else {
    initializeAuthSystem();
}

console.log('[AUTH] Sistema de autenticación cargado');