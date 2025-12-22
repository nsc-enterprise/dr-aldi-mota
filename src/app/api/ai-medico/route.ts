import { NextResponse } from 'next/server';
import { db } from '@/lib/localDb';

// Definición de tipos
interface OutputAEP {
    tipo_accion: "micro_tarea" | "micro_aprendizaje" | "insight_proactivo" | "motivacion" | "alerta_anticipatoria";
    titulo: string;
    contenido: string;
    referencia?: string;
    fuente: string;
}

export async function POST(request: Request) {
    try {
        const ultimaCita = await db.getLast();

        // Respuestas simuladas basadas en el contexto
        let response: OutputAEP;

        if (ultimaCita) {
            // Si hay una cita reciente, generar acción relevante
            const esUrgente = ultimaCita.motivo.toLowerCase().includes('dolor') || 
                            ultimaCita.motivo.toLowerCase().includes('urgente') ||
                            ultimaCita.motivo.toLowerCase().includes('emergencia');
            
            if (esUrgente) {
                response = {
                    tipo_accion: "alerta_anticipatoria",
                    titulo: "Paciente con Posible Urgencia",
                    contenido: `El paciente ${ultimaCita.nombre} reportó: "${ultimaCita.motivo}". Considerar contacto prioritario para evaluación rápida.`,
                    referencia: ultimaCita.nombre,
                    fuente: "Análisis AEP"
                };
            } else {
                response = {
                    tipo_accion: "micro_tarea",
                    titulo: "Nueva Solicitud Pendiente",
                    contenido: `Contactar a ${ultimaCita.nombre} (${ultimaCita.telefono}) para agendar cita de: ${ultimaCita.motivo}`,
                    referencia: ultimaCita.nombre,
                    fuente: "Formulario Web"
                };
            }
        } else {
            // Si no hay citas, generar insight proactivo
            response = {
                tipo_accion: "insight_proactivo",
                titulo: "Optimizar Captación de Pacientes",
                contenido: "No hay solicitudes nuevas. Considera revisar las campañas de marketing o contactar pacientes anteriores para seguimiento.",
                fuente: "Sistema AEP"
            };
        }

        return NextResponse.json(response);
    } catch (error) {
        console.error("Error en AEP AI:", error);
        return NextResponse.json({
            tipo_accion: "alerta_anticipatoria",
            titulo: "Sistema en Modo Simulación",
            contenido: "El asistente está funcionando en modo simulación. Todas las funciones están operativas para demostración.",
            fuente: "Sistema AEP"
        });
    }
}
