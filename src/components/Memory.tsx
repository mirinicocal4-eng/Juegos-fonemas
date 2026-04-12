import React from 'react';
import { motion } from 'motion/react';
import { VisualContent } from './VisualContent';

interface MemoryProps {
  cards: any[];
  playerCount: number;
  currentPlayer: number;
  playerScores: number[];
  onFlip: (index: number) => void;
  onReset: () => void;
  onBack: () => void;
}

export const Memory: React.FC<MemoryProps> = ({ 
  cards, 
  playerCount,
  currentPlayer,
  playerScores,
  onFlip, 
  onReset, 
  onBack 
}) => {
  const playerColors = ['indigo', 'blue', 'emerald', 'orange'];

  return (
    <motion.div 
      key="memory"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-8"
    >
      {/* Scores Area */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Array.from({ length: playerCount }).map((_, i) => (
          <div 
            key={i}
            className={`p-4 rounded-2xl border-2 transition-all ${currentPlayer === i ? `bg-${playerColors[i]}-600 border-white scale-105 shadow-lg` : 'bg-zinc-900 border-zinc-800 opacity-50'}`}
          >
            <p className="text-[10px] font-black text-white/70 uppercase tracking-widest">Explorador {i + 1}</p>
            <p className="text-2xl font-black text-white italic">{playerScores[i]} pts</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-4">
        {(cards || []).map((card, i) => (
          <motion.button
            key={card.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onFlip(i)}
            className={`aspect-square rounded-2xl flex items-center justify-center text-4xl shadow-xl transition-all ${card.flipped || card.matched ? 'bg-zinc-800 border-2 border-indigo-500' : 'bg-indigo-600'}`}
          >
            {card.flipped || card.matched ? (
              <VisualContent content={card.img} className="w-12 h-12" />
            ) : '✨'}
          </motion.button>
        ))}
      </div>
      <div className="flex gap-4">
        <button onClick={onReset} className="flex-1 py-4 bg-zinc-800 text-white font-bold rounded-xl uppercase">Reiniciar</button>
        <button onClick={onBack} className="flex-1 py-4 bg-white text-black font-black rounded-xl uppercase italic">Volver</button>
      </div>
    </motion.div>
  );
};
