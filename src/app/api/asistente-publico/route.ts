import { NextResponse } from 'next/server'

// Asistente público - SIN acceso a datos médicos privados
interface RespuestaPublica {
  tipo: 'informacion' | 'ayuda' | 'contacto'
  titulo: string
  contenido: string
  fuente: string
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { consulta, contexto } = body

    let respuesta: RespuestaPublica

    // Respuestas seguras y generales para pacientes
    const respuestasPublicas = [
      {
        tipo: 'informacion' as const,
        titulo: '🏥 Información del Consultorio',
        contenido: 'El Dr. Aldimir Mota se especializa en ultrasonidos diagnósticos. Horarios: Lun-Vie 8AM-6PM, Sáb 8AM-2PM. Ubicación: Av. Adolfo Ruiz Cortinez #300, Tres Valles, Veracruz.',
        fuente: 'Asistente Virtual'
      },
      {
        tipo: 'ayuda' as const,
        titulo: '📋 Ayuda con Formularios',
        contenido: 'Para agendar tu cita, completa el formulario con tus datos personales y selecciona el tipo de ultrasonido que necesitas. Te contactaremos en las próximas 2 horas.',
        fuente: 'Asistente Virtual'
      },
      {
        tipo: 'contacto' as const,
        titulo: '📞 Contacto Directo',
        contenido: 'Puedes contactarnos directamente: Teléfono: 229 369 0042, Email: medicinmota@outlook.com, o WhatsApp para consultas rápidas.',
        fuente: 'Asistente Virtual'
      },
      {
        tipo: 'informacion' as const,
        titulo: '🔬 Tipos de Estudios',
        contenido: 'Realizamos: Ecografías obstétricas, abdominales, pélvicas, tiroideas, renales, ecocardiogramas y estudios vasculares. Todos con tecnología de última generación.',
        fuente: 'Asistente Virtual'
      },
      {
        tipo: 'ayuda' as const,
        titulo: '⏰ Preparación para Estudios',
        contenido: 'Para ecografía abdominal: ayuno de 8 horas. Para ecografía pélvica: vejiga llena. Para otros estudios, te informaremos las indicaciones específicas al agendar.',
        fuente: 'Asistente Virtual'
      },
      {
        tipo: 'informacion' as const,
        titulo: '🎯 Especialidades',
        contenido: 'El Dr. Mota cuenta con amplia experiencia en diagnóstico por ultrasonido, medicina general y seguimiento de pacientes crónicos. Atención personalizada y profesional.',
        fuente: 'Asistente Virtual'
      }
    ]

    // Seleccionar respuesta aleatoria (simulando IA)
    respuesta = respuestasPublicas[Math.floor(Math.random() * respuestasPublicas.length)]

    return NextResponse.json({
      success: true,
      respuesta: respuesta,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Error en asistente público:', error)
    return NextResponse.json({
      success: true,
      respuesta: {
        tipo: 'ayuda',
        titulo: '🤖 Asistente Virtual Disponible',
        contenido: 'Estoy aquí para ayudarte con información sobre el consultorio, tipos de estudios y cómo agendar tu cita. ¿En qué puedo asistirte?',
        fuente: 'Asistente Virtual'
      }
    })
  }
}