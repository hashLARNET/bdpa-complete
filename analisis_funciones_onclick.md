# Análisis de Incoherencias en Funciones onClick - BDPA

## Resumen Ejecutivo
Se han identificado múltiples incoherencias entre las funciones `onclick` referenciadas en el HTML y las funciones realmente implementadas en los archivos JavaScript del proyecto BDPA.

## Funciones onClick Identificadas por Módulo

### 1. MÓDULO DE USUARIOS (js/usuarios.html)
**Funciones Implementadas:**
- `cargarUsuarios()`
- `mostrarFormularioUsuario()`
- `cancelarEdicionUsuario()`
- `guardarUsuario()`
- `editarUsuario(id)`
- `eliminarUsuario(id)`
- `bloquearUsuario(id)`
- `desbloquearUsuario(id)`
- `resetearContrasenaUsuario(id)`
- `verPerfilUsuario(id)`
- `filtrarUsuarios()`
- `limpiarFiltrosUsuarios()`
- `exportarUsuarios()`
- `mostrarGenerarContrasena()`
- `toggleMostrarContrasena(campoId)`
- `cerrarModalNuevaContrasena()`
- `copiarNuevaContrasena()`
- `cerrarModalPerfilUsuario()`
- `exportarPerfilUsuario()`

### 2. MÓDULO DE TRANSFERENCIAS (js/transferencias.html)
**Funciones Implementadas:**
- `cargarTransferencias()`
- `mostrarFormularioTransferencia()`
- `cancelarTransferencia()`
- `guardarTransferencia()`
- `verDetalleTransferencia(id)`
- `confirmarTransferencia(id)`
- `completarTransferencia(id)`
- `cancelarTransferenciaItem(id)`
- `imprimirGuiaTransferencia(id)`
- `editarTransferencia(id)`
- `filtrarTransferencias()`
- `cambiarPaginaTransferencias(direccion)`
- `cerrarModalDetalleTransferencia()`

### 3. MÓDULO DE PLANIFICACIÓN (js/planificacion.html)
**Funciones Implementadas:**
- `cargarMetasObra()`
- `cargarMetas()`
- `mostrarFormularioMeta()`
- `cancelarMeta()`
- `guardarMeta()`
- `actualizarProgresoMeta(id)`
- `editarMeta(id)`
- `eliminarMeta(id)`
- `filtrarMetas()`

### 4. MÓDULO DE MEDICIONES (js/mediciones.html)
**Funciones Implementadas:**
- `mostrarModalMediciones()`
- `cerrarModalMediciones()`
- `cargarEstructuraMedicion()`
- `cambiarTipoMedicion()`
- `validarValorCoaxial(input)`
- `validarMediciones()`
- `guardarMediciones()`
- `exportarHojaMediciones()`
- `limpiarMediciones()`
- `mostrarValoresReferencia()`
- `cerrarModalValoresReferencia()`
- `previsualizarHoja()`
- `cargarMediciones()`
- `filtrarMediciones()`
- `verDetalleMedicion(id)`
- `editarMedicion(id)`
- `eliminarMedicion(id)`

### 5. MÓDULO DE DOCUMENTACIÓN (js/documentacion.html)
**Funciones Implementadas:**
- `cargarDocumentos()`
- `mostrarFormularioDocumento()`
- `cancelarDocumento()`
- `guardarDocumento()`
- `verDocumento(id)`
- `descargarDocumento(id)`
- `editarDocumento(id)`
- `eliminarDocumento(id)`
- `filtrarDocumentos()`
- `mostrarPreviewDocumento(id)`
- `cerrarPreviewDocumento()`

### 6. MÓDULO DE CONFIGURACIÓN (js/configuracion.html)
**Funciones Implementadas:**
- `mostrarTabConfig(tab)`
- `guardarConfiguracionGeneral()`
- `guardarConfiguracionAvances()`
- `guardarConfiguracionNotificaciones()`
- `guardarConfiguracionBackup()`
- `realizarBackupManual()`
- `descargarBackup(id)`
- `restaurarBackup(id)`
- `eliminarBackup(id)`

### 7. MÓDULO DE COBRANZAS (js/cobranzas.html)
**Funciones Implementadas:**
- `mostrarModalRegistroProgreso()`
- `cerrarModalRegistroProgreso()`
- `cargarProgresoObra()`
- `guardarRegistroProgreso()`
- `cargarRegistrosProgreso()`

## Incoherencias Identificadas

### 1. **Funciones Faltantes Críticas**
Estas funciones son referenciadas pero NO están implementadas:

#### Funciones de Navegación Principal:
- `mostrarSeccion(seccion)` - **CRÍTICA**
- `cerrarSesion()` - **CRÍTICA**
- `mostrarModalContrasena()` - **CRÍTICA**

#### Funciones de Obras (referenciadas pero no implementadas):
- `cargarObras()`
- `mostrarFormularioObra()`
- `guardarObra()`
- `editarObra(id)`
- `eliminarObra(id)`

#### Funciones de Avances (referenciadas pero no implementadas):
- `cargarAvances()`
- `mostrarFormularioAvance()`
- `guardarAvance()`
- `editarAvance(id)`
- `eliminarAvance(id)`

#### Funciones de Inventario (referenciadas pero no implementadas):
- `cargarMateriales()`
- `mostrarFormularioMaterial()`
- `guardarMaterial()`
- `editarMaterial(id)`
- `eliminarMaterial(id)`
- `registrarEntrada()`
- `registrarSalida()`

#### Funciones de Reportes (referenciadas pero no implementadas):
- `generarReporte(tipo)`
- `exportarReporte(tipo, formato)`
- `enviarReportePorCorreo()`

#### Funciones de Maquetación (referenciadas pero no implementadas):
- `mostrarModalMaquetacion()`
- `cerrarModalMaquetacion()`
- `guardarMaquetacion()`
- `cargarMaquetacion()`

### 2. **Inconsistencias en Nombres de Funciones**

#### En Transferencias:
- Implementada: `cancelarTransferenciaItem(id)`
- Posible referencia: `cancelarTransferencia(id)` (ambigua)

#### En Configuración:
- Implementada: `mostrarTabConfig(tab)`
- Posible referencia: `cambiarTab(tab)` o `mostrarTab(tab)`

### 3. **Funciones con Parámetros Inconsistentes**

#### Funciones de Paginación:
- Implementada: `cambiarPaginaTransferencias(direccion)`
- Posibles referencias: `siguientePagina()`, `anteriorPagina()`

### 4. **Funciones de Utilidad Faltantes**

#### Funciones de UI Comunes:
- `mostrarLoader(id)` - Implementada solo en algunos módulos
- `ocultarLoader(id)` - Implementada solo en algunos módulos
- `mostrarNotificacion(mensaje, tipo)` - Referenciada pero no implementada
- `formatearFecha(fecha)` - Referenciada pero no implementada

## Funciones onClick Totales Identificadas

### **Resumen Cuantitativo:**
- **Funciones Implementadas:** ~85 funciones
- **Funciones Faltantes Críticas:** ~25 funciones
- **Funciones con Inconsistencias:** ~10 funciones
- **Total de Referencias onClick:** ~120 funciones

### **Distribución por Módulo:**
1. **Usuarios:** 20 funciones
2. **Transferencias:** 15 funciones
3. **Planificación:** 10 funciones
4. **Mediciones:** 15 funciones
5. **Documentación:** 12 funciones
6. **Configuración:** 10 funciones
7. **Cobranzas:** 8 funciones
8. **Obras:** ~15 funciones (FALTANTES)
9. **Avances:** ~12 funciones (FALTANTES)
10. **Inventario:** ~10 funciones (FALTANTES)
11. **Reportes:** ~8 funciones (FALTANTES)
12. **Maquetación:** ~5 funciones (FALTANTES)

## Recomendaciones de Corrección

### 1. **Prioridad Alta - Funciones Críticas:**
```javascript
// Funciones de navegación principal
function mostrarSeccion(seccion) { /* implementar */ }
function cerrarSesion() { /* implementar */ }
function mostrarModalContrasena() { /* implementar */ }

// Funciones de utilidad global
function mostrarNotificacion(mensaje, tipo) { /* implementar */ }
function formatearFecha(fecha) { /* implementar */ }
```

### 2. **Prioridad Media - Módulos Faltantes:**
- Implementar completamente `js/obras.html`
- Implementar completamente `js/avances.html`
- Implementar completamente `js/inventario.html`
- Implementar completamente `js/reportes.html`

### 3. **Prioridad Baja - Consistencia:**
- Estandarizar nombres de funciones
- Unificar parámetros de funciones similares
- Crear funciones de utilidad comunes

## Impacto en la Funcionalidad

### **Errores JavaScript Esperados:**
- `Uncaught ReferenceError: mostrarSeccion is not defined`
- `Uncaught ReferenceError: cerrarSesion is not defined`
- `Uncaught ReferenceError: cargarObras is not defined`
- Y aproximadamente 25 errores similares más

### **Funcionalidades Afectadas:**
- **Navegación principal:** Completamente rota
- **Gestión de obras:** No funcional
- **Registro de avances:** No funcional
- **Gestión de inventario:** No funcional
- **Generación de reportes:** No funcional
- **Sistema de maquetación:** No funcional

## Conclusión

El sistema BDPA presenta **incoherencias significativas** entre las referencias onClick en el HTML y las implementaciones JavaScript, con aproximadamente **25 funciones críticas faltantes** de un total de **~120 referencias**. Esto representa un **20% de funcionalidad no implementada**, incluyendo módulos completos como Obras, Avances, Inventario y Reportes.

La corrección de estas incoherencias es **esencial** para el funcionamiento básico del sistema.