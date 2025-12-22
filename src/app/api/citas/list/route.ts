import { NextResponse } from 'next/server';
import { db } from '@/lib/localDb';

export async function GET() {
  try {
    const citas = await db.getAll();
    // Ordenar por fecha más reciente primero
    const citasOrdenadas = citas.sort((a, b) => 
      new Date(b.fecha_creacion).getTime() - new Date(a.fecha_creacion).getTime()
    );
    return NextResponse.json(citasOrdenadas);
  } catch (error) {
    console.error('Error al obtener citas:', error);
    return NextResponse.json({ error: 'Error al obtener citas' }, { status: 500 });
  }
}
