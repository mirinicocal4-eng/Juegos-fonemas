import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Volume2 } from 'lucide-react';
import { Phoneme, SemaforoPair } from '../types';
import { VisualContent } from './VisualContent';

interface SemaforoProps {
  phoneme: Phoneme;
  step: number;
  subStep: number;
  semaforoPares: SemaforoPair[];
  semaforoRadar: any[];
  onSetSubStep: (subStep: number) => void;
  onNextStep: () => void;
  setFeedback: (fb: { type: 'success' | 'error' | 'info', message: string } | null) => void;
}

export const Semaforo: React.FC<SemaforoProps> = ({
  phoneme,
  step,
  subStep,
  semaforoPares,
  semaforoRadar,
  onSetSubStep,
  onNextStep,
  setFeedback
}) => {
  return (
    <motion.div 
      key="semaforo"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      <div className="flex gap-2 mb-6">
        <button 
          onClick={() => onSetSubStep(0)}
          className={`flex-1 py-2 rounded-lg font-bold text-xs uppercase tracking-widest transition-all ${subStep === 0 ? 'bg-indigo-600 text-white' : 'bg-zinc-900 text-zinc-500'}`}
        >
          Nivel A: Pares
        </button>
        <button 
          onClick={() => onSetSubStep(1)}
          className={`flex-1 py-2 rounded-lg font-bold text-xs uppercase tracking-widest transition-all ${subStep === 1 ? 'bg-indigo-600 text-white' : 'bg-zinc-900 text-zinc-500'}`}
        >
          Nivel B: Radar
        </button>
      </div>

      {subStep === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 space-y-8">
          <div className="text-center space-y-4">
            <p className="text-zinc-400 uppercase tracking-widest text-xs font-bold">Duelo de Sonidos</p>
            <p className="text-lg text-white italic">¿Cuál tiene el sonido {phoneme === 'R' ? 'fuerte' : phoneme}?</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {[1, 2].map((num) => {
              const pair = semaforoPares[step] || { w1: '', s1: '', i1: '', w2: '', s2: '', i2: '', target: 1 };
              const word = num === 1 ? pair.w1 : pair.w2;
              const soundLabel = num === 1 ? pair.s1 : pair.s2;
              const img = num === 1 ? pair.i1 : pair.i2;
              const isTarget = num === pair.target;
              
              return (
                <motion.button
                  key={`${num}-${step}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    if (isTarget) {
                      setFeedback({ type: 'success', message: `¡Genial! ${word} es la opción correcta ✅` });
                    } else {
                      setFeedback({ type: 'info', message: `¡Ups! ${word} no es lo que buscamos 🤫` });
                    }
                  }}
                  className={`bg-zinc-800 border-2 rounded-2xl p-6 flex flex-col items-center gap-4 transition-all group ${isTarget ? 'hover:border-green-500' : 'hover:border-red-500'} border-zinc-700`}
                >
                  <VisualContent content={img} alt={word} className="text-6xl group-hover:scale-110 transition-transform w-16 h-16" />
                  <div className="text-center">
                    <span className="block text-2xl font-black text-white italic tracking-tighter">{word}</span>
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${isTarget ? 'text-green-500' : 'text-zinc-500'}`}>
                      {soundLabel}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          <button 
            onClick={onNextStep}
            className="w-full py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 uppercase text-xs tracking-widest"
          >
            Siguiente Pareja <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 space-y-8">
          <div className="text-center space-y-4">
            <p className="text-zinc-400 uppercase tracking-widest text-xs font-bold">Radar de Sonidos</p>
            <p className="text-lg text-white italic">¿Contiene el sonido {phoneme === 'R' ? 'fuerte' : phoneme}?</p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {(semaforoRadar || []).map((item, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => {
                  if (item.hasTarget) {
                    setFeedback({ type: 'success', message: `¡Sonido detectado! ${item.word} tiene el sonido ✅` });
                  } else {
                    setFeedback({ type: 'error', message: `¡Sonido no encontrado! ${item.word} no tiene el sonido ❌` });
                  }
                }}
                className="bg-zinc-800 border border-zinc-700 p-4 rounded-xl flex items-center justify-between hover:bg-zinc-700 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <VisualContent content={item.img} alt={item.word} className="text-3xl group-hover:scale-110 transition-transform w-10 h-10" />
                  <span className="text-xl font-black text-white italic">{item.word}</span>
                </div>
                <Volume2 className="w-5 h-5 text-zinc-600 group-hover:text-indigo-500" />
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};
