/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  Settings, 
  Flag, 
  Mic, 
  Volume2, 
  ChevronRight, 
  RotateCcw, 
  Car, 
  Gamepad2,
  AlertCircle,
  CheckCircle2,
  Library as LibraryIcon,
  BookOpen,
  FileText,
  ExternalLink,
  Zap,
  Sparkles
} from 'lucide-react';

import { World, Phoneme, GameState, PersistentData, PhonemeContent } from './types';
import { PHONEME_DATA } from './phonemes';
import { STORAGE_KEY, worlds, minigames, worldRules, resources } from './constants';

import { Taller } from './components/Taller';
import { Semaforo } from './components/Semaforo';
import { Pista } from './components/Pista';
import { GranPremio } from './components/GranPremio';
import { Library } from './components/Library';
import { Memory } from './components/Memory';
import { Bingo } from './components/Bingo';
import { Lince } from './components/Lince';
import { Domino } from './components/Domino';
import { Dobble } from './components/Dobble';
import { DataEditor } from './components/DataEditor';

const DEFAULT_PERSISTENT_DATA: PersistentData = {
  lastPhoneme: 'R',
  linceHighScore: 0,
  trophiesCount: 0,
  completedPhonemes: [],
  userResources: [],
  customPhonemes: {}
};

export default function App() {
  const [state, setState] = useState<any>({
    world: 'PHONEME_SELECT',
    phoneme: 'R',
    step: 0,
    subStep: 0,
    history: [],
    showTrabadas: false,
    playerCount: 1,
    currentPlayer: 0,
    playerPositions: [0, 0, 0, 0],
    playerScores: [0, 0, 0, 0]
  });

  const [persistentData, setPersistentData] = useState<PersistentData>(DEFAULT_PERSISTENT_DATA);
  const [isLoaded, setIsLoaded] = useState(false);
  const [editingPhoneme, setEditingPhoneme] = useState<Phoneme | null>(null);

  // Load data on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setPersistentData({
          ...DEFAULT_PERSISTENT_DATA,
          ...parsed,
          completedPhonemes: parsed.completedPhonemes || [],
          userResources: parsed.userResources || []
        });
        setState(prev => ({ ...prev, phoneme: parsed.lastPhoneme || 'R' }));
      } catch (e) {
        console.error("Error loading pilot data", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save data when it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(persistentData));
    }
  }, [persistentData, isLoaded]);

  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | 'info', message: string } | null>(null);

  const currentData = persistentData.customPhonemes?.[state.phoneme] || PHONEME_DATA[state.phoneme] || PHONEME_DATA['R'] || {
    name: '',
    color: 'zinc',
    taller: [],
    semaforoPares: [],
    pistaEco: [],
    gameImages: [],
    pistaFrases: [],
    pistaTrabalenguas: []
  };

  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  const selectPhoneme = (phoneme: Phoneme) => {
    setState({ ...state, phoneme, world: 'PLAYER_COUNT', step: 0, subStep: 0 });
    setPersistentData(prev => ({ ...prev, lastPhoneme: phoneme }));
    setFeedback(null);
  };

  const saveCustomPhoneme = (newData: PhonemeContent) => {
    if (!editingPhoneme) return;
    setPersistentData(prev => ({
      ...prev,
      customPhonemes: {
        ...(prev.customPhonemes || {}),
        [editingPhoneme]: newData
      }
    }));
    setFeedback({ type: 'success', message: `¡Contenido de ${newData.name} actualizado!` });
  };

  const goToWorld = (world: World) => {
    if (world === 'MENU' && state.world === 'PHONEME_SELECT') {
      setState({ ...state, world: 'PLAYER_COUNT' });
      return;
    }
    setState({ ...state, world, step: 0, subStep: 0 });
    setFeedback(null);
  };

  const selectPlayers = (count: number) => {
    setState({ 
      ...state, 
      world: 'MENU', 
      playerCount: count,
      currentPlayer: 0,
      playerPositions: [0, 0, 0, 0],
      playerScores: [0, 0, 0, 0]
    });
  };

  // --- MUNDO 1: TALLER ---
  const tallerSteps = currentData.taller || [];

  // --- MUNDO 2: SEMAFORO ---
  const semaforoPares = currentData.semaforoPares || [];

  const semaforoRadar = [
    ...(currentData.pistaEco || []).map(p => ({ word: p.word?.toUpperCase() || '', hasTarget: true, img: p.img })),
    { word: "MOTO", hasTarget: false, img: "🏍️" },
    { word: "BICI", hasTarget: state.phoneme === 'Z', img: "🚲" },
    { word: "PATO", hasTarget: false, img: "🦆" }
  ];

  // --- MUNDO 3: PISTA ---
  const pistaEco = currentData.pistaEco || [];
  const pistaFrases = currentData.pistaFrases || [];
  const pistaTrabalenguas = currentData.pistaTrabalenguas || [];
  const pistaCompletar = currentData.pistaCompletar || [];

  // --- MUNDO 4: GRAN PREMIO ---
  const granPremioBoard = (currentData.gameImages || []).map((img, i) => ({
    id: i + 1,
    img: img.img,
    name: img.name,
    q: `¿Cómo dices ${img.name} con mucha fuerza?`
  }));

  // --- NUEVOS JUEGOS ---
  const gameImages = currentData.gameImages || [];

  const [showRules, setShowRules] = useState(false);
  const [isWinner, setIsWinner] = useState(false);
  const [diceValue, setDiceValue] = useState<number | null>(null);

  // Memory State
  const [memoryCards, setMemoryCards] = useState<{ id: number, img: string, name: string, flipped: boolean, matched: boolean }[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);

  // Bingo State
  const [bingoBoards, setBingoBoards] = useState<{ img: string, name: string, marked: boolean }[][]>([]);
  const [bingoPlayerCount, setBingoPlayerCount] = useState(2);
  const [bingoCurrent, setBingoCurrent] = useState<{ img: string, name: string } | null>(null);
  const [bingoWinner, setBingoWinner] = useState<number | null>(null);

  // Lince State
  const [linceBoard, setLinceBoard] = useState<{ img: string, name: string, id: number }[]>([]);
  const [linceTarget, setLinceTarget] = useState<{ img: string, name: string } | null>(null);
  const [lincePool, setLincePool] = useState<{ img: string, name: string }[]>([]);
  const [linceScore, setLinceScore] = useState(0);

  // Domino State
  const [dominoChain, setDominoChain] = useState<{ left: string, right: string }[]>([]);
  const [dominoHands, setDominoHands] = useState<{ left: string, right: string }[][]>([]);
  const [dominoPool, setDominoPool] = useState<{ left: string, right: string }[]>([]);

  // Dobble State
  const [dobbleCards, setDobbleCards] = useState<{ img: string, name: string }[][]>([]);
  const [dobbleTarget, setDobbleTarget] = useState<string | null>(null);

  const rollDice = () => {
    if (!granPremioBoard || granPremioBoard.length === 0) return;
    const val = Math.floor(Math.random() * 6) + 1;
    setDiceValue(val);
    
    const newPositions = [...state.playerPositions];
    const currentPos = newPositions[state.currentPlayer];
    const next = Math.min(currentPos + val, granPremioBoard.length - 1);
    newPositions[state.currentPlayer] = next;
    
    setState({ 
      ...state, 
      playerPositions: newPositions,
      step: next 
    });

    if (next === granPremioBoard.length - 1) {
      setTimeout(() => {
        setIsWinner(true);
        setPersistentData(prev => {
          const alreadyCompleted = (prev.completedPhonemes || []).includes(state.phoneme);
          return {
            ...prev,
            trophiesCount: alreadyCompleted ? prev.trophiesCount : prev.trophiesCount + 1,
            completedPhonemes: alreadyCompleted ? (prev.completedPhonemes || []) : [...(prev.completedPhonemes || []), state.phoneme]
          };
        });
      }, 1500);
    }
  };

  const nextTurn = () => {
    const nextPlayer = (state.currentPlayer + 1) % state.playerCount;
    setState({ 
      ...state, 
      currentPlayer: nextPlayer,
      step: state.playerPositions[nextPlayer]
    });
    setDiceValue(null);
    setFeedback({ type: 'info', message: `Turno del Explorador ${nextPlayer + 1} 🎲` });
  };

  // --- GAME INITIALIZERS ---
  const initMemory = () => {
    const cards = [...gameImages.slice(0, 8), ...gameImages.slice(0, 8)]
      .sort(() => Math.random() - 0.5)
      .map((item, index) => ({ id: index, img: item.img, name: item.name, flipped: false, matched: false }));
    setMemoryCards(cards);
    setFlippedIndices([]);
  };

  const initBingo = (playerCount: number = state.playerCount) => {
    const newBoards = Array.from({ length: playerCount }).map(() => 
      [...gameImages]
        .sort(() => Math.random() - 0.5)
        .slice(0, 9)
        .map(item => ({ img: item.img, name: item.name, marked: false }))
    );
    setBingoBoards(newBoards);
    setBingoPlayerCount(playerCount);
    setBingoCurrent(null);
    setBingoWinner(null);
  };

  const initLince = () => {
    if (gameImages.length === 0) return;
    const board = [...gameImages]
      .sort(() => Math.random() - 0.5)
      .map((item, index) => ({ ...item, id: index }));
    setLinceBoard(board);
    
    const pool = [...gameImages].sort(() => Math.random() - 0.5);
    const firstTarget = pool.pop()!;
    setLincePool(pool);
    setLinceTarget(firstTarget);
    setLinceScore(0);
  };

  const initDomino = () => {
    if (gameImages.length < 2) return;
    const selectedImages = [...gameImages].sort(() => Math.random() - 0.5).slice(0, 7).map(img => img.img);
    const allTiles: { left: string, right: string }[] = [];
    
    for (let i = 0; i < selectedImages.length; i++) {
      for (let j = i; j < selectedImages.length; j++) {
        allTiles.push({ left: selectedImages[i], right: selectedImages[j] });
      }
    }
    
    if (allTiles.length === 0) return;
    const shuffled = allTiles.sort(() => Math.random() - 0.5);
    const initialPiece = shuffled.pop()!;
    setDominoChain([initialPiece]);
    
    const hands = Array.from({ length: state.playerCount }).map(() => 
      shuffled.splice(0, 5)
    );
    
    setDominoHands(hands);
    setDominoPool(shuffled);
  };

  const initDobble = () => {
    if (gameImages.length < 2) return;
    const shuffled = [...gameImages].sort(() => Math.random() - 0.5);
    const common = shuffled[0];
    if (!common) return;
    const card1 = [common, ...shuffled.slice(1, 5)].sort(() => Math.random() - 0.5);
    const card2 = [common, ...shuffled.slice(5, 9)].sort(() => Math.random() - 0.5);
    setDobbleCards([card1, card2]);
    setDobbleTarget(common.img);
  };

  useEffect(() => {
    if (state.world === 'MEMORY') initMemory();
    if (state.world === 'BINGO') initBingo();
    if (state.world === 'LINCE') initLince();
    if (state.world === 'DOMINO') initDomino();
    if (state.world === 'DOBBLE') initDobble();
  }, [state.world]);

  // --- GAME ACTIONS ---
  const handleMemoryClick = (index: number) => {
    if (flippedIndices.length === 2 || memoryCards[index].flipped || memoryCards[index].matched) return;

    const newCards = [...memoryCards];
    newCards[index].flipped = true;
    setMemoryCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (memoryCards[first].img === memoryCards[second].img) {
        setFeedback({ type: 'success', message: `¡Explorador ${state.currentPlayer + 1} encuentra pareja! 🌟` });
        
        const newScores = [...state.playerScores];
        newScores[state.currentPlayer]++;
        setState(prev => ({ ...prev, playerScores: newScores }));

        setTimeout(() => {
          const matchedCards = [...memoryCards];
          matchedCards[first].matched = true;
          matchedCards[second].matched = true;
          setMemoryCards(matchedCards);
          setFlippedIndices([]);
          if (matchedCards.every(c => c.matched)) {
            const maxScore = Math.max(...newScores);
            const winners = newScores.map((s, i) => s === maxScore ? i + 1 : -1).filter(i => i !== -1);
            setFeedback({ 
              type: 'success', 
              message: winners.length === 1 
                ? `¡Fin del juego! Gana el Explorador ${winners[0]} 🏆` 
                : `¡Empate entre Exploradores ${winners.join(' y ')}! 🤝`
            });
          }
        }, 500);
      } else {
        setFeedback({ type: 'error', message: "¡Oh no! Sigue intentándolo 🏎️" });
        setTimeout(() => {
          const resetCards = [...memoryCards];
          resetCards[first].flipped = false;
          resetCards[second].flipped = false;
          setMemoryCards(resetCards);
          setFlippedIndices([]);
          
          // Switch turn
          const nextPlayer = (state.currentPlayer + 1) % state.playerCount;
          setState(prev => ({ ...prev, currentPlayer: nextPlayer }));
          setFeedback({ type: 'info', message: `Turno del Explorador ${nextPlayer + 1} 🎲` });
        }, 1000);
      }
    }
  };

  const nextBingoBall = () => {
    if (bingoWinner) return;
    const available = gameImages.filter(img => 
      bingoBoards.some(board => board.find(b => b.img === img.img && !b.marked))
    );
    if (available.length === 0) {
      setFeedback({ type: 'info', message: "¡Ya han salido todas las imágenes! 🏁" });
      return;
    }
    const next = available[Math.floor(Math.random() * available.length)];
    setBingoCurrent(next);
    setFeedback(null);
  };

  const markBingo = (playerIndex: number, itemIndex: number) => {
    if (bingoWinner || !bingoCurrent) return;
    const board = bingoBoards[playerIndex];
    if (board[itemIndex].img !== bingoCurrent.img) {
      setFeedback({ type: 'error', message: "¡Esa no es la imagen que ha salido! ❌" });
      return;
    }
    
    if (board[itemIndex].marked) return;

    const newBoards = [...bingoBoards];
    const newBoard = [...board];
    newBoard[itemIndex].marked = true;
    newBoards[playerIndex] = newBoard;
    setBingoBoards(newBoards);

    setFeedback({ type: 'success', message: `¡Explorador ${playerIndex + 1} marca ${bingoCurrent.img}! ✅` });
    
    if (newBoard.every(b => b.marked)) {
      setBingoWinner(playerIndex + 1);
      setFeedback({ type: 'success', message: `¡BINGO! ¡El Explorador ${playerIndex + 1} ha completado el cartón! ✨🏆` });
    }
  };

  const checkLince = (item: any) => {
    const itemImg = typeof item === 'string' ? item : item?.img;
    if (itemImg === linceTarget?.img) {
      const newScores = [...state.playerScores];
      newScores[state.currentPlayer]++;
      
      const newTotalScore = newScores.reduce((a, b) => a + b, 0);
      
      if (newTotalScore > persistentData.linceHighScore) {
        setPersistentData(prev => ({ ...prev, linceHighScore: newTotalScore }));
      }

      if (lincePool.length === 0) {
        const maxScore = Math.max(...newScores);
        const winners = newScores.map((s, i) => s === maxScore ? i + 1 : -1).filter(i => i !== -1);
        setFeedback({ 
          type: 'success', 
          message: winners.length === 1 
            ? `¡INCREÍBLE! Gana el Explorador ${winners[0]} con ${maxScore} aciertos 🏆🏁` 
            : `¡Empate entre Exploradores ${winners.join(' y ')}! 🤝`
        });
        setLinceTarget(null);
      } else {
        const nextPool = [...lincePool];
        const nextTarget = nextPool.pop()!;
        setLincePool(nextPool);
        setLinceTarget(nextTarget);
        
        // Switch turn
        const nextPlayer = (state.currentPlayer + 1) % state.playerCount;
        setState(prev => ({ ...prev, playerScores: newScores, currentPlayer: nextPlayer }));
        setFeedback({ type: 'success', message: `¡Encontrado por Explorador ${state.currentPlayer + 1}! Turno del ${nextPlayer + 1} 🎯` });
      }
    } else {
      setFeedback({ type: 'error', message: "¡Ese no es! Sigue buscando 🧐" });
      // Optional: switch turn on error? Better to let them try until they find it or just switch.
      // Let's switch turn on error to make it more challenging.
      const nextPlayer = (state.currentPlayer + 1) % state.playerCount;
      setState(prev => ({ ...prev, currentPlayer: nextPlayer }));
    }
  };

  const handleDominoClick = (piece: { left: string, right: string }, index: number) => {
    if (!dominoChain || dominoChain.length === 0) return;
    const lastPiece = dominoChain[dominoChain.length - 1];
    
    // Check both orientations
    let canPlay = false;
    let playedPiece = { ...piece };
    
    if (piece.left === lastPiece.right) {
      canPlay = true;
    } else if (piece.right === lastPiece.right) {
      canPlay = true;
      playedPiece = { left: piece.right, right: piece.left };
    }

    if (canPlay) {
      setDominoChain([...dominoChain, playedPiece]);
      const newHands = [...dominoHands];
      const newHand = newHands[state.currentPlayer].filter((_, i) => i !== index);
      newHands[state.currentPlayer] = newHand;
      setDominoHands(newHands);
      
      if (newHand.length === 0) {
        setFeedback({ type: 'success', message: `¡DOMINÓ! Gana el Explorador ${state.currentPlayer + 1} 🏆🏁` });
      } else {
        setFeedback({ type: 'success', message: "¡Pieza encajada! 🧩" });
        setTimeout(nextTurn, 1000);
      }
    } else {
      setFeedback({ type: 'error', message: "¡Esa pieza no encaja! Busca una que coincida con el extremo 🧐" });
    }
  };

  const handleDobbleClick = (img: string) => {
    if (img === dobbleTarget) {
      const newScores = [...state.playerScores];
      newScores[state.currentPlayer]++;
      
      setFeedback({ type: 'success', message: `¡Explorador ${state.currentPlayer + 1} lo ha encontrado! 🌟` });
      
      setTimeout(() => {
        initDobble();
        const nextPlayer = (state.currentPlayer + 1) % state.playerCount;
        setState(prev => ({ ...prev, playerScores: newScores, currentPlayer: nextPlayer }));
        setFeedback({ type: 'info', message: `Turno del Explorador ${nextPlayer + 1} 🎲` });
      }, 1000);
    } else {
      setFeedback({ type: 'error', message: "¡Casi! Mira bien, solo hay una imagen igual en las dos cartas 🧐" });
      const nextPlayer = (state.currentPlayer + 1) % state.playerCount;
      setState(prev => ({ ...prev, currentPlayer: nextPlayer }));
    }
  };

  const drawDominoPiece = () => {
    if (dominoPool.length === 0) {
      setFeedback({ type: 'info', message: "No quedan piezas en el montón. ¡Pasa el turno! ⏭️" });
      setTimeout(nextTurn, 1500);
      return;
    }
    
    const newPool = [...dominoPool];
    const piece = newPool.pop()!;
    const newHands = [...dominoHands];
    newHands[state.currentPlayer] = [...newHands[state.currentPlayer], piece];
    
    setDominoPool(newPool);
    setDominoHands(newHands);
    setFeedback({ type: 'info', message: `Explorador ${state.currentPlayer + 1} roba una pieza 🧩` });
    setTimeout(nextTurn, 1000);
  };

  const resetGame = () => {
    setState(prev => ({ ...prev, world: 'MENU', step: 0, subStep: 0, history: [] }));
    setFeedback(null);
    setIsWinner(false);
    setDiceValue(null);
  };

  if (isWinner) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          className="space-y-8"
        >
          <div className="relative">
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="relative z-10"
            >
              <Trophy className="w-48 h-48 text-yellow-500 mx-auto drop-shadow-[0_0_30px_rgba(234,179,8,0.5)]" />
            </motion.div>
            <div className="absolute inset-0 bg-yellow-500/20 blur-3xl rounded-full" />
          </div>
          
          <div className="space-y-4">
            <h2 className="text-5xl font-black text-white italic uppercase tracking-tighter">
              ¡CAMPEÓN DEL MUNDO! 🏆
            </h2>
            <p className="text-zinc-400 text-xl max-w-md mx-auto">
              Has dominado la <span className="text-indigo-500 font-bold italic">/RR/</span> vibrante alveolar. ¡Tu voz suena perfecta!
            </p>
          </div>

          <button 
            onClick={resetGame}
            className="bg-white text-black font-black px-12 py-4 rounded-2xl text-xl uppercase italic hover:scale-105 transition-transform shadow-xl"
          >
            Volver a empezar
          </button>
        </motion.div>
      </div>
    );
  }

  const handleUpload = (resource: { title: string, date: string, data?: string }) => {
    setPersistentData(prev => ({
      ...prev,
      userResources: [resource, ...(prev.userResources || [])]
    }));
    setFeedback({ type: 'success', message: `¡Archivo "${resource.title}" subido correctamente! 📄` });
  };

  const handleDeleteUserResource = (index: number) => {
    setPersistentData(prev => ({
      ...prev,
      userResources: (prev.userResources || []).filter((_, i) => i !== index)
    }));
    setFeedback({ type: 'info', message: "Recurso eliminado." });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-indigo-500/30">
      {/* Header */}
      <header className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50 backdrop-blur-md sticky top-0 z-50">
        <div 
          className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => goToWorld('PHONEME_SELECT')}
        >
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-900/20">
            <Sparkles className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Estación ✨</h1>
            <p className="text-xs text-zinc-500 uppercase tracking-widest font-semibold">Logopedia Creativa</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {state.world !== 'PHONEME_SELECT' && state.world !== 'MENU' && (
            <button 
              onClick={() => goToWorld('MENU')}
              className="mr-2 p-2 hover:bg-zinc-800 rounded-full transition-colors text-zinc-400 hover:text-white flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
            >
              <ChevronRight className="rotate-180 w-4 h-4" />
              <span className="hidden sm:inline">Menú</span>
            </button>
          )}
          <div className="hidden md:flex items-center gap-4 mr-4 px-4 py-1 bg-zinc-800/50 rounded-full border border-zinc-700">
            <div className="flex items-center gap-1">
              <Trophy className="w-3 h-3 text-yellow-500" />
              <span className="text-[10px] font-black text-white">{persistentData.trophiesCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <AlertCircle className="w-3 h-3 text-blue-500" />
              <span className="text-[10px] font-black text-white">Record: {persistentData.linceHighScore}</span>
            </div>
          </div>
          <button 
            onClick={() => setShowRules(true)}
            className="p-2 hover:bg-zinc-800 rounded-full transition-colors text-zinc-400 hover:text-white flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
          >
            <AlertCircle className="w-5 h-5" />
            <span className="hidden sm:inline">Reglas</span>
          </button>
          <button 
            onClick={resetGame}
            className="p-2 hover:bg-zinc-800 rounded-full transition-colors text-zinc-400 hover:text-white"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Rules Modal */}
      <AnimatePresence>
        {showRules && (
          <motion.div 
            key="rules-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl max-w-md w-full space-y-6 shadow-2xl"
            >
              <div className="flex items-center gap-3 text-indigo-500">
                <AlertCircle className="w-8 h-8" />
                <h3 className="text-2xl font-black italic uppercase">Guía de Práctica</h3>
              </div>
              <p className="text-zinc-300 text-lg leading-relaxed">
                {worldRules[state.world]}
              </p>
              <button 
                onClick={() => setShowRules(false)}
                className="w-full bg-white text-black font-black py-4 rounded-xl uppercase italic"
              >
                ¡Entendido!
              </button>

              <div className="pt-6 border-t border-zinc-800">
                <button 
                  onClick={() => {
                    if (confirm("¿Seguro que quieres borrar todo tu progreso?")) {
                      localStorage.removeItem(STORAGE_KEY);
                      window.location.reload();
                    }
                  }}
                  className="text-[10px] text-zinc-600 hover:text-indigo-500 font-bold uppercase tracking-widest transition-colors w-full text-center"
                >
                  Reiniciar memoria de aprendizaje
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-2xl mx-auto p-6 pb-24">
        <AnimatePresence mode="wait">
          {feedback && (
            <motion.div 
              key="feedback-toast"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onClick={() => setFeedback(null)}
              className={`fixed top-24 left-1/2 -translate-x-1/2 z-[60] p-4 rounded-2xl shadow-2xl border-2 backdrop-blur-xl flex items-center gap-3 min-w-[300px] justify-center cursor-pointer hover:scale-105 transition-transform ${
                feedback.type === 'success' ? 'bg-green-600/20 border-green-500 text-green-400' :
                feedback.type === 'error' ? 'bg-red-600/20 border-red-500 text-red-400' :
                'bg-zinc-900/80 border-zinc-700 text-zinc-300'
              }`}
            >
              {feedback.type === 'success' && <CheckCircle2 className="w-5 h-5" />}
              {feedback.type === 'error' && <AlertCircle className="w-5 h-5" />}
              <span className="font-black italic uppercase tracking-tight">{feedback.message}</span>
              <span className="text-[10px] opacity-50 ml-2">(Toca para cerrar)</span>
            </motion.div>
          )}

          {state.world === 'PHONEME_SELECT' && (
            <motion.div 
              key="phoneme-select"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8 text-center"
            >
              <div className="space-y-4">
                <h2 className="text-5xl font-black text-white italic uppercase tracking-tighter">
                  {state.showTrabadas ? '¡Elige la trabada! ✨' : '¡Elige el sonido! 🎙️'}
                </h2>
                <p className="text-zinc-400 text-lg">
                  {state.showTrabadas ? 'Selecciona el grupo de letras para practicar.' : '¿Qué sonido vamos a practicar hoy?'}
                </p>
              </div>

              {!state.showTrabadas ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {(['R', 'S', 'Z'] as Phoneme[]).map((p) => (
                    <button
                      key={p}
                      onClick={() => selectPhoneme(p)}
                      className={`p-6 rounded-3xl border-4 transition-all hover:scale-105 flex flex-col items-center justify-center relative ${
                        p === 'R' ? 'bg-red-600/10 border-red-600 text-red-500' :
                        p === 'S' ? 'bg-blue-600/10 border-blue-600 text-blue-500' :
                        'bg-emerald-600/10 border-emerald-600 text-emerald-500'
                      }`}
                    >
                      {(persistentData.completedPhonemes || []).includes(p) && (
                        <div className="absolute -top-2 -right-2 bg-yellow-500 text-black p-1 rounded-full shadow-lg">
                          <Trophy className="w-4 h-4" />
                        </div>
                      )}
                      <span className="text-5xl font-black italic">{p}</span>
                      <p className="mt-4 font-bold uppercase tracking-widest text-[10px]">{PHONEME_DATA[p]?.name || 'Cargando...'}</p>
                    </button>
                  ))}
                  <button
                    onClick={() => setState({ ...state, showTrabadas: true })}
                    className="p-6 rounded-3xl border-4 transition-all hover:scale-105 flex flex-col items-center justify-center bg-orange-600/10 border-orange-600 text-orange-500"
                  >
                    <span className="text-5xl font-black italic">BR...</span>
                    <p className="mt-4 font-bold uppercase tracking-widest text-[10px]">Trabadas con R</p>
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {(['BR', 'PR', 'TR', 'DR', 'GR', 'CR', 'FR'] as Phoneme[]).map((p) => (
                      <button
                        key={p}
                        onClick={() => selectPhoneme(p)}
                        className="p-6 rounded-3xl border-4 transition-all hover:scale-105 flex flex-col items-center justify-center bg-orange-600/10 border-orange-600 text-orange-500 relative"
                      >
                        {(persistentData.completedPhonemes || []).includes(p) && (
                          <div className="absolute -top-2 -right-2 bg-yellow-500 text-black p-1 rounded-full shadow-lg">
                            <Trophy className="w-4 h-4" />
                          </div>
                        )}
                        <span className="text-4xl font-black italic">{p}</span>
                        <p className="mt-4 font-bold uppercase tracking-widest text-[10px]">{PHONEME_DATA[p].name}</p>
                      </button>
                    ))}
                  </div>
                  <button 
                    onClick={() => setState({ ...state, showTrabadas: false })}
                    className="text-zinc-500 hover:text-white font-bold uppercase text-xs tracking-widest flex items-center gap-2 mx-auto"
                  >
                    <ChevronRight className="rotate-180 w-4 h-4" /> Volver atrás
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {state.world === 'PLAYER_COUNT' && (
            <motion.div 
              key="world-player-count"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md mx-auto bg-zinc-900 border border-zinc-800 rounded-3xl p-8 text-center space-y-8"
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-black italic text-white uppercase">¿Cuántos exploradores?</h2>
                <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Selecciona el número de jugadores</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map(num => (
                  <button
                    key={num}
                    onClick={() => selectPlayers(num)}
                    className="aspect-square bg-zinc-800 hover:bg-indigo-600 border-2 border-zinc-700 hover:border-white rounded-2xl flex flex-col items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 group"
                  >
                    <span className="text-4xl font-black text-white group-hover:scale-110 transition-transform">{num}</span>
                    <span className="text-[10px] font-bold text-zinc-500 group-hover:text-indigo-200 uppercase tracking-widest">
                      {num === 1 ? 'Jugador' : 'Jugadores'}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {state.world === 'MENU' && (
            <motion.div 
              key="menu"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="text-center space-y-4">
                <div className="flex justify-center gap-2 mb-4">
                  <button onClick={() => goToWorld('PHONEME_SELECT')} className="px-4 py-1 bg-zinc-800 text-zinc-400 rounded-full text-xs font-bold uppercase hover:text-white transition-colors">
                    Cambiar sonido ({state.phoneme})
                  </button>
                  <button onClick={() => setState({ ...state, world: 'PLAYER_COUNT' })} className="px-4 py-1 bg-zinc-800 text-zinc-400 rounded-full text-xs font-bold uppercase hover:text-white transition-colors">
                    Jugadores ({state.playerCount})
                  </button>
                  <button 
                    onClick={() => setEditingPhoneme(state.phoneme)} 
                    className="px-4 py-1 bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 rounded-full text-xs font-bold uppercase hover:bg-indigo-600 hover:text-white transition-all flex items-center gap-2"
                  >
                    <Settings className="w-3 h-3" /> Editar Contenido
                  </button>
                </div>
                <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter">
                  ¡Hola, explorador! ✨
                </h2>
                <p className="text-zinc-400 text-lg">
                  Bienvenido a la estación de <span className={`text-${currentData.color}-500 font-bold italic uppercase`}>{currentData.name}</span>.
                  ¿A qué aventura quieres ir hoy?
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {worlds.map((w) => (
                  <button
                    key={w.id}
                    onClick={() => goToWorld(w.id as World)}
                    className="group relative p-6 bg-zinc-900 border border-zinc-800 rounded-2xl text-left hover:border-red-500/50 transition-all hover:shadow-2xl hover:shadow-red-900/10 overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      {w.icon}
                    </div>
                    <div className="relative z-10 flex flex-col gap-1">
                      <span className="text-indigo-500 font-bold text-[10px] uppercase tracking-widest">Estación</span>
                      <span className="text-2xl font-black text-white italic uppercase tracking-tighter">{w.name}</span>
                      <p className="text-zinc-500 text-xs font-medium">{w.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {state.world === 'TALLER' && (
            <Taller 
              key="world-taller"
              phoneme={state.phoneme}
              step={state.step}
              tallerSteps={tallerSteps}
              onNext={() => { setState({ ...state, step: state.step + 1 }); setFeedback(null); }}
              onFinish={() => goToWorld('MENU')}
              setFeedback={setFeedback}
            />
          )}

          {state.world === 'SEMAFORO' && (
            <Semaforo 
              key="world-semaforo"
              phoneme={state.phoneme}
              step={state.step}
              subStep={state.subStep}
              semaforoPares={semaforoPares}
              semaforoRadar={semaforoRadar}
              onSetSubStep={(ss) => setState({ ...state, subStep: ss, step: 0 })}
              onNextStep={() => {
                const pLen = (semaforoPares || []).length;
                const rLen = (semaforoRadar || []).length;
                const max = state.subStep === 0 ? pLen : rLen;
                if(state.step < max - 1) {
                  setState({ ...state, step: state.step + 1 }); 
                  setFeedback(null);
                } else {
                  goToWorld('MENU');
                }
              }}
              setFeedback={setFeedback}
            />
          )}

          {state.world === 'PISTA' && (
            <Pista 
              key="world-pista"
              pistaEco={pistaEco}
              pistaFrases={pistaFrases}
              pistaTrabalenguas={pistaTrabalenguas}
              pistaCompletar={pistaCompletar}
              onFinish={() => goToWorld('MENU')}
              setFeedback={setFeedback}
            />
          )}

          {state.world === 'GRAN_PREMIO' && (
            <GranPremio 
              key="world-gran-premio"
              step={state.step}
              diceValue={diceValue}
              granPremioBoard={granPremioBoard}
              playerCount={state.playerCount}
              currentPlayer={state.currentPlayer}
              playerPositions={state.playerPositions}
              onRollDice={rollDice}
              onNextTurn={nextTurn}
              onGoToWorld={goToWorld}
            />
          )}

          {state.world === 'MEMORY' && (
            <Memory 
              key="world-memory"
              cards={memoryCards}
              playerCount={state.playerCount}
              currentPlayer={state.currentPlayer}
              playerScores={state.playerScores}
              onFlip={handleMemoryClick}
              onReset={initMemory}
              onBack={() => goToWorld('GRAN_PREMIO')}
            />
          )}

          {state.world === 'BINGO' && (
            <Bingo 
              key="world-bingo"
              boards={bingoBoards}
              playerCount={bingoPlayerCount}
              currentBall={bingoCurrent}
              onNextBall={nextBingoBall}
              onToggle={markBingo}
              onReset={(count) => initBingo(count || bingoPlayerCount)}
              onBack={() => goToWorld('GRAN_PREMIO')}
            />
          )}

          {state.world === 'LINCE' && (
            <Lince 
              key="world-lince"
              target={linceTarget}
              images={linceBoard}
              playerCount={state.playerCount}
              currentPlayer={state.currentPlayer}
              playerScores={state.playerScores}
              highScore={persistentData.linceHighScore}
              onCheck={(item: any) => checkLince(item)}
              onReset={initLince}
              onBack={() => goToWorld('GRAN_PREMIO')}
            />
          )}

          {state.world === 'DOMINO' && (
            <Domino 
              key="world-domino"
              chain={dominoChain}
              hands={dominoHands}
              poolCount={dominoPool.length}
              playerCount={state.playerCount}
              currentPlayer={state.currentPlayer}
              onPlay={handleDominoClick}
              onDraw={drawDominoPiece}
              onReset={initDomino}
              onBack={() => goToWorld('GRAN_PREMIO')}
            />
          )}

          {state.world === 'DOBBLE' && (
            <Dobble 
              key="world-dobble"
              cards={dobbleCards}
              playerCount={state.playerCount}
              currentPlayer={state.currentPlayer}
              playerScores={state.playerScores}
              onCheck={handleDobbleClick}
              onReset={initDobble}
              onBack={() => goToWorld('GRAN_PREMIO')}
            />
          )}

          {state.world === 'LIBRARY' && (
            <Library 
              key="world-library"
              resources={resources} 
              userResources={persistentData.userResources || []}
              onUpload={handleUpload}
              onDeleteUserResource={handleDeleteUserResource}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Footer hint */}
      <footer className="fixed bottom-0 left-0 right-0 p-4 bg-zinc-950/80 backdrop-blur-md border-t border-zinc-800 text-center">
        <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-bold">
          Asistente de Logopedia • Especialista en AL
        </p>
      </footer>

      <AnimatePresence>
        {editingPhoneme && (
          <DataEditor 
            key="data-editor-modal"
            data={currentData}
            onSave={saveCustomPhoneme}
            onClose={() => setEditingPhoneme(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
