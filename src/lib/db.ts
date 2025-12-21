import { createClient } from '@supabase/supabase-js';

/**
 * Initialize Supabase client
 * Falls back to demo mode if credentials are missing
 */
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY || '';

let supabase: ReturnType<typeof createClient> | null = null;

if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
}

/**
 * Interfaz que representa una cita médica
 */
export interface Cita {
  /** Identificador único de la cita */
  id: string;
  /** Nombre completo del paciente */
  nombre: string;
  /** Número de teléfono del paciente */
  telefono: string;
  /** Motivo de la consulta */
  motivo: string;
  /** Fecha de creación de la cita en formato ISO */
  fecha_creacion: string;
  /** Estado actual de la cita */
  estado?: 'pendiente' | 'contactado' | 'agendado' | 'cancelado' | 'finalizado';
  /** Notas adicionales sobre la cita */
  notas?: string;
}

/**
 * Objeto que contiene todas las operaciones de base de datos para citas
 */
export const db = {
  /**
   * Obtiene todas las citas de la base de datos
   * @returns Array de citas o array vacío si hay error
   */
  getAll: async (): Promise<Cita[]> => {
    if (!supabase) {
      console.warn('Supabase not configured - returning empty array');
      return [];
    }

    try {
      const { data, error } = await supabase
        .from('solicitudes_pacientes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching citas:', error);
      return [];
    }
  },

  /**
   * Agrega una nueva cita a la base de datos
   * @param cita - Datos de la cita (sin id, fecha_creacion ni estado)
   * @returns La cita creada con todos sus campos
   */
  add: async (cita: Omit<Cita, 'id' | 'fecha_creacion' | 'estado'>) => {
    if (!supabase) {
      throw new Error('Supabase not configured. Please set SUPABASE_URL and SUPABASE_SERVICE_KEY environment variables.');
    }

    try {
      const { data, error } = await supabase
        .from('solicitudes_pacientes')
        .insert([
          {
            nombre: cita.nombre,
            telefono: cita.telefono,
            tipo_ultrasonido: cita.motivo,
            estado: 'pendiente'
          }
        ])
        .select()
        .single();

      if (error) throw error;
      return data as Cita;
    } catch (error) {
      console.error('Error adding cita:', error);
      throw error;
    }
  },

  /**
   * Actualiza una cita existente
   * @param id - Identificador de la cita a actualizar
   * @param updates - Campos a actualizar
   * @returns La cita actualizada o null si no se encuentra
   */
  update: async (id: string, updates: Partial<Cita>) => {
    if (!supabase) {
      throw new Error('Supabase not configured');
    }

    try {
      const { data, error } = await supabase
        .from('citas')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Cita;
    } catch (error) {
      console.error('Error updating cita:', error);
      return null;
    }
  },

  /**
   * Elimina una cita de la base de datos
   * @param id - Identificador de la cita a eliminar
   * @returns true si se eliminó, false si no se encontró
   */
  delete: async (id: string) => {
    if (!supabase) {
      throw new Error('Supabase not configured');
    }

    try {
      const { error } = await supabase
        .from('citas')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting cita:', error);
      return false;
    }
  },

  /**
   * Obtiene la última cita registrada
   * @returns La última cita o null si no hay ninguna
   */
  getLast: async (): Promise<Cita | null> => {
    if (!supabase) {
      console.warn('Supabase not configured - returning null');
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('citas')
        .select('*')
        .order('fecha_creacion', { ascending: false })
        .limit(1)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No rows returned - this is expected when table is empty
          return null;
        }
        throw error;
      }
      return data as Cita;
    } catch (error) {
      console.error('Error fetching last cita:', error);
      return null;
    }
  }
};
