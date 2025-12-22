'use client'

import { useState, useRef, useEffect } from 'react'

interface Mensaje {
  id: string
  texto: string
  esUsuario: boolean
  timestamp: Date
}

export default function ChatFlotante() {
  const [isOpen, setIsOpen] = useState(false)
  const [mensajes, setMensajes] = useState<Mensaje[]>([
    {
      id: '1',
      texto: '¡Hola! Soy el asistente virtual del Dr. Aldimir Mota. ¿En qué puedo ayudarte hoy?',
      esUsuario: false,
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // 📜 Auto-scroll al último mensaje
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [mensajes])

  // 🤖 Respuestas automáticas del asistente
  const respuestasAutomaticas = [
    '¡Perfecto! Te ayudo con eso. ¿Podrías darme más detalles?',
    'Entiendo tu consulta. El Dr. Mota estará disponible para atenderte pronto.',
    'Esa es una excelente pregunta. Te conectaré con el doctor para una respuesta más detallada.',
    'Gracias por contactarnos. ¿Hay algo específico sobre tu salud que te preocupe?',
    'El Dr. Mota se especializa en esa área. ¿Te gustaría agendar una consulta?'
  ]

  // 📤 Enviar mensaje
  const enviarMensaje = async () => {
    if (!inputText.trim()) return

    const nuevoMensaje: Mensaje = {
      id: Date.now().toString(),
      texto: inputText,
      esUsuario: true,
      timestamp: new Date()
    }

    setMensajes(prev => [...prev, nuevoMensaje])
    setInputText('')
    setIsTyping(true)

    // 🤖 Simular respuesta del asistente
    setTimeout(() => {
      const respuestaBot: Mensaje = {
        id: (Date.now() + 1).toString(),
        texto: respuestasAutomaticas[Math.floor(Math.random() * respuestasAutomaticas.length)],
        esUsuario: false,
        timestamp: new Date()
      }
      setMensajes(prev => [...prev, respuestaBot])
      setIsTyping(false)
    }, 1500)
  }

  // ⌨️ Manejar Enter
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      enviarMensaje()
    }
  }

  return (
    <>
      {/* 🎈 BOTÓN FLOTANTE */}
      <div className="fixed bottom-4 right-4 z-50">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="bg-azul-600 hover:bg-azul-700 text-white rounded-full w-14 h-14 md:w-16 md:h-16 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 animate-pulse"
          >
            <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
        )}
      </div>

      {/* 💬 VENTANA DE CHAT */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 z-50 w-80 md:w-96 h-96 md:h-[500px] bg-white rounded-2xl shadow-2xl border border-medico-200 flex flex-col overflow-hidden">
          
          {/* 📋 HEADER */}
          <div className="bg-gradient-to-r from-azul-600 to-azul-700 text-white p-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9M19 9H14V4H19V9Z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-sm">Dr. Aldimir Mota</h3>
                <p className="text-xs text-azul-100">Asistente Virtual</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-azul-200 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* 💬 ÁREA DE MENSAJES */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-medico-50">
            {mensajes.map((mensaje) => (
              <div
                key={mensaje.id}
                className={`flex ${mensaje.esUsuario ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    mensaje.esUsuario
                      ? 'bg-azul-600 text-white rounded-br-md'
                      : 'bg-white text-medico-900 border border-medico-200 rounded-bl-md'
                  }`}
                >
                  <p>{mensaje.texto}</p>
                  <p className={`text-xs mt-1 ${
                    mensaje.esUsuario ? 'text-azul-100' : 'text-medico-500'
                  }`}>
                    {mensaje.timestamp.toLocaleTimeString('es-ES', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            ))}

            {/* 🤖 INDICADOR DE ESCRITURA */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-medico-200 p-3 rounded-2xl rounded-bl-md">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-medico-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-medico-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-medico-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* ⌨️ ÁREA DE INPUT */}
          <div className="p-4 bg-white border-t border-medico-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe tu mensaje..."
                className="flex-1 px-3 py-2 border border-medico-300 rounded-full focus:ring-2 focus:ring-azul-500 focus:border-azul-500 text-sm"
                disabled={isTyping}
              />
              <button
                onClick={enviarMensaje}
                disabled={!inputText.trim() || isTyping}
                className="bg-azul-600 hover:bg-azul-700 disabled:bg-medico-300 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            
            {/* 🏥 ACCIONES RÁPIDAS */}
            <div className="flex flex-wrap gap-2 mt-3">
              <button
                onClick={() => setInputText('¿Cuáles son los horarios de atención?')}
                className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
              >
                Horarios
              </button>
              <button
                onClick={() => setInputText('Quiero agendar una cita')}
                className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
              >
                Agendar
              </button>
              <button
                onClick={() => {
                  const telefono = '522293690042';
                  const mensaje = encodeURIComponent('Hola Dr. Mota, me interesa agendar una consulta de ultrasonido.');
                  window.open(`https://wa.me/${telefono}?text=${mensaje}`, '_blank');
                }}
                className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full hover:bg-green-200 transition-colors"
              >
                WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}