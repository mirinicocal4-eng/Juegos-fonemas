import * as React from 'react';
import { motion } from 'motion/react';
import { Mic, Volume2, Sparkles, ChevronRight } from 'lucide-react';
import { Phoneme, PistaEcoItem, PistaDecirItem, GameImage } from '../types';
import { VisualContent } from './VisualContent';
import { setupSpeechVoices, speakText } from '../utils/speech';

interface PistaProps {
  phoneme: Phoneme;
  pistaEco: PistaEcoItem[];
  pistaDecir: PistaDecirItem[];
  pistaFrases: string[];
  pistaTrabalenguas: string[];
  pistaCompletar: { phrase: string; word: string }[];
  gameImages: GameImage[];
  playerCount: number;
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
  pistaCompletar,
  gameImages,
  playerCount,
  pdfUrl,
  onFinish,
  setFeedback
}) => {
  const [voices, setVoices] = React.useState<SpeechSynthesisVoice[]>([]);
  const [diceValue, setDiceValue] = React.useState<number | null>(null);
  const [selectedSpace, setSelectedSpace] = React.useState<number | null>(null);
  const [playerPositions, setPlayerPositions] = React.useState<number[]>([]);
  const [visitedSpaces, setVisitedSpaces] = React.useState<Set<number>>(new Set());
  const [showResults, setShowResults] = React.useState(false);
  const [gameCompleted, setGameCompleted] = React.useState(false);
  const [activePlayer, setActivePlayer] = React.useState(0);
  const [completarIndex, setCompletarIndex] = React.useState(0);
  const [completedIndices, setCompletedIndices] = React.useState<number[]>([]);

  React.useEffect(() => {
    const cleanup = setupSpeechVoices(setVoices);
    return cleanup;
  }, []);

  const speakWord = (word: string) => {
    speakText(word, voices, () => setFeedback({ type: 'error', message: 'Este navegador no soporta voz sintética.' }));
  };

  const speakTextContent = (text: string) => {
    speakText(text, voices, () => setFeedback({ type: 'error', message: 'Este navegador no soporta voz sintética.' }));
  };

  const groupedDecir = React.useMemo(() =>
    pistaDecir.reduce<Record<string, PistaDecirItem[]>>((acc, item) => {
      const key = item.category || 'contiene';
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, { inicio: [], contiene: [], inversa: [], final: [] }),
    [pistaDecir]
  );

  const articulationDecirGroups = React.useMemo(() => ({
    inicio: (groupedDecir.inicio || []),
    contiene: (groupedDecir.contiene || []),
    inversa: (groupedDecir.inversa || []),
    final: (groupedDecir.final || [])
  }), [groupedDecir]);

  // Tablero Logic
  const boardCells = React.useMemo(() => {
    const phraseCells = (pistaFrases || []).map((content, idx) => ({ id: idx, type: 'Frase' as const, content, image: gameImages[idx % gameImages.length]?.img }));
    const trabaCells = (pistaTrabalenguas || []).map((content, idx) => ({ id: phraseCells.length + idx, type: 'Trabalenguas' as const, content, image: gameImages[(phraseCells.length + idx) % gameImages.length]?.img }));
    return [...phraseCells, ...trabaCells];
  }, [pistaFrases, pistaTrabalenguas, gameImages]);

  React.useEffect(() => {
    setPlayerPositions(Array.from({ length: playerCount }, () => 0));
  }, [playerCount]);

  const rollDice = () => {
    if (gameCompleted || boardCells.length === 0) return;
    const value = Math.floor(Math.random() * 6) + 1;
    setDiceValue(value);
    
    const newPositions = [...playerPositions];
    const nextPos = Math.min(newPositions[activePlayer] + value, boardCells.length - 1);
    newPositions[activePlayer] = nextPos;
    setPlayerPositions(newPositions);
    setSelectedSpace(nextPos);
    setVisitedSpaces(prev => new Set(prev).add(nextPos));

    if (nextPos === boardCells.length - 1) {
      setGameCompleted(true);
      setFeedback({ type: 'success', message: `¡Explorador ${activePlayer + 1} ha llegado a la meta! 🏆` });
    } else {
      setActivePlayer((prev) => (prev + 1) % playerCount);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-12 pb-20"
    >
      {/* 1. NIVEL DE ECO */}
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

      {/* 2. DESAFÍO DE COMPLETAR */}
      {(pistaCompletar || []).length > 0 && (
        <section className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-yellow-500 font-bold uppercase tracking-widest text-xs">
              <Sparkles className="w-4 h-4" /> Desafío de Completar Frases
            </div>
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
              {completarIndex + 1} / {pistaCompletar.length}
            </span>
          </div>
          <div className="p-6 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-4 text-center">
            <p className="text-xl text-zinc-200 font-medium leading-relaxed italic">
              "{pistaCompletar[completarIndex].phrase} <span className="text-yellow-500 font-black border-b-2 border-dashed border-yellow-500/30 px-2">
                {completedIndices.includes(completarIndex) ? pistaCompletar[completarIndex].word.toUpperCase() : '_______'}
              </span>"
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => speakTextContent(pistaCompletar[completarIndex].phrase)}
                className="p-3 bg-zinc-800 text-white rounded-full hover:bg-zinc-700 transition-colors"
              >
                <Volume2 className="w-5 h-5" />
              </button>
              {!completedIndices.includes(completarIndex) && (
                <button
                  onClick={() => setCompletedIndices(prev => [...prev, completarIndex])}
                  className="px-6 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-black rounded-full text-xs uppercase italic transition-colors"
                >
                  ¡Completar!
                </button>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setCompletarIndex(prev => Math.max(0, prev - 1))}
              disabled={completarIndex === 0}
              className="flex-1 py-3 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 text-white font-bold rounded-xl transition-all uppercase text-[10px] tracking-widest"
            >
              Anterior
            </button>
            <button 
              onClick={() => setCompletarIndex(prev => Math.min(pistaCompletar.length - 1, prev + 1))}
              disabled={completarIndex === pistaCompletar.length - 1}
              className="flex-1 py-3 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 uppercase text-[10px] tracking-widest"
            >
              Siguiente <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      )}

      {/* 3. JUEGO DE TABLERO */}
      <section className="bg-indigo-950/20 border border-indigo-500/30 rounded-3xl p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <p className="text-indigo-400 uppercase tracking-widest text-xs font-bold">Aventura de Voz</p>
            <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">Tablero de Frases</h3>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Turno</p>
              <p className="text-sm font-black text-white italic">Explorador {activePlayer + 1}</p>
            </div>
            <button
              onClick={rollDice}
              disabled={gameCompleted}
              className="w-16 h-16 bg-indigo-600 text-white rounded-2xl shadow-xl shadow-indigo-900/40 hover:bg-indigo-500 flex items-center justify-center text-2xl font-black disabled:opacity-50"
            >
              {diceValue || '🎲'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {boardCells.map((cell, idx) => {
            const playersHere = playerPositions.map((pos, pIdx) => pos === idx ? pIdx : -1).filter(p => p !== -1);
            const isCurrent = selectedSpace === idx;
            return (
              <div 
                key={idx}
                className={`aspect-square rounded-xl border flex flex-col items-center justify-center relative transition-all ${isCurrent ? 'bg-indigo-600/30 border-indigo-400 scale-105' : 'bg-zinc-900/50 border-zinc-800 opacity-60'}`}
              >
                <VisualContent content={cell.image} className="w-8 h-8 opacity-40" />
                <div className="flex gap-0.5 absolute -bottom-1">
                  {playersHere.map(p => (
                    <div key={p} className={`w-3 h-3 rounded-full border border-white shadow-sm ${['bg-indigo-500', 'bg-blue-500', 'bg-emerald-500', 'bg-orange-500'][p]}`} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {selectedSpace !== null && boardCells[selectedSpace] && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-zinc-950 rounded-2xl border border-indigo-500/30 text-center space-y-4"
          >
            <div className="flex items-center justify-center gap-3">
              <span className="px-3 py-1 bg-indigo-600/20 text-indigo-400 rounded-full text-[10px] font-black uppercase tracking-widest">
                {boardCells[selectedSpace].type}
              </span>
              <button onClick={() => speakTextContent(boardCells[selectedSpace].content)} className="p-2 text-zinc-400 hover:text-white transition-colors">
                <Volume2 className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xl font-black text-white italic uppercase tracking-tight leading-tight">
              {boardCells[selectedSpace].content}
            </p>
          </motion.div>
        )}
      </section>

      {/* 4. ARTICULACIÓN POR POSICIÓN */}
      <section className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-6">
        <div className="flex items-center gap-2 text-emerald-500 font-bold uppercase tracking-widest text-xs">
          <Mic className="w-4 h-4" /> Gimnasia de Sonidos
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(['inicio', 'contiene', 'inversa', 'final'] as const).map((category) => {
            const items = articulationDecirGroups[category] || [];
            if (items.length === 0) return null;
            return (
              <div key={category} className="space-y-3">
                <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest pl-2">Posición {category}</h4>
                <div className="space-y-2">
                  {items.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-zinc-800 rounded-xl border border-zinc-700/50">
                      <VisualContent content={item.img} className="w-8 h-8" />
                      <span className="flex-1 text-sm font-bold text-white uppercase">{item.word}</span>
                      <button onClick={() => speakWord(item.word)} className="p-2 text-zinc-500 hover:text-indigo-400 transition-colors">
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. PDF VIEWER */}
      {pdfUrl && (
        <section className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-black uppercase tracking-widest text-zinc-500 italic">Documento de Apoyo</p>
            <a href={pdfUrl} target="_blank" rel="noreferrer" className="text-[10px] text-indigo-400 font-black uppercase tracking-widest hover:underline">Abrir completo</a>
          </div>
          <iframe src={pdfUrl} className="w-full h-80 rounded-2xl border border-zinc-800" />
        </section>
      )}

      <button 
        onClick={onFinish}
        className="w-full py-6 bg-linear-to-r from-indigo-600 to-violet-700 text-white font-black rounded-2xl italic uppercase tracking-widest shadow-2xl hover:scale-[1.02] active:scale-95 transition-all"
      >
        ¡He terminado mi entrenamiento! 🚀
      </button>
    </motion.div>
  );
};
