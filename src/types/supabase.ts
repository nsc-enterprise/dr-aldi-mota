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
      solicitudes_pacientes: {
        Row: {
          id: string
          nombre: string
          telefono: string
          motivo: string
          estado: 'pendiente' | 'contactado' | 'agendado' | 'cancelado' | 'finalizado'
          notas: string | null
          created_at: string
        }
        Insert: {
          nombre: string
          telefono: string
          motivo: string
          estado?: 'pendiente' | 'contactado' | 'agendado' | 'cancelado' | 'finalizado'
          notas?: string | null
        }
        Update: {
          nombre?: string
          telefono?: string
          motivo?: string
          estado?: 'pendiente' | 'contactado' | 'agendado' | 'cancelado' | 'finalizado'
          notas?: string | null
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