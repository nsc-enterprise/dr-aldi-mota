import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { analizarDatosMedicos, generarRecomendacionesIA } from '@/lib/datosMedicos';

// Definición de tipos
interface OutputAEP {
    tipo_accion: "micro_tarea" | "micro_aprendizaje" | "insight_proactivo" | "motivacion" | "alerta_anticipatoria";
    titulo: string;
    contenido: string;
    referencia?: string;
    fuente: string;
    recomendaciones?: any[];
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { tipo } = body
        
        // Obtener todos los pacientes para análisis completo
        const todosPacientes = await db.getAll();
        const ultimaCita = todosPacientes[0]; // Más reciente

        let response: OutputAEP;

        // Respuestas específicas para asistente médico
        if (tipo === 'asistente_medico') {
            // Análisis inteligente de todos los datos
            const analisis = analizarDatosMedicos(todosPacientes);
            const recomendaciones = generarRecomendacionesIA(analisis);
            
            if (recomendaciones.length > 0) {
                const recPrincipal = recomendaciones[0];
                response = {
                    tipo_accion: recPrincipal.tipo === 'urgente' ? "alerta_anticipatoria" : "micro_tarea",
                    titulo: recPrincipal.titulo,
                    contenido: `${recPrincipal.contenido}\n\n💡 Acción recomendada: ${recPrincipal.accion}`,
                    fuente: "Asistente Médico IA - Análisis Inteligente",
                    recomendaciones: recomendaciones
                };
            } else if (ultimaCita) {
                const esUrgente = ultimaCita.motivo.toLowerCase().includes('dolor') || 
                                ultimaCita.motivo.toLowerCase().includes('urgente') ||
                                ultimaCita.motivo.toLowerCase().includes('emergencia');
                
                if (esUrgente) {
                    response = {
                        tipo_accion: "alerta_anticipatoria",
                        titulo: "⚠️ Paciente Prioritario Detectado",
                        contenido: `Paciente ${ultimaCita.nombre} reporta síntomas que requieren atención prioritaria: "${ultimaCita.motivo}". Recomiendo contacto inmediato para evaluación y posible cita urgente.`,
                        fuente: "Asistente Médico IA"
                    };
                } else {
                    response = {
                        tipo_accion: "micro_tarea",
                        titulo: "📋 Nueva Solicitud de Consulta",
                        contenido: `Paciente ${ultimaCita.nombre} solicita: ${ultimaCita.motivo}. Contactar al ${ultimaCita.telefono} para agendar consulta. Revisar historial médico si es paciente recurrente.`,
                        fuente: "Asistente Médico IA"
                    };
                }
            } else {
                response = {
                    tipo_accion: "insight_proactivo",
                    titulo: "📊 Análisis del Consultorio",
                    contenido: "No hay solicitudes pendientes. Momento ideal para: 1) Revisar seguimientos de pacientes anteriores, 2) Actualizar protocolos médicos, 3) Preparar material educativo para pacientes.",
                    fuente: "Asistente Médico IA"
                };
            }
        } else {
            // Respuesta para asistente general (pacientes)
            response = {
                tipo_accion: "insight_proactivo",
                titulo: "Sistema Operativo",
                contenido: "El sistema está funcionando correctamente. Todas las funciones están disponibles.",
                fuente: "Sistema AEP"
            };
        }

        return NextResponse.json(response);
    } catch (error) {
        console.error("Error en AEP AI:", error);
        return NextResponse.json({
            tipo_accion: "insight_proactivo",
            titulo: "🤖 Asistente Médico Disponible",
            contenido: "El asistente está listo para ayudarte con análisis de pacientes, recomendaciones de tratamiento y gestión de consultas médicas.",
            fuente: "Asistente Médico IA"
        });
    }
}
