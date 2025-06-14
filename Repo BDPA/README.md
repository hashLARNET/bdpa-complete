# BDPA - Base de Datos de Progreso Automatizado
Este repositorio contiene la versión reestructurada del sistema BDPA, un sistema web desarrollado para la gestión de obras de telecomunicaciones bajo el marco de la Ley de Ductos en Chile.

## 🎯 Objetivo del Sistema
Permitir a supervisores y técnicos registrar, visualizar y reportar el avance de obras mediante una interfaz web conectada con Google Apps Script y Google Sheets como backend.

## 📁 Estructura del Proyecto

- `index.html`: Página principal con login e integración de pestañas.
- `partials/`: Componentes HTML reutilizables como encabezado, pie de página y modal de maquetación.
- `css/`: Estilos del sistema.
- `js/`: Lógica modular para cada componente del sistema.
- `Code.gs` / `Inicio.gs`: Lógica backend en Google Apps Script.

## 🧩 Funcionalidades
- Modal de Maquetación con definición de:
  - Pisos, torres, unidades, CTR, shafts, cámaras de paso.
  - Topología de red: Coaxial (alámbrico/inalámbrico), fibra, alámbrico, inalámbrico.
  - Componentes: ODF, puntos de acceso, cajas de paso, racks, antenas.
  - Mediciones y sistemas integrados (incendios, corrientes débiles, citofonía, motores de acceso).
- Registro de avances vinculados a la estructura configurada.
- Almacenamiento de imágenes en Drive, referencias por URL.
- Reportes exportables.
- Sistema de usuarios con roles.

## 🚀 Tecnologías
- Frontend: HTML5, CSS3, JavaScript (vanilla)
- Backend: Google Apps Script (GAS)
- Base de datos: Google Sheets
- Almacenamiento de archivos: Google Drive

## 📦 Despliegue
Este sistema está diseñado para ejecutarse como Web App dentro de GAS y puede integrarse con un dominio propio mediante iframe o redirección.

## 🔐 Seguridad y Escalabilidad
- Control de acceso por roles
- Escalabilidad por segmentación de hojas por obra
- Soporte para archivado de datos y vinculación externa
