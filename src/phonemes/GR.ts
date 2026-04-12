import { PhonemeContent } from '../types';

export const GR_PHONEME_DATA: PhonemeContent = {
  name: 'Trabada GR',
  color: 'orange',
  taller: [
    { title: "¡EL GRUÑIDO! (GR)", instruction: "Sonido desde la garganta y lengua arriba:", sound: "G-R-G-R", tip: "¡Como un motor potente!" },
    { title: "¡Garganta!", instruction: "Ahora con vocales:", sound: "GRA-GRE-GRI", tip: "¡Siente el sonido atrás!" }
  ],
  semaforoPares: [
    { w1: "GATO", s1: "Sin R", i1: "🐱", w2: "GRATO", s2: "Con GR", i2: "😊", target: 2 }
  ],
  pistaEco: [
    { word: "Grillo", img: "🦗" }, { word: "Grúa", img: "🏗️" }, { word: "Tigre", img: "🐯" }, { word: "Grapa", img: "📎" }
  ],
  gameImages: [
    { img: "🦗", name: "GRILLO" }, { img: "🏗️", name: "GRÚA" }, { img: "🐯", name: "TIGRE" }, { img: "📎", name: "GRAPA" },
    { img: "🗣️", name: "GRITO" }, { img: "🍇", name: "GRANADA" }, { img: "🚜", name: "GRANJA" }, { img: "🌑", name: "GRIS" }
  ],
  pistaFrases: [
    "El grillo canta alegre de noche.",
    "La grúa levanta mucho peso.",
    "El tigre es un animal salvaje."
  ],
  pistaTrabalenguas: [
    "El grillo Gregorio grita en la gruta gris.",
    "Graciela graba el grito del gran grillo."
  ],
  pistaCompletar: [
    { phrase: "El insecto que canta es el", word: "GRILLO" },
    { phrase: "Para levantar coches uso la", word: "GRÚA" },
    { phrase: "El animal con rayas naranjas es el", word: "TIGRE" },
    { phrase: "Para unir papeles uso una", word: "GRAPA" },
    { phrase: "Si me asusto doy un", word: "GRITO" }
  ]
};
