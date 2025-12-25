# Changelog

Todos los cambios notables de este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2024-12-22

### ✨ Agregado
- **Panel Médico Unificado**: Dashboard completo con autenticación por contraseña
- **Asistente IA Médico**: Análisis inteligente de pacientes con detección de casos urgentes
- **Asistente Público Separado**: Chat flotante seguro sin acceso a datos médicos
- **Páginas Legales Completas**: Política de privacidad, cookies, términos y aviso legal
- **Datos Simulados**: Sistema de prueba con 10 pacientes médicos realistas
- **PWA Completa**: Aplicación instalable con iconos y manifiesto
- **Footer Profesional**: Enlaces organizados y información de contacto

### 🔒 Seguridad
- **APIs Separadas**: Asistente médico vs público para proteger datos sensibles
- **Autenticación**: Panel médico protegido con contraseña
- **Tokens de Acceso**: Verificación de autorización para API médica
- **Eliminación de Enlaces Públicos**: Rutas sensibles removidas del footer

### 🎨 Interfaz
- **Iconos Sociales a Color**: Instagram, Facebook y Doctoralia con colores oficiales
- **Mejora de Formularios**: Texto más visible y mejor contraste
- **Chat Flotante Mejorado**: Respuestas inteligentes del asistente público
- **Panel Médico Profesional**: Diseño limpio con estadísticas y gestión

### 🔧 Técnico
- **Base de Datos Local**: Sistema JSON para portabilidad
- **CSVs de Supabase**: Archivos listos para migración a base de datos
- **Build Optimizado**: Configuración mejorada para Netlify
- **TypeScript**: Tipado completo y seguro

## [1.0.0] - 2024-12-21

### ✨ Agregado
- **Formulario de Campaña**: Página principal optimizada para Facebook Ads
- **Historial Médico**: Formulario completo con datos médicos detallados
- **Gestión de Pacientes**: Panel básico para administrar solicitudes
- **Dashboard Médico**: Estadísticas y métricas del consultorio
- **Chat Flotante**: Asistente virtual básico
- **Deploy Automático**: Configuración completa para Netlify

### 🎯 Funcionalidades Core
- **Captación de Pacientes**: Formularios optimizados para conversión
- **Base de Datos**: Sistema de almacenamiento local
- **Responsive Design**: Adaptado para móviles y desktop
- **Integración WhatsApp**: Enlaces directos para contacto

### 🚀 Deploy
- **Netlify**: Configuración automática con Next.js Runtime
- **Dominio Custom**: dr-aldimir-mota.netlify.app
- **SSL**: Certificado automático
- **Build Optimizado**: Tiempo de carga rápido

---

## Tipos de Cambios
- `✨ Agregado` para nuevas funcionalidades
- `🔧 Cambiado` para cambios en funcionalidades existentes
- `🗑️ Deprecado` para funcionalidades que serán removidas
- `❌ Removido` para funcionalidades removidas
- `🔒 Seguridad` para vulnerabilidades corregidas
- `🐛 Corregido` para corrección de bugs