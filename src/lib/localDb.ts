import fs from 'fs/promises'
import path from 'path'

export interface Cita {
  id: string
  nombre: string
  telefono: string
  motivo: string
  fecha_creacion: string
  estado?: 'pendiente' | 'contactado' | 'agendado' | 'cancelado' | 'finalizado'
  notas?: string
}

const DATA_FILE = path.join(process.cwd(), 'src/data/citas.json')

// Generar ID único
function generateId(): string {
  return Math.random().toString(36).substring(2, 8)
}

// Leer datos del archivo JSON
async function readData(): Promise<Cita[]> {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    // Si el archivo no existe, crear uno vacío
    await writeData([])
    return []
  }
}

// Escribir datos al archivo JSON
async function writeData(citas: Cita[]): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(citas, null, 2))
}

export const db = {
  getAll: async (): Promise<Cita[]> => {
    return await readData()
  },

  add: async (cita: Omit<Cita, 'id' | 'fecha_creacion' | 'estado'>): Promise<Cita> => {
    const citas = await readData()
    const newCita: Cita = {
      ...cita,
      id: generateId(),
      fecha_creacion: new Date().toISOString(),
      estado: 'pendiente'
    }
    citas.push(newCita)
    await writeData(citas)
    return newCita
  },

  update: async (id: string, updates: Partial<Cita>): Promise<Cita | null> => {
    const citas = await readData()
    const index = citas.findIndex(c => c.id === id)
    if (index === -1) return null
    
    citas[index] = { ...citas[index], ...updates }
    await writeData(citas)
    return citas[index]
  },

  delete: async (id: string): Promise<boolean> => {
    const citas = await readData()
    const filteredCitas = citas.filter(c => c.id !== id)
    if (filteredCitas.length === citas.length) return false
    
    await writeData(filteredCitas)
    return true
  },

  getLast: async (): Promise<Cita | null> => {
    const citas = await readData()
    if (citas.length === 0) return null
    return citas[citas.length - 1]
  }
}