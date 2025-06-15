// ============================================================================
// BDPA - js/dashboard-enhanced.js - Dashboard Mejorado
// ============================================================================

/**
 * Dashboard mejorado basado en el index.html funcional
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
        
        // Mostrar indicador de carga
        showDashboardLoading(true);
        
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
        mostrarNotificacion('Error al cargar el dashboard', 'error');
    } finally {
        showDashboardLoading(false);
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
    
    // Actualizar cards de estadísticas con animación
    animateCountUp('total-obras', stats.obrasActivas);
    animateCountUp('avances-mes', stats.avancesMes);
    animateCountUp('materiales-stock', stats.materialesStock);
    animateCountUp('transferencias-pendientes', stats.transferenciasP);
    
    // Actualizar obras recientes
    actualizarObrasRecientes();
    
    // Actualizar actividad reciente
    actualizarActividadReciente();
}

/**
 * Animar contador hacia arriba
 */
function animateCountUp(elementId, targetValue) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const startValue = 0;
    const duration = 1000;
    const startTime = Date.now();
    
    function updateCount() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Función de easing
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(startValue + (targetValue - startValue) * easeOutQuart);
        
        element.textContent = currentValue;
        
        if (progress < 1) {
            requestAnimationFrame(updateCount);
        } else {
            element.textContent = targetValue;
        }
    }
    
    updateCount();
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
        <div class="obra-item" style="padding: 15px; border-bottom: 1px solid #eee; cursor: pointer; transition: background 0.2s;" 
             onclick="mostrarSeccion('obras')"
             onmouseover="this.style.background='#f8f9fa'"
             onmouseout="this.style.background='transparent'">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="flex: 1;">
                    <strong style="color: var(--primary-color);">${obra.nombre}</strong>
                    <div style="font-size: 12px; color: #6c757d; margin-top: 2px;">
                        <i class="fas fa-map-marker-alt"></i> ${obra.direccion || 'Sin dirección'}
                    </div>
                </div>
                <div style="text-align: right;">
                    <span class="badge badge-${getEstadoBadgeClass(obra.estado)}">${obra.estado}</span>
                    <div style="font-size: 12px; color: #6c757d; margin-top: 2px;">
                        <i class="fas fa-chart-line"></i> ${obra.avance || 0}% completado
                    </div>
                </div>
            </div>
            <div style="margin-top: 8px;">
                <div class="progress" style="height: 4px;">
                    <div class="progress-bar bg-${getProgressColorClass(obra.avance || 0)}" 
                         style="width: ${obra.avance || 0}%"></div>
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
        <div class="actividad-item" style="padding: 15px; border-bottom: 1px solid #eee; transition: background 0.2s;"
             onmouseover="this.style.background='#f8f9fa'"
             onmouseout="this.style.background='transparent'">
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <div style="flex: 1;">
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                        <i class="fas fa-tasks" style="color: var(--secondary-color);"></i>
                        <strong>${avance.descripcion || 'Avance registrado'}</strong>
                    </div>
                    <div style="font-size: 12px; color: #6c757d; margin-bottom: 2px;">
                        <i class="fas fa-building"></i> ${avance.obraNombre || 'Obra no especificada'}
                    </div>
                    <div style="font-size: 12px; color: #6c757d;">
                        <i class="fas fa-user"></i> Por: ${avance.usuarioNombre || 'Usuario desconocido'}
                    </div>
                </div>
                <div style="text-align: right;">
                    <div style="font-size: 12px; color: #6c757d; margin-bottom: 4px;">
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
 * Obtener clase de color para progress bar
 */
function getProgressColorClass(progreso) {
    if (progreso >= 80) return 'success';
    if (progreso >= 60) return 'info';
    if (progreso >= 40) return 'warning';
    return 'danger';
}

/**
 * Mostrar/ocultar loading del dashboard
 */
function showDashboardLoading(show) {
    const cards = document.querySelectorAll('.dashboard-card');
    const containers = [
        document.getElementById('obras-recientes'),
        document.getElementById('actividad-reciente')
    ];
    
    if (show) {
        cards.forEach(card => {
            card.style.opacity = '0.6';
            card.style.pointerEvents = 'none';
        });
        
        containers.forEach(container => {
            if (container) {
                container.innerHTML = '<p class="text-muted"><i class="fas fa-spinner fa-spin"></i> Cargando...</p>';
            }
        });
    } else {
        cards.forEach(card => {
            card.style.opacity = '1';
            card.style.pointerEvents = 'auto';
        });
    }
}

/**
 * Refrescar dashboard
 */
async function refrescarDashboard() {
    try {
        mostrarNotificacion('Actualizando dashboard...', 'info', 2000);
        await cargarDashboard();
        mostrarNotificacion('Dashboard actualizado', 'success');
    } catch (error) {
        mostrarNotificacion('Error al actualizar dashboard', 'error');
    }
}

/**
 * Configurar auto-refresh del dashboard
 */
function setupDashboardAutoRefresh() {
    // Refrescar cada 5 minutos
    setInterval(() => {
        if (document.getElementById('dashboard') && !document.getElementById('dashboard').classList.contains('hidden')) {
            cargarDashboard();
        }
    }, 5 * 60 * 1000);
}

// Inicializar auto-refresh
setupDashboardAutoRefresh();

console.log('[DASHBOARD] Dashboard mejorado cargado');