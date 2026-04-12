import React from 'react';
import { motion } from 'motion/react';
import { VisualContent } from './VisualContent';

interface DominoProps {
  chain: { left: string, right: string }[];
  hands: { left: string, right: string }[][];
  poolCount: number;
  playerCount: number;
  currentPlayer: number;
  onPlay: (piece: any, index: number) => void;
  onDraw: () => void;
  onReset: () => void;
  onBack: () => void;
}

export const Domino: React.FC<DominoProps> = ({ 
  chain, 
  hands, 
  poolCount, 
  playerCount,
  currentPlayer,
  onPlay, 
  onDraw, 
  onReset, 
  onBack 
}) => {
  const playerColors = ['indigo', 'blue', 'emerald', 'orange'];
  const currentHand = hands[currentPlayer] || [];

  return (
    <motion.div 
      key="domino"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Players Info */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Array.from({ length: playerCount }).map((_, i) => (
          <div 
            key={i}
            className={`p-4 rounded-2xl border-2 transition-all ${currentPlayer === i ? `bg-${playerColors[i]}-600 border-white scale-105 shadow-lg` : 'bg-zinc-900 border-zinc-800 opacity-50'}`}
          >
            <p className="text-[10px] font-black text-white/70 uppercase tracking-widest">Explorador {i + 1}</p>
            <p className="text-xl font-black text-white italic">{(hands[i] || []).length} piezas</p>
          </div>
        ))}
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 overflow-x-auto">
        <div className="flex gap-2 min-w-max pb-4 justify-center">
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
          <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Mano del Explorador {currentPlayer + 1}</p>
          <button 
            onClick={onDraw}
            disabled={poolCount === 0}
            className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${poolCount > 0 ? 'bg-indigo-600 text-white hover:bg-indigo-500' : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'}`}
          >
            Robar ({poolCount})
          </button>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {currentHand.map((piece, i) => (
            <button 
              key={`hand-${i}`}
              onClick={() => onPlay(piece, i)}
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
