import fs from 'fs';
import path from 'path';

// Definimos la ruta al archivo JSON que actuará como base de datos
const dbPath = path.join(process.cwd(), 'src', 'data', 'citas.json');

export interface Cita {
  id: string;
  nombre: string;
  telefono: string;
  motivo: string;
  fecha_creacion: string;
  estado?: 'pendiente' | 'contactado' | 'agendado' | 'cancelado';
  notas?: string;
}

export const db = {
  // Leer todas las citas
  getAll: (): Cita[] => {
    try {
      const data = fs.readFileSync(dbPath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  },

  // Guardar una nueva cita
  add: (cita: Omit<Cita, 'id' | 'fecha_creacion' | 'estado'>) => {
    const citas = db.getAll();
    const nuevaCita: Cita = {
      id: Math.random().toString(36).substring(7),
      fecha_creacion: new Date().toISOString(),
      estado: 'pendiente',
      ...cita
    };
    
    citas.push(nuevaCita);
    fs.writeFileSync(dbPath, JSON.stringify(citas, null, 2));
    return nuevaCita;
  },

  // Actualizar una cita
  update: (id: string, updates: Partial<Cita>) => {
    const citas = db.getAll();
    const index = citas.findIndex(c => c.id === id);
    
    if (index !== -1) {
      citas[index] = { ...citas[index], ...updates };
      fs.writeFileSync(dbPath, JSON.stringify(citas, null, 2));
      return citas[index];
    }
    return null;
  },

  // Eliminar una cita
  delete: (id: string) => {
    let citas = db.getAll();
    const initialLength = citas.length;
    citas = citas.filter(c => c.id !== id);
    
    if (citas.length !== initialLength) {
      fs.writeFileSync(dbPath, JSON.stringify(citas, null, 2));
      return true;
    }
    return false;
  },

  // Obtener la última cita (para la demo de IA)
  getLast: (): Cita | null => {
    const citas = db.getAll();
    return citas.length > 0 ? citas[citas.length - 1] : null;
  }
};
