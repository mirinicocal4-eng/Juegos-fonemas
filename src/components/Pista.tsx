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
  pdfUrl?: string;
  onFinish: () => void;
  setFeedback: (fb: { type: 'success' | 'error' | 'info', message: string } | null) => void;
}

export const Pista: React.FC<PistaProps> = ({
  phoneme,
  pistaEco,
  pistaDecir,
  pistaFrases,
  pistaTrabalenguas,
  pdfUrl,
  onFinish,
  setFeedback
}: PistaProps) => {
  const [voices, setVoices] = React.useState<SpeechSynthesisVoice[]>([]);
  const [showOptionalPhrases, setShowOptionalPhrases] = React.useState(false);

  React.useEffect(() => {
    const cleanup = setupSpeechVoices(setVoices);
    return cleanup;
  }, []);

  const normalizeText = (text: string) =>
    text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
      .toUpperCase();

  const speakWord = (word: string) => {
    speakText(word, voices, () => setFeedback({ type: 'error', message: 'Este navegador no soporta voz sintética.' }));
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
      style={{ overflowAnchor: 'none' }}
    >
      <div style={{ overflowAnchor: 'none' }} className="grid grid-cols-1 gap-8">
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
                              <VisualContent content={item.img} alt={item.word} className="w-10 h-10 text-4xl rounded-xl" />
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
