import React from 'react';
import { motion } from 'motion/react';
import { VisualContent } from './VisualContent';

interface BingoProps {
  player1Board: any[];
  player2Board: any[];
  onToggle: (player: 1 | 2, index: number) => void;
  onReset: () => void;
  onBack: () => void;
}

export const Bingo: React.FC<BingoProps> = ({ player1Board, player2Board, onToggle, onReset, onBack }) => {
  return (
    <motion.div 
      key="bingo"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-xl font-black italic text-indigo-500 uppercase">Explorador 1</h3>
          <div className="grid grid-cols-3 gap-2">
            {(player1Board || []).map((item, i) => (
              <button 
                key={`p1-${i}`}
                onClick={() => onToggle(1, i)}
                className={`aspect-square rounded-xl flex items-center justify-center text-3xl border-2 transition-all ${item.marked ? 'bg-indigo-600 border-white scale-95 opacity-50' : 'bg-zinc-900 border-zinc-800'}`}
              >
                <VisualContent content={item.img} className="w-10 h-10" />
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-black italic text-blue-500 uppercase">Explorador 2</h3>
          <div className="grid grid-cols-3 gap-2">
            {(player2Board || []).map((item, i) => (
              <button 
                key={`p2-${i}`}
                onClick={() => onToggle(2, i)}
                className={`aspect-square rounded-xl flex items-center justify-center text-3xl border-2 transition-all ${item.marked ? 'bg-blue-600 border-white scale-95 opacity-50' : 'bg-zinc-900 border-zinc-800'}`}
              >
                <VisualContent content={item.img} className="w-10 h-10" />
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <button onClick={onReset} className="flex-1 py-4 bg-zinc-800 text-white font-bold rounded-xl uppercase">Nuevos Cartones</button>
        <button onClick={onBack} className="flex-1 py-4 bg-white text-black font-black rounded-xl uppercase italic">Volver</button>
      </div>
    </motion.div>
  );
};
