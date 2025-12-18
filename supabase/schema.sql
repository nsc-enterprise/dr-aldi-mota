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

-- ============================================
-- CHAT SYSTEM TABLES
-- ============================================

-- Create users table for chat participants
CREATE TABLE IF NOT EXISTS chat_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  nombre VARCHAR(255) NOT NULL,
  avatar_url TEXT,
  role VARCHAR(20) DEFAULT 'patient' CHECK (role IN ('patient', 'doctor', 'admin')),
  last_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create conversations table
CREATE TABLE IF NOT EXISTS conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID REFERENCES chat_users(id) ON DELETE CASCADE,
  doctor_id UUID REFERENCES chat_users(id) ON DELETE CASCADE,
  last_message TEXT,
  last_message_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  unread_count_patient INTEGER DEFAULT 0,
  unread_count_doctor INTEGER DEFAULT 0,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'archived', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES chat_users(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  type VARCHAR(20) DEFAULT 'text' CHECK (type IN ('text', 'image', 'file', 'system')),
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_conversations_patient ON conversations(patient_id);
CREATE INDEX IF NOT EXISTS idx_conversations_doctor ON conversations(doctor_id);
CREATE INDEX IF NOT EXISTS idx_conversations_updated ON conversations(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON messages(conversation_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_chat_users_email ON chat_users(email);

-- Trigger to update conversation on new message
CREATE OR REPLACE FUNCTION update_conversation_on_message()
RETURNS TRIGGER AS $$
DECLARE
  sender_role VARCHAR(20);
BEGIN
  -- Get sender role
  SELECT role INTO sender_role FROM chat_users WHERE id = NEW.sender_id;
  
  -- Update conversation
  UPDATE conversations 
  SET 
    last_message = NEW.content,
    last_message_at = NEW.created_at,
    updated_at = NEW.created_at,
    unread_count_patient = CASE 
      WHEN sender_role = 'doctor' THEN unread_count_patient + 1 
      ELSE unread_count_patient 
    END,
    unread_count_doctor = CASE 
      WHEN sender_role = 'patient' THEN unread_count_doctor + 1 
      ELSE unread_count_doctor 
    END
  WHERE id = NEW.conversation_id;
  
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER trigger_update_conversation_on_message
  AFTER INSERT ON messages
  FOR EACH ROW
  EXECUTE FUNCTION update_conversation_on_message();

-- Trigger to update conversation updated_at
CREATE TRIGGER update_conversations_updated_at
  BEFORE UPDATE ON conversations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE chat_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for chat_users
CREATE POLICY "Users can view all chat users" 
  ON chat_users 
  FOR SELECT 
  USING (true);

CREATE POLICY "Users can update their own profile" 
  ON chat_users 
  FOR UPDATE 
  USING (true) 
  WITH CHECK (true);

CREATE POLICY "Allow insert chat users" 
  ON chat_users 
  FOR INSERT 
  WITH CHECK (true);

-- RLS Policies for conversations
CREATE POLICY "Users can view their own conversations" 
  ON conversations 
  FOR SELECT 
  USING (true);

CREATE POLICY "Users can create conversations" 
  ON conversations 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Users can update their own conversations" 
  ON conversations 
  FOR UPDATE 
  USING (true) 
  WITH CHECK (true);

-- RLS Policies for messages
CREATE POLICY "Users can view messages in their conversations" 
  ON messages 
  FOR SELECT 
  USING (true);

CREATE POLICY "Users can send messages" 
  ON messages 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Users can update their own messages" 
  ON messages 
  FOR UPDATE 
  USING (true) 
  WITH CHECK (true);
