import { NextRequest, NextResponse } from 'next/server'
import { sistemamedico } from '@/lib/sistemamedico'

// 📥 OBTENER todas las solicitudes médicas
export async function GET() {
  try {
    const solicitudes = await sistemamedico.obtenerSolicitudes()
    return NextResponse.json({
      success: true,
      data: solicitudes,
      total: solicitudes.length
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Error al obtener solicitudes' },
      { status: 500 }
    )
  }
}

// 📤 CREAR nueva solicitud médica
export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()
    const resultado = await sistemamedico.crearSolicitud(formData)
    
    if (resultado.success) {
      return NextResponse.json({
        success: true,
        message: 'Solicitud creada exitosamente',
        data: { id: resultado.id }
      }, { status: 201 })
    } else {
      return NextResponse.json(
        { success: false, error: resultado.error },
        { status: 500 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// 🔄 ACTUALIZAR solicitud existente
export async function PUT(request: NextRequest) {
  try {
    const { id, ...cambios } = await request.json()
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID requerido' },
        { status: 400 }
      )
    }
    
    const actualizado = await sistemamedico.actualizarSolicitud(id, cambios)
    
    if (actualizado) {
      return NextResponse.json({ success: true, message: 'Actualizado exitosamente' })
    } else {
      return NextResponse.json(
        { success: false, error: 'Solicitud no encontrada' },
        { status: 404 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// 🗑️ ELIMINAR solicitud
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
    
    const eliminado = await sistemamedico.eliminarSolicitud(id)
    
    if (eliminado) {
      return NextResponse.json({ success: true, message: 'Eliminado exitosamente' })
    } else {
      return NextResponse.json(
        { success: false, error: 'Solicitud no encontrada' },
        { status: 404 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}