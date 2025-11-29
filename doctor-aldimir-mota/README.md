# Doctor Aldimir Mota - Asistente Estratégico Proactivo (AEP)

Este proyecto es una **Progressive Web App (PWA)** desarrollada con Next.js para el consultorio del Dr. Aldimir Mota. Funciona como un asistente digital para la gestión de pacientes y como una landing page optimizada para campañas de marketing (Ultrasonidos).

## 🚀 Características Principales

### 1. Dashboard del Doctor (`/`)
- Vista centralizada para el médico.
- Integración con IA (actualmente en **Modo Simulación** para demostraciones sin costo).
- Tarjetas de acción proactivas.

### 2. Gestión de Pacientes (`/pacientes`)
- Listado de solicitudes recibidas desde la landing page.
- **Gestión de Estado**: Marcar como Pendiente, Contactado, Agendado, etc.
- **Notas Internas**: Añadir comentarios privados a cada solicitud.
- **Eliminación**: Borrar solicitudes de prueba o spam.
- Persistencia de datos local (archivo JSON).

### 3. Landing Page de Campaña (`/agendar`)
- Diseñada específicamente para **campañas de Facebook Ads**.
- Optimización **Mobile-First** para alta conversión.
- Formulario simplificado para captación de pacientes de Ultrasonido.
- Feedback visual inmediato al usuario.

### 4. PWA (Progressive Web App)
- Instalable en dispositivos móviles y escritorio.
- Iconos dinámicos generados automáticamente.
- Manifiesto web configurado (`manifest.webmanifest`).
- Service Worker para soporte offline básico.

## 🛠️ Tecnologías

- **Framework**: Next.js 16 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Base de Datos**: Local JSON (Sistema de archivos, sin dependencia de DB externa para facilitar portabilidad).
- **IA**: Google Generative AI SDK (Configurado con fallback a modo simulación).

## ⚙️ Configuración e Instalación

1.  **Instalar dependencias**:
    ```bash
    npm install
    ```

2.  **Variables de Entorno**:
    Crea un archivo `.env.local` en la raíz (opcional para modo simulación):
    ```env
    # GEMINI_API_KEY=tu_api_key_aqui
    ```
    *Si no se proporciona la API Key, el sistema usa automáticamente el modo simulación.*

3.  **Ejecutar servidor de desarrollo**:
    ```bash
    npm run dev
    ```
    Accede a `http://localhost:3000`.

## 📱 Instalación de la App (PWA)

1.  Abre `http://localhost:3000` en Chrome (PC o Android) o Safari (iOS).
2.  **PC**: Busca el icono de instalación en la barra de direcciones o usa el botón "Instalar App" en la barra de navegación.
3.  **Móvil**:
    *   **Android (Chrome)**: Menú > Instalar aplicación.
    *   **iOS (Safari)**: Botón Compartir > Agregar a Inicio.

## 📂 Estructura del Proyecto

- `src/app/`: Rutas y páginas de la aplicación.
  - `page.tsx`: Dashboard.
  - `agendar/`: Landing page.
  - `pacientes/`: Panel de gestión.
  - `api/`: Endpoints del backend (Next.js API Routes).
- `src/components/`: Componentes reutilizables (Navbar, InstallButton, etc.).
- `src/lib/db.ts`: Lógica de "base de datos" local.
- `src/data/citas.json`: Archivo donde se guardan los datos.

## 📝 Notas de Desarrollo

- **Modo Simulación**: Si la API de Gemini falla o no hay key, el sistema devuelve respuestas predefinidas para asegurar que la demo siempre funcione.
- **Persistencia**: Los datos se guardan en `src/data/citas.json`. Este archivo no debe borrarse manualmente a menos que se quiera reiniciar la "base de datos".
