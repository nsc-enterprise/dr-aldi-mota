-- Create the citas (appointments) table
CREATE TABLE IF NOT EXISTS citas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  telefono VARCHAR(20) NOT NULL,
  motivo TEXT NOT NULL,
  fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  estado VARCHAR(20) DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'contactado', 'agendado', 'cancelado', 'finalizado')),
  notas TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on fecha_creacion for faster queries
CREATE INDEX IF NOT EXISTS idx_citas_fecha_creacion ON citas(fecha_creacion DESC);

-- Create an index on estado for filtering
CREATE INDEX IF NOT EXISTS idx_citas_estado ON citas(estado);

-- Create a trigger to automatically update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_citas_updated_at
  BEFORE UPDATE ON citas
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE citas ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (you can restrict this later based on auth)
CREATE POLICY "Allow all operations on citas" 
  ON citas 
  FOR ALL 
  USING (true) 
  WITH CHECK (true);

-- Note: In production, you should create more restrictive policies based on authentication
-- Example for authenticated users only:
-- CREATE POLICY "Authenticated users can do everything" 
--   ON citas 
--   FOR ALL 
--   USING (auth.role() = 'authenticated');
