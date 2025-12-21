import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validar datos básicos
    if (!body.nombre || !body.telefono) {
      return NextResponse.json(
        { success: false, error: 'Faltan datos requeridos' },
        { status: 400 }
      )
    }
    
    // Simular guardado exitoso
    console.log('Nueva solicitud:', body)
    
    return NextResponse.json({
      success: true,
      message: 'Solicitud creada exitosamente',
      data: { id: Date.now().toString() }
    }, { status: 201 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}