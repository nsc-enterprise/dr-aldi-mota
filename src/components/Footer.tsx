import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Información del Doctor */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Dr. Aldimir Mota</h3>
            <p className="text-gray-300 mb-2">Especialista en Ultrasonidos Diagnósticos</p>
            <p className="text-gray-300 text-sm">Av. Adolfo Ruiz Cortinez #300</p>
            <p className="text-gray-300 text-sm">Tres Valles, Veracruz, México</p>
            <p className="text-gray-300 text-sm mt-2">Tel: 229 369 0042</p>
            <p className="text-gray-300 text-sm">medicinmota@outlook.com</p>
          </div>

          {/* Enlaces Rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-300 hover:text-white transition-colors">Inicio</Link></li>
              <li><Link href="/agendar" className="text-gray-300 hover:text-white transition-colors">Agendar Cita</Link></li>
            </ul>
          </div>

          {/* Enlaces Legales */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Información Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/politica-privacidad" className="text-gray-300 hover:text-white transition-colors">Política de Privacidad</Link></li>
              <li><Link href="/cookies" className="text-gray-300 hover:text-white transition-colors">Política de Cookies</Link></li>
              <li><Link href="/terminos" className="text-gray-300 hover:text-white transition-colors">Términos y Condiciones</Link></li>
              <li><Link href="/aviso-legal" className="text-gray-300 hover:text-white transition-colors">Aviso Legal</Link></li>
            </ul>
          </div>
        </div>

        {/* Separador */}
        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Dr. Aldimir Mota. Todos los derechos reservados.
            </p>
            <p className="text-gray-400 text-sm mt-2 md:mt-0">
              Sitio web médico profesional
            </p>
          </div>
        </div>

        {/* Aviso Médico */}
        <div className="mt-4 p-3 bg-blue-900 bg-opacity-50 rounded-lg">
          <p className="text-blue-200 text-xs text-center">
            <strong>Aviso Médico:</strong> La información de este sitio es de carácter general y no sustituye la consulta médica profesional. 
            En caso de emergencia, acuda inmediatamente al servicio de urgencias más cercano.
          </p>
        </div>
      </div>
    </footer>
  )
}