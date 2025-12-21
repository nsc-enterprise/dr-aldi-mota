import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

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
    // Guardar en Supabase
    const { data: nuevaCita, error } = await supabase
      .from('solicitudes_pacientes')
      .insert({
        nombre: body.nombre,
        telefono: body.telefono,
        tipo_ultrasonido: body.motivo,
        preferencia_contacto: body.preferencia_contacto || 'telefono',
        estado: 'pendiente',
        fecha_solicitud: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Error Supabase:', error);
      return NextResponse.json(
        { error: 'Error al guardar en base de datos' },
        { status: 500 }
      );
    }
    return NextResponse.json({ success: true, cita: nuevaCita });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}
