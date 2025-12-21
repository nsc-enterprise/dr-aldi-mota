# 🏥 Dr. Aldimir Mota - Sistema Médico Digital

Sistema completo de gestión médica con formularios optimizados para campañas y chat en vivo.

## 🚀 Características Principales

### 📋 **Formularios Duales**
- **Campaña de Ultrasonidos** (`/`) - 4 campos, máxima conversión
- **Formulario Completo** (`/completo`) - Historial médico exhaustivo

### 💬 **Chat Flotante en Vivo**
- Asistente virtual 24/7
- Respuestas automáticas
- Diseño responsivo
- Acciones rápidas (Horarios, Agendar, Ubicación)

### 🏥 **Dashboard Médico** (`/pacientes`)
- Gestión de solicitudes
- Cambio de estados
- Notas del doctor
- Filtros por estado
- Vista detallada de pacientes

### 🎨 **Diseño Responsivo**
- Mobile-first
- Optimizado para tablets
- Desktop completo
- PWA instalable

## 🛠️ Tecnologías

- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Base de Datos**: Sistema temporal JSON (migrable a Supabase)
- **Chat**: Componente React con estado local

## ⚙️ Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar servidor de desarrollo
npm run dev

# Abrir en navegador
http://localhost:3000
```

## 📱 Estructura de Rutas

```
/                    → Formulario de Campaña (Ultrasonidos)
/completo            → Formulario Completo (Doctor de Cabecera)
/pacientes           → Dashboard Médico
/api/solicitudes     → API REST para solicitudes
```

## 🔬 Tipos de Ultrasonidos

El sistema incluye terminología médica precisa:

- 🤱 **Ecografía Obstétrica** - Embarazos
- 🫁 **Ecografía Abdominal** - Órganos internos
- 🫀 **Ecografía Pélvica** - Ginecológica
- 💪 **Ecografía Musculoesquelética** - Músculos/Tendones
- 🦴 **Ecografía Tiroidea** - Cuello
- ❤️ **Ecocardiograma** - Corazón
- 🩸 **Ecografía Vascular** - Arterias/Venas
- 🫘 **Ecografía Renal** - Riñones

## 📊 Estados de Solicitudes

- `pendiente` - Nueva solicitud
- `en_revision` - Doctor revisando
- `contactado` - Paciente contactado
- `cita_agendada` - Cita confirmada
- `completado` - Consulta realizada
- `cancelado` - Solicitud cancelada

## 💬 Chat Flotante

### Características:
- **Botón flotante** - Siempre visible
- **Ventana emergente** - 320px móvil, 384px desktop
- **Auto-scroll** - Mensajes más recientes visibles
- **Indicador de escritura** - Feedback visual
- **Acciones rápidas** - Respuestas predefinidas
- **Timestamps** - Hora de cada mensaje

### Personalización:
```typescript
// src/components/ChatFlotante.tsx
const respuestasAutomaticas = [
  'Tu respuesta personalizada aquí...'
]
```

## 🎯 Optimización para Campañas

### Formulario de Campaña:
- **Conversión máxima** - Solo 4 campos
- **Oferta visible** - 20% descuento
- **Urgencia** - "Respuesta en 2 horas"
- **Credibilidad** - "+15 años experiencia"
- **Prueba social** - "500+ pacientes"

### Elementos de Confianza:
- 🔒 100% Confidencial
- ⚡ Respuesta Inmediata
- 🏆 Experiencia comprobada
- ⭐ Testimonios

## 🔄 Migración a Supabase

Cuando estés listo para producción:

1. **Instalar Supabase**:
```bash
npm install @supabase/supabase-js
```

2. **Ejecutar SQL**:
```bash
# Usar el archivo: supabase-setup.sql
```

3. **Configurar variables**:
```env
SUPABASE_URL=tu_url_aqui
SUPABASE_SERVICE_KEY=tu_key_aqui
```

4. **Reemplazar sistema**:
```typescript
// Descomentar código Supabase en:
// src/lib/sistemamedico.ts
```

## 📂 Estructura de Archivos

```
src/
├── app/
│   ├── page.tsx              # Formulario Campaña
│   ├── completo/page.tsx     # Formulario Completo
│   ├── pacientes/page.tsx    # Dashboard
│   └── api/
│       └── solicitudes/      # API REST
├── components/
│   ├── ChatFlotante.tsx      # Chat en vivo
│   ├── Navbar.tsx            # Navegación
│   └── InstallButton.tsx     # PWA
├── lib/
│   └── sistemamedico.ts      # Lógica de datos
├── types/
│   ├── medico.ts             # Tipos médicos
│   └── supabase.ts           # Esquema DB
└── data/
    └── solicitudes-temp.json # Datos temporales
```

## 🎨 Paleta de Colores

```css
medico-50:  #f8fafc  /* Fondo claro */
medico-900: #0f172a  /* Texto oscuro */
azul-600:   #2563eb  /* Primario */
azul-700:   #1d4ed8  /* Hover */
```

## 🚀 Próximas Funciones

- [ ] Integración con WhatsApp Business
- [ ] Notificaciones push
- [ ] Sistema de recordatorios
- [ ] Historial médico completo
- [ ] Recetas digitales
- [ ] Videoconsultas
- [ ] Pagos en línea

## 📝 Notas de Desarrollo

- **Sistema temporal** - Funciona sin base de datos externa
- **Datos persistentes** - Se guardan en JSON local
- **Fácil migración** - Compatible con Supabase
- **TypeScript estricto** - Tipado completo
- **Responsive** - Mobile-first design

## 🤝 Contribución

Este es un proyecto privado para el Dr. Aldimir Mota.

## 📄 Licencia

Privado - Todos los derechos reservados © 2024

---

**Desarrollado con ❤️ para mejorar la atención médica**