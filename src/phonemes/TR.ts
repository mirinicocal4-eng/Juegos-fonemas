import { PhonemeContent } from '../types';

export const TR_PHONEME_DATA: PhonemeContent = {
  name: 'Trabada TR',
  color: 'orange',
  taller: [
    { title: "¡EL TREN! (TR)", instruction: "Golpea rápido con la punta de la lengua:", sound: "T-R-T-R", tip: "¡Muy cortito y veloz!", img: "https://static.arasaac.org/pictograms/2569/2569_300.png" },
    { title: "¡Velocidad!", instruction: "Ahora con vocales:", sound: "TRA-TRE-TRI", tip: "¡Punta de la lengua arriba!", img: "https://static.arasaac.org/pictograms/2569/2569_300.png" }
  ],
  semaforoPares: [
    { w1: "TONO", s1: "Sin R", i1: "🎵", w2: "TRONO", s2: "Con TR", i2: "👑", target: 2 }
  ],
  semaforoRadar: [],
  pistaEco: [
    { word: "Tren", img: "🚂" }, { word: "Tractor", img: "🚜" }, { word: "Trigo", img: "🍞" }, { word: "Trompeta", img: "🎺" }
  ],
  gameImages: [
    { img: "🚂", name: "TREN" }, { img: "🚜", name: "TRACTOR" }, { img: "🍞", name: "TRIGO" }, { img: "🎺", name: "TROMPETA" },
    { img: "🚲", name: "TRICICLO" }, { img: "🪄", name: "TRUCO" }, { img: "🐯", name: "TIGRE" }, { img: "🌟", name: "ESTRELLA" }
  ],
  pistaFrases: [
    "El tren va muy rápido por la vía.",
    "El tractor trabaja en el campo.",
    "Toco la trompeta muy bien."
  ],
  pistaTrabalenguas: [
    "Tres tristes tigres comen trigo en un trigal.",
    "El tren de Tristán trae trastos tras la vía."
  ],
  pistaCompletar: [
    { phrase: "El transporte que va por vías es el", word: "TREN" },
    { phrase: "En el campo trabaja el", word: "TRACTOR" },
    { phrase: "El pan se hace con", word: "TRIGO" },
    { phrase: "El instrumento que suena fuerte es la", word: "TROMPETA" },
    { phrase: "La bici de tres ruedas es el", word: "TRICICLO" }
  ]
};
