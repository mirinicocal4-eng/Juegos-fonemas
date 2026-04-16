export type World = 'PHONEME_SELECT' | 'PLAYER_COUNT' | 'MENU' | 'TALLER' | 'SEMAFORO' | 'PISTA' | 'GRAN_PREMIO' | 'MEMORY' | 'BINGO' | 'LINCE' | 'DOMINO' | 'DOBBLE' | 'LIBRARY';
export type Phoneme = 'R' | 'S' | 'Z' | 'BR' | 'PR' | 'TR' | 'DR' | 'GR' | 'CR' | 'FR';

export interface TallerStep {
  title: string;
  instruction: string;
  sound: string;
  tip: string;
  img?: string;
}

export interface SemaforoPair {
  w1: string;
  s1: string;
  i1?: string;
  i1_img?: string;
  w2: string;
  s2: string;
  i2?: string;
  i2_img?: string;
  target: number;
}

export interface PistaEcoItem {
  word: string;
  img?: string;
  subtitle?: string;
  hasTarget?: boolean;
}

export interface PistaDecirItem {
  word: string;
  img?: string;
  category: 'inicio' | 'contiene' | 'final' | 'inversa';
  subtitle?: string;
}

export interface SemaforoRadarItem {
  word: string;
  img?: string;
  hasTarget: boolean;
}

export interface GameImage {
  img: string;
  name: string;
}

export interface PhonemeContent {
  name: string;
  color: string;
  pistaEcoTitle?: string;
  taller: TallerStep[];
  semaforoPares: SemaforoPair[];
  semaforoRadar?: SemaforoRadarItem[];
  pistaEco: PistaEcoItem[];
  pistaDecir?: PistaDecirItem[];
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
