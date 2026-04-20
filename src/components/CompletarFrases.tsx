import * as React from 'react';
import { Mic } from 'lucide-react';

interface CompletarFrasesProps {
  pistaCompletar: { phrase: string; word: string }[];
  currentPhraseIndex: number;
  currentPhraseAnswer: string;
  showSolution: boolean;
  pendingAdvance?: boolean;
  onAnswerChange: (value: string) => void;
  onSubmit: () => void;
  onResetPractice: () => void;
  onAdvance?: () => void;
}

export const CompletarFrases: React.FC<CompletarFrasesProps> = ({
  pistaCompletar,
  currentPhraseIndex,
  currentPhraseAnswer,
  showSolution,
  pendingAdvance,
  onAnswerChange,
  onSubmit,
  onResetPractice,
  onAdvance
}) => {
  const item = pistaCompletar[currentPhraseIndex];

  return (
    <div style={{ overflowAnchor: 'none' }} className="h-[360px] bg-zinc-900 border border-zinc-800 rounded-3xl p-6 overflow-hidden">
      <div className="h-full overflow-y-auto pr-1 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-yellow-500 font-bold uppercase tracking-widest text-xs">
            <Mic className="w-4 h-4" /> Desafío de Frases
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] uppercase tracking-[0.3em] text-zinc-500">
              {pistaCompletar.length > 0 ? `Frase ${Math.min(currentPhraseIndex + 1, pistaCompletar.length)}/${pistaCompletar.length}` : 'Sin frases'}
            </span>
            <button
              type="button"
              onClick={onResetPractice}
              className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-[10px] uppercase tracking-[0.25em] font-bold rounded-full"
            >
              Reiniciar práctica
            </button>
          </div>
        </div>
        <div className="space-y-4">
          {pistaCompletar.length === 0 ? (
            <div className="rounded-2xl p-4 bg-zinc-950 border border-zinc-800 text-zinc-400 text-sm text-center">
              No hay frases para completar en este fonema.
            </div>
          ) : currentPhraseIndex >= pistaCompletar.length ? (
            <div className="rounded-2xl p-6 bg-emerald-950 border border-emerald-700 text-emerald-200 text-center space-y-4">
              <p className="font-bold text-lg">¡Has completado todas las frases!</p>
              <p className="text-sm text-zinc-300">Avanza al siguiente reto cuando estés listo.</p>
              {onAdvance && (
                <button
                  type="button"
                  onClick={onAdvance}
                  className="w-full px-4 py-3 bg-yellow-600 hover:bg-yellow-500 text-black font-black rounded-lg uppercase text-xs tracking-[0.3em]"
                >
                  Siguiente reto
                </button>
              )}
            </div>
          ) : (
            <div className="p-4 bg-zinc-800 rounded-xl border-l-4 border-yellow-500 space-y-3">
              <p className="text-lg text-zinc-300 font-medium">
                "{item.phrase} <span className="text-yellow-500 font-black tracking-widest">{'_______'}</span>"
              </p>
              <div className="space-y-3">
                <input
                  value={currentPhraseAnswer}
                  onChange={(e) => onAnswerChange(e.target.value)}
                  placeholder="Escribe aquí"
                  disabled={showSolution || pendingAdvance}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white outline-none focus:border-yellow-500 disabled:cursor-not-allowed disabled:opacity-60"
                />
                <button
                  type="button"
                  onClick={onSubmit}
                  disabled={pendingAdvance}
                  className="w-full px-4 py-3 bg-yellow-600 hover:bg-yellow-500 disabled:bg-zinc-700 disabled:text-zinc-400 text-black font-black rounded-lg text-xs uppercase italic transition-colors"
                >
                  {pendingAdvance ? 'Correcto...' : showSolution ? 'Siguiente frase' : 'Comprobar'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
