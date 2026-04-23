import { FraseLoca } from './types';

type BancoDatos = {
  [key in 's' | 'z' | 'r_suave' | 'rr_fuerte' | 'sinfones_r']: FraseLoca[];
};

export const DATA_LOGOPEDIA: BancoDatos = {
  s: [
    { id: 1, sujeto: 'Sara', verbo: 'salta', complemento: 'sobre la silla', sujetoImg: 'niña', verboImg: 'saltar', complementoImg: 'silla' },
    { id: 2, sujeto: 'Sapo', verbo: 'sirve', complemento: 'la sopa', sujetoImg: 'sapo', verboImg: 'servir', complementoImg: 'sopa' },
    { id: 3, sujeto: 'Sol', verbo: 'sigue', complemento: 'la sombra', sujetoImg: 'sol', verboImg: 'seguir', complementoImg: 'sombra' },
    { id: 4, sujeto: 'Señora', verbo: 'sonríe', complemento: 'al sueño', sujetoImg: 'señora', verboImg: 'sonreír', complementoImg: 'dormir' },
    { id: 5, sujeto: 'Sillas', verbo: 'se mueven', complemento: 'en el salón', sujetoImg: 'sillas', verboImg: 'mover', complementoImg: 'salón' },
    { id: 6, sujeto: 'Samira', verbo: 'saca', complemento: 'sus zapatos', sujetoImg: 'niña', verboImg: 'sacar', complementoImg: 'zapatos' }
  ],
  z: [
    { id: 1, sujeto: 'Zoe', verbo: 'zumba', complemento: 'con la zebra', sujetoImg: 'niña', verboImg: 'zumbido', complementoImg: 'cebra' },
    { id: 2, sujeto: 'Zorro', verbo: 'caza', complemento: 'la zanahoria', sujetoImg: 'zorro', verboImg: 'cazar', complementoImg: 'zanahoria' },
    { id: 3, sujeto: 'Zafiro', verbo: 'reza', complemento: 'por la pizza', sujetoImg: 'niño', verboImg: 'rezar', complementoImg: 'pizza' },
    { id: 4, sujeto: 'Zeta', verbo: 'zurce', complemento: 'la camiseta', sujetoImg: 'niña', verboImg: 'zurcir', complementoImg: 'camiseta' },
    { id: 5, sujeto: 'Zanahoria', verbo: 'cae', complemento: 'en la taza', sujetoImg: 'zanahoria', verboImg: 'caer', complementoImg: 'taza' },
    { id: 6, sujeto: 'Zapato', verbo: 'pasa', complemento: 'por la plaza', sujetoImg: 'zapato', verboImg: 'pasar', complementoImg: 'plaza' }
  ],
  r_suave: [
    { id: 1, sujeto: 'Rosa', verbo: 'riega', complemento: 'la rama', sujetoImg: 'rosa', verboImg: 'regar', complementoImg: 'rama' },
    { id: 2, sujeto: 'Ratón', verbo: 'rompe', complemento: 'la regla', sujetoImg: 'ratón', verboImg: 'romper', complementoImg: 'regla' },
    { id: 3, sujeto: 'Rita', verbo: 'recorta', complemento: 'el reloj', sujetoImg: 'niña', verboImg: 'recortar', complementoImg: 'reloj' },
    { id: 4, sujeto: 'Rana', verbo: 'corre', complemento: 'cerca del río', sujetoImg: 'rana', verboImg: 'correr', complementoImg: 'río' },
    { id: 5, sujeto: 'Reina', verbo: 'ruega', complemento: 'por la roca', sujetoImg: 'reina', verboImg: 'rogar', complementoImg: 'roca' },
    { id: 6, sujeto: 'Reloj', verbo: 'marca', complemento: 'la hora', sujetoImg: 'reloj', verboImg: 'marcar', complementoImg: 'hora' }
  ],
  rr_fuerte: [
    { id: 1, sujeto: 'Perro', verbo: 'corre', complemento: 'por la carrera', sujetoImg: 'perro', verboImg: 'correr', complementoImg: 'carrera' },
    { id: 2, sujeto: 'Carro', verbo: 'arrastra', complemento: 'la caja', sujetoImg: 'carro', verboImg: 'arrastrar', complementoImg: 'caja' },
    { id: 3, sujeto: 'Burro', verbo: 'barre', complemento: 'la granja', sujetoImg: 'burro', verboImg: 'barrer', complementoImg: 'granja' },
    { id: 4, sujeto: 'Gorro', verbo: 'aterriza', complemento: 'en la tarima', sujetoImg: 'gorro', verboImg: 'aterrizar', complementoImg: 'tarima' },
    { id: 5, sujeto: 'Torre', verbo: 'arroja', complemento: 'la pelota', sujetoImg: 'torre', verboImg: 'arrojar', complementoImg: 'pelota' },
    { id: 6, sujeto: 'Tierra', verbo: 'gira', complemento: 'en la tierra', sujetoImg: 'tierra', verboImg: 'girar', complementoImg: 'tierra' }
  ],
  sinfones_r: [
    { id: 1, sujeto: 'Bruno', verbo: 'brinca', complemento: 'con la brocha', tipo: 'br', sujetoImg: 'niño', verboImg: 'brincar', complementoImg: 'brocha' },
    { id: 2, sujeto: 'Cristina', verbo: 'corta', complemento: 'la crema', tipo: 'cr', sujetoImg: 'niña', verboImg: 'cortar', complementoImg: 'crema' },
    { id: 3, sujeto: 'Dragón', verbo: 'drena', complemento: 'la arena', tipo: 'dr', sujetoImg: 'dragón', verboImg: 'drenar', complementoImg: 'arena' },
    { id: 4, sujeto: 'Frida', verbo: 'friega', complemento: 'la fresa', tipo: 'fr', sujetoImg: 'niña', verboImg: 'fregar', complementoImg: 'fresa' },
    { id: 5, sujeto: 'Gracia', verbo: 'graba', complemento: 'la grulla', tipo: 'gr', sujetoImg: 'niña', verboImg: 'grabar', complementoImg: 'grulla' },
    { id: 6, sujeto: 'Prado', verbo: 'prepara', complemento: 'la pradera', tipo: 'pr', sujetoImg: 'pradera', verboImg: 'preparar', complementoImg: 'pradera' },
    { id: 7, sujeto: 'Trapo', verbo: 'traza', complemento: 'la trenza', tipo: 'tr', sujetoImg: 'trapo', verboImg: 'trazar', complementoImg: 'trenza' }
  ]
};
