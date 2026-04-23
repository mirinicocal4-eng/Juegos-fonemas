import * as React from 'react';
import { Phoneme, PistaProgress } from '../types';
import { CompletarFrases } from './CompletarFrases';
import { FrasesLocasWorld } from './FrasesLocasWorld';
import { DATA_LOGOPEDIA } from '../logopediaData';
import { setupSpeechVoices, speakText } from '../utils/speech';

interface CompletarFrasesWorldProps {
  phoneme: Phoneme;
  pistaCompletar: { phrase: string; word: string }[];
  pistaProgress?: PistaProgress;
  onPistaProgressChange?: (progress: PistaProgress) => void;
  feedback: { type: 'success' | 'error' | 'info'; message: string } | null;
  setFeedback: (fb: { type: 'success' | 'error' | 'info'; message: string } | null) => void;
  onAdvance: () => void;
}

export const CompletarFrasesWorld: React.FC<CompletarFrasesWorldProps> = ({
  phoneme,
  pistaCompletar,
  pistaProgress,
  onPistaProgressChange,
  feedback,
  setFeedback,
  onAdvance
}) => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = React.useState<number>(pistaProgress?.currentPhraseIndex ?? 0);
  const [currentPhraseAnswer, setCurrentPhraseAnswer] = React.useState<string>(pistaProgress?.currentPhraseAnswer ?? '');
  const [attemptCount, setAttemptCount] = React.useState<number>(0);
  const [showSolution, setShowSolution] = React.useState<boolean>(false);
  const [pendingAdvance, setPendingAdvance] = React.useState<boolean>(false);
  const [showFrasesLocas, setShowFrasesLocas] = React.useState<boolean>(false);
  const [voices, setVoices] = React.useState<SpeechSynthesisVoice[]>([]);

  React.useEffect(() => {
    const cleanup = setupSpeechVoices(setVoices);
    return cleanup;
  }, []);

  React.useEffect(() => {
    setCurrentPhraseIndex(pistaProgress?.currentPhraseIndex ?? 0);
    setCurrentPhraseAnswer(pistaProgress?.currentPhraseAnswer ?? '');
    setAttemptCount(0);
    setShowSolution(false);
  }, [phoneme]);

  const normalizeText = (text: string) =>
    text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
      .toUpperCase();

  const handleAnswerChange = (value: string) => {
    if (showSolution) return;
    setCurrentPhraseAnswer(value);
  };

  const fraseBlockMap: Record<Phoneme, 's' | 'z' | 'r_suave' | 'rr_fuerte' | 'sinfones_r'> = {
    S: 's',
    Z: 'z',
    R: 'r_suave',
    RR: 'rr_fuerte',
    BR: 'sinfones_r',
    PR: 'sinfones_r',
    TR: 'sinfones_r',
    DR: 'sinfones_r',
    GR: 'sinfones_r',
    CR: 'sinfones_r',
    FR: 'sinfones_r'
  };

  const frasesLocas = DATA_LOGOPEDIA[fraseBlockMap[phoneme]] || [];

  const toggleFrasesLocas = () => setShowFrasesLocas((prev) => !prev);

  const advanceToNextPhrase = (showNextMessage: boolean = false) => {
    const nextIndex = Math.min(currentPhraseIndex + 1, pistaCompletar.length);
    setCurrentPhraseIndex(nextIndex);
    setCurrentPhraseAnswer('');
    setAttemptCount(0);
    setShowSolution(false);
    onPistaProgressChange?.({ currentPhraseIndex: nextIndex, currentPhraseAnswer: '' });
    if (showNextMessage && nextIndex < pistaCompletar.length) {
      setFeedback({ type: 'info', message: 'Siguiente frase lista para completar.' });
    }
  };

  const handleSubmit = () => {
    if (showSolution) {
      advanceToNextPhrase();
      return;
    }

    const expected = pistaCompletar[currentPhraseIndex]?.word || '';
    const answer = currentPhraseAnswer || '';

    if (!answer.trim()) {
      setFeedback({ type: 'info', message: 'Escribe la palabra antes de comprobar.' });
      return;
    }

    if (normalizeText(answer) === normalizeText(expected)) {
      setFeedback({ type: 'success', message: `¡Correcto! La palabra es ${expected.toUpperCase()} ✨` });
      setPendingAdvance(true);
    } else {
      const nextAttempt = attemptCount + 1;
      setAttemptCount(nextAttempt);
      if (nextAttempt >= 2) {
        setShowSolution(true);
        setCurrentPhraseAnswer(expected);
        onPistaProgressChange?.({ currentPhraseIndex, currentPhraseAnswer: expected });
        setFeedback({ type: 'info', message: `Solución: ${expected.toUpperCase()}` });
      } else {
        setFeedback({ type: 'error', message: 'Casi, intenta escribirla de nuevo.' });
      }
    }
  };

  const resetPractice = () => {
    setCurrentPhraseIndex(0);
    setCurrentPhraseAnswer('');
    setAttemptCount(0);
    setShowSolution(false);
    setPendingAdvance(false);
    onPistaProgressChange?.({ currentPhraseIndex: 0, currentPhraseAnswer: '' });
    setFeedback({ type: 'info', message: 'Práctica reiniciada.' });
  };

  React.useEffect(() => {
    if (pendingAdvance && !feedback) {
      setPendingAdvance(false);
      advanceToNextPhrase(false);
    }
  }, [feedback, pendingAdvance]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500 font-bold">Reto de frases</p>
          <h2 className="text-2xl font-black text-white">Completar frases</h2>
        </div>
        <button
          type="button"
          onClick={toggleFrasesLocas}
          className="inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-4 py-3 text-xs font-black uppercase tracking-[0.2em] text-white hover:bg-indigo-500"
        >
          {showFrasesLocas ? 'Ocultar juego extra' : 'Abrir juego extra'}
        </button>
      </div>

      <CompletarFrases
        pistaCompletar={pistaCompletar}
        currentPhraseIndex={currentPhraseIndex}
        currentPhraseAnswer={currentPhraseAnswer}
        showSolution={showSolution}
        onAnswerChange={handleAnswerChange}
        onSubmit={handleSubmit}
        onResetPractice={resetPractice}
        onAdvance={onAdvance}
        pendingAdvance={pendingAdvance}
      />

      {showFrasesLocas && (
        <div className="rounded-3xl border border-indigo-500/30 bg-indigo-950/10 p-6">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-indigo-400 font-bold">Juego extra</p>
              <h3 className="text-lg font-black text-white">Frases locas</h3>
            </div>
            <button
              type="button"
              onClick={toggleFrasesLocas}
              className="px-3 py-2 rounded-xl bg-zinc-800 text-zinc-200 text-xs uppercase tracking-[0.2em] font-bold"
            >
              Cerrar
            </button>
          </div>
          <FrasesLocasWorld
            phrases={frasesLocas}
            setFeedback={setFeedback}
            onAdvance={() => setShowFrasesLocas(false)}
          />
        </div>
      )}
    </div>
  );
};
