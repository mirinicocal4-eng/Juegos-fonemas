import React from 'react';
import { motion } from 'motion/react';
import { Gamepad2, CheckCircle2, AlertCircle, RotateCcw } from 'lucide-react';
import { World } from '../types';
import { VisualContent } from './VisualContent';

interface GranPremioProps {
  step: number;
  diceValue: number | null;
  granPremioBoard: any[];
  playerCount: number;
  currentPlayer: number;
  playerPositions: number[];
  onRollDice: () => void;
  onNextTurn: () => void;
  onGoToWorld: (world: World) => void;
}

export const GranPremio: React.FC<GranPremioProps> = ({
  step,
  diceValue,
  granPremioBoard,
  playerCount,
  currentPlayer,
  playerPositions,
  onRollDice,
  onNextTurn,
  onGoToWorld
}) => {
  const playerColors = ['bg-indigo-600', 'bg-blue-600', 'bg-emerald-600', 'bg-orange-600'];
  const playerBorderColors = ['border-indigo-400', 'border-blue-400', 'border-emerald-400', 'border-orange-400'];

  return (
    <motion.div 
      key="gran-premio"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-8"
    >
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 text-center space-y-8 relative overflow-hidden">
        <div className={`absolute top-0 left-0 w-full h-2 ${playerColors[currentPlayer]}`} />
        
        <div className="flex justify-center gap-8 items-center">
          <div className="relative">
            <div className={`absolute inset-0 ${playerColors[currentPlayer]} blur-2xl opacity-20 animate-pulse`} />
            <button 
              onClick={onRollDice}
              disabled={diceValue !== null}
              className={`relative w-32 h-32 bg-zinc-800 border-4 ${playerBorderColors[currentPlayer]} rounded-3xl flex items-center justify-center text-5xl font-black italic text-white shadow-2xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100`}
            >
              {diceValue || <Gamepad2 className="w-12 h-12" />}
            </button>
          </div>

          {diceValue !== null && (
            <button 
              onClick={onNextTurn}
              className="px-6 py-4 bg-white text-black font-black rounded-2xl uppercase italic hover:bg-zinc-200 transition-all"
            >
              Siguiente Turno
            </button>
          )}
        </div>
        
        <div className="space-y-2">
          <p className={`font-bold uppercase tracking-widest text-xs ${playerColors[currentPlayer].replace('bg-', 'text-')}`}>
            Turno del Explorador {currentPlayer + 1}
          </p>
          <h3 className="text-3xl font-black italic text-white uppercase">¡Tiro el dado!</h3>
        </div>

        {diceValue && granPremioBoard[step] && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800 space-y-4"
          >
            <div className="flex justify-center">
              <VisualContent content={granPremioBoard[step].img} alt={granPremioBoard[step].name} className="text-7xl mb-2 w-24 h-24" />
            </div>
            <div className="space-y-1">
              <span className="text-indigo-500 font-bold text-sm uppercase tracking-widest">Paso {granPremioBoard[step].id}: {granPremioBoard[step].name}</span>
              <p className="text-2xl font-bold text-white leading-tight italic">
                {granPremioBoard[step].q}
              </p>
            </div>
          </motion.div>
        )}
      </div>

      <div className="grid grid-cols-6 gap-2">
        {granPremioBoard.map((item, i) => {
          const playersHere = playerPositions.map((pos, idx) => pos === i ? idx : -1).filter(idx => idx !== -1);
          return (
            <div 
              key={item.id}
              className={`aspect-square rounded-lg flex flex-col items-center justify-center text-xl border-2 transition-all relative ${playersHere.length > 0 ? 'bg-zinc-800 border-white scale-105 z-10 shadow-lg' : 'bg-zinc-900 border-zinc-800 opacity-50'}`}
            >
              <VisualContent content={item.img} alt={item.name} className="w-10 h-10 mb-1" />
              <div className="flex gap-0.5 absolute -bottom-1">
                {playersHere.map(pIdx => (
                  <div key={pIdx} className={`w-3 h-3 rounded-full ${playerColors[pIdx]} border border-white`} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="space-y-4 pt-8 border-t border-zinc-800">
        <div className="text-center">
          <h3 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] italic">Juegos Rápidos ✨</h3>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
          <button 
            onClick={() => onGoToWorld('MEMORY')}
            className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl hover:bg-zinc-800 transition-all text-center space-y-2"
          >
            <Gamepad2 className="w-6 h-6 mx-auto text-indigo-500" />
            <p className="text-xs font-bold uppercase">Memory</p>
          </button>
          <button 
            onClick={() => onGoToWorld('BINGO')}
            className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl hover:bg-zinc-800 transition-all text-center space-y-2"
          >
            <CheckCircle2 className="w-6 h-6 mx-auto text-indigo-500" />
            <p className="text-xs font-bold uppercase">Bingo</p>
          </button>
          <button 
            onClick={() => onGoToWorld('LINCE')}
            className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl hover:bg-zinc-800 transition-all text-center space-y-2"
          >
            <AlertCircle className="w-6 h-6 mx-auto text-indigo-500" />
            <p className="text-xs font-bold uppercase">Lince</p>
          </button>
          <button 
            onClick={() => onGoToWorld('DOMINO')}
            className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl hover:bg-zinc-800 transition-all text-center space-y-2"
          >
            <RotateCcw className="w-6 h-6 mx-auto text-indigo-500" />
            <p className="text-xs font-bold uppercase">Dominó</p>
          </button>
          <button 
            onClick={() => onGoToWorld('DOBBLE')}
            className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl hover:bg-zinc-800 transition-all text-center space-y-2"
          >
            <CheckCircle2 className="w-6 h-6 mx-auto text-indigo-500" />
            <p className="text-xs font-bold uppercase">Dobble</p>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
