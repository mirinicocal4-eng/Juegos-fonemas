import React from 'react';
import { motion } from 'motion/react';
import { VisualContent } from './VisualContent';

interface DobbleProps {
  cards: { img: string, name: string }[][];
  playerCount: number;
  currentPlayer: number;
  playerScores: number[];
  onCheck: (img: string) => void;
  onReset: () => void;
  onBack: () => void;
}

export const Dobble: React.FC<DobbleProps> = ({ 
  cards, 
  playerCount,
  currentPlayer,
  playerScores,
  onCheck, 
  onReset, 
  onBack 
}) => {
  const playerColors = ['indigo', 'blue', 'emerald', 'orange'];

  return (
    <motion.div 
      key="dobble"
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

      <div className="flex flex-col sm:flex-row justify-center items-center gap-12 py-8 relative">
        <div className={`absolute top-0 left-0 w-full h-1 bg-${playerColors[currentPlayer]}-500 rounded-full`} />
        {(cards || []).map((card, cardIdx) => (
          <div key={cardIdx} className="relative w-64 h-64 bg-white rounded-full shadow-2xl border-8 border-zinc-200 overflow-hidden">
            <div className="absolute inset-0 p-4 flex items-center justify-center">
              {(card || []).map((item, i) => {
                const isCenter = i === 0;
                const angle = (i - 1) * (360 / (card.length - 1)) * (Math.PI / 180);
                const radius = isCenter ? 0 : 65; 
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                
                return (
                  <button 
                    key={`card-${cardIdx}-item-${i}`}
                    onClick={() => onCheck(item.img)}
                    className="absolute flex items-center justify-center hover:scale-125 transition-transform"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: `translate(-50%, -50%)`,
                    }}
                  >
                    <VisualContent content={item.img} alt={item.name} className="w-14 h-14" />
                  </button>
                );
              })}
            </div>
            <div className="absolute inset-0 border-8 border-zinc-100 rounded-full pointer-events-none" />
          </div>
        ))}
      </div>

      <div className="text-center space-y-2">
        <p className="text-indigo-500 font-black italic text-2xl uppercase tracking-tighter">¡Busca la imagen repetida!</p>
        <p className="text-zinc-500 text-sm">Solo hay una imagen igual en las dos cartas. ¡Sé el más rápido!</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button onClick={onReset} className="flex-1 py-4 bg-zinc-800 text-white font-bold rounded-xl uppercase">Nuevas Cartas</button>
        <button onClick={onBack} className="flex-1 py-4 bg-white text-black font-black rounded-xl uppercase italic">Volver</button>
      </div>
    </motion.div>
  );
};
