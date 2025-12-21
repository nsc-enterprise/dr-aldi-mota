'use client'

import { useEffect, useState } from 'react'

// Tipo simplificado para Supabase
interface SolicitudSupabase {
  id: string
  nombre: string
  telefono: string
  tipo_ultrasonido: string
  preferencia_contacto: string
  estado: 'pendiente' | 'en_revision' | 'contactado' | 'cita_agendada' | 'completado' | 'cancelado'
  notas_doctor?: string
  created_at: string
  fecha_solicitud?: string
}

type EstadoSolicitud = SolicitudSupabase['estado']

export default function DashboardMedico() {
  const [solicitudes, setSolicitudes] = useState<SolicitudSupabase[]>([])
  const [loading, setLoading] = useState(true)
  const [filtroEstado, setFiltroEstado] = useState<EstadoSolicitud | 'todas'>('todas')
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState<SolicitudSupabase | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [tempNote, setTempNote] = useState('')

  // 🔄 CARGAR solicitudes
  const cargarSolicitudes = async () => {
    try {
      const response = await fetch('/api/solicitudes')
      if (response.ok) {
        const data = await response.json()
        setSolicitudes(data.data)
      }
    } catch (error) {
      console.error('🚫 Error cargando:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { cargarSolicitudes() }, [])

  // 🔄 CAMBIAR estado
  const cambiarEstado = async (id: string, nuevoEstado: EstadoSolicitud) => {
    try {
      const response = await fetch('/api/solicitudes', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, estado: nuevoEstado })
      })

      if (response.ok) {
        setSolicitudes(prev => prev.map(s => s.id === id ? { ...s, estado: nuevoEstado } : s))
        if (solicitudSeleccionada?.id === id) {
          setSolicitudSeleccionada({ ...solicitudSeleccionada, estado: nuevoEstado })
        }
      }
    } catch (error) {
      console.error('🚫 Error actualizando:', error)
    }
  }

  // 📝 GUARDAR nota
  const guardarNota = async (id: string) => {
    try {
      const response = await fetch('/api/solicitudes', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, notas_doctor: tempNote })
      })
      
      if (response.ok) {
        setSolicitudes(prev => prev.map(s => s.id === id ? { ...s, notas_doctor: tempNote } : s))
        if (solicitudSeleccionada?.id === id) {
          setSolicitudSeleccionada({ ...solicitudSeleccionada, notas_doctor: tempNote })
        }
        setEditingId(null)
      }
    } catch (error) {
      console.error('🚫 Error guardando nota:', error)
    }
  }

  // 🗑️ ELIMINAR
  const eliminar = async (id: string) => {
    if (!confirm('¿Eliminar esta solicitud?')) return

    try {
      const response = await fetch(`/api/solicitudes?id=${id}`, { method: 'DELETE' })
      if (response.ok) {
        setSolicitudes(prev => prev.filter(s => s.id !== id))
        setSolicitudSeleccionada(null)
      }
    } catch (error) {
      console.error('🚫 Error eliminando:', error)
    }
  }

  // 🎨 COLORES
  const getEstadoColor = (estado: EstadoSolicitud) => ({
    pendiente: 'bg-yellow-100 text-yellow-800',
    en_revision: 'bg-blue-100 text-blue-800',
    contactado: 'bg-purple-100 text-purple-800',
    cita_agendada: 'bg-green-100 text-green-800',
    completado: 'bg-gray-100 text-gray-800',
    cancelado: 'bg-red-100 text-red-800'
  }[estado])

  const getUrgenciaColor = (urgencia: string) => ({
    baja: 'text-green-600',
    media: 'text-yellow-600', 
    alta: 'text-orange-600',
    urgente: 'text-red-600 font-bold'
  }[urgencia as keyof typeof getUrgenciaColor] || 'text-gray-600')

  const solicitudesFiltradas = solicitudes.filter(s => 
    filtroEstado === 'todas' || s.estado === filtroEstado
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-medico-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-azul-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-medico-50">
      {/* 📋 HEADER */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-medico-900">Dashboard Médico</h1>
              <p className="text-medico-600">Dr. Aldimir Mota - Solicitudes de Consulta</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-medico-600">Total: {solicitudes.length}</span>
              <button onClick={cargarSolicitudes} className="btn-primary text-sm px-4 py-2">
                🔄 Actualizar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* 📊 LISTA */}
          <div className="lg:col-span-2">
            {/* 🔍 FILTROS */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFiltroEstado('todas')}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    filtroEstado === 'todas' ? 'bg-azul-600 text-white' : 'bg-medico-100 text-medico-700 hover:bg-medico-200'
                  }`}
                >
                  Todas ({solicitudes.length})
                </button>
                {(['pendiente', 'en_revision', 'contactado', 'cita_agendada'] as EstadoSolicitud[]).map(estado => (
                  <button
                    key={estado}
                    onClick={() => setFiltroEstado(estado)}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      filtroEstado === estado ? 'bg-azul-600 text-white' : 'bg-medico-100 text-medico-700 hover:bg-medico-200'
                    }`}
                  >
                    {estado.replace('_', ' ')} ({solicitudes.filter(s => s.estado === estado).length})
                  </button>
                ))}
              </div>
            </div>

            {/* 📋 SOLICITUDES */}
            <div className="space-y-4">
              {solicitudesFiltradas.length === 0 ? (
                <div className="bg-white rounded-lg p-8 text-center">
                  <p className="text-medico-500">No hay solicitudes</p>
                </div>
              ) : (
                solicitudesFiltradas.map(solicitud => (
                  <div
                    key={solicitud.id}
                    className={`bg-white rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                      solicitudSeleccionada?.id === solicitud.id ? 'ring-2 ring-azul-500' : ''
                    }`}
                    onClick={() => setSolicitudSeleccionada(solicitud)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-medico-900">
                          {solicitud.nombre}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-medico-600 mt-1">
                          <span>🏥 {solicitud.tipo_ultrasonido}</span>
                          <span className="text-yellow-600">
                            🚨 MEDIA
                          </span>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEstadoColor(solicitud.estado)}`}>
                        {solicitud.estado.replace('_', ' ')}
                      </span>
                    </div>
                    
                    <div className="bg-medico-50 p-3 rounded mb-3">
                      <p className="text-sm text-medico-700">
                        <strong>Tipo:</strong> {solicitud.tipo_ultrasonido}
                      </p>
                    </div>

                    {/* 📝 NOTAS */}
                    <div className="mb-3">
                      {editingId === solicitud.id ? (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={tempNote}
                            onChange={(e) => setTempNote(e.target.value)}
                            placeholder="Nota del doctor..."
                            className="flex-1 text-sm input-field py-2"
                            autoFocus
                          />
                          <button 
                            onClick={(e) => { e.stopPropagation(); guardarNota(solicitud.id); }}
                            className="text-xs bg-azul-600 text-white px-3 py-2 rounded"
                          >
                            Guardar
                          </button>
                          <button 
                            onClick={(e) => { e.stopPropagation(); setEditingId(null); }}
                            className="text-xs text-medico-500 px-3 py-2"
                          >
                            Cancelar
                          </button>
                        </div>
                      ) : (
                        <div 
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            setEditingId(solicitud.id); 
                            setTempNote(solicitud.notas_doctor || ''); 
                          }}
                          className="text-sm text-medico-600 cursor-pointer hover:bg-medico-50 p-2 rounded"
                        >
                          📝 {solicitud.notas_doctor || 'Añadir nota...'}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex justify-between text-xs text-medico-500 border-t pt-3">
                      <span>📞 {solicitud.telefono}</span>
                      <span>📅 {new Date(solicitud.created_at || solicitud.fecha_solicitud).toLocaleDateString('es-ES')}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* 📝 DETALLES */}
          <div className="lg:col-span-1">
            {solicitudSeleccionada ? (
              <div className="bg-white rounded-lg p-6 sticky top-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-lg font-semibold text-medico-900">Detalles</h2>
                  <button
                    onClick={() => eliminar(solicitudSeleccionada.id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    🗑️ Eliminar
                  </button>
                </div>

                <div className="space-y-4">
                  {/* ESTADO */}
                  <div>
                    <label className="label-field">Estado</label>
                    <select
                      value={solicitudSeleccionada.estado}
                      onChange={(e) => cambiarEstado(solicitudSeleccionada.id, e.target.value as EstadoSolicitud)}
                      className="input-field text-sm"
                    >
                      <option value="pendiente">Pendiente</option>
                      <option value="en_revision">En Revisión</option>
                      <option value="contactado">Contactado</option>
                      <option value="cita_agendada">Cita Agendada</option>
                      <option value="completado">Completado</option>
                      <option value="cancelado">Cancelado</option>
                    </select>
                  </div>

                  {/* CONTACTO */}
                  <div className="border-t pt-4">
                    <h3 className="font-medium text-medico-900 mb-2">Contacto</h3>
                    <div className="text-sm space-y-1">
                      <p><strong>Tel:</strong> 
                        <a href={`tel:${solicitudSeleccionada.telefono}`} className="text-azul-600 ml-1">
                          {solicitudSeleccionada.telefono}
                        </a>
                      </p>
                      <p><strong>Preferencia:</strong> {solicitudSeleccionada.preferencia_contacto}</p>
                    </div>
                  </div>

                  {/* TIPO DE ULTRASONIDO */}
                  <div className="border-t pt-4">
                    <h3 className="font-medium text-medico-900 mb-2">Solicitud</h3>
                    <div className="text-sm space-y-2">
                      <div className="bg-medico-50 p-3 rounded">
                        <p><strong>Tipo:</strong></p>
                        <p>{solicitudSeleccionada.tipo_ultrasonido}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg p-6 text-center">
                <div className="text-medico-400 text-4xl mb-4">👩⚕️</div>
                <p className="text-medico-500">Seleccione una solicitud para ver detalles</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
