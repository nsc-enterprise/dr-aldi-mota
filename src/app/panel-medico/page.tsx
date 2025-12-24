'use client'

import { useState, useEffect } from 'react'
import { db } from '@/lib/db'

interface Paciente {
  id: string
  nombre: string
  telefono: string
  motivo: string
  fecha_creacion: string
  estado?: string
  notas?: string
}

interface AIResponse {
  tipo_accion: string
  titulo: string
  contenido: string
  fuente: string
  recomendaciones?: any[]
}

export default function PanelMedico() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [pacientes, setPacientes] = useState<Paciente[]>([])
  const [aiResponse, setAiResponse] = useState<AIResponse | null>(null)
  const [isLoadingAI, setIsLoadingAI] = useState(false)
  const [stats, setStats] = useState({
    solicitudesPendientes: 0,
    citasHoy: 0,
    totalPacientes: 0
  })

  const [isLoadingData, setIsLoadingData] = useState(false)

  // Contraseña simple (cambiar por algo más seguro después)
  const PANEL_PASSWORD = 'doctor2024'

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === PANEL_PASSWORD) {
      setIsAuthenticated(true)
      loadData()
    } else {
      alert('Contraseña incorrecta')
    }
  }

  const poblarDatosSimulados = async () => {
    setIsLoadingData(true)
    try {
      const response = await fetch('/api/poblar-datos', {
        method: 'POST'
      })
      const result = await response.json()
      
      if (result.success) {
        alert('✅ Datos simulados agregados exitosamente')
        loadData() // Recargar datos
      } else {
        alert('❌ Error al agregar datos simulados')
      }
    } catch (error) {
      alert('❌ Error de conexión')
    } finally {
      setIsLoadingData(false)
    }
  }

  const loadData = async () => {
    try {
      const data = await db.getAll()
      setPacientes(data)
      
      // Calcular estadísticas
      const today = new Date().toDateString()
      setStats({
        solicitudesPendientes: data.filter(p => p.estado === 'pendiente').length,
        citasHoy: data.filter(p => new Date(p.fecha_creacion).toDateString() === today).length,
        totalPacientes: data.length
      })
    } catch (error) {
      console.error('Error loading data:', error)
    }
  }

  const consultarAsistenteIA = async () => {
    setIsLoadingAI(true)
    try {
      const res = await fetch('/api/ai-medico', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          tipo: 'asistente_medico',
          auth: 'panel_medico_auth' // Token de autenticación
        })
      })
      
      if (res.ok) {
        const data = await res.json()
        setAiResponse(data)
      } else {
        setAiResponse({
          tipo_accion: 'insight_proactivo',
          titulo: 'Error de Acceso',
          contenido: 'No se pudo acceder al asistente médico. Verifique los permisos.',
          fuente: 'Sistema de Seguridad'
        })
      }
    } catch (error) {
      setAiResponse({
        tipo_accion: 'insight_proactivo',
        titulo: 'Asistente Médico Disponible',
        contenido: 'El asistente IA está listo para ayudarte con análisis de pacientes, recomendaciones de seguimiento y gestión de consultas.',
        fuente: 'Sistema AEP Médico'
      })
    } finally {
      setIsLoadingAI(false)
    }
  }

  const updatePacienteEstado = async (id: string, nuevoEstado: string) => {
    try {
      await db.update(id, { estado: nuevoEstado })
      loadData()
    } catch (error) {
      console.error('Error updating patient:', error)
    }
  }

  const deletePaciente = async (id: string) => {
    if (confirm('¿Estás seguro de eliminar este paciente?')) {
      try {
        await db.delete(id)
        loadData()
      } catch (error) {
        console.error('Error deleting patient:', error)
      }
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      consultarAsistenteIA()
    }
  }, [isAuthenticated])

  // Pantalla de login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Panel Médico</h1>
            <p className="text-gray-600">Dr. Aldimir Mota - Acceso Restringido</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña de Acceso
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ingrese la contraseña"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              Acceder al Panel
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Sistema de gestión médica seguro
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Panel médico principal
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Panel Médico</h1>
              <p className="text-gray-600">Dr. Aldimir Mota - Sistema de Gestión</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={poblarDatosSimulados}
                disabled={isLoadingData}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors disabled:opacity-50"
              >
                {isLoadingData ? 'Cargando...' : '📊 Datos Demo'}
              </button>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pendientes</p>
                <p className="text-3xl font-bold text-gray-900">{stats.solicitudesPendientes}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Hoy</p>
                <p className="text-3xl font-bold text-gray-900">{stats.citasHoy}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalPacientes}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Asistente IA */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">🤖 Asistente Médico IA</h2>
                <button
                  onClick={consultarAsistenteIA}
                  disabled={isLoadingAI}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors disabled:opacity-50"
                >
                  {isLoadingAI ? 'Analizando...' : 'Actualizar'}
                </button>
              </div>
              
              {aiResponse && (
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-900 mb-2">{aiResponse.titulo}</h3>
                    <p className="text-blue-800 text-sm mb-2 whitespace-pre-line">{aiResponse.contenido}</p>
                    <p className="text-xs text-blue-600">Fuente: {aiResponse.fuente}</p>
                  </div>
                  
                  {aiResponse.recomendaciones && aiResponse.recomendaciones.length > 1 && (
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-900 text-sm">Recomendaciones Adicionales:</h4>
                      {aiResponse.recomendaciones.slice(1).map((rec, index) => (
                        <div key={index} className="bg-gray-50 border border-gray-200 rounded p-3">
                          <h5 className="font-medium text-gray-800 text-sm">{rec.titulo}</h5>
                          <p className="text-gray-700 text-xs mt-1">{rec.contenido}</p>
                          <p className="text-gray-600 text-xs mt-1 italic">{rec.accion}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Lista de Pacientes */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">👥 Gestión de Pacientes</h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Paciente</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Motivo</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {pacientes.map((paciente) => (
                      <tr key={paciente.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{paciente.nombre}</div>
                            <div className="text-sm text-gray-500">{paciente.telefono}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{paciente.motivo}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={paciente.estado || 'pendiente'}
                            onChange={(e) => updatePacienteEstado(paciente.id, e.target.value)}
                            className="text-sm border border-gray-300 rounded px-2 py-1"
                          >
                            <option value="pendiente">Pendiente</option>
                            <option value="contactado">Contactado</option>
                            <option value="agendado">Agendado</option>
                            <option value="finalizado">Finalizado</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() => deletePaciente(paciente.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}