import React from 'react';
import { motion } from 'motion/react';

interface DobbleProps {
  cards: { img: string, name: string }[][];
  onCheck: (img: string) => void;
  onReset: () => void;
  onBack: () => void;
}

export const Dobble: React.FC<DobbleProps> = ({ cards, onCheck, onReset, onBack }) => {
  return (
    <motion.div 
      key="dobble"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-8"
    >
      <div className="flex flex-col sm:flex-row justify-center items-center gap-12 py-8">
        {(cards || []).map((card, cardIdx) => (
          <div key={cardIdx} className="relative w-64 h-64 bg-white rounded-full shadow-2xl border-8 border-zinc-200 overflow-hidden">
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 p-4">
              {(card || []).map((item, i) => {
                // Posiciones deterministas pero que parezcan aleatorias
                return (
                  <button 
                    key={i}
                    onClick={() => onCheck(item.img)}
                    className="flex items-center justify-center text-4xl hover:scale-125 transition-transform"
                    style={{
                      transform: `translate(${(i % 3 - 1) * 10}px, ${(Math.floor(i / 3) - 1) * 10}px) rotate(${i * 45}deg)`,
                    }}
                  >
                    {item.img}
                  </button>
                );
              })}
            </div>
            <div className="absolute inset-0 border-8 border-zinc-100 rounded-full pointer-events-none" />
          </div>
        ))}
      </div>

      <div className="text-center space-y-2">
        <p className="text-red-500 font-black italic text-2xl uppercase tracking-tighter">¡Busca la imagen repetida!</p>
        <p className="text-zinc-500 text-sm">Solo hay una imagen igual en las dos cartas. ¡Sé el más rápido!</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button onClick={onReset} className="flex-1 py-4 bg-zinc-800 text-white font-bold rounded-xl uppercase">Nuevas Cartas</button>
        <button onClick={onBack} className="flex-1 py-4 bg-white text-black font-black rounded-xl uppercase italic">Volver</button>
      </div>
    </motion.div>
  );
};
