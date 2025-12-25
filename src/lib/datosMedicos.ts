import { db } from './db'

// Datos simulados realistas para el sistema médico
export const datosMedicosSimulados = [
  {
    nombre: 'María Elena González',
    telefono: '2293690101',
    motivo: 'Ecografía obstétrica - Control prenatal semana 20',
    estado: 'agendado',
    notas: 'Embarazo gemelar, seguimiento especializado requerido'
  },
  {
    nombre: 'Carlos Hernández López',
    telefono: '2293690102', 
    motivo: 'Dolor abdominal superior derecho - 3 días evolución',
    estado: 'pendiente',
    notas: 'Paciente refiere dolor intenso, posible cólico biliar'
  },
  {
    nombre: 'Ana Patricia Ruiz',
    telefono: '2293690103',
    motivo: 'Ecocardiograma - Control hipertensión arterial',
    estado: 'contactado',
    notas: 'Paciente hipertensa de 5 años, último eco hace 1 año'
  },
  {
    nombre: 'José Manuel Torres',
    telefono: '2293690104',
    motivo: 'Ecografía renal - Seguimiento cálculos renales',
    estado: 'finalizado',
    notas: 'Paciente con antecedente de litiasis renal recurrente'
  },
  {
    nombre: 'Lupita Morales Vega',
    telefono: '2293690105',
    motivo: 'Ecografía pélvica - Irregularidades menstruales',
    estado: 'agendado',
    notas: 'Paciente 45 años, cambios en patrón menstrual últimos 6 meses'
  },
  {
    nombre: 'Roberto Jiménez Cruz',
    telefono: '2293690106',
    motivo: 'URGENTE - Dolor torácico y dificultad respiratoria',
    estado: 'pendiente',
    notas: 'Paciente masculino 58 años, dolor torácico de 2 horas evolución'
  },
  {
    nombre: 'Carmen Delgado Sánchez',
    telefono: '2293690107',
    motivo: 'Ecografía tiroidea - Nódulo palpable',
    estado: 'contactado',
    notas: 'Nódulo tiroideo detectado en consulta médica general'
  },
  {
    nombre: 'Fernando Castillo Méndez',
    telefono: '2293690108',
    motivo: 'Ecografía abdominal - Control diabetes',
    estado: 'agendado',
    notas: 'Diabético tipo 2, control de órganos abdominales'
  },
  {
    nombre: 'Silvia Ramírez Flores',
    telefono: '2293690109',
    motivo: 'Ecografía obstétrica - Primera consulta embarazo',
    estado: 'pendiente',
    notas: 'Amenorrea 8 semanas, primera consulta prenatal'
  },
  {
    nombre: 'Miguel Ángel Vargas',
    telefono: '2293690110',
    motivo: 'Ecocardiograma - Dolor precordial recurrente',
    estado: 'finalizado',
    notas: 'Paciente joven 28 años, episodios de dolor torácico atípico'
  }
]

// Función para poblar la base de datos con datos simulados
export async function poblarDatosSimulados() {
  try {
    console.log('Poblando base de datos con datos médicos simulados...')
    
    for (const paciente of datosMedicosSimulados) {
      await db.add({
        nombre: paciente.nombre,
        telefono: paciente.telefono,
        motivo: paciente.motivo,
        estado: paciente.estado,
        notas: paciente.notas
      })
    }
    
    console.log('✅ Datos simulados agregados exitosamente')
    return true
  } catch (error) {
    console.error('❌ Error poblando datos simulados:', error)
    return false
  }
}

// Interfaz para paciente
interface Paciente {
  id?: string
  nombre: string
  telefono: string
  motivo: string
  estado?: string
  notas?: string
  fecha_creacion?: string
}

// Análisis inteligente para el asistente IA
export function analizarDatosMedicos(pacientes: Paciente[]) {
  const analisis = {
    casosUrgentes: pacientes.filter((p: Paciente) => 
      p.motivo.toLowerCase().includes('urgente') ||
      p.motivo.toLowerCase().includes('dolor') ||
      p.motivo.toLowerCase().includes('torácico')
    ),
    
    seguimientosEspeciales: pacientes.filter((p: Paciente) =>
      p.motivo.toLowerCase().includes('control') ||
      p.motivo.toLowerCase().includes('seguimiento')
    ),
    
    embarazadas: pacientes.filter((p: Paciente) =>
      p.motivo.toLowerCase().includes('obstétrica') ||
      p.motivo.toLowerCase().includes('embarazo') ||
      p.motivo.toLowerCase().includes('prenatal')
    ),
    
    pendientesPrioritarios: pacientes.filter((p: Paciente) => 
      p.estado === 'pendiente' && (
        p.motivo.toLowerCase().includes('dolor') ||
        p.motivo.toLowerCase().includes('urgente')
      )
    )
  }
  
  return analisis
}

// Generar recomendaciones médicas inteligentes
export function generarRecomendacionesIA(analisis: any) {
  const recomendaciones = []
  
  if (analisis.casosUrgentes.length > 0) {
    recomendaciones.push({
      tipo: 'urgente',
      titulo: `⚠️ ${analisis.casosUrgentes.length} Caso(s) Urgente(s)`,
      contenido: `Pacientes con síntomas que requieren atención prioritaria: ${analisis.casosUrgentes.map((p: Paciente) => p.nombre).join(', ')}`,
      accion: 'Contactar inmediatamente para evaluación'
    })
  }
  
  if (analisis.embarazadas.length > 0) {
    recomendaciones.push({
      tipo: 'seguimiento',
      titulo: `🤱 ${analisis.embarazadas.length} Paciente(s) Embarazada(s)`,
      contenido: `Control prenatal programado. Verificar fechas de última menstruación y semanas de gestación.`,
      accion: 'Agendar controles prenatales regulares'
    })
  }
  
  if (analisis.pendientesPrioritarios.length > 0) {
    recomendaciones.push({
      tipo: 'accion',
      titulo: `📞 ${analisis.pendientesPrioritarios.length} Contacto(s) Prioritario(s)`,
      contenido: `Pacientes pendientes con síntomas que requieren pronta atención médica.`,
      accion: 'Contactar en las próximas 2 horas'
    })
  }
  
  return recomendaciones
}