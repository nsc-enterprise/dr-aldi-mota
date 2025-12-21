import type { Metadata } from 'next'
import './globals.css'
import ChatFlotante from '@/components/ChatFlotante'

export const metadata: Metadata = {
  title: 'Dr. Aldimir Mota - Consulta Médica',
  description: 'Solicitud de consulta médica especializada',
  manifest: '/manifest.json',
  themeColor: '#2563eb',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>
      <body className="min-h-screen">
        {children}
        <ChatFlotante />
      </body>
    </html>
  )
}