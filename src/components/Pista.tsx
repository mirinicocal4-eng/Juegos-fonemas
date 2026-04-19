import React from 'react';
import { motion } from 'motion/react';
import { Mic, Sparkles } from 'lucide-react';
import { PistaEcoItem } from '../types';
import { VisualContent } from './VisualContent';

interface PistaProps {
  pistaEco: PistaEcoItem[];
  pistaFrases: string[];
  pistaTrabalenguas: string[];
  pistaCompletar: { phrase: string; word: string }[];
  onFinish: () => void;
  setFeedback: (fb: { type: 'success' | 'error' | 'info', message: string } | null) => void;
}

export const Pista: React.FC<PistaProps> = ({
  pistaEco,
  pistaFrases,
  pistaTrabalenguas,
  pistaCompletar,
  onFinish,
  setFeedback
}) => {
  const [completedIndices, setCompletedIndices] = React.useState<number[]>([]);

  const toggleComplete = (index: number, word: string) => {
    if (!completedIndices.includes(index)) {
      setCompletedIndices([...completedIndices, index]);
      setFeedback({ type: 'success', message: `¡Muy bien! La palabra es ${word.toUpperCase()} ✨` });
    }
  };

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
          <div className="flex items-center gap-2 text-indigo-500 font-bold uppercase tracking-widest text-xs">
            <Mic className="w-4 h-4" /> Nivel de Eco
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {(pistaEco || []).map((item, i) => (
              <button 
                key={i}
                onClick={() => setFeedback({ type: 'info', message: `¡Repite conmigo: ${item.word.toUpperCase()}! ✨` })}
                className="p-4 bg-zinc-800 hover:bg-zinc-700 rounded-xl flex flex-col items-center gap-2 transition-all group"
              >
                <VisualContent content={item.img} alt={item.word} className="text-4xl group-hover:scale-110 transition-transform w-12 h-12" />
                <span className="text-xs font-bold text-white uppercase">{item.word}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Completar Frases Section */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-yellow-500 font-bold uppercase tracking-widest text-xs">
            <Mic className="w-4 h-4" /> Desafío de Completar Frases
          </div>
          <div className="space-y-4">
            {(pistaCompletar || []).map((item, i) => (
              <div key={i} className="p-4 bg-zinc-800 rounded-xl border-l-4 border-yellow-500 space-y-3">
                <p className="text-lg text-zinc-300 font-medium">
                  "{item.phrase} <span className="text-yellow-500 font-black tracking-widest">{completedIndices.includes(i) ? item.word.toUpperCase() : '_______'}</span>"
                </p>
                {!completedIndices.includes(i) && (
                  <button 
                    onClick={() => toggleComplete(i, item.word)}
                    className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-black rounded-lg text-xs uppercase italic transition-colors"
                  >
                    ¡Completar frase!
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Frases Section */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-indigo-500 font-bold uppercase tracking-widest text-xs">
            <Mic className="w-4 h-4" /> Nivel de Frases
          </div>
          <div className="space-y-3">
            {(pistaFrases || []).map((frase, i) => (
              <button 
                key={i}
                onClick={() => setFeedback({ type: 'info', message: "¡Qué bien suena esa frase! ✨" })}
                className="w-full text-left p-4 bg-zinc-800 hover:bg-zinc-700 rounded-xl font-medium text-lg transition-all border-l-4 border-indigo-600"
              >
                "{frase}"
              </button>
            ))}
          </div>
        </div>

        {/* Trabalenguas Section */}
        <div className="bg-indigo-600/10 border border-indigo-500/30 rounded-3xl p-6 space-y-6">
          <div className="flex items-center gap-2 text-indigo-500 font-bold uppercase tracking-widest text-xs">
            <Sparkles className="w-4 h-4" /> El Gran Desafío: Trabalenguas
          </div>
          
          <div className="space-y-6">
            {(pistaTrabalenguas || []).map((trabalenguas, i) => (
              <div key={i} className="space-y-4 border-b border-indigo-500/10 pb-6 last:border-0">
                <p className="text-2xl font-black italic text-white leading-tight">
                  "{trabalenguas}"
                </p>
                <button 
                  onClick={() => setFeedback({ type: 'success', message: `¡EXCELENTE! Has superado el trabalenguas ${i+1} 🌟` })}
                  className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-xl italic uppercase shadow-lg shadow-indigo-900/40"
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
        className="w-full py-4 bg-indigo-600 text-white font-black rounded-xl italic uppercase shadow-lg shadow-indigo-900/40"
      >
        Terminar Práctica
      </button>
    </motion.div>
  );
};
