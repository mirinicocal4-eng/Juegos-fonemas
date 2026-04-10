import { PhonemeContent } from '../types';

export const CR_PHONEME_DATA: PhonemeContent = {
  name: 'Trabada CR',
  color: 'orange',
  taller: [
    { title: "¡EL CRUJIDO! (CR)", instruction: "Sonido seco y lengua arriba:", sound: "C-R-C-R", tip: "¡Como si algo se rompiera!" },
    { title: "¡Seco!", instruction: "Ahora con vocales:", sound: "CRA-CRE-CRI", tip: "¡Punta arriba!" }
  ],
  semaforoPares: [
    { w1: "COCO", s1: "Sin R", i1: "🥥", w2: "CROMO", s2: "Con CR", i2: "🃏", target: 2 }
  ],
  pistaEco: [
    { word: "Cromo", img: "🃏" }, { word: "Cristal", img: "💎" }, { word: "Crema", img: "🧴" }, { word: "Cruz", img: "✝️" }
  ],
  gameImages: [
    { img: "🃏", name: "CROMO" }, { img: "💎", name: "CRISTAL" }, { img: "🧴", name: "CREMA" }, { img: "✝️", name: "CRUZ" },
    { img: "🖍️", name: "CRAYÓN" }, { img: "💀", name: "CRÁNEO" }, { img: "🥐", name: "CRUASÁN" }, { img: "🍳", name: "CRISTIAN" }
  ],
  pistaFrases: [
    "Cristina tiene un cromo de un coche.",
    "El cristal de la ventana está limpio.",
    "Me pongo crema en las manos."
  ],
  pistaTrabalenguas: [
    "Cristina cree que el cristal de la cruz es de color crema.",
    "El cromo de Cristian cruje en el cristal."
  ]
};
