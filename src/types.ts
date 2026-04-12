export type World = 'PHONEME_SELECT' | 'MENU' | 'TALLER' | 'SEMAFORO' | 'PISTA' | 'GRAN_PREMIO' | 'MEMORY' | 'BINGO' | 'LINCE' | 'DOMINO' | 'DOBBLE' | 'LIBRARY';
export type Phoneme = 'R' | 'S' | 'Z' | 'BR' | 'PR' | 'TR' | 'DR' | 'GR' | 'CR' | 'FR';

export interface TallerStep {
  title: string;
  instruction: string;
  sound: string;
  tip: string;
}

export interface SemaforoPair {
  w1: string;
  s1: string;
  i1: string;
  w2: string;
  s2: string;
  i2: string;
  target: number;
}

export interface PistaEcoItem {
  word: string;
  img: string;
}

export interface GameImage {
  img: string;
  name: string;
}

export interface PhonemeContent {
  name: string;
  color: string;
  taller: TallerStep[];
  semaforoPares: SemaforoPair[];
  pistaEco: PistaEcoItem[];
  gameImages: GameImage[];
  pistaFrases: string[];
  pistaTrabalenguas: string[];
  pistaCompletar: { phrase: string; word: string }[];
}

export interface GameState {
  world: World;
  phoneme: Phoneme;
  step: number;
  subStep: number;
  history: string[];
}

export interface UserResource {
  title: string;
  date: string;
  data?: string; // Data URL for the file content
}

export interface PersistentData {
  lastPhoneme: Phoneme;
  linceHighScore: number;
  trophiesCount: number;
  completedPhonemes: Phoneme[];
  userResources: UserResource[];
  customPhonemes?: Partial<Record<Phoneme, PhonemeContent>>;
}
