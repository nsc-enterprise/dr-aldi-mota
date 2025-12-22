'use client'

import { useState, useEffect } from 'react'
import { SimpleActionCard } from '@/components/SimpleActionCard'

export default function Dashboard() {
  const [aiResponse, setAiResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [stats, setStats] = useState({
    solicitudesPendientes: 0,
    citasHoy: 0,
    totalPacientes: 0
  })

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/citas')
      if (res.ok) {
        const data = await res.json()
        setStats({
          solicitudesPendientes: data.filter((c: any) => c.estado === 'pendiente').length,
          citasHoy: data.filter((c: any) => {
            const today = new Date().toDateString()
            return new Date(c.fecha_creacion).toDateString() === today
          }).length,
          totalPacientes: data.length
        })
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const consultarIA = async () => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/ai-medico', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: 'Dame un resumen de las tareas prioritarias para hoy como médico especialista en ultrasonidos' 
        })
      })
      
      if (res.ok) {
        const data = await res.json()
        setAiResponse(data.response)
      }
    } catch (error) {
      setAiResponse('Error al conectar con la IA. Modo simulación activado.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard - Dr. Aldimir Mota</h1>
        <p className="text-gray-600">Asistente Estratégico Proactivo (AEP)</p>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Solicitudes Pendientes</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.solicitudesPendientes}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Citas Hoy</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.citasHoy}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Pacientes</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalPacientes}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Asistente IA */}
      <div className="bg-white rounded-lg shadow border p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Asistente IA Médico</h2>
          <button
            onClick={consultarIA}
            disabled={isLoading}
            className="btn-primary"
          >
            {isLoading ? 'Consultando...' : 'Consultar IA'}
          </button>
        </div>
        
        {aiResponse && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800 whitespace-pre-wrap">{aiResponse}</p>
          </div>
        )}
        
        {!aiResponse && !isLoading && (
          <p className="text-gray-500 italic">Haz clic en "Consultar IA" para obtener recomendaciones personalizadas.</p>
        )}
      </div>

      {/* Acciones Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SimpleActionCard
          title="Gestionar Pacientes"
          description="Ver y administrar solicitudes de citas"
          icon="users"
          href="/pacientes"
          color="blue"
        />
        
        <SimpleActionCard
          title="Landing Page"
          description="Ver formulario de campaña de ultrasonidos"
          icon="form"
          href="/agendar"
          color="green"
        />
        
        <SimpleActionCard
          title="Configuración"
          description="Ajustes de la aplicación y perfil"
          icon="settings"
          href="#"
          color="gray"
        />
      </div>
    </div>
  )
}