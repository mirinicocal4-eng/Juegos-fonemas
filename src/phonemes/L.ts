import { PhonemeContent } from '../types';

export const L_PHONEME_DATA: PhonemeContent = {
  name: 'Fonema L',
  color: 'teal',
  taller: [
    {
      title: "¡Tocando los labios!",
      instruction: "Subir y bajar la lengua tocando los labios.",
      sound: "",
      tip: "¡Muévela despacio y siente el contacto con los labios!"
    },
    {
      title: "¡Tocando los dientes!",
      instruction: "Subir y bajar la lengua tocando los dientes.",
      sound: "",
      tip: "¡Toca suavemente el borde de los dientes!"
    },
    {
      title: "¡Detrás de los dientes!",
      instruction: "Subir y bajar la lengua detrás de los dientes.",
      sound: "",
      tip: "¡Toca los alveolos superiores detrás de los dientes!"
    },
    {
      title: "¡Sensibilización y Cosquillas!",
      instruction: "Poniendo hielo en los alveolos superiores de la boca y hacer cosquillas a los alveolos con un depresor.",
      sound: "",
      tip: "¡Despertamos la zona del paladar para preparar la lengua!"
    },
    {
      title: "¡Cantante de ópera!",
      instruction: "Imitamos a un cantante de ópera con voz grave que diga LO, LO, LO.",
      sound: "LO, LO, LO",
      tip: "¡Voz muy grave y profunda!",
      img: [
        "https://static.arasaac.org/pictograms/27917/27917_300.png",
        "https://static.arasaac.org/pictograms/27921/27921_300.png"
      ]
    },
    {
      title: "¡Voz aguda de ópera!",
      instruction: "Con voz aguda que diga LA, LA, LA.",
      sound: "LA, LA, LA",
      tip: "¡Voz bien aguda y afinada!",
      img: [
        "https://static.arasaac.org/pictograms/27921/27921_300.png",
        "https://static.arasaac.org/pictograms/27917/27917_300.png"
      ]
    },
    {
      title: "¡Voz de enanito!",
      instruction: "Con voz de enanito que diga LI, LI, LI.",
      sound: "LI, LI, LI",
      tip: "¡Voz pequeñita y divertida!",
      img: "https://static.arasaac.org/pictograms/5450/5450_300.png"
    }
  ],
  semaforoPares: [
    { w1: "LORO", s1: "Con L", i1_img: "loro", w2: "CORO", s2: "Con C", i2_img: "coro", target: 1 },
    { w1: "PEDO", s1: "Con D", i1_img: "pedo", w2: "PELO", s2: "Con L", i2_img: "pelo", target: 2 },
    { w1: "HADA", s1: "Con D", i1_img: "hada", w2: "ALA", s2: "Con L", i2_img: "ala", target: 2 },
    { w1: "CAZO", s1: "Con C", i1_img: "cazo", w2: "LAZO", s2: "Con L", i2_img: "lazo", target: 2 },
    { w1: "LUZ", s1: "Con L", i1_img: "luz", w2: "CRUZ", s2: "Con CR", i2_img: "cruz", target: 1 },
    { w1: "CIEGO", s1: "Con G", i1_img: "ciego", w2: "CIELO", s2: "Con L", i2_img: "cielo", target: 2 },
    { w1: "LAVAR", s1: "Con L", i1_img: "lavar", w2: "CAVAR", s2: "Con C", i2_img: "cavar", target: 1 },
    { w1: "HUELLA", s1: "Con LL", i1_img: "huella", w2: "HUELA", s2: "Con L", i2_img: "oler", target: 2 }
  ],
  semaforoRadar: {
    title: "Suena o no suena con L",
    items: [
      { word: "Los", img: "los", hasTarget: true },
      { word: "Pera", img: "pera", hasTarget: false },
      { word: "Lavar", img: "lavar", hasTarget: true },
      { word: "Luz", img: "luz", hasTarget: true },
      { word: "Leer", img: "leer", hasTarget: true },
      { word: "Cola", img: "cola", hasTarget: true },
      { word: "Película", img: "película", hasTarget: true },
      { word: "Murciélago", img: "murciélago", hasTarget: true },
      { word: "Lazo", img: "lazo", hasTarget: true },
      { word: "Cielo", img: "cielo", hasTarget: true },
      { word: "Celo", img: "celo", hasTarget: true },
      { word: "Lila", img: "lila", hasTarget: true },
      { word: "Hada", img: "hada", hasTarget: false },
      { word: "Alud", img: "alud", hasTarget: true },
      { word: "Ayuda", img: "ayuda", hasTarget: false },
      { word: "Llavero", img: "llavero", hasTarget: false },
      { word: "Huella", img: "huella", hasTarget: false },
      { word: "Calle", img: "calle", hasTarget: false },
      { word: "Loco", img: "loco", hasTarget: true },
      { word: "Sed", img: "sed", hasTarget: false },
      { word: "Huela", img: "oler", hasTarget: true },
      { word: "Lobo", img: "lobo", hasTarget: true },
      { word: "Loza", img: "vajilla", hasTarget: true },
      { word: "Cero", img: "cero", hasTarget: false },
      { word: "Allí", img: "allí", hasTarget: false },
      { word: "Cáliz", img: "cáliz", hasTarget: true },
      { word: "Pero", img: "pero", hasTarget: false },
      { word: "Pelo", img: "pelo", hasTarget: true },
      { word: "Farola", img: "farola", hasTarget: true },
      { word: "Cádiz", img: "cádiz", hasTarget: false },
      { word: "Ala", img: "ala", hasTarget: true },
      { word: "Llave", img: "llave", hasTarget: false },
      { word: "Lupa", img: "lupa", hasTarget: true },
      { word: "Dedo", img: "dedo", hasTarget: false },
      { word: "Dolor", img: "dolor", hasTarget: true },
      { word: "Dado", img: "dado", hasTarget: false },
      { word: "Loro", img: "loro", hasTarget: true },
      { word: "Callar", img: "callar", hasTarget: false },
      { word: "Llorar", img: "llorar", hasTarget: false },
      { word: "Lámpara", img: "lámpara", hasTarget: true },
      { word: "Melón", img: "melón", hasTarget: true },
      { word: "Dos", img: "dos", hasTarget: false },
      { word: "Lápiz", img: "lápiz", hasTarget: true },
      { word: "Hielo", img: "hielo", hasTarget: true }
    ]
  },
  pistaDecir: [
    // Empiezan por L (inicio)
    { word: "lazo", img: "lazo", category: "inicio" },
    { word: "lápiz", img: "lápiz", category: "inicio" },
    { word: "lobo", img: "lobo", category: "inicio" },
    { word: "loro", img: "loro", category: "inicio" },
    { word: "luz", img: "luz", category: "inicio" },
    { word: "lupa", img: "lupa", category: "inicio" },
    { word: "leche", img: "leche", category: "inicio" },
    { word: "león", img: "león", category: "inicio" },
    { word: "limón", img: "limón", category: "inicio" },
    { word: "libro", img: "libro", category: "inicio" },

    // Contienen L (contiene)
    { word: "pala", img: "pala", category: "contiene" },
    { word: "vela", img: "vela", category: "contiene" },
    { word: "palo", img: "palo", category: "contiene" },
    { word: "pelota", img: "pelota", category: "contiene" },
    { word: "peluche", img: "peluche", category: "contiene" },
    { word: "columpio", img: "columpio", category: "contiene" },
    { word: "tele", img: "televisión", category: "contiene" },
    { word: "papelera", img: "papelera", category: "contiene" },
    { word: "policía", img: "policía", category: "contiene" },
    { word: "familia", img: "familia", category: "contiene" },

    // Final de sílaba / Inversa (inversa)
    { word: "falda", img: "falda", category: "inversa" },
    { word: "sal", img: "sal", category: "inversa" },
    { word: "polvo", img: "polvo", category: "inversa" },
    { word: "sol", img: "sol", category: "inversa" },
    { word: "pulsera", img: "pulsera", category: "inversa" },
    { word: "azul", img: "azul", category: "inversa" },
    { word: "selva", img: "selva", category: "inversa" },
    { word: "pincel", img: "pincel", category: "inversa" },
    { word: "silbato", img: "silbato", category: "inversa" },
    { word: "albañil", img: "albañil", category: "inversa" }
  ],
  gameImages: [
    { img: "lápiz", name: "LÁPIZ" },
    { img: "lobo", name: "LOBO" },
    { img: "loro", name: "LORO" },
    { img: "luz", name: "LUZ" },
    { img: "lupa", name: "LUPA" },
    { img: "león", name: "LEÓN" },
    { img: "limón", name: "LIMÓN" },
    { img: "libro", name: "LIBRO" },
    { img: "luna", name: "LUNA" },
    { img: "lámpara", name: "LÁMPARA" },
    { img: "pelota", name: "PELOTA" },
    { img: "vela", name: "VELA" },
    { img: "pala", name: "PALA" },
    { img: "palo", name: "PALO" },
    { img: "peluche", name: "PELUCHE" },
    { img: "columpio", name: "COLUMPIO" },
    { img: "falda", name: "FALDA" },
    { img: "sol", name: "SOL" },
    { img: "silbato", name: "SILBATO" },
    { img: "pincel", name: "PINCEL" }
  ],
  pistaFrases: [
    "La abuela se cuelga el bolso.",
    "El león olfatea la lagartija.",
    "La limpiadora limpia el salón.",
    "La lavadora lava los calcetines.",
    "El abuelo tiene el papel.",
    "Alicia pela el limón.",
    "El loro vuela alto.",
    "Lucía golpea la lata.",
    "El policía silba al ladrón.",
    "El lobo lucha con el elefante."
  ],
  pistaTrabalenguas: [
    "Con la pala Polo apalea, en el lote, todo el lodo.",
    "La mulita Lola se enamoró del león con todo su corazón. La mulita Lola que no es para tener melena se puso peluca. La mulita Lola con melena, y su corazón ofrece al león. La mulita Lola, al león no gustó y sola en el lago, la peluca tiró.",
    "Lado, ledo, lido, lodo, ludo, decirlo al revés lo dudo. Ludo, lodo, lido, ledo, lado, ¡qué trabajo me ha costado!"
  ],
  pistaCompletar: [
    { phrase: "Para leer por la noche en la cama encendemos la...", word: "LÁMPARA" },
    { phrase: "Las manos nos las lavamos en el...", word: "LAVABO" },
    { phrase: "Las casas se construyen con...", word: "LADRILLO" },
    { phrase: "Una fruta ácida y amarilla es el...", word: "LIMÓN" },
    { phrase: "Para ver cuando hay oscuridad encendemos la...", word: "LUZ" },
    { phrase: "El animal conocido como el rey de la selva es el...", word: "LEÓN" },
    { phrase: "Para leer letras muy pequeñas usamos la...", word: "LUPA" },
    { phrase: "Por el día sale el sol, por la noche la...", word: "LUNA" },
    { phrase: "El primer día de la semana es el...", word: "LUNES" },
    { phrase: "Lo contrario de rizado es...", word: "LISO" }
  ]
};
