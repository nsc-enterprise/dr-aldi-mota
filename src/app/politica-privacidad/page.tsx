export default function PoliticaPrivacidad() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Política de Privacidad</h1>
          
          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Responsable del Tratamiento</h2>
              <p><strong>Dr. Aldimir Mota</strong></p>
              <p>Consultorio Médico Especializado</p>
              <p>Dirección: Av. Adolfo Ruiz Cortinez #300, Tres Valles, Veracruz, México</p>
              <p>Teléfono: 229 369 0042</p>
              <p>Email: medicinmota@outlook.com</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Datos Personales que Recopilamos</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Datos de identificación:</strong> Nombre completo, fecha de nacimiento, documento de identidad</li>
                <li><strong>Datos de contacto:</strong> Teléfono, email, dirección</li>
                <li><strong>Datos de salud:</strong> Síntomas, antecedentes médicos, alergias, medicamentos, historial clínico</li>
                <li><strong>Datos técnicos:</strong> Dirección IP, cookies, datos de navegación</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Finalidad del Tratamiento</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Prestación de servicios médicos y de ultrasonografía</li>
                <li>Gestión de citas y seguimiento médico</li>
                <li>Comunicación con pacientes</li>
                <li>Cumplimiento de obligaciones legales sanitarias</li>
                <li>Mejora de nuestros servicios</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Base Legal</h2>
              <p>El tratamiento de sus datos se basa en:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Consentimiento expreso del paciente</li>
                <li>Ejecución de servicios médicos contratados</li>
                <li>Cumplimiento de obligaciones legales en materia sanitaria</li>
                <li>Interés legítimo para la prestación de servicios médicos</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Conservación de Datos</h2>
              <p>Los datos se conservarán:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Datos médicos:</strong> 5 años desde la última consulta (según normativa sanitaria mexicana)</li>
                <li><strong>Datos de contacto:</strong> Hasta que solicite su eliminación</li>
                <li><strong>Datos de navegación:</strong> Máximo 2 años</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Sus Derechos</h2>
              <p>Usted tiene derecho a:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Acceder a sus datos personales</li>
                <li>Rectificar datos inexactos</li>
                <li>Solicitar la eliminación de sus datos</li>
                <li>Limitar el tratamiento</li>
                <li>Portabilidad de datos</li>
                <li>Oponerse al tratamiento</li>
                <li>Revocar el consentimiento</li>
              </ul>
              <p className="mt-3">Para ejercer estos derechos, contacte: medicinmota@outlook.com</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Seguridad</h2>
              <p>Implementamos medidas técnicas y organizativas para proteger sus datos:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Cifrado de datos sensibles</li>
                <li>Acceso restringido al personal autorizado</li>
                <li>Copias de seguridad regulares</li>
                <li>Protocolos de seguridad informática</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Transferencias Internacionales</h2>
              <p>Sus datos pueden ser procesados por proveedores de servicios tecnológicos ubicados fuera de México, siempre con las garantías adecuadas de protección.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Modificaciones</h2>
              <p>Esta política puede ser actualizada. Le notificaremos cualquier cambio significativo.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Contacto</h2>
              <p>Para cualquier consulta sobre esta política:</p>
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