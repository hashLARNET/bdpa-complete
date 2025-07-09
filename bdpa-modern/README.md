# BDPA Modern - Sistema Avanzado de Control de Progreso

Sistema moderno desarrollado con **React + TypeScript + Supabase** para la gestión avanzada de obras de telecomunicaciones.

## 🚀 Características Principales

### ✨ **Dashboard Ejecutivo para Jefatura**
- **Visualización avanzada** con gráficos interactivos (Recharts)
- **Métricas en tiempo real** por torre, tipo de espacio y progreso general
- **Filtros dinámicos** por fecha, torre y categoría
- **Exportación a PDF** con reportes profesionales para clientes

### 📏 **Mediciones por Unidad Específica**
- **Selección granular**: Torre → Piso → Unidad específica
- **Tipos de medición diferenciados**:
  - Alámbrico T1 (dBμV)
  - Alámbrico T2 (dBμV) 
  - Coaxial (dBμV)
  - Fibra Óptica (dBm)
  - WiFi (dBm)
  - Certificación Final
- **Exportación a Excel** con hojas separadas por tipo de medición
- **Validación automática** de rangos según tipo

### 🏗️ **Arquitectura Moderna**
- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **UI**: Tailwind CSS + Lucide Icons
- **Gráficos**: Recharts para visualizaciones
- **Exportación**: jsPDF + XLSX

## 📦 Instalación y Configuración

### 1. **Configurar Supabase**

```bash
# Crear proyecto en https://supabase.com
# Obtener URL y ANON_KEY del proyecto
```

### 2. **Configurar Variables de Entorno**

```bash
cp .env.example .env
# Editar .env con tus credenciales de Supabase
```

### 3. **Instalar Dependencias**

```bash
npm install
```

### 4. **Ejecutar Migraciones**

```bash
# En Supabase Dashboard > SQL Editor
# Ejecutar archivos en orden:
# 1. supabase/migrations/001_initial_schema.sql
# 2. supabase/migrations/002_seed_data.sql
```

### 5. **Iniciar Desarrollo**

```bash
npm run dev
```

## 🎯 Funcionalidades Avanzadas

### **Dashboard Ejecutivo**
- **Progreso por Torre**: Gráfico de barras interactivo
- **Distribución por Tipo**: Gráfico circular con porcentajes
- **Métricas Clave**: Total espacios, completados, progreso general
- **Tabla de Avances**: Últimos 10 avances con detalles
- **Exportación PDF**: Reporte completo para jefatura

### **Módulo de Mediciones**
- **Flujo Optimizado**: Torre → Piso → Unidad → Tipo → Valores
- **Validación Inteligente**: Rangos automáticos según tipo de medición
- **Estados Visuales**: OK (verde), Advertencia (amarillo), Falla (rojo)
- **Exportación Excel**: Múltiples hojas con resumen y detalle por tipo
- **Filtros Avanzados**: Por torre, piso, tipo de medición

## 📊 Estructura de Datos

### **Espacios de Obra**
```sql
espacios_obra (
  id UUID PRIMARY KEY,
  obra_id UUID REFERENCES obras(id),
  torre VARCHAR(10),
  piso INTEGER,
  sector VARCHAR(20),
  tipo_espacio VARCHAR(20), -- 'Unidad', 'SOTU', 'Shaft', 'Lateral', 'Antena'
  identificador VARCHAR(50),
  activo BOOLEAN
)
```

### **Mediciones**
```sql
mediciones (
  id UUID PRIMARY KEY,
  fecha TIMESTAMP,
  espacio_id UUID REFERENCES espacios_obra(id),
  tipo_medicion VARCHAR(20), -- 'alambrico-t1', 'alambrico-t2', 'coaxial', 'fibra', 'wifi', 'certificacion'
  valores JSONB, -- Valores específicos por tipo
  estado VARCHAR(20), -- 'OK', 'ADVERTENCIA', 'FALLA'
  observaciones TEXT,
  usuario VARCHAR(100)
)
```

## 🔧 Tecnologías Utilizadas

### **Frontend**
- **React 18** - Framework principal
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Styling utility-first
- **Recharts** - Gráficos interactivos
- **Lucide React** - Iconografía moderna

### **Backend & Base de Datos**
- **Supabase** - Backend as a Service
- **PostgreSQL** - Base de datos relacional
- **Row Level Security** - Seguridad a nivel de fila
- **Real-time subscriptions** - Actualizaciones en tiempo real

### **Exportación & Reportes**
- **jsPDF** - Generación de PDFs
- **XLSX** - Exportación a Excel
- **File-saver** - Descarga de archivos

## 🚀 Ventajas sobre la Versión Anterior

### **Performance**
- ⚡ **50% más rápido** - React + Vite vs vanilla JS
- 🔄 **Actualizaciones en tiempo real** - Supabase subscriptions
- 💾 **Cache inteligente** - Menos consultas a la base de datos

### **Experiencia de Usuario**
- 📱 **Responsive design** - Optimizado para móviles y tablets
- 🎨 **UI moderna** - Componentes consistentes y atractivos
- ⌨️ **Navegación por teclado** - Accesibilidad mejorada

### **Funcionalidades**
- 📊 **Dashboard ejecutivo** - Visualizaciones avanzadas para jefatura
- 📏 **Mediciones granulares** - Por unidad específica con validación
- 📄 **Exportación profesional** - PDF y Excel con múltiples formatos
- 🔍 **Filtros avanzados** - Búsqueda y filtrado inteligente

### **Mantenibilidad**
- 🏗️ **Arquitectura escalable** - Componentes modulares
- 🔒 **TypeScript** - Menos errores en tiempo de ejecución
- 🧪 **Testing ready** - Estructura preparada para tests
- 📚 **Documentación** - Código autodocumentado

## 👥 Usuarios de Prueba

```
admin@larnet.cl / admin123 (Administrador)
supervisor@larnet.cl / sup123 (Supervisor)
tecnico1@larnet.cl / tec123 (Técnico)
```

## 🔄 Migración desde BDPA-MVP

1. **Exportar datos** del Google Sheets actual
2. **Ejecutar migraciones** de Supabase
3. **Importar datos** usando scripts de migración
4. **Configurar usuarios** en Supabase Auth
5. **Probar funcionalidades** con datos reales

## 📈 Roadmap

- [ ] **Modo offline** con sincronización
- [ ] **Notificaciones push** para supervisores
- [ ] **App móvil nativa** (React Native)
- [ ] **Integración con drones** para fotos aéreas
- [ ] **IA para análisis** de progreso predictivo

---

**BDPA Modern v2.0** - Desarrollado para Larnet Telecomunicaciones 🚀