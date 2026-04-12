import { PhonemeContent } from '../types';

export const DR_PHONEME_DATA: PhonemeContent = {
  name: 'Trabada DR',
  color: 'orange',
  taller: [
    { title: "¡EL MOTOR! (DR)", instruction: "Golpea rápido con la punta de la lengua:", sound: "D-R-D-R", tip: "¡Siente el cosquilleo!" },
    { title: "¡Fuerza!", instruction: "Ahora con vocales:", sound: "DRA-DRE-DRI", tip: "¡Lengua fuerte!" }
  ],
  semaforoPares: [
    { w1: "DADO", s1: "Sin R", i1: "🎲", w2: "DRAGÓN", s2: "Con DR", i2: "🐉", target: 2 }
  ],
  pistaEco: [
    { word: "Dragón", img: "🐉" }, { word: "Dromedario", img: "🐪" }, { word: "Cuadro", img: "🖼️" }, { word: "Ladrillo", img: "🧱" }
  ],
  gameImages: [
    { img: "🐉", name: "DRAGÓN" }, { img: "🐪", name: "DROMEDARIO" }, { img: "🖼️", name: "CUADRO" }, { img: "🧱", name: "LADRILLO" },
    { img: "💎", name: "PIEDRA" }, { img: "🧔", name: "PADRE" }, { img: "👩", name: "MADRE" }, { img: "🐿️", name: "ALMENDRA" }
  ],
  pistaFrases: [
    "El dragón echa fuego por la boca.",
    "El dromedario camina por el desierto.",
    "El cuadro está colgado en la pared."
  ],
  pistaTrabalenguas: [
    "El dragón de la gruta grita con gran fuerza.",
    "El dromedario de Drácula duerme en el cuadro."
  ],
  pistaCompletar: [
    { phrase: "El animal que echa fuego es el", word: "DRAGÓN" },
    { phrase: "El camello de una joroba es el", word: "DROMEDARIO" },
    { phrase: "En la pared cuelgo un", word: "CUADRO" },
    { phrase: "Para construir uso un", word: "LADRILLO" },
    { phrase: "En el suelo hay una", word: "PIEDRA" }
  ]
};
