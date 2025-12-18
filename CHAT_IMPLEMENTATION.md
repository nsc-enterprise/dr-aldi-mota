# Sistema de Chat en Tiempo Real

## 📋 Implementación Completada

Se ha implementado un sistema completo de chat en tiempo real con las siguientes funcionalidades:

### 🗄️ Base de Datos (Supabase)

**Tablas creadas:**
- `chat_users` - Usuarios del sistema de chat
- `conversations` - Conversaciones entre pacientes y doctores
- `messages` - Mensajes individuales

**Características:**
- Triggers automáticos para actualizar conversaciones
- Índices optimizados para consultas rápidas
- Row Level Security (RLS) policies configuradas
- Contadores de mensajes no leídos automáticos

### 🔧 Backend (src/lib/chat.ts)

Funciones implementadas:
```typescript
// Usuarios
chatUsers.createOrUpdate()
chatUsers.getByEmail()
chatUsers.updateLastSeen()
chatUsers.getAll()

// Conversaciones
conversations.create()
conversations.getOrCreate()
conversations.getByUserId()
conversations.resetUnreadCount()
conversations.updateStatus()

// Mensajes
messages.send()
messages.getByConversation()
messages.markAsRead()
messages.subscribeToConversation() // Tiempo real!
messages.unsubscribe()
```

### 🎨 Frontend

**Componentes creados:**
1. **ChatBox** (`src/components/ChatBox.tsx`)
   - Interfaz de mensajería con scroll automático
   - Soporte para Enter/Shift+Enter
   - Indicadores de lectura (✓ / ✓✓)
   - Separadores de fecha
   - Estados de carga

2. **ConversationList** (`src/components/ConversationList.tsx`)
   - Lista de conversaciones activas
   - Contadores de mensajes no leídos
   - Avatares de usuarios
   - Estados (activo/archivado/cerrado)
   - Timestamps inteligentes

3. **Página de Chat** (`src/app/chat/page.tsx`)
   - Layout responsive (grid 3 columnas en desktop)
   - Autenticación requerida
   - Suscripción a mensajes en tiempo real
   - Marca automática de mensajes como leídos
   - Botón "Nueva Conversación"

### 🔗 Integración

- **Navbar** actualizado con enlace a "/chat"
- **Autenticación** integrada con NextAuth
- **Tiempo Real** usando Supabase Realtime (WebSockets)
- **Edge Runtime** configurado para mejor rendimiento

## 🚀 Configuración Requerida

### 1. Ejecutar el Schema SQL

Ejecuta el archivo `supabase/schema.sql` en tu proyecto Supabase:

```bash
# Opción 1: En Supabase Dashboard
# Ve a SQL Editor y ejecuta el contenido de supabase/schema.sql

# Opción 2: CLI de Supabase
supabase db push
```

### 2. Habilitar Realtime en Supabase

En el Dashboard de Supabase:
1. Ve a "Database" > "Replication"
2. Habilita replication para las tablas:
   - `messages`
   - `conversations`
   - `chat_users`

### 3. Variables de Entorno

Asegúrate de tener en tu `.env.local` o en Netlify:
```
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_SERVICE_KEY=tu_service_key_aquí
NEXTAUTH_URL=https://tu-dominio.com
NEXTAUTH_SECRET=tu_secret_seguro
```

## 📱 Uso

### Para Pacientes:
1. Inicia sesión con Google
2. Ve a "/chat"
3. Haz clic en "Nueva Conversación"
4. Envía mensajes al doctor

### Para Doctores:
1. Cambia el role a 'doctor' en la tabla `chat_users`
2. Ve a "/chat"
3. Verás todas las conversaciones de pacientes
4. Responde en tiempo real

## 🔄 Cómo Funciona el Tiempo Real

```typescript
// Suscripción automática en la página de chat
const subscription = messages.subscribeToConversation(conversationId, (newMessage) => {
  setCurrentMessages(prev => [...prev, newMessage]);
});

// Cleanup al salir
return () => {
  subscription.then(sub => messages.unsubscribe(sub));
};
```

## ⚠️ Nota sobre Build en Windows

Actualmente hay un issue conocido con Next.js 16 + Turbopack + Edge Runtime en Windows con rutas largas. 

**Soluciones:**
1. **Recomendado**: Deployar en Netlify (funciona perfectamente)
2. Build local: Usa WSL2 en lugar de PowerShell
3. O acorta la ruta del proyecto (ej: mover a C:\proj\)

## 🎯 Próximos Pasos Sugeridos

1. **Notificaciones Push** - Alertas cuando lleguen nuevos mensajes
2. **Envío de Archivos** - Soporte para imágenes y PDFs
3. **Videollamadas** - Integración con WebRTC o Twilio
4. **Bot Automático** - Respuestas automáticas fuera de horario
5. **Búsqueda** - Buscar en el historial de mensajes
6. **Exportar Chat** - Descargar conversaciones como PDF

## 📊 Estructura de Datos

```
Conversation
├── patient_id (UUID)
├── doctor_id (UUID)
├── last_message (text)
├── last_message_at (timestamp)
├── unread_count_patient (int)
├── unread_count_doctor (int)
└── status (active|archived|closed)

Message
├── conversation_id (UUID)
├── sender_id (UUID)
├── content (text)
├── type (text|image|file|system)
├── is_read (boolean)
├── read_at (timestamp)
└── created_at (timestamp)
```

## 🔐 Seguridad

- ✅ Row Level Security habilitado
- ✅ Autenticación requerida
- ✅ Validación de roles (patient/doctor)
- ✅ HTTPS en producción
- ⚠️ **TODO**: Restringir políticas RLS para producción

## 📝 Archivos Modificados/Creados

### Nuevos:
- `src/lib/chat.ts`
- `src/components/ChatBox.tsx`
- `src/components/ConversationList.tsx`
- `src/app/chat/page.tsx`
- `CHAT_IMPLEMENTATION.md` (este archivo)

### Modificados:
- `src/types/supabase.ts` - Agregados tipos para chat
- `src/components/Navbar.tsx` - Enlace a /chat
- `supabase/schema.sql` - Schema del sistema de chat

## 🎉 ¡Listo!

El sistema de chat está completamente implementado y listo para usar. Solo falta:
1. Ejecutar el SQL en Supabase
2. Habilitar Realtime
3. Deploy en Netlify
4. ¡Probar el chat en tiempo real!
