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
      img: "https://static.arasaac.org/pictograms/25147/25147_300.png"
    },
    {
      title: "¡Se rompe algo!",
      instruction: "¿Cómo suena cuando algo se rompe?:",
      sound: "CRASH",
      tip: "¡Siente la explosión del sonido!",
      img: "https://static.arasaac.org/pictograms/4735/4735_300.png"
    },
    {
      title: "A conducir",
      instruction: "Arranca el motor de tu coche:",
      sound: "BRUUUM, BRUUUM",
      tip: "¡Haz vibrar los labios y la lengua a la vez!",
      img: "https://static.arasaac.org/pictograms/2712/2712_300.png"
    },
    {
      title: "El sonido de la rana",
      instruction: "Imita a la rana que salta en el estanque:",
      sound: "CROAC, CROAC",
      tip: "¡Abre bien la boca al final!",
      img: "https://static.arasaac.org/pictograms/28473/28473_300.png"
    },
    {
      title: "El rugido del tigre",
      instruction: "Saca las garras y ruge muy fuerte:",
      sound: "GGRRRAAA",
      tip: "¡Siente la fuerza en la garganta!",
      img: "https://static.arasaac.org/pictograms/2590/2590_300.png"
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
  semaforoRadarTitle: "Suena o no suena con SINFONES",
  semaforoRadar: [
    // BR
    { word: "Barco", img: "barco", hasTarget: false }, { word: "Bruto", img: "bruto", hasTarget: true }, { word: "Cabra", img: "cabra", hasTarget: true }, { word: "Bebida", img: "bebida", hasTarget: false }, { word: "Brócoli", img: "brócoli", hasTarget: true }, { word: "Fiebre", img: "fiebre", hasTarget: true }, { word: "Copa", img: "copa", hasTarget: false },
    // PR
    { word: "Premio", img: "https://static.arasaac.org/pictograms/26845/26845_300.png", hasTarget: true }, { word: "Pesado", img: "pesado", hasTarget: false }, { word: "Prisma", img: "prisma", hasTarget: true }, { word: "Capri", img: "capri", hasTarget: true }, { word: "Pirata", img: "pirata", hasTarget: false }, { word: "Apretar", img: "apretar", hasTarget: true }, { word: "Exprimir", img: "exprimir", hasTarget: true },
    // TR
    { word: "Traje", img: "Traje", hasTarget: true }, { word: "tijeras", img: "tijeras", hasTarget: false }, { word: "trébol", img: "trébol", hasTarget: true }, { word: "tejado", img: "tejado", hasTarget: false }, { word: "estrella", img: "estrella", hasTarget: true }, { word: "trozo", img: "trozo", hasTarget: true }, { word: "catre", img: "catre", hasTarget: true },
    // DR
    { word: "Madre", img: "Madre", hasTarget: true }, { word: "dromedario", img: "dromedario", hasTarget: true }, { word: "Cadera", img: "Cadera", hasTarget: false }, { word: "Abri", img: "Abri", hasTarget: false }, { word: "Padre", img: "Padre", hasTarget: true }, { word: "Piedra", img: "Piedra", hasTarget: true }, { word: "Pasta", img: "Pasta", hasTarget: false },
    // GR
    { word: "Lágrima", img: "Lágrima", hasTarget: true }, { word: "ogro", img: "ogro", hasTarget: true }, { word: "laguna", img: "laguna", hasTarget: false }, { word: "grupa", img: "grupa", hasTarget: true }, { word: "esgrima", img: "esgrima", hasTarget: true }, { word: "cangrejo", img: "cangrejo", hasTarget: true }, { word: "consejo", img: "consejo", hasTarget: false },
    // CR
    { word: "Carta", img: "Carta", hasTarget: false }, { word: "cruzada", img: "cruzada", hasTarget: true }, { word: "Alacrán", img: "Alacrán", hasTarget: true }, { word: "crujiente", img: "crujiente", hasTarget: true }, { word: "acortar", img: "acortar", hasTarget: false }, { word: "Corteza", img: "Corteza", hasTarget: false }, { word: "crema", img: "crema", hasTarget: true },
    // FR
    { word: "Fernando", img: "Fernando", hasTarget: false }, { word: "Francia", img: "Francia", hasTarget: true }, { word: "Cofre", img: "Cofre", hasTarget: true }, { word: "Sopa", img: "Sopa", hasTarget: false }, { word: "Frutería", img: "Frutería", hasTarget: true }, { word: "África", img: "África", hasTarget: true }, { word: "café", img: "café", hasTarget: false }
  ],
  pistaDecir: [
    { word: "brazo", img: "https://static.arasaac.org/pictograms/2569/2569_300.png", category: "inicio" },
    { word: "tren", img: "https://static.arasaac.org/pictograms/3559/3559_300.png", category: "inicio" },
    { word: "dragón", img: "https://static.arasaac.org/pictograms/5403/5403_300.png", category: "inicio" },
    { word: "fresa", img: "https://static.arasaac.org/pictograms/2413/2413_300.png", category: "inicio" },
    { word: "príncipe", img: "https://static.arasaac.org/pictograms/5564/5564_300.png", category: "inicio" },
    { word: "grúa", img: "https://static.arasaac.org/pictograms/2529/2529_300.png", category: "inicio" },
    { word: "cristal", img: "https://static.arasaac.org/pictograms/2372/2372_300.png", category: "inicio" },
    { word: "libro", img: "https://static.arasaac.org/pictograms/3058/3058_300.png", category: "contiene" },
    { word: "tractor", img: "https://static.arasaac.org/pictograms/2591/2591_300.png", category: "contiene" },
    { word: "cuadro", img: "https://static.arasaac.org/pictograms/2693/2693_300.png", category: "contiene" },
    { word: "fruta", img: "https://static.arasaac.org/pictograms/2414/2414_300.png", category: "contiene" },
    { word: "grillo", img: "https://static.arasaac.org/pictograms/2416/2416_300.png", category: "contiene" },
    { word: "estrella", img: "https://static.arasaac.org/pictograms/3159/3159_300.png", category: "final" },
    { word: "tigre", img: "https://static.arasaac.org/pictograms/2855/2855_300.png", category: "final" },
    { word: "cruz", img: "https://static.arasaac.org/pictograms/2373/2373_300.png", category: "final" }
  ],
  pistaEco: [
    { word: "Brazo", img: "https://static.arasaac.org/pictograms/2569/2569_300.png" },
    { word: "Tren", img: "https://static.arasaac.org/pictograms/3559/3559_300.png" },
    { word: "Dragón", img: "https://static.arasaac.org/pictograms/5403/5403_300.png" },
    { word: "Fresa", img: "https://static.arasaac.org/pictograms/2413/2413_300.png" },
    { word: "Grúa", img: "https://static.arasaac.org/pictograms/2529/2529_300.png" },
    { word: "Cristal", img: "https://static.arasaac.org/pictograms/2372/2372_300.png" },
    { word: "Príncipe", img: "https://static.arasaac.org/pictograms/5564/5564_300.png" },
    { word: "Libro", img: "https://static.arasaac.org/pictograms/3058/3058_300.png" },
    { word: "Tractor", img: "https://static.arasaac.org/pictograms/2591/2591_300.png" },
    { word: "Cuadro", img: "https://static.arasaac.org/pictograms/2693/2693_300.png" },
    { word: "Fruta", img: "https://static.arasaac.org/pictograms/2414/2414_300.png" },
    { word: "Grillo", img: "https://static.arasaac.org/pictograms/2416/2416_300.png" }
  ],
  gameImages: [
    { img: "https://static.arasaac.org/pictograms/2569/2569_300.png", name: "BRAZO" }, { img: "https://static.arasaac.org/pictograms/3559/3559_300.png", name: "TREN" }, { img: "https://static.arasaac.org/pictograms/5403/5403_300.png", name: "DRAGÓN" }, { img: "https://static.arasaac.org/pictograms/2413/2413_300.png", name: "FRESA" },
    { img: "https://static.arasaac.org/pictograms/2529/2529_300.png", name: "GRÚA" }, { img: "https://static.arasaac.org/pictograms/2372/2372_300.png", name: "CRISTAL" }, { img: "https://static.arasaac.org/pictograms/5564/5564_300.png", name: "PRÍNCIPE" }, { img: "https://static.arasaac.org/pictograms/3058/3058_300.png", name: "LIBRO" },
    { img: "https://static.arasaac.org/pictograms/2591/2591_300.png", name: "TRACTOR" }, { img: "https://static.arasaac.org/pictograms/2693/2693_300.png", name: "CUADRO" }, { img: "https://static.arasaac.org/pictograms/2414/2414_300.png", name: "FRUTA" }, { img: "https://static.arasaac.org/pictograms/2416/2416_300.png", name: "GRILLO" }
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
