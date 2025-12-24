# 🤝 Guía de Contribución

¡Gracias por tu interés en contribuir al sistema médico del Dr. Aldimir Mota! Esta guía te ayudará a participar de manera efectiva.

## 📋 Código de Conducta

Este proyecto adhiere a un código de conducta profesional. Al participar, te comprometes a mantener un ambiente respetuoso y colaborativo.

## 🚀 Cómo Contribuir

### 1. **Reportar Bugs**
- Usa el [sistema de issues](https://github.com/nsc-enterprise/dr-aldi-mota/issues)
- Incluye pasos para reproducir el problema
- Especifica el navegador y sistema operativo
- Adjunta capturas de pantalla si es relevante

### 2. **Sugerir Mejoras**
- Abre un issue con la etiqueta "enhancement"
- Describe claramente la funcionalidad propuesta
- Explica por qué sería útil para el sistema médico

### 3. **Contribuir Código**

#### Configuración del Entorno
```bash
# Fork y clonar el repositorio
git clone https://github.com/tu-usuario/dr-aldi-mota.git
cd dr-aldi-mota

# Instalar dependencias
npm install

# Crear rama para tu feature
git checkout -b feature/nueva-funcionalidad

# Ejecutar en desarrollo
npm run dev
```

#### Estándares de Código
- **TypeScript**: Todo el código debe estar tipado
- **ESLint**: Seguir las reglas configuradas
- **Tailwind CSS**: Usar clases de utilidad, evitar CSS custom
- **Componentes**: Crear componentes reutilizables cuando sea posible

#### Estructura de Commits
```
tipo(alcance): descripción breve

Descripción más detallada si es necesaria

Fixes #123
```

**Tipos de commit:**
- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `style`: Cambios de formato (no afectan funcionalidad)
- `refactor`: Refactorización de código
- `test`: Agregar o modificar tests
- `chore`: Tareas de mantenimiento

### 4. **Pull Request Process**

1. **Antes de enviar:**
   - Ejecuta `npm run build` para verificar que compila
   - Ejecuta `npm run lint` para verificar estilo
   - Prueba tu funcionalidad en diferentes navegadores

2. **Descripción del PR:**
   - Título claro y descriptivo
   - Descripción detallada de los cambios
   - Referencias a issues relacionados
   - Capturas de pantalla para cambios de UI

3. **Review Process:**
   - Al menos una revisión requerida
   - Todos los checks de CI deben pasar
   - Resolver comentarios antes del merge

## 🏥 Consideraciones Médicas

### Privacidad y Seguridad
- **NUNCA** incluyas datos médicos reales en commits
- Usa datos simulados para testing
- Respeta las regulaciones de privacidad médica
- Documenta cualquier cambio que afecte la seguridad

### Terminología Médica
- Usa terminología médica correcta
- Consulta con profesionales médicos para validaciones
- Mantén consistencia en términos técnicos

## 🔧 Áreas de Contribución

### Frontend
- **React/Next.js**: Componentes y páginas
- **Tailwind CSS**: Estilos y responsive design
- **TypeScript**: Tipado y interfaces
- **PWA**: Funcionalidades de aplicación web

### Backend
- **API Routes**: Endpoints de Next.js
- **Base de Datos**: Integración con Supabase
- **Autenticación**: Sistemas de login seguro
- **Validaciones**: Sanitización de datos médicos

### IA y Automatización
- **Asistentes IA**: Mejoras en respuestas inteligentes
- **Análisis de Datos**: Algoritmos de recomendación médica
- **Automatización**: Workflows de gestión de pacientes

### Documentación
- **README**: Mejoras en documentación
- **Comentarios**: Documentación de código
- **Guías**: Tutoriales de uso
- **API Docs**: Documentación de endpoints

## 🧪 Testing

### Datos de Prueba
```bash
# Cargar datos simulados
curl -X POST http://localhost:3000/api/poblar-datos
```

### Casos de Prueba
- **Formularios**: Validación de campos médicos
- **Panel Médico**: Autenticación y gestión
- **Asistentes IA**: Respuestas apropiadas
- **Responsive**: Funcionamiento en móviles

## 📞 Contacto

- **Issues**: [GitHub Issues](https://github.com/nsc-enterprise/dr-aldi-mota/issues)
- **Email**: soporte@nsc-enterprise.com
- **Consultas Médicas**: medicinmota@outlook.com

## 🏆 Reconocimientos

Los contribuidores serán reconocidos en:
- README.md del proyecto
- Releases notes
- Página de créditos (si aplica)

---

**¡Gracias por ayudar a mejorar el sistema médico digital!** 🏥❤️