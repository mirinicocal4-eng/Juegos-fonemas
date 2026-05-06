import { PhonemeContent } from '../types';

export const SINFONES_PHONEME_DATA: PhonemeContent = {
  name: 'Sinfones con R',
  color: 'orange',
  taller: [
    {
      title: "El canto del grillo",
      instruction: "Repite el sonido del grillo moviendo la lengua rápido:",
      sound: "CRI, CRI",
      tip: "¡Punta de la lengua arriba!",
      img: "grillo"
    },
    {
      title: "¡Se rompe algo!",
      instruction: "¿Cómo suena cuando algo se rompe?:",
      sound: "CRASH",
      tip: "¡Siente la explosión del sonido!",
      img: "romper"
    },
    {
      title: "A conducir",
      instruction: "Arranca el motor de tu coche:",
      sound: "BRUUUM, BRUUUM",
      tip: "¡Haz vibrar los labios y la lengua a la vez!",
      img: "coche"
    },
    {
      title: "El sonido de la rana",
      instruction: "Imita a la rana que salta en el estanque:",
      sound: "CROAC, CROAC",
      tip: "¡Abre bien la boca al final!",
      img: "rana"
    },
    {
      title: "El rugido del tigre",
      instruction: "Saca las garras y ruge muy fuerte:",
      sound: "GGRRRAAA",
      tip: "¡Siente la fuerza en la garganta!",
      img: "tigre"
    }
  ],
  semaforoPares: [
    { w1: "BAZO", s1: "Sin R", i1: "🩸", w2: "BRAZO", s2: "Con BR", i2: "🦾", target: 2 },
    { w1: "PISA", s1: "Sin R", i1: "👣", w2: "PRISA", s2: "Con PR", i2: "🏃‍♂️", target: 2 },
    { w1: "TONO", s1: "Sin R", i1: "🎵", w2: "TRONO", s2: "Con TR", i2: "👑", target: 2 },
    { w1: "DADO", s1: "Sin R", i1: "🎲", w2: "DRAGÓN", s2: "Con DR", i2: "🐉", target: 2 },
    { w1: "GATO", s1: "Sin R", i1: "🐱", w2: "GRATO", s2: "Con GR", i2: "😊", target: 2 },
    { w1: "COCO", s1: "Sin R", i1: "🥥", w2: "CROMO", s2: "Con CR", i2: "🃏", target: 2 },
    { w1: "FUTA", s1: "Sin R", i1: "❓", w2: "FRUTA", s2: "Con FR", i2: "🍎", target: 2 }
  ],
  semaforoRadar: {
    title: "Suena o no suena con SINFONES",
    items: [
      // BR
      { word: "Barco", img: "barco", hasTarget: false }, { word: "Bruto", img: "bruto", hasTarget: true }, { word: "Cabra", img: "cabra", hasTarget: true }, { word: "Bebida", img: "bebida", hasTarget: false }, { word: "Brócoli", img: "brócoli", hasTarget: true }, { word: "Fiebre", img: "fiebre", hasTarget: true }, { word: "Copa", img: "copa", hasTarget: false },
      // PR
      { word: "Premio", img: "premio", hasTarget: true }, { word: "Pesado", img: "pesado", hasTarget: false }, { word: "Prisma", img: "prisma", hasTarget: true }, { word: "Capri", img: "capri", hasTarget: true }, { word: "Pirata", img: "pirata", hasTarget: false }, { word: "Apretar", img: "apretar", hasTarget: true }, { word: "Exprimir", img: "exprimir", hasTarget: true },
      // TR
      { word: "Traje", img: "Traje", hasTarget: true }, { word: "Tijeras", img: "tijeras", hasTarget: false }, { word: "Trébol", img: "trébol", hasTarget: true }, { word: "Tejado", img: "tejado", hasTarget: false }, { word: "Estrella", img: "estrella", hasTarget: true }, { word: "Trozo", img: "trozo", hasTarget: true }, { word: "Catre", img: "catre", hasTarget: true },
      // DR
      { word: "Madre", img: "Madre", hasTarget: true }, { word: "Dromedario", img: "dromedario", hasTarget: true }, { word: "Cadera", img: "Cadera", hasTarget: false }, { word: "Abril", img: "Abril", hasTarget: false }, { word: "Padre", img: "Padre", hasTarget: true }, { word: "Piedra", img: "Piedra", hasTarget: true }, { word: "Pasta", img: "Pasta", hasTarget: false },
      // GR
      { word: "Lágrima", img: "Lágrima", hasTarget: true }, { word: "Ogro", img: "ogro", hasTarget: true }, { word: "Laguna", img: "laguna", hasTarget: false }, { word: "Grupa", img: "grupa", hasTarget: true }, { word: "Esgrima", img: "esgrima", hasTarget: true }, { word: "Cangrejo", img: "cangrejo", hasTarget: true }, { word: "Consejo", img: "consejo", hasTarget: false },
      // CR
      { word: "Carta", img: "Carta", hasTarget: false }, { word: "Cruzada", img: "cruzada", hasTarget: true }, { word: "Alacrán", img: "alacrán", hasTarget: true }, { word: "Crujiente", img: "crujiente", hasTarget: true }, { word: "Acortar", img: "acortar", hasTarget: false }, { word: "Corteza", img: "corteza", hasTarget: false }, { word: "Crema", img: "crema", hasTarget: true },
      // FR
      { word: "Fernando", img: "Fernando", hasTarget: false }, { word: "Francia", img: "Francia", hasTarget: true }, { word: "Cofre", img: "Cofre", hasTarget: true }, { word: "Sopa", img: "Sopa", hasTarget: false }, { word: "Frutería", img: "Frutería", hasTarget: true }, { word: "África", img: "África", hasTarget: true }, { word: "Café", img: "café", hasTarget: false }
    ]
  },
  pistaDecir: [
    { word: "Príncipe", img: "PRÍNCIPE", category: "contiene" },
    { word: "Libro", img: "LIBRO", category: "contiene" },
    { word: "Tractor", img: "TRACTOR", category: "contiene" },
    { word: "Cuadro", img: "CUADRO", category: "contiene" },
    { word: "Fruta", img: "FRUTA", category: "contiene" },
    { word: "Grillo", img: "GRILLO", category: "contiene" }
  ],
  gameImages: [
    { img: "BRAZO", name: "BRAZO" }, { img: "TREN", name: "TREN" }, { img: "DRAGÓN", name: "DRAGÓN" }, { img: "FRESA", name: "FRESA" },
    { img: "GRÚA", name: "GRÚA" }, { img: "CRISTAL", name: "CRISTAL" }, { img: "PRÍNCIPE", name: "PRÍNCIPE" }, { img: "LIBRO", name: "LIBRO" },
    { img: "TRACTOR", name: "TRACTOR" }, { img: "CUADRO", name: "CUADRO" }, { img: "FRUTA", name: "FRUTA" }, { img: "GRILLO", name: "GRILLO" }
  ],
  pistaFrases: [
    "El príncipe tiene un brazo muy fuerte.",
    "El tren va por la vía con mucha prisa.",
    "El dragón echa fuego sobre el prado.",
    "Me gusta comer fresas y mucha fruta.",
    "La grúa levanta un cristal muy grande."
  ],
  pistaTrabalenguas: [
    "Tres tristes tigres comen trigo en un trigal.",
    "El príncipe de Prusia tiene mucha prisa por el prado.",
    "Brilla el brillo del brazalete de bronce de Cristina."
  ],
  pistaCompletar: [
    { phrase: "El hijo del rey es el", word: "PRÍNCIPE" },
    { phrase: "El transporte que va por vías es el", word: "TREN" },
    { phrase: "El animal que echa fuego es el", word: "DRAGÓN" },
    { phrase: "La fruta roja pequeña es la", word: "FRESA" },
    { phrase: "Para levantar cosas pesadas uso la", word: "GRÚA" },
    { phrase: "En la pared cuelgo un", word: "CUADRO" },
    { phrase: "Para leer uso un", word: "LIBRO" },
    { phrase: "La ventana es de", word: "CRISTAL" },
    { phrase: "En el campo trabaja el", word: "TRACTOR" },
    { phrase: "La manzana y la pera son", word: "FRUTA" }
  ]
};
