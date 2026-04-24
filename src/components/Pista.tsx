import * as React from 'react';
import { motion } from 'motion/react';
import { Mic, Volume2 } from 'lucide-react';
import { Phoneme, PistaEcoItem, PistaDecirItem, GameImage } from '../types';
import { VisualContent } from './VisualContent';
import { setupSpeechVoices, speakText } from '../utils/speech';

interface PistaProps {
  phoneme: Phoneme;
  pistaEco: PistaEcoItem[];
  pistaDecir: PistaDecirItem[];
  pistaFrases: string[];
  pistaTrabalenguas: string[];
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
  gameImages,
  playerCount,
  pdfUrl,
  onFinish,
  setFeedback
}: PistaProps) => {
  const [voices, setVoices] = React.useState<SpeechSynthesisVoice[]>([]);
  const [diceValue, setDiceValue] = React.useState<number | null>(null);
  const [selectedSpace, setSelectedSpace] = React.useState<number | null>(null);
  const [playerPositions, setPlayerPositions] = React.useState<number[]>([]);
  const [visitedSpaces, setVisitedSpaces] = React.useState<Set<number>>(new Set());
  const [showResults, setShowResults] = React.useState(false);
  const [gameCompleted, setGameCompleted] = React.useState(false);
  const [activePlayer, setActivePlayer] = React.useState(0);

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

  const normalizeSearch = (text: string) =>
    text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toUpperCase();

  const findImageForText = (text: string) => {
    const words = normalizeSearch(text).split(/[^A-ZÑÁÉÍÓÚÜ]+/).filter(Boolean);
    const match = gameImages.find((img) => words.includes(normalizeSearch(img.name)));
    return match?.img;
  };

  type BoardSpace = {
    id: number;
    type: 'Frase' | 'Trabalenguas';
    content: string;
    image?: string;
  };

  const boardCells = React.useMemo<BoardSpace[]>(() => {
    const availableImages = [...new Set(gameImages.map((img) => img.img))];
    const usedImages = new Set<string>();

    const getUniqueImage = () => {
      const nextImage = availableImages.find((img) => !usedImages.has(img));
      if (nextImage) {
        usedImages.add(nextImage);
        return nextImage;
      }
      return undefined;
    };

    const getTextMatchedImage = (text: string) => {
      const words = normalizeSearch(text).split(/[^A-ZÑÁÉÍÓÚÜ]+/).filter(Boolean);
      const matches = gameImages
        .filter((img) => words.includes(normalizeSearch(img.name)))
        .map((img) => img.img)
        .filter(Boolean);
      return matches.find((img) => !usedImages.has(img));
    };

    const phraseCells = pistaFrases
      .filter((phrase) => typeof phrase === 'string' && phrase.trim() !== '')
      .map((phrase, index) => {
        const matchedImage = getTextMatchedImage(phrase);
        const image = matchedImage ?? getUniqueImage();
        if (image) usedImages.add(image);
        return {
          id: index,
          type: 'Frase' as const,
          content: phrase,
          image
        };
      });

    const trabalenguasCells = (pistaTrabalenguas || []).map((traba, index) => {
      const matchedImage = getTextMatchedImage(traba);
      const image = matchedImage ?? getUniqueImage();
      if (image) usedImages.add(image);
      return {
        id: phraseCells.length + index,
        type: 'Trabalenguas' as const,
        content: traba,
        image
      };
    });

    return [...phraseCells, ...trabalenguasCells];
  }, [pistaFrases, pistaTrabalenguas, gameImages]);

  React.useEffect(() => {
    const initialPositions = Array.from({ length: Math.max(1, playerCount) }, (_, index) => index % Math.max(1, boardCells.length));
    setPlayerPositions(initialPositions);
    setVisitedSpaces(new Set());
    setActivePlayer(0);
  }, [playerCount, boardCells.length]);

  const pendingBoardCells = React.useMemo(() => boardCells.filter((cell) => !visitedSpaces.has(cell.id)), [boardCells, visitedSpaces]);
  const pendingPhraseCells = React.useMemo(
    () => pendingBoardCells.filter((cell) => cell.type === 'Frase'),
    [pendingBoardCells]
  );
  const pendingTrabalenguasCells = React.useMemo(
    () => pendingBoardCells.filter((cell) => cell.type === 'Trabalenguas'),
    [pendingBoardCells]
  );
  const boardPlayed = visitedSpaces.size > 0;
  const currentPlayerPosition = playerPositions[activePlayer] ?? null;

  const getDiceFace = (value: number) => {
    const pips: Record<number, number[]> = {
      1: [5],
      2: [1, 9],
      3: [1, 5, 9],
      4: [1, 3, 7, 9],
      5: [1, 3, 5, 7, 9],
      6: [1, 3, 4, 6, 7, 9]
    };
    return pips[value] || [];
  };

  const rollDice = () => {
    if (gameCompleted) {
      setFeedback({ type: 'info', message: 'El juego ya llegó a la casilla final. Pulsa "Volver a jugar" si quieres empezar otra vez.' });
      return;
    }

    if (boardCells.length === 0) {
      setDiceValue(null);
      setSelectedSpace(null);
      setFeedback({ type: 'error', message: 'No hay casillas disponibles en el tablero.' });
      return;
    }

    const finalSpaceIndex = Math.min(20, boardCells.length - 1);
    const value = Math.floor(Math.random() * 6) + 1;
    let nextIndex = 0;

    setPlayerPositions((prev) => {
      const next = [...prev];
      const current = typeof prev[activePlayer] === 'number' ? prev[activePlayer] : 0;
      nextIndex = Math.min(current + value, finalSpaceIndex);
      next[activePlayer] = nextIndex;
      return next;
    });

    setVisitedSpaces((prev) => {
      const nextVisited = new Set(prev);
      nextVisited.add(nextIndex);
      return nextVisited;
    });

    setDiceValue(value);
    setSelectedSpace(nextIndex);
    setFeedback({ type: 'info', message: `Jugador P${activePlayer + 1} avanza ${value} casillas.` });

    if (nextIndex === finalSpaceIndex) {
      setGameCompleted(true);
      setFeedback({ type: 'success', message: '¡Has alcanzado la casilla final! Usa "Terminar Práctica" o "Volver a jugar".' });
      return;
    }

    setActivePlayer((prev) => (prev + 1) % Math.max(1, playerCount));
  };

  const clearDice = () => {
    setDiceValue(null);
    setSelectedSpace(null);
  };

  const handleFinish = () => {
    if (!showResults) {
      setShowResults(true);
      setDiceValue(null);
      setSelectedSpace(null);
      setFeedback({ type: 'info', message: 'Resultados finales activados. Revisa las frases y trabalenguas pendientes.' });
      return;
    }

    onFinish();
  };

  const restartGame = () => {
    const initialPositions = Array.from({ length: Math.max(1, playerCount) }, (_, index) => index % Math.max(1, boardCells.length));
    setPlayerPositions(initialPositions);
    setVisitedSpaces(new Set());
    setSelectedSpace(null);
    setDiceValue(null);
    setActivePlayer(0);
    setGameCompleted(false);
    setShowResults(false);
    setFeedback({ type: 'success', message: 'Juego reiniciado. ¡A jugar otra vez!' });
  };

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

        <div className="bg-indigo-950 border border-indigo-900 rounded-3xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-amber-400 font-bold uppercase tracking-widest text-xs">
            <Mic className="w-4 h-4" /> Palabras para decir
          </div>
          <p className="text-zinc-300 text-sm">
            Repite en voz alta estas palabras clasificadas por posición del sonido <strong>{phoneme}</strong>.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {(['inicio', 'contiene', 'inversa', 'final'] as const).map((category) => {
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

        <div className="bg-indigo-600/10 border border-indigo-500/30 rounded-3xl p-6 space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-indigo-500 uppercase tracking-widest text-xs font-bold">Juego de tablero</p>
                <h3 className="text-xl font-black text-white">Dado de frases</h3>
              </div>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={rollDice}
                  disabled={gameCompleted}
                  className={`relative inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-700 text-white shadow-xl shadow-indigo-900/40 hover:bg-indigo-600 ${gameCompleted ? 'cursor-not-allowed opacity-50' : ''}`}
                >
                  <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-1 p-3">
                    {Array.from({ length: 9 }, (_, idx) => (
                      <span
                        key={idx}
                        className={`h-2 w-2 rounded-full bg-white/20 ${diceValue && getDiceFace(diceValue).includes(idx + 1) ? 'bg-white' : ''}`}
                      />
                    ))}
                  </div>
                  <span className="relative text-lg font-black">{diceValue || '🎲'}</span>
                </button>
                <div className="text-sm text-zinc-300">
                  <p className="font-bold">Jugador</p>
                  <p>P{activePlayer + 1}</p>
                </div>
              </div>
            </div>

          <div className="relative">
            <div className="mb-4 flex flex-wrap items-center gap-3 rounded-3xl border border-indigo-500/20 bg-zinc-950 px-4 py-3 text-sm text-zinc-300">
              <span className="font-bold uppercase tracking-[0.3em] text-zinc-400">Jugadores</span>
              {Array.from({ length: Math.max(1, playerCount) }, (_, index) => {
                const colors = ['bg-indigo-600', 'bg-blue-600', 'bg-emerald-600', 'bg-orange-600', 'bg-pink-600', 'bg-violet-600'];
                const colorClass = colors[index % colors.length];
                return (
                  <div key={`player-token-${index}`} className={`flex items-center gap-2 rounded-full px-3 py-2 ${colorClass} text-white ${activePlayer === index ? 'ring-2 ring-white/50' : ''}`}>
                    <span className="inline-flex h-3 w-3 rounded-full bg-white/80" />
                    <span className="text-[11px] font-black uppercase">P{index + 1}</span>
                  </div>
                );
              })}
            </div>

            {diceValue !== null && selectedSpace !== null && boardCells[selectedSpace] && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 rounded-3xl border border-indigo-500/20 bg-zinc-950 p-5 shadow-2xl shadow-indigo-900/30"
              >
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-zinc-900 text-3xl">
                    <VisualContent content={boardCells[selectedSpace].image ?? '🎲'} alt={boardCells[selectedSpace].content} className="w-12 h-12" />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.35em] text-indigo-400">{boardCells[selectedSpace].type === 'Frase' ? 'Frase' : 'Trabalenguas'}</p>
                      <p className="text-2xl font-black text-white leading-tight mt-2">{boardCells[selectedSpace].content}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => speakTextContent(boardCells[selectedSpace].content)}
                      className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-4 py-2 text-sm font-bold text-white hover:bg-indigo-500"
                    >
                      <Volume2 className="w-4 h-4 mr-2" />
                      Escuchar
                    </button>
                  </div>
                  <p className="text-zinc-400 text-xs uppercase tracking-[0.2em]">Casilla {selectedSpace + 1}</p>
                </div>
              </motion.div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-28">
              {boardCells.map((cell, index) => {
                const playersHere = playerPositions
                  .map((pos, idx) => pos === index ? idx : -1)
                  .filter((idx) => idx !== -1);
                const isHighlighted = selectedSpace === index || currentPlayerPosition === index;

                return (
                <button
                  key={cell.id}
                  type="button"
                  onClick={() => {
                    setSelectedSpace(index);
                    setFeedback({ type: 'info', message: `Has seleccionado la casilla ${index + 1}.` });
                  }}
                  className={`relative aspect-square rounded-3xl border p-3 transition-all ${isHighlighted ? 'border-indigo-400 bg-indigo-600/20' : 'border-zinc-700 bg-zinc-900 hover:border-indigo-500 hover:bg-zinc-800'}`}
                >
                  <div className="flex h-full flex-col items-center justify-center gap-2">
                    <div className="flex h-16 w-16 flex-col items-center justify-center rounded-3xl bg-zinc-950 text-3xl">
                      <VisualContent content={cell.image ?? '🎲'} alt={cell.content} className="w-12 h-12" />
                      {playersHere.length > 0 && (
                        <div className="mt-2 flex gap-1">
                          {playersHere.map((playerIndex) => {
                            const colors = ['bg-indigo-600', 'bg-blue-600', 'bg-emerald-600', 'bg-orange-600', 'bg-pink-600', 'bg-violet-600'];
                            return (
                              <span key={playerIndex} className={`inline-flex h-3 w-3 rounded-full border-2 border-white ${colors[playerIndex % colors.length]}`} />
                            );
                          })}
                        </div>
                      )}
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400">Casilla {index + 1}</p>
                    </div>
                  </div>
                </button>
              );})}
            </div>

          </div>

          <div className="rounded-3xl border border-indigo-500/20 bg-zinc-950 p-4 text-sm text-zinc-300">
            <p className="font-bold text-white mb-2">Resultado del dado:</p>
            {diceValue ? (
              <div className="space-y-3">
                <p className="text-white">Número: {diceValue}</p>
                {selectedSpace !== null && boardCells[selectedSpace] ? (
                  <p className="text-zinc-200 font-black">{boardCells[selectedSpace].content}</p>
                ) : (
                  <p className="text-zinc-200 font-black">Selecciona la casilla para ver su frase o trabalenguas.</p>
                )}
                <button
                  type="button"
                  onClick={clearDice}
                  className="mt-3 inline-flex items-center justify-center rounded-2xl bg-zinc-800 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white hover:bg-zinc-700"
                >
                  Limpiar resultado
                </button>
              </div>
            ) : (
              <p>Tira el dado para avanzar tu ficha. Selecciona la casilla para leer su contenido.</p>
            )}
          </div>
        </div>

      </div>
      {showResults && (
        <div className="rounded-3xl border border-amber-500/20 bg-amber-950/10 p-6 space-y-5">
          <div className="space-y-3">
            <p className="text-amber-300 uppercase tracking-[0.3em] text-[11px] font-bold">Resultados finales</p>
            <p className="text-zinc-400 text-sm">Estas frases y trabalenguas no se visitaron durante el juego de tablero.</p>
          </div>
          {pendingPhraseCells.length > 0 ? (
            <div className="grid grid-cols-1 gap-3">
              {pendingPhraseCells.map((cell) => (
                <div key={cell.id} className="rounded-3xl border border-amber-500/20 bg-zinc-950 p-4 text-sm text-white">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-bold text-amber-200">Frase</p>
                      <p>{cell.content}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => speakTextContent(cell.content)}
                      className="inline-flex items-center justify-center rounded-full bg-amber-500 px-3 py-2 text-xs font-bold uppercase tracking-[0.2em] text-zinc-950 hover:bg-amber-400"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-emerald-500/20 bg-zinc-950 p-4 text-sm text-emerald-200">Todas las frases del tablero ya fueron visitadas.</div>
          )}
          {pendingTrabalenguasCells.length > 0 ? (
            <div className="grid grid-cols-1 gap-3">
              {pendingTrabalenguasCells.map((cell) => (
                <div key={cell.id} className="rounded-3xl border border-amber-500/20 bg-zinc-950 p-4 text-sm text-white">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-bold text-amber-200">Trabalenguas</p>
                      <p>{cell.content}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => speakTextContent(cell.content)}
                      className="inline-flex items-center justify-center rounded-full bg-amber-500 px-3 py-2 text-xs font-bold uppercase tracking-[0.2em] text-zinc-950 hover:bg-amber-400"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-emerald-500/20 bg-zinc-950 p-4 text-sm text-emerald-200">Todos los trabalenguas del tablero ya fueron visitados.</div>
          )}
          <div className="flex flex-col gap-3 pt-4">
            <button
              type="button"
              onClick={restartGame}
              className="w-full py-3 bg-emerald-600 text-white font-black rounded-2xl uppercase tracking-[0.2em] shadow-lg shadow-emerald-900/30"
            >
              Volver a jugar
            </button>
          </div>
        </div>
      )}
      <button 
        type="button"
        onClick={handleFinish}
        className="w-full py-4 bg-indigo-600 text-white font-black rounded-xl italic uppercase shadow-lg shadow-indigo-900/40"
      >
        {showResults ? 'Salir' : 'Terminar Práctica'}
      </button>
    </motion.div>
  );
};
