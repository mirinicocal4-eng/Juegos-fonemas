import * as React from 'react';
import { FrasesLocas } from './FrasesLocas';
import { FraseLoca } from '../types';

interface FrasesLocasWorldProps {
  phrases: FraseLoca[];
  setFeedback: (fb: { type: 'success' | 'error' | 'info'; message: string } | null) => void;
  onAdvance: () => void;
}

export type PhrasePiece = { text: string; img?: string };

export const FrasesLocasWorld: React.FC<FrasesLocasWorldProps> = ({
  phrases,
  setFeedback,
  onAdvance
}) => {
  // Extraemos todas las piezas únicas del pool de frases
  const pieces = React.useMemo(() => {
    const sujetosMap = new Map<string, string | undefined>();
    const verbosMap = new Map<string, string | undefined>();
    const complementosMap = new Map<string, string | undefined>();

    phrases.forEach(p => {
      sujetosMap.set(p.sujeto, p.sujetoImg);
      verbosMap.set(p.verbo, p.verboImg);
      complementosMap.set(p.complemento, p.complementoImg);
    });

    return {
      sujetos: Array.from(sujetosMap.entries()).map(([text, img]) => ({ text, img })),
      verbos: Array.from(verbosMap.entries()).map(([text, img]) => ({ text, img })),
      complementos: Array.from(complementosMap.entries()).map(([text, img]) => ({ text, img }))
    };
  }, [phrases]);

  const [selectedSujeto, setSelectedSujeto] = React.useState<PhrasePiece | null>(null);
  const [selectedVerbo, setSelectedVerbo] = React.useState<PhrasePiece | null>(null);
  const [selectedComplemento, setSelectedComplemento] = React.useState<PhrasePiece | null>(null);
  const [history, setHistory] = React.useState<string[]>([]);

  const handleSelect = (type: 'sujeto' | 'verbo' | 'complemento', piece: PhrasePiece) => {
    if (type === 'sujeto') setSelectedSujeto(piece);
    else if (type === 'verbo') setSelectedVerbo(piece);
    else setSelectedComplemento(piece);
    
    setFeedback({ type: 'info', message: `Has seleccionado: ${piece.text}` });
  };

  const handleReset = () => {
    setSelectedSujeto(null);
    setSelectedVerbo(null);
    setSelectedComplemento(null);
    setFeedback({ type: 'info', message: 'Selección reiniciada.' });
  };

  const handleFinalize = () => {
    if (selectedSujeto && selectedVerbo && selectedComplemento) {
      const newPhrase = `${selectedSujeto.text} ${selectedVerbo.text} ${selectedComplemento.text}.`;
      setHistory(prev => [newPhrase, ...prev]);
      handleReset();
      setFeedback({ type: 'success', message: '¡Frase guardada en tu colección!' });
    }
  };

  if (phrases.length === 0) {
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 text-center text-zinc-400">
        No hay frases disponibles para este reto.
      </div>
    );
  }

  return (
    <FrasesLocas
      pieces={pieces}
      selected={{
        sujeto: selectedSujeto,
        verbo: selectedVerbo,
        complemento: selectedComplemento
      }}
      history={history}
      onSelect={handleSelect}
      onReset={handleReset}
      onFinalize={handleFinalize}
      onClose={onAdvance}
    />
  );
};
