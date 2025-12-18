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
