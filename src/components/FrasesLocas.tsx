import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCcw, ChevronRight, Check, Sparkles } from 'lucide-react';
import { VisualContent } from './VisualContent';
import { PhrasePiece } from './FrasesLocasWorld';

interface FrasesLocasProps {
  pieces: {
    sujetos: PhrasePiece[];
    verbos: PhrasePiece[];
    complementos: PhrasePiece[];
  };
  selected: {
    sujeto: PhrasePiece | null;
    verbo: PhrasePiece | null;
    complemento: PhrasePiece | null;
  };
  history: string[];
  onSelect: (type: 'sujeto' | 'verbo' | 'complemento', piece: PhrasePiece) => void;
  onReset: () => void;
  onFinalize: () => void;
  onClose: () => void;
}

export const FrasesLocas: React.FC<FrasesLocasProps> = ({
  pieces,
  selected,
  history,
  onSelect,
  onReset,
  onFinalize,
  onClose
}) => {
  const isComplete = selected.sujeto && selected.verbo && selected.complemento;

  return (
    <div className="space-y-8">
      {/* 1. EL ESCENARIO: LA FRASE EN CONSTRUCCIÓN */}
      <section className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">


        <div className="relative z-10 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-500 font-bold text-[10px] uppercase tracking-widest mb-1">Tu creación</p>
              <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">Mi Frase Loca ✨</h2>
            </div>
            <div className="flex gap-2">
              <button
                onClick={onReset}
                title="Reiniciar selección"
                className="p-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white rounded-2xl transition-all"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-red-600/10 hover:bg-red-600/20 text-red-500 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
              >
                Salir
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 min-h-40">
            {[
              { type: 'sujeto' as const, value: selected.sujeto, label: '¿Quién?' },
              { type: 'verbo' as const, value: selected.verbo, label: '¿Qué hace?' },
              { type: 'complemento' as const, value: selected.complemento, label: '¿Dónde?' }
            ].map((slot) => (
              <div
                key={slot.type}
                className={`relative flex flex-col items-center justify-center p-4 rounded-3xl border-2 border-dashed transition-all ${slot.value
                    ? 'bg-zinc-800 border-indigo-500/50 shadow-lg shadow-indigo-500/10'
                    : 'bg-zinc-950/50 border-zinc-800 text-zinc-600'
                  }`}
              >
                <AnimatePresence mode="wait">
                  {slot.value ? (
                    <motion.div
                      key={slot.value.text}
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      className="flex flex-col items-center gap-3 text-center"
                    >
                      {slot.value.img && (
                        <VisualContent
                          content={slot.value.img}
                          className="w-16 h-16 text-4xl bg-zinc-900 rounded-2xl p-2 shadow-inner"
                        />
                      )}
                      <span className="text-white font-black italic uppercase text-sm leading-tight">
                        {slot.value.text}
                      </span>
                    </motion.div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-2xl bg-zinc-900/50 border border-zinc-800 flex items-center justify-center">
                        <span className="text-xs opacity-30">?</span>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">
                        {slot.label}
                      </span>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-zinc-800 flex flex-col items-center gap-4">
            <p className="text-center">
              <span className="text-zinc-500 font-medium italic text-lg mr-2">"</span>
              <span className="text-2xl font-black text-white italic uppercase tracking-tight">
                {selected.sujeto?.text || '...'} {selected.verbo?.text || '...'} {selected.complemento?.text || '...'}
              </span>
              <span className="text-zinc-500 font-medium italic text-lg ml-1">."</span>
            </p>

            {isComplete && (
              <button
                onClick={() => {
                  const text = `${selected.sujeto?.text} ${selected.verbo?.text} ${selected.complemento?.text}`;
                  const utterance = new SpeechSynthesisUtterance(text);
                  utterance.lang = 'es-ES';
                  utterance.rate = 0.9;
                  window.speechSynthesis.speak(utterance);
                }}
                className="flex items-center gap-2 px-6 py-2 bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 rounded-full text-xs font-black uppercase tracking-widest hover:bg-indigo-600/30 transition-all animate-pulse"
              >
                <Sparkles className="w-4 h-4" /> Escuchar frase
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 2. SELECTORES DE PIEZAS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { type: 'sujeto' as const, items: pieces.sujetos, label: 'Exploradores', color: 'blue' as const },
          { type: 'verbo' as const, items: pieces.verbos, label: 'Acciones', color: 'emerald' as const },
          { type: 'complemento' as const, items: pieces.complementos, label: 'Lugares', color: 'orange' as const }
        ].map((column) => (
          <div key={column.type} className="space-y-4">
            <h3 className={`text-xs font-black italic uppercase tracking-[0.2em] px-2 ${column.color === 'blue' ? 'text-blue-500' :
                column.color === 'emerald' ? 'text-emerald-500' :
                  'text-orange-500'
              }`}>
              {column.label}
            </h3>
            <div className="grid gap-2 max-h-100 overflow-y-auto pr-2 custom-scrollbar">
              {column.items.map((item) => {
                const isSelected = selected[column.type]?.text === item.text;

                const colorVariants = {
                  blue: isSelected
                    ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-900/20'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-800',
                  emerald: isSelected
                    ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg shadow-emerald-900/20'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-800',
                  orange: isSelected
                    ? 'bg-orange-600 border-orange-400 text-white shadow-lg shadow-orange-900/20'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-800',
                };

                return (
                  <button
                    key={item.text}
                    onClick={() => onSelect(column.type, item)}
                    className={`group flex items-center gap-3 p-3 rounded-2xl border transition-all text-left relative overflow-hidden ${colorVariants[column.color]}`}
                  >
                    {item.img && (
                      <VisualContent
                        content={item.img}
                        className={`w-10 h-10 text-2xl rounded-xl p-1 bg-zinc-950/50 transition-transform group-hover:scale-110 ${isSelected ? 'opacity-100' : 'opacity-70'}`}
                      />
                    )}
                    <span className={`font-bold uppercase text-xs tracking-tight leading-tight ${isSelected ? 'text-white' : 'text-zinc-300'}`}>
                      {item.text}
                    </span>
                    {isSelected && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      {/* 3. BOTÓN FINALIZAR / HISTORIAL */}
      <div className="space-y-6">
        <motion.div
          initial={false}
          animate={{ opacity: isComplete ? 1 : 0.5, scale: isComplete ? 1 : 0.98 }}
        >
          <button
            onClick={onFinalize}
            disabled={!isComplete}
            className={`w-full py-6 rounded-4xl font-black italic uppercase tracking-widest text-lg transition-all flex items-center justify-center gap-3 shadow-2xl ${isComplete
                ? 'bg-linear-to-r from-yellow-500 to-orange-600 text-black hover:scale-[1.02] active:scale-95'
                : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
              }`}
          >
            {isComplete ? '¡Esta frase es genial! 🚀' : 'Elige todas las piezas...'}
            {isComplete && <ChevronRight className="w-6 h-6" />}
          </button>
        </motion.div>

        {history.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-4xl border border-zinc-800 bg-zinc-900/50 p-6 space-y-4"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400">Tu Colección de Frases Locas</h3>
            </div>
            <div className="grid gap-2">
              {history.map((phrase, idx) => (
                <motion.div 
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  key={idx} 
                  className="bg-zinc-950/50 p-3 rounded-xl border border-zinc-800 flex items-center gap-3"
                >
                  <span className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-zinc-500">
                    {history.length - idx}
                  </span>
                  <p className="text-white font-bold italic uppercase text-sm tracking-tight">{phrase}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
