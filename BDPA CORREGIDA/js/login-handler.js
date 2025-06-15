// ============================================================================
// BDPA - js/login-handler.js - Manejo de Login
// ============================================================================

/**
 * Sistema de login basado en el index.html funcional
 */

// Estado del login
let loginState = {
    isLoading: false,
    attempts: 0,
    maxAttempts: 5
};

/**
 * Inicializar sistema de login
 */
function initializeLoginSystem() {
    console.log('[LOGIN] Inicializando sistema de login...');
    
    // Configurar formulario de login
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    }
    
    // Verificar sesión guardada
    checkSavedSession();
    
    console.log('[LOGIN] Sistema de login inicializado');
}

/**
 * Manejar envío del formulario de login
 */
async function handleLoginSubmit(event) {
    event.preventDefault();
    
    if (loginState.isLoading) return;
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    
    // Validar campos
    if (!username || !password) {
        showLoginError('Por favor ingrese usuario y contraseña');
        return;
    }
    
    // Verificar límite de intentos
    if (loginState.attempts >= loginState.maxAttempts) {
        showLoginError('Demasiados intentos fallidos. Intente más tarde.');
        return;
    }
    
    try {
        loginState.isLoading = true;
        showLoginLoading(true);
        
        console.log('[LOGIN] Intentando login para usuario:', username);
        
        // Simular autenticación
        const response = await authenticateUser(username, password);
        
        if (response.success) {
            console.log('[LOGIN] Login exitoso');
            await processSuccessfulLogin(response);
        } else {
            console.log('[LOGIN] Login fallido:', response.message);
            loginState.attempts++;
            showLoginError(response.message || 'Credenciales incorrectas');
        }
        
    } catch (error) {
        console.error('[LOGIN] Error en login:', error);
        loginState.attempts++;
        showLoginError('Error al iniciar sesión. Intente nuevamente.');
    } finally {
        loginState.isLoading = false;
        showLoginLoading(false);
    }
}

/**
 * Autenticar usuario (simulado)
 */
async function authenticateUser(username, password) {
    // Simular delay de autenticación
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
        loginState.attempts = 0;
        
        // Actualizar UI del usuario
        updateUserInfo(response.usuario);
        
        // Ocultar login y mostrar menú principal
        document.getElementById('login-container').classList.add('hidden');
        document.getElementById('main-menu-container').classList.remove('hidden');
        
        // Navegar al dashboard
        mostrarSeccion('dashboard');
        
        // Mostrar notificación de bienvenida
        mostrarNotificacion(`Bienvenido, ${response.usuario.nombre}!`, 'success');
        
        console.log('[LOGIN] Sesión iniciada correctamente');
        
    } catch (error) {
        console.error('[LOGIN] Error procesando login exitoso:', error);
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
                
                updateUserInfo(userData);
                
                // Mostrar menú principal y ocultar login
                document.getElementById('login-container').classList.add('hidden');
                document.getElementById('main-menu-container').classList.remove('hidden');
                
                // Navegar al dashboard
                mostrarSeccion('dashboard');
                
                console.log('[LOGIN] Sesión recuperada desde localStorage');
                mostrarNotificacion('Sesión restaurada correctamente', 'info');
                return;
            }
        }
        
        // Si no hay sesión válida, mostrar login
        document.getElementById('login-container').classList.remove('hidden');
        document.getElementById('main-menu-container').classList.add('hidden');
        
    } catch (error) {
        console.error('[LOGIN] Error verificando sesión guardada:', error);
        // En caso de error, limpiar y mostrar login
        clearSession();
        document.getElementById('login-container').classList.remove('hidden');
        document.getElementById('main-menu-container').classList.add('hidden');
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

// Auto-inicialización
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeLoginSystem);
} else {
    initializeLoginSystem();
}

console.log('[LOGIN] Sistema de login cargado');