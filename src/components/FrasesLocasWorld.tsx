import * as React from 'react';
import { FrasesLocas } from './FrasesLocas';
import { FraseLoca } from '../types';

type PieceKey = 'sujeto' | 'verbo' | 'complemento';

type FrasesLocasWorldProps = {
  phrases: FraseLoca[];
  setFeedback: (fb: { type: 'success' | 'error' | 'info'; message: string } | null) => void;
  onAdvance: () => void;
};

const shuffleArray = <T,>(items: T[]) => [...items].sort(() => Math.random() - 0.5);

export const FrasesLocasWorld: React.FC<FrasesLocasWorldProps> = ({
  phrases,
  setFeedback,
  onAdvance
}) => {
  const [originalPhrases, setOriginalPhrases] = React.useState<FraseLoca[]>([]);
  const [currentPhrases, setCurrentPhrases] = React.useState<FraseLoca[]>([]);

  React.useEffect(() => {
    setOriginalPhrases(phrases.map((phrase) => ({ ...phrase })));
    setCurrentPhrases(phrases.map((phrase) => ({ ...phrase })));
  }, [phrases]);

  const getImageKey = (piece: PieceKey) =>
    piece === 'sujeto' ? 'sujetoImg' : piece === 'verbo' ? 'verboImg' : 'complementoImg';

  const handleSwapGroup = (piece: PieceKey) => {
    const keys = currentPhrases.map((phrase) => phrase[piece]);
    const imgs = currentPhrases.map((phrase) => phrase[getImageKey(piece) as keyof FraseLoca]);
    const shuffledKeys = shuffleArray(keys);
    const shuffledImgs = shuffleArray(imgs);

    const nextPhrases = currentPhrases.map((phrase, index) => {
      const nextPhrase = { ...phrase };
      const nextImage = shuffledImgs[index] as string | undefined;

      if (piece === 'sujeto') {
        nextPhrase.sujeto = shuffledKeys[index];
        nextPhrase.sujetoImg = nextImage;
      } else if (piece === 'verbo') {
        nextPhrase.verbo = shuffledKeys[index];
        nextPhrase.verboImg = nextImage;
      } else {
        nextPhrase.complemento = shuffledKeys[index];
        nextPhrase.complementoImg = nextImage;
      }

      return nextPhrase;
    });

    setCurrentPhrases(nextPhrases);
    setFeedback({ type: 'info', message: `Se mezclaron los ${piece} entre todas las frases.` });
  };

  const handleShuffleAll = () => {
    const subjects = shuffleArray(currentPhrases.map((phrase) => phrase.sujeto));
    const verbs = shuffleArray(currentPhrases.map((phrase) => phrase.verbo));
    const complements = shuffleArray(currentPhrases.map((phrase) => phrase.complemento));
    const sujetoImgs = shuffleArray(currentPhrases.map((phrase) => phrase.sujetoImg));
    const verboImgs = shuffleArray(currentPhrases.map((phrase) => phrase.verboImg));
    const complementoImgs = shuffleArray(currentPhrases.map((phrase) => phrase.complementoImg));

    const nextPhrases = currentPhrases.map((phrase, index) => ({
      ...phrase,
      sujeto: subjects[index],
      verbo: verbs[index],
      complemento: complements[index],
      sujetoImg: sujetoImgs[index],
      verboImg: verboImgs[index],
      complementoImg: complementoImgs[index]
    }));

    setCurrentPhrases(nextPhrases);
    setFeedback({ type: 'info', message: 'Se mezclaron todas las partes entre las frases.' });
  };

  const handleReset = () => {
    setCurrentPhrases(originalPhrases.map((phrase) => ({ ...phrase })));
    setFeedback({ type: 'info', message: 'Frases originales restauradas.' });
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
      phrases={currentPhrases}
      onSwapGroup={handleSwapGroup}
      onShuffleAll={handleShuffleAll}
      onReset={handleReset}
      onAdvance={onAdvance}
    />
  );
};
