'use client'

import { useState, useEffect } from 'react'

export default function AnimacionTerminal() {
  const [mostrarAnimacion, setMostrarAnimacion] = useState(true)
  const [textoActual, setTextoActual] = useState('')
  const [lineaActual, setLineaActual] = useState(0)
  const [caracterActual, setCaracterActual] = useState(0)

  const secuenciaAnimacion = [
    '> Iniciando sistema médico...',
    '> Cargando perfil del doctor...',
    '> ████████████████████████ 100%',
    '',
    '╔══════════════════════════════════════════════╗',
    '║                                              ║',
    '║    ██████╗ ██████╗     █████╗ ██╗     ██████╗ ║',
    '║    ██╔══██╗██╔══██╗   ██╔══██╗██║     ██╔══██╗║',
    '║    ██║  ██║██████╔╝   ███████║██║     ██║  ██║║',
    '║    ██║  ██║██╔══██╗   ██╔══██║██║     ██║  ██║║',
    '║    ██████╔╝██║  ██║██╗██║  ██║███████╗██████╔╝║',
    '║    ╚═════╝ ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚══════╝╚═════╝ ║',
    '║                                              ║',
    '║           ALDIMIR MOTA                       ║',
    '║      Especialista en Ultrasonidos           ║',
    '║                                              ║',
    '╚══════════════════════════════════════════════╝',
    '',
    '> Sistema listo ✓',
    '> Bienvenido al consultorio digital',
    '',
    '    ♥ ♥ ♥  CUIDANDO TU SALUD  ♥ ♥ ♥',
    '',
    '> Presiona cualquier tecla para continuar...'
  ]

  useEffect(() => {
    if (!mostrarAnimacion) return

    const timer = setTimeout(() => {
      if (lineaActual < secuenciaAnimacion.length) {
        const lineaCompleta = secuenciaAnimacion[lineaActual]
        
        if (caracterActual < lineaCompleta.length) {
          setTextoActual(prev => prev + lineaCompleta[caracterActual])
          setCaracterActual(prev => prev + 1)
        } else {
          setTextoActual(prev => prev + '\n')
          setLineaActual(prev => prev + 1)
          setCaracterActual(0)
        }
      }
    }, lineaActual < 3 ? 100 : 50) // Más lento al inicio

    return () => clearTimeout(timer)
  }, [lineaActual, caracterActual, mostrarAnimacion])

  const cerrarAnimacion = () => {
    setMostrarAnimacion(false)
  }

  if (!mostrarAnimacion) return null

  return (
    <div 
      className="fixed inset-0 bg-black z-[9999] flex items-center justify-center cursor-pointer"
      onClick={cerrarAnimacion}
      onKeyDown={cerrarAnimacion}
      tabIndex={0}
    >
      <div className="w-full h-full max-w-4xl mx-auto p-8 overflow-hidden">
        <div className="font-mono text-green-400 text-xs md:text-sm lg:text-base leading-tight">
          <div className="mb-4 text-green-300">
            ┌─ Terminal Médico v2.0 ─────────────────────────────┐
          </div>
          
          <pre className="whitespace-pre-wrap break-words">
            {textoActual}
            <span className="animate-pulse bg-green-400 text-black">█</span>
          </pre>
          
          {lineaActual >= secuenciaAnimacion.length - 1 && (
            <div className="mt-8 text-center">
              <div className="animate-bounce text-yellow-400">
                ▼ Click para continuar ▼
              </div>
              <div className="mt-4 text-xs text-gray-500">
                🩺 Dr. Aldimir Mota - Ultrasonidos Diagnósticos 🩺
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Efectos de fondo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-green-600 animate-pulse">{'>'}</div>
        <div className="absolute top-20 right-20 text-green-600 animate-pulse">{'█'}</div>
        <div className="absolute bottom-20 left-20 text-green-600 animate-pulse">{'◆'}</div>
        <div className="absolute bottom-10 right-10 text-green-600 animate-pulse">{'♦'}</div>
      </div>
    </div>
  )
}