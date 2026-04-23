import * as React from 'react';
import { Shuffle, RotateCcw } from 'lucide-react';
import { FraseLoca } from '../types';

type PieceKey = 'sujeto' | 'verbo' | 'complemento';

interface FrasesLocasProps {
  phrases: FraseLoca[];
  onSwapGroup: (piece: PieceKey) => void;
  onShuffleAll: () => void;
  onReset: () => void;
  onAdvance: () => void;
}

export const FrasesLocas: React.FC<FrasesLocasProps> = ({
  phrases,
  onSwapGroup,
  onShuffleAll,
  onReset,
  onAdvance
}) => {
  const renderPictogram = (img?: string) => {
    if (!img) {
      return <span className="text-zinc-500 text-[10px] uppercase tracking-[0.35em] font-bold">Hueco de pictograma</span>;
    }

    const isUrl = /^(https?:\/\/|\/|data:)/.test(img);
    return isUrl ? (
      <img src={img} alt="Pictograma" className="max-h-full max-w-full object-contain" />
    ) : (
      <span className="text-zinc-400 text-[10px] uppercase tracking-[0.35em] font-bold">{img}</span>
    );
  };

  return (
    <div className="space-y-6 bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-zinc-400 uppercase tracking-[0.35em] text-[10px] font-bold">Juego de frases locas</p>
          <h2 className="text-3xl font-black text-white tracking-tight">Mezcla entre todas las frases</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onShuffleAll}
            className="inline-flex items-center gap-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-xs uppercase tracking-[0.25em] font-bold"
          >
            <Shuffle className="w-4 h-4" /> Mezclar todo
          </button>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-2 px-4 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-2xl text-xs uppercase tracking-[0.25em] font-bold"
          >
            <RotateCcw className="w-4 h-4" /> Restaurar
          </button>
        </div>
      </div>

      <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-5 space-y-4">
        <p className="text-zinc-400 uppercase tracking-[0.35em] text-[10px] font-bold">Intercambia partes entre todas las frases</p>
        <div className="grid gap-3 sm:grid-cols-3">
          {(['sujeto', 'verbo', 'complemento'] as PieceKey[]).map((piece) => (
            <button
              key={piece}
              type="button"
              onClick={() => onSwapGroup(piece)}
              className="w-full px-4 py-3 bg-yellow-600 hover:bg-yellow-500 text-black font-black rounded-2xl uppercase tracking-[0.25em] text-xs"
            >
              Mezclar {piece}s
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {phrases.map((phrase, index) => (
          <div key={phrase.id} className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-5 shadow-sm">
            <p className="text-[10px] uppercase tracking-[0.35em] text-zinc-500 mb-4">Frase {index + 1}</p>
            <div className="grid gap-3">
              {(['sujeto', 'verbo', 'complemento'] as PieceKey[]).map((key) => (
                <div key={key} className="rounded-3xl border border-zinc-800 bg-zinc-900 p-4">
                  <p className="text-[10px] uppercase tracking-[0.35em] text-zinc-500 mb-2">{key}</p>
                  <div className="min-h-[64px] flex flex-col items-center justify-center gap-2 rounded-3xl border border-zinc-800 bg-zinc-950 p-3">
                    <div className="h-16 w-full rounded-3xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                      {renderPictogram(key === 'sujeto' ? phrase.sujetoImg : key === 'verbo' ? phrase.verboImg : phrase.complementoImg)}
                    </div>
                    <span className="text-white font-black text-lg uppercase tracking-tight">{phrase[key]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-5 space-y-2">
        <p className="text-zinc-400 uppercase tracking-[0.35em] text-[10px] font-bold">Frases resultantes</p>
        {phrases.map((phrase) => (
          <p key={phrase.id} className="text-xl font-black text-white leading-snug">{`${phrase.sujeto} ${phrase.verbo} ${phrase.complemento}`.trim()}.</p>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={onAdvance}
          className="w-full px-4 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-black rounded-2xl uppercase tracking-[0.25em] text-xs"
        >
          Finalizar
        </button>
      </div>
    </div>
  );
};
