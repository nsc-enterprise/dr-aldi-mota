import { NextResponse } from 'next/server';
import { db } from '@/lib/localDb';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.nombre || !body.telefono || !body.motivo) {
      return NextResponse.json(
        { error: 'Faltan datos requeridos' },
        { status: 400 }
      );
    }
    
    const nuevaCita = await db.add({
      nombre: body.nombre,
      telefono: body.telefono,
      motivo: body.motivo
    });
    
    return NextResponse.json({ success: true, cita: nuevaCita });
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}
