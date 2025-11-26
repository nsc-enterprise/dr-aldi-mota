// app/api/aep-ia/route.ts

import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Definición de tipos
interface OutputAEP {
    tipo_accion: "micro_tarea" | "micro_aprendizaje" | "insight_proactivo" | "motivacion" | "alerta_anticipatoria";
    titulo: string;
    contenido: string;
    referencia?: string;
    fuente: string;
}

// Inicializar Gemini
// NOTA: Si no hay API Key, usaremos el modo simulación para que no falle la app
const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function POST(request: Request) {
    try {
        // 1. Obtener contexto (última cita y estado del usuario)
        const body = await request.json(); // Contexto enviado desde el front (opcional)
        const ultimaCita = db.getLast();

        // Si no hay API Key configurada, volvemos al modo simulación
        if (!genAI) {
            console.warn("⚠️ No se encontró GEMINI_API_KEY. Usando modo simulación.");
            return NextResponse.json(generarSimulacion(ultimaCita));
        }

        // 2. Construir el Prompt para la IA
        // Usamos gemini-pro que es el modelo estándar para la API v1beta
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `
            Actúa como el "Asistente Estratégico Proactivo" (AEP) del Dr. Aldimir Mota.
            Tu objetivo es analizar la situación actual y generar UNA sola acción concreta y de alto valor.

            CONTEXTO ACTUAL:
            ${ultimaCita 
                ? `Hay una nueva solicitud de paciente:
                   - Nombre: ${ultimaCita.nombre}
                   - Motivo: "${ultimaCita.motivo}"
                   - Teléfono: ${ultimaCita.telefono}
                   - Recibido: ${ultimaCita.fecha_creacion}`
                : "No hay citas nuevas pendientes en este momento."
            }

            INSTRUCCIONES:
            1. Analiza la gravedad y urgencia del motivo de la cita (si existe).
            2. Si es urgente, genera una "alerta_anticipatoria" o "micro_tarea".
            3. Si no es urgente o no hay citas, genera un "insight_proactivo" o "motivacion".
            4. Responde EXCLUSIVAMENTE con un objeto JSON válido que siga esta estructura (sin markdown, solo JSON):

            {
                "tipo_accion": "micro_tarea" | "micro_aprendizaje" | "insight_proactivo" | "motivacion" | "alerta_anticipatoria",
                "titulo": "Título corto y de acción",
                "contenido": "Explicación breve de qué hacer y por qué.",
                "referencia": "ID o Nombre del paciente (opcional)",
                "fuente": "Origen del dato (ej. Formulario, Historial)"
            }
        `;

        // 3. Llamar a la IA
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // 4. Limpiar y parsear el JSON (a veces la IA incluye bloques de código ```json ... ```)
        const jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const data: OutputAEP = JSON.parse(jsonString);

        return NextResponse.json(data);

    } catch (error) {
        console.error("Error en AEP AI:", error);
        // Fallback en caso de error de la IA
        return NextResponse.json({
            tipo_accion: "alerta_anticipatoria",
            titulo: "Error de Conexión IA",
            contenido: "No pude procesar la solicitud con la IA. Verifica tu API Key o conexión.",
            fuente: "Sistema AEP"
        });
    }
}

// Función auxiliar para mantener la demo funcionando sin API Key
function generarSimulacion(cita: any): OutputAEP {
    if (cita) {
        return {
            tipo_accion: "micro_tarea",
            titulo: `[SIMULACIÓN] Atender a ${cita.nombre}`,
            contenido: `El paciente reporta: "${cita.motivo}". (Configura tu API Key para análisis real)`,
            referencia: `Cita-${cita.id}`,
            fuente: "Formulario Web"
        };
    }
    return {
        tipo_accion: "motivacion",
        titulo: "[SIMULACIÓN] Sin novedades",
        contenido: "No hay citas pendientes. (Configura tu API Key para análisis real)",
        fuente: "Sistema"
    };
}

// Reemplazo temporal de importación de db para evitar error de módulo no encontrado
// import { db } from '../../lib/db';
const db = {
    getLast: () => ({
        id: 1,
        nombre: "Paciente Demo",
        motivo: "Consulta de ejemplo",
        telefono: "1234567890",
        fecha_creacion: new Date().toISOString()
    })
};
