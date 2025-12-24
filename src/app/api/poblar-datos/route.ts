import { NextResponse } from 'next/server'
import { poblarDatosSimulados } from '@/lib/datosMedicos'

export async function POST() {
  try {
    const resultado = await poblarDatosSimulados()
    
    if (resultado) {
      return NextResponse.json({
        success: true,
        message: '✅ Datos médicos simulados agregados exitosamente',
        pacientes_agregados: 10
      })
    } else {
      return NextResponse.json({
        success: false,
        message: '❌ Error al agregar datos simulados'
      }, { status: 500 })
    }
  } catch (error) {
    console.error('Error poblando datos:', error)
    return NextResponse.json({
      success: false,
      message: '❌ Error interno del servidor',
      error: error
    }, { status: 500 })
  }
}