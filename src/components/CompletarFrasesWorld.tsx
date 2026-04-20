import * as React from 'react';
import { Phoneme, PistaProgress } from '../types';
import { CompletarFrases } from './CompletarFrases';
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
  );
};
