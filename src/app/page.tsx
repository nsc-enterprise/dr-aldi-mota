'use client'

import { useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const ChatFlotante = dynamic(() => import('@/components/ChatFlotante'), {
  ssr: false
})

export default function FormularioCampana() {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    preferenciaContacto: 'whatsapp' as const,
    tipoUltrasonido: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
    
    // Validación de teléfono en tiempo real
    if (name === 'telefono') {
      const cleanPhone = value.replace(/\D/g, '')
      if (cleanPhone.length <= 10) {
        setFormData(prev => ({ ...prev, [name]: cleanPhone }))
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
    
    // Limpiar error cuando el usuario empiece a escribir
    if (error) setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

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
        const errorData = await response.json()
        setError(errorData.message || 'Error al enviar solicitud. Intente nuevamente.')
      }
    } catch (error) {
      setError('Error de conexión. Verifique su internet y vuelva a intentar.')
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
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-6">
            <p className="text-blue-800 text-sm">
              <strong>WhatsApp:</strong> Recibirás confirmación por WhatsApp<br/>
              <strong>Horario:</strong> Lun-Vie 8AM-6PM, Sáb 8AM-2PM
            </p>
          </div>
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
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header con información del doctor */}
        <div className="bg-white border-b">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Dr. Aldimir Mota</h1>
              <p className="text-azul-700 text-lg font-medium mb-4">Especialista en Ultrasonidos Diagnósticos</p>
              
              {/* Información de contacto */}
              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                  <span>229 369 0042</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                  <span>medicinmota@outlook.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                  </svg>
                  <span>Av. Adolfo Ruiz Cortinez #300, Tres Valles, Ver</span>
                </div>
              </div>

              {/* Redes sociales */}
              <div className="flex justify-center gap-4 mb-6">
                <a href="https://www.instagram.com/medicinmota/" target="_blank" rel="noopener noreferrer" 
                   className="hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                    <defs>
                      <radialGradient id="instagram-gradient" cx="0.5" cy="1.2" r="1.2">
                        <stop offset="0%" stopColor="#fdf497" />
                        <stop offset="5%" stopColor="#fdf497" />
                        <stop offset="45%" stopColor="#fd5949" />
                        <stop offset="60%" stopColor="#d6249f" />
                        <stop offset="90%" stopColor="#285AEB" />
                      </radialGradient>
                    </defs>
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="url(#instagram-gradient)"/>
                  </svg>
                </a>
                <a href="https://www.facebook.com/p/Dr-Aldimir-Mota-100088710581137/" target="_blank" rel="noopener noreferrer"
                   className="hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#1877F2">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://www.doctoralia.com.mx/aldimir-mota/medico-general/tres-valles" target="_blank" rel="noopener noreferrer"
                   className="hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#00D4AA">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16l-6.222 6.222a.6.6 0 01-.848 0L6.432 10.32a.6.6 0 010-.848l.848-.848a.6.6 0 01.848 0l3.212 3.212 4.95-4.95a.6.6 0 01.848 0l.848.848a.6.6 0 01.582.426z"/>
                  </svg>
                </a>
              </div>

              <div className="bg-gradient-to-r from-azul-50 to-blue-50 border border-azul-200 p-4 rounded-lg">
                <p className="text-azul-800 font-medium">
                  Oferta Especial: Agenda tu ultrasonido con descuento
                </p>
                <p className="text-azul-700 text-sm mt-1">
                  Tecnología de última generación • Resultados inmediatos • Atención personalizada
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Formulario */}
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-lg border overflow-hidden">
            <div className="bg-gradient-to-r from-azul-700 to-azul-800 p-6 text-white text-center">
              <h2 className="text-xl font-semibold">Agenda tu Cita</h2>
              <p className="text-azul-100 mt-1">Completa el formulario y te contactamos de inmediato</p>
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
                  placeholder="Ej: María González"
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
                  placeholder="Ej: 229 369 0042"
                  required
                />
              </div>

              <div>
                <label className="label-field">Preferencia de contacto *</label>
                <select
                  name="preferenciaContacto"
                  value={formData.preferenciaContacto}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                >
                  <option value="whatsapp">WhatsApp (Recomendado)</option>
                  <option value="telefono">Llamada telefónica</option>
                  <option value="email">Correo electrónico</option>
                </select>
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

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-azul-700 to-azul-800 hover:from-azul-800 hover:to-azul-900 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando solicitud...
                    </span>
                  ) : (
                    'Agendar Mi Cita Ahora'
                  )}
                </button>
              </div>

              <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg text-center">
                <p className="text-gray-600 text-sm">
                  <strong>100% Confidencial</strong> • <strong>Respuesta Inmediata</strong> 
                </p>
              </div>
            </form>
          </div>

          <div className="text-center mt-6 text-gray-500 text-sm">
            <p>Consultorio ubicado en zona céntrica • Estacionamiento disponible</p>
            <p className="mt-1">Más de 500 pacientes satisfechos</p>
          </div>
        </div>
      </div>
      <ChatFlotante />
    </>
  )
}