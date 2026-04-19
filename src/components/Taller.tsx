import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, CheckCircle2, Mic, Volume2 } from 'lucide-react';
import { Phoneme, GameState, TallerStep } from '../types';
import { setupSpeechVoices, speakText } from '../utils/speech';

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
  const currentStep = tallerSteps[step] || { title: '', instruction: '', sound: '', tip: '', img: '' };

  React.useEffect(() => {
    const cleanup = setupSpeechVoices(setVoices);
    return cleanup;
  }, []);

  const speakCurrentText = (text: string) => {
    speakText(text, voices, () => setFeedback({ type: 'error', message: 'Este navegador no soporta voz sintética.' }));
  };

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

        {currentStep.img && (
          <div className="flex justify-center">
            <div className="w-48 h-48 bg-zinc-950 rounded-2xl border border-zinc-800 p-4 flex items-center justify-center overflow-hidden">
              <img src={currentStep.img} alt={currentStep.title} className="max-w-full max-h-full object-contain" />
            </div>
          </div>
        )}

        <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800 space-y-4">
          <p className="text-zinc-400 font-medium">{currentStep.instruction}</p>
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
            {currentStep.tip}
          </div>
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
              setFeedback({ type: 'error', message: msg });
            }}
            className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            Me he equivocado
          </button>
        </div>
      </div>

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
    </motion.div>
  );
};
