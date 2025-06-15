// ============================================================================
// BDPA - js/core-utils.js - Utilidades Globales
// ============================================================================

/**
 * Utilidades comunes para todo el sistema BDPA
 * Funciones auxiliares que resuelven problemas recurrentes
 */

/**
 * Formatear fecha - RESUELVE PROBLEMA RECURRENTE
 * @param {string|Date} fecha - Fecha a formatear
 * @param {string} formato - Formato deseado ('corta', 'larga', 'completa')
 * @returns {string} Fecha formateada
 */
function formatearFecha(fecha, formato = 'corta') {
    if (!fecha) return '-';
    
    try {
        const fechaObj = typeof fecha === 'string' ? new Date(fecha) : fecha;
        
        if (isNaN(fechaObj.getTime())) {
            return 'Fecha inválida';
        }
        
        const opciones = {
            'corta': {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            },
            'larga': {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            },
            'completa': {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            }
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
 * @param {string} prefijo - Prefijo opcional
 * @returns {string} ID único
 */
function generarId(prefijo = '') {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 9);
    return prefijo ? `${prefijo}_${timestamp}_${random}` : `${timestamp}_${random}`;
}

/**
 * Validar email
 * @param {string} email - Email a validar
 * @returns {boolean} True si es válido
 */
function validarEmail(email) {
    if (!email || typeof email !== 'string') return false;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email.trim());
}

/**
 * Formatear número con separadores de miles
 * @param {number} numero - Número a formatear
 * @param {number} decimales - Cantidad de decimales
 * @returns {string} Número formateado
 */
function formatearNumero(numero, decimales = 0) {
    if (numero === null || numero === undefined || isNaN(numero)) {
        return '0';
    }
    
    return new Intl.NumberFormat('es-CL', {
        minimumFractionDigits: decimales,
        maximumFractionDigits: decimales
    }).format(numero);
}

/**
 * Capitalizar primera letra
 * @param {string} texto - Texto a capitalizar
 * @returns {string} Texto capitalizado
 */
function capitalizarPrimeraLetra(texto) {
    if (!texto || typeof texto !== 'string') return '';
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}

/**
 * Debounce para funciones
 * @param {Function} func - Función a ejecutar
 * @param {number} wait - Tiempo de espera en ms
 * @returns {Function} Función con debounce
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Delay/sleep para funciones async
 * @param {number} ms - Milisegundos a esperar
 * @returns {Promise} Promise que se resuelve después del delay
 */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Escapar HTML para prevenir XSS
 * @param {string} texto - Texto a escapar
 * @returns {string} Texto escapado
 */
function escaparHTML(texto) {
    if (!texto || typeof texto !== 'string') return '';
    
    const div = document.createElement('div');
    div.textContent = texto;
    return div.innerHTML;
}

/**
 * Copiar texto al portapapeles
 * @param {string} texto - Texto a copiar
 * @returns {Promise<boolean>} True si se copió exitosamente
 */
async function copiarAlPortapapeles(texto) {
    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(texto);
            return true;
        } else {
            // Fallback para navegadores más antiguos
            const textArea = document.createElement('textarea');
            textArea.value = texto;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            const result = document.execCommand('copy');
            document.body.removeChild(textArea);
            return result;
        }
    } catch (error) {
        console.error('[UTILS] Error copiando al portapapeles:', error);
        return false;
    }
}

/**
 * Detectar si es dispositivo móvil
 * @returns {boolean} True si es móvil
 */
function esDispositivoMovil() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

console.log('[UTILS] Utilidades globales cargadas');