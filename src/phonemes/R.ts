import { PhonemeContent } from '../types';

export const R_PHONEME_DATA: PhonemeContent = {
  name: 'Fonema R/RR',
  color: 'indigo',
  taller: [
    { title: "¡Calentando la voz!", instruction: "Pon la lengua arriba y repite:", sound: "T-R-T-R", tip: "¡Lengua arriba!", img: "https://static.arasaac.org/pictograms/2569/2569_300.png" },
    { title: "¡Más fuerza!", instruction: "Ahora con energía, lengua arriba:", sound: "D-R-D-R", tip: "¡Siente el cosquilleo!", img: "https://static.arasaac.org/pictograms/2569/2569_300.png" },
    { title: "¡Vibración final!", instruction: "¡Lanzamos el sonido! Di con fuerza:", sound: "RRRRRR", tip: "¡Siente la vibración en la punta!", img: "https://static.arasaac.org/pictograms/2569/2569_300.png" }
  ],
  semaforoPares: [
    { w1: "PERA", s1: "R suave", i1: "🍐", w2: "PERRA", s2: "R fuerte", i2: "🐕", target: 2 },
    { w1: "CORO", s1: "R suave", i1: "🎶", w2: "CORRO", s2: "R fuerte", i2: "🏃", target: 2 },
    { w1: "CARO", s1: "R suave", i1: "💰", w2: "CARRO", s2: "R fuerte", i2: "🛒", target: 2 },
    { w1: "VARA", s1: "R suave", i1: "🦯", w2: "BARRA", s2: "R fuerte", i2: "🥖", target: 2 },
    { w1: "CERO", s1: "R suave", i1: "0️⃣", w2: "CERRO", s2: "R fuerte", i2: "⛰️", target: 2 },
    { w1: "MIRA", s1: "R suave", i1: "👀", w2: "MIRRA", s2: "R fuerte", i2: "🏺", target: 2 }
  ],
  semaforoRadar: [],
  pistaEco: [
    { word: "Rana", img: "🐸" }, { word: "Rosa", img: "🌹" }, { word: "Jarra", img: "🏺" }, { word: "Perro", img: "🐶" },
    { word: "Torre", img: "🏰" }, { word: "Gorra", img: "🧢" }, { word: "Rueda", img: "🛞" }, { word: "Radio", img: "📻" },
    { word: "Río", img: "🏞️" }, { word: "Zorro", img: "🦊" }, { word: "Rayo", img: "⚡" }, { word: "Ropa", img: "👕" }
  ],
  gameImages: [
    { img: "🐭", name: "RATÓN" }, { img: "🦊", name: "ZORRO" }, { img: "🐶", name: "PERRO" }, { img: "🏰", name: "TORRE" },
    { img: "🏺", name: "JARRA" }, { img: "🏎️", name: "CARRO" }, { img: "🥖", name: "BARRA" }, { img: "🎸", name: "GUITARRA" },
    { img: "⏰", name: "RELOJ" }, { img: "🫏", name: "BURRO" }, { img: "🍚", name: "ARROZ" }, { img: "🌍", name: "TIERRA" },
    { img: "🪚", name: "SIERRA" }, { img: "🛒", name: "CARRETA" }, { img: "🛢️", name: "BARRIL" }, { img: "🏃", name: "CORRER" },
    { img: "⛓️", name: "HIERRO" }, { img: "📁", name: "FORRO" }, { img: "🧱", name: "BARRO" }, { img: "⛰️", name: "CERRO" },
    { img: "🐾", name: "GARRA" }, { img: "🍇", name: "PARRA" }, { img: "🌿", name: "RAMA" }, { img: "🌹", name: "ROSA" },
    { img: "🛞", name: "RUEDA" }, { img: "🎁", name: "REGALO" }, { img: "📻", name: "RADIO" }, { img: "⚡", name: "RAYO" },
    { img: "👕", name: "ROPA" }, { img: "🏞️", name: "RÍO" }
  ],
  pistaFrases: [
    "La rana salta en el río.",
    "El perro corre por el cerro.",
    "La jarra tiene agua rica.",
    "Mi gorra es de color rojo.",
    "El carro hace mucho ruido.",
    "Ramón tiene un regalo rosa."
  ],
  pistaTrabalenguas: [
    "Erre con erre guitarra, erre con erre carril, rápido ruedan las ruedas, las ruedas del ferrocarril.",
    "La rana Ramona ríe y ríe, mientras corre por el río con su gorra roja.",
    "El perro de San Roque no tiene rabo porque Ramón Rodríguez se lo ha robado."
  ],
  pistaCompletar: [
    { phrase: "El animal que salta en el charco es la", word: "RANA" },
    { phrase: "Para saber la hora miro el", word: "RELOJ" },
    { phrase: "El coche también se llama", word: "CARRO" },
    { phrase: "La flor que tiene espinas es la", word: "ROSA" },
    { phrase: "El pirata busca el", word: "TESORO" }
  ]
};
