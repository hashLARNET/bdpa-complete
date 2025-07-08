# BDPA MVP - Los Encinos

Sistema simplificado para control de progreso de obra de telecomunicaciones.

## 🎯 Características

- **Login simple** con 3 usuarios predefinidos
- **Registro de avances** optimizado para campo
- **Consulta de progreso** con estadísticas visuales
- **Mediciones básicas** para certificaciones
- **Modo offline** con sincronización automática
- **Interfaz móvil** optimizada para tablets

## 🏗️ Estructura de la Obra

**Los Encinos** - 10 Torres (A-J), Pisos 1 y 3, múltiples sectores y tipos de espacios.

### Tipos de Espacios:
- **Unidades**: Departamentos residenciales
- **SOTU**: Salas de equipos técnicos
- **Shaft**: Ductos verticales
- **Lateral**: Conexiones PAU-SOTU
- **Antena**: Equipos en azotea

## 📱 Instalación

### 1. Crear Google Sheets

Crear un nuevo Google Sheets con estas hojas:

#### Hoja "Config"
```
| Parametro     | Valor                    |
|---------------|--------------------------|
| NombreObra    | Los Encinos             |
| DireccionObra | [Dirección de la obra]  |
| EstadoObra    | En progreso             |
| FechaInicio   | [Fecha actual]          |
```

#### Hoja "Usuarios"
```
| ID | Username   | Password | Nombre            | Rol        | Activo | UltimoAcceso |
|----|------------|----------|-------------------|------------|--------|--------------|
| 1  | admin      | admin123 | Administrador     | Admin      | TRUE   |              |
| 2  | supervisor | sup123   | Supervisor Campo  | Supervisor | TRUE   |              |
| 3  | tecnico1   | tec123   | Técnico 1         | Tecnico    | TRUE   |              |
```

#### Hoja "Estructura"
```
| Torre | Piso | Sector    | TipoEspacio | Identificador | Activo |
|-------|------|-----------|-------------|---------------|--------|
| A     | 1    | Oriente   | Unidad      | A101          | TRUE   |
| A     | 1    | Oriente   | Unidad      | A102          | TRUE   |
| ...   | ...  | ...       | ...         | ...           | ...    |
| A     | 1    | -         | SOTU        | SOTU-A1       | TRUE   |
| A     | 3    | -         | SOTU        | SOTU-A3       | TRUE   |
| A     | -    | -         | Shaft       | SHAFT-A       | TRUE   |
| A     | -    | -         | Antena      | ANT-A1        | TRUE   |
| A     | -    | -         | Antena      | ANT-A2        | TRUE   |
```

#### Hoja "Avances"
```
| ID | Fecha | Torre | Piso | TipoEspacio | Identificador | Categoria | Porcentaje | Fotos | Observaciones | Usuario | Timestamp |
|----|-------|-------|------|-------------|---------------|-----------|------------|-------|---------------|---------|-----------|
```

#### Hoja "Mediciones"
```
| ID | Fecha | Torre | Piso | Identificador | TipoMedicion | Valores | Estado | Usuario | Observaciones | Timestamp |
|----|-------|-------|------|---------------|--------------|---------|--------|---------|---------------|-----------|
```

### 2. Configurar Google Apps Script

1. Abrir [Google Apps Script](https://script.google.com)
2. Crear nuevo proyecto
3. Copiar el contenido de `Code.gs`
4. Reemplazar `TU_SPREADSHEET_ID_AQUI` con el ID real del Sheets
5. Crear archivos HTML:
   - `index.html`
   - `css/main.html`
   - `js/main.html`
   - `js/api.html`
   - `js/avances.html`
   - `js/mediciones.html`

### 3. Publicar como Web App

1. En Apps Script: **Implementar** > **Nueva implementación**
2. Tipo: **Aplicación web**
3. Ejecutar como: **Yo**
4. Acceso: **Cualquier persona**
5. Copiar URL de la aplicación web

### 4. Obtener ID del Spreadsheet

El ID está en la URL del Google Sheets:
```
https://docs.google.com/spreadsheets/d/[ESTE_ES_EL_ID]/edit
```

## 👥 Usuarios Predefinidos

| Usuario    | Contraseña | Rol        | Permisos                    |
|------------|------------|------------|-----------------------------|
| admin      | admin123   | Admin      | Acceso completo             |
| supervisor | sup123     | Supervisor | Registro y consulta         |
| tecnico1   | tec123     | Técnico    | Solo registro de avances    |

## 📊 Funcionalidades

### Registro de Avances
- Selección inteligente de ubicación
- Botones rápidos de porcentaje (0%, 25%, 50%, 75%, 100%)
- Captura de fotos con cámara
- Guardado automático de última ubicación
- Modo offline con sincronización

### Consulta de Progreso
- Resumen visual por torres
- Filtros por torre y tipo de espacio
- Estadísticas en tiempo real
- Progreso general de la obra

### Mediciones
- Tipos: Coaxial, Fibra Óptica, WiFi, Certificación
- Validación de rangos automática
- Estados: OK, Advertencia, Falla
- Exportación de reportes

## 🔧 Personalización

### Agregar Torres
Modificar en `js/main.html`:
```javascript
const OBRA_CONFIG =  {
    torres: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"]
};
```

### Modificar Categorías
Editar `CATEGORIAS_AVANCE` en `js/main.html`:
```javascript
const CATEGORIAS_AVANCE = {
    unidad: [
        "Nueva categoría",
        "Otra categoría"
    ]
};
```

### Cambiar Estructura de Unidades
Actualizar `ESTRUCTURA_UNIDADES` en `js/main.html` con la distribución específica.

## 📱 Uso en Campo

### Optimizaciones Móviles:
- Botones grandes para uso táctil
- Interfaz responsive
- Captura directa con cámara
- Guardado automático cada 30 segundos
- Trabajo offline con sincronización

### Flujo Recomendado:
1. Iniciar sesión al comenzar el día
2. Seleccionar tipo de espacio y torre
3. El sistema recuerda la última ubicación
4. Registrar avances con fotos
5. Los datos se sincronizan automáticamente

## 🔍 Solución de Problemas

### Error "Spreadsheet not found"
- Verificar que el ID del Sheets sea correcto
- Confirmar permisos de acceso al archivo

### No se guardan los datos
- Verificar conexión a internet
- Los datos se guardan localmente y se sincronizan al reconectar

### Fotos no se cargan
- Verificar permisos de cámara en el navegador
- Máximo 5MB por foto

## 📈 Próximas Mejoras

- [ ] Reportes automáticos por email
- [ ] Integración con sistemas externos
- [ ] Notificaciones push
- [ ] Dashboard ejecutivo
- [ ] Gestión de múltiples obras

## 🆘 Soporte

Para soporte técnico o consultas:
- Email: soporte@larnet.cl
- Documentación: [Wiki del proyecto]
- Issues: [GitHub Issues]

---

**BDPA MVP v1.0** - Desarrollado para Larnet Telecomunicaciones
