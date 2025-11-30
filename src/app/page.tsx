"use client";
import { useState } from 'react';
import { ActionCard } from '@/components/ActionCard';
import { OutputAEP } from '@/types';
import AuthComponent from '../components/Auth';

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
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-gray-200 font-sans">
      {/* Minimalist Logo Section */}
      <div className="flex flex-col items-center mb-10">
        {/* Caduceus SVG: Cross with two serpents */}
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="30" y="8" width="4" height="48" rx="2" fill="#C0C0C0" />
          <rect x="16" y="30" width="32" height="4" rx="2" fill="#C0C0C0" />
          <path d="M32 16 C28 24, 36 24, 32 32" stroke="#C0C0C0" strokeWidth="2" fill="none" />
          <path d="M32 32 C28 40, 36 40, 32 48" stroke="#C0C0C0" strokeWidth="2" fill="none" />
        </svg>
        <h1 className="text-3xl font-bold mt-4 text-silver" style={{ color: '#C0C0C0' }}>Doctor Aldimir Mota</h1>
      </div>

      <div className="w-full max-w-md p-6 space-y-8">
        {/* Welcome Section */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-gray-100">Bienvenido</h2>
          <p className="text-gray-400">¿En qué podemos ayudarte hoy?</p>
        </div>

        {/* Minimalist Action Button */}
        <div className="bg-gray-900 p-6 rounded-xl shadow border border-gray-800">
          <button
            onClick={fetchSuggestion}
            disabled={loading}
            className="w-full py-4 px-6 bg-silver hover:bg-gray-700 active:bg-gray-800 text-black font-semibold rounded-lg transition-all shadow disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-3"
            style={{ backgroundColor: '#C0C0C0' }}
          >
            {loading ? (
              <>
                <div className="h-5 w-5 border-2 border-gray-400 border-t-black rounded-full animate-spin" />
                <span className="text-black">Analizando...</span>
              </>
            ) : (
              <>
                <span className="text-black">Plan IA</span>
              </>
            )}
          </button>
        </div>

        {/* Result Display */}
        {suggestion && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-2 mb-3 px-1">
              <span className="h-px flex-1 bg-gray-700"></span>
              <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">Sugerencia</span>
              <span className="h-px flex-1 bg-gray-700"></span>
            </div>
            <ActionCard data={suggestion} />
          </div>
        )}
      </div>
    </main>
  );
}
