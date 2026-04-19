import * as React from 'react';
import { motion } from 'motion/react';
import { Mic, Sparkles, Volume2 } from 'lucide-react';
import { Phoneme, PistaEcoItem, PistaDecirItem } from '../types';
import { VisualContent } from './VisualContent';
import { setupSpeechVoices, speakText } from '../utils/speech';

interface PistaProps {
  phoneme: Phoneme;
  pistaEco: PistaEcoItem[];
  pistaDecir: PistaDecirItem[];
  pistaFrases: string[];
  pistaTrabalenguas: string[];
  pistaCompletar: { phrase: string; word: string }[];
  pdfUrl?: string;
  pistaProgress?: {
    currentPhraseIndex: number;
    currentPhraseAnswer: string;
  };
  onPistaProgressChange?: (progress: { currentPhraseIndex: number; currentPhraseAnswer: string }) => void;
  onFinish: () => void;
  setFeedback: (fb: { type: 'success' | 'error' | 'info', message: string } | null) => void;
}

export const Pista: React.FC<PistaProps> = ({
  phoneme,
  pistaEco,
  pistaDecir,
  pistaFrases,
  pistaTrabalenguas,
  pistaCompletar,
  pdfUrl,
  pistaProgress,
  onPistaProgressChange,
  onFinish,
  setFeedback
}: PistaProps) => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = React.useState<number>(pistaProgress?.currentPhraseIndex ?? 0);
  const [currentPhraseAnswer, setCurrentPhraseAnswer] = React.useState<string>(pistaProgress?.currentPhraseAnswer ?? '');
  const [attemptCount, setAttemptCount] = React.useState<number>(0);
  const [showSolution, setShowSolution] = React.useState<boolean>(false);
  const [activePistaSection, setActivePistaSection] = React.useState<'MAIN' | 'COMPLETAR'>('MAIN');
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const scrollPositionRef = React.useRef<number | null>(null);
  const shouldRestoreScrollRef = React.useRef<boolean>(false);
  const [voices, setVoices] = React.useState<SpeechSynthesisVoice[]>([]);
  const [showOptionalPhrases, setShowOptionalPhrases] = React.useState(false);

  React.useEffect(() => {
    const cleanup = setupSpeechVoices(setVoices);
    return cleanup;
  }, []);

  React.useLayoutEffect(() => {
    if (shouldRestoreScrollRef.current && scrollPositionRef.current !== null && activePistaSection === 'COMPLETAR') {
      window.scrollTo({ top: scrollPositionRef.current, behavior: 'auto' });
      shouldRestoreScrollRef.current = false;
      scrollPositionRef.current = null;
    }
  }, [currentPhraseIndex, activePistaSection]);

  React.useEffect(() => {
    setCurrentPhraseIndex(pistaProgress?.currentPhraseIndex ?? 0);
    setCurrentPhraseAnswer(pistaProgress?.currentPhraseAnswer ?? '');
    setAttemptCount(0);
    setShowSolution(false);
    setActivePistaSection('MAIN');
  }, [phoneme]);


  const normalizeText = (text: string) =>
    text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
      .toUpperCase();

  const handlePhraseChange = (value: string) => {
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

  const handlePhraseSubmit = () => {
    if (activePistaSection === 'COMPLETAR') {
      scrollPositionRef.current = window.scrollY;
      shouldRestoreScrollRef.current = true;
    }

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
      advanceToNextPhrase(false);
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

  const handleResetPractice = () => {
    setCurrentPhraseIndex(0);
    setCurrentPhraseAnswer('');
    setAttemptCount(0);
    setShowSolution(false);
    onPistaProgressChange?.({ currentPhraseIndex: 0, currentPhraseAnswer: '' });
    setFeedback({ type: 'info', message: 'Práctica reiniciada.' });
  };

  const speakWord = (word: string) => {
    speakText(word, voices, () => setFeedback({ type: 'error', message: 'Este navegador no soporta voz sintética.' }));
  };

  const renderCompletionActivity = () => {
    const item = pistaCompletar[currentPhraseIndex];

    return (
      <div className="space-y-6">
        <button
          type="button"
          onClick={() => setActivePistaSection('MAIN')}
          className="px-4 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs uppercase tracking-[0.25em] font-bold rounded-full"
        >
          Volver a actividades
        </button>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-yellow-500 font-bold uppercase tracking-widest text-xs">
              <Mic className="w-4 h-4" /> Desafío de Completar Frases
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase tracking-[0.3em] text-zinc-500">
                {pistaCompletar.length > 0 ? `Frase ${Math.min(currentPhraseIndex + 1, pistaCompletar.length)}/${pistaCompletar.length}` : 'Sin frases'}
              </span>
              <button
                type="button"
                onClick={handleResetPractice}
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
              <div className="rounded-2xl p-6 bg-emerald-950 border border-emerald-700 text-emerald-200 text-center">
                <p className="font-bold text-lg">¡Has completado todas las frases!</p>
                <p className="text-sm text-zinc-300">Avanza al siguiente reto cuando estés listo.</p>
              </div>
            ) : (
              <div className="p-4 bg-zinc-800 rounded-xl border-l-4 border-yellow-500 space-y-3">
                <p className="text-lg text-zinc-300 font-medium">
                  "{item.phrase} <span className="text-yellow-500 font-black tracking-widest">{'_______'}</span>"
                </p>
                <div className="space-y-3">
                  <input
                    ref={inputRef}
                    value={currentPhraseAnswer}
                    onChange={(e) => handlePhraseChange(e.target.value)}
                    placeholder="Escribe aquí"
                    disabled={showSolution}
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white outline-none focus:border-yellow-500 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                  <button
                    type="button"
                    onClick={handlePhraseSubmit}
                    className="w-full px-4 py-3 bg-yellow-600 hover:bg-yellow-500 text-black font-black rounded-lg text-xs uppercase italic transition-colors"
                  >
                    {showSolution ? 'Siguiente frase' : 'Comprobar'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const groupedDecir = pistaDecir.reduce<Record<string, PistaDecirItem[]>>((acc, item) => {
    const key = item.category || 'contiene';
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, { inicio: [], contiene: [], final: [], inversa: [] });

  const ecoWordSet = React.useMemo(
    () => new Set((pistaEco || []).map((item) => normalizeText(item.word || ''))),
    [pistaEco]
  );

  const articulationDecirGroups = React.useMemo(() => ({
    inicio: (groupedDecir.inicio || []).filter((item) => !ecoWordSet.has(normalizeText(item.word || ''))),
    contiene: (groupedDecir.contiene || []).filter((item) => !ecoWordSet.has(normalizeText(item.word || ''))),
    inversa: (groupedDecir.inversa || []).filter((item) => !ecoWordSet.has(normalizeText(item.word || ''))),
    final: (groupedDecir.final || []).filter((item) => !ecoWordSet.has(normalizeText(item.word || '')))
  }), [ecoWordSet, groupedDecir]);

  const { requiredPhrases, optionalPhrases } = React.useMemo(() => {
    const phrases = pistaFrases.filter((phrase) => typeof phrase === 'string' && phrase.trim() !== '');
    const minRequired = Math.min(5, phrases.length);
    const indexes = new Set<number>();
    while (indexes.size < minRequired) {
      indexes.add(Math.floor(Math.random() * phrases.length));
    }
    const required = phrases.filter((_, index) => indexes.has(index));
    const optional = phrases.filter((_, index) => !indexes.has(index));
    return { requiredPhrases: required, optionalPhrases: optional };
  }, [pistaFrases]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-8"
    >
      <div className="grid grid-cols-1 gap-8">
        {pdfUrl && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-zinc-500">Documento asociado</p>
                <p className="text-sm text-white">Visualiza el PDF con los trabalenguas aquí.</p>
              </div>
              <a
                href={pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="text-indigo-400 text-xs uppercase tracking-widest hover:text-indigo-200"
              >
                Abrir en nueva pestaña
              </a>
            </div>
            <div className="overflow-hidden rounded-3xl border border-zinc-700 bg-black">
              <iframe
                src={pdfUrl}
                title="Documento PDF"
                className="w-full h-[420px]"
              />
            </div>
          </div>
        )}

        {activePistaSection === 'MAIN' ? (
          <>
            {/* Articulación: Decir Palabras */}
            <div className="bg-indigo-950 border border-indigo-900 rounded-3xl p-6 space-y-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold uppercase tracking-widest text-xs">
              <Mic className="w-4 h-4" /> Articulación
            </div>
            <p className="text-zinc-300 text-sm">
              Di en voz alta las palabras de cada categoría para practicar la articulación del sonido <strong>{phoneme}</strong>.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {(
              phoneme === 'R'
                ? (['contiene', 'inversa', 'final'] as const)
                : (['inicio', 'contiene', 'inversa', 'final'] as const)
            ).map((category) => {
              const soundLabel = phoneme === 'RR' ? 'RR' : phoneme;
              const labels: Record<typeof category, string> = {
                inicio: `Empiezan por ${soundLabel}`,
                contiene: `Contienen ${soundLabel}`,
                inversa: `Contienen ${soundLabel} inversa`,
                final: `Acaban con ${soundLabel}`
              };
              const items = articulationDecirGroups[category] || [];

              return (
                <div key={category} className="bg-zinc-900 border border-zinc-800 rounded-3xl p-4 space-y-4">
                  <div className="text-white font-bold uppercase tracking-widest text-[11px]">
                    {labels[category]}
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    {items.length > 0 ? (
                      items.map((item, index) => (
                        <div key={index} className="rounded-2xl p-4 bg-zinc-800 border border-zinc-700 space-y-3">
                          <div className="flex items-center gap-3 min-w-0">
                            {item.img ? (
                              <VisualContent content={item.img} className="w-10 h-10 text-4xl rounded-xl" />
                            ) : (
                              <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-xs text-zinc-500 uppercase">
                                IMG
                              </div>
                            )}
                            <span className="text-sm font-black text-white uppercase tracking-tighter truncate">{item.word}</span>
                          </div>
                          <div className="flex justify-end">
                            <button
                              type="button"
                              onClick={() => speakWord(item.word)}
                              className="p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full flex items-center justify-center"
                              title="Escuchar"
                              aria-label="Escuchar palabra"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="rounded-2xl p-4 bg-zinc-950 border border-dashed border-zinc-700 text-sm text-zinc-500 uppercase tracking-widest text-center">
                        No hay palabras en esta categoría.
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Frases Section */}
        <div className="bg-indigo-600/10 border border-indigo-500/30 rounded-3xl p-6 space-y-6">
          <div className="flex items-center gap-2 text-indigo-500 font-bold uppercase tracking-widest text-xs">
            <Sparkles className="w-4 h-4" /> Frases de práctica
          </div>
          <p className="text-zinc-300 text-sm">Lee y practica estas frases en voz alta para trabajar la articulación.</p>
          <div className="space-y-4">
            {requiredPhrases.map((phrase, i) => (
              <div key={`required-${i}`} className="rounded-2xl border border-indigo-500/10 bg-zinc-900 p-4 text-white">
                <p className="text-sm leading-relaxed">{phrase}</p>
              </div>
            ))}
          </div>
          {optionalPhrases.length > 0 && (
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => setShowOptionalPhrases((prev) => !prev)}
                className="w-full py-3 bg-indigo-700 hover:bg-indigo-600 text-white font-black rounded-xl uppercase text-xs tracking-widest"
              >
                {showOptionalPhrases ? 'Ocultar frases extra' : `Mostrar ${optionalPhrases.length} frases extra`}
              </button>
              {showOptionalPhrases && (
                <div className="space-y-3">
                  {optionalPhrases.map((phrase, i) => (
                    <div key={`optional-${i}`} className="rounded-2xl border border-indigo-500/10 bg-zinc-950 p-4 text-zinc-200">
                      <p className="text-sm leading-relaxed">{phrase}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Trabalenguas Section */}
        <div className="bg-indigo-600/10 border border-indigo-500/30 rounded-3xl p-6 space-y-6">
          <div className="flex items-center gap-2 text-indigo-500 font-bold uppercase tracking-widest text-xs">
            <Sparkles className="w-4 h-4" /> El Gran Desafío: Trabalenguas
          </div>
          <div className="space-y-6">
            {(pistaTrabalenguas || []).map((trabalenguas: string, i: number) => (
              <div key={i} className="space-y-4 border-b border-indigo-500/10 pb-6 last:border-0">
                <p className="text-2xl font-black italic text-white leading-tight">
                  "{trabalenguas}"
                </p>
                <button 
                  type="button"
                  onClick={() => setFeedback({ type: 'success', message: `¡EXCELENTE! Has superado el trabalenguas ${i+1} 🌟` })}
                  className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-xl italic uppercase shadow-lg shadow-indigo-900/40"
                >
                  ¡Lo he conseguido!
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <button
            type="button"
            onClick={() => setActivePistaSection('COMPLETAR')}
            className="group relative overflow-hidden rounded-3xl border border-yellow-500 bg-zinc-900 p-6 text-left transition hover:border-yellow-400 hover:bg-zinc-800"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent opacity-0 transition group-hover:opacity-100" />
            <div className="relative z-10 space-y-3">
              <div className="text-yellow-400 uppercase tracking-[0.3em] text-[10px] font-bold">Actividad separada</div>
              <h3 className="text-2xl font-black text-white">Completar frases</h3>
              <p className="text-sm text-zinc-400">Abre este desafío en una vista independiente.</p>
            </div>
          </button>
        </div>
          </>
        ) : renderCompletionActivity()}
      </div>
      <button 
        type="button"
        onClick={onFinish}
        className="w-full py-4 bg-indigo-600 text-white font-black rounded-xl italic uppercase shadow-lg shadow-indigo-900/40"
      >
        Terminar Práctica
      </button>
    </motion.div>
  );
};
