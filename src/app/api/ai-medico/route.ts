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


export async function POST(request: Request) {
    try {
        const body = await request.json();
        const ultimaCita = await db.getLast();

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

        // Gemini AI integration
        const apiKey = process.env.GEMINI_API_KEY;
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta1/models/gemini-pro:generateContent?key=${apiKey}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [{ role: "user", parts: [{ text: prompt }] }]
            }),
        });
            const raw = await response.text();
            console.log('Gemini response status:', response.status);
            console.log('Gemini raw response:', raw);
            let result;
            try {
                result = JSON.parse(raw);
            } catch (e) {
                console.error('Error parsing Gemini response:', e, raw);
                return NextResponse.json({
                    tipo_accion: "alerta_anticipatoria",
                    titulo: `Error en respuesta de Gemini (status ${response.status})`,
                    contenido: `No se pudo analizar la respuesta de la IA. Respuesta: ${raw}`,
                    fuente: "Sistema AEP"
                });
            }
            // Gemini returns candidates[0].content.parts[0].text
            const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) {
            return NextResponse.json({
                tipo_accion: "alerta_anticipatoria",
                titulo: "Respuesta vacía de Gemini",
                contenido: "No se recibió contenido de la IA.",
                fuente: "Sistema AEP"
            });
        }
        const jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();
        let data: OutputAEP;
        try {
            data = JSON.parse(jsonString);
        } catch (e) {
            return NextResponse.json({
                tipo_accion: "alerta_anticipatoria",
                titulo: "Error de formato IA",
                contenido: "La respuesta de la IA no es un JSON válido.",
                fuente: "Sistema AEP"
            });
        }
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



