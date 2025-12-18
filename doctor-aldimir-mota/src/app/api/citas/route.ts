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
    // Validar reCAPTCHA
    if (!body.recaptcha) {
      return NextResponse.json(
        { error: 'Falta verificación reCAPTCHA' },
        { status: 400 }
      );
    }
    // Verificar el token con Google
    const secret = process.env.RECAPTCHA_SECRET_KEY || 'TU_SECRET_KEY_AQUI';
    const verifyRes = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${secret}&response=${body.recaptcha}`,
    });
    const verifyData = await verifyRes.json();
    if (!verifyData.success) {
      return NextResponse.json(
        { error: 'Verificación reCAPTCHA fallida' },
        { status: 400 }
      );
    }
    // Guardar en nuestra "Base de Datos"
    const nuevaCita = await db.add({
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
