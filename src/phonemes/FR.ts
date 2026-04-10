import { PhonemeContent } from '../types';

export const FR_PHONEME_DATA: PhonemeContent = {
  name: 'Trabada FR',
  color: 'orange',
  taller: [
    { title: "¡EL SOPLIDO! (FR)", instruction: "Dientes en labio y lengua arriba:", sound: "F-R-F-R", tip: "¡Sopla con fuerza!" },
    { title: "¡Aire!", instruction: "Ahora con vocales:", sound: "FRA-FRE-FRI", tip: "¡Siente el aire!" }
  ],
  semaforoPares: [
    { w1: "FUTA", s1: "Sin R", i1: "❓", w2: "FRUTA", s2: "Con FR", i2: "🍎", target: 2 }
  ],
  pistaEco: [
    { word: "Fresa", img: "🍓" }, { word: "Fruta", img: "🍎" }, { word: "Frío", img: "🥶" }, { word: "Freno", img: "🛑" }
  ],
  gameImages: [
    { img: "🍓", name: "FRESA" }, { img: "🍎", name: "FRUTA" }, { img: "🥶", name: "FRÍO" }, { img: "🛑", name: "FRENO" },
    { img: "🌻", name: "FLOR" }, { img: "🧴", name: "FRASCO" }, { img: "🧥", name: "FRANELA" }, { img: "🍟", name: "FRITO" }
  ],
  pistaFrases: [
    "Me gusta comer fresas con nata.",
    "La fruta es muy saludable.",
    "Hace mucho frío en invierno."
  ],
  pistaTrabalenguas: [
    "Frida come fresas frescas frente a la fuente.",
    "Francisco fríe fruta fresca en la freidora."
  ]
};
