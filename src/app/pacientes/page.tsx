'use client';

import { useEffect, useState } from 'react';
import { Cita } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default function PacientesPage() {
  const [citas, setCitas] = useState<Cita[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempNote, setTempNote] = useState('');

  const fetchCitas = async () => {
    try {
      const res = await fetch('/api/citas/list');
      if (res.ok) {
        const data = await res.json();
        setCitas(data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCitas();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar esta solicitud?')) return;

    try {
      const res = await fetch(`/api/citas/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setCitas(citas.filter(c => c.id !== id));
      }
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  const handleStatusChange = async (id: string, newStatus: Cita['estado']) => {
    try {
      const res = await fetch(`/api/citas/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: newStatus }),
      });
      
      if (res.ok) {
        setCitas(citas.map(c => c.id === id ? { ...c, estado: newStatus } : c));
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const saveNote = async (id: string) => {
    try {
      const res = await fetch(`/api/citas/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notas: tempNote }),
      });
      
      if (res.ok) {
        setCitas(citas.map(c => c.id === id ? { ...c, notas: tempNote } : c));
        setEditingId(null);
      }
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'contactado': return 'bg-yellow-100 text-yellow-800';
      case 'agendado': return 'bg-blue-100 text-blue-800';
      case 'cancelado': return 'bg-red-100 text-red-800';
      case 'finalizado': return 'bg-gray-100 text-gray-800';
      default: return 'bg-green-100 text-green-800'; // pendiente
    }
  };

  return (
    <main className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Solicitudes de Pacientes</h1>
        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
          {citas.length} Total
        </span>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Cargando pacientes...</div>
      ) : citas.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
          <p className="text-gray-500">No hay solicitudes registradas aún.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {citas.map((cita) => (
            <div key={cita.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-lg text-gray-900">{cita.nombre}</h3>
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full capitalize ${getStatusColor(cita.estado)}`}>
                      {cita.estado || 'pendiente'}
                    </span>
                  </div>
                  
                  <p className="text-gray-500 text-sm mb-2 flex items-center gap-2">
                    📞 <a href={`tel:${cita.telefono}`} className="hover:text-blue-600 hover:underline">{cita.telefono}</a>
                  </p>
                  
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-lg text-sm mb-3">
                    "{cita.motivo}"
                  </p>

                  {/* Sección de Notas */}
                  <div className="mt-3">
                    {editingId === cita.id ? (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={tempNote}
                          onChange={(e) => setTempNote(e.target.value)}
                          placeholder="Añadir nota interna..."
                          className="flex-1 text-sm border rounded px-2 py-1"
                          autoFocus
                        />
                        <button onClick={() => saveNote(cita.id)} className="text-xs bg-blue-600 text-white px-2 rounded">Guardar</button>
                        <button onClick={() => setEditingId(null)} className="text-xs text-gray-500 px-2">Cancelar</button>
                      </div>
                    ) : (
                      <div 
                        onClick={() => { setEditingId(cita.id); setTempNote(cita.notas || ''); }}
                        className="text-sm text-gray-500 cursor-pointer hover:bg-gray-50 p-1 rounded border border-transparent hover:border-gray-200 flex items-center gap-2"
                      >
                        📝 {cita.notas ? <span className="text-gray-700">{cita.notas}</span> : <span className="italic text-gray-400">Añadir nota interna...</span>}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2 min-w-[140px]">
                  <span className="text-xs text-gray-400 mb-2">
                    {new Date(cita.fecha_creacion).toLocaleDateString()}
                  </span>
                  
                  <select 
                    value={cita.estado || 'pendiente'}
                    onChange={(e) => handleStatusChange(cita.id, e.target.value as any)}
                    className="text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-1"
                  >
                    <option value="pendiente">Pendiente</option>
                    <option value="contactado">Contactado</option>
                    <option value="agendado">Agendado</option>
                    <option value="cancelado">Cancelado</option>
                    <option value="finalizado">Finalizado</option>
                  </select>

                  <button 
                    onClick={() => handleDelete(cita.id)}
                    className="text-xs text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded transition-colors mt-2"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
