import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Validar datos básicos
    if (!body.nombre || !body.telefono || !body.motivo) {
      return NextResponse.json(
        { error: 'Faltan datos requeridos' },
        { status: 400 }
      );
    }
    // reCAPTCHA validation removed
    // Guardar en nuestra "Base de Datos"
    const nuevaCita = db.add({
      nombre: body.nombre,
      telefono: body.telefono,
      motivo: body.motivo
    });
    return NextResponse.json({ success: true, cita: nuevaCita });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}
