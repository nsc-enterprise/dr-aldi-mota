-- 🏥 SISTEMA MÉDICO UNIFICADO - Dr. Aldimir Mota
-- Ejecutar este script en el SQL Editor de Supabase

-- 🗑️ Eliminar tabla anterior si existe (CUIDADO: esto borra todos los datos)
-- DROP TABLE IF EXISTS solicitudes_medicas;

-- 🏗️ CREAR tabla principal de solicitudes médicas
CREATE TABLE solicitudes_medicas (
  -- 🆔 Identificación única
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- 📅 Metadatos temporales
  fecha_solicitud TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  estado TEXT DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'en_revision', 'contactado', 'cita_agendada', 'completado', 'cancelado')),
  
  -- 👤 Datos personales
  nombres TEXT NOT NULL,
  apellidos TEXT NOT NULL,
  fecha_nacimiento DATE NOT NULL,
  genero TEXT NOT NULL CHECK (genero IN ('masculino', 'femenino', 'otro')),
  documento_identidad TEXT NOT NULL,
  tipo_documento TEXT DEFAULT 'cedula' CHECK (tipo_documento IN ('cedula', 'pasaporte', 'otro')),
  
  -- 📞 Información de contacto
  telefono TEXT NOT NULL,
  email TEXT NOT NULL,
  direccion TEXT,
  ciudad TEXT,
  preferencia_contacto TEXT DEFAULT 'telefono' CHECK (preferencia_contacto IN ('telefono', 'email', 'whatsapp')),
  
  -- 🏥 Motivo de consulta
  especialidad TEXT NOT NULL CHECK (especialidad IN (
    'medicina_general', 'cardiologia', 'dermatologia', 'ginecologia', 
    'pediatria', 'neurologia', 'traumatologia', 'psiquiatria', 
    'oftalmologia', 'otorrinolaringologia', 'urologia', 'endocrinologia'
  )),
  sintomas TEXT NOT NULL,
  tiempo_evolucion TEXT NOT NULL,
  urgencia TEXT DEFAULT 'media' CHECK (urgencia IN ('baja', 'media', 'alta', 'urgente')),
  descripcion_detallada TEXT,
  
  -- 📋 Antecedentes médicos
  alergias TEXT,
  medicamentos_actuales TEXT,
  cirugias_previas TEXT,
  enfermedades_cronicas TEXT,
  antecedente_familiar TEXT,
  
  -- 📝 Notas del doctor
  notas TEXT,
  
  -- 🕐 Timestamps automáticos
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 📊 ÍNDICES para optimizar consultas
CREATE INDEX idx_solicitudes_estado ON solicitudes_medicas(estado);
CREATE INDEX idx_solicitudes_fecha ON solicitudes_medicas(fecha_solicitud DESC);
CREATE INDEX idx_solicitudes_especialidad ON solicitudes_medicas(especialidad);
CREATE INDEX idx_solicitudes_urgencia ON solicitudes_medicas(urgencia);

-- 🔄 TRIGGER para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_solicitudes_updated_at 
    BEFORE UPDATE ON solicitudes_medicas 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- 🛡️ POLÍTICAS DE SEGURIDAD (Row Level Security)
ALTER TABLE solicitudes_medicas ENABLE ROW LEVEL SECURITY;

-- Política: Permitir lectura y escritura para usuarios autenticados
-- (Ajustar según tus necesidades de seguridad)
CREATE POLICY "Permitir acceso completo a usuarios autenticados" 
ON solicitudes_medicas 
FOR ALL 
USING (true);

-- 📝 COMENTARIOS para documentación
COMMENT ON TABLE solicitudes_medicas IS 'Tabla principal para solicitudes de consulta médica especializada - Dr. Aldimir Mota';
COMMENT ON COLUMN solicitudes_medicas.estado IS 'Estado actual de la solicitud médica';
COMMENT ON COLUMN solicitudes_medicas.urgencia IS 'Nivel de urgencia médica evaluado por el paciente';
COMMENT ON COLUMN solicitudes_medicas.especialidad IS 'Especialidad médica requerida para la consulta';

-- ✅ VERIFICACIÓN: Consultar estructura de la tabla
-- SELECT column_name, data_type, is_nullable, column_default 
-- FROM information_schema.columns 
-- WHERE table_name = 'solicitudes_medicas' 
-- ORDER BY ordinal_position;