import fs from 'fs'
import path from 'path'
import { SolicitudConsulta } from '@/types/medico'

// 📁 Aquí definimos DÓNDE vamos a guardar nuestros datos
const DATA_FILE = path.join(process.cwd(), 'src', 'data', 'solicitudes.json')

// 🔧 Función para asegurar que existe la carpeta donde guardamos datos
function ensureDataDirectory() {
  const dataDir = path.dirname(DATA_FILE)
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// 📖 Función para LEER todas las solicitudes guardadas
export function leerSolicitudes(): SolicitudConsulta[] {
  try {
    ensureDataDirectory()
    
    // Si el archivo no existe, devolvemos una lista vacía
    if (!fs.existsSync(DATA_FILE)) {
      return []
    }
    
    // Leemos el archivo y lo convertimos de JSON a objetos JavaScript
    const data = fs.readFileSync(DATA_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error leyendo solicitudes:', error)
    return []
  }
}

// 💾 Función para GUARDAR una nueva solicitud
export function guardarSolicitud(solicitud: SolicitudConsulta): boolean {
  try {
    ensureDataDirectory()
    
    // Leemos las solicitudes existentes
    const solicitudes = leerSolicitudes()
    
    // Agregamos la nueva solicitud a la lista
    solicitudes.push(solicitud)
    
    // Guardamos todo de vuelta al archivo
    fs.writeFileSync(DATA_FILE, JSON.stringify(solicitudes, null, 2))
    
    return true
  } catch (error) {
    console.error('Error guardando solicitud:', error)
    return false
  }
}

// 🔄 Función para ACTUALIZAR una solicitud existente
export function actualizarSolicitud(id: string, cambios: Partial<SolicitudConsulta>): boolean {
  try {
    const solicitudes = leerSolicitudes()
    
    // Buscamos la solicitud por su ID
    const indice = solicitudes.findIndex(s => s.id === id)
    
    if (indice === -1) {
      return false // No encontramos la solicitud
    }
    
    // Actualizamos la solicitud mezclando los datos existentes con los cambios
    solicitudes[indice] = { ...solicitudes[indice], ...cambios }
    
    // Guardamos los cambios
    fs.writeFileSync(DATA_FILE, JSON.stringify(solicitudes, null, 2))
    
    return true
  } catch (error) {
    console.error('Error actualizando solicitud:', error)
    return false
  }
}

// 🗑️ Función para ELIMINAR una solicitud
export function eliminarSolicitud(id: string): boolean {
  try {
    const solicitudes = leerSolicitudes()
    
    // Filtramos todas las solicitudes EXCEPTO la que queremos eliminar
    const solicitudesFiltradas = solicitudes.filter(s => s.id !== id)
    
    // Si el tamaño cambió, significa que sí eliminamos algo
    if (solicitudesFiltradas.length === solicitudes.length) {
      return false // No encontramos nada que eliminar
    }
    
    // Guardamos la lista sin la solicitud eliminada
    fs.writeFileSync(DATA_FILE, JSON.stringify(solicitudesFiltradas, null, 2))
    
    return true
  } catch (error) {
    console.error('Error eliminando solicitud:', error)
    return false
  }
}