import React, { useState, useEffect } from 'react';
import { PHONEME_DATA } from '../phonemes';
import { STORAGE_KEY } from '../constants';
import { World, Phoneme, GameState, PersistentData, PhonemeContent, PistaEcoItem, PistaProgress, SemaforoRadarItem } from '../types';

type FeedbackType = { type: 'success' | 'error' | 'info'; message: string };

interface AppState extends GameState {
  showTrabadas: boolean;
  playerCount: number;
  currentPlayer: number;
  playerPositions: number[];
  playerScores: number[];
  semaforoPairStep: number;
  semaforoRadarStep: number;
}

const DEFAULT_PERSISTENT_DATA: PersistentData = {
  lastPhoneme: 'R',
  linceHighScore: 0,
  trophiesCount: 0,
  completedPhonemes: [],
  userResources: [],
  customPhonemes: {}
};

export const useGameState = () => {

  const [state, setState] = useState<AppState>({
    world: 'PHONEME_SELECT',
    phoneme: 'R',
    step: 0,
    subStep: 0,
    history: [],
    showTrabadas: false,
    playerCount: 1,
    currentPlayer: 0,
    playerPositions: [0, 0, 0, 0],
    playerScores: [0, 0, 0, 0],
    semaforoPairStep: 0,
    semaforoRadarStep: 0
  });

  const [persistentData, setPersistentData] = useState<PersistentData>(DEFAULT_PERSISTENT_DATA);
  const [isLoaded, setIsLoaded] = useState(false);
  const [pistaProgress, setPistaProgress] = useState<Partial<Record<Phoneme, PistaProgress>>>({});
  const [pistaResetKey, setPistaResetKey] = useState(0);

  // Load data on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setPersistentData({
          ...DEFAULT_PERSISTENT_DATA,
          ...parsed,
          trophiesCount: 0,
          completedPhonemes: [],
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
    semaforoRadar: { title: '', items: [] },
    pistaDecir: [],
    gameImages: [],
    pistaFrases: [],
    pistaTrabalenguas: [],
    pistaCompletar: []
  } as PhonemeContent;

  const normalizeWord = (word: string) =>
    word
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();

  const shuffleArray = <T,>(items: T[]) =>
    [...items].sort(() => Math.random() - 0.5);

  const getPhonemeTargetPatterns = (phoneme: Phoneme) => {
    switch (phoneme) {
      case 'Z':
        return ['z', 'ce', 'ci'];
      case 'RR':
        return ['rr'];
      default:
        return [phoneme.toLowerCase()];
    }
  };

  const getBalancedRandomPistaEco = (items: PistaEcoItem[], phoneme: Phoneme, groupSize = 5) => {
    const patterns = getPhonemeTargetPatterns(phoneme);

    const startsWithTarget = items.filter((item) => {
      const word = normalizeWord(item.word || '');
      return patterns.some((pattern) => word.startsWith(pattern));
    });

    const containsTarget = items.filter((item) => {
      const word = normalizeWord(item.word || '');
      return !patterns.some((pattern) => word.startsWith(pattern))
        && patterns.some((pattern) => word.includes(pattern));
    });

    const noTarget = items.filter((item) => {
      const word = normalizeWord(item.word || '');
      return !patterns.some((pattern) => word.includes(pattern));
    });

    const selected = [
      ...shuffleArray(startsWithTarget).slice(0, groupSize),
      ...shuffleArray(containsTarget).slice(0, groupSize),
      ...shuffleArray(noTarget).slice(0, groupSize)
    ];

    const remaining = shuffleArray(items.filter((item) => !selected.includes(item)));
    while (selected.length < Math.min(items.length, groupSize * 3) && remaining.length > 0) {
      selected.push(remaining.shift()!);
    }

    return shuffleArray(selected);
  };

  const splitSemaforoRadarItems = (items: SemaforoRadarItem[]) => {
    const shuffled = shuffleArray(items);
    const positive = shuffled.filter((item) => item.hasTarget);
    const negative = shuffled.filter((item) => !item.hasTarget);
    const total = shuffled.length;
    const mainCount = Math.max(2, Math.floor(total / 2));
    let mainPositiveCount = Math.min(Math.ceil(mainCount / 2), positive.length);
    let mainNegativeCount = Math.min(mainCount - mainPositiveCount, negative.length);

    if (mainPositiveCount + mainNegativeCount < mainCount) {
      const remaining = mainCount - mainPositiveCount - mainNegativeCount;
      if (positive.length - mainPositiveCount >= remaining) {
        mainPositiveCount += remaining;
      } else {
        mainNegativeCount += remaining;
      }
    }

    const mainItems = shuffleArray([
      ...positive.slice(0, mainPositiveCount),
      ...negative.slice(0, mainNegativeCount)
    ]);
    const optionalItems = shuffled.filter((item) => !mainItems.includes(item));

    return {
      mainRadarItems: mainItems,
      optionalRadarItems: optionalItems
    };
  };

  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  const selectPhoneme = (phoneme: Phoneme) => {
    setState({ ...state, phoneme, world: 'SIMULATOR', step: 0, subStep: 0, semaforoPairStep: 0, semaforoRadarStep: 0 });
    setPersistentData(prev => ({ ...prev, lastPhoneme: phoneme }));
    setPistaProgress((prev) => ({
      ...prev,
      [phoneme]: {
        currentPhraseIndex: 0,
        currentPhraseAnswer: ''
      }
    }));
    setFeedback(null);
  };

  const goToWorld = (world: World) => {
    if (world === 'MENU' && state.world === 'PHONEME_SELECT') {
      setState({ ...state, world: 'PLAYER_COUNT' });
      return;
    }

    if (world === 'PISTA') {
      setPistaProgress((prev) => ({
        ...prev,
        [state.phoneme]: {
          currentPhraseIndex: 0,
          currentPhraseAnswer: ''
        }
      }));
      setPistaResetKey((prev) => prev + 1);
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

  const { mainRadarItems: semaforoRadar, optionalRadarItems: optionalSemaforoRadar } = React.useMemo(() => {
    const allRadarItems = currentData.semaforoRadar?.items || [];
    return splitSemaforoRadarItems(allRadarItems);
  }, [currentData.semaforoRadar]);

  const semaforoStep = state.subStep === 0 ? state.semaforoPairStep : state.semaforoRadarStep;

  // --- MUNDO 3: PISTA ---
  const pistaEco = React.useMemo(
    () => getBalancedRandomPistaEco(currentData.semaforoRadar?.items || [], state.phoneme),
    [currentData.semaforoRadar, state.world, state.phoneme]
  );
  const pistaDecir = currentData.pistaDecir || [];
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

  const [isWinner, setIsWinner] = useState(false);
  const [diceValue, setDiceValue] = useState<number | null>(null);

  // Memory State
  const [memoryCards, setMemoryCards] = useState<{ id: number, img: string, name?: string, flipped: boolean, matched: boolean }[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);

  // Bingo State
  const [bingoBoards, setBingoBoards] = useState<{ img: string, name?: string, marked: boolean }[][]>([]);
  const [bingoPlayerCount, setBingoPlayerCount] = useState(2);
  const [bingoCurrent, setBingoCurrent] = useState<{ img: string, name: string } | null>(null);
  const [bingoWinner, setBingoWinner] = useState<number | null>(null);

  // Lince State
  const [linceBoard, setLinceBoard] = useState<{ img: string, name: string, id: number }[]>([]);
  const [linceTarget, setLinceTarget] = useState<{ img: string, name: string } | null>(null);
  const [lincePool, setLincePool] = useState<{ img: string, name: string }[]>([]);
  const [linceScore, setLinceScore] = useState(0);

  // Domino State
  const [dominoChain, setDominoChain] = useState<{ left: string, right: string, leftName: string, rightName: string }[]>([]);
  const [dominoHands, setDominoHands] = useState<{ left: string, right: string, leftName: string, rightName: string }[][]>([]);
  const [dominoPool, setDominoPool] = useState<{ left: string, right: string, leftName: string, rightName: string }[]>([]);

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
    const selectedImages = [...gameImages].sort(() => Math.random() - 0.5).slice(0, 7);
    const allTiles: { left: string, right: string, leftName: string, rightName: string }[] = [];
    
    for (let i = 0; i < selectedImages.length; i++) {
      for (let j = i; j < selectedImages.length; j++) {
        allTiles.push({
          left: selectedImages[i].img,
          leftName: selectedImages[i].name,
          right: selectedImages[j].img,
          rightName: selectedImages[j].name,
        });
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

  const handleDominoClick = (piece: { left: string, right: string, leftName: string, rightName: string }, index: number) => {
    if (!dominoChain || dominoChain.length === 0) return;
    const lastPiece = dominoChain[dominoChain.length - 1];
    
    // Check both orientations
    let canPlay = false;
    let playedPiece = { ...piece };
    
    if (piece.left === lastPiece.right) {
      canPlay = true;
    } else if (piece.right === lastPiece.right) {
      canPlay = true;
      playedPiece = {
        left: piece.right,
        right: piece.left,
        leftName: piece.rightName,
        rightName: piece.leftName,
      };
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
    setPistaProgress({});
    setPersistentData(prev => ({
      ...prev,
      trophiesCount: 0,
      completedPhonemes: []
    }));
  };

  
  return {
    state,
    persistentData,
    feedback,
    setFeedback,
    currentData,
    semaforoStep,
    semaforoPares,
    semaforoRadar,
    optionalSemaforoRadar,
    semaforoRadarTitle: currentData.semaforoRadar?.title,
    pistaEco,
    pistaDecir,
    pistaFrases,
    pistaTrabalenguas,
    pistaCompletar,
    granPremioBoard,
    gameImages,
    diceValue,
    isWinner,
    memoryCards,
    flippedIndices,
    bingoBoards,
    bingoPlayerCount,
    bingoCurrent,
    bingoWinner,
    linceBoard,
    linceTarget,
    lincePool,
    linceScore,
    dominoChain,
    dominoHands,
    dominoPool,
    dobbleCards,
    dobbleTarget,
    selectPhoneme,
    goToWorld,
    selectPlayers,
    rollDice,
    nextTurn,
    initMemory,
    initBingo,
    initLince,
    initDomino,
    initDobble,
    handleMemoryClick,
    nextBingoBall,
    markBingo,
    checkLince,
    handleDominoClick,
    handleDobbleClick,
    drawDominoPiece,
    resetGame,
    pistaProgress,
    setPistaProgress,
    pistaResetKey,
    setPistaResetKey,
    setPersistentData,
    setState,
  };
};
