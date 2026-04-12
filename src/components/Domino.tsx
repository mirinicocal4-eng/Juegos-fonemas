import React from 'react';
import { motion } from 'motion/react';
import { VisualContent } from './VisualContent';

interface DominoProps {
  chain: { left: string, right: string }[];
  hand: { left: string, right: string }[];
  poolCount: number;
  onPlay: (index: number) => void;
  onDraw: () => void;
  onReset: () => void;
  onBack: () => void;
}

export const Domino: React.FC<DominoProps> = ({ chain, hand, poolCount, onPlay, onDraw, onReset, onBack }) => {
  return (
    <motion.div 
      key="domino"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 overflow-x-auto">
        <div className="flex gap-2 min-w-max pb-4">
          {(chain || []).map((piece, i) => (
            <div key={`chain-${i}`} className="flex bg-zinc-800 border-2 border-zinc-700 rounded-xl overflow-hidden shadow-lg">
              <div className="w-12 h-16 flex items-center justify-center text-2xl border-r border-zinc-700 bg-zinc-900/50">
                <VisualContent content={piece.left} className="w-8 h-8" />
              </div>
              <div className="w-12 h-16 flex items-center justify-center text-2xl bg-zinc-900/50">
                <VisualContent content={piece.right} className="w-8 h-8" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center px-2">
          <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Tus Piezas</p>
          <button 
            onClick={onDraw}
            disabled={poolCount === 0}
            className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${poolCount > 0 ? 'bg-indigo-600 text-white hover:bg-indigo-500' : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'}`}
          >
            Robar ({poolCount})
          </button>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {(hand || []).map((piece, i) => (
            <button 
              key={`hand-${i}`}
              onClick={() => onPlay(i)}
              className="flex bg-zinc-800 border-2 border-indigo-600/30 rounded-xl overflow-hidden hover:scale-110 hover:border-indigo-600 transition-all shadow-xl"
            >
              <div className="w-14 h-20 flex items-center justify-center text-3xl border-r border-zinc-700 bg-zinc-900/50">
                <VisualContent content={piece.left} className="w-10 h-10" />
              </div>
              <div className="w-14 h-20 flex items-center justify-center text-3xl bg-zinc-900/50">
                <VisualContent content={piece.right} className="w-10 h-10" />
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <button onClick={onReset} className="flex-1 py-4 bg-zinc-800 text-white font-bold rounded-xl uppercase">Nuevas Piezas</button>
        <button onClick={onBack} className="flex-1 py-4 bg-white text-black font-black rounded-xl uppercase italic">Volver</button>
      </div>
    </motion.div>
  );
};
