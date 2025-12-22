import fs from 'fs'
import path from 'path'

const DB_PATH = path.join(process.cwd(), 'src/data/citas.json')

export interface Cita {
  id: string
  nombre: string
  telefono: string
  motivo: string
  fecha_creacion: string
  estado?: string
  notas?: string
}

function readDB(): Cita[] {
  try {
    if (!fs.existsSync(DB_PATH)) {
      fs.writeFileSync(DB_PATH, '[]')
      return []
    }
    const data = fs.readFileSync(DB_PATH, 'utf8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

function writeDB(data: Cita[]): void {
  try {
    const dir = path.dirname(DB_PATH)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2))
  } catch (error) {
    console.error('Error writing to database:', error)
  }
}

export const db = {
  getAll: async (): Promise<Cita[]> => {
    return readDB().sort((a, b) => new Date(b.fecha_creacion).getTime() - new Date(a.fecha_creacion).getTime())
  },

  add: async (cita: Omit<Cita, 'id' | 'fecha_creacion'>) => {
    const data = readDB()
    const newCita: Cita = {
      id: Date.now().toString(),
      ...cita,
      fecha_creacion: new Date().toISOString(),
      estado: 'pendiente'
    }
    data.push(newCita)
    writeDB(data)
    return newCita
  },

  update: async (id: string, updates: Partial<Cita>) => {
    const data = readDB()
    const index = data.findIndex(item => item.id === id)
    if (index === -1) return null
    
    data[index] = { ...data[index], ...updates }
    writeDB(data)
    return data[index]
  },

  delete: async (id: string) => {
    const data = readDB()
    const filtered = data.filter(item => item.id !== id)
    if (filtered.length === data.length) return false
    
    writeDB(filtered)
    return true
  }
}