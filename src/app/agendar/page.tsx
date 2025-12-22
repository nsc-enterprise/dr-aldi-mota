'use client'

import { useState } from 'react'
import Link from 'next/link'
import { RedesSociales } from '@/components/RedesSociales'

export default function FormularioCampana() {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    preferenciaContacto: 'whatsapp' as const,
    tipoUltrasonido: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const tiposUltrasonido = [
    { value: 'ecografia_obstetrica', label: 'Ecografía Obstétrica (Embarazo)' },
    { value: 'ecografia_abdominal', label: 'Ecografía Abdominal (Órganos internos)' },
    { value: 'ecografia_pelvica', label: 'Ecografía Pélvica (Ginecológica)' },
    { value: 'ecografia_musculoesqueletica', label: 'Ecografía Musculoesquelética (Músculos/Tendones)' },
    { value: 'ecografia_tiroidea', label: 'Ecografía Tiroidea (Cuello)' },
    { value: 'ecografia_cardiaca', label: 'Ecocardiograma (Corazón)' },
    { value: 'ecografia_vascular', label: 'Ecografía Vascular (Arterias/Venas)' },
    { value: 'ecografia_renal', label: 'Ecografía Renal (Riñones)' }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const solicitudCampana = {
        nombre: formData.nombre,
        telefono: formData.telefono,
        motivo: tiposUltrasonido.find(t => t.value === formData.tipoUltrasonido)?.label || 'ultrasonido',
        preferencia_contacto: formData.preferenciaContacto
      }

      const response = await fetch('/api/solicitudes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(solicitudCampana)
      })

      if (response.ok) {
        setSubmitted(true)
      } else {
        alert('Error al enviar solicitud. Intente nuevamente.')
      }
    } catch (error) {
      alert('Error de conexión. Verifique su internet.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center border">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Solicitud Recibida</h2>
          <p className="text-gray-600 mb-6">
            Nos comunicaremos contigo en las próximas 2 horas para agendar tu cita de ultrasonido.
          </p>
          <button 
            onClick={() => {
              setSubmitted(false)
              setFormData({ nombre: '', telefono: '', preferenciaContacto: 'whatsapp', tipoUltrasonido: '' })
            }}
            className="btn-primary w-full"
          >
            Nueva Solicitud
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dr. Aldimir Mota</h1>
            <p className="text-blue-700 text-lg font-medium mb-4">Especialista en Ultrasonidos Diagnósticos</p>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-2">
                <span>229 369 0042</span>
              </div>
              <div className="flex items-center gap-2">
                <span>medicinmota@outlook.com</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Av. Adolfo Ruiz Cortinez #300, Tres Valles, Ver</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-blue-50 border border-blue-200 p-4 rounded-lg">
              <p className="text-blue-800 font-medium">
                Oferta Especial: Agenda tu ultrasonido con descuento
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg border overflow-hidden">
          <div className="bg-gradient-to-r from-blue-700 to-blue-800 p-6 text-white text-center">
            <h2 className="text-xl font-semibold">Agenda tu Cita</h2>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div>
              <label className="label-field">Nombre completo *</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="label-field">Número de WhatsApp/Teléfono *</label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="label-field">Tipo de ultrasonido *</label>
              <select
                name="tipoUltrasonido"
                value={formData.tipoUltrasonido}
                onChange={handleInputChange}
                className="input-field"
                required
              >
                <option value="">Selecciona el tipo de estudio...</option>
                {tiposUltrasonido.map(tipo => (
                  <option key={tipo.value} value={tipo.value}>
                    {tipo.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 disabled:opacity-50"
            >
              {isSubmitting ? 'Enviando...' : 'Agendar Mi Cita Ahora'}
            </button>

            <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg text-center">
              <p className="text-gray-600 text-sm mb-3">
                <strong>100% Confidencial</strong> • <strong>Respuesta Inmediata</strong> 
              </p>
              <div className="border-t border-gray-200 pt-3">
                <p className="text-gray-600 text-sm mb-2">¿Necesitas completar tu historial médico completo?</p>
                <Link 
                  href="/historial-medico"
                  className="inline-flex items-center text-blue-700 hover:text-blue-800 text-sm font-medium transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Formulario Completo de Historial Médico
                </Link>
              </div>
            </div>
          </form>
        </div>

        <RedesSociales />

        <div className="text-center mt-6 text-gray-500 text-sm">
          <p>Consultorio ubicado en zona céntrica • Estacionamiento disponible</p>
          <p className="mt-1">Más de 500 pacientes satisfechos</p>
        </div>
      </div>
    </div>
  )
}