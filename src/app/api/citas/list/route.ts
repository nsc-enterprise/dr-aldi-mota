import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const citas = await db.getAll();
    // Ordenar por fecha más reciente primero
    const citasOrdenadas = citas.reverse();
    return NextResponse.json(citasOrdenadas);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener citas' }, { status: 500 });
  }
}
