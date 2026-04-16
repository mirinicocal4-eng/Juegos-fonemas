import * as React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Volume2 } from 'lucide-react';
import { Phoneme, SemaforoPair, SemaforoRadarItem } from '../types';
import { VisualContent } from './VisualContent';

interface SemaforoProps {
  phoneme: Phoneme;
  step: number;
  subStep: number;
  semaforoPares: SemaforoPair[];
  semaforoRadar: SemaforoRadarItem[];
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
  onSetSubStep,
  onNextStep,
  setFeedback
}: SemaforoProps) => {
  const [voices, setVoices] = React.useState<SpeechSynthesisVoice[]>([]);

  React.useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const synth = window.speechSynthesis;
    const updateVoices = () => setVoices(synth.getVoices());

    updateVoices();
    synth.addEventListener('voiceschanged', updateVoices);

    return () => synth.removeEventListener('voiceschanged', updateVoices);
  }, []);

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
            <p className="text-lg text-white italic">¿Cuál tiene el sonido {phoneme === 'R' ? 'fuerte' : phoneme}?</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {[1, 2].map((num) => {
              const pair = semaforoPares[step] || { w1: '', s1: '', i1: '', i1_img: '', w2: '', s2: '', i2: '', i2_img: '', target: 1 };
              const word = num === 1 ? pair.w1 : pair.w2;
              const soundLabel = num === 1 ? pair.s1 : pair.s2;
              const emoji = num === 1 ? pair.i1 : pair.i2;
              const pictograma = num === 1 ? pair.i1_img : pair.i2_img;
              const isTarget = num === pair.target;
              
              return (
                <motion.button
                  key={`${num}-${step}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    if (isTarget) {
                      setFeedback({ type: 'success', message: `¡Genial! ${word} es la opción correcta ✅` });
                    } else {
                      setFeedback({ type: 'info', message: `¡Ups! ${word} no es lo que buscamos 🤫` });
                    }
                  }}
                  className={`bg-zinc-800 border-2 rounded-2xl p-6 flex flex-col items-center gap-4 transition-all group ${isTarget ? 'hover:border-green-500' : 'hover:border-red-500'} border-zinc-700`}
                >
                  <div className="relative w-20 h-20 flex items-center justify-center">
                    <VisualContent 
                      content={pictograma || emoji} 
                      className={`${pictograma ? 'w-20 h-20' : 'text-6xl'} group-hover:scale-110 transition-transform`} 
                    />
                  </div>
                  <div className="text-center">
                    <span className="block text-2xl font-black text-white italic tracking-tighter">{word}</span>
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${isTarget ? 'text-green-500' : 'text-zinc-500'}`}>
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
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 space-y-8">
          <div className="text-center space-y-4">
            <p className="text-zinc-400 uppercase tracking-widest text-xs font-bold">Radar de Sonidos</p>
            <p className="text-lg text-white italic">¿Contiene el sonido {phoneme === 'R' ? 'fuerte' : phoneme}?</p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {(semaforoRadar || []).map((item: any, i: number) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => {
                  if (item.hasTarget) {
                    setFeedback({ type: 'success', message: `¡Sonido detectado! ${item.word} tiene el sonido ✅` });
                  } else {
                    setFeedback({ type: 'error', message: `¡Sonido no encontrado! ${item.word} no tiene el sonido ❌` });
                  }
                }}
                className="bg-zinc-800 border border-zinc-700 p-4 rounded-xl flex items-center justify-between hover:bg-zinc-700 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <VisualContent content={item.img} className="text-3xl group-hover:scale-110 transition-transform w-10 h-10" />
                  <span className="text-xl font-black text-white italic">{item.word}</span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    speakWord(item.word);
                  }}
                  className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};
