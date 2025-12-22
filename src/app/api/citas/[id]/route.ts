import { NextResponse } from 'next/server';
import { db } from '@/lib/localDb';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const success = await db.delete(id);
    
    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Cita no encontrada' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error deleting cita:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const updatedCita = await db.update(id, body);
    
    if (updatedCita) {
      return NextResponse.json(updatedCita);
    } else {
      return NextResponse.json({ error: 'Cita no encontrada' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error updating cita:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
