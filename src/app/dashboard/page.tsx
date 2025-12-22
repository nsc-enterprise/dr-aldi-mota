'use client'

import { useState, useEffect } from 'react'
import { ActionCard } from '@/components/ActionCard'
import { OutputAEP } from '@/types'
import Link from 'next/link'

export default function Dashboard() {
  const [aiData, setAiData] = useState<OutputAEP | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [stats, setStats] = useState({
    solicitudesPendientes: 0,
    citasHoy: 0,
    totalPacientes: 0
  })

  useEffect(() => {
    fetchStats()
    consultarIA()
  }, [])

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/citas/list')
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
        body: JSON.stringify({})
      })
      
      if (res.ok) {
        const data = await res.json()
        setAiData(data)
      }
    } catch (error) {
      setAiData({
        tipo_accion: 'insight_proactivo',
        titulo: 'Sistema en Modo Simulación',
        contenido: 'La IA está funcionando en modo simulación. Todas las funciones están operativas para demostración.',
        fuente: 'Sistema AEP'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 border-b-2 border-blue-800">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">Dr. Aldimir Mota</h1>
              <p className="text-blue-100 mt-1">Asistente Estratégico Proactivo (AEP)</p>
            </div>
            <div className="flex gap-4">
              <Link 
                href="/pacientes" 
                className="bg-white hover:bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-medium transition-colors border border-blue-200"
              >
                Gestionar Pacientes ({stats.solicitudesPendientes})
              </Link>
              <Link 
                href="/agendar" 
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors border border-green-700"
              >
                Landing Page
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-yellow-200">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg border border-yellow-300">
                <svg className="w-6 h-6 text-yellow-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-semibold text-gray-700">Solicitudes Pendientes</p>
                <p className="text-3xl font-bold text-gray-900">{stats.solicitudesPendientes}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-blue-200">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg border border-blue-300">
                <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-semibold text-gray-700">Solicitudes Hoy</p>
                <p className="text-3xl font-bold text-gray-900">{stats.citasHoy}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-green-200">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg border border-green-300">
                <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 715.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-semibold text-gray-700">Total Pacientes</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalPacientes}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg border-2 border-blue-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Recomendación Proactiva</h2>
            <button
              onClick={consultarIA}
              disabled={isLoading}
              className="btn-primary"
            >
              {isLoading ? 'Analizando...' : 'Actualizar Análisis'}
            </button>
          </div>
          
          {aiData && (
            <ActionCard data={aiData} />
          )}
          
          {!aiData && !isLoading && (
            <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 text-center">
              <p className="text-gray-700 font-medium">Haz clic en "Actualizar Análisis" para obtener recomendaciones de la IA.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}