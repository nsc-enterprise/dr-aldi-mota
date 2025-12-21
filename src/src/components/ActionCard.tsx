import { OutputAEP } from '@/types';

interface ActionCardProps {
  data: OutputAEP;
}

export const ActionCard = ({ data }: ActionCardProps) => {
  const getColor = (type: string) => {
    switch (type) {
      case 'micro_tarea': return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'alerta_anticipatoria': return 'bg-red-50 border-red-200 text-red-800';
      case 'motivacion': return 'bg-amber-50 border-amber-200 text-amber-800';
      case 'insight_proactivo': return 'bg-purple-50 border-purple-200 text-purple-800';
      case 'micro_aprendizaje': return 'bg-emerald-50 border-emerald-200 text-emerald-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
        case 'micro_tarea': return '📋';
        case 'alerta_anticipatoria': return '🚨';
        case 'motivacion': return '💪';
        case 'insight_proactivo': return '💡';
        case 'micro_aprendizaje': return '🎓';
        default: return '🤖';
    }
  }

  return (
    <div className={`p-5 border rounded-xl shadow-sm transition-all hover:shadow-md ${getColor(data.tipo_accion)}`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
            <span className="text-2xl">{getIcon(data.tipo_accion)}</span>
            <h3 className="font-bold text-lg leading-tight">{data.titulo}</h3>
        </div>
      </div>
      
      <p className="text-base mb-4 leading-relaxed opacity-90">{data.contenido}</p>
      
      <div className="flex justify-between items-end pt-3 border-t border-black/5">
        {data.referencia ? (
          <span className="text-xs font-medium px-2 py-1 bg-white/60 rounded text-black/60">
            Ref: {data.referencia}
          </span>
        ) : <div></div>}
        <span className="text-xs font-semibold uppercase tracking-wider opacity-50">
          {data.fuente}
        </span>
      </div>
    </div>
  );
};
