// Database types for Supabase
// Defines the schema for the citas table

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      citas: {
        Row: {
          id: string
          nombre: string
          telefono: string
          motivo: string
          fecha_creacion: string
          estado: 'pendiente' | 'contactado' | 'agendado' | 'cancelado' | 'finalizado'
          notas: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          nombre: string
          telefono: string
          motivo: string
          fecha_creacion?: string
          estado?: 'pendiente' | 'contactado' | 'agendado' | 'cancelado' | 'finalizado'
          notas?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          nombre?: string
          telefono?: string
          motivo?: string
          fecha_creacion?: string
          estado?: 'pendiente' | 'contactado' | 'agendado' | 'cancelado' | 'finalizado'
          notas?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      chat_users: {
        Row: {
          id: string
          email: string
          nombre: string
          avatar_url: string | null
          role: 'patient' | 'doctor' | 'admin'
          last_seen: string
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          nombre: string
          avatar_url?: string | null
          role?: 'patient' | 'doctor' | 'admin'
          last_seen?: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          nombre?: string
          avatar_url?: string | null
          role?: 'patient' | 'doctor' | 'admin'
          last_seen?: string
          created_at?: string
        }
      }
      conversations: {
        Row: {
          id: string
          patient_id: string
          doctor_id: string
          last_message: string | null
          last_message_at: string
          unread_count_patient: number
          unread_count_doctor: number
          status: 'active' | 'archived' | 'closed'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          patient_id: string
          doctor_id: string
          last_message?: string | null
          last_message_at?: string
          unread_count_patient?: number
          unread_count_doctor?: number
          status?: 'active' | 'archived' | 'closed'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          patient_id?: string
          doctor_id?: string
          last_message?: string | null
          last_message_at?: string
          unread_count_patient?: number
          unread_count_doctor?: number
          status?: 'active' | 'archived' | 'closed'
          created_at?: string
          updated_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          conversation_id: string
          sender_id: string
          content: string
          type: 'text' | 'image' | 'file' | 'system'
          is_read: boolean
          read_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          conversation_id: string
          sender_id: string
          content: string
          type?: 'text' | 'image' | 'file' | 'system'
          is_read?: boolean
          read_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          conversation_id?: string
          sender_id?: string
          content?: string
          type?: 'text' | 'image' | 'file' | 'system'
          is_read?: boolean
          read_at?: string | null
          created_at?: string
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
