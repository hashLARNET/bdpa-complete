// ============================================================================
// BDPA - js/dashboard.js - Dashboard Principal
// ============================================================================

/**
 * Sistema de dashboard principal
 */

let dashboardData = {
    obras: [],
    avances: [],
    materiales: [],
    transferencias: [],
    stats: {}
};

/**
 * Cargar dashboard principal
 */
async function cargarDashboard() {
    try {
        console.log('[DASHBOARD] Cargando dashboard...');
        
        // Cargar datos en paralelo
        const [obras, avances, materiales, transferencias] = await Promise.all([
            callAPI('obtenerObras'),
            callAPI('obtenerAvances', { limite: 10 }),
            callAPI('obtenerMateriales'),
            callAPI('obtenerTransferencias', { estado: 'pendiente' })
        ]);
        
        // Actualizar datos
        dashboardData.obras = obras.datos || [];
        dashboardData.avances = avances.datos || [];
        dashboardData.materiales = materiales.datos || [];
        dashboardData.transferencias = transferencias.datos || [];
        
        // Calcular estadísticas
        calcularEstadisticas();
        
        // Actualizar UI
        actualizarDashboardUI();
        
        console.log('[DASHBOARD] Dashboard cargado correctamente');
        
    } catch (error) {
        console.error('[DASHBOARD] Error cargando dashboard:', error);
        mostrarError('Error al cargar el dashboard');
    }
}

/**
 * Calcular estadísticas del dashboard
 */
function calcularEstadisticas() {
    const stats = {
        totalObras: dashboardData.obras.length,
        obrasActivas: dashboardData.obras.filter(o => o.estado === 'En progreso').length,
        avancesMes: dashboardData.avances.filter(a => {
            const fecha = new Date(a.fecha);
            const ahora = new Date();
            return fecha.getMonth() === ahora.getMonth() && fecha.getFullYear() === ahora.getFullYear();
        }).length,
        materialesStock: dashboardData.materiales.reduce((total, m) => total + (m.stock || 0), 0),
        transferenciasP: dashboardData.transferencias.length
    };
    
    dashboardData.stats = stats;
}

/**
 * Actualizar UI del dashboard
 */
function actualizarDashboardUI() {
    const stats = dashboardData.stats;
    
    // Actualizar cards de estadísticas
    updateElement('total-obras', stats.obrasActivas);
    updateElement('avances-mes', stats.avancesMes);
    updateElement('materiales-stock', stats.materialesStock);
    updateElement('transferencias-pendientes', stats.transferenciasP);
    
    // Actualizar obras recientes
    actualizarObrasRecientes();
    
    // Actualizar actividad reciente
    actualizarActividadReciente();
}

/**
 * Actualizar obras recientes
 */
function actualizarObrasRecientes() {
    const container = document.getElementById('obras-recientes');
    if (!container) return;
    
    const obrasRecientes = dashboardData.obras
        .sort((a, b) => new Date(b.fechaCreacion || 0) - new Date(a.fechaCreacion || 0))
        .slice(0, 5);
    
    if (obrasRecientes.length === 0) {
        container.innerHTML = '<p class="text-muted">No hay obras registradas</p>';
        return;
    }
    
    const html = obrasRecientes.map(obra => `
        <div class="obra-item" style="padding: 10px; border-bottom: 1px solid #eee; cursor: pointer;" 
             onclick="mostrarSeccion('obras')">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <strong>${obra.nombre}</strong>
                    <div style="font-size: 12px; color: #6c757d;">${obra.direccion || 'Sin dirección'}</div>
                </div>
                <div style="text-align: right;">
                    <span class="badge badge-${getEstadoBadgeClass(obra.estado)}">${obra.estado}</span>
                    <div style="font-size: 12px; color: #6c757d;">${obra.avance || 0}% completado</div>
                </div>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = html;
}

/**
 * Actualizar actividad reciente
 */
function actualizarActividadReciente() {
    const container = document.getElementById('actividad-reciente');
    if (!container) return;
    
    const actividadReciente = dashboardData.avances
        .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
        .slice(0, 5);
    
    if (actividadReciente.length === 0) {
        container.innerHTML = '<p class="text-muted">No hay actividad reciente</p>';
        return;
    }
    
    const html = actividadReciente.map(avance => `
        <div class="actividad-item" style="padding: 10px; border-bottom: 1px solid #eee;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <div style="flex: 1;">
                    <strong>${avance.descripcion || 'Avance registrado'}</strong>
                    <div style="font-size: 12px; color: #6c757d;">
                        ${avance.obraNombre || 'Obra no especificada'}
                    </div>
                    <div style="font-size: 12px; color: #6c757d;">
                        Por: ${avance.usuarioNombre || 'Usuario desconocido'}
                    </div>
                </div>
                <div style="text-align: right;">
                    <div style="font-size: 12px; color: #6c757d;">
                        ${formatearFecha(avance.fecha, 'completa')}
                    </div>
                    ${avance.progreso ? `<span class="badge badge-success">${avance.progreso}%</span>` : ''}
                </div>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = html;
}

/**
 * Obtener clase de badge según estado
 */
function getEstadoBadgeClass(estado) {
    const clases = {
        'En progreso': 'primary',
        'Completada': 'success',
        'Pausada': 'warning',
        'Cancelada': 'danger',
        'Planificada': 'secondary'
    };
    return clases[estado] || 'secondary';
}

/**
 * Actualizar elemento del DOM
 */
function updateElement(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = value || 0;
    }
}

/**
 * Refrescar dashboard
 */
async function refrescarDashboard() {
    try {
        mostrarInfo('Actualizando dashboard...');
        await cargarDashboard();
        mostrarExito('Dashboard actualizado');
    } catch (error) {
        mostrarError('Error al actualizar dashboard');
    }
}

console.log('[DASHBOARD] Dashboard cargado');