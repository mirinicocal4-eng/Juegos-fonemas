import React from 'react';
import { 
  FlaskConical, 
  Ear, 
  Mic, 
  Map, 
  Gamepad2, 
  CheckCircle2, 
  AlertCircle, 
  RotateCcw,
  BookOpen,
  FileText,
  Sparkles
} from 'lucide-react';
import { World } from './types';

export const STORAGE_KEY = 'sound_station_pilot_data';

export const worlds = [
  { id: 'TALLER', name: '1. Laboratorio', icon: React.createElement(FlaskConical, { className: "w-6 h-6" }), desc: 'Prepara tu voz y calienta tu lengua.' },
  { id: 'SEMAFORO', name: '2. El Radar', icon: React.createElement(Ear, { className: "w-6 h-6" }), desc: 'Entrena tu oído para detectar los sonidos.' },
  { id: 'PISTA', name: '3. El Escenario', icon: React.createElement(Mic, { className: "w-6 h-6" }), desc: 'Practica palabras y frases con claridad.' },
  { id: 'GRAN_PREMIO', name: '4. La Aventura', icon: React.createElement(Map, { className: "w-6 h-6" }), desc: 'El desafío final para demostrar lo aprendido.' },
  { id: 'LIBRARY', name: 'Biblioteca', icon: React.createElement(BookOpen, { className: "w-6 h-6" }), desc: 'Consulta y sube tus materiales de apoyo.' },
];

export const minigames = [
  { id: 'MEMORY', name: 'Memory', icon: React.createElement(Gamepad2, { className: "w-5 h-5" }) },
  { id: 'BINGO', name: 'Bingo', icon: React.createElement(CheckCircle2, { className: "w-5 h-5" }) },
  { id: 'LINCE', name: 'Lince', icon: React.createElement(AlertCircle, { className: "w-5 h-5" }) },
  { id: 'DOMINO', name: 'Dominó', icon: React.createElement(RotateCcw, { className: "w-5 h-5" }) },
  { id: 'DOBBLE', name: 'Dobble', icon: React.createElement(CheckCircle2, { className: "w-5 h-5" }) },
];

export const worldRules: Record<World, string> = {
  MENU: "Elige una estación para empezar tu entrenamiento.",
  TALLER: "CONSEJO: Mantén la lengua relajada y en la posición correcta. ¡Sigue las instrucciones del laboratorio!",
  SEMAFORO: "Escucha con atención. ¿Cómo suena la palabra? Ayuda al radar a clasificar los sonidos correctamente.",
  PISTA: "Repite las palabras y frases con claridad. ¡Demuestra tu dominio del lenguaje en el escenario!",
  GRAN_PREMIO: "Tira el dado y avanza por el mapa. Responde a las preguntas para completar la aventura.",
  MEMORY: "Encuentra las parejas de imágenes que contienen el sonido.",
  BINGO: "Juego para 2 exploradores. Cada uno tiene su cartón. ¡El primero en marcar todas sus imágenes gana!",
  LINCE: "Busca rápido la imagen que te pedimos entre todas las demás.",
  DOMINO: "Encaja las piezas: la imagen de la izquierda de tu pieza debe ser igual a la de la derecha de la cadena.",
  DOBBLE: "¡Sé el más rápido! Encuentra la única imagen que se repite en las dos cartas circulares.",
  PHONEME_SELECT: "Selecciona el sonido que quieres practicar hoy.",
  PLAYER_COUNT: "Selecciona cuántos exploradores van a participar en la aventura.",
  LIBRARY: "Consulta materiales, libros y guías para complementar tu aprendizaje."
};

export const resources = [
  { 
    title: "Guía de Articulación /R/", 
    type: "PDF", 
    desc: "Ejercicios visuales para colocar la lengua correctamente.",
    icon: React.createElement(FileText, { className: "w-6 h-6" })
  },
  { 
    title: "Cuentos para Hablar", 
    type: "Libro", 
    desc: "Historias divertidas centradas en fonemas específicos.",
    icon: React.createElement(BookOpen, { className: "w-6 h-6" })
  },
  { 
    title: "Fichas de Generalización", 
    type: "Material", 
    desc: "Actividades para casa y el aula.",
    icon: React.createElement(FileText, { className: "w-6 h-6" })
  }
];
