import React from 'react';
import { motion } from 'motion/react';
import { VisualContent } from './VisualContent';

interface BingoProps {
  boards: any[][];
  playerCount: number;
  currentBall: { img: string, name: string } | null;
  onNextBall: () => void;
  onToggle: (playerIndex: number, itemIndex: number) => void;
  onReset: (playerCount?: number) => void;
  onBack: () => void;
}

export const Bingo: React.FC<BingoProps> = ({ 
  boards, 
  playerCount,
  currentBall,
  onNextBall,
  onToggle, 
  onReset, 
  onBack 
}) => {
  const playerColors = ['indigo', 'blue', 'emerald', 'orange'];

  return (
    <motion.div 
      key="bingo"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      {/* Configuration Area */}
      {boards.length === 0 && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 flex flex-col items-center gap-6">
          <h3 className="text-2xl font-black text-white uppercase italic">¿Cuántos exploradores juegan?</h3>
          <div className="flex gap-4">
            {[1, 2, 3, 4].map(num => (
              <button
                key={num}
                onClick={() => onReset(num)}
                className="w-16 h-16 bg-zinc-800 hover:bg-indigo-600 text-white text-2xl font-black rounded-2xl transition-all hover:scale-110"
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      )}

      {boards.length > 0 && (
        <>
          {/* Central Area: Current Ball */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 flex flex-col items-center justify-center gap-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-indigo-600/30" />
            
            <div className="text-center space-y-1">
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em]">Imagen a buscar</p>
              <h4 className="text-white font-black italic uppercase text-xl">¡Saca una ficha!</h4>
            </div>

            <div className="w-32 h-32 bg-zinc-800 rounded-full border-4 border-zinc-700 flex items-center justify-center shadow-inner relative group">
              {currentBall ? (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  key={currentBall.img}
                >
                  <VisualContent content={currentBall.img} alt={currentBall.name} className="w-20 h-20" />
                </motion.div>
              ) : (
                <div className="text-zinc-700">
                  <VisualContent content="❓" className="w-16 h-16 opacity-20" />
                </div>
              )}
            </div>

            {currentBall && (
              <p className="text-indigo-400 font-black text-2xl italic uppercase tracking-tighter">
                {currentBall.name}
              </p>
            )}

            <button 
              onClick={onNextBall}
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl uppercase italic tracking-widest shadow-lg shadow-indigo-900/20 transition-all hover:scale-105 active:scale-95"
            >
              {currentBall ? 'Siguiente Ficha' : 'Empezar Bingo'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {boards.map((board, pIdx) => (
              <div key={pIdx} className="space-y-4">
                <h3 className={`text-xl font-black italic uppercase text-${playerColors[pIdx]}-500`}>
                  Explorador {pIdx + 1}
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {(board || []).map((item: any, i: number) => (
                    <button 
                      key={`p${pIdx}-${i}`}
                      onClick={() => onToggle(pIdx, i)}
                      className={`aspect-square rounded-xl flex items-center justify-center text-3xl border-2 transition-all ${
                        item.marked 
                          ? `bg-${playerColors[pIdx]}-600 border-white scale-95 opacity-50` 
                          : 'bg-zinc-900 border-zinc-800 hover:border-zinc-600'
                      }`}
                    >
                      <VisualContent content={item.img} alt={item.name} className="w-10 h-10" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="flex gap-4">
        <button onClick={() => onReset()} className="flex-1 py-4 bg-zinc-800 text-white font-bold rounded-xl uppercase">Nuevos Cartones</button>
        {boards.length > 0 && (
          <button onClick={() => onReset(0)} className="flex-1 py-4 bg-zinc-800/50 text-zinc-400 font-bold rounded-xl uppercase text-xs">Cambiar Jugadores</button>
        )}
        <button onClick={onBack} className="flex-1 py-4 bg-white text-black font-black rounded-xl uppercase italic">Volver</button>
      </div>
    </motion.div>
  );
};
