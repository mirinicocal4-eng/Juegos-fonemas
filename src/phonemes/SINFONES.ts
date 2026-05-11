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
    { w1: "GRANO", s1: "Con GR", i1_img: "grano", w2: "GANO", s2: "Sin R", i2_img: "ganar", target: 1 },
    { w1: "PESO", s1: "Sin R", i1_img: "peso", w2: "PRESO", s2: "Con PR", i2_img: "preso", target: 2 },
    { w1: "VAGA", s1: "Sin R", i1_img: "perezoso", w2: "BRAGA", s2: "Con BR", i2_img: "braga", target: 2 },
    { w1: "CABRA", s1: "Con  CR", i1_img: "cabra", w2: "CAVA", s2: "Sin R", i2_img: "cavar", target: 1 },
    { w1: "CROMO", s1: "Con CR", i1_img: "cromo", w2: "LOMO", s2: "Sin R", i2_img: "lomo", target: 1 },
    { w1: "TRONCA", s1: "Con TR", i1_img: "tronco", w2: "BRONCA", s2: "Sin TR", i2_img: "pelea", target: 1 },
    { w1: "PIEDRA", s1: "Con DR", i1_img: "piedra", w2: "PIEZA", s2: "Sin DR", i2_img: "pieza", target: 1 },
    { w1: "OJO ", s1: "Sin GR", i1_img: "ojo", w2: "OGRO", s2: "Con GR", i2_img: "ogro", target: 2 }
  ],
  semaforoRadar: {
    title: "Suena o no suena con SINFONES",
    items: [
      // BR
      { word: "Barco", img: "barco", hasTarget: false }, { word: "Bruma", img: "niebla", hasTarget: true }, { word: "Cabra", img: "cabra", hasTarget: true }, { word: "Bebida", img: "bebida", hasTarget: false }, { word: "Brócoli", img: "brócoli", hasTarget: true }, { word: "Fiebre", img: "fiebre", hasTarget: true }, { word: "Copa", img: "copa", hasTarget: false },
      // PR
      { word: "Premio", img: "premio", hasTarget: true }, { word: "Pesado", img: "pesado", hasTarget: false }, { word: "Prisma", img: "prisma", hasTarget: true }, { word: "Capri", img: "capri", hasTarget: true }, { word: "Pirata", img: "pirata", hasTarget: false }, { word: "Apretar", img: "apretar", hasTarget: true }, { word: "Exprimir", img: "exprimir", hasTarget: true },
      // TR
      { word: "Traje", img: "Traje de vestir", hasTarget: true }, { word: "Tijeras", img: "tijeras", hasTarget: false }, { word: "Trébol", img: "trébol", hasTarget: true }, { word: "Tejado", img: "tejado", hasTarget: false }, { word: "Estrella", img: "estrella", hasTarget: true }, { word: "Trozo", img: "trozo", hasTarget: true }, { word: "Catre", img: "catre", hasTarget: true },
      // DR
      { word: "Madre", img: "Madre", hasTarget: true }, { word: "Dromedario", img: "dromedario", hasTarget: true }, { word: "Cadera", img: "Cadera", hasTarget: false }, { word: "Abril", img: "Abril", hasTarget: false }, { word: "Padre", img: "Padre", hasTarget: true }, { word: "Piedra", img: "Piedra", hasTarget: true }, { word: "Pasta", img: "Pasta", hasTarget: false },
      // GR
      { word: "Lágrima", img: "Lágrima", hasTarget: true }, { word: "Ogro", img: "ogro", hasTarget: true }, { word: "Laguna", img: "laguna", hasTarget: false }, { word: "Grupa", img: "grupa", hasTarget: true }, { word: "Esgrima", img: "esgrima", hasTarget: true }, { word: "Cangrejo", img: "cangrejo", hasTarget: true }, { word: "Consejo", img: "consejo", hasTarget: false },
      // CR
      { word: "Carta", img: "Carta", hasTarget: false }, { word: "Cruzada", img: "cruzada", hasTarget: true }, { word: "Alacrán", img: "alacrán", hasTarget: true }, { word: "Crujiente", img: "crujiente", hasTarget: true }, { word: "Acortar", img: "acortar", hasTarget: false }, { word: "Corteza", img: "corteza", hasTarget: false }, { word: "Crema", img: "crema", hasTarget: true },
      // FR
      { word: "portal", img: "portal", hasTarget: false }, { word: "Francia", img: "Francia", hasTarget: true }, { word: "Cofre", img: "Cofre", hasTarget: true }, { word: "Sopa", img: "Sopa", hasTarget: false }, { word: "Frutería", img: "Frutería", hasTarget: true }, { word: "África", img: "África", hasTarget: true }, { word: "Café", img: "café", hasTarget: false }
    ]
  },
  pistaDecir: [
    // BR
    { word: "Brazo", img: "brazo", category: "inicio" },
    { word: "Cebra", img: "cebra", category: "contiene" },
    { word: "Broche", img: "broche", category: "inicio" },
    { word: "Libro", img: "libro", category: "contiene" },
    { word: "Bruja", img: "bruja", category: "inicio" },
    { word: "Brújula", img: "brújula", category: "inicio" },
    { word: "Brea", img: "petróleo", category: "inicio" },
    { word: "Sobre", img: "sobre", category: "contiene" },
    { word: "Brillante", img: "brillante", category: "inicio" },
    { word: "Abrigo", img: "abrigo", category: "contiene" },
    // PR
    { word: "Prado", img: "prado", category: "inicio" },
    { word: "Compra", img: "compra", category: "contiene" },
    { word: "Profesora", img: "profesora", category: "inicio" },
    { word: "Aprobar", img: "aprobar", category: "contiene" },
    { word: "Prueba", img: "prueba", category: "inicio" },
    { word: "Impresora", img: "impresora", category: "contiene" },
    { word: "Premio", img: "premio", category: "inicio" },
    { word: "Sorpresa", img: "sorpresa", category: "contiene" },
    { word: "Princesa", img: "princesa", category: "inicio" },
    { word: "Exprimidor", img: "exprimidor", category: "contiene" },
    // TR
    { word: "Traje", img: "traje", category: "inicio" },
    { word: "Retrato", img: "retrato", category: "contiene" },
    { word: "Trompa", img: "trompa", category: "inicio" },
    { word: "Potro", img: "potro", category: "contiene" },
    { word: "Trueno", img: "trueno", category: "inicio" },
    { word: "Ogro", img: "ogro", category: "contiene" },
    { word: "Tren", img: "tren", category: "inicio" },
    { word: "Estrella", img: "estrella", category: "contiene" },
    { word: "Tripa", img: "tripa", category: "inicio" },
    { word: "Rastrillo", img: "rastrillo", category: "contiene" },
    // DR
    { word: "Dragón", img: "dragón", category: "inicio" },
    { word: "Almendra", img: "almendra", category: "contiene" },
    { word: "Cuadro", img: "cuadro", category: "contiene" },
    { word: "Ladrón", img: "ladrón", category: "contiene" },
    { word: "Druida", img: "druida", category: "inicio" },
    { word: "Madrugar", img: "madrugar", category: "contiene" },
    { word: "Ajedrez", img: "ajedrez", category: "contiene" },
    { word: "Edredón", img: "edredón", category: "contiene" },
    { word: "Ladrillo", img: "ladrillo", category: "contiene" },
    { word: "Cocodrilo", img: "cocodrilo", category: "contiene" },
    // GR
    { word: "Granja", img: "granja", category: "inicio" },
    { word: "Bolígrafo", img: "bolígrafo", category: "contiene" },
    { word: "Negro", img: "negro", category: "contiene" },
    { word: "Ogro", img: "ogro", category: "contiene" },
    { word: "Grúa", img: "grúa", category: "inicio" },
    { word: "Grupo", img: "grupo", category: "inicio" },
    { word: "Sangre", img: "sangre", category: "contiene" },
    { word: "Tigre", img: "tigre", category: "contiene" },
    { word: "Grifo", img: "grifo", category: "inicio" },
    { word: "Lágrima", img: "lágrima", category: "contiene" },
    // CR
    { word: "Cráter", img: "cráter", category: "inicio" },
    { word: "Alacrán", img: "alacrán", category: "contiene" },
    { word: "Croqueta", img: "croqueta", category: "inicio" },
    { word: "Micrófono", img: "micrófono", category: "contiene" },
    { word: "Cruz", img: "cruz", category: "inicio" },
    { word: "Crucero", img: "crucero", category: "inicio" },
    { word: "Cremallera", img: "cremallera", category: "inicio" },
    { word: "Secreto", img: "secreto", category: "contiene" },
    { word: "Cristal", img: "cristal", category: "inicio" },
    { word: "Escribir", img: "escribir", category: "contiene" },
    // FR
    { word: "Frasco", img: "frasco", category: "inicio" },
    { word: "Disfraz", img: "disfraz", category: "contiene" },
    { word: "Frotar", img: "frotar", category: "inicio" },
    { word: "Frontón", img: "fronton", category: "inicio" },
    { word: "Fruta", img: "fruta", category: "inicio" },
    { word: "Fruteria", img: "frutería", category: "inicio" },
    { word: "Fregona", img: "fregona", category: "inicio" },
    { word: "Cofre", img: "cofre", category: "contiene" },
    { word: "África", img: "áfrica", category: "contiene" },
    { word: "Frigorífico", img: "frigorífico", category: "inicio" }
  ],
  gameImages: [
    // BR
    { img: "brazo", name: "BRAZO" }, { img: "bruja", name: "BRUJA" }, { img: "libro", name: "LIBRO" }, { img: "abrigo", name: "ABRIGO" },
    // PR
    { img: "prado", name: "PRADO" }, { img: "premio", name: "PREMIO" }, { img: "princesa", name: "PRINCESA" }, { img: "impresora", name: "IMPRESORA" },
    // TR
    { img: "traje", name: "TRAJE" }, { img: "tren", name: "TREN" }, { img: "estrella", name: "ESTRELLA" }, { img: "trompa", name: "TROMPA" },
    // DR
    { img: "dragón", name: "DRAGÓN" }, { img: "cuadro", name: "CUADRO" }, { img: "ladrillo", name: "LADRILLO" }, { img: "cocodrilo", name: "COCODRILO" },
    // GR
    { img: "granja", name: "GRANJA" }, { img: "grúa", name: "GRÚA" }, { img: "tigre", name: "TIGRE" }, { img: "grifo", name: "GRIFO" },
    // CR
    { img: "cristal", name: "CRISTAL" }, { img: "cruz", name: "CRUZ" }, { img: "cremallera", name: "CREMALLERA" }, { img: "micrófono", name: "MICRÓFONO" },
    // FR
    { img: "fruta", name: "FRUTA" }, { img: "fresa", name: "FRESA" }, { img: "cofre", name: "COFRE" }, { img: "frasco", name: "FRASCO" },
    { img: "disfraz", name: "DISFRAZ" }, { img: "fregona", name: "FREGONA" }
  ],
  pistaFrases: [
    "Tú sombrero es gris.",
    "El ladrón entró en la fábrica.",
    "Hay cabras en la granja.",
    "Mi madre es frutera",
    "Juan viaja con sus padres a África.",
    "A Carmen le gustan las fresas",
    "El dragón triunfó en la pelea",
    "Me gusta comer fresas y mucha fruta.",
    "A mi primo le gustan las croquetas.",
    "Necesito un taladro para colgar un cuadro",
    "Ayer le preparé una sorpresa a mi padre",
    "Andrés construyó la casa con ladrillos",
    "Mi hermano toca la trompeta desde los cinco años",
    "En la orilla de la playa hay un cangrejo",
    "La abuela prepara una tarta con fresas.",
    "El carpintero necesitó un taladro para arreglar la estantería.",
    "La bruja vive en una cabaña en el bosque",
    "La grúa levanta un cristal muy grande."
  ],
  pistaTrabalenguas: [
    "Cristina crea croquetas crocantes con cremas, ¡qué creativa es Cristina creando!",
    "Gracia grita con gracia mientras graba a los grandes grillos grises en el granero.",
    "Francisco fríe frutas frescas frente al fresno, mientras frota su frente con frío."
  ],
  pistaCompletar: [
    { phrase: "Para lavarse las manos hay que abrir el...", word: "GRIFO" },
    { phrase: "La ventana está hecha de...", word: "CRISTAL" },
    { phrase: "Lo contrario de alegre es...", word: "TRISTE" },
    { phrase: "Despúes del dos va el númer...", word: "TRES" },
    { phrase: "Una fruta pequeña y roja con motitas negras es la... ", word: "FRESA" },
    { phrase: "El señor que trabaja en la granja es el ...", word: "GRANJERO" },
    { phrase: "El vehículo que sirve para arar el campo es el...", word: "TRACTOR" },
    { phrase: "Lo contrario de calor es ", word: "FRIO" },
    { phrase: "Cuando ganamos un concurso nos dan un...", word: "PREMIO" },
    { phrase: "Para grapar las hojas utilizamos la...", word: "GRAPADORA" },
  ],
  simulatorDescription: "Los sinfones son grupos de dos consonantes seguidas (como BR, PR, TR). La clave es la transición rápida. Se recomienda usar la técnica de la 'vocal puente': articular por separado y luego unir aumentando la velocidad (ej: P-a-R-a -> PARA -> PRA).",
  videoUrl: "https://www.youtube.com/watch?v=E2tdB3kvNZ8",
  referenceUrl: "https://soundsofspeech.uiowa.edu/spanish/details"
};
