import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, ChevronRight, Sparkles } from 'lucide-react';
import { Library } from './Library';
import { Taller } from './Taller';
import { Semaforo } from './Semaforo';
import { Pista } from './Pista';
import { CompletarFrasesWorld } from './CompletarFrasesWorld';
import { GranPremio } from './GranPremio';
import { Memory } from './Memory';
import { Bingo } from './Bingo';
import { Lince } from './Lince';
import { Domino } from './Domino';
import { Dobble } from './Dobble';
import PhonemeSimulator from './PhonemeSimulator';
import { PHONEME_DATA } from '../phonemes';
import { World, Phoneme } from '../types';
import { useGameState } from '../hooks/useGameState';
import { resources, worlds } from '../constants';

interface GameRouterProps {
  game: ReturnType<typeof useGameState>;
  onUpload: (resource: { title: string, date: string, data?: string }) => void;
  onDeleteUserResource: (index: number) => void;
}

export const GameRouter: React.FC<GameRouterProps> = ({ game, onUpload, onDeleteUserResource }) => {
  const {
    state,
    persistentData,
    currentData,
    feedback,
    setFeedback,
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

  const tallerSteps = currentData.taller || [];

  return (
    <main className="max-w-2xl mx-auto p-6 pb-24">
        <AnimatePresence mode="wait">
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

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {(['R', 'RR', 'S', 'Z', 'SINFONES'] as Phoneme[]).map((p) => (
                  <button
                    key={p}
                    onClick={() => selectPhoneme(p)}
                    className={`p-6 rounded-3xl border-4 transition-all hover:scale-105 flex flex-col items-center justify-center relative ${
                      p === 'R' ? 'bg-red-600/10 border-red-600 text-red-500' :
                      p === 'RR' ? 'bg-rose-600/10 border-rose-600 text-rose-500' :
                      p === 'S' ? 'bg-blue-600/10 border-blue-600 text-blue-500' :
                      p === 'Z' ? 'bg-emerald-600/10 border-emerald-600 text-emerald-500' :
                      'bg-orange-600/10 border-orange-600 text-orange-500'
                    }`}
                  >
                    {(persistentData.completedPhonemes || []).includes(p) && (
                      <div className="absolute -top-2 -right-2 bg-yellow-500 text-black p-1 rounded-full shadow-lg">
                        <Trophy className="w-4 h-4" />
                      </div>
                    )}
                    <span className="text-5xl font-black italic">{p === 'SINFONES' ? 'BR...' : p}</span>
                    <p className="mt-4 font-bold uppercase tracking-widest text-[10px]">{PHONEME_DATA[p]?.name || 'Cargando...'}</p>
                  </button>
                ))}
              </div>
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

          {state.world === 'SIMULATOR' && (
            <motion.div
              key="world-simulator"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <PhonemeSimulator 
                phoneme={state.phoneme}
                description={currentData.simulatorDescription || "Posición básica de reposo."}
                soundText={state.phoneme === 'Z' ? 'z z z z' : state.phoneme === 'S' ? 's s s s' : state.phoneme}
                videoUrl={currentData.videoUrl}
                referenceUrl={currentData.referenceUrl}
              />
              
              <div className="flex gap-4">
                <button 
                  onClick={() => setState({ ...state, world: state.playerCount > 0 ? 'MENU' : 'PLAYER_COUNT' })}
                  className="flex-1 bg-white text-black font-black py-4 rounded-xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 uppercase italic"
                >
                  {state.playerCount > 0 ? 'Volver al menú' : 'Continuar a la aventura'} <ChevronRight className="w-5 h-5" />
                </button>
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
                  <button onClick={() => setState({ ...state, world: 'SIMULATOR' })} className="px-4 py-1 bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 rounded-full text-xs font-bold uppercase hover:bg-indigo-600/30 transition-colors">
                    Ver articulación 🎙️
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
                    className={`group relative p-6 bg-zinc-900 border border-zinc-800 rounded-2xl text-left hover:border-${currentData.color}-500/50 transition-all hover:shadow-2xl hover:shadow-${currentData.color}-900/10 overflow-hidden`}
                  >
                    <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-${currentData.color}-500`}>
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
              step={semaforoStep}
              subStep={state.subStep}
              semaforoPares={semaforoPares}
              semaforoRadar={semaforoRadar}
              optionalSemaforoRadar={optionalSemaforoRadar}
              pistaEco={pistaEco}
              semaforoRadarTitle={semaforoRadarTitle}
              onSetSubStep={(ss) => setState((prev) => ({ ...prev, subStep: ss }))}
              onNextStep={() => {
                const pLen = (semaforoPares || []).length;
                const rLen = (semaforoRadar || []).length;

                setState((prev) => {
                  if (prev.subStep === 0) {
                    if (prev.semaforoPairStep < pLen - 1) {
                      setFeedback(null);
                      return { ...prev, semaforoPairStep: prev.semaforoPairStep + 1 };
                    }

                    setFeedback(null);
                    return { ...prev, world: 'MENU', step: 0, subStep: 0 };
                  }

                  if (prev.semaforoRadarStep < rLen - 1) {
                    setFeedback(null);
                    return { ...prev, semaforoRadarStep: prev.semaforoRadarStep + 1 };
                  }

                  setFeedback(null);
                  return { ...prev, world: 'MENU', step: 0, subStep: 0 };
                });
              }}
              setFeedback={setFeedback}
            />
          )}

          {state.world === 'PISTA' && (
            <Pista 
              key={`world-pista-${pistaResetKey}`}
              phoneme={state.phoneme}
              pistaDecir={pistaDecir}
              pistaFrases={pistaFrases}
              pistaTrabalenguas={pistaTrabalenguas}
              pistaCompletar={pistaCompletar}
              gameImages={currentData.gameImages || []}
              playerCount={state.playerCount}
              pdfUrl={currentData.pdfUrl}
              onFinish={() => {
                setPersistentData(prev => {
                  const alreadyCompleted = (prev.completedPhonemes || []).includes(state.phoneme);
                  return {
                    ...prev,
                    trophiesCount: alreadyCompleted ? prev.trophiesCount : prev.trophiesCount + 1,
                    completedPhonemes: alreadyCompleted ? (prev.completedPhonemes || []) : [...(prev.completedPhonemes || []), state.phoneme]
                  };
                });
                goToWorld('MENU');
              }}
              setFeedback={setFeedback}
            />
          )}

          {state.world === 'COMPLETAR' && (
            <CompletarFrasesWorld
              key={`world-completar-${pistaResetKey}`}
              phoneme={state.phoneme}
              pistaCompletar={pistaCompletar}
              pistaProgress={pistaProgress[state.phoneme] || { currentPhraseIndex: 0, currentPhraseAnswer: '' }}
              onPistaProgressChange={(progress) => setPistaProgress(prev => ({ ...prev, [state.phoneme]: progress }))}
              feedback={feedback}
              setFeedback={setFeedback}
              onAdvance={() => goToWorld('GRAN_PREMIO')}
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
              onReset={(count?: number) => initBingo(count ?? bingoPlayerCount)}
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
              onUpload={onUpload}
              onDeleteUserResource={onDeleteUserResource}
            />
          )}
        </AnimatePresence>
    </main>
  );
};
