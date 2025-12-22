'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function FormularioMedicoCompleto() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    fechaNacimiento: '',
    genero: '',
    telefono: '',
    email: '',
    motivoConsulta: '',
    sintomasActuales: '',
    enfermedadesPrevias: '',
    medicamentosActuales: '',
    alergias: '',
    archivoMedico: null as File | null
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData(prev => ({ ...prev, archivoMedico: file }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/solicitudes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: `${formData.nombre} ${formData.apellidos}`,
          telefono: formData.telefono,
          motivo: `Historial médico completo: ${formData.motivoConsulta}`,
          email: formData.email
        })
      })

      if (response.ok) {
        setSubmitted(true)
      } else {
        alert('Error al enviar formulario.')
      }
    } catch (error) {
      alert('Error de conexión.')
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
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Historial Médico Recibido</h2>
          <p className="text-gray-600 mb-6">
            Su historial médico completo ha sido enviado exitosamente.
          </p>
          <Link href="/" className="btn-primary w-full inline-block text-center">
            Volver al Inicio
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dr. Aldimir Mota</h1>
              <p className="text-blue-700 text-lg font-medium">Historial Médico Completo</p>
            </div>
            <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">
              ← Volver
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg border">
          <div className="bg-gradient-to-r from-blue-700 to-blue-800 p-6 text-white">
            <h2 className="text-xl font-semibold">Transferencia de Historial Médico</h2>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Datos Personales</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label-field">Nombre *</label>
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
                  <label className="label-field">Apellidos *</label>
                  <input
                    type="text"
                    name="apellidos"
                    value={formData.apellidos}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="label-field">Fecha de Nacimiento *</label>
                  <input
                    type="date"
                    name="fechaNacimiento"
                    value={formData.fechaNacimiento}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="label-field">Género *</label>
                  <select
                    name="genero"
                    value={formData.genero}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  >
                    <option value="">Seleccionar...</option>
                    <option value="masculino">Masculino</option>
                    <option value="femenino">Femenino</option>
                  </select>
                </div>
                <div>
                  <label className="label-field">Teléfono *</label>
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
                  <label className="label-field">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Información Médica</h3>
              <div className="space-y-4">
                <div>
                  <label className="label-field">Motivo de Consulta *</label>
                  <textarea
                    name="motivoConsulta"
                    value={formData.motivoConsulta}
                    onChange={handleInputChange}
                    className="input-field"
                    rows={3}
                    required
                  />
                </div>
                <div>
                  <label className="label-field">Síntomas Actuales</label>
                  <textarea
                    name="sintomasActuales"
                    value={formData.sintomasActuales}
                    onChange={handleInputChange}
                    className="input-field"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="label-field">Enfermedades Previas</label>
                  <textarea
                    name="enfermedadesPrevias"
                    value={formData.enfermedadesPrevias}
                    onChange={handleInputChange}
                    className="input-field"
                    rows={2}
                  />
                </div>
                <div>
                  <label className="label-field">Medicamentos Actuales</label>
                  <textarea
                    name="medicamentosActuales"
                    value={formData.medicamentosActuales}
                    onChange={handleInputChange}
                    className="input-field"
                    rows={2}
                  />
                </div>
                <div>
                  <label className="label-field">Alergias</label>
                  <textarea
                    name="alergias"
                    value={formData.alergias}
                    onChange={handleInputChange}
                    className="input-field"
                    rows={2}
                  />
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Archivo Médico</h3>
              <div>
                <label className="label-field">Adjuntar Estudios Previos (Opcional)</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="input-field"
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                <p className="text-sm text-gray-500 mt-1">PDF, JPG, PNG (máx. 10MB)</p>
              </div>
            </section>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 disabled:opacity-50"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Historial Médico'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}