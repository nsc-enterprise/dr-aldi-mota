export default function PoliticaCookies() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Política de Cookies</h1>
          
          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">¿Qué son las cookies?</h2>
              <p>Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita nuestro sitio web. Nos ayudan a mejorar su experiencia y el funcionamiento del sitio.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Cookies que utilizamos</h2>
              
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-gray-900">Cookies Técnicas (Necesarias)</h3>
                  <p>Esenciales para el funcionamiento del sitio web:</p>
                  <ul className="list-disc pl-6 mt-2">
                    <li>Gestión de sesiones</li>
                    <li>Preferencias de idioma</li>
                    <li>Seguridad del formulario</li>
                  </ul>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold text-gray-900">Cookies de Funcionalidad</h3>
                  <p>Mejoran la experiencia del usuario:</p>
                  <ul className="list-disc pl-6 mt-2">
                    <li>Recordar preferencias de contacto</li>
                    <li>Tema oscuro/claro</li>
                    <li>Configuración del chat</li>
                  </ul>
                </div>

                <div className="border-l-4 border-yellow-500 pl-4">
                  <h3 className="font-semibold text-gray-900">Cookies Analíticas</h3>
                  <p>Nos ayudan a entender cómo usa el sitio:</p>
                  <ul className="list-disc pl-6 mt-2">
                    <li>Páginas más visitadas</li>
                    <li>Tiempo de permanencia</li>
                    <li>Errores técnicos</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Duración de las cookies</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Cookies de sesión:</strong> Se eliminan al cerrar el navegador</li>
                <li><strong>Cookies persistentes:</strong> Permanecen hasta 2 años o hasta que las elimine</li>
                <li><strong>Cookies de terceros:</strong> Controladas por servicios externos (Google, Facebook)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Cómo gestionar las cookies</h2>
              
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-4">
                <h4 className="font-semibold text-blue-900 mb-2">En su navegador:</h4>
                <ul className="list-disc pl-6 space-y-1 text-blue-800">
                  <li><strong>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies</li>
                  <li><strong>Firefox:</strong> Opciones → Privacidad y seguridad</li>
                  <li><strong>Safari:</strong> Preferencias → Privacidad</li>
                  <li><strong>Edge:</strong> Configuración → Cookies y permisos del sitio</li>
                </ul>
              </div>

              <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                <p className="text-amber-800">
                  <strong>Importante:</strong> Deshabilitar las cookies puede afectar la funcionalidad del sitio web y su experiencia de usuario.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Cookies de terceros</h2>
              <p>Nuestro sitio puede incluir cookies de:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Google Analytics:</strong> Para análisis de tráfico web</li>
                <li><strong>Facebook Pixel:</strong> Para campañas publicitarias</li>
                <li><strong>WhatsApp Business:</strong> Para el chat integrado</li>
              </ul>
              <p className="mt-3">Estas cookies están sujetas a las políticas de privacidad de cada proveedor.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Consentimiento</h2>
              <p>Al continuar navegando en nuestro sitio web, usted acepta el uso de cookies según se describe en esta política. Puede retirar su consentimiento en cualquier momento modificando la configuración de su navegador.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Actualizaciones</h2>
              <p>Esta política de cookies puede ser actualizada periódicamente. Le recomendamos revisarla regularmente.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Contacto</h2>
              <p>Para consultas sobre cookies:</p>
              <p>Email: medicinmota@outlook.com</p>
              <p>Teléfono: 229 369 0042</p>
            </section>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Última actualización: {new Date().toLocaleDateString('es-MX')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}