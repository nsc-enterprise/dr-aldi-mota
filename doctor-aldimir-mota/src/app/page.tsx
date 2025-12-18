'use client';

import { useState } from 'react';
import { ActionCard } from '@/components/ActionCard';
import { GoogleSignInButton } from '@/components/GoogleSignInButton';
import { OutputAEP } from '@/types';

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
    <main className="flex min-h-screen flex-col items-center bg-gray-50 text-gray-900 font-sans">
      {/* Header eliminado porque ya está en el Navbar */}
      
      <div className="w-full max-w-lg p-6 space-y-8 mt-8">
        
        {/* Login Section */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <GoogleSignInButton />
        </div>

        {/* Welcome Section */}
        <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-gray-800">Hola, Doctor.</h2>
            <p className="text-gray-500">¿En qué nos enfocamos hoy?</p>
        </div>

        {/* Action Button */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <button
            onClick={fetchSuggestion}
            disabled={loading}
            className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-xl transition-all shadow-blue-200 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-3"
          >
            {loading ? (
              <>
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Analizando prioridades...</span>
              </>
            ) : (
              <>
                <span>✨</span>
                <span>Obtener Plan de Acción IA</span>
              </>
            )}
          </button>
          <p className="text-center text-xs text-gray-400 mt-3">
            Powered by AEP Intelligence
          </p>
        </div>

        {/* Result Display */}
        {suggestion && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-2 mb-3 px-1">
                <span className="h-px flex-1 bg-gray-200"></span>
                <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">Sugerencia</span>
                <span className="h-px flex-1 bg-gray-200"></span>
            </div>
            <ActionCard data={suggestion} />
          </div>
        )}
      </div>
    </main>
  );
}
