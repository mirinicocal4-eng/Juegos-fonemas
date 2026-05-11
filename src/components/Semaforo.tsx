import * as React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Volume2, Mic } from 'lucide-react';
import { Phoneme, SemaforoPair, SemaforoRadarItem, PistaEcoItem } from '../types';
import { VisualContent } from './VisualContent';
import { setupSpeechVoices, speakText } from '../utils/speech';

interface SemaforoProps {
  phoneme: Phoneme;
  step: number;
  subStep: number;
  semaforoPares: SemaforoPair[];
  semaforoRadar: SemaforoRadarItem[];
  optionalSemaforoRadar: SemaforoRadarItem[];
  pistaEco: PistaEcoItem[];
  semaforoRadarTitle?: string;
  onSetSubStep: (subStep: number) => void;
  onNextStep: () => void;
  setFeedback: (fb: { type: 'success' | 'error' | 'info', message: string } | null) => void;
}

export const Semaforo: React.FC<SemaforoProps> = ({
  phoneme,
  step,
  subStep,
  semaforoPares,
  semaforoRadar,
  optionalSemaforoRadar,
  pistaEco,
  semaforoRadarTitle,
  onSetSubStep,
  onNextStep,
  setFeedback
}) => {
  const [voices, setVoices] = React.useState<SpeechSynthesisVoice[]>([]);
  const [pairResults, setPairResults] = React.useState<Record<number, { selected: number; correct: boolean; attempts: number; showCorrect?: boolean }>>({});
  const [radarResults, setRadarResults] = React.useState<Record<number, { answer: 'si' | 'no'; correct: boolean; attempts: number; showCorrect?: boolean }>>({});
  const [optionalRadarResults, setOptionalRadarResults] = React.useState<Record<number, { answer: 'si' | 'no'; correct: boolean; attempts: number; showCorrect?: boolean }>>({});
  const [showOptionalRadar, setShowOptionalRadar] = React.useState(false);
  const [optionalRadarStep, setOptionalRadarStep] = React.useState(0);

  const safeOptionalRadarStep = optionalSemaforoRadar.length > 0 ? optionalRadarStep % optionalSemaforoRadar.length : 0;
  const optionalItem = optionalSemaforoRadar[safeOptionalRadarStep];
  const optionalResult = optionalRadarResults[safeOptionalRadarStep];
  const optionalIsCorrect = optionalResult?.correct;
  const optionalShowCorrect = optionalResult?.showCorrect ?? false;
  const optionalRevealed = optionalIsCorrect || optionalShowCorrect;
  const optionalShowButtons = !optionalResult || (!optionalIsCorrect && optionalResult?.attempts < 2 && !optionalShowCorrect);

  React.useEffect(() => {
    const cleanup = setupSpeechVoices(setVoices);
    return cleanup;
  }, []);

  React.useEffect(() => {
    setOptionalRadarStep(0);
    if (optionalSemaforoRadar.length === 0) {
      setShowOptionalRadar(false);
    }
  }, [optionalSemaforoRadar]);

  React.useEffect(() => {
    if (subStep === 1 && optionalSemaforoRadar.length > 0) {
      setShowOptionalRadar(true);
    }
  }, [subStep, optionalSemaforoRadar.length]);

  const speakWord = (word: string) => {
    speakText(word, voices, () => setFeedback({ type: 'error', message: 'Este navegador no soporta voz sintética.' }));
  };

  const handleRadarAnswer = (index: number, answer: 'si' | 'no', item: SemaforoRadarItem) => {
    const prev = radarResults[index];
    if (prev?.correct || prev?.showCorrect) return;

    const isCorrect = (answer === 'si') === item.hasTarget;
    const attempts = (prev?.attempts ?? 0) + 1;

    if (isCorrect) {
      setRadarResults((prevState) => ({ ...prevState, [index]: { answer, correct: true, attempts } }));
      setFeedback({ type: 'success', message: `¡Bien! ${item.word} ${item.hasTarget ? 'tiene' : 'no tiene'} el sonido ✅` });
      return;
    }

    if (attempts >= 2) {
      setRadarResults((prevState) => ({ ...prevState, [index]: { answer, correct: false, attempts, showCorrect: true } }));
      setFeedback({ type: 'error', message: `No pasa nada, la respuesta correcta es ${item.hasTarget ? 'Sí' : 'No'}.` });
      return;
    }

    setRadarResults((prevState) => ({ ...prevState, [index]: { answer, correct: false, attempts } }));
    setFeedback({ type: 'error', message: `Casi, intenta de nuevo. ${item.word} ${item.hasTarget ? 'sí lleva' : 'no lleva'} el sonido ❌` });
  };

  const handleOptionalRadarAnswer = (index: number, answer: 'si' | 'no', item: SemaforoRadarItem) => {
    const prev = optionalRadarResults[index];
    if (prev?.correct || prev?.showCorrect) return;

    const isCorrect = (answer === 'si') === item.hasTarget;
    const attempts = (prev?.attempts ?? 0) + 1;

    if (isCorrect) {
      setOptionalRadarResults((prevState) => ({ ...prevState, [index]: { answer, correct: true, attempts } }));
      setFeedback({ type: 'success', message: `¡Bien! ${item.word} ${item.hasTarget ? 'tiene' : 'no tiene'} el sonido ✅` });
      return;
    }

    if (attempts >= 2) {
      setOptionalRadarResults((prevState) => ({ ...prevState, [index]: { answer, correct: false, attempts, showCorrect: true } }));
      setFeedback({ type: 'error', message: `No pasa nada, la respuesta correcta es ${item.hasTarget ? 'Sí' : 'No'}.` });
      return;
    }

    setOptionalRadarResults((prevState) => ({ ...prevState, [index]: { answer, correct: false, attempts } }));
    setFeedback({ type: 'error', message: `Casi, intenta de nuevo. ${item.word} ${item.hasTarget ? 'sí lleva' : 'no lleva'} el sonido ❌` });
  };

  return (
    <motion.div 
      key="semaforo"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      <div className="flex gap-2 mb-6">
        <button 
          onClick={() => onSetSubStep(0)}
          className={`flex-1 py-2 rounded-lg font-bold text-xs uppercase tracking-widest transition-all ${subStep === 0 ? 'bg-indigo-600 text-white' : 'bg-zinc-900 text-zinc-500'}`}
        >
          Nivel A: Pares
        </button>
        <button 
          onClick={() => onSetSubStep(1)}
          className={`flex-1 py-2 rounded-lg font-bold text-xs uppercase tracking-widest transition-all ${subStep === 1 ? 'bg-indigo-600 text-white' : 'bg-zinc-900 text-zinc-500'}`}
        >
          Nivel B: Radar
        </button>
      </div>

      {subStep === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 space-y-8">
          <div className="text-center space-y-4">
            <p className="text-zinc-400 uppercase tracking-widest text-xs font-bold">Duelo de Sonidos</p>
            <p className="text-lg text-white italic">¿Cuál tiene el sonido {phoneme === 'RR' ? 'fuerte' : phoneme}?</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {[1, 2].map((num) => {
              const pair = semaforoPares[step] || { w1: '', s1: '', i1: '', i1_img: '', w2: '', s2: '', i2: '', i2_img: '', target: 1 };
              const word = num === 1 ? pair.w1 : pair.w2;
              const soundLabel = num === 1 ? pair.s1 : pair.s2;
              const emoji = num === 1 ? pair.i1 : pair.i2;
              const pictograma = num === 1 ? pair.i1_img : pair.i2_img;
              const targetNum = pair.target;
              const targetWord = targetNum === 1 ? pair.w1 : pair.w2;
              const pairResult = pairResults[step];
              const isSelected = pairResult?.selected === num;
              const isCorrectSelected = isSelected && pairResult?.correct;
              const isIncorrectSelected = isSelected && pairResult?.correct === false && !pairResult?.showCorrect;
              const showCorrectPair = pairResult?.showCorrect ?? false;
              const isTarget = num === targetNum;

              return (
                <motion.button
                  key={`${num}-${step}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    if (pairResult?.correct || pairResult?.showCorrect) return;

                    const attempts = (pairResult?.attempts ?? 0) + 1;

                    if (isTarget) {
                      setPairResults((prev) => ({ ...prev, [step]: { selected: num, correct: true, attempts } }));
                      setFeedback({ type: 'success', message: `¡Genial! ${word} es la opción correcta ✅` });
                      return;
                    }

                    if (attempts >= 2) {
                      setPairResults((prev) => ({ ...prev, [step]: { selected: num, correct: false, attempts, showCorrect: true } }));
                      setFeedback({ type: 'error', message: `No pasa nada, la respuesta correcta es ${targetWord} ✅` });
                      return;
                    }

                    setPairResults((prev) => ({ ...prev, [step]: { selected: num, correct: false, attempts } }));
                    setFeedback({ type: 'error', message: `Casi, intenta de nuevo. ${word} no es correcto ❌` });
                  }}
                  className={`border-2 rounded-2xl p-6 flex flex-col items-center gap-4 transition-all group ${isCorrectSelected ? 'bg-emerald-900 border-emerald-500' : showCorrectPair && isTarget ? 'bg-emerald-900 border-emerald-500' : isIncorrectSelected ? 'bg-red-900 border-red-500' : 'bg-zinc-800 border-zinc-700'} ${!pairResult?.correct && !showCorrectPair ? (isTarget ? 'hover:border-green-500' : 'hover:border-red-500') : ''}`}
                >
                  <div className="relative w-20 h-20 flex items-center justify-center">
                    <VisualContent 
                      content={pictograma || emoji} 
                      className={`${pictograma ? 'w-20 h-20' : 'text-6xl'} transition-transform`} 
                    />
                  </div>
                  <div className="text-center">
                    <span className="block text-2xl font-black text-white italic tracking-tighter">{word}</span>
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${isCorrectSelected ? 'text-emerald-300' : isIncorrectSelected ? 'text-red-300' : 'text-zinc-500'}`}>
                      {soundLabel}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      speakWord(word);
                    }}
                    className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full uppercase text-[10px] tracking-widest font-semibold"
                  >
                    Escuchar
                  </button>
                </motion.button>
              );
            })}
          </div>

          <button 
            onClick={onNextStep}
            className="w-full py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 uppercase text-xs tracking-widest"
          >
            Siguiente Pareja <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {/* SECCIÓN DE ECO (Movida aquí) */}
          {(pistaEco || []).length > 0 && (
            <section className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-indigo-500 font-bold uppercase tracking-widest text-xs">
                <Mic className="w-4 h-4" /> Nivel de Eco
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {(pistaEco || []).slice(0, 8).map((item, i) => (
                  <button 
                    key={i}
                    onClick={() => {
                      speakWord(item.word);
                      setFeedback({ type: 'info', message: `¡Repite conmigo: ${item.word.toUpperCase()}! ✨` });
                    }}
                    className="p-4 bg-zinc-800 hover:bg-zinc-700 rounded-xl flex flex-col items-center gap-2 transition-all group border border-transparent hover:border-indigo-500"
                  >
                    <VisualContent content={item.img} className="w-12 h-12 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-bold text-white uppercase tracking-tight">{item.word}</span>
                  </button>
                ))}
              </div>
            </section>
          )}

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 space-y-8">
            <div className="text-center space-y-4">
              <p className="text-zinc-400 uppercase tracking-widest text-xs font-bold">{semaforoRadarTitle || 'Radar de Sonidos'}</p>
              <p className="text-lg text-white italic">¿Contiene el sonido {phoneme === 'RR' ? 'fuerte' : (phoneme === 'SINFONES' ? 'trabado' : phoneme)}?</p>
            </div>

            <div className="grid grid-cols-1 gap-4" style={{ overflowAnchor: 'none' }}>
              {semaforoRadar && semaforoRadar.length > 0 ? (
                (() => {
                  const item = semaforoRadar[step];
                  const result = radarResults[step];
                  const isCorrect = result?.correct;
                  const showCorrect = result?.showCorrect ?? false;
                  const revealed = isCorrect || showCorrect;
                  const showButtons = !result || (!isCorrect && result?.attempts < 2 && !showCorrect);

                  return item ? (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0 }}
                      className={`bg-zinc-800 border rounded-xl p-4 transition-all min-h-85 ${isCorrect ? 'border-emerald-500 bg-emerald-950' : showCorrect ? 'border-red-500 bg-red-950' : 'border-zinc-700 hover:bg-zinc-700'}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-2xl">
                          {revealed ? (
                            <VisualContent content={item.img || '❓'} alt={item.word} className="text-3xl" />
                          ) : (
                            <span className="text-zinc-500">?</span>
                          )}
                        </div>

                        <div className="flex-1">
                          <p className="text-zinc-400 uppercase tracking-widest text-[10px] font-bold">Radar {step + 1} / {semaforoRadar.length}</p>
                          <p className="text-lg font-black text-white italic">{revealed ? item.word : 'Escucha y decide'}</p>
                        </div>

                        <button
                          type="button"
                          onClick={() => speakWord(item.word)}
                          className="p-2 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white"
                        >
                          <Volume2 className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="mt-4 flex flex-col gap-3">
                        {showButtons ? (
                          <div className="flex gap-3">
                            {(['si', 'no'] as const).map((value) => (
                              <button
                                key={value}
                                type="button"
                                onClick={() => handleRadarAnswer(step, value, item)}
                                className="flex-1 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm font-bold uppercase tracking-widest text-white hover:border-indigo-500 hover:bg-zinc-800"
                              >
                                {value === 'si' ? 'Sí' : 'No'}
                              </button>
                            ))}
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <p className={`text-sm font-semibold ${isCorrect ? 'text-emerald-300' : 'text-red-300'}`}>
                              {isCorrect ? 'Correcto' : 'La respuesta correcta es'} {showCorrect && !isCorrect ? (item.hasTarget ? 'Sí' : 'No') : ''}
                            </p>
                            <button
                              type="button"
                              onClick={onNextStep}
                              className="w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold uppercase tracking-widest text-white hover:bg-indigo-500"
                            >
                              {step < semaforoRadar.length - 1 ? 'Siguiente sonido' : 'Finalizar radar'}
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="radar-empty"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-zinc-800 border border-zinc-700 rounded-xl p-6 text-center min-h-85"
                    >
                      <p className="text-zinc-300">No hay sonidos disponibles en radar.</p>
                    </motion.div>
                  );
                })()
              ) : (
                <motion.div
                  key="radar-empty"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-zinc-800 border border-zinc-700 rounded-xl p-6 text-center"
                >
                  <p className="text-zinc-300">No hay sonidos disponibles en radar.</p>
                </motion.div>
              )}
            </div>

            {optionalSemaforoRadar.length > 0 && (
              <div className="border-t border-zinc-800 pt-6" style={{ overflowAnchor: 'none' }}>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div>
                    <p className="text-zinc-400 uppercase tracking-widest text-[10px] font-bold">Sonidos opcionales</p>
                    <p className="text-sm text-zinc-500">Practica más palabras si quieres reforzar el oído.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowOptionalRadar((prev) => !prev)}
                    className="rounded-xl bg-zinc-800 px-4 py-3 text-sm font-bold uppercase tracking-widest text-white hover:bg-zinc-700"
                  >
                    {showOptionalRadar ? 'Ocultar extra' : `Mostrar ${optionalSemaforoRadar.length} extras`}
                  </button>
                </div>

                <div className="space-y-4 min-h-65">
                  {showOptionalRadar && (
                    optionalItem ? (
                      <motion.div
                        key={`optional-${optionalRadarStep}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0 }}
                        className={`bg-zinc-800 border rounded-xl p-4 transition-all min-h-65 ${optionalIsCorrect ? 'border-emerald-500 bg-emerald-950' : optionalShowCorrect ? 'border-red-500 bg-red-950' : 'border-zinc-700 hover:bg-zinc-700'}`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-2xl">
                            {optionalRevealed ? (
                              <VisualContent content={optionalItem.img || '❓'} alt={optionalItem.word} className="text-3xl" />
                            ) : (
                              <span className="text-zinc-500">?</span>
                            )}
                          </div>

                          <div className="flex-1">
                            <p className="text-zinc-400 uppercase tracking-widest text-[10px] font-bold">Opcional {optionalRadarStep + 1} / {optionalSemaforoRadar.length}</p>
                            <p className="text-lg font-black text-white italic">{optionalRevealed ? optionalItem.word : 'Escucha y decide'}</p>
                          </div>

                          <button
                            type="button"
                            onClick={() => speakWord(optionalItem.word)}
                            className="p-2 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white"
                          >
                            <Volume2 className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="mt-4 flex flex-col gap-3">
                          {optionalShowButtons ? (
                            <div className="flex gap-3">
                              {(['si', 'no'] as const).map((value) => (
                                <button
                                  key={value}
                                  type="button"
                                  onClick={() => handleOptionalRadarAnswer(optionalRadarStep, value, optionalItem)}
                                  className="flex-1 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm font-bold uppercase tracking-widest text-white hover:border-indigo-500 hover:bg-zinc-800"
                                >
                                  {value === 'si' ? 'Sí' : 'No'}
                                </button>
                              ))}
                            </div>
                          ) : (
                            <div className="space-y-3">
                              <p className={`text-sm font-semibold ${optionalIsCorrect ? 'text-emerald-300' : 'text-red-300'}`}>
                                {optionalIsCorrect ? 'Correcto' : 'La respuesta correcta es'} {optionalShowCorrect && !optionalIsCorrect ? (optionalItem.hasTarget ? 'Sí' : 'No') : ''}
                              </p>
                              <button
                                type="button"
                                onClick={() => {
                                  if (optionalRadarStep < optionalSemaforoRadar.length - 1) {
                                    setOptionalRadarStep((prev) => prev + 1);
                                  } else {
                                    setOptionalRadarStep(0);
                                    setShowOptionalRadar(false);
                                  }
                                }}
                                className="w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold uppercase tracking-widest text-white hover:bg-indigo-500"
                              >
                                {optionalRadarStep < optionalSemaforoRadar.length - 1 ? 'Siguiente extra' : 'Terminar opcional'}
                              </button>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="optional-empty"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-zinc-800 border border-zinc-700 rounded-xl p-6 text-center min-h-65"
                      >
                        <p className="text-zinc-300">No hay sonidos opcionales disponibles.</p>
                      </motion.div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};
