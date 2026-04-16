import * as React from 'react';
import { motion } from 'motion/react';
import { Mic, Sparkles } from 'lucide-react';
import { Phoneme, PistaEcoItem, PistaDecirItem } from '../types';
import { VisualContent } from './VisualContent';

interface PistaProps {
  phoneme: Phoneme;
  pistaEcoTitle?: string;
  pistaEco: PistaEcoItem[];
  pistaDecir: PistaDecirItem[];
  pistaFrases: string[];
  pistaTrabalenguas: string[];
  pistaCompletar: { phrase: string; word: string }[];
  onFinish: () => void;
  setFeedback: (fb: { type: 'success' | 'error' | 'info', message: string } | null) => void;
}

export const Pista: React.FC<PistaProps> = ({
  phoneme,
  pistaEcoTitle,
  pistaEco,
  pistaDecir,
  pistaFrases,
  pistaTrabalenguas,
  pistaCompletar,
  onFinish,
  setFeedback
}: PistaProps) => {
  const [completedIndices, setCompletedIndices] = React.useState<number[]>([]);
  const [voices, setVoices] = React.useState<SpeechSynthesisVoice[]>([]);

  React.useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const synth = window.speechSynthesis;
    const updateVoices = () => setVoices(synth.getVoices());

    updateVoices();
    synth.addEventListener('voiceschanged', updateVoices);

    return () => {
      synth.removeEventListener('voiceschanged', updateVoices);
    };
  }, []);

  const toggleComplete = (index: number, word: string) => {
    if (!completedIndices.includes(index)) {
      setCompletedIndices([...completedIndices, index]);
      setFeedback({ type: 'success', message: `¡Muy bien! La palabra es ${word.toUpperCase()} ✨` });
    }
  };

  const speakWord = (word: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'es-ES';
      utterance.volume = 1;
      utterance.pitch = 1;
      utterance.rate = 0.95;

      const esVoice = voices.find(v => v.lang.startsWith('es')) || voices[0];
      if (esVoice) {
        utterance.voice = esVoice;
      }

      const speak = () => {
        synth.cancel();
        synth.speak(utterance);
      };

      if (voices.length > 0) {
        speak();
      } else {
        const onVoicesChanged = () => {
          const updatedVoices = synth.getVoices();
          const esVoiceLoaded = updatedVoices.find(v => v.lang.startsWith('es')) || updatedVoices[0];
          if (esVoiceLoaded) {
            utterance.voice = esVoiceLoaded;
          }
          speak();
          synth.removeEventListener('voiceschanged', onVoicesChanged);
        };
        synth.addEventListener('voiceschanged', onVoicesChanged);
      }
    } else {
      setFeedback({ type: 'error', message: 'Este navegador no soporta voz sintética.' });
    }
  };

  const evaluateDiscrimination = (item: PistaEcoItem, answer: boolean) => {
    const actualHasTarget = item.hasTarget ?? item.word.toUpperCase().includes(phoneme);
    const correct = actualHasTarget === answer;
    const wordLabel = item.word.toUpperCase();

    if (correct) {
      if (actualHasTarget) {
        setFeedback({ type: 'success', message: `¡Correcto! ${wordLabel} lleva el sonido ${phoneme}.` });
      } else {
        setFeedback({ type: 'success', message: `¡Correcto! ${wordLabel} no lleva el sonido ${phoneme}.` });
      }
    } else {
      if (answer) {
        setFeedback({ type: 'error', message: `¡No! ${wordLabel} no lleva el sonido ${phoneme}.` });
      } else {
        setFeedback({ type: 'error', message: `¡No! ${wordLabel} sí lleva el sonido ${phoneme}.` });
      }
    }
  };

  const groupedDecir = pistaDecir.reduce<Record<string, PistaDecirItem[]>>((acc, item) => {
    const key = item.category || 'contiene';
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, { inicio: [], contiene: [], final: [], inversa: [] });

  return (
    <motion.div 
      key="pista"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-8"
    >
      <div className="grid grid-cols-1 gap-8">
        {/* Discriminación Auditiva */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-indigo-500 font-bold uppercase tracking-widest text-xs">
              <Mic className="w-4 h-4" /> {pistaEcoTitle || "DISCRIMINACIÓN AUDITIVA"}
            </div>
            <p className="text-zinc-400 text-sm">
              Escucha la palabra y elige si contiene el sonido <strong>{phoneme}</strong>.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(pistaEco || []).map((item: any, i: number) => (
              <div 
                key={i}
                className="p-4 bg-zinc-800 rounded-xl border border-zinc-700 flex flex-col items-center gap-4"
              >
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <VisualContent content={item.img} className="w-16 h-16 text-4xl" />
                </div>
                <div className="text-center">
                  <span className="block text-xs font-bold text-white uppercase">{item.word}</span>
                  {item.subtitle && (
                    <span className="text-[10px] text-zinc-500 font-medium uppercase mt-0.5 tracking-tighter">
                      {item.subtitle}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => speakWord(item.word)}
                  className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full uppercase text-[10px] tracking-widest font-semibold"
                >
                  Escuchar palabra
                </button>
                <div className="grid grid-cols-2 gap-2 w-full">
                  <button
                    type="button"
                    onClick={() => evaluateDiscrimination(item, true)}
                    className="py-2 bg-emerald-600 hover:bg-emerald-500 text-black font-bold rounded-xl uppercase text-[10px] tracking-widest"
                  >
                    Sí
                  </button>
                  <button
                    type="button"
                    onClick={() => evaluateDiscrimination(item, false)}
                    className="py-2 bg-red-600 hover:bg-red-500 text-black font-bold rounded-xl uppercase text-[10px] tracking-widest"
                  >
                    No
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actividad de Decir Palabras */}
        <div className="bg-indigo-950 border border-indigo-900 rounded-3xl p-6 space-y-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold uppercase tracking-widest text-xs">
              <Mic className="w-4 h-4" /> ¡Reto S en Marcha!
            </div>
            <p className="text-zinc-300 text-sm">
              Di en voz alta las palabras de cada categoría: empieza por <strong>S</strong>, contiene <strong>S</strong> o acaba con <strong>S</strong>.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {(['inicio', 'contiene', 'final', 'inversa'] as const).map((category) => {
              const labels: Record<typeof category, string> = {
                inicio: 'Empiezan por S',
                contiene: 'Contienen S',
                final: 'Acaban con S',
                inversa: 'Acaban en S'
              };
              const items = groupedDecir[category] || [];

              return (
                <div key={category} className="bg-zinc-900 border border-zinc-800 rounded-3xl p-4 space-y-4">
                  <div className="text-white font-bold uppercase tracking-widest text-[11px]">
                    {labels[category]}
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    {Array.from({ length: 10 }).map((_, index) => {
                      const item = items[index];
                      return (
                        <div
                          key={index}
                          className={`rounded-2xl p-4 border ${item ? 'bg-zinc-800 border-zinc-700' : 'bg-zinc-950 border-dashed border-zinc-700'} space-y-3`}
                        >
                          {item ? (
                            <>
                              <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-3">
                                  {item.img ? (
                                    <VisualContent content={item.img} className="w-10 h-10 text-4xl rounded-xl" />
                                  ) : (
                                    <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-xs text-zinc-500 uppercase">
                                      IMG
                                    </div>
                                  )}
                                  <span className="text-sm font-black text-white uppercase tracking-tighter">{item.word}</span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => speakWord(item.word)}
                                  className="px-2 py-1 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] uppercase rounded-full"
                                >
                                  Escuchar
                                </button>
                              </div>
                              {item.subtitle && (
                                <div className="text-[10px] text-zinc-500 uppercase tracking-widest">
                                  {item.subtitle}
                                </div>
                              )}
                            </>
                          ) : (
                            <div className="text-center text-zinc-500 uppercase text-[11px] tracking-widest">
                              Espacio libre para palabra e imagen
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Completar Frases Section */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-yellow-500 font-bold uppercase tracking-widest text-xs">
            <Mic className="w-4 h-4" /> Desafío de Completar Frases
          </div>
          <div className="space-y-4">
            {(pistaCompletar || []).map((item: any, i: number) => (
              <div key={i} className="p-4 bg-zinc-800 rounded-xl border-l-4 border-yellow-500 space-y-3">
                <p className="text-lg text-zinc-300 font-medium">
                  "{item.phrase} <span className="text-yellow-500 font-black tracking-widest">{completedIndices.includes(i) ? item.word.toUpperCase() : '_______'}</span>"
                </p>
                {!completedIndices.includes(i) && (
                  <button 
                    onClick={() => toggleComplete(i, item.word)}
                    className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-black rounded-lg text-xs uppercase italic transition-colors"
                  >
                    ¡Completar frase!
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Frases Section */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-indigo-500 font-bold uppercase tracking-widest text-xs">
            <Mic className="w-4 h-4" /> Nivel de Frases
          </div>
          <div className="space-y-3">
            {(pistaFrases || []).map((frase: string, i: number) => (
              <button 
                key={i}
                onClick={() => setFeedback({ type: 'info', message: "¡Qué bien suena esa frase! ✨" })}
                className="w-full text-left p-4 bg-zinc-800 hover:bg-zinc-700 rounded-xl font-medium text-lg transition-all border-l-4 border-indigo-600"
              >
                "{frase}"
              </button>
            ))}
          </div>
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
                  onClick={() => setFeedback({ type: 'success', message: `¡EXCELENTE! Has superado el trabalenguas ${i+1} 🌟` })}
                  className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-xl italic uppercase shadow-lg shadow-indigo-900/40"
                >
                  ¡Lo he conseguido!
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button 
        onClick={onFinish}
        className="w-full py-4 bg-indigo-600 text-white font-black rounded-xl italic uppercase shadow-lg shadow-indigo-900/40"
      >
        Terminar Práctica
      </button>
    </motion.div>
  );
};
