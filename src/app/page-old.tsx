'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function FormularioCampana() {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    preferenciaContacto: 'whatsapp' as const,
    tipoUltrasonido: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // 🔬 TIPOS DE ULTRASONIDOS - Terminología médica precisa
  const tiposUltrasonido = [
    { value: 'ecografia_obstetrica', label: '🤱 Ecografía Obstétrica (Bebés)' },
    { value: 'ecografia_abdominal', label: '🫁 Ecografía Abdominal (Órganos internos)' },
    { value: 'ecografia_pelvica', label: '🫀 Ecografía Pélvica (Ginecológica)' },
    { value: 'ecografia_musculoesqueletica', label: '💪 Ecografía Musculoesquelética (Músculos/Tendones)' },
    { value: 'ecografia_tiroidea', label: '🦴 Ecografía Tiroidea (Cuello)' },
    { value: 'ecografia_cardiaca', label: '❤️ Ecocardiograma (Corazón)' },
    { value: 'ecografia_vascular', label: '🩸 Ecografía Vascular (Arterias/Venas)' },
    { value: 'ecografia_renal', label: '🫘 Ecografía Renal (Riñones)' }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // 🚀 Enviar datos simplificados para Supabase
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
      <div className="min-h-screen bg-gradient-to-br from-azul-50 to-medico-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-medico-900 mb-3">¡Solicitud Recibida!</h2>
          <p className="text-medico-600 mb-6">
            Nos comunicaremos contigo en las próximas <strong>2 horas</strong> para agendar tu cita de ultrasonido.
          </p>
          <div className="bg-azul-50 p-4 rounded-lg mb-6">
            <p className="text-azul-800 text-sm">
              📞 <strong>WhatsApp:</strong> Recibirás confirmación por WhatsApp<br/>
              ⏰ <strong>Horario:</strong> Lun-Vie 8AM-6PM, Sáb 8AM-2PM
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
    <div className="min-h-screen bg-gradient-to-br from-azul-50 to-medico-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        
        {/* 🔗 NAVEGACIÓN */}
        <div className="mb-6">
          <Link href="/" className="text-azul-600 hover:text-azul-800 text-sm">
            ← Formulario Completo (Doctor de Cabecera)
          </Link>
        </div>
        
        {/* 🎯 HEADER DE CAMPAÑA */}
        <div className="text-center mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h1 className="text-3xl font-bold text-medico-900 mb-2">
              Dr. Aldimir Mota
            </h1>
            <p className="text-azul-600 text-xl font-semibold mb-3">
              🔬 Especialista en Ultrasonidos Diagnósticos
            </p>
            <div className="bg-gradient-to-r from-azul-100 to-green-100 p-4 rounded-lg">
              <p className="text-medico-700 font-medium">
                ✨ <strong>Oferta Especial:</strong> Agenda tu ultrasonido con <strong>20% de descuento</strong>
              </p>
              <p className="text-medico-600 text-sm mt-1">
                Tecnología de última generación • Resultados inmediatos • Atención personalizada
              </p>
            </div>
          </div>
        </div>

        {/* 📝 FORMULARIO OPTIMIZADO */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-azul-600 to-azul-700 p-6 text-white text-center">
            <h2 className="text-xl font-bold">Agenda tu Cita en 30 Segundos</h2>
            <p className="text-azul-100 mt-1">Completa el formulario y te contactamos de inmediato</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            
            {/* 👤 NOMBRE */}
            <div>
              <label className="label-field">¿Cómo te llamas? *</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                className="input-field text-lg"
                placeholder="Ej: María González"
                required
              />
            </div>

            {/* 📞 TELÉFONO */}
            <div>
              <label className="label-field">Número de WhatsApp/Teléfono *</label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
                className="input-field text-lg"
                placeholder="Ej: +1 (809) 555-0123"
                required
              />
            </div>

            {/* 📱 PREFERENCIA DE CONTACTO */}
            <div>
              <label className="label-field">¿Cómo prefieres que te contactemos? *</label>
              <select
                name="preferenciaContacto"
                value={formData.preferenciaContacto}
                onChange={handleInputChange}
                className="input-field text-lg"
                required
              >
                <option value="whatsapp">📱 WhatsApp (Recomendado)</option>
                <option value="telefono">📞 Llamada telefónica</option>
                <option value="email">📧 Correo electrónico</option>
              </select>
            </div>

            {/* 🔬 TIPO DE ULTRASONIDO */}
            <div>
              <label className="label-field">¿Qué tipo de ultrasonido necesitas? *</label>
              <select
                name="tipoUltrasonido"
                value={formData.tipoUltrasonido}
                onChange={handleInputChange}
                className="input-field text-lg"
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

            {/* 🚀 BOTÓN DE ENVÍO */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-azul-600 to-azul-700 hover:from-azul-700 hover:to-azul-800 text-white font-bold py-4 px-6 rounded-lg text-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando solicitud...
                  </span>
                ) : (
                  '🚀 Agendar Mi Cita Ahora'
                )}
              </button>
            </div>

            {/* 🛡️ CONFIANZA Y SEGURIDAD */}
            <div className="bg-medico-50 p-4 rounded-lg text-center">
              <p className="text-medico-600 text-sm">
                🔒 <strong>100% Confidencial</strong> • ⚡ <strong>Respuesta Inmediata</strong> • 🏆 <strong>+15 años de experiencia</strong>
              </p>
            </div>
          </form>
        </div>

        {/* 📍 INFORMACIÓN ADICIONAL */}
        <div className="text-center mt-6 text-medico-600 text-sm">
          <p>📍 Consultorio ubicado en zona céntrica • 🚗 Estacionamiento disponible</p>
          <p className="mt-1">⭐⭐⭐⭐⭐ Más de 500 pacientes satisfechos</p>
        </div>
      </div>
    </div>
  )
}