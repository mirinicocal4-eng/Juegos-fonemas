import { PhonemeContent } from '../types';

export const BR_PHONEME_DATA: PhonemeContent = {
  name: 'Trabada BR',
  color: 'orange',
  taller: [
    { title: "¡BRRRR! (BR)", instruction: "Labios juntos y lengua arriba. Di:", sound: "B-R-B-R", tip: "¡Siente la vibración en los labios!" },
    { title: "¡Vibración!", instruction: "Ahora con vocales:", sound: "BRA-BRE-BRI", tip: "¡Lengua muy arriba!" }
  ],
  semaforoPares: [
    { w1: "BAZO", s1: "Sin R", i1: "🩸", w2: "BRAZO", s2: "Con BR", i2: "🦾", target: 2 }
  ],
  pistaEco: [
    { word: "Brazo", img: "🦾" }, { word: "Bruja", img: "🧙‍♀️" }, { word: "Cebra", img: "🦓" }, { word: "Libro", img: "📚" }, { word: "Cabra", img: "🐐" }
  ],
  gameImages: [
    { img: "🦾", name: "BRAZO" }, { img: "🧙‍♀️", name: "BRUJA" }, { img: "🦓", name: "CEBRA" }, { img: "📚", name: "LIBRO" },
    { img: "🐐", name: "CABRA" }, { img: "🌟", name: "BRILLO" }, { img: "🧹", name: "BROCHA" }, { img: "🧥", name: "ABRIGO" }
  ],
  pistaFrases: [
    "Mi brazo es muy fuerte y grande.",
    "La bruja vuela en su escoba.",
    "La cebra corre por la pradera."
  ],
  pistaTrabalenguas: [
    "Brilla el brillo del brazalete de bronce.",
    "La bruja Brígida brinca por la bruma."
  ],
  pistaCompletar: [
    { phrase: "En el cuerpo tengo un", word: "BRAZO" },
    { phrase: "La que vuela en escoba es la", word: "BRUJA" },
    { phrase: "El animal con rayas es la", word: "CEBRA" },
    { phrase: "Para leer uso un", word: "LIBRO" },
    { phrase: "La que da leche en el monte es la", word: "CABRA" }
  ]
};
