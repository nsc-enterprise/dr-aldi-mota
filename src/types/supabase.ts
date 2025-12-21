// 🏥 ESQUEMA MÉDICO UNIFICADO - La única fuente de verdad
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      // 📋 TABLA PRINCIPAL: Solicitudes médicas completas
      solicitudes_medicas: {
        Row: {
          id: string
          // Metadatos
          fecha_solicitud: string
          estado: 'pendiente' | 'en_revision' | 'contactado' | 'cita_agendada' | 'completado' | 'cancelado'
          // Datos personales
          nombres: string
          apellidos: string
          fecha_nacimiento: string
          genero: 'masculino' | 'femenino' | 'otro'
          documento_identidad: string
          tipo_documento: 'cedula' | 'pasaporte' | 'otro'
          // Contacto
          telefono: string
          email: string
          direccion: string | null
          ciudad: string | null
          preferencia_contacto: 'telefono' | 'email' | 'whatsapp'
          // Motivo médico
          especialidad: 'medicina_general' | 'cardiologia' | 'dermatologia' | 'ginecologia' | 'pediatria' | 'neurologia' | 'traumatologia' | 'psiquiatria' | 'oftalmologia' | 'otorrinolaringologia' | 'urologia' | 'endocrinologia'
          sintomas: string
          tiempo_evolucion: string
          urgencia: 'baja' | 'media' | 'alta' | 'urgente'
          descripcion_detallada: string | null
          // Antecedentes
          alergias: string | null
          medicamentos_actuales: string | null
          cirugias_previas: string | null
          enfermedades_cronicas: string | null
          antecedente_familiar: string | null
          // Notas del doctor
          notas: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          fecha_solicitud?: string
          estado?: 'pendiente' | 'en_revision' | 'contactado' | 'cita_agendada' | 'completado' | 'cancelado'
          nombres: string
          apellidos: string
          fecha_nacimiento: string
          genero: 'masculino' | 'femenino' | 'otro'
          documento_identidad: string
          tipo_documento?: 'cedula' | 'pasaporte' | 'otro'
          telefono: string
          email: string
          direccion?: string | null
          ciudad?: string | null
          preferencia_contacto?: 'telefono' | 'email' | 'whatsapp'
          especialidad: 'medicina_general' | 'cardiologia' | 'dermatologia' | 'ginecologia' | 'pediatria' | 'neurologia' | 'traumatologia' | 'psiquiatria' | 'oftalmologia' | 'otorrinolaringologia' | 'urologia' | 'endocrinologia'
          sintomas: string
          tiempo_evolucion: string
          urgencia?: 'baja' | 'media' | 'alta' | 'urgente'
          descripcion_detallada?: string | null
          alergias?: string | null
          medicamentos_actuales?: string | null
          cirugias_previas?: string | null
          enfermedades_cronicas?: string | null
          antecedente_familiar?: string | null
          notas?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          fecha_solicitud?: string
          estado?: 'pendiente' | 'en_revision' | 'contactado' | 'cita_agendada' | 'completado' | 'cancelado'
          nombres?: string
          apellidos?: string
          fecha_nacimiento?: string
          genero?: 'masculino' | 'femenino' | 'otro'
          documento_identidad?: string
          tipo_documento?: 'cedula' | 'pasaporte' | 'otro'
          telefono?: string
          email?: string
          direccion?: string | null
          ciudad?: string | null
          preferencia_contacto?: 'telefono' | 'email' | 'whatsapp'
          especialidad?: 'medicina_general' | 'cardiologia' | 'dermatologia' | 'ginecologia' | 'pediatria' | 'neurologia' | 'traumatologia' | 'psiquiatria' | 'oftalmologia' | 'otorrinolaringologia' | 'urologia' | 'endocrinologia'
          sintomas?: string
          tiempo_evolucion?: string
          urgencia?: 'baja' | 'media' | 'alta' | 'urgente'
          descripcion_detallada?: string | null
          alergias?: string | null
          medicamentos_actuales?: string | null
          cirugias_previas?: string | null
          enfermedades_cronicas?: string | null
          antecedente_familiar?: string | null
          notas?: string | null
          created_at?: string
          updated_at?: string
        }
      }

    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
