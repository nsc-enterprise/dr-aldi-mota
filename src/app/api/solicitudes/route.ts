import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// 📥 OBTENER todas las solicitudes médicas
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('solicitudes_pacientes')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    
    return NextResponse.json({
      success: true,
      data: data || [],
      total: data?.length || 0
    })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { success: false, error: 'Error al obtener solicitudes' },
      { status: 500 }
    )
  }
}

// 📤 CREAR nueva solicitud médica
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
    
    // Insertar en Supabase
    const { data, error } = await supabase
      .from('solicitudes_pacientes')
      .insert({
        nombre: body.nombre,
        telefono: body.telefono,
        tipo_ultrasonido: body.motivo || body.tipo_ultrasonido,
        preferencia_contacto: body.preferencia_contacto || 'telefono',
        estado: 'pendiente'
      })
      .select()
      .single()
    
    if (error) {
      console.error('Error Supabase:', error)
      return NextResponse.json(
        { success: false, error: 'Error al guardar solicitud' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({
      success: true,
      message: 'Solicitud creada exitosamente',
      data: { id: data.id }
    }, { status: 201 })
  } catch (error) {
    console.error('Error:', error)
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
    
    const { data, error } = await supabase
      .from('solicitudes_pacientes')
      .update(cambios)
      .eq('id', id)
      .select()
    
    if (error) {
      console.error('Error:', error)
      return NextResponse.json(
        { success: false, error: 'Error al actualizar' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Actualizado exitosamente' 
    })
  } catch (error) {
    console.error('Error:', error)
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
    
    const { error } = await supabase
      .from('solicitudes_pacientes')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error:', error)
      return NextResponse.json(
        { success: false, error: 'Error al eliminar' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Eliminado exitosamente' 
    })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}