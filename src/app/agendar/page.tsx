'use client'

import { useState } from 'react'

export default function AgendarCita() {
  const [enviado, setEnviado] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const formData = new FormData(e.currentTarget)
    const data = {
      nombre: formData.get('nombre'),
      telefono: formData.get('telefono'),
      motivo: formData.get('motivo') || 'Consulta médica'
    }

    try {
      const res = await fetch('/api/solicitudes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      
      if (res.ok) {
        setEnviado(true)
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error al enviar solicitud')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (enviado) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Solicitud Recibida</h2>
          <p className="text-gray-600 mb-6">
            Nos comunicaremos contigo pronto para agendar tu cita.
          </p>
          <button 
            onClick={() => window.location.href = '/'}
            className="btn-primary w-full"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dr. Aldimir Mota</h1>
            <p className="text-blue-700 text-lg font-medium">Formulario Completo de Consulta Médica</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg border p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Información de Contacto</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="label-field">Nombre completo *</label>
              <input
                name="nombre"
                type="text"
                required
                className="input-field"
                placeholder="Tu nombre completo"
              />
            </div>

            <div>
              <label className="label-field">Teléfono *</label>
              <input
                name="telefono"
                type="tel"
                required
                className="input-field"
                placeholder="Tu número de teléfono"
              />
            </div>

            <div>
              <label className="label-field">Motivo de consulta *</label>
              <select name="motivo" className="input-field" required>
                <option value="">Selecciona el motivo...</option>
                <option value="Consulta general">Consulta general</option>
                <option value="Ultrasonido">Ultrasonido</option>
                <option value="Control prenatal">Control prenatal</option>
                <option value="Examen musculoesquelético">Examen musculoesquelético</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 disabled:opacity-50"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}