'use client';

import { useState } from 'react';
import { ActionCard } from '@/components/ActionCard';
import { GoogleSignInButton } from '@/components/GoogleSignInButton';
import { OutputAEP } from '@/types';

export const dynamic = 'force-dynamic';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<OutputAEP | null>(null);

  const fetchSuggestion = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/ai-medico', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            usuario_id: 'demo-user',
            contexto: 'dashboard-inicial' 
        }),
      });
      
      if (res.ok) {
          const data = await res.json();
          setSuggestion(data);
      }
    } catch (error) {
      console.error("Error fetching AI suggestion:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        
        {/* Login Section */}
        <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 mb-8">
          <GoogleSignInButton />
        </div>

        {/* Welcome Section */}
        <div className="text-center space-y-3 mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Dr. Aldimir Mota</h1>
          <p className="text-xl text-gray-600">Sistema de Gestión Médica</p>
        </div>

        {/* Action Button */}
        <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 mb-8">
          <button
            onClick={fetchSuggestion}
            disabled={loading}
            className="w-full py-5 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-lg font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-3"
          >
            {loading ? (
              <>
                <div className="h-6 w-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Analizando...</span>
              </>
            ) : (
              <>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Obtener Sugerencias IA</span>
              </>
            )}
          </button>
          <p className="text-center text-sm text-gray-500 mt-4">
            Powered by Google Gemini AI
          </p>
        </div>

        {/* Result Display */}
        {suggestion && (
          <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
            <ActionCard data={suggestion} />
          </div>
        )}
      </div>
    </main>
  );
}
