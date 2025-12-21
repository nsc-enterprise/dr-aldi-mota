'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { InstallButton } from './InstallButton';

export function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-blue-900 mr-8">Dr. Mota</span>

            <div className="hidden md:flex space-x-4">
              <Link
                href="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/')
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
              >
                🔬 Campaña Ultrasonidos
              </Link>

              <Link
                href="/completo"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/completo')
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
              >
                🏥 Formulario Completo
              </Link>

              <Link
                href="/pacientes"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/pacientes')
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
              >
                👥 Dashboard
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <InstallButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
