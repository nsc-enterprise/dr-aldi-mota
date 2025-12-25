# 🏥 Dr. Aldimir Mota - Sistema Médico Digital

[![Netlify Status](https://api.netlify.com/api/v1/badges/your-badge-id/deploy-status)](https://app.netlify.com/sites/dr-aldimir-mota/deploys)
[![Version](https://img.shields.io/badge/version-1.1-blue.svg)](https://github.com/nsc-enterprise/dr-aldi-mota/releases)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

Sistema médico digital completo para el consultorio del **Dr. Aldimir Mota** en Tres Valles, Veracruz, México. Incluye formularios de captación de pacientes, panel médico profesional y asistentes de IA especializados.

## 🌐 **Demo en Vivo**

- **🏠 Sitio Principal**: https://dr-aldimir-mota.netlify.app
- **🔒 Panel Médico**: https://dr-aldimir-mota.netlify.app/panel-medico
  - Contraseña: `doctor2024`

## ✨ **Características Principales**

### 🎯 **Para Pacientes**
- **Formulario de Campaña**: Captación rápida optimizada para Facebook Ads
- **Historial Médico Completo**: Formulario detallado con datos médicos
- **Chat Inteligente**: Asistente virtual público con información del consultorio
- **PWA**: Instalable como aplicación móvil
- **Páginas Legales**: Política de privacidad, cookies, términos

### 👨‍⚕️ **Para el Doctor**
- **Panel Médico Protegido**: Dashboard con autenticación por contraseña
- **Gestión de Pacientes**: Lista, filtrado y actualización de estados
- **Asistente IA Médico**: Análisis inteligente y recomendaciones
- **Estadísticas**: Métricas en tiempo real del consultorio
- **Datos Simulados**: Sistema de prueba con casos médicos realistas

## 🛠️ **Tecnologías**

- **Frontend**: Next.js 14, React 18, TypeScript
- **Estilos**: Tailwind CSS v3
- **Base de Datos**: JSON local (migrable a Supabase)
- **Deploy**: Netlify con Next.js Runtime
- **PWA**: Manifiesto web y service worker

## 🚀 **Instalación y Desarrollo**

### Prerrequisitos
- Node.js 20+
- npm o pnpm

### Instalación Local
```bash
# Clonar repositorio
git clone https://github.com/nsc-enterprise/dr-aldi-mota.git
cd dr-aldi-mota

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local

# Ejecutar en desarrollo
npm run dev
```

### Variables de Entorno
```env
# Supabase (Opcional - usa JSON local por defecto)
NEXT_PUBLIC_SUPABASE_URL=tu_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_key_supabase

# WhatsApp del Doctor
NEXT_PUBLIC_WHATSAPP_PHONE=2293690042

# Gemini AI (Opcional - funciona sin esto)
GEMINI_API_KEY=tu_gemini_key
```

## 📱 **Instalación como PWA**

### En Móvil
- **Android**: Chrome → Menú → "Instalar aplicación"
- **iOS**: Safari → Compartir → "Agregar a Inicio"

### En Desktop
- **Chrome**: Icono de instalación en barra de direcciones
- **Edge**: Menú → "Aplicaciones" → "Instalar este sitio"

## 🔒 **Panel Médico**

### Acceso
- **URL**: `/panel-medico`
- **Contraseña**: `doctor2024`

### Funcionalidades
- **Dashboard**: Estadísticas de pacientes pendientes, citas del día
- **Gestión**: Cambiar estados (pendiente → contactado → agendado → finalizado)
- **IA Médica**: Análisis inteligente con detección de casos urgentes
- **Datos Demo**: Botón para cargar 10 pacientes simulados

## 🤖 **Asistentes de IA**

### Asistente Público (Chat Flotante)
- **Acceso**: Todas las páginas públicas
- **Funciones**: Información del consultorio, horarios, tipos de estudios
- **Seguridad**: Sin acceso a datos médicos privados

### Asistente Médico (Panel Privado)
- **Acceso**: Solo panel médico autenticado
- **Funciones**: Análisis de pacientes, alertas urgentes, recomendaciones
- **Datos**: Acceso completo a base de datos médica

## 📊 **Estructura del Proyecto**

```
src/
├── app/                    # Páginas Next.js App Router
│   ├── panel-medico/      # Panel médico protegido
│   ├── agendar/           # Historial médico completo
│   ├── api/               # APIs del backend
│   └── [legal]/           # Páginas legales
├── components/            # Componentes reutilizables
├── lib/                   # Utilidades y base de datos
└── types/                 # Definiciones TypeScript
```

## 🗃️ **Base de Datos**

### Desarrollo Local
- **Archivo**: `src/data/citas.json`
- **Tipo**: JSON local para portabilidad

### Producción (Opcional)
- **Supabase**: Migración disponible con CSVs incluidos
- **Tablas**: `solicitudes_pacientes`, `citas_medicas`, `historial_medico`

## 🚀 **Deploy a Producción**

### Netlify (Recomendado)
```bash
# Build local
npm run build

# Deploy automático via Git
git push origin main
```

### Variables de Entorno en Netlify
- `NODE_VERSION=20`
- `NEXT_PUBLIC_SUPABASE_URL` (opcional)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` (opcional)

## 📋 **Páginas Disponibles**

| Ruta | Descripción | Acceso |
|------|-------------|---------|
| `/` | Formulario de campaña | Público |
| `/agendar` | Historial médico completo | Público |
| `/panel-medico` | Dashboard médico | Protegido |
| `/politica-privacidad` | Política de privacidad | Público |
| `/cookies` | Política de cookies | Público |
| `/terminos` | Términos y condiciones | Público |
| `/aviso-legal` | Aviso legal | Público |

## 🔐 **Seguridad**

- **Autenticación**: Panel médico protegido por contraseña
- **APIs Separadas**: Asistente médico vs público
- **Datos Médicos**: Sin exposición pública
- **HTTPS**: Certificado SSL automático en Netlify

## 📞 **Información del Consultorio**

- **Doctor**: Dr. Aldimir Mota
- **Especialidad**: Ultrasonidos Diagnósticos
- **Teléfono**: 229 369 0042
- **Email**: medicinmota@outlook.com
- **Dirección**: Av. Adolfo Ruiz Cortinez #300, Tres Valles, Veracruz
- **Horarios**: Lun-Vie 8AM-6PM, Sáb 8AM-2PM

## 🤝 **Contribuir**

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abrir Pull Request

## 📝 **Changelog**

### v1.1 (2024-12-22)
- ✅ Panel médico unificado con autenticación
- ✅ Asistentes IA separados (médico/público)
- ✅ Páginas legales completas
- ✅ PWA instalable
- ✅ Datos simulados para testing

### v1.0 (2024-12-21)
- ✅ Formularios de captación
- ✅ Base de datos local
- ✅ Deploy en Netlify

## 📄 **Licencia**

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🆘 **Soporte**

Para soporte técnico o consultas:
- **Email**: soporte@nsc-enterprise.com
- **Issues**: [GitHub Issues](https://github.com/nsc-enterprise/dr-aldi-mota/issues)

---

**Desarrollado con ❤️ por NSC Enterprise para el Dr. Aldimir Mota**