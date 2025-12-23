export default function AvisoLegal() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Aviso Legal</h1>
          
          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Datos del Titular</h2>
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <p><strong>Nombre:</strong> Dr. Aldimir Mota</p>
                <p><strong>Actividad:</strong> Servicios Médicos Especializados</p>
                <p><strong>Especialidad:</strong> Medicina General y Ultrasonografía</p>
                <p><strong>Dirección:</strong> Av. Adolfo Ruiz Cortinez #300, Tres Valles, Veracruz, México</p>
                <p><strong>Teléfono:</strong> 229 369 0042</p>
                <p><strong>Email:</strong> medicinmota@outlook.com</p>
                <p><strong>Sitio Web:</strong> [URL del sitio]</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Información Profesional</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Cédula Profesional:</strong> [Número de cédula profesional]</li>
                <li><strong>Universidad:</strong> [Universidad de egreso]</li>
                <li><strong>Colegio Médico:</strong> Colegio de Médicos de Veracruz</li>
                <li><strong>Registro Sanitario:</strong> Secretaría de Salud de Veracruz</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Objeto del Sitio Web</h2>
              <p>Este sitio web tiene como finalidad:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Proporcionar información sobre servicios médicos</li>
                <li>Facilitar la solicitud de citas médicas</li>
                <li>Ofrecer información de contacto del consultorio</li>
                <li>Brindar información educativa sobre salud</li>
                <li>Permitir la comunicación entre pacientes y el consultorio</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Condiciones de Uso</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-gray-900">Acceso Gratuito</h4>
                  <p>El acceso a este sitio web es gratuito. Los servicios médicos tienen costos separados que se informan durante la consulta.</p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-gray-900">Uso Responsable</h4>
                  <p>Los usuarios se comprometen a usar el sitio de manera responsable y conforme a la ley.</p>
                </div>

                <div className="border-l-4 border-amber-500 pl-4">
                  <h4 className="font-semibold text-gray-900">Información Médica</h4>
                  <p>La información médica es de carácter general y no sustituye la consulta médica profesional.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Responsabilidades</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Nuestras Responsabilidades:</h4>
                  <ul className="list-disc pl-6 space-y-1 text-green-800">
                    <li>Mantener la confidencialidad médica</li>
                    <li>Proporcionar servicios profesionales</li>
                    <li>Proteger datos personales</li>
                    <li>Mantener el sitio web actualizado</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Responsabilidades del Usuario:</h4>
                  <ul className="list-disc pl-6 space-y-1 text-blue-800">
                    <li>Proporcionar información veraz</li>
                    <li>Usar el sitio apropiadamente</li>
                    <li>Respetar derechos de autor</li>
                    <li>No realizar actividades ilícitas</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Limitaciones de Responsabilidad</h2>
              <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                <h4 className="font-semibold text-red-900 mb-2">Exención de Responsabilidad:</h4>
                <ul className="list-disc pl-6 space-y-1 text-red-800">
                  <li>No nos responsabilizamos por interrupciones del servicio web</li>
                  <li>No garantizamos la ausencia de errores técnicos</li>
                  <li>No somos responsables por el mal uso de la información</li>
                  <li>Los enlaces externos son responsabilidad de terceros</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Propiedad Intelectual</h2>
              <p>Todos los contenidos de este sitio web (textos, imágenes, logos, diseños, código fuente) están protegidos por derechos de autor y son propiedad del Dr. Aldimir Mota, salvo que se indique lo contrario.</p>
              
              <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Prohibido:</strong> La reproducción, distribución, comunicación pública o transformación de estos contenidos sin autorización expresa.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Protección de Datos</h2>
              <p>El tratamiento de datos personales se realiza conforme a nuestra <a href="/politica-privacidad" className="text-blue-600 hover:text-blue-800 underline">Política de Privacidad</a> y la legislación mexicana aplicable (LFPDPPP).</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Modificaciones</h2>
              <p>Nos reservamos el derecho de modificar este aviso legal en cualquier momento. Las modificaciones entrarán en vigor desde su publicación en el sitio web.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Legislación Aplicable</h2>
              <p>Este aviso legal se rige por la legislación mexicana. Los tribunales competentes de Veracruz, México, serán los únicos competentes para resolver cualquier controversia.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Contacto</h2>
              <p>Para cualquier consulta relacionada con este aviso legal:</p>
              <div className="mt-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p><strong>Dr. Aldimir Mota</strong></p>
                <p>Email: medicinmota@outlook.com</p>
                <p>Teléfono: 229 369 0042</p>
                <p>Dirección: Av. Adolfo Ruiz Cortinez #300, Tres Valles, Veracruz</p>
              </div>
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