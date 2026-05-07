/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  RotateCcw, 
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

import { World, Phoneme } from './types';
import { STORAGE_KEY, worldRules } from './constants';

import { useGameState } from './hooks/useGameState';
import { GameRouter } from './components/GameRouter';

export default function App() {
  const game = useGameState();
  const {
    state,
    persistentData,
    feedback,
    setFeedback,
    currentData,
    semaforoStep,
    semaforoPares,
    semaforoRadar,
    optionalSemaforoRadar,
    semaforoRadarTitle,
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
    pistaProgress,
    setPistaProgress,
    pistaResetKey,
    setPistaResetKey,
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
    setState,
    setPersistentData
  } = game;

  const [showRules, setShowRules] = useState(false);

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
              ¡CAMPEÓN DE {currentData.name}! 🏆
            </h2>
            <p className="text-zinc-400 text-xl max-w-md mx-auto">
              Has dominado el sonido <span className={`text-${currentData.color}-500 font-bold italic`}>/{state.phoneme}/</span>. ¡Tu voz suena perfecta!
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
        <AnimatePresence>
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
        </AnimatePresence>

        <GameRouter
          game={game}
          onUpload={handleUpload}
          onDeleteUserResource={handleDeleteUserResource}
        />

      </main>

      {/* Footer hint */}
      <footer className="fixed bottom-0 left-0 right-0 p-4 bg-zinc-950/80 backdrop-blur-md border-t border-zinc-800 text-center">
        <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-bold">
          Asistente de Logopedia • Especialista en AL
        </p>
      </footer>

    </div>
  );
}
