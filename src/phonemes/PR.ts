import { PhonemeContent } from '../types';

export const PR_PHONEME_DATA: PhonemeContent = {
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
  ],
  pistaCompletar: [
    { phrase: "Si gano la carrera me dan un", word: "PREMIO" },
    { phrase: "El hijo del rey es el", word: "PRÍNCIPE" },
    { phrase: "El campo verde es el", word: "PRADO" },
    { phrase: "Si llego tarde tengo mucha", word: "PRISA" },
    { phrase: "La hija del rey es la", word: "PRINCESA" }
  ]
};
