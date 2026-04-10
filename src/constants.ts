import React from 'react';
import { 
  Settings, 
  Volume2, 
  Flag, 
  Trophy, 
  Gamepad2, 
  CheckCircle2, 
  AlertCircle, 
  RotateCcw,
  BookOpen,
  FileText
} from 'lucide-react';
import { World } from './types';

export const STORAGE_KEY = 'rum_rum_pilot_data';

export const worlds = [
  { id: 'TALLER', name: '1. Taller', icon: React.createElement(Settings, { className: "w-6 h-6" }), desc: 'Calienta motores y prepara tu lengua.' },
  { id: 'SEMAFORO', name: '2. Semáforo', icon: React.createElement(Volume2, { className: "w-6 h-6" }), desc: 'Entrena tu oído para detectar el sonido.' },
  { id: 'PISTA', name: '3. Pista', icon: React.createElement(Flag, { className: "w-6 h-6" }), desc: 'Repite palabras y frases a toda velocidad.' },
  { id: 'GRAN_PREMIO', name: '4. Gran Premio', icon: React.createElement(Trophy, { className: "w-6 h-6" }), desc: 'La carrera final por la copa de oro.' },
];

export const minigames = [
  { id: 'MEMORY', name: 'Memory', icon: React.createElement(Gamepad2, { className: "w-5 h-5" }) },
  { id: 'BINGO', name: 'Bingo', icon: React.createElement(CheckCircle2, { className: "w-5 h-5" }) },
  { id: 'LINCE', name: 'Lince', icon: React.createElement(AlertCircle, { className: "w-5 h-5" }) },
  { id: 'DOMINO', name: 'Dominó', icon: React.createElement(RotateCcw, { className: "w-5 h-5" }) },
  { id: 'DOBBLE', name: 'Dobble', icon: React.createElement(CheckCircle2, { className: "w-5 h-5" }) },
];

export const worldRules: Record<World, string> = {
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
