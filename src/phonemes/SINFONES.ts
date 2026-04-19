import { PhonemeContent } from '../types';

// -----------------------------------------------------------------------------
// Trabada BR
// -----------------------------------------------------------------------------
export const BR_PHONEME_DATA: PhonemeContent = {
  name: 'Trabada BR',
  color: 'orange',
  taller: [
    { title: "¡BRRRR! (BR)", instruction: "Junta los labios y empieza con B, luego deja sonar la R:", sound: "B-R-B-R", tip: "¡Siente la vibración en los labios!", img: "https://static.arasaac.org/pictograms/2569/2569_300.png" },
    { title: "¡Puente de palabras!", instruction: "Repite estas sílabas:", sound: "BRA-BRE-BRI-BRO-BRU", tip: "¡Mantén la boca relajada!", img: "https://static.arasaac.org/pictograms/2569/2569_300.png" },
    { title: "¡En palabras!", instruction: "Di estas palabras con fuerza:", sound: "BRAZO-BRUJA-BRILLO", tip: "¡No pierdas la R!", img: "https://static.arasaac.org/pictograms/2569/2569_300.png" }
  ],
  semaforoPares: [
    { w1: "BAZO", s1: "Sin R", i1: "🩸", w2: "BRAZO", s2: "Con BR", i2: "🦾", target: 2 },
    { w1: "BOTA", s1: "Sin R", i1: "🥾", w2: "BROTA", s2: "Con BR", i2: "💧", target: 2 },
    { w1: "CAZA", s1: "Sin BR", i1: "🏹", w2: "CABRA", s2: "Con BR", i2: "🐐", target: 2 },
    { w1: "LIMO", s1: "Sin BR", i1: "🪱", w2: "LIBRO", s2: "Con BR", i2: "📚", target: 2 },
    { w1: "RISA", s1: "Sin BR", i1: "😄", w2: "BRISA", s2: "Con BR", i2: "🌬️", target: 2 },
    { w1: "MOLA", s1: "Sin BR", i1: "🌙", w2: "MORBA", s2: "Con BR", i2: "❓", target: 1 }
  ],
  semaforoRadar: [],
  pistaDecir: [
    { word: "brazo", img: "🦾", category: "inicio" },
    { word: "bruja", img: "🧙‍♀️", category: "inicio" },
    { word: "brillo", img: "✨", category: "inicio" },
    { word: "brócoli", img: "🥦", category: "inicio" },
    { word: "broma", img: "😂", category: "inicio" },
    { word: "cabra", img: "🐐", category: "contiene" },
    { word: "libro", img: "📚", category: "contiene" },
    { word: "abrigo", img: "🧥", category: "contiene" },
    { word: "brisa", img: "🌬️", category: "contiene" },
    { word: "broche", img: "📎", category: "contiene" },
    { word: "bronce", img: "🥈", category: "final" },
    { word: "arroz", img: "🍚", category: "final" },
    { word: "luz", img: "💡", category: "final" },
    { word: "voz", img: "🗣️", category: "final" },
    { word: "gas", img: "💨", category: "final" }
  ],
  pistaEco: [
    { word: "Brazo", img: "🦾" }, { word: "Bruja", img: "🧙‍♀️" }, { word: "Brillo", img: "✨" }, { word: "Brócoli", img: "🥦" },
    { word: "Cabra", img: "🐐" }, { word: "Brocha", img: "🧹" }, { word: "Libro", img: "📚" }, { word: "Abrigo", img: "🧥" },
    { word: "Tierra", img: "🌍" }, { word: "Broche", img: "📎" }, { word: "Brisa", img: "🌬️" }, { word: "Bronce", img: "🥈" }
  ],
  gameImages: [
    { img: "🦾", name: "BRAZO" }, { img: "🧙‍♀️", name: "BRUJA" }, { img: "✨", name: "BRILLO" }, { img: "🥦", name: "BRÓCOLI" },
    { img: "🐐", name: "CABRA" }, { img: "🧹", name: "BROCHA" }, { img: "📚", name: "LIBRO" }, { img: "🧥", name: "ABRIGO" },
    { img: "🌬️", name: "BRISA" }, { img: "📎", name: "BROCHE" }, { img: "🥈", name: "BRONCE" }, { img: "🌍", name: "TIERRA" }
  ],
  pistaFrases: [
    "Mi brazo es muy fuerte y grande.",
    "La bruja vuela en su escoba por la bruma.",
    "El brillo del broche se ve en el sol.",
    "La brocha pinta la pared de azul.",
    "La cabra salta cerca del árbol."
  ],
  pistaTrabalenguas: [
    "Brilla el brillo del brazalete de bronce.",
    "La bruja Brígida brinca por la bruma.",
    "En el barrio brotó un brote brillante."
  ],
  pistaCompletar: [
    { phrase: "Por la mañana me pongo el", word: "ABRIGO" },
    { phrase: "El animal con cuernos y barba es la", word: "CABRA" },
    { phrase: "Con una brocha pinto la", word: "PARED" },
    { phrase: "El niño levanta el", word: "BRAZO" },
    { phrase: "El metal amarillo se llama", word: "BRONCE" },
    { phrase: "La mujer mágica es una", word: "BRUJA" },
    { phrase: "En el jardín hay una", word: "BRISA" },
    { phrase: "El broche sujeta la", word: "CAMISA" },
    { phrase: "La estrella tiene mucho", word: "BRILLO" },
    { phrase: "Para leer uso un", word: "LIBRO" }
  ]
};

// -----------------------------------------------------------------------------
// Trabada PR
// -----------------------------------------------------------------------------
export const PR_PHONEME_DATA: PhonemeContent = {
  name: 'Trabada PR',
  color: 'orange',
  taller: [
    { title: "¡EXPLOSIÓN! (PR)", instruction: "Sopla fuerte con la lengua arriba:", sound: "P-R-P-R", tip: "¡Como un petardo suave!", img: "https://static.arasaac.org/pictograms/2569/2569_300.png" },
    { title: "¡Potencia!", instruction: "Ahora con vocales:", sound: "PRA-PRE-PRI-PRO-PRU", tip: "¡Suelta el aire!", img: "https://static.arasaac.org/pictograms/2569/2569_300.png" },
    { title: "¡Palabras PR!", instruction: "Repite despacio:", sound: "PREMIO-PRISA-PRADO", tip: "¡Empieza con P y deja sonar R!", img: "https://static.arasaac.org/pictograms/2569/2569_300.png" }
  ],
  semaforoPares: [
    { w1: "PISA", s1: "Sin R", i1: "👣", w2: "PRISA", s2: "Con PR", i2: "🏃‍♂️", target: 2 },
    { w1: "PERA", s1: "Sin PR", i1: "🍐", w2: "PRERA", s2: "Con PR", i2: "❓", target: 1 },
    { w1: "PESO", s1: "Sin PR", i1: "🏋️", w2: "PRESO", s2: "Con PR", i2: "🔒", target: 2 },
    { w1: "PANA", s1: "Sin PR", i1: "🧵", w2: "PRANA", s2: "Con PR", i2: "🧘", target: 2 },
    { w1: "PANA", s1: "Sin PR", i1: "🧵", w2: "PRISA", s2: "Con PR", i2: "🏃", target: 2 },
    { w1: "PATA", s1: "Sin PR", i1: "🐾", w2: "PRATA", s2: "Con PR", i2: "❓", target: 1 }
  ],
  semaforoRadar: [],
  pistaDecir: [
    { word: "premio", img: "🎁", category: "inicio" },
    { word: "príncipe", img: "🤴", category: "inicio" },
    { word: "prado", img: "🌿", category: "inicio" },
    { word: "prisa", img: "🏃‍♂️", category: "inicio" },
    { word: "princesa", img: "👸", category: "inicio" },
    { word: "prueba", img: "🧪", category: "contiene" },
    { word: "precio", img: "💰", category: "contiene" },
    { word: "profesor", img: "👨‍🏫", category: "contiene" },
    { word: "prenda", img: "🧤", category: "contiene" },
    { word: "proa", img: "🚤", category: "contiene" },
    { word: "pródigo", img: "🌟", category: "final" },
    { word: "aprender", img: "📚", category: "final" },
    { word: "imprimir", img: "🖨️", category: "final" },
    { word: "asistir", img: "👀", category: "final" },
    { word: "prioridad", img: "⭐", category: "final" }
  ],
  pistaEco: [
    { word: "Premio", img: "🎁" }, { word: "Príncipe", img: "🤴" }, { word: "Prado", img: "🌿" }, { word: "Prisa", img: "🏃‍♂️" },
    { word: "Princesa", img: "👸" }, { word: "Prueba", img: "🧪" }, { word: "Primero", img: "📏" }, { word: "Prenda", img: "🧤" },
    { word: "Proa", img: "🚤" }, { word: "Precio", img: "💰" }, { word: "Profesor", img: "👨‍🏫" }, { word: "Prodigio", img: "🌟" }
  ],
  gameImages: [
    { img: "🎁", name: "PREMIO" }, { img: "🤴", name: "PRÍNCIPE" }, { img: "🌿", name: "PRADO" }, { img: "🏃‍♂️", name: "PRISA" },
    { img: "👸", name: "PRINCESA" }, { img: "🧪", name: "PRUEBA" }, { img: "📏", name: "PRIMERO" }, { img: "🧤", name: "PRENDA" },
    { img: "🚤", name: "PROA" }, { img: "💰", name: "PRECIO" }, { img: "👨‍🏫", name: "PROFESOR" }, { img: "🌟", name: "PRODIGIO" }
  ],
  pistaFrases: [
    "El príncipe tiene un premio.",
    "Tengo mucha prisa por llegar.",
    "El prado está muy verde.",
    "La princesa lleva una prenda nueva.",
    "La prueba fue muy difícil." 
  ],
  pistaTrabalenguas: [
    "El príncipe de Prusia tiene mucha prisa por el prado.",
    "Primero pregunta el precio del premio precioso.",
    "Priscila practica piano pronto para la prueba."
  ],
  pistaCompletar: [
    { phrase: "Si gano el concurso me dan un", word: "PREMIO" },
    { phrase: "El hijo del rey es el", word: "PRÍNCIPE" },
    { phrase: "El campo verde es el", word: "PRADO" },
    { phrase: "Si llego tarde tengo mucha", word: "PRISA" },
    { phrase: "La hija del rey es la", word: "PRINCESA" },
    { phrase: "Para la escuela compré un", word: "PROFESOR" },
    { phrase: "La prenda que uso para el frío es la", word: "CHAQUETA" },
    { phrase: "El precio del juguete es muy", word: "ALTO" },
    { phrase: "Voy primero porque llego", word: "TEMPRANO" },
    { phrase: "Para comprobar necesito una", word: "PRUEBA" }
  ]
};

// -----------------------------------------------------------------------------
// Trabada TR
// -----------------------------------------------------------------------------
export const TR_PHONEME_DATA: PhonemeContent = {
  name: 'Trabada TR',
  color: 'orange',
  taller: [
    { title: "¡EL TREN! (TR)", instruction: "Golpea rápido con la punta de la lengua:", sound: "T-R-T-R", tip: "¡Muy cortito y veloz!", img: "https://static.arasaac.org/pictograms/2569/2569_300.png" },
    { title: "¡Velocidad!", instruction: "Ahora con vocales:", sound: "TRA-TRE-TRI-TRO-TRU", tip: "¡Punta de la lengua arriba!", img: "https://static.arasaac.org/pictograms/2569/2569_300.png" },
    { title: "¡En palabras!", instruction: "Di estas palabras:", sound: "TREN-TRACTOR-TROMPETA", tip: "¡No dejes caer la R!", img: "https://static.arasaac.org/pictograms/2569/2569_300.png" }
  ],
  semaforoPares: [
    { w1: "TONO", s1: "Sin R", i1: "🎵", w2: "TRONO", s2: "Con TR", i2: "👑", target: 2 },
    { w1: "TEMA", s1: "Sin R", i1: "📘", w2: "TREMA", s2: "Con TR", i2: "🎧", target: 2 },
    { w1: "TAPA", s1: "Sin R", i1: "🍲", w2: "TRAPA", s2: "Con TR", i2: "🪤", target: 2 },
    { w1: "TURNO", s1: "Sin TR", i1: "🔄", w2: "TRUENO", s2: "Con TR", i2: "⚡", target: 2 },
    { w1: "TODO", s1: "Sin R", i1: "✅", w2: "TRODO", s2: "Con TR", i2: "❓", target: 1 },
    { w1: "TEMA", s1: "Sin R", i1: "📘", w2: "TRAMA", s2: "Con TR", i2: "📖", target: 2 }
  ],
  semaforoRadar: [],
  pistaDecir: [
    { word: "tren", img: "🚂", category: "inicio" },
    { word: "tractor", img: "🚜", category: "inicio" },
    { word: "trigo", img: "🍞", category: "inicio" },
    { word: "trompeta", img: "🎺", category: "inicio" },
    { word: "triciclo", img: "🚲", category: "inicio" },
    { word: "truco", img: "🪄", category: "contiene" },
    { word: "tigre", img: "🐯", category: "contiene" },
    { word: "trenza", img: "👧", category: "contiene" },
    { word: "tropa", img: "🪖", category: "contiene" },
    { word: "trucha", img: "🐟", category: "contiene" },
    { word: "estrella", img: "🌟", category: "final" },
    { word: "caminar", img: "🚶", category: "final" },
    { word: "transportar", img: "🚚", category: "final" },
    { word: "centro", img: "📍", category: "final" },
    { word: "atrevido", img: "😎", category: "final" }
  ],
  pistaEco: [
    { word: "Tren", img: "🚂" }, { word: "Tractor", img: "🚜" }, { word: "Trigo", img: "🍞" }, { word: "Trompeta", img: "🎺" },
    { word: "Triciclo", img: "🚲" }, { word: "Truco", img: "🪄" }, { word: "Tigre", img: "🐯" }, { word: "Estrella", img: "🌟" },
    { word: "Trenza", img: "👧" }, { word: "Tropa", img: "🪖" }, { word: "Trucha", img: "🐟" }, { word: "Trampa", img: "🪤" }
  ],
  gameImages: [
    { img: "🚂", name: "TREN" }, { img: "🚜", name: "TRACTOR" }, { img: "🍞", name: "TRIGO" }, { img: "🎺", name: "TROMPETA" },
    { img: "🚲", name: "TRICICLO" }, { img: "🪄", name: "TRUCO" }, { img: "🐯", name: "TIGRE" }, { img: "🌟", name: "ESTRELLA" },
    { img: "👧", name: "TRENZA" }, { img: "🪖", name: "TROPA" }, { img: "🐟", name: "TRUCHA" }, { img: "🪤", name: "TRAMPA" }
  ],
  pistaFrases: [
    "El tren va muy rápido por la vía.",
    "El tractor trabaja en el campo.",
    "Toco la trompeta muy bien.",
    "Mi triciclo tiene tres ruedas.",
    "El tigre descansa en la selva."
  ],
  pistaTrabalenguas: [
    "Tres tristes tigres comen trigo en un trigal.",
    "El tren de Tristán trae trastos tras la vía.",
    "Trina trajo tres trompetas tristes."
  ],
  pistaCompletar: [
    { phrase: "El transporte que va por vías es el", word: "TREN" },
    { phrase: "En el campo trabaja el", word: "TRACTOR" },
    { phrase: "El pan se hace con", word: "TRIGO" },
    { phrase: "El instrumento que suena fuerte es la", word: "TROMPETA" },
    { phrase: "La bici de tres ruedas es el", word: "TRICICLO" },
    { phrase: "La chica lleva una", word: "TRENZA" },
    { phrase: "En la selva vive un", word: "TIGRE" },
    { phrase: "Para pescar uso una", word: "TRUCHA" },
    { phrase: "El barco se detiene en la", word: "TRAMPA" },
    { phrase: "El soldado está en la", word: "TROPA" }
  ]
};

// -----------------------------------------------------------------------------
// Trabada DR
// -----------------------------------------------------------------------------
export const DR_PHONEME_DATA: PhonemeContent = {
  name: 'Trabada DR',
  color: 'orange',
  taller: [
    { title: "¡EL SONIDO! (DR)", instruction: "Golpea rápido con la punta de la lengua:", sound: "D-R-D-R", tip: "¡Siente el cosquilleo!", img: "https://static.arasaac.org/pictograms/2569/2569_300.png" },
    { title: "¡Fuerza!", instruction: "Ahora con vocales:", sound: "DRA-DRE-DRI-DRO-DRU", tip: "¡Lengua fuerte!", img: "https://static.arasaac.org/pictograms/2569/2569_300.png" },
    { title: "¡Palabras DR!", instruction: "Repite estas palabras:", sound: "DRAGÓN-DROMEDARIO-DROGA", tip: "¡Mantén la R en el segundo lugar!", img: "https://static.arasaac.org/pictograms/2569/2569_300.png" }
  ],
  semaforoPares: [
    { w1: "DADO", s1: "Sin R", i1: "🎲", w2: "DRAGÓN", s2: "Con DR", i2: "🐉", target: 2 },
    { w1: "DAMA", s1: "Sin R", i1: "👸", w2: "DRAMA", s2: "Con DR", i2: "🎭", target: 2 },
    { w1: "DATO", s1: "Sin R", i1: "📊", w2: "DRATO", s2: "Con DR", i2: "❓", target: 1 },
    { w1: "DURO", s1: "Sin DR", i1: "💪", w2: "DRUO", s2: "Con DR", i2: "❓", target: 1 },
    { w1: "DUNA", s1: "Sin R", i1: "🏜️", w2: "DRUNA", s2: "Con DR", i2: "❓", target: 1 },
    { w1: "DOCE", s1: "Sin DR", i1: "1️⃣2️⃣", w2: "DROCE", s2: "Con DR", i2: "❓", target: 1 }
  ],
  semaforoRadar: [],
  pistaDecir: [
    { word: "dragón", img: "🐉", category: "inicio" },
    { word: "dromedario", img: "🐪", category: "inicio" },
    { word: "cuadro", img: "🖼️", category: "inicio" },
    { word: "ladrillo", img: "🧱", category: "inicio" },
    { word: "droga", img: "💊", category: "inicio" },
    { word: "dramático", img: "🎭", category: "contiene" },
    { word: "adrián", img: "👦", category: "contiene" },
    { word: "solar", img: "☀️", category: "contiene" },
    { word: "adrenalina", img: "⚡", category: "contiene" },
    { word: "drones", img: "🛸", category: "contiene" },
    { word: "drama", img: "🎭", category: "final" },
    { word: "directo", img: "🎥", category: "final" },
    { word: "droguería", img: "🏪", category: "final" },
    { word: "dragón", img: "🐉", category: "final" },
    { word: "adrián", img: "👦", category: "final" }
  ],
  pistaEco: [
    { word: "Dragón", img: "🐉" }, { word: "Dromedario", img: "🐪" }, { word: "Cuadro", img: "🖼️" }, { word: "Ladrillo", img: "🧱" },
    { word: "Dramático", img: "🎭" }, { word: "Droga", img: "💊" }, { word: "Adrián", img: "👦" }, { word: "Adrenalina", img: "⚡" },
    { word: "Drecto", img: "↗️" }, { word: "Dramatizar", img: "🎬" }, { word: "Drones", img: "🛸" }, { word: "Draga", img: "🚢" }
  ],
  gameImages: [
    { img: "🐉", name: "DRAGÓN" }, { img: "🐪", name: "DROMEDARIO" }, { img: "🖼️", name: "CUADRO" }, { img: "🧱", name: "LADRILLO" },
    { img: "🎭", name: "DRAMA" }, { img: "💊", name: "DROGA" }, { img: "⚡", name: "ADRENALINA" }, { img: "🛸", name: "DRONES" },
    { img: "🚢", name: "DRAGA" }, { img: "👦", name: "ADRIÁN" }, { img: "🎬", name: "DRAMATIZAR" }, { img: "↗️", name: "DRECTO" }
  ],
  pistaFrases: [
    "El dragón echa fuego por la boca.",
    "El dromedario camina por el desierto.",
    "El cuadro está colgado en la pared.",
    "La película fue muy dramática.",
    "El ladrillo es rojo y pesado."
  ],
  pistaTrabalenguas: [
    "El dragón de la gruta grita con gran fuerza.",
    "El dromedario de Drácula duerme en el cuadro.",
    "Dramáticos druidas drenan el dragón dorado."
  ],
  pistaCompletar: [
    { phrase: "El animal que echa fuego es el", word: "DRAGÓN" },
    { phrase: "El camello de una joroba es el", word: "DROMEDARIO" },
    { phrase: "En la pared cuelgo un", word: "CUADRO" },
    { phrase: "Para construir uso un", word: "LADRILLO" },
    { phrase: "La obra en el teatro es un", word: "DRAMA" },
    { phrase: "El aparato volador se llama", word: "DRON" },
    { phrase: "Adrián juega con su", word: "DRAGÓN" },
    { phrase: "La máquina que limpia el río es la", word: "DRAGA" },
    { phrase: "La estrella fugaz es muy", word: "DRAMÁTICA" },
    { phrase: "La sangre corre con", word: "ADRENALINA" }
  ]
};

// -----------------------------------------------------------------------------
// Trabada GR
// -----------------------------------------------------------------------------
export const GR_PHONEME_DATA: PhonemeContent = {
  name: 'Trabada GR',
  color: 'orange',
  taller: [
    { title: "¡EL GRUÑIDO! (GR)", instruction: "Sonido desde la garganta y lengua arriba:", sound: "G-R-G-R", tip: "¡Con mucha energía!", img: "https://static.arasaac.org/pictograms/2569/2569_300.png" },
    { title: "¡Garganta!", instruction: "Ahora con vocales:", sound: "GRA-GRE-GRI-GRO-GRU", tip: "¡Siente el sonido atrás!", img: "https://static.arasaac.org/pictograms/2569/2569_300.png" },
    { title: "¡Palabras GR!", instruction: "Repite estas palabras:", sound: "GRILLO-GRÚA-GRITO", tip: "¡Mantén la R atrás!", img: "https://static.arasaac.org/pictograms/2569/2569_300.png" }
  ],
  semaforoPares: [
    { w1: "GATO", s1: "Sin R", i1: "🐱", w2: "GRATO", s2: "Con GR", i2: "😊", target: 2 },
    { w1: "GATA", s1: "Sin R", i1: "🐈", w2: "GRATA", s2: "Con GR", i2: "🪴", target: 2 },
    { w1: "GALO", s1: "Sin R", i1: "🐓", w2: "GRADO", s2: "Con GR", i2: "🎓", target: 2 },
    { w1: "GOMA", s1: "Sin R", i1: "🟤", w2: "GROSA", s2: "Con GR", i2: "❓", target: 1 },
    { w1: "GANA", s1: "Sin R", i1: "🏆", w2: "GRANA", s2: "Con GR", i2: "🌾", target: 2 },
    { w1: "GASA", s1: "Sin R", i1: "🧻", w2: "GRASA", s2: "Con GR", i2: "🥓", target: 2 }
  ],
  semaforoRadar: [],
  pistaDecir: [
    { word: "grillo", img: "🦗", category: "inicio" },
    { word: "grúa", img: "🏗️", category: "inicio" },
    { word: "tigre", img: "🐯", category: "inicio" },
    { word: "grapa", img: "📎", category: "inicio" },
    { word: "grano", img: "🌾", category: "inicio" },
    { word: "grasa", img: "🥓", category: "contiene" },
    { word: "grado", img: "🎓", category: "contiene" },
    { word: "gruta", img: "🕳️", category: "contiene" },
    { word: "grifo", img: "🚿", category: "contiene" },
    { word: "gracia", img: "😂", category: "contiene" },
    { word: "grande", img: "📏", category: "final" },
    { word: "gris", img: "🌫️", category: "final" },
    { word: "verde", img: "🟢", category: "final" },
    { word: "dulce", img: "🍭", category: "final" },
    { word: "risa", img: "😄", category: "final" }
  ],
  pistaEco: [
    { word: "Grillo", img: "🦗" }, { word: "Grúa", img: "🏗️" }, { word: "Tigre", img: "🐯" }, { word: "Grapa", img: "📎" },
    { word: "Grano", img: "🌾" }, { word: "Grasa", img: "🥓" }, { word: "Grado", img: "🎓" }, { word: "Gruta", img: "🕳️" },
    { word: "Grifo", img: "🚿" }, { word: "Gracia", img: "😂" }, { word: "Grande", img: "📏" }, { word: "Gris", img: "🌫️" }
  ],
  gameImages: [
    { img: "🦗", name: "GRILLO" }, { img: "🏗️", name: "GRÚA" }, { img: "🐯", name: "TIGRE" }, { img: "📎", name: "GRAPA" },
    { img: "🌾", name: "GRANO" }, { img: "🥓", name: "GRASA" }, { img: "🎓", name: "GRADO" }, { img: "🕳️", name: "GRUTA" },
    { img: "🚿", name: "GRIFO" }, { img: "😂", name: "GRACIA" }, { img: "📏", name: "GRANDE" }, { img: "🌫️", name: "GRIS" }
  ],
  pistaFrases: [
    "El grillo canta alegre de noche.",
    "La grúa levanta mucho peso.",
    "El tigre es un animal salvaje.",
    "El grano de trigo es pequeño.",
    "El grifo está goteando en el baño."
  ],
  pistaTrabalenguas: [
    "El grillo Gregorio grita en la gruta gris.",
    "Graciela graba el grito del gran grillo.",
    "El grifo gris gotea sin gracia."
  ],
  pistaCompletar: [
    { phrase: "El insecto que canta es el", word: "GRILLO" },
    { phrase: "Para levantar placas uso la", word: "GRÚA" },
    { phrase: "El animal con rayas naranjas es el", word: "TIGRE" },
    { phrase: "Para unir hojas uso una", word: "GRAPA" },
    { phrase: "El cereal se llama", word: "GRANO" },
    { phrase: "La grasa está en la", word: "COMIDA" },
    { phrase: "El baño tiene un", word: "GRIFO" },
    { phrase: "Es una persona muy", word: "GRACIOSA" },
    { phrase: "El número es muy", word: "GRANDE" },
    { phrase: "La pared está pintada de", word: "GRIS" }
  ]
};

// -----------------------------------------------------------------------------
// Trabada CR
// -----------------------------------------------------------------------------
export const CR_PHONEME_DATA: PhonemeContent = {
  name: 'Trabada CR',
  color: 'orange',
  taller: [
    { title: "¡EL CRUJIDO! (CR)", instruction: "Sonido seco y lengua arriba:", sound: "C-R-C-R", tip: "¡Como si algo se rompiera!", img: "https://static.arasaac.org/pictograms/2569/2569_300.png" },
    { title: "¡Seco!", instruction: "Ahora con vocales:", sound: "CRA-CRE-CRI-CRO-CRU", tip: "¡Punta arriba!", img: "https://static.arasaac.org/pictograms/2569/2569_300.png" },
    { title: "¡En palabras!", instruction: "Repite estas palabras:", sound: "CROMO-CRISTAL-CREMA", tip: "¡No olvides la R!", img: "https://static.arasaac.org/pictograms/2569/2569_300.png" }
  ],
  semaforoPares: [
    { w1: "COCO", s1: "Sin R", i1: "🥥", w2: "CROMO", s2: "Con CR", i2: "🃏", target: 2 },
    { w1: "CARA", s1: "Sin CR", i1: "👧", w2: "CRASA", s2: "Con CR", i2: "❓", target: 1 },
    { w1: "CUNA", s1: "Sin CR", i1: "🛏️", w2: "CRUNA", s2: "Con CR", i2: "❓", target: 1 },
    { w1: "COTA", s1: "Sin CR", i1: "🧥", w2: "CROTA", s2: "Con CR", i2: "❓", target: 1 },
    { w1: "CIMA", s1: "Sin CR", i1: "🏔️", w2: "CRIMA", s2: "Con CR", i2: "❓", target: 1 },
    { w1: "CARO", s1: "Sin CR", i1: "💰", w2: "CRARO", s2: "Con CR", i2: "❓", target: 1 }
  ],
  semaforoRadar: [],
  pistaDecir: [
    { word: "cromo", img: "🃏", category: "inicio" },
    { word: "cristal", img: "💎", category: "inicio" },
    { word: "crema", img: "🧴", category: "inicio" },
    { word: "cruz", img: "✝️", category: "inicio" },
    { word: "crayón", img: "🖍️", category: "inicio" },
    { word: "cráneo", img: "💀", category: "contiene" },
    { word: "cruasán", img: "🥐", category: "contiene" },
    { word: "cristina", img: "👧", category: "contiene" },
    { word: "crédito", img: "💳", category: "contiene" },
    { word: "croqueta", img: "🍤", category: "contiene" },
    { word: "crimen", img: "🕵️", category: "final" },
    { word: "creativo", img: "🎨", category: "final" },
    { word: "croissant", img: "🥐", category: "final" },
    { word: "cruce", img: "🚦", category: "final" },
    { word: "crédito", img: "💳", category: "final" }
  ],
  pistaEco: [
    { word: "Cromo", img: "🃏" }, { word: "Cristal", img: "💎" }, { word: "Crema", img: "🧴" }, { word: "Cruz", img: "✝️" },
    { word: "Crayón", img: "🖍️" }, { word: "Cráneo", img: "💀" }, { word: "Cruasán", img: "🥐" }, { word: "Cristina", img: "👧" },
    { word: "Crédito", img: "💳" }, { word: "Croqueta", img: "🍤" }, { word: "Crimen", img: "🕵️" }, { word: "Crew", img: "👥" }
  ],
  gameImages: [
    { img: "🃏", name: "CROMO" }, { img: "💎", name: "CRISTAL" }, { img: "🧴", name: "CREMA" }, { img: "✝️", name: "CRUZ" },
    { img: "🖍️", name: "CRAYÓN" }, { img: "💀", name: "CRÁNEO" }, { img: "🥐", name: "CRUASÁN" }, { img: "👧", name: "CRISTINA" },
    { img: "💳", name: "CRÉDITO" }, { img: "🍤", name: "CROQUETA" }, { img: "🕵️", name: "CRIMEN" }, { img: "👥", name: "CREW" }
  ],
  pistaFrases: [
    "Cristina tiene un cromo de un coche.",
    "El cristal de la ventana está limpio.",
    "Me pongo crema en las manos.",
    "La cruz está en la iglesia.",
    "El crayón es de color rojo."
  ],
  pistaTrabalenguas: [
    "Cristina cree que el cristal de la cruz es de color crema.",
    "El cromo de Cristian cruje en el cristal.",
    "El crayón crepita cuando cruje la cruz."
  ],
  pistaCompletar: [
    { phrase: "Para coleccionar uso un", word: "CROMO" },
    { phrase: "La ventana es de", word: "CRISTAL" },
    { phrase: "Para la cara uso", word: "CREMA" },
    { phrase: "En la iglesia hay una", word: "CRUZ" },
    { phrase: "Para pintar uso un", word: "CRAYÓN" },
    { phrase: "El hueso de la cabeza es el", word: "CRÁNEO" },
    { phrase: "El desayuno trae un", word: "CRUASÁN" },
    { phrase: "Ella se llama", word: "CRISTINA" },
    { phrase: "Con la tarjeta pago con", word: "CRÉDITO" },
    { phrase: "En el barco hay una", word: "CREW" }
  ]
};

// -----------------------------------------------------------------------------
// Trabada FR
// -----------------------------------------------------------------------------
export const FR_PHONEME_DATA: PhonemeContent = {
  name: 'Trabada FR',
  color: 'orange',
  taller: [
    { title: "¡EL SONIDO! (FR)", instruction: "Dientes en labio y lengua arriba:", sound: "F-R-F-R", tip: "¡Sopla con fuerza!", img: "https://static.arasaac.org/pictograms/2569/2569_300.png" },
    { title: "¡Aire!", instruction: "Ahora con vocales:", sound: "FRA-FRE-FRI-FRO-FRU", tip: "¡Siente el aire!", img: "https://static.arasaac.org/pictograms/2569/2569_300.png" },
    { title: "¡En palabras!", instruction: "Repite estas palabras:", sound: "FRESA-FRUTA-FRENO", tip: "¡Mantén la F al frente y la R dentro!", img: "https://static.arasaac.org/pictograms/2569/2569_300.png" }
  ],
  semaforoPares: [
    { w1: "FUTA", s1: "Sin R", i1: "❓", w2: "FRUTA", s2: "Con FR", i2: "🍎", target: 2 },
    { w1: "FENA", s1: "Sin R", i1: "🌾", w2: "FRENA", s2: "Con FR", i2: "🛑", target: 2 },
    { w1: "FOTO", s1: "Sin R", i1: "📷", w2: "FROTA", s2: "Con FR", i2: "🧼", target: 2 },
    { w1: "FELIZ", s1: "Sin FR", i1: "😊", w2: "FREZAR", s2: "Con FR", i2: "❄️", target: 1 },
    { w1: "FELPA", s1: "Sin R", i1: "🧵", w2: "FREPA", s2: "Con FR", i2: "❓", target: 1 },
    { w1: "FILA", s1: "Sin R", i1: "🧍", w2: "FRILA", s2: "Con FR", i2: "❓", target: 1 }
  ],
  semaforoRadar: [],
  pistaDecir: [
    { word: "fresa", img: "🍓", category: "inicio" },
    { word: "fruta", img: "🍎", category: "inicio" },
    { word: "frío", img: "🥶", category: "inicio" },
    { word: "freno", img: "🛑", category: "inicio" },
    { word: "frasco", img: "🧴", category: "inicio" },
    { word: "franja", img: "🚩", category: "contiene" },
    { word: "frase", img: "📝", category: "contiene" },
    { word: "fruta", img: "🍎", category: "contiene" },
    { word: "frío", img: "🥶", category: "contiene" },
    { word: "frota", img: "🧼", category: "contiene" },
    { word: "fuego", img: "🔥", category: "final" },
    { word: "frecuencia", img: "📶", category: "final" },
    { word: "frágil", img: "💔", category: "final" },
    { word: "fractal", img: "🌀", category: "final" },
    { word: "frío", img: "🥶", category: "final" }
  ],
  pistaEco: [
    { word: "Fresa", img: "🍓" }, { word: "Fruta", img: "🍎" }, { word: "Frío", img: "🥶" }, { word: "Freno", img: "🛑" },
    { word: "Frasco", img: "🧴" }, { word: "Frodo", img: "🧙" }, { word: "Franja", img: "🚩" }, { word: "Fractal", img: "🌀" },
    { word: "Frota", img: "🧼" }, { word: "Fuego", img: "🔥" }, { word: "Frase", img: "📝" }, { word: "Frecuencia", img: "📶" }
  ],
  gameImages: [
    { img: "🍓", name: "FRESA" }, { img: "🍎", name: "FRUTA" }, { img: "🥶", name: "FRÍO" }, { img: "🛑", name: "FRENO" },
    { img: "🧴", name: "FRASCO" }, { img: "🧙", name: "FRODO" }, { img: "🚩", name: "FRANJA" }, { img: "🌀", name: "FRACTAL" },
    { img: "🧼", name: "FROTA" }, { img: "🔥", name: "FUEGO" }, { img: "📝", name: "FRASE" }, { img: "📶", name: "FRECUENCIA" }
  ],
  pistaFrases: [
    "Me gusta comer fresas con nata.",
    "La fruta es muy saludable.",
    "Hace mucho frío en invierno.",
    "El coche se para con el freno.",
    "El frasco está lleno de perfume."
  ],
  pistaTrabalenguas: [
    "Frida come fresas frescas frente a la fuente.",
    "Francisco fríe fruta fresca en la freidora.",
    "Franco frisa la franja frontal de la fruta."
  ],
  pistaCompletar: [
    { phrase: "La fruta roja pequeña es la", word: "FRESA" },
    { phrase: "La manzana y la pera son", word: "FRUTA" },
    { phrase: "En invierno hace mucho", word: "FRÍO" },
    { phrase: "Para parar el coche uso el", word: "FRENO" },
    { phrase: "El perfume viene en un", word: "FRASCO" },
    { phrase: "Escribe una", word: "FRASE" },
    { phrase: "La línea blanca es una", word: "FRANJA" },
    { phrase: "El viento mece el", word: "FUEGO" },
    { phrase: "El estudiante mide la", word: "FRECUENCIA" },
    { phrase: "Frodo es un personaje de", word: "FANTASÍA" }
  ]
};
