import { PhonemeContent } from '../types';

export const S_PHONEME_DATA: PhonemeContent = {
  name: 'Fonema S',
  color: 'blue',
  taller: [
    { title: "¡La Serpiente!", instruction: "Dientes juntos y deja salir el aire:", sound: "S-S-S-S", tip: "¡Como si mandaras callar!", img: "https://static.arasaac.org/pictograms/2568/2568_300.png" },
    { title: "¡Silencio!", instruction: "Suelta el aire muy despacio:", sound: "SSS-SSS", tip: "¡No saques la lengua!", img:"https://static.arasaac.org/pictograms/5936/5936_300.png"  },
    { title: "¡Siseo veloz!", instruction: "Ahora rápido como un rayo:", sound: "SA-SE-SI", tip: "¡Sonríe un poquito!" }
  ],
  semaforoPares: [
    // Plantilla para 10 pares mínimos con pictogramas.
    { 
      w1: "Sopa", s1: "Con S", i1_img: "https://static.arasaac.org/pictograms/2573/2573_300.png",
      w2: "Copa", s2: "Con C", i2_img: "https://static.arasaac.org/pictograms/2356/2356_300.png",
      target: 1 
    },
    { 
      w1: "Vaso", s1: "Con S", i1_img: "https://static.arasaac.org/pictograms/2610/2610_300.png",
      w2: "Bajo", s2: "Con J", i2_img: "https://static.arasaac.org/pictograms/4571/4571_300.png",
      target: 1 
    },
    { 
      w1: "Coso", s1: "Con S", i1_img: "https://static.arasaac.org/pictograms/2722/2722_300.png",
      w2: "Cojo", s2: "Con J", i2_img: "https://static.arasaac.org/pictograms/26952/26952_300.png",
      target: 1 
    },
    { 
      w1: "Oso", s1: "Con S", i1_img: "https://static.arasaac.org/pictograms/2488/2488_300.png",
      w2: "Ojo", s2: "Con J", i2_img: "https://static.arasaac.org/pictograms/6573/6573_300.png",
      target: 1 
    },
    { 
      w1: "Hueso", s1: "Con S", i1_img: "https://static.arasaac.org/pictograms/6528/6528_300.png",
      w2: "Huevo", s2: "Con V", i2_img: "https://static.arasaac.org/pictograms/2427/2427_300.png",
      target: 1 
    },
    { 
      w1: "Casa", s1: "Con S", i1_img: "https://static.arasaac.org/pictograms/2317/2317_300.png",
      w2: "Cama", s2: "Con M", i2_img: "https://static.arasaac.org/pictograms/2304/2304_300.png",
      target: 1 
    },
    { 
      w1: "Gasa", s1: "Con S", i1_img: "https://static.arasaac.org/pictograms/27794/27794_300.png",
      w2: "Gata", s2: "Con T", i2_img: "https://static.arasaac.org/pictograms/9881/9881_300.png",
      target: 1 
    },
    { 
      w1: "Peso", s1: "Con S", i1_img: "https://static.arasaac.org/pictograms/2655/2655_300.png",
      w2: "Pecho", s2: "Con CH", i2_img: "https://static.arasaac.org/pictograms/2853/2853_300.png",
      target: 1 
    },
    { 
      w1: "Cisne", s1: "Con S", i1_img: "https://static.arasaac.org/pictograms/2337/2337_300.png",
      w2: "Cine", s2: "Sin S", i2_img: "https://static.arasaac.org/pictograms/30387/30387_300.png",
      target: 1 
    },
    { 
      w1: "Pasta", s1: "Con S", i1_img: "https://static.arasaac.org/pictograms/8652/8652_300.png",
      w2: "Pata", s2: "Con T", i2_img: "https://static.arasaac.org/pictograms/28479/28479_300.png",
      target: 1 
    }
  ],
  pistaEcoTitle: "Suena o no suena con S",
  semaforoRadar: [],
  pistaEco: [
    { word: "Sopa" }, // 1
    { word: "Salchicha" }, // 2
    { word: "Arroz" }, // 3
    { word: "Lasaña" }, // 4
    { word: "Sémola" }, // 5
    { word: "Lechuga" }, // 6
    { word: "Sirope" }, // 7
    { word: "Pizarra" }, // 8
    { word: "Silla" }, // 9
    { word: "Mesa" }, // 10
    { word: "Seño" }, // 11
    { word: "Clase" }, // 12
    { word: "Patio" }, // 13
    { word: "Sillón" }, // 14
    { word: "Puerta" }, // 15
    { word: "Baño" }, // 16
    { word: "Salón" }, // 17
    { word: "Aseo" }, // 18
    { word: "Terraza" }, // 19
    { word: "Sofá" }, // 20
    { word: "Unicornio" }, // 21
    { word: "Superhéroe" }, // 22
    { word: "Bruja" }, // 23
    { word: "Sirena" }, // 24
    { word: "Superman" }, // 25
    { word: "Batman" }, // 26
    { word: "Superboy" }, // 27
    { word: "Dormir" }, // 28
    { word: "Saltar" }, // 29
    { word: "Hablar" }, // 30
    { word: "Pasear" }, // 31
    { word: "Comer" }, // 32
    { word: "Observar" }, // 33
    { word: "Saborear" }, // 34
    { word: "Tiburón" }, // 35
    { word: "Medusa" }, // 36
    { word: "Saltamontes" }, // 37
    { word: "Ardilla" }, // 38
    { word: "Gusano" }, // 39
    { word: "Dinosaurio" }, // 40
    { word: "Serpiente" }, // 41
    { word: "Terraza" }, // 42
    { word: "Sofá" }  // 43
  ],
  pistaDecir: [
    // Empiezan por S
    { word: "sal", img: "", category: "inicio" },
    { word: "sapo", img: "", category: "inicio" },
    { word: "sol", img: "", category: "inicio" },
    { word: "sofá", img: "", category: "inicio" },
    { word: "suma", img: "", category: "inicio" },
    { word: "suelo", img: "", category: "inicio" },
    { word: "seta", img: "", category: "inicio" },
    { word: "semáforo", img: "", category: "inicio" },
    { word: "silla", img: "", category: "inicio" },
    { word: "sirena", img: "", category: "inicio" },
    // Contienen S
    { word: "mesa", img: "", category: "contiene" },
    { word: "rosa", img: "", category: "contiene" },
    { word: "vaso", img: "", category: "contiene" },
    { word: "queso", img: "", category: "contiene" },
    { word: "asustar", img: "", category: "contiene" },
    { word: "basura", img: "", category: "contiene" },
    { word: "jersey", img: "", category: "contiene" },
    { word: "caseta", img: "", category: "contiene" },
    { word: "música", img: "", category: "contiene" },
    { word: "mesilla", img: "", category: "contiene" },
    // Acaban en S y posición inversa.
    { word: "bastón", img: "", category: "inversa" },
    { word: "más", img: "", category: "final" },
    { word: "bosque", img: "", category: "inversa" },
    { word: "dos", img: "", category: "final" },
    { word: "muslo", img: "", category: "inversa" },
    { word: "bus", img: "", category: "final" },
    { word: "escoba", img: "", category: "inversa" },
    { word: "mes", img: "", category: "final" },
    { word: "piscina", img: "", category: "inversa" },
    { word: "gas", img: "", category: "final" }
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
  ],
  pistaCompletar: [
    { phrase: "El animal que hace sss es la", word: "SERPIENTE" },
    { phrase: "Para sentarme uso la", word: "SILLA" },
    { phrase: "Por el día brilla el", word: "SOL" },
    { phrase: "Me gusta mucho comer", word: "SOPA" },
    { phrase: "Donde vivo es mi", word: "CASA" }
  ]
};
