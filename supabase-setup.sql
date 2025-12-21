-- Script SQL para ejecutar en Supabase
-- Ve a tu dashboard de Supabase > SQL Editor y ejecuta esto:

CREATE TABLE solicitudes_pacientes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  telefono VARCHAR(20) NOT NULL,
  tipo_ultrasonido VARCHAR(100) NOT NULL,
  preferencia_contacto VARCHAR(20) DEFAULT 'telefono',
  estado VARCHAR(20) DEFAULT 'pendiente',
  fecha_solicitud TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  notas_doctor TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE solicitudes_pacientes ENABLE ROW LEVEL SECURITY;

-- Política para permitir insertar desde la web (anónimo)
CREATE POLICY "Permitir insertar solicitudes" ON solicitudes_pacientes
  FOR INSERT WITH CHECK (true);

-- Política para que el doctor pueda ver/editar todo
CREATE POLICY "Doctor puede ver todo" ON solicitudes_pacientes
  FOR ALL USING (true);