/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  Settings, 
  Flag, 
  Mic, 
  Volume2, 
  ChevronRight, 
  RotateCcw, 
  Car, 
  Gamepad2,
  AlertCircle,
  CheckCircle2,
  Library,
  BookOpen,
  FileText,
  ExternalLink,
  Zap
} from 'lucide-react';

type World = 'PHONEME_SELECT' | 'MENU' | 'TALLER' | 'SEMAFORO' | 'PISTA' | 'GRAN_PREMIO' | 'MEMORY' | 'BINGO' | 'LINCE' | 'DOMINO' | 'DOBBLE' | 'LIBRARY';
type Phoneme = 'R' | 'S' | 'Z' | 'BR' | 'PR' | 'TR' | 'DR' | 'GR' | 'CR' | 'FR';

interface GameState {
  world: World;
  phoneme: Phoneme;
  step: number;
  subStep: number;
  history: string[];
}

interface PersistentData {
  lastPhoneme: Phoneme;
  linceHighScore: number;
  trophiesCount: number;
  completedPhonemes: Phoneme[];
}

const STORAGE_KEY = 'rum_rum_pilot_data';

const DEFAULT_PERSISTENT_DATA: PersistentData = {
  lastPhoneme: 'R',
  linceHighScore: 0,
  trophiesCount: 0,
  completedPhonemes: []
};

const PHONEME_DATA = {
  R: {
    name: 'Fonema R/RR',
    color: 'red',
    taller: [
      { title: "¡Calentando motores!", instruction: "Pon la lengua arriba (en el garaje) y repite:", sound: "T-R-T-R", tip: "¡Lengua arriba!" },
      { title: "¡Más potencia!", instruction: "Ahora con fuerza, lengua arriba:", sound: "D-R-D-R", tip: "¡Siente el cosquilleo!" },
      { title: "¡Vibración final!", instruction: "¡Arrancamos! Di con fuerza:", sound: "RRRRRR", tip: "¡Siente la vibración en la punta!" }
    ],
    semaforoPares: [
      { w1: "PERA", s1: "R suave", i1: "🍐", w2: "PERRA", s2: "R fuerte", i2: "🐕", target: 2 },
      { w1: "CORO", s1: "R suave", i1: "🎶", w2: "CORRO", s2: "R fuerte", i2: "🏃", target: 2 },
      { w1: "CARO", s1: "R suave", i1: "💰", w2: "CARRO", s2: "R fuerte", i2: "🛒", target: 2 },
      { w1: "VARA", s1: "R suave", i1: "🦯", w2: "BARRA", s2: "R fuerte", i2: "🥖", target: 2 },
      { w1: "CERO", s1: "R suave", i1: "0️⃣", w2: "CERRO", s2: "R fuerte", i2: "⛰️", target: 2 },
      { w1: "MIRA", s1: "R suave", i1: "👀", w2: "MIRRA", s2: "R fuerte", i2: "🏺", target: 2 }
    ],
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
    ]
  },
  S: {
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
  },
  Z: {
    name: 'Fonema Z/C',
    color: 'emerald',
    taller: [
      { title: "¡Lengua fuera!", instruction: "Saca un poquito la lengua entre los dientes:", sound: "Z-Z-Z-Z", tip: "¡Muerde la punta suavemente!" },
      { title: "¡El Abejorro!", instruction: "Haz que vibre el aire entre los dientes:", sound: "ZZZ-ZZZ", tip: "¡Sopla flojito!" },
      { title: "¡Zumbido final!", instruction: "Di las sílabas mágicas:", sound: "ZA-ZE-ZI", tip: "¡No escondas la lengua!" }
    ],
    semaforoPares: [
      { w1: "TAZA", s1: "Con Z", i1: "☕", w2: "TASA", s2: "Con S", i2: "📈", target: 1 },
      { w1: "CAZA", s1: "Con Z", i1: "🏹", w2: "CASA", s2: "Con S", i2: "🏠", target: 1 },
      { w1: "MAZA", s1: "Con Z", i1: "🔨", w2: "MASA", s2: "Con S", i2: "🍕", target: 1 },
      { w1: "POZO", s1: "Con Z", i1: "🕳️", w2: "POSO", s2: "Con S", i2: "☕", target: 1 },
      { w1: "CEBO", s1: "Con Z/C", i1: "🪱", w2: "SEBO", s2: "Con S", i2: "🕯️", target: 1 },
      { w1: "CIERVO", s1: "Con Z/C", i1: "🦌", w2: "SIERVO", s2: "Con S", i2: "🙇", target: 1 }
    ],
    pistaEco: [
      { word: "Zapato", img: "👞" }, { word: "Zorro", img: "🦊" }, { word: "Taza", img: "☕" }, { word: "Manzana", img: "🍎" },
      { word: "Zanahoria", img: "🥕" }, { word: "Zumo", img: "🧃" }, { word: "Cebra", img: "🦓" }, { word: "Cielo", img: "☁️" },
      { word: "Corazón", img: "❤️" }, { word: "Lazo", img: "🎀" }, { word: "Pez", img: "🐟" }, { word: "Lápiz", img: "✏️" },
      { word: "Cisne", img: "🦢" }, { word: "Cesta", img: "🧺" }, { word: "Cebra", img: "🦓" }, { word: "Cielo", img: "☁️" },
      { word: "Cocina", img: "🍳" }, { word: "Doce", img: "1️⃣2️⃣" }, { word: "Peces", img: "🐟" }
    ],
    gameImages: [
      { img: "👞", name: "ZAPATO" }, { img: "🦊", name: "ZORRO" }, { img: "☕", name: "TAZA" }, { img: "🍎", name: "MANZANA" },
      { img: "🥕", name: "ZANAHORIA" }, { img: "🧃", name: "ZUMO" }, { img: "🔨", name: "MAZA" }, { img: "❤️", name: "CORAZÓN" },
      { img: "🦓", name: "CEBRA" }, { img: "☁️", name: "CIELO" }, { img: "🎀", name: "LAZO" }, { img: "🐟", name: "PEZ" },
      { img: "✏️", name: "LÁPIZ" }, { img: "🍿", name: "MAÍZ" }, { img: "👃", name: "NARIZ" }, { img: "🎬", name: "CINE" },
      { img: "🍒", name: "CEREZA" }, { img: "🧅", name: "CEBOLLA" }, { img: "🥣", name: "CAZO" }, { img: "👟", name: "ZAPATILLA" },
      { img: "🕳️", name: "POZO" }, { img: "🏰", name: "PALACIO" }, { img: "🥄", name: "CAZO" }, { img: "🥣", name: "TAZÓN" },
      { img: "🪥", name: "CEPILLO" }, { img: "🕯️", name: "CERILLA" }, { img: "🦌", name: "CIERVO" }, { img: "🍳", name: "CALABAZA" },
      { img: "🧪", name: "AZÚCAR" }, { img: "🥣", name: "ARROZ" }, { img: "🦢", name: "CISNE" }, { img: "🧺", name: "CESTA" },
      { img: "🍳", name: "COCINA" }, { img: "1️⃣2️⃣", name: "DOCE" }, { img: "🐟", name: "PECES" }
    ],
    pistaFrases: [
      "El zapato es de color azul.",
      "La manzana es muy dulce.",
      "El zorro corre por el campo.",
      "Tengo un lápiz de color azul.",
      "Celia come cerezas en el cine.",
      "En la cocina hay doce peces.",
      "El cisne nada bajo el cielo azul.",
      "Celia tiene una cesta de cerezas."
    ],
    pistaTrabalenguas: [
      "El zapatero Zacarías zapatea sus zapatos azules con mucha destreza.",
      "Zorro, zorrito, saca tu hocico, que el sol brilla un poquito."
    ]
  },
  BR: {
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
    ]
  },
  PR: {
    name: 'Trabada PR',
    color: 'orange',
    taller: [
      { title: "¡EXPLOSIÓN! (PR)", instruction: "Sopla fuerte con la lengua arriba:", sound: "P-R-P-R", tip: "¡Como un petardo suave!" },
      { title: "¡Potencia!", instruction: "Ahora con vocales:", sound: "PRA-PRE-PRI", tip: "¡Suelta el aire!" }
    ],
    semaforoPares: [
      { w1: "PISA", s1: "Sin R", i1: "👣", w2: "PRISA", s2: "Con PR", i2: "🏃‍♂️", target: 2 }
    ],
    pistaEco: [
      { word: "Premio", img: "🎁" }, { word: "Príncipe", img: "🤴" }, { word: "Prado", img: "🌿" }, { word: "Prisa", img: "🏃‍♂️" }
    ],
    gameImages: [
      { img: "🎁", name: "PREMIO" }, { img: "🤴", name: "PRÍNCIPE" }, { img: "🌿", name: "PRADO" }, { img: "🏃‍♂️", name: "PRISA" },
      { img: "👸", name: "PRINCESA" }, { img: "🧪", name: "PRUEBA" }, { img: "📏", name: "PRIMERO" }, { img: "🧤", name: "PRENDA" }
    ],
    pistaFrases: [
      "El príncipe tiene un premio.",
      "Tengo mucha prisa por llegar.",
      "El prado está muy verde."
    ],
    pistaTrabalenguas: [
      "El príncipe de Prusia tiene mucha prisa por el prado.",
      "Primero pregunta el precio del premio precioso."
    ]
  },
  TR: {
    name: 'Trabada TR',
    color: 'orange',
    taller: [
      { title: "¡EL TREN! (TR)", instruction: "Golpea rápido con la punta de la lengua:", sound: "T-R-T-R", tip: "¡Muy cortito y veloz!" },
      { title: "¡Velocidad!", instruction: "Ahora con vocales:", sound: "TRA-TRE-TRI", tip: "¡Punta de la lengua arriba!" }
    ],
    semaforoPares: [
      { w1: "TONO", s1: "Sin R", i1: "🎵", w2: "TRONO", s2: "Con TR", i2: "👑", target: 2 }
    ],
    pistaEco: [
      { word: "Tren", img: "🚂" }, { word: "Tractor", img: "🚜" }, { word: "Trigo", img: "🍞" }, { word: "Trompeta", img: "🎺" }
    ],
    gameImages: [
      { img: "🚂", name: "TREN" }, { img: "🚜", name: "TRACTOR" }, { img: "🍞", name: "TRIGO" }, { img: "🎺", name: "TROMPETA" },
      { img: "🚲", name: "TRICICLO" }, { img: "🪄", name: "TRUCO" }, { img: "🐯", name: "TIGRE" }, { img: "🌟", name: "ESTRELLA" }
    ],
    pistaFrases: [
      "El tren va muy rápido por la vía.",
      "El tractor trabaja en el campo.",
      "Toco la trompeta muy bien."
    ],
    pistaTrabalenguas: [
      "Tres tristes tigres comen trigo en un trigal.",
      "El tren de Tristán trae trastos tras la vía."
    ]
  },
  DR: {
    name: 'Trabada DR',
    color: 'orange',
    taller: [
      { title: "¡EL MOTOR! (DR)", instruction: "Golpea rápido con la punta de la lengua:", sound: "D-R-D-R", tip: "¡Siente el cosquilleo!" },
      { title: "¡Fuerza!", instruction: "Ahora con vocales:", sound: "DRA-DRE-DRI", tip: "¡Lengua fuerte!" }
    ],
    semaforoPares: [
      { w1: "DADO", s1: "Sin R", i1: "🎲", w2: "DRAGÓN", s2: "Con DR", i2: "🐉", target: 2 }
    ],
    pistaEco: [
      { word: "Dragón", img: "🐉" }, { word: "Dromedario", img: "🐪" }, { word: "Cuadro", img: "🖼️" }, { word: "Ladrillo", img: "🧱" }
    ],
    gameImages: [
      { img: "🐉", name: "DRAGÓN" }, { img: "🐪", name: "DROMEDARIO" }, { img: "🖼️", name: "CUADRO" }, { img: "🧱", name: "LADRILLO" },
      { img: "💎", name: "PIEDRA" }, { img: "🧔", name: "PADRE" }, { img: "👩", name: "MADRE" }, { img: "🐿️", name: "ALMENDRA" }
    ],
    pistaFrases: [
      "El dragón echa fuego por la boca.",
      "El dromedario camina por el desierto.",
      "El cuadro está colgado en la pared."
    ],
    pistaTrabalenguas: [
      "El dragón de la gruta grita con gran fuerza.",
      "El dromedario de Drácula duerme en el cuadro."
    ]
  },
  GR: {
    name: 'Trabada GR',
    color: 'orange',
    taller: [
      { title: "¡EL GRUÑIDO! (GR)", instruction: "Sonido desde la garganta y lengua arriba:", sound: "G-R-G-R", tip: "¡Como un motor potente!" },
      { title: "¡Garganta!", instruction: "Ahora con vocales:", sound: "GRA-GRE-GRI", tip: "¡Siente el sonido atrás!" }
    ],
    semaforoPares: [
      { w1: "GATO", s1: "Sin R", i1: "🐱", w2: "GRATO", s2: "Con GR", i2: "😊", target: 2 }
    ],
    pistaEco: [
      { word: "Grillo", img: "🦗" }, { word: "Grúa", img: "🏗️" }, { word: "Tigre", img: "🐯" }, { word: "Grapa", img: "📎" }
    ],
    gameImages: [
      { img: "🦗", name: "GRILLO" }, { img: "🏗️", name: "GRÚA" }, { img: "🐯", name: "TIGRE" }, { img: "📎", name: "GRAPA" },
      { img: "🗣️", name: "GRITO" }, { img: "🍇", name: "GRANADA" }, { img: "🚜", name: "GRANJA" }, { img: "🌑", name: "GRIS" }
    ],
    pistaFrases: [
      "El grillo canta alegre de noche.",
      "La grúa levanta mucho peso.",
      "El tigre es un animal salvaje."
    ],
    pistaTrabalenguas: [
      "El grillo Gregorio grita en la gruta gris.",
      "Graciela graba el grito del gran grillo."
    ]
  },
  CR: {
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
  },
  FR: {
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
  }
};

export default function App() {
  const [state, setState] = useState<GameState & { showTrabadas?: boolean }>({
    world: 'PHONEME_SELECT',
    phoneme: 'R',
    step: 0,
    subStep: 0,
    history: [],
    showTrabadas: false
  });

  const [persistentData, setPersistentData] = useState<PersistentData>(DEFAULT_PERSISTENT_DATA);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setPersistentData(parsed);
        setState(prev => ({ ...prev, phoneme: parsed.lastPhoneme }));
      } catch (e) {
        console.error("Error loading pilot data", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save data when it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(persistentData));
    }
  }, [persistentData, isLoaded]);

  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | 'info', message: string } | null>(null);

  const currentData = PHONEME_DATA[state.phoneme] || PHONEME_DATA['R'];

  const worlds = [
    { id: 'TALLER', name: '1. Taller', icon: <Settings className="w-6 h-6" />, desc: 'Calienta motores y prepara tu lengua.' },
    { id: 'SEMAFORO', name: '2. Semáforo', icon: <Volume2 className="w-6 h-6" />, desc: 'Entrena tu oído para detectar el sonido.' },
    { id: 'PISTA', name: '3. Pista', icon: <Flag className="w-6 h-6" />, desc: 'Repite palabras y frases a toda velocidad.' },
    { id: 'GRAN_PREMIO', name: '4. Gran Premio', icon: <Trophy className="w-6 h-6" />, desc: 'La carrera final por la copa de oro.' },
  ];

  const minigames = [
    { id: 'MEMORY', name: 'Memory', icon: <Gamepad2 className="w-5 h-5" /> },
    { id: 'BINGO', name: 'Bingo', icon: <CheckCircle2 className="w-5 h-5" /> },
    { id: 'LINCE', name: 'Lince', icon: <AlertCircle className="w-5 h-5" /> },
    { id: 'DOMINO', name: 'Dominó', icon: <RotateCcw className="w-5 h-5" /> },
    { id: 'DOBBLE', name: 'Dobble', icon: <CheckCircle2 className="w-5 h-5" /> },
  ];

  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  const selectPhoneme = (phoneme: Phoneme) => {
    setState({ ...state, phoneme, world: 'MENU', step: 0, subStep: 0 });
    setPersistentData(prev => ({ ...prev, lastPhoneme: phoneme }));
    setFeedback(null);
  };

  const goToWorld = (world: World) => {
    setState({ ...state, world, step: 0, subStep: 0 });
    setFeedback(null);
  };

  // --- MUNDO 1: TALLER ---
  const tallerSteps = currentData.taller;

  // --- MUNDO 2: SEMAFORO ---
  const semaforoPares = currentData.semaforoPares;

  const semaforoRadar = [
    ...currentData.pistaEco.map(p => ({ word: p.word.toUpperCase(), hasTarget: true, img: p.img })),
    { word: "MOTO", hasTarget: false, img: "🏍️" },
    { word: "BICI", hasTarget: state.phoneme === 'Z', img: "🚲" },
    { word: "PATO", hasTarget: false, img: "🦆" }
  ];

  // --- MUNDO 3: PISTA ---
  const pistaEco = currentData.pistaEco;
  const pistaFrases = currentData.pistaFrases;
  const pistaTrabalenguas = currentData.pistaTrabalenguas;

  // --- MUNDO 4: GRAN PREMIO ---
  const granPremioBoard = currentData.gameImages.map((img, i) => ({
    id: i + 1,
    img: img.img,
    name: img.name,
    q: `¿Cómo dices ${img.name} con mucha fuerza?`
  }));

  // --- NUEVOS JUEGOS ---
  const gameImages = currentData.gameImages;

  const [showRules, setShowRules] = useState(false);
  const [isWinner, setIsWinner] = useState(false);
  const [diceValue, setDiceValue] = useState<number | null>(null);

  // Memory State
  const [memoryCards, setMemoryCards] = useState<{ id: number, img: string, flipped: boolean, matched: boolean }[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);

  // Bingo State
  const [bingoBoardP1, setBingoBoardP1] = useState<{ img: string, marked: boolean }[]>([]);
  const [bingoBoardP2, setBingoBoardP2] = useState<{ img: string, marked: boolean }[]>([]);
  const [bingoCurrent, setBingoCurrent] = useState<{ img: string, name: string } | null>(null);
  const [bingoWinner, setBingoWinner] = useState<number | null>(null);

  // Lince State
  const [linceBoard, setLinceBoard] = useState<{ img: string, name: string, id: number }[]>([]);
  const [linceTarget, setLinceTarget] = useState<{ img: string, name: string } | null>(null);
  const [linceScore, setLinceScore] = useState(0);

  // Domino State
  const [dominoChain, setDominoChain] = useState<{ left: string, right: string }[]>([]);
  const [dominoHand, setDominoHand] = useState<{ left: string, right: string }[]>([]);
  const [dominoPool, setDominoPool] = useState<{ left: string, right: string }[]>([]);

  // Dobble State
  const [dobbleCards, setDobbleCards] = useState<{ img: string, name: string }[][]>([]);
  const [dobbleTarget, setDobbleTarget] = useState<string | null>(null);

  const worldRules: Record<World, string> = {
    MENU: "Elige un mundo para empezar tu entrenamiento de piloto.",
    TALLER: "REGLA DE ORO: La lengua siempre arriba (en el garaje). Prohibido hacer 'brrr' con los labios. ¡Si la lengua no sube, el motor se ahoga!",
    SEMAFORO: "Escucha con atención. ¿El motor suena FUERTE (/rr/) o SUAVE (/r/)? Ayuda al radar a clasificar las palabras.",
    PISTA: "Repite las palabras y frases con tu mejor voz de piloto. ¡Supera el trabalenguas sin salirte de la pista!",
    GRAN_PREMIO: "Tira el dado y avanza por las casillas. Responde a las preguntas para llegar a la META y ganar la Gran Copa.",
    MEMORY: "Encuentra las parejas de imágenes con el sonido /rr/.",
    BINGO: "Juego para 2 pilotos. Cada uno tiene su cartón. ¡El primero en marcar todas sus imágenes gana!",
    LINCE: "Busca rápido la imagen que te pedimos entre todas las demás.",
    DOMINO: "Encaja las piezas: la imagen de la izquierda de tu pieza debe ser igual a la de la derecha de la cadena.",
    DOBBLE: "¡Sé el más rápido! Encuentra la única imagen que se repite en las dos cartas circulares.",
    PHONEME_SELECT: "Selecciona el fonema que quieres entrenar hoy.",
    LIBRARY: "Consulta materiales, libros y guías para complementar tu entrenamiento fuera de la pista."
  };

  const rollDice = () => {
    const val = Math.floor(Math.random() * 6) + 1;
    setDiceValue(val);
    const next = Math.min(state.step + val, granPremioBoard.length - 1);
    setState({ ...state, step: next });
    if (next === granPremioBoard.length - 1) {
      setTimeout(() => {
        setIsWinner(true);
        setPersistentData(prev => {
          const alreadyCompleted = prev.completedPhonemes.includes(state.phoneme);
          return {
            ...prev,
            trophiesCount: alreadyCompleted ? prev.trophiesCount : prev.trophiesCount + 1,
            completedPhonemes: alreadyCompleted ? prev.completedPhonemes : [...prev.completedPhonemes, state.phoneme]
          };
        });
      }, 1500);
    }
  };

  // --- GAME INITIALIZERS ---
  const initMemory = () => {
    const cards = [...gameImages.slice(0, 8), ...gameImages.slice(0, 8)]
      .sort(() => Math.random() - 0.5)
      .map((item, index) => ({ id: index, img: item.img, flipped: false, matched: false }));
    setMemoryCards(cards);
    setFlippedIndices([]);
  };

  const initBingo = () => {
    const board1 = [...gameImages]
      .sort(() => Math.random() - 0.5)
      .slice(0, 9)
      .map(item => ({ img: item.img, marked: false }));
    const board2 = [...gameImages]
      .sort(() => Math.random() - 0.5)
      .slice(0, 9)
      .map(item => ({ img: item.img, marked: false }));
    setBingoBoardP1(board1);
    setBingoBoardP2(board2);
    setBingoCurrent(null);
    setBingoWinner(null);
  };

  const initLince = () => {
    const board = [...gameImages]
      .sort(() => Math.random() - 0.5)
      .map((item, index) => ({ ...item, id: index }));
    setLinceBoard(board);
    setLinceTarget(gameImages[Math.floor(Math.random() * gameImages.length)]);
    setLinceScore(0);
  };

  const initDomino = () => {
    const selectedImages = [...gameImages].sort(() => Math.random() - 0.5).slice(0, 7).map(img => img.img);
    const allTiles: { left: string, right: string }[] = [];
    
    for (let i = 0; i <= 6; i++) {
      for (let j = i; j <= 6; j++) {
        allTiles.push({ left: selectedImages[i], right: selectedImages[j] });
      }
    }
    
    const shuffled = allTiles.sort(() => Math.random() - 0.5);
    const initialPiece = shuffled.pop()!;
    setDominoChain([initialPiece]);
    
    const hand = shuffled.splice(0, 6); // Start with 6 tiles
    setDominoHand(hand);
    setDominoPool(shuffled);
  };

  const initDobble = () => {
    const shuffled = [...gameImages].sort(() => Math.random() - 0.5);
    const common = shuffled[0];
    const card1 = [common, ...shuffled.slice(1, 5)].sort(() => Math.random() - 0.5);
    const card2 = [common, ...shuffled.slice(5, 9)].sort(() => Math.random() - 0.5);
    setDobbleCards([card1, card2]);
    setDobbleTarget(common.img);
  };

  useEffect(() => {
    if (state.world === 'MEMORY') initMemory();
    if (state.world === 'BINGO') initBingo();
    if (state.world === 'LINCE') initLince();
    if (state.world === 'DOMINO') initDomino();
    if (state.world === 'DOBBLE') initDobble();
  }, [state.world]);

  // --- GAME ACTIONS ---
  const handleMemoryClick = (index: number) => {
    if (flippedIndices.length === 2 || memoryCards[index].flipped || memoryCards[index].matched) return;

    const newCards = [...memoryCards];
    newCards[index].flipped = true;
    setMemoryCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (memoryCards[first].img === memoryCards[second].img) {
        setFeedback({ type: 'success', message: `¡Pareja de ${memoryCards[first].img} encontrada! 🌟` });
        setTimeout(() => {
          const matchedCards = [...memoryCards];
          matchedCards[first].matched = true;
          matchedCards[second].matched = true;
          setMemoryCards(matchedCards);
          setFlippedIndices([]);
          if (matchedCards.every(c => c.matched)) setFeedback({ type: 'success', message: "¡Increíble! Has encontrado todas las parejas 🏆" });
        }, 500);
      } else {
        setFeedback({ type: 'error', message: "¡Oh no! Sigue intentándolo 🏎️" });
        setTimeout(() => {
          const resetCards = [...memoryCards];
          resetCards[first].flipped = false;
          resetCards[second].flipped = false;
          setMemoryCards(resetCards);
          setFlippedIndices([]);
          setFeedback(null);
        }, 1000);
      }
    }
  };

  const nextBingoBall = () => {
    if (bingoWinner) return;
    const available = gameImages.filter(img => 
      (bingoBoardP1.find(b => b.img === img.img && !b.marked)) || 
      (bingoBoardP2.find(b => b.img === img.img && !b.marked))
    );
    if (available.length === 0) return;
    const next = available[Math.floor(Math.random() * available.length)];
    setBingoCurrent(next);
  };

  const markBingo = (player: 1 | 2, index: number) => {
    if (bingoWinner || !bingoCurrent) return;
    const board = player === 1 ? bingoBoardP1 : bingoBoardP2;
    if (board[index].img !== bingoCurrent.img) {
      setFeedback({ type: 'error', message: "¡Esa no es la imagen que ha salido! ❌" });
      return;
    }
    
    const newBoard = [...board];
    newBoard[index].marked = true;
    if (player === 1) setBingoBoardP1(newBoard);
    else setBingoBoardP2(newBoard);

    setFeedback({ type: 'success', message: `¡Piloto ${player} marca ${bingoCurrent.img}! ✅` });
    
    if (newBoard.every(b => b.marked)) {
      setBingoWinner(player);
      setFeedback({ type: 'success', message: `¡BINGO! ¡El Piloto ${player} ha ganado la carrera! 🏁🏆` });
    }
  };

  const checkLince = (item: { img: string, name: string }) => {
    if (item.img === linceTarget?.img) {
      const newScore = linceScore + 1;
      setLinceScore(newScore);
      setFeedback({ type: 'success', message: `¡Encontrado! +1 punto 🎯` });
      setLinceTarget(gameImages[Math.floor(Math.random() * gameImages.length)]);
      
      if (newScore > persistentData.linceHighScore) {
        setPersistentData(prev => ({ ...prev, linceHighScore: newScore }));
      }

      if (newScore >= 10) setFeedback({ type: 'success', message: "¡Ojo de Lince! Has encontrado 10 imágenes 🏆" });
    } else {
      setFeedback({ type: 'error', message: "¡Ese no es! Sigue buscando 🧐" });
    }
  };

  const handleDominoClick = (piece: { left: string, right: string }, index: number) => {
    const lastPiece = dominoChain[dominoChain.length - 1];
    
    // Check both orientations
    let canPlay = false;
    let playedPiece = { ...piece };
    
    if (piece.left === lastPiece.right) {
      canPlay = true;
    } else if (piece.right === lastPiece.right) {
      canPlay = true;
      playedPiece = { left: piece.right, right: piece.left };
    }

    if (canPlay) {
      setDominoChain([...dominoChain, playedPiece]);
      const newHand = dominoHand.filter((_, i) => i !== index);
      setDominoHand(newHand);
      setFeedback({ type: 'success', message: "¡Pieza encajada! 🏎️💨" });
      
      if (newHand.length === 0 && dominoPool.length === 0) {
        setFeedback({ type: 'success', message: "¡HAS GANADO! Has colocado todas tus fichas 🏆🏁" });
      }
    } else {
      setFeedback({ type: 'error', message: "¡Esa pieza no encaja! Busca una que coincida con el extremo 🧩" });
    }
  };

  const handleDobbleClick = (img: string) => {
    if (img === dobbleTarget) {
      setFeedback({ type: 'success', message: "¡LO TENGO! Has encontrado la pareja rápida ⚡🏆" });
      setTimeout(initDobble, 1000);
    } else {
      setFeedback({ type: 'error', message: "¡Casi! Mira bien, solo hay una imagen igual en las dos cartas 🧐" });
    }
  };

  const drawDominoPiece = () => {
    if (dominoPool.length === 0) {
      // Check if user is truly stuck
      const lastPiece = dominoChain[dominoChain.length - 1];
      const hasMove = dominoHand.some(p => p.left === lastPiece.right || p.right === lastPiece.right);
      
      if (!hasMove) {
        setFeedback({ 
          type: 'info', 
          message: `¡Carrera terminada! Te han sobrado ${dominoHand.length} fichas. ¡Buen intento, piloto! 🏁🏎️` 
        });
      } else {
        setFeedback({ type: 'error', message: "¡Aún tienes fichas que puedes colocar! Mira bien... 🧐" });
      }
      return;
    }
    const newPool = [...dominoPool];
    const drawn = newPool.pop()!;
    setDominoPool(newPool);
    setDominoHand([...dominoHand, drawn]);
    setFeedback({ type: 'info', message: "Has robado una ficha del montón 🃏" });
  };

  const resetGame = () => {
    setState(prev => ({ ...prev, world: 'MENU', step: 0, subStep: 0, history: [] }));
    setFeedback(null);
    setIsWinner(false);
    setDiceValue(null);
  };

  if (isWinner) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          className="space-y-8"
        >
          <div className="relative">
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="relative z-10"
            >
              <Trophy className="w-48 h-48 text-yellow-500 mx-auto drop-shadow-[0_0_30px_rgba(234,179,8,0.5)]" />
            </motion.div>
            <div className="absolute inset-0 bg-yellow-500/20 blur-3xl rounded-full" />
          </div>
          
          <div className="space-y-4">
            <h2 className="text-5xl font-black text-white italic uppercase tracking-tighter">
              ¡CAMPEÓN DEL MUNDO! 🏆
            </h2>
            <p className="text-zinc-400 text-xl max-w-md mx-auto">
              Has dominado la <span className="text-red-500 font-bold italic">/RR/</span> vibrante alveolar. ¡Tu motor suena perfecto!
            </p>
          </div>

          <button 
            onClick={resetGame}
            className="bg-white text-black font-black px-12 py-4 rounded-2xl text-xl uppercase italic hover:scale-105 transition-transform shadow-xl"
          >
            Volver a empezar
          </button>
        </motion.div>
      </div>
    );
  }

  const resources = [
    {
      title: "Guía de Articulación /R/",
      desc: "Ejercicios prácticos para la vibrante alveolar.",
      type: "PDF",
      url: "#",
      icon: <FileText className="w-6 h-6" />
    },
    {
      title: "Cuentos para Rumiar",
      desc: "Historias cortas con enfoque en fonemas específicos.",
      type: "Libro",
      url: "#",
      icon: <BookOpen className="w-6 h-6" />
    },
    {
      title: "Fichas de Seguimiento",
      desc: "Imprime y anota el progreso de tus carreras.",
      type: "Material",
      url: "#",
      icon: <Zap className="w-6 h-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-red-500/30">
      {/* Header */}
      <header className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50 backdrop-blur-md sticky top-0 z-50">
        <div 
          className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => goToWorld('PHONEME_SELECT')}
        >
          <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center shadow-lg shadow-red-900/20">
            <Car className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">RUM-RUM 🏎️</h1>
            <p className="text-xs text-zinc-500 uppercase tracking-widest font-semibold">Taller de Logopedia</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {state.world !== 'PHONEME_SELECT' && state.world !== 'MENU' && (
            <button 
              onClick={() => goToWorld('MENU')}
              className="mr-2 p-2 hover:bg-zinc-800 rounded-full transition-colors text-zinc-400 hover:text-white flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
            >
              <ChevronRight className="rotate-180 w-4 h-4" />
              <span className="hidden sm:inline">Menú</span>
            </button>
          )}
          <div className="hidden md:flex items-center gap-4 mr-4 px-4 py-1 bg-zinc-800/50 rounded-full border border-zinc-700">
            <div className="flex items-center gap-1">
              <Trophy className="w-3 h-3 text-yellow-500" />
              <span className="text-[10px] font-black text-white">{persistentData.trophiesCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <AlertCircle className="w-3 h-3 text-blue-500" />
              <span className="text-[10px] font-black text-white">Record: {persistentData.linceHighScore}</span>
            </div>
          </div>
          <button 
            onClick={() => setShowRules(true)}
            className="p-2 hover:bg-zinc-800 rounded-full transition-colors text-zinc-400 hover:text-white flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
          >
            <AlertCircle className="w-5 h-5" />
            <span className="hidden sm:inline">Reglas</span>
          </button>
          <button 
            onClick={resetGame}
            className="p-2 hover:bg-zinc-800 rounded-full transition-colors text-zinc-400 hover:text-white"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Rules Modal */}
      <AnimatePresence>
        {showRules && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl max-w-md w-full space-y-6 shadow-2xl"
            >
              <div className="flex items-center gap-3 text-red-500">
                <AlertCircle className="w-8 h-8" />
                <h3 className="text-2xl font-black italic uppercase">Reglas del Piloto</h3>
              </div>
              <p className="text-zinc-300 text-lg leading-relaxed">
                {worldRules[state.world]}
              </p>
              <button 
                onClick={() => setShowRules(false)}
                className="w-full bg-white text-black font-black py-4 rounded-xl uppercase italic"
              >
                ¡Entendido, Copiloto!
              </button>

              <div className="pt-6 border-t border-zinc-800">
                <button 
                  onClick={() => {
                    if (confirm("¿Seguro que quieres borrar todo tu progreso de piloto?")) {
                      localStorage.removeItem(STORAGE_KEY);
                      window.location.reload();
                    }
                  }}
                  className="text-[10px] text-zinc-600 hover:text-red-500 font-bold uppercase tracking-widest transition-colors w-full text-center"
                >
                  Reiniciar memoria de piloto
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-2xl mx-auto p-6 pb-24">
        <AnimatePresence mode="wait">
          {feedback && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onClick={() => setFeedback(null)}
              className={`fixed top-24 left-1/2 -translate-x-1/2 z-[60] p-4 rounded-2xl shadow-2xl border-2 backdrop-blur-xl flex items-center gap-3 min-w-[300px] justify-center cursor-pointer hover:scale-105 transition-transform ${
                feedback.type === 'success' ? 'bg-green-600/20 border-green-500 text-green-400' :
                feedback.type === 'error' ? 'bg-red-600/20 border-red-500 text-red-400' :
                'bg-zinc-900/80 border-zinc-700 text-zinc-300'
              }`}
            >
              {feedback.type === 'success' && <CheckCircle2 className="w-5 h-5" />}
              {feedback.type === 'error' && <AlertCircle className="w-5 h-5" />}
              <span className="font-black italic uppercase tracking-tight">{feedback.message}</span>
              <span className="text-[10px] opacity-50 ml-2">(Toca para cerrar)</span>
            </motion.div>
          )}

          {state.world === 'PHONEME_SELECT' && (
            <motion.div 
              key="phoneme-select"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8 text-center"
            >
              <div className="space-y-4">
                <h2 className="text-5xl font-black text-white italic uppercase tracking-tighter">
                  {state.showTrabadas ? '¡Elige la trabada! 🏎️' : '¡Elige tu combustible! ⛽'}
                </h2>
                <p className="text-zinc-400 text-lg">
                  {state.showTrabadas ? 'Selecciona el grupo de letras para entrenar.' : '¿Qué fonema vamos a entrenar hoy en la carrera?'}
                </p>
              </div>

              {!state.showTrabadas ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {(['R', 'S', 'Z'] as Phoneme[]).map((p) => (
                    <button
                      key={p}
                      onClick={() => selectPhoneme(p)}
                      className={`p-6 rounded-3xl border-4 transition-all hover:scale-105 flex flex-col items-center justify-center relative ${
                        p === 'R' ? 'bg-red-600/10 border-red-600 text-red-500' :
                        p === 'S' ? 'bg-blue-600/10 border-blue-600 text-blue-500' :
                        'bg-emerald-600/10 border-emerald-600 text-emerald-500'
                      }`}
                    >
                      {persistentData.completedPhonemes.includes(p) && (
                        <div className="absolute -top-2 -right-2 bg-yellow-500 text-black p-1 rounded-full shadow-lg">
                          <Trophy className="w-4 h-4" />
                        </div>
                      )}
                      <span className="text-5xl font-black italic">{p}</span>
                      <p className="mt-4 font-bold uppercase tracking-widest text-[10px]">{PHONEME_DATA[p].name}</p>
                    </button>
                  ))}
                  <button
                    onClick={() => setState({ ...state, showTrabadas: true })}
                    className="p-6 rounded-3xl border-4 transition-all hover:scale-105 flex flex-col items-center justify-center bg-orange-600/10 border-orange-600 text-orange-500"
                  >
                    <span className="text-5xl font-black italic">BR...</span>
                    <p className="mt-4 font-bold uppercase tracking-widest text-[10px]">Trabadas con R</p>
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {(['BR', 'PR', 'TR', 'DR', 'GR', 'CR', 'FR'] as Phoneme[]).map((p) => (
                      <button
                        key={p}
                        onClick={() => selectPhoneme(p)}
                        className="p-6 rounded-3xl border-4 transition-all hover:scale-105 flex flex-col items-center justify-center bg-orange-600/10 border-orange-600 text-orange-500 relative"
                      >
                        {persistentData.completedPhonemes.includes(p) && (
                          <div className="absolute -top-2 -right-2 bg-yellow-500 text-black p-1 rounded-full shadow-lg">
                            <Trophy className="w-4 h-4" />
                          </div>
                        )}
                        <span className="text-4xl font-black italic">{p}</span>
                        <p className="mt-4 font-bold uppercase tracking-widest text-[10px]">{PHONEME_DATA[p].name}</p>
                      </button>
                    ))}
                  </div>
                  <button 
                    onClick={() => setState({ ...state, showTrabadas: false })}
                    className="text-zinc-500 hover:text-white font-bold uppercase text-xs tracking-widest flex items-center gap-2 mx-auto"
                  >
                    <ChevronRight className="rotate-180 w-4 h-4" /> Volver atrás
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {state.world === 'MENU' && (
            <motion.div 
              key="menu"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="text-center space-y-4">
                <div className="flex justify-center gap-2 mb-4">
                  <button onClick={() => goToWorld('PHONEME_SELECT')} className="px-4 py-1 bg-zinc-800 text-zinc-400 rounded-full text-xs font-bold uppercase hover:text-white transition-colors">
                    Cambiar fonema ({state.phoneme})
                  </button>
                </div>
                <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter">
                  ¡Hola, piloto! 🏁
                </h2>
                <p className="text-zinc-400 text-lg">
                  Bienvenido al taller de <span className={`text-${currentData.color}-500 font-bold italic uppercase`}>{currentData.name}</span>.
                  ¿A qué mundo quieres ir hoy?
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {worlds.map((w) => (
                  <button
                    key={w.id}
                    onClick={() => goToWorld(w.id as World)}
                    className="group relative p-6 bg-zinc-900 border border-zinc-800 rounded-2xl text-left hover:border-red-500/50 transition-all hover:shadow-2xl hover:shadow-red-900/10 overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      {w.icon}
                    </div>
                    <div className="relative z-10 flex flex-col gap-1">
                      <span className="text-red-500 font-bold text-[10px] uppercase tracking-widest">Mundo</span>
                      <span className="text-2xl font-black text-white italic uppercase tracking-tighter">{w.name}</span>
                      <p className="text-zinc-500 text-xs font-medium">{w.desc}</p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="space-y-4 pt-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-black text-zinc-500 uppercase tracking-[0.2em] italic">Juegos Rápidos 🎮</h3>
                  <button 
                    onClick={() => goToWorld('LIBRARY')}
                    className="flex items-center gap-2 text-[10px] font-black text-red-500 uppercase tracking-widest hover:text-white transition-colors"
                  >
                    <Library className="w-3 h-3" /> Biblioteca
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {minigames.map((g) => (
                    <button
                      key={g.id}
                      onClick={() => goToWorld(g.id as World)}
                      className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:bg-zinc-800 transition-all text-center space-y-2 group"
                    >
                      <div className="text-zinc-500 group-hover:text-red-500 transition-colors flex justify-center">
                        {g.icon}
                      </div>
                      <p className="text-[10px] font-black uppercase italic tracking-tight text-zinc-400 group-hover:text-white">{g.name}</p>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {state.world === 'TALLER' && (
            <motion.div 
              key="taller"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4 mb-8">
                <button onClick={() => goToWorld('MENU')} className="text-zinc-500 hover:text-white">
                  <ChevronRight className="rotate-180 w-6 h-6" />
                </button>
                <h2 className="text-2xl font-bold italic uppercase">Mundo 1: El Taller</h2>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 space-y-6 relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-32 h-32 bg-${currentData.color}-600/5 blur-3xl rounded-full -mr-16 -mt-16`} />
                
                <div className="space-y-2">
                  <h3 className={`text-${currentData.color}-500 font-bold uppercase tracking-widest text-sm`}>
                    {tallerSteps[state.step].title}
                  </h3>
                  <p className="text-xl text-white">
                    {tallerSteps[state.step].instruction}
                  </p>
                </div>

                <div className="py-12 flex justify-center">
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className={`text-6xl font-black text-white italic tracking-tighter drop-shadow-[0_0_15px_rgba(${state.phoneme === 'R' ? '239,68,68' : state.phoneme === 'S' ? '37,99,235' : '16,185,129'},0.3)]`}
                  >
                    {tallerSteps[state.step].sound}
                  </motion.div>
                </div>

                <div className="bg-zinc-950/50 p-4 rounded-xl border border-zinc-800 flex gap-3 items-start">
                  <AlertCircle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-zinc-400 italic">
                    {tallerSteps[state.step].tip}
                  </p>
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    onClick={() => setFeedback({ type: 'success', message: "¡BRUM! Veo humo de colores saliendo del motor 💨✨" })}
                    className="flex-1 bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-green-900/20 flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-5 h-5" /> ¡Lo hice bien!
                  </button>
                  <button 
                    onClick={() => {
                      let msg = "¡Cuidado! Revisa la posición de tu lengua ⚠️";
                      if (state.phoneme === 'R') msg = "¡Cuidado! Lengua arriba para que el motor no se ahogue ⚠️";
                      if (state.phoneme === 'S') msg = "¡Cuidado! No saques la lengua, mantenla detrás de los dientes ⚠️";
                      if (state.phoneme === 'Z') msg = "¡Cuidado! Saca un poquito la lengua entre los dientes ⚠️";
                      setFeedback({ type: 'error', message: msg });
                    }}
                    className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    Me he equivocado
                  </button>
                </div>
              </div>

              {state.step < tallerSteps.length - 1 ? (
                <button 
                  onClick={() => { setState({ ...state, step: state.step + 1 }); setFeedback(null); }}
                  className="w-full bg-white text-black font-black py-4 rounded-xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 uppercase italic"
                >
                  Siguiente paso <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <button 
                  onClick={() => goToWorld('MENU')}
                  className="w-full border border-zinc-700 text-white font-bold py-4 rounded-xl hover:bg-zinc-800 transition-all uppercase italic"
                >
                  Terminar Entrenamiento
                </button>
              )}
            </motion.div>
          )}

          {state.world === 'SEMAFORO' && (
            <motion.div 
              key="semaforo"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4">
                <button onClick={() => goToWorld('MENU')} className="text-zinc-500 hover:text-white">
                  <ChevronRight className="rotate-180 w-6 h-6" />
                </button>
                <h2 className="text-2xl font-bold italic uppercase">Mundo 2: El Semáforo</h2>
              </div>

              <div className="flex gap-2 mb-6">
                <button 
                  onClick={() => setState({ ...state, subStep: 0, step: 0 })}
                  className={`flex-1 py-2 rounded-lg font-bold text-xs uppercase tracking-widest transition-all ${state.subStep === 0 ? 'bg-red-600 text-white' : 'bg-zinc-900 text-zinc-500'}`}
                >
                  Nivel A: Pares
                </button>
                <button 
                  onClick={() => setState({ ...state, subStep: 1, step: 0 })}
                  className={`flex-1 py-2 rounded-lg font-bold text-xs uppercase tracking-widest transition-all ${state.subStep === 1 ? 'bg-red-600 text-white' : 'bg-zinc-900 text-zinc-500'}`}
                >
                  Nivel B: Radar
                </button>
              </div>

              {state.subStep === 0 ? (
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 space-y-8">
                  <div className="text-center space-y-4">
                    <p className="text-zinc-400 uppercase tracking-widest text-xs font-bold">Duelo de Sonidos</p>
                    <p className="text-lg text-white italic">¿Cuál tiene el sonido {state.phoneme === 'R' ? 'fuerte' : state.phoneme}?</p>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    {[1, 2].map((num) => {
                      const pair = semaforoPares[state.step];
                      const word = num === 1 ? pair.w1 : pair.w2;
                      const soundLabel = num === 1 ? pair.s1 : pair.s2;
                      const img = num === 1 ? pair.i1 : pair.i2;
                      const isTarget = num === pair.target;
                      
                      return (
                        <motion.button
                          key={`${num}-${state.step}`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            if (isTarget) {
                              setFeedback({ type: 'success', message: `¡Genial! ${word} es la opción correcta ✅` });
                            } else {
                              setFeedback({ type: 'info', message: `¡Ups! ${word} no es lo que buscamos 🤫` });
                            }
                          }}
                          className={`bg-zinc-800 border-2 rounded-2xl p-6 flex flex-col items-center gap-4 transition-all group ${isTarget ? 'hover:border-green-500' : 'hover:border-red-500'} border-zinc-700`}
                        >
                          <span className="text-6xl group-hover:scale-110 transition-transform">{img}</span>
                          <div className="text-center">
                            <span className="block text-2xl font-black text-white italic tracking-tighter">{word}</span>
                            <span className={`text-[10px] font-bold uppercase tracking-widest ${isTarget ? 'text-green-500' : 'text-zinc-500'}`}>
                              {soundLabel}
                            </span>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 space-y-8">
                  <div className="text-center space-y-2">
                    <p className="text-zinc-400 uppercase tracking-widest text-xs font-bold">Radar de Sonidos</p>
                    <div className="text-7xl py-4">{semaforoRadar[state.step].img}</div>
                    <h3 className="text-5xl font-black text-white italic tracking-tighter">{semaforoRadar[state.step].word}</h3>
                  </div>

                  <p className="text-center text-lg text-zinc-300 italic">¿Tiene el sonido {state.phoneme === 'R' ? 'fuerte' : state.phoneme}?</p>

                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => {
                        if(semaforoRadar[state.step].hasTarget) setFeedback({ type: 'success', message: "¡SÍ! El radar lo ha detectado 📡✅" });
                        else setFeedback({ type: 'error', message: `¡Oh no! El radar dice que ahí no está el sonido ${state.phoneme} ❌` });
                      }}
                      className="bg-green-600/20 border border-green-500/30 hover:bg-green-600 text-green-400 hover:text-white p-6 rounded-2xl transition-all font-black italic text-2xl"
                    >
                      SÍ
                    </button>
                    <button 
                      onClick={() => {
                        if(!semaforoRadar[state.step].hasTarget) setFeedback({ type: 'success', message: "¡Correcto! Silencio total en el radar 📡🤫" });
                        else setFeedback({ type: 'error', message: "¡Cuidado! El radar sí que oye algo ahí ❌" });
                      }}
                      className="bg-red-600/20 border border-red-500/30 hover:bg-red-600 text-red-400 hover:text-white p-6 rounded-2xl transition-all font-black italic text-2xl"
                    >
                      NO
                    </button>
                  </div>
                </div>
              )}

              <div className="flex gap-4">
                <button 
                  disabled={state.step === 0}
                  onClick={() => { setState({ ...state, step: state.step - 1 }); setFeedback(null); }}
                  className="flex-1 py-4 bg-zinc-900 border border-zinc-800 rounded-xl disabled:opacity-30"
                >
                  Anterior
                </button>
                <button 
                  onClick={() => { 
                    const max = state.subStep === 0 ? semaforoPares.length : semaforoRadar.length;
                    if(state.step < max - 1) {
                      setState({ ...state, step: state.step + 1 }); 
                      setFeedback(null);
                    } else {
                      goToWorld('MENU');
                    }
                  }}
                  className="flex-[2] py-4 bg-white text-black font-black rounded-xl italic uppercase"
                >
                  {state.step < (state.subStep === 0 ? semaforoPares.length : semaforoRadar.length) - 1 ? 'Siguiente' : 'Terminar'}
                </button>
              </div>
            </motion.div>
          )}

          {state.world === 'PISTA' && (
            <motion.div 
              key="pista"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4">
                <button onClick={() => goToWorld('MENU')} className="text-zinc-500 hover:text-white">
                  <ChevronRight className="rotate-180 w-6 h-6" />
                </button>
                <h2 className="text-2xl font-bold italic uppercase">Mundo 3: La Pista</h2>
              </div>

              <div className="space-y-6">
                {/* Eco Section */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4">
                  <div className="flex items-center gap-2 text-red-500 font-bold uppercase tracking-widest text-xs">
                    <Mic className="w-4 h-4" /> Modo Eco
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {pistaEco.map(item => (
                      <button 
                        key={item.word}
                        onClick={() => setFeedback({ type: 'info', message: `¡Repite conmigo: ${item.word.toUpperCase()}! 🗣️` })}
                        className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-full font-bold text-lg transition-all flex items-center gap-2"
                      >
                        <span>{item.img}</span>
                        <span>{item.word}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Frases Section */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4">
                  <div className="flex items-center gap-2 text-red-500 font-bold uppercase tracking-widest text-xs">
                    <Flag className="w-4 h-4" /> Recta de Frases
                  </div>
                  <div className="space-y-3">
                    {pistaFrases.map((frase, i) => (
                      <button 
                        key={i}
                        onClick={() => setFeedback({ type: 'info', message: "¡Qué bien suena esa frase! 🏎️✨" })}
                        className="w-full text-left p-4 bg-zinc-800 hover:bg-zinc-700 rounded-xl font-medium text-lg transition-all border-l-4 border-red-600"
                      >
                        "{frase}"
                      </button>
                    ))}
                  </div>
                </div>

                {/* Trabalenguas Section */}
                <div className="bg-red-600/10 border border-red-500/30 rounded-3xl p-6 space-y-6">
                  <div className="flex items-center gap-2 text-red-500 font-bold uppercase tracking-widest text-xs">
                    <Trophy className="w-4 h-4" /> Curva Peligrosa: Trabalenguas
                  </div>
                  
                  <div className="space-y-6">
                    {pistaTrabalenguas.map((trabalenguas, i) => (
                      <div key={i} className="space-y-4 border-b border-red-500/10 pb-6 last:border-0">
                        <p className="text-2xl font-black italic text-white leading-tight">
                          "{trabalenguas}"
                        </p>
                        <button 
                          onClick={() => setFeedback({ type: 'success', message: `¡CAMPEÓN! Has superado el trabalenguas ${i+1} 🏆` })}
                          className="w-full py-4 bg-red-600 hover:bg-red-500 text-white font-black rounded-xl italic uppercase shadow-lg shadow-red-900/40"
                        >
                          ¡Lo he conseguido!
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button 
                onClick={() => goToWorld('MENU')}
                className="w-full py-4 bg-red-600 text-white font-black rounded-xl italic uppercase shadow-lg shadow-red-900/40"
              >
                Terminar Entrenamiento
              </button>
            </motion.div>
          )}

          {state.world === 'GRAN_PREMIO' && (
            <motion.div 
              key="gran-premio"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4">
                <button onClick={() => goToWorld('MENU')} className="text-zinc-500 hover:text-white">
                  <ChevronRight className="rotate-180 w-6 h-6" />
                </button>
                <h2 className="text-2xl font-bold italic uppercase">Mundo 4: Gran Premio</h2>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 text-center space-y-8">
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-red-600 blur-2xl opacity-20 animate-pulse" />
                    <button 
                      onClick={rollDice}
                      className="relative w-32 h-32 bg-zinc-800 border-4 border-red-600 rounded-3xl flex items-center justify-center text-5xl font-black italic text-white shadow-2xl hover:scale-105 active:scale-95 transition-all"
                    >
                      {diceValue || <Gamepad2 className="w-12 h-12" />}
                    </button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Toca el dado para avanzar</p>
                  <h3 className="text-3xl font-black italic text-white uppercase">¡Tiro el dado!</h3>
                </div>

                {diceValue && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800 space-y-4"
                  >
                    <div className="text-6xl mb-2">{granPremioBoard[state.step].img}</div>
                    <div className="space-y-1">
                      <span className="text-red-500 font-bold text-sm uppercase tracking-widest">Casilla {granPremioBoard[state.step].id}: {granPremioBoard[state.step].name}</span>
                      <p className="text-2xl font-bold text-white leading-tight italic">
                        {granPremioBoard[state.step].q}
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="grid grid-cols-6 gap-2">
                {granPremioBoard.map((item, i) => (
                  <div 
                    key={item.id}
                    className={`aspect-square rounded-lg flex items-center justify-center text-xl border-2 transition-all ${state.step === i ? 'bg-red-600 border-white scale-110 z-10 shadow-lg' : 'bg-zinc-900 border-zinc-800 opacity-50'}`}
                  >
                    {item.img}
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-8 border-t border-zinc-800">
                <h3 className="text-lg font-bold italic uppercase text-zinc-400">Zona de Minijuegos</h3>
                <div className="grid grid-cols-3 gap-4">
                  <button 
                    onClick={() => goToWorld('MEMORY')}
                    className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl hover:bg-zinc-800 transition-all text-center space-y-2"
                  >
                    <Gamepad2 className="w-6 h-6 mx-auto text-red-500" />
                    <p className="text-xs font-bold uppercase">Memory</p>
                  </button>
                  <button 
                    onClick={() => goToWorld('BINGO')}
                    className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl hover:bg-zinc-800 transition-all text-center space-y-2"
                  >
                    <CheckCircle2 className="w-6 h-6 mx-auto text-red-500" />
                    <p className="text-xs font-bold uppercase">Bingo</p>
                  </button>
                  <button 
                    onClick={() => goToWorld('LINCE')}
                    className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl hover:bg-zinc-800 transition-all text-center space-y-2"
                  >
                    <AlertCircle className="w-6 h-6 mx-auto text-red-500" />
                    <p className="text-xs font-bold uppercase">Lince</p>
                  </button>
                  <button 
                    onClick={() => goToWorld('DOMINO')}
                    className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl hover:bg-zinc-800 transition-all text-center space-y-2"
                  >
                    <RotateCcw className="w-6 h-6 mx-auto text-red-500" />
                    <p className="text-xs font-bold uppercase">Dominó</p>
                  </button>
                  <button 
                    onClick={() => goToWorld('DOBBLE')}
                    className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl hover:bg-zinc-800 transition-all text-center space-y-2"
                  >
                    <CheckCircle2 className="w-6 h-6 mx-auto text-red-500" />
                    <p className="text-xs font-bold uppercase">Dobble</p>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {state.world === 'MEMORY' && (
            <motion.div key="memory" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              <div className="flex items-center gap-4">
                <button onClick={() => goToWorld('MENU')} className="text-zinc-500 hover:text-white">
                  <ChevronRight className="rotate-180 w-6 h-6" />
                </button>
                <h2 className="text-2xl font-bold italic uppercase">Juego: Memory</h2>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {memoryCards.map((card, i) => (
                  <button
                    key={card.id}
                    onClick={() => handleMemoryClick(i)}
                    className={`aspect-square rounded-2xl text-4xl flex items-center justify-center transition-all border-4 ${
                      card.matched ? 'bg-green-600/20 border-green-500 scale-95 opacity-80' : 
                      card.flipped ? 'bg-zinc-800 border-red-600' : 
                      'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    {card.flipped || card.matched ? card.img : '❓'}
                  </button>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={initMemory} className="flex-1 py-4 bg-zinc-800 text-white font-bold rounded-xl uppercase">Reiniciar</button>
                <button onClick={() => goToWorld('GRAN_PREMIO')} className="flex-1 py-4 bg-red-600/20 text-red-500 border border-red-500/30 font-bold rounded-xl uppercase">Volver al Gran Premio</button>
                <button onClick={() => goToWorld('MENU')} className="flex-1 py-4 bg-white text-black font-black rounded-xl uppercase italic">Menú Principal</button>
              </div>
            </motion.div>
          )}

          {state.world === 'BINGO' && (
            <motion.div key="bingo" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              <div className="flex items-center gap-4">
                <button onClick={() => goToWorld('MENU')} className="text-zinc-500 hover:text-white">
                  <ChevronRight className="rotate-180 w-6 h-6" />
                </button>
                <h2 className="text-2xl font-bold italic uppercase">Bingo para Parejas</h2>
              </div>
              
              <div className="bg-zinc-900 p-6 rounded-3xl text-center space-y-4 border-2 border-zinc-800 shadow-2xl relative overflow-hidden">
                <div className={`absolute inset-0 bg-${currentData.color}-600/5 pointer-events-none`} />
                <div className="text-7xl relative z-10">{bingoCurrent?.img || '🏁'}</div>
                <p className="text-lg font-bold text-white uppercase tracking-widest relative z-10">{bingoCurrent?.name || '¡Pulsa para empezar!'}</p>
                <button 
                  onClick={nextBingoBall} 
                  disabled={!!bingoWinner}
                  className={`relative z-10 px-8 py-3 bg-${currentData.color}-600 text-white font-black rounded-xl uppercase italic shadow-lg hover:scale-105 transition-all disabled:opacity-50`}
                >
                  Siguiente Imagen
                </button>
              </div>

              <div className="grid grid-cols-2 gap-8">
                {/* Player 1 */}
                <div className="space-y-4">
                  <div className={`p-3 rounded-xl text-center font-black uppercase italic tracking-tighter border-2 ${bingoWinner === 1 ? 'bg-green-600 border-white text-white' : 'bg-zinc-900 border-zinc-800 text-zinc-500'}`}>
                    Piloto 1 {bingoWinner === 1 && '🏆'}
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {bingoBoardP1.map((item, i) => (
                      <button
                        key={i}
                        onClick={() => markBingo(1, i)}
                        className={`aspect-square rounded-xl text-2xl flex items-center justify-center transition-all border-2 ${item.marked ? 'bg-green-600/20 border-green-500' : 'bg-zinc-900 border-zinc-800'}`}
                      >
                        {item.img}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Player 2 */}
                <div className="space-y-4">
                  <div className={`p-3 rounded-xl text-center font-black uppercase italic tracking-tighter border-2 ${bingoWinner === 2 ? 'bg-green-600 border-white text-white' : 'bg-zinc-900 border-zinc-800 text-zinc-500'}`}>
                    Piloto 2 {bingoWinner === 2 && '🏆'}
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {bingoBoardP2.map((item, i) => (
                      <button
                        key={i}
                        onClick={() => markBingo(2, i)}
                        className={`aspect-square rounded-xl text-2xl flex items-center justify-center transition-all border-2 ${item.marked ? 'bg-green-600/20 border-green-500' : 'bg-zinc-900 border-zinc-800'}`}
                      >
                        {item.img}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={initBingo} className="flex-1 py-4 bg-zinc-800 text-white font-bold rounded-xl uppercase">Nueva Carrera</button>
                <button onClick={() => goToWorld('GRAN_PREMIO')} className="flex-1 py-4 bg-red-600/20 text-red-500 border border-red-500/30 font-bold rounded-xl uppercase">Volver al Gran Premio</button>
                <button onClick={() => goToWorld('MENU')} className="flex-1 py-4 bg-white text-black font-black rounded-xl uppercase italic">Menú Principal</button>
              </div>
            </motion.div>
          )}

          {state.world === 'LINCE' && (
            <motion.div key="lince" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              <div className="flex items-center gap-4">
                <button onClick={() => goToWorld('MENU')} className="text-zinc-500 hover:text-white">
                  <ChevronRight className="rotate-180 w-6 h-6" />
                </button>
                <h2 className="text-2xl font-bold italic uppercase">Juego: Lince</h2>
              </div>
              <div className="bg-zinc-900 p-6 rounded-3xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-5xl">{linceTarget?.img}</div>
                  <div>
                    <p className="text-xs text-zinc-500 font-bold uppercase">Busca el:</p>
                    <p className="text-xl font-black text-white italic">{linceTarget?.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-zinc-500 font-bold uppercase">Puntos:</p>
                  <p className={`text-3xl font-black text-${currentData.color}-600 italic`}>{linceScore}/10</p>
                  <p className="text-[10px] text-zinc-600 font-bold uppercase">Record: {persistentData.linceHighScore}</p>
                </div>
              </div>
              <div className="grid grid-cols-6 gap-2 bg-zinc-900 p-4 rounded-3xl">
                {linceBoard.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => checkLince(item)}
                    className="aspect-square bg-zinc-800 hover:bg-zinc-700 rounded-lg text-2xl flex items-center justify-center transition-all"
                  >
                    {item.img}
                  </button>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={initLince} className="flex-1 py-4 bg-zinc-800 text-white font-bold rounded-xl uppercase">Reiniciar</button>
                <button onClick={() => goToWorld('GRAN_PREMIO')} className={`flex-1 py-4 bg-red-600/20 text-red-500 border border-red-500/30 font-bold rounded-xl uppercase`}>Volver al Gran Premio</button>
                <button onClick={() => goToWorld('MENU')} className="flex-1 py-4 bg-white text-black font-black rounded-xl uppercase italic">Menú Principal</button>
              </div>
            </motion.div>
          )}

          {state.world === 'DOMINO' && (
            <motion.div key="domino" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              <div className="flex items-center gap-4">
                <button onClick={() => goToWorld('MENU')} className="text-zinc-500 hover:text-white">
                  <ChevronRight className="rotate-180 w-6 h-6" />
                </button>
                <h2 className="text-2xl font-bold italic uppercase">Juego: Dominó RUM-RUM</h2>
              </div>

              <div className="bg-zinc-900 p-8 rounded-3xl space-y-8 overflow-x-auto">
                <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest text-center">Cadena de piezas</p>
                <div className="flex gap-2 justify-center min-w-max pb-4">
                  {dominoChain.map((piece, i) => (
                    <div key={i} className="flex bg-white text-zinc-900 border-2 border-zinc-300 rounded-xl overflow-hidden shadow-xl">
                      <div className="w-16 h-20 flex items-center justify-center text-4xl border-r border-zinc-200 bg-white">{piece.left}</div>
                      <div className="w-16 h-20 flex items-center justify-center text-4xl bg-zinc-50">{piece.right}</div>
                    </div>
                  ))}
                  <div className="w-16 h-20 border-2 border-dashed border-red-500/30 rounded-xl flex items-center justify-center text-zinc-600 animate-pulse">?</div>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-center text-zinc-400 font-bold uppercase italic text-sm">
                  Tus piezas ({dominoHand.length}) - Montón: {dominoPool.length}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {dominoHand.map((piece, i) => (
                    <button
                      key={i}
                      onClick={() => handleDominoClick(piece, i)}
                      className="flex bg-white text-zinc-900 border-2 border-zinc-300 rounded-2xl overflow-hidden hover:border-red-500 transition-all hover:scale-105"
                    >
                      <div className="flex-1 h-24 flex items-center justify-center text-4xl border-r border-zinc-200 bg-white">{piece.left}</div>
                      <div className="flex-1 h-24 flex items-center justify-center text-4xl">{piece.right}</div>
                    </button>
                  ))}
                </div>
                <button 
                  onClick={drawDominoPiece}
                  className={`w-full py-3 bg-${currentData.color}-600/20 text-${currentData.color}-500 border-2 border-${currentData.color}-500/30 font-bold rounded-xl uppercase hover:bg-${currentData.color}-600/30 transition-all`}
                >
                  {dominoPool.length > 0 ? `Robar del montón (${dominoPool.length})` : "No puedo jugar (Terminar)"}
                </button>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={initDomino} className="flex-1 py-4 bg-zinc-800 text-white font-bold rounded-xl uppercase">Reiniciar</button>
                <button onClick={() => goToWorld('GRAN_PREMIO')} className={`flex-1 py-4 bg-red-600/20 text-red-500 border border-red-500/30 font-bold rounded-xl uppercase`}>Volver al Gran Premio</button>
                <button onClick={() => goToWorld('MENU')} className="flex-1 py-4 bg-white text-black font-black rounded-xl uppercase italic">Menú Principal</button>
              </div>
            </motion.div>
          )}

          {state.world === 'DOBBLE' && (
            <motion.div key="dobble" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              <div className="flex items-center gap-4">
                <button onClick={() => goToWorld('MENU')} className="text-zinc-500 hover:text-white">
                  <ChevronRight className="rotate-180 w-6 h-6" />
                </button>
                <h2 className="text-2xl font-bold italic uppercase">Juego: Dobble Veloz</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {dobbleCards.map((card, cardIdx) => (
                  <div key={cardIdx} className="bg-white rounded-full aspect-square p-8 shadow-2xl relative overflow-hidden flex items-center justify-center">
                    <div className="relative w-full h-full">
                      {card.map((item, i) => {
                        const angle = (i * (360 / card.length)) * (Math.PI / 180);
                        const radius = 35; // percentage
                        const x = 50 + radius * Math.cos(angle);
                        const y = 50 + radius * Math.sin(angle);
                        
                        return (
                          <button
                            key={i}
                            onClick={() => handleDobbleClick(item.img)}
                            className="absolute text-5xl hover:scale-125 transition-transform active:scale-95 -translate-x-1/2 -translate-y-1/2"
                            style={{ 
                              left: `${x}%`,
                              top: `${y}%`,
                              transform: `translate(-50%, -50%) rotate(${i * 30}deg) scale(${0.8 + (i % 3) * 0.2})`,
                            }}
                          >
                            {item.img}
                          </button>
                        );
                      })}
                    </div>
                    <div className="absolute inset-0 border-8 border-zinc-100 rounded-full pointer-events-none" />
                  </div>
                ))}
              </div>

              <div className="text-center space-y-2">
                <p className={`text-${currentData.color}-500 font-black italic text-2xl uppercase tracking-tighter`}>¡Busca la imagen repetida!</p>
                <p className="text-zinc-500 text-sm">Solo hay una imagen igual en las dos cartas. ¡Sé el más rápido!</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={initDobble} className="flex-1 py-4 bg-zinc-800 text-white font-bold rounded-xl uppercase">Nuevas Cartas</button>
                <button onClick={() => goToWorld('GRAN_PREMIO')} className={`flex-1 py-4 bg-red-600/20 text-red-500 border border-red-500/30 font-bold rounded-xl uppercase`}>Volver al Gran Premio</button>
                <button onClick={() => goToWorld('MENU')} className="flex-1 py-4 bg-white text-black font-black rounded-xl uppercase italic">Menú Principal</button>
              </div>
            </motion.div>
          )}

          {state.world === 'LIBRARY' && (
            <motion.div 
              key="library"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4 mb-8">
                <button onClick={() => goToWorld('MENU')} className="text-zinc-500 hover:text-white">
                  <ChevronRight className="rotate-180 w-6 h-6" />
                </button>
                <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter">Boxes de Lectura 📚</h2>
              </div>

              <p className="text-zinc-400 text-lg">
                Aquí tienes materiales adicionales, libros y guías para complementar tu entrenamiento fuera de la pista.
              </p>

              <div className="grid grid-cols-1 gap-4">
                {resources.map((res, idx) => (
                  <div 
                    key={idx}
                    className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-between group hover:border-red-500/30 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                        {res.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{res.type}</span>
                          <h4 className="text-lg font-bold text-white uppercase italic tracking-tight">{res.title}</h4>
                        </div>
                        <p className="text-zinc-500 text-sm">{res.desc}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => alert('Aquí se abriría el enlace al recurso: ' + res.title)}
                      className="p-3 bg-zinc-800 hover:bg-red-600 text-white rounded-xl transition-all"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="p-8 bg-red-600/10 border border-red-500/20 rounded-3xl space-y-4">
                <h4 className="text-xl font-black text-red-500 uppercase italic">¿Tienes material propio?</h4>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Puedes enviarme tus PDFs o nombres de libros y yo los añadiré a esta sección para que siempre los tengas a mano en tu taller.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer hint */}
      <footer className="fixed bottom-0 left-0 right-0 p-4 bg-zinc-950/80 backdrop-blur-md border-t border-zinc-800 text-center">
        <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-bold">
          Copiloto de Logopedia • Especialista en AL
        </p>
      </footer>
    </div>
  );
}
