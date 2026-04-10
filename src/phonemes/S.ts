import { PhonemeContent } from '../types';

export const S_PHONEME_DATA: PhonemeContent = {
  name: 'Fonema S',
  color: 'blue',
  taller: [
    { title: "¡La Serpiente!", instruction: "Dientes juntos y deja salir el aire:", sound: "S-S-S-S", tip: "¡Como si mandaras callar!" },
    { title: "¡Globo pinchado!", instruction: "Suelta el aire muy despacio:", sound: "SSS-SSS", tip: "¡No saques la lengua!" },
    { title: "¡Siseo veloz!", instruction: "Ahora rápido como un rayo:", sound: "SA-SE-SI", tip: "¡Sonríe un poquito!" }
  ],
  semaforoPares: [
    { w1: "OSO", s1: "Con S", i1: "🐻", w2: "OCHO", s2: "Con CH", i2: "8️⃣", target: 1 },
    { w1: "CASA", s1: "Con S", i1: "🏠", w2: "CAZA", s2: "Con Z", i2: "🏹", target: 1 },
    { w1: "SOPA", s1: "Con S", i1: "🥣", w2: "COPA", s2: "Con C", i2: "🏆", target: 1 },
    { w1: "SILLA", s1: "Con S", i1: "🪑", w2: "PILLA", s2: "Con P", i2: "🏃", target: 1 },
    { w1: "PESO", s1: "Con S", i1: "⚖️", w2: "PECHO", s2: "Con CH", i2: "👕", target: 1 },
    { w1: "TASA", s1: "Con S", i1: "📈", w2: "TAZA", s2: "Con Z", i2: "☕", target: 1 }
  ],
  pistaEco: [
    { word: "Sapo", img: "🐸" }, { word: "Silla", img: "🪑" }, { word: "Sol", img: "☀️" }, { word: "Mesa", img: "🪑" },
    { word: "Sopa", img: "🥣" }, { word: "Saco", img: "🛍️" }, { word: "Sofá", img: "🛋️" }, { word: "Sirena", img: "🧜‍♀️" },
    { word: "Isla", img: "🏝️" }, { word: "Escalera", img: "🪜" }, { word: "Estrella", img: "⭐" }, { word: "Pastel", img: "🍰" }
  ],
  gameImages: [
    { img: "🐸", name: "SAPO" }, { img: "🪑", name: "SILLA" }, { img: "☀️", name: "SOL" }, { img: "🐻", name: "OSO" },
    { img: "🏠", name: "CASA" }, { img: "🥣", name: "SOPA" }, { img: "🥪", name: "SÁNDWICH" }, { img: "🧂", name: "SAL" },
    { img: "🛍️", name: "SACO" }, { img: "🛋️", name: "SOFÁ" }, { img: "🧜‍♀️", name: "SIRENA" }, { img: "🏝️", name: "ISLA" },
    { img: "🪜", name: "ESCALERA" }, { img: "⭐", name: "ESTRELLA" }, { img: "🍰", name: "PASTEL" }, { img: "🐍", name: "SERPIENTE" },
    { img: "🍉", name: "SANDÍA" }, { img: "👒", name: "SOMBRERO" }, { img: "🧤", name: "SEIS" }, { img: "🪣", name: "CESTA" },
    { img: "🪑", name: "MESA" }, { img: "👕", name: "CAMISA" }, { img: "🎒", name: "BOLSA" }, { img: "🧀", name: "QUESO" },
    { img: "🦴", name: "HUESO" }, { img: "👟", name: "TENIS" }, { img: "🚌", name: "AUTOBÚS" }, { img: "🧤", name: "GUANTES" },
    { img: "🍄", name: "SETA" }, { img: "🧼", name: "JABÓN" }
  ],
  pistaFrases: [
    "El sapo salta en la silla.",
    "El sol sale por la mañana.",
    "La mesa es de color rosa.",
    "Susi come sopa de sobre.",
    "Sara tiene seis sobres sucios."
  ],
  pistaTrabalenguas: [
    "Si la sierva que te sirve, no te sirve como sierva, de qué sirve que te sirvas de una sierva que no sirve.",
    "Sancha saca su saco seco al sol, para que el sol seque el saco seco de Sancha."
  ]
};
