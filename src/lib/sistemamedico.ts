// 🏥 SISTEMA MÉDICO TEMPORAL - Funciona sin Supabase
import { SolicitudConsulta } from '@/types/medico'
import fs from 'fs'
import path from 'path'

// 📁 Archivo temporal para datos
const DATA_FILE = path.join(process.cwd(), 'src', 'data', 'solicitudes-temp.json')

// 🔧 Asegurar directorio
function ensureDataDirectory() {
  const dataDir = path.dirname(DATA_FILE)
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// 🎭 TRANSFORMADOR: De formulario a solicitud
function transformarFormularioASolicitud(formData: any): SolicitudConsulta {
  return {
    id: `SOL-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    fechaSolicitud: new Date(),
    estado: 'pendiente',
    datosPersonales: {
      nombres: formData.nombres,
      apellidos: formData.apellidos || 'Campaña',
      fechaNacimiento: formData.fechaNacimiento || '1990-01-01',
      genero: formData.genero || 'otro',
      documentoIdentidad: formData.documentoIdentidad || 'TEMP-' + Date.now(),
      tipoDocumento: formData.tipoDocumento || 'otro'
    },
    motivoConsulta: {
      especialidad: formData.especialidad || 'medicina_general',
      sintomas: formData.sintomas,
      tiempoEvolucion: formData.tiempoEvolucion || 'No especificado',
      urgencia: formData.urgencia || 'media',
      descripcionDetallada: formData.descripcionDetallada || ''
    },
    antecedentesMedicos: {
      alergias: formData.alergias || '',
      medicamentosActuales: formData.medicamentosActuales || '',
      cirugiasPrevias: formData.cirugiasPrevias || '',
      enfermedadesCronicas: formData.enfermedadesCronicas || '',
      antecedenteFamiliar: formData.antecedenteFamiliar || ''
    },
    contacto: {
      telefono: formData.telefono,
      email: formData.email || 'temp@drmota.com',
      direccion: formData.direccion || '',
      ciudad: formData.ciudad || '',
      preferenciaContacto: formData.preferenciaContacto || 'telefono'
    }
  }
}

// 🏥 SISTEMA MÉDICO TEMPORAL
export const sistemamedico = {
  // 📖 OBTENER todas las solicitudes
  async obtenerSolicitudes(): Promise<SolicitudConsulta[]> {
    try {
      ensureDataDirectory()
      
      if (!fs.existsSync(DATA_FILE)) {
        return []
      }
      
      const data = fs.readFileSync(DATA_FILE, 'utf-8')
      const solicitudes = JSON.parse(data)
      
      // Convertir fechas de string a Date
      return solicitudes.map((s: any) => ({
        ...s,
        fechaSolicitud: new Date(s.fechaSolicitud)
      }))
    } catch (error) {
      console.error('🚨 Error obteniendo solicitudes:', error)
      return []
    }
  },

  // 💾 CREAR nueva solicitud
  async crearSolicitud(formData: any): Promise<{ success: boolean; id?: string; error?: string }> {
    try {
      ensureDataDirectory()
      
      const solicitud = transformarFormularioASolicitud(formData)
      const solicitudes = await this.obtenerSolicitudes()
      
      solicitudes.push(solicitud)
      
      fs.writeFileSync(DATA_FILE, JSON.stringify(solicitudes, null, 2))
      
      return { success: true, id: solicitud.id }
    } catch (error) {
      console.error('🚨 Error creando solicitud:', error)
      return { success: false, error: 'Error al guardar solicitud' }
    }
  },

  // 🔄 ACTUALIZAR solicitud existente
  async actualizarSolicitud(id: string, cambios: Partial<SolicitudConsulta>): Promise<boolean> {
    try {
      const solicitudes = await this.obtenerSolicitudes()
      const indice = solicitudes.findIndex(s => s.id === id)
      
      if (indice === -1) return false
      
      solicitudes[indice] = { ...solicitudes[indice], ...cambios }
      
      fs.writeFileSync(DATA_FILE, JSON.stringify(solicitudes, null, 2))
      
      return true
    } catch (error) {
      console.error('🚨 Error actualizando solicitud:', error)
      return false
    }
  },

  // 🗑️ ELIMINAR solicitud
  async eliminarSolicitud(id: string): Promise<boolean> {
    try {
      const solicitudes = await this.obtenerSolicitudes()
      const solicitudesFiltradas = solicitudes.filter(s => s.id !== id)
      
      if (solicitudesFiltradas.length === solicitudes.length) return false
      
      fs.writeFileSync(DATA_FILE, JSON.stringify(solicitudesFiltradas, null, 2))
      
      return true
    } catch (error) {
      console.error('🚨 Error eliminando solicitud:', error)
      return false
    }
  }
}