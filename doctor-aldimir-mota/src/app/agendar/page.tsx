'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import ReCAPTCHA from 'react-google-recaptcha';

// Lazy load GoogleSignInButton to prevent NextAuth from loading during SSR/prerender
const GoogleSignInButton = dynamic(
  () => import('@/components/GoogleSignInButton').then(mod => ({ default: mod.GoogleSignInButton })),
  { ssr: false, loading: () => <div>Cargando...</div> }
);

export default function AgendarCita() {
  const [enviado, setEnviado] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaValido, setCaptchaValido] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  useEffect(() => {
    // Manejar parámetros de query para feedback de autenticación
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.get('auth') === 'success') {
      // Limpiar la URL
      window.history.replaceState({}, document.title, window.location.pathname);
      // Mostrar mensaje de éxito (el componente GoogleSignInButton ya maneja el estado del usuario)
    }

    if (urlParams.get('error')) {
      let errorMessage = 'Hubo un error con la autenticación';
      switch (urlParams.get('error')) {
        case 'no_code':
          errorMessage = 'No se recibió el código de autorización';
          break;
        case 'token_exchange_failed':
          errorMessage = 'Error al intercambiar tokens con Google';
          break;
        case 'user_info_failed':
          errorMessage = 'Error al obtener información del usuario';
          break;
        case 'auth_callback_error':
          errorMessage = 'Error en el proceso de autenticación';
          break;
      }
      alert(`Error de autenticación: ${errorMessage}`);
      // Limpiar la URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!captchaValido) {
      alert('Por favor verifica que no eres un robot.');
      return;
    }
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      nombre: formData.get('nombre'),
      telefono: formData.get('telefono'),
      _reason: formData.get('motivo') || 'Interés en Promo Ultrasonido',
      get motivo() {
        return this._reason;
      },
      set motivo(value) {
        this._reason = value;
      },
      recaptcha: recaptchaRef.current?.getValue(),
    };
    try {
      const res = await fetch('/api/citas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setEnviado(true);
      }
    } catch (error) {
      console.error('Error al enviar:', error);
      alert('Hubo un error al enviar la solicitud. Por favor intente de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white font-sans">
      {/* Hero Section - Mobile Optimized */}
      <div className="bg-blue-600 text-white pt-8 pb-16 px-6 rounded-b-[2.5rem] shadow-lg relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/medical-icons.png')]"></div>
        <div className="max-w-md mx-auto relative z-10 text-center">
          <span className="inline-block bg-blue-500/50 backdrop-blur-sm border border-blue-400/30 text-blue-50 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
            📌Oferta Especial Facebook 📌
          </span>
          <h1 className="text-3xl font-extrabold mb-2 leading-tight">
            Ultrasonidos de Alta Definición
          </h1>
          <p className="text-blue-100 text-lg font-medium">
            Diagnóstico de funcion cardiaca, éxamen musculoesquelético y otros estudios. 
          </p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 -mt-10 relative z-20 pb-12">
        {/* Card Principal */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          
          {/* Beneficios Rápidos */}
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-around text-center">
            <div>
              <div className="text-[10px] text-gray-500 uppercase font-bold">Tecnología</div>
              <div className="text-blue-600 font-bold text-xl">4D/HQ</div>  
            </div>
            <div className="w-px bg-gray-200"></div>
            <div>
              <div className="text-blue-600 font-bold text-xl">Exp.</div>
              <div className="text-[10px] text-gray-500 uppercase font-bold">Dr. Mota</div>
            </div>
            <div className="w-px bg-gray-200"></div>
            <div>
              <div className="text-[10px] text-gray-500 uppercase font-bold">Sin Espera</div>
              <div className="text-blue-600 font-bold text-xl">Cita</div>  
            </div>
          </div>

          <div className="p-6 md:p-8">
            {enviado ? (
              <div className="text-center py-8 animate-in fade-in zoom-in duration-500">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">¡Solicitud Recibida!</h3>
                <p className="text-gray-600 mb-6">
                  Un asistente te contactarán en breve para confirmar tu cita.
                </p>
                <button 
                  onClick={() => window.location.reload()}
                  className="text-blue-600 font-medium hover:underline"
                >
                  Volver al inicio
                </button>
              </div>
            ) : (
              <>
                <div className="text-center mb-6">
                  <h2 className="text-lg font-bold text-gray-800">Reserva tu lugar ahora</h2>
                  <p className="text-sm text-gray-500">Pocas fechas disponibles.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Nombre Completo</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <input 
                        name="nombre"
                        required 
                        type="text" 
                        placeholder="Tu nombre aquí"
                        className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 placeholder-gray-400"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Teléfono / WhatsApp</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                      </div>
                      <input 
                        name="telefono"
                        required 
                        type="tel" 
                        placeholder="Para confirmación"
                        className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 placeholder-gray-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Tipo de Estudio</label>
                    <div className="relative">
                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.761 2.154 18 5.192 18h9.616c3.038 0 4.375-3.239 2.485-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zM11.379 5.793L3 14.172V17h14v-2.828l-8.38-8.379-2.83-2.828z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <select 
                        name="motivo"
                        className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 appearance-none"
                      >
                        <option value="Ultrasonido Promoción">📌Ultrasonido</option>
                        <option value="Consulta General">Consulta General</option>
                        <option value="Control Prenatal">Control Prenatal</option>
                        <option value="Examen Musculoesquelético">Examen Musculoesquelético</option>
                        <option value="Otro">Otro motivo</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ''}
                      onChange={token => setCaptchaValido(!!token)}
                      theme="light"
                    />
                    {!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
                      <p className="text-red-500 text-xs text-center mt-2">Error: Falta la clave pública de reCAPTCHA. Verifica NEXT_PUBLIC_RECAPTCHA_SITE_KEY en .env.local.</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-200 transform active:scale-[0.98] flex justify-center items-center gap-2"
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse">Enviando...</span>
                    ) : (
                      <>
                        <span>Agendar Cita Ahora</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </>
                    )}
                  </button>
                  
                  <p className="text-center text-xs text-gray-400 mt-4">
                     Tus datos están protegidos. Solo se usarán para contactarte.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>

        {/* Registro para historial clínico */}
        <div className="mt-8">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 shadow-sm text-center">
            <h3 className="text-base font-bold text-blue-700 mb-2">¿Quieres llevar tu historial clínico?</h3>
            <p className="text-sm text-blue-600 mb-4">Regístrate con Google para guardar y consultar tus citas y estudios realizados con el Dr. Aldimir Mota.</p>
            <GoogleSignInButton />
          </div>
        </div>

        {/* Trust Badges / Footer */}
        <div className="mt-8 text-center space-y-4">
          <p className="text-sm text-gray-500 font-medium">
            Dr. Aldimir Mota — Medicina General y Ultrasonografía
          </p>
          <div className="flex justify-center gap-4 opacity-60 grayscale hover:grayscale-0 transition-all">
            {/* Placeholders for trust icons if needed */}
            <div className="h-8 w-12 bg-gray-200 rounded"></div>
            <div className="h-8 w-12 bg-gray-200 rounded"></div>
            <div className="h-8 w-12 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </main>
  );
}
