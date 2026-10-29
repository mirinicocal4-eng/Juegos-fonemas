import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, CheckCircle2, Mic, Volume2 } from 'lucide-react';
import { Phoneme, TallerStep } from '../types';
import { setupSpeechVoices, speakText, getArasaacUrl, startListening, isSpeechRecognitionSupported } from '../utils';

interface TallerProps {
  phoneme: Phoneme;
  step: number;
  tallerSteps: TallerStep[];
  onNext: () => void;
  onFinish: () => void;
  setFeedback: (fb: { type: 'success' | 'error' | 'info', message: string } | null) => void;
}

export const Taller: React.FC<TallerProps> = ({ 
  phoneme, 
  step, 
  tallerSteps, 
  onNext, 
  onFinish, 
  setFeedback 
}) => {
  const [voices, setVoices] = React.useState<SpeechSynthesisVoice[]>([]);
  const [apiImgs, setApiImgs] = React.useState<string[]>([]);
  const currentStep = tallerSteps[step] || { title: '', instruction: '', sound: '', tip: '', img: '' };
  const [isListening, setIsListening] = React.useState(false);
  const [recStatus, setRecStatus] = React.useState<'idle' | 'success' | 'error'>('idle');
  const cancelListeningRef = React.useRef<(() => void) | null>(null);

  React.useEffect(() => {
    // Reset listening state on step change
    if (cancelListeningRef.current) cancelListeningRef.current();
    setIsListening(false);
    setRecStatus('idle');
  }, [step]);

  React.useEffect(() => {
    const cleanup = setupSpeechVoices(setVoices);
    return cleanup;
  }, []);

  // Efecto para buscar imagen en ARASAAC si no hay una URL directa
  React.useEffect(() => {
    async function fetchImages() {
      setApiImgs([]);

      const rawImgs = Array.isArray(currentStep.img)
        ? currentStep.img
        : currentStep.img ? [currentStep.img] : [];

      if (rawImgs.length === 0) {
        return;
      }

      const urls = await Promise.all(
        rawImgs.map(async (item) => {
          if (typeof item === 'string' && item.startsWith('http')) {
            return item;
          }
          return await getArasaacUrl(item);
        })
      );

      setApiImgs(urls.filter((u): u is string => Boolean(u)));
    }

    fetchImages();
  }, [step, currentStep]);

  const handleMicClick = () => {
    if (isListening) {
      if (cancelListeningRef.current) cancelListeningRef.current();
      setIsListening(false);
      return;
    }

    if (!currentStep.sound) return;

    setIsListening(true);
    setRecStatus('idle');
    setFeedback({ type: 'info', message: '🎙️ Escuchando... ¡Habla ahora!' });

    cancelListeningRef.current = startListening(
      currentStep.sound,
      (isMatch, recognizedText) => {
        setIsListening(false);
        if (isMatch) {
          setRecStatus('success');
          setFeedback({ type: 'success', message: `¡Genial! Has dicho: "${recognizedText}" ✨` });
        } else {
          setRecStatus('error');
          setFeedback({ type: 'error', message: `He oído "${recognizedText}". ¡Inténtalo de nuevo! ⚠️` });
        }
      },
      (error) => {
        setIsListening(false);
        setRecStatus('error');
        setFeedback({ type: 'error', message: error });
      },
      () => {
        setIsListening(false);
      }
    );
  };

  const speakCurrentText = (text: string) => {
    speakText(text, voices, () => setFeedback({ type: 'error', message: 'Este navegador no soporta voz sintética.' }));
  };

  const displayImgs: string[] = React.useMemo(() => {
    if (Array.isArray(currentStep.img)) {
      if (currentStep.img.every(i => typeof i === 'string' && i.startsWith('http'))) return currentStep.img;
      return apiImgs;
    }
    if (typeof currentStep.img === 'string' && currentStep.img.startsWith('http')) {
      return [currentStep.img];
    }
    return apiImgs;
  }, [currentStep.img, apiImgs]);

  return (
    <motion.div 
      key="taller"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-indigo-500 font-bold text-xs uppercase tracking-widest">Paso {step + 1} de {(tallerSteps || []).length}</span>
            <h3 className="text-3xl font-black italic text-white uppercase">{currentStep.title}</h3>
          </div>
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-900/40 shrink-0">
            <Mic className="w-8 h-8 text-white" />
          </div>
        </div>

        {displayImgs.length > 0 && (
          <div className="flex justify-center gap-4 flex-wrap">
            {displayImgs.map((imgUrl, idx) => (
              <div key={idx} className="w-40 h-40 bg-zinc-950 rounded-2xl border border-zinc-800 p-4 flex items-center justify-center overflow-hidden relative shadow-md">
                <img src={imgUrl} alt={currentStep.title} className="max-w-full max-h-full object-contain relative z-10" />
              </div>
            ))}
          </div>
        )}

        <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800 space-y-4">
          <p className="text-zinc-400 font-medium">{currentStep.instruction}</p>
          {currentStep.sound ? (
            <div className="flex items-center justify-center gap-4 text-white py-4 border-y border-zinc-800">
              <div className="text-5xl font-black italic tracking-widest text-center">
                {currentStep.sound}
              </div>
              <button
                type="button"
                onClick={() => speakCurrentText(currentStep.sound)}
                className="p-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white transition-all"
              >
                <Volume2 className="w-5 h-5" />
              </button>
              <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse" />
              <span className="text-zinc-400 italic text-sm">{currentStep.tip}</span>
            </div>
          ) : currentStep.tip ? (
            <div className="py-2 border-t border-zinc-800 flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse" />
              <span className="text-zinc-400 italic text-sm">{currentStep.tip}</span>
            </div>
          ) : null}
        </div>

        <div className="flex gap-4">
          <button 
            onClick={() => setFeedback({ type: 'success', message: "¡Excelente! El sonido es perfecto ✨" })}
            className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-900/40 transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5" /> ¡Lo hice bien!
          </button>
          <button 
            onClick={() => {
              let msg = "¡Cuidado! Revisa la posición de tu lengua ⚠️";
              if (phoneme === 'R') msg = "¡Cuidado! Lengua arriba para que el sonido salga bien ⚠️";
              if (phoneme === 'S') msg = "¡Cuidado! No saques la lengua, mantenla detrás de los dientes ⚠️";
              if (phoneme === 'Z') msg = "¡Cuidado! Saca un poquito la lengua entre los dientes ⚠️";
              if (phoneme === 'L') msg = "¡Cuidado! Sube la punta de la lengua detrás de los dientes de arriba ⚠️";
              setFeedback({ type: 'error', message: msg });
            }}
            className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            Me he equivocado
          </button>
        </div>
      </div>

      <AnimatePresence>
        {step < (tallerSteps || []).length - 1 ? (
          <button 
            onClick={onNext}
            className="w-full bg-white text-black font-black py-4 rounded-xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 uppercase italic"
          >
            Siguiente paso <ChevronRight className="w-5 h-5" />
          </button>
        ) : (
          <button 
            onClick={onFinish}
            className="w-full border border-zinc-700 text-white font-bold py-4 rounded-xl hover:bg-zinc-800 transition-all uppercase italic"
          >
            Terminar Práctica
          </button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
