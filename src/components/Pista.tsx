import React from 'react';
import { motion } from 'motion/react';
import { Flag, Trophy } from 'lucide-react';
import { PistaEcoItem } from '../types';

interface PistaProps {
  pistaEco: PistaEcoItem[];
  pistaFrases: string[];
  pistaTrabalenguas: string[];
  onFinish: () => void;
  setFeedback: (fb: { type: 'success' | 'error' | 'info', message: string } | null) => void;
}

export const Pista: React.FC<PistaProps> = ({
  pistaEco,
  pistaFrases,
  pistaTrabalenguas,
  onFinish,
  setFeedback
}) => {
  return (
    <motion.div 
      key="pista"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-8"
    >
      <div className="grid grid-cols-1 gap-8">
        {/* Eco Section */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-red-500 font-bold uppercase tracking-widest text-xs">
            <Flag className="w-4 h-4" /> Recta de Eco
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {(pistaEco || []).map((item, i) => (
              <button 
                key={i}
                onClick={() => setFeedback({ type: 'info', message: `¡Repite conmigo: ${item.word.toUpperCase()}! 🏎️` })}
                className="p-4 bg-zinc-800 hover:bg-zinc-700 rounded-xl flex flex-col items-center gap-2 transition-all group"
              >
                <span className="text-4xl group-hover:scale-110 transition-transform">{item.img}</span>
                <span className="text-xs font-bold text-white uppercase">{item.word}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Frases Section */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-red-500 font-bold uppercase tracking-widest text-xs">
            <Flag className="w-4 h-4" /> Recta de Frases
          </div>
          <div className="space-y-3">
            {(pistaFrases || []).map((frase, i) => (
              <button 
                key={i}
                onClick={() => setFeedback({ type: 'info', message: "¡Qué bien suena esa frase! 🏎️✨" })}
                className="w-full text-left p-4 bg-zinc-800 hover:bg-zinc-700 rounded-xl font-medium text-lg transition-all border-l-4 border-red-600"
              >
                "{frase}"
              </button>
            ))}
          </div>
        </div>

        {/* Trabalenguas Section */}
        <div className="bg-red-600/10 border border-red-500/30 rounded-3xl p-6 space-y-6">
          <div className="flex items-center gap-2 text-red-500 font-bold uppercase tracking-widest text-xs">
            <Trophy className="w-4 h-4" /> Curva Peligrosa: Trabalenguas
          </div>
          
          <div className="space-y-6">
            {(pistaTrabalenguas || []).map((trabalenguas, i) => (
              <div key={i} className="space-y-4 border-b border-red-500/10 pb-6 last:border-0">
                <p className="text-2xl font-black italic text-white leading-tight">
                  "{trabalenguas}"
                </p>
                <button 
                  onClick={() => setFeedback({ type: 'success', message: `¡CAMPEÓN! Has superado el trabalenguas ${i+1} 🏆` })}
                  className="w-full py-4 bg-red-600 hover:bg-red-500 text-white font-black rounded-xl italic uppercase shadow-lg shadow-red-900/40"
                >
                  ¡Lo he conseguido!
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button 
        onClick={onFinish}
        className="w-full py-4 bg-red-600 text-white font-black rounded-xl italic uppercase shadow-lg shadow-red-900/40"
      >
        Terminar Entrenamiento
      </button>
    </motion.div>
  );
};
