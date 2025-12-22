import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const citas = await db.getAll()
    return NextResponse.json({ success: true, data: citas })
  } catch (error) {
    console.error('Error fetching citas:', error)
    return NextResponse.json(
      { success: false, error: 'Error al obtener las citas' },
      { status: 500 }
    )
  }
}

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
    
    // Guardar en Supabase
    const nuevaCita = await db.add({
      nombre: body.nombre,
      telefono: body.telefono,
      motivo: body.motivo || 'Consulta médica'
    })
    
    console.log('Nueva solicitud guardada:', nuevaCita)
    
    return NextResponse.json({
      success: true,
      message: 'Solicitud creada exitosamente',
      data: nuevaCita
    }, { status: 201 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updates } = body
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID requerido' },
        { status: 400 }
      )
    }
    
    const citaActualizada = await db.update(id, updates)
    
    if (!citaActualizada) {
      return NextResponse.json(
        { success: false, error: 'Cita no encontrada' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      message: 'Cita actualizada exitosamente',
      data: citaActualizada
    })
  } catch (error) {
    console.error('Error updating cita:', error)
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID requerido' },
        { status: 400 }
      )
    }
    
    const eliminado = await db.delete(id)
    
    if (!eliminado) {
      return NextResponse.json(
        { success: false, error: 'Cita no encontrada' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      message: 'Cita eliminada exitosamente'
    })
  } catch (error) {
    console.error('Error deleting cita:', error)
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}