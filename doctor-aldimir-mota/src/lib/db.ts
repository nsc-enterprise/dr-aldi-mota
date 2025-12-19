import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

/**
 * Initialize Supabase client
 * Falls back to demo mode if credentials are missing
 * Read environment variables lazily inside initSupabase to avoid build-time
 * evaluation that can happen during Next.js prerender.
 */

/**
 * Validate if a string is a valid URL
 */
function isValidUrl(urlString: string): boolean {
  if (!urlString || urlString.trim().length === 0) return false;
  try {
    new URL(urlString);
    return true;
  } catch {
    return false;
  }
}

// Lazy initialization to avoid build-time errors when env vars are missing
let _supabase: SupabaseClient<Database> | null = null;
let _initAttempted = false;

function initSupabase(): SupabaseClient<Database> | null {
  // Return cached client if already initialized
  if (_supabase) return _supabase;
  
  // Don't retry if we already tried and failed
  if (_initAttempted) return null;
  
  _initAttempted = true;
  // Read env vars at runtime (not module load) to avoid empty values during build
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  // Validate URL format before attempting to create client
  if (!isValidUrl(supabaseUrl)) {
    if (typeof window === 'undefined') {
      // Server-side: log warning but don't throw (allows build to continue)
      console.warn('Supabase URL is not configured or invalid. Database operations will be disabled.');
    }
    return null;
  }

  if (!supabaseKey || supabaseKey.trim().length === 0) {
    if (typeof window === 'undefined') {
      console.warn('Supabase key is not configured. Database operations will be disabled.');
    }
    return null;
  }
  
  try {
    _supabase = createClient<Database>(supabaseUrl, supabaseKey);
  } catch (error) {
    console.error('Failed to initialize Supabase client:', error);
    return null;
  }
  
  return _supabase;
}

/**
 * Get the typed Supabase client
 * @throws Error if Supabase is not configured
 */
function getSupabase(): SupabaseClient<Database> {
  const client = initSupabase();
  if (!client) {
    throw new Error('Supabase not configured. Please set SUPABASE_URL and SUPABASE_SERVICE_KEY environment variables.');
  }
  return client;
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
    if (!initSupabase()) {
      console.warn('Supabase not configured - returning empty array');
      return [];
    }

    try {
      const { data, error } = await getSupabase()
        .from('citas')
        .select('*')
        .order('fecha_creacion', { ascending: false });

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
    try {
      const newCita: Database['public']['Tables']['citas']['Insert'] = {
        nombre: cita.nombre,
        telefono: cita.telefono,
        motivo: cita.motivo,
        estado: 'pendiente'
      };
      
      const { data, error } = await (getSupabase()
        .from('citas') as any)
        .insert([newCita])
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
    try {
      const updateData: Database['public']['Tables']['citas']['Update'] = updates;
      
      const { data, error } = await (getSupabase()
        .from('citas') as any)
        .update(updateData)
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
    try {
      const { error } = await getSupabase()
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
    if (!initSupabase()) {
      console.warn('Supabase not configured - returning null');
      return null;
    }

    try {
      const { data, error } = await getSupabase()
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
