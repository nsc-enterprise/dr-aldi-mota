// app/api/ai-medico/route.ts

import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { OpenAI } from 'openai';
import GoogleProvider from 'next-auth/providers/google';

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
        const body = await request.json();
        const ultimaCita = db.getLast();

        const prompt = `Actúa como el "Asistente Estratégico Proactivo" (AEP) del Dr. Aldimir Mota.
Tu objetivo es analizar la situación actual y generar UNA sola acción concreta y de alto valor.

CONTEXTO ACTUAL:
${ultimaCita ? `Hay una nueva solicitud de paciente:
- Nombre: ${ultimaCita.nombre}
- Motivo: "${ultimaCita.motivo}"
- Teléfono: ${ultimaCita.telefono}
- Recibido: ${ultimaCita.fecha_creacion}` : "No hay citas nuevas pendientes en este momento."}

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
}`;

        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 512,
        });

        const text = completion.choices[0].message.content;
        const jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const data: OutputAEP = JSON.parse(jsonString);

        return NextResponse.json(data);
    } catch (error) {
        console.error("Error en AEP AI:", error);
        return NextResponse.json({
            tipo_accion: "alerta_anticipatoria",
            titulo: "Error de Conexión IA",
            contenido: "No pude procesar la solicitud con la IA. Verifica tu API Key o conexión.",
            fuente: "Sistema AEP"
        });
    }
}



