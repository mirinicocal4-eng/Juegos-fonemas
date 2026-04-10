import React from 'react';
import { motion } from 'motion/react';
import { Gamepad2, CheckCircle2, AlertCircle, RotateCcw } from 'lucide-react';
import { World } from '../types';

interface GranPremioProps {
  step: number;
  diceValue: number | null;
  granPremioBoard: any[];
  onRollDice: () => void;
  onGoToWorld: (world: World) => void;
}

export const GranPremio: React.FC<GranPremioProps> = ({
  step,
  diceValue,
  granPremioBoard,
  onRollDice,
  onGoToWorld
}) => {
  return (
    <motion.div 
      key="gran-premio"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-8"
    >
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 text-center space-y-8">
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-red-600 blur-2xl opacity-20 animate-pulse" />
            <button 
              onClick={onRollDice}
              className="relative w-32 h-32 bg-zinc-800 border-4 border-red-600 rounded-3xl flex items-center justify-center text-5xl font-black italic text-white shadow-2xl hover:scale-105 active:scale-95 transition-all"
            >
              {diceValue || <Gamepad2 className="w-12 h-12" />}
            </button>
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Toca el dado para avanzar</p>
          <h3 className="text-3xl font-black italic text-white uppercase">¡Tiro el dado!</h3>
        </div>

        {diceValue && granPremioBoard[step] && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800 space-y-4"
          >
            <div className="text-6xl mb-2">{granPremioBoard[step].img}</div>
            <div className="space-y-1">
              <span className="text-red-500 font-bold text-sm uppercase tracking-widest">Casilla {granPremioBoard[step].id}: {granPremioBoard[step].name}</span>
              <p className="text-2xl font-bold text-white leading-tight italic">
                {granPremioBoard[step].q}
              </p>
            </div>
          </motion.div>
        )}
      </div>

      <div className="grid grid-cols-6 gap-2">
        {granPremioBoard.map((item, i) => (
          <div 
            key={item.id}
            className={`aspect-square rounded-lg flex items-center justify-center text-xl border-2 transition-all ${step === i ? 'bg-red-600 border-white scale-110 z-10 shadow-lg' : 'bg-zinc-900 border-zinc-800 opacity-50'}`}
          >
            {item.img}
          </div>
        ))}
      </div>

      <div className="space-y-4 pt-8 border-t border-zinc-800">
        <h3 className="text-lg font-bold italic uppercase text-zinc-400">Zona de Minijuegos</h3>
        <div className="grid grid-cols-3 gap-4">
          <button 
            onClick={() => onGoToWorld('MEMORY')}
            className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl hover:bg-zinc-800 transition-all text-center space-y-2"
          >
            <Gamepad2 className="w-6 h-6 mx-auto text-red-500" />
            <p className="text-xs font-bold uppercase">Memory</p>
          </button>
          <button 
            onClick={() => onGoToWorld('BINGO')}
            className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl hover:bg-zinc-800 transition-all text-center space-y-2"
          >
            <CheckCircle2 className="w-6 h-6 mx-auto text-red-500" />
            <p className="text-xs font-bold uppercase">Bingo</p>
          </button>
          <button 
            onClick={() => onGoToWorld('LINCE')}
            className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl hover:bg-zinc-800 transition-all text-center space-y-2"
          >
            <AlertCircle className="w-6 h-6 mx-auto text-red-500" />
            <p className="text-xs font-bold uppercase">Lince</p>
          </button>
          <button 
            onClick={() => onGoToWorld('DOMINO')}
            className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl hover:bg-zinc-800 transition-all text-center space-y-2"
          >
            <RotateCcw className="w-6 h-6 mx-auto text-red-500" />
            <p className="text-xs font-bold uppercase">Dominó</p>
          </button>
          <button 
            onClick={() => onGoToWorld('DOBBLE')}
            className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl hover:bg-zinc-800 transition-all text-center space-y-2"
          >
            <CheckCircle2 className="w-6 h-6 mx-auto text-red-500" />
            <p className="text-xs font-bold uppercase">Dobble</p>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
