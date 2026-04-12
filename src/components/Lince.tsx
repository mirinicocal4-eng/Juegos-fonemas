import React from 'react';
import { motion } from 'motion/react';
import { VisualContent } from './VisualContent';

interface LinceProps {
  target: { img: string, name: string } | null;
  images: any[];
  score: number;
  highScore: number;
  onCheck: (item: any) => void;
  onReset: () => void;
  onBack: () => void;
}

export const Lince: React.FC<LinceProps> = ({ target, images, score, highScore, onCheck, onReset, onBack }) => {
  return (
    <motion.div 
      key="lince"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-center bg-zinc-900 p-4 rounded-2xl border border-zinc-800">
        <div className="text-center flex-1">
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Busca este objeto</p>
          <div className="text-6xl my-2 flex justify-center">
            <VisualContent content={target?.img || ''} className="w-16 h-16" />
          </div>
          <p className="text-xl font-black text-white uppercase italic">
            {target ? target.name : "¡Conseguido! 🏆"}
          </p>
        </div>
        <div className="w-px h-16 bg-zinc-800 mx-4" />
        <div className="text-right pr-4">
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Puntos</p>
          <p className="text-3xl font-black text-indigo-500 italic">{score}</p>
          <p className="text-[8px] text-zinc-600 uppercase font-bold">Récord: {highScore}</p>
        </div>
      </div>

      <div className={`grid grid-cols-5 gap-2 ${!target ? 'opacity-50 pointer-events-none' : ''}`}>
        {(images || []).map((img, i) => (
          <button 
            key={`lince-${i}`}
            onClick={() => target && onCheck(img)}
            className="aspect-square bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center text-3xl hover:bg-zinc-800 hover:scale-110 transition-all"
          >
            <VisualContent content={img.img} className="w-10 h-10" />
          </button>
        ))}
      </div>
      <div className="flex gap-4">
        <button onClick={onReset} className="flex-1 py-4 bg-zinc-800 text-white font-bold rounded-xl uppercase">Mezclar</button>
        <button onClick={onBack} className="flex-1 py-4 bg-white text-black font-black rounded-xl uppercase italic">Volver</button>
      </div>
    </motion.div>
  );
};
