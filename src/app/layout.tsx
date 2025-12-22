import type { Metadata } from 'next'
import './globals.css'
import ChatFlotante from '@/components/ChatFlotante'

export const metadata: Metadata = {
  title: 'Dr. Aldimir Mota - Consulta Médica',
  description: 'Solicitud de consulta médica especializada',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="min-h-screen border-4 border-blue-200">
        <div className="min-h-screen border-2 border-blue-100 m-1">
          {children}
        </div>
        <ChatFlotante />
      </body>
    </html>
  )
}
