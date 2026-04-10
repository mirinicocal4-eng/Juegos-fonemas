import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';

interface LibraryProps {
  resources: any[];
}

export const Library: React.FC<LibraryProps> = ({ resources }) => {
  return (
    <motion.div 
      key="library"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <p className="text-zinc-400 text-lg">
        Aquí tienes materiales adicionales, libros y guías para complementar tu entrenamiento fuera de la pista.
      </p>

      <div className="grid grid-cols-1 gap-4">
        {(resources || []).map((res, idx) => (
          <div 
            key={idx}
            className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-between group hover:border-red-500/30 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                {res.icon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{res.type}</span>
                  <h4 className="text-lg font-bold text-white uppercase italic tracking-tight">{res.title}</h4>
                </div>
                <p className="text-zinc-500 text-sm">{res.desc}</p>
              </div>
            </div>
            <button 
              onClick={() => alert('Aquí se abriría el enlace al recurso: ' + res.title)}
              className="p-3 bg-zinc-800 hover:bg-red-600 text-white rounded-xl transition-all"
            >
              <ExternalLink className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      <div className="p-8 bg-red-600/10 border border-red-500/20 rounded-3xl space-y-4">
        <h4 className="text-xl font-black text-red-500 uppercase italic">¿Tienes material propio?</h4>
        <p className="text-zinc-400 text-sm leading-relaxed">
          Puedes enviarme tus PDFs o nombres de libros y yo los añadiré a esta sección para que siempre los tengas a mano en tu taller.
        </p>
      </div>
    </motion.div>
  );
};
