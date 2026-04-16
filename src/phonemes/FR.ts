import { PhonemeContent } from '../types';

export const FR_PHONEME_DATA: PhonemeContent = {
  name: 'Trabada FR',
  color: 'orange',
  taller: [
    { title: "¡EL SONIDO! (FR)", instruction: "Dientes en labio y lengua arriba:", sound: "F-R-F-R", tip: "¡Sopla con fuerza!", img: "https://static.arasaac.org/pictograms/2569/2569_300.png" },
    { title: "¡Aire!", instruction: "Ahora con vocales:", sound: "FRA-FRE-FRI", tip: "¡Siente el aire!", img: "https://static.arasaac.org/pictograms/2569/2569_300.png" }
  ],
  semaforoPares: [
    { w1: "FUTA", s1: "Sin R", i1: "❓", w2: "FRUTA", s2: "Con FR", i2: "🍎", target: 2 }
  ],
  semaforoRadar: [],
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
  ],
  pistaCompletar: [
    { phrase: "La fruta roja pequeña es la", word: "FRESA" },
    { phrase: "La manzana y la pera son", word: "FRUTA" },
    { phrase: "En invierno hace mucho", word: "FRÍO" },
    { phrase: "Para parar el coche uso el", word: "FRENO" },
    { phrase: "El perfume viene en un", word: "FRASCO" }
  ]
};
