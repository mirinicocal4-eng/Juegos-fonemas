import { PhonemeContent } from '../types';

export const S_PHONEME_DATA: PhonemeContent = {
  name: 'Fonema S',
  color: 'blue',
  taller: [
    { title: "¡La Serpiente!", instruction: "Dientes juntos y deja salir el aire:", sound: "S-S-S-S", tip: "¡Como si mandaras callar!", img: "serpiente" },
    { title: "¡Silencio!", instruction: "Suelta el aire muy despacio:", sound: "SSS-SSS", tip: "¡No saques la lengua!", img: "silencio" },
    { title: "¡Siseo veloz!", instruction: "Ahora rápido como un rayo:", sound: "SA-SE-SI", tip: "¡Sonríe un poquito!", img: "rayo" }
  ],
  semaforoPares: [
    // Plantilla para 10 pares mínimos con pictogramas.
    { 
      w1: "Sopa", s1: "Con S", i1_img: "SOPA",
      w2: "Copa", s2: "Con C", i2_img: "COPA",
      target: 1 
    },
    { 
      w1: "Vaso", s1: "Con S", i1_img: "VASO",
      w2: "Bajo", s2: "Con J", i2_img: "BAJO",
      target: 1 
    },
    { 
      w1: "Coso", s1: "Con S", i1_img: "COSO",
      w2: "Cojo", s2: "Con J", i2_img: "COJO",
      target: 1 
    },
    { 
      w1: "Oso", s1: "Con S", i1_img: "OSO",
      w2: "Ojo", s2: "Con J", i2_img: "OJO",
      target: 1 
    },
    { 
      w1: "Hueso", s1: "Con S", i1_img: "HUESO",
      w2: "Huevo", s2: "Con V", i2_img: "HUEVO",
      target: 1 
    },
    { 
      w1: "Casa", s1: "Con S", i1_img: "CASA",
      w2: "Cama", s2: "Con M", i2_img: "CAMA",
      target: 1 
    },
    { 
      w1: "Gasa", s1: "Con S", i1_img: "GASA",
      w2: "Gata", s2: "Con T", i2_img: "GATA",
      target: 1 
    },
    { 
      w1: "Peso", s1: "Con S", i1_img: "PESO",
      w2: "Pecho", s2: "Con CH", i2_img: "PECHO",
      target: 1 
    },
    { 
      w1: "Cisne", s1: "Con S", i1_img: "CISNE",
      w2: "Cine", s2: "Sin S", i2_img: "CINE",
      target: 1 
    },
    { 
      w1: "Pasta", s1: "Con S", i1_img: "PASTA",
      w2: "Pata", s2: "Con T", i2_img: "PATA",
      target: 1 
    }
  ],
  semaforoRadar: {
    title: "Suena o no suena con S",
    items: [
      { word: "Sopa", img: "Sopa", hasTarget: true },
      { word: "Silla", img: "Silla", hasTarget: true },
      { word: "Sol", img: "Sol", hasTarget: true },
      { word: "Saco", img: "Saco", hasTarget: true },
      { word: "Setas", img: "Setas", hasTarget: true },
      { word: "Sapo", img: "Sapo", hasTarget: true },
      { word: "Sirena", img: "Sirena", hasTarget: true },
      { word: "Siete", img: "Siete", hasTarget: true },
      { word: "Sofá", img: "Sofá", hasTarget: true },
      { word: "Sandía", img: "Sandía", hasTarget: true },
      { word: "Semáforo", img: "Semáforo", hasTarget: true },
      { word: "Serpiente", img: "Serpiente", hasTarget: true },
      { word: "Gato", img: "Gato", hasTarget: false },
      { word: "Pato", img: "Pato", hasTarget: false },
      { word: "Mano", img: "Mano", hasTarget: false },
      { word: "Vaso", img: "Vaso", hasTarget: true },
      { word: "Casa", img: "Casa", hasTarget: true },
      { word: "Oso", img: "Oso", hasTarget: true },
      { word: "Queso", img: "Queso", hasTarget: true },
      { word: "Mesa", img: "Mesa", hasTarget: true },
      { word: "Payaso", img: "Payaso", hasTarget: true },
      { word: "Beso", img: "Beso", hasTarget: true },
      { word: "Camiseta", img: "Camiseta", hasTarget: true },
      { word: "Luna", img: "Luna", hasTarget: false },
      { word: "Nube", img: "Nube", hasTarget: false },
      { word: "Pelo", img: "Pelo", hasTarget: false },
      { word: "Bota", img: "Bota", hasTarget: false },
      { word: "Copa", img: "Copa", hasTarget: false },
      { word: "Dedo", img: "Dedo", hasTarget: false },
      { word: "Ojo", img: "Ojo", hasTarget: false },
      { word: "Piña", img: "Piña", hasTarget: false },
      { word: "Yogur", img: "Yogur", hasTarget: false }
    ]
  },
  pistaDecir: [
    // Empiezan por S
    { word: "sal", img: "sal", category: "inicio" },
    { word: "sapo", img: "sapo", category: "inicio" },
    { word: "sol", img: "sol", category: "inicio" },
    { word: "sofá", img: "sofá", category: "inicio" },
    { word: "suma", img: "suma", category: "inicio" },
    { word: "suelo", img: "suelo", category: "inicio" },
    { word: "seta", img: "seta", category: "inicio" },
    { word: "semáforo", img: "semáforo", category: "inicio" },
    { word: "silla", img: "silla", category: "inicio" },
    { word: "sirena", img: "sirena", category: "inicio" },
    // Contienen S
    { word: "mesa", img: "mesa", category: "contiene" },
    { word: "rosa", img: "rosa", category: "contiene" },
    { word: "vaso", img: "vaso", category: "contiene" },
    { word: "queso", img: "queso", category: "contiene" },
    { word: "asustar", img: "asustar", category: "contiene" },
    { word: "basura", img: "basura", category: "contiene" },
    { word: "jersey", img: "jersey", category: "contiene" },
    { word: "caseta", img: "caseta", category: "contiene" },
    { word: "música", img: "música", category: "contiene" },
    { word: "mesilla", img: "mesilla", category: "contiene" },
    // Acaban en S y posición inversa.
    { word: "bastón", img: "bastón", category: "inversa" },
    { word: "más", img: "más", category: "final" },
    { word: "bosque", img: "bosque", category: "inversa" },
    { word: "dos", img: "dos", category: "final" },
    { word: "muslo", img: "muslo", category: "inversa" },
    { word: "autobús", img: "autobús", category: "final" },
    { word: "escoba", img: "escoba", category: "inversa" },
    { word: "mes", img: "mes", category: "final" },
    { word: "piscina", img: "piscina", category: "inversa" },
    { word: "gas", img: "gas", category: "final" }
  ],
  gameImages: [
    { img: "SAPO", name: "SAPO" }, { img: "SILLA", name: "SILLA" }, { img: "SOL", name: "SOL" }, { img: "OSO", name: "OSO" },
    { img: "CASA", name: "CASA" }, { img: "SOPA", name: "SOPA" }, { img: "SÁNDWICH", name: "SÁNDWICH" }, { img: "SAL", name: "SAL" },
    { img: "SACO", name: "SACO" }, { img: "SOFÁ", name: "SOFÁ" }, { img: "SIRENA", name: "SIRENA" }, { img: "ISLA", name: "ISLA" },
    { img: "ESCALERA", name: "ESCALERA" }, { img: "ESTRELLA", name: "ESTRELLA" }, { img: "PASTEL", name: "PASTEL" }, { img: "SERPIENTE", name: "SERPIENTE" },
    { img: "SANDÍA", name: "SANDÍA" }, { img: "SOMBRERO", name: "SOMBRERO" }, { img: "SEIS", name: "SEIS" }, { img: "CESTA", name: "CESTA" },
    { img: "MESA", name: "MESA" }, { img: "CAMISA", name: "CAMISA" }, { img: "BOLSA", name: "BOLSA" }, { img: "QUESO", name: "QUESO" },
    { img: "HUESO", name: "HUESO" }, { img: "TENIS", name: "TENIS" }, { img: "AUTOBÚS", name: "AUTOBÚS" }, { img: "GUANTES", name: "GUANTES" },
    { img: "SETA", name: "SETA" }, { img: "JABÓN", name: "JABÓN" }
  ],
  pistaFrases: [
    "Esta sandía está riquísima.",
    "Suso salta a la piscina.",
    "El socorrista está en la playa.",
    "Sofía sopla las velas de su pastel.",
    "Llevamos la sombrilla a la playa.",
    "Ayer fuimos a buscar setas al bosque.",
    "El policía tiene un silbato.",
    "Silvia está sentada en la silla",
    "El sábado iremos a casa de Sara.",
    "El vaso está lleno de agua",
    "El sapo salta de piedra en piedra",
    "El bocadillo es de chorizo y queso",
    "En el zoo vimos a un oso",
    "Sara cumple siete años",
    "El niño salta a la comba",
    "La sopa está caliente",
    "En mi cumple soplo las velas",
    "Esta silla es de color verde",

  ],
  pistaTrabalenguas: [
    "Si la sierva que te sirve, no te sirve como sierva, de qué sirve que te sirvas de una sierva que no sirve.",
    "Sancha saca su saco seco al sol, para que el sol seque el saco seco de Sancha.",
    "Sofía suelta su saco, Sofía suelta su saco, su saco suelta su seda, si Sofía suelta su saco, su saco sin su seda se queda!",
  ],
  pistaCompletar: [
    { phrase: "Por la noche sale la luna y por el día sale el...", word: "SOL" },
    { phrase: "Aceite, vinagre y...", word: "SAL" },
    { phrase: "El día de la semana que va después del viernes es el...", word: "SÁBADO" },
    { phrase: "Lo contrario de no es...", word: "SÍ" },
    { phrase: "Después del número  seis va el número...", word: "SIETE" },
    { phrase: "Lo contrario de bajar es...", word: "SUBIR" },
    { phrase: "En la playa nos protegemos del sol gracias a la...", word: "SOMBRILLA" },
    { phrase: "Después del mes de agosto va el mes de...", word: "SEPTIEMBRE" },
    { phrase: "Las cartas se envían por correo con un", word: "SELLO" },
    { phrase: "El lunes, martes, miércoles, jueves, viernes, sábado y domingo forman una...", word: "SEMANA" }
  ]
};
