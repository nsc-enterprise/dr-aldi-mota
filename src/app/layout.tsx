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
      <body className="min-h-screen">
        {children}
        <ChatFlotante />
      </body>
    </html>
  )
}
