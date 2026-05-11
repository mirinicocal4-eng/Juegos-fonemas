import { FraseLoca } from './types';

type BancoDatos = {
  [key in 's' | 'z' | 'r_suave' | 'rr_fuerte' | 'sinfones_r']: FraseLoca[];
};

export const DATA_LOGOPEDIA: BancoDatos = {
  s: [
    { id: 1, sujeto: 'El sapo', verbo: 'se esconde', complemento: 'en la cesta', sujetoImg: 'sapo', verboImg: 'esconder', complementoImg: 'cesta' },
    { id: 2, sujeto: 'El payaso', verbo: 'sonríe', complemento: 'a los niños', sujetoImg: 'payaso', verboImg: 'sonreír', complementoImg: 'niños' },
    { id: 3, sujeto: 'El señor', verbo: 'sopla', complemento: 'las velas', sujetoImg: 'señor', verboImg: 'soplar', complementoImg: 'velas' },
    { id: 4, sujeto: 'La princesa', verbo: 'sube', complemento: 'la escalera', sujetoImg: 'princesa', verboImg: 'subir', complementoImg: 'escalera' },
    { id: 5, sujeto: 'La profesora', verbo: 'escribe', complemento: 'el seis', sujetoImg: 'profesora', verboImg: 'escribir', complementoImg: 'seis' },
  ],
  z: [
    { id: 1, sujeto: 'El policía', verbo: 'cierra', complemento: 'la cancela', sujetoImg: 'policía', verboImg: 'cerrar', complementoImg: 'cancela' },
    { id: 2, sujeto: 'La actriz', verbo: 'danza ', complemento: 'en el escenario', sujetoImg: 'actriz', verboImg: 'danzar', complementoImg: 'escenario' },
    { id: 3, sujeto: 'El cazador ', verbo: 'caza', complemento: 'al ciervo', sujetoImg: 'cazador', verboImg: 'cazar', complementoImg: 'ciervo' },
    { id: 4, sujeto: 'La princesa', verbo: 'se deshace', complemento: 'la trenza', sujetoImg: 'princesa', verboImg: 'deshacer', complementoImg: 'trenza' },
    { id: 5, sujeto: 'El cocinero', verbo: 'cuece ', complemento: 'el arroz', sujetoImg: 'cocinero', verboImg: 'cocer', complementoImg: 'arroz' },
  ],
  r_suave: [
    { id: 1, sujeto: 'El torero', verbo: 'torea', complemento: 'el toro', sujetoImg: 'torero', verboImg: 'torear', complementoImg: 'toro' },
    { id: 2, sujeto: 'La peluquera', verbo: 'corta ', complemento: 'la barba', sujetoImg: 'peluquera', verboImg: 'cortar', complementoImg: 'barba' },
    { id: 3, sujeto: 'La jirafa', verbo: 'mira ', complemento: 'a la oruga', sujetoImg: 'jirafa', verboImg: 'mirar', complementoImg: 'oruga' },
    { id: 4, sujeto: 'El guardia ', verbo: 'para ', complemento: ' la furgoneta', sujetoImg: 'guardia', verboImg: 'parar', complementoImg: 'furgoneta' },
    { id: 5, sujeto: 'El pájaro ', verbo: 'duerme ', complemento: 'en el árbol', sujetoImg: 'pájaro', verboImg: 'dormir', complementoImg: 'árbol' },
  ],
  rr_fuerte: [
    { id: 1, sujeto: 'El barrendero', verbo: 'barre', complemento: 'la carretera', sujetoImg: 'barrendero', verboImg: 'barrer', complementoImg: 'carretera' },
    { id: 2, sujeto: 'El zorro', verbo: 'corre', complemento: 'por la sierra', sujetoImg: 'zorro', verboImg: 'correr', complementoImg: 'sierra' },
    { id: 3, sujeto: 'El rey', verbo: 'borra', complemento: 'la pizarra', sujetoImg: 'rey', verboImg: 'borrar', complementoImg: 'pizarra' },
    { id: 4, sujeto: 'El ruso', verbo: 'regala', complemento: 'una raqueta', sujetoImg: 'ruso', verboImg: 'regalar', complementoImg: 'raqueta' },
    { id: 5, sujeto: 'La reina ', verbo: 'riega', complemento: 'el rosal', sujetoImg: 'reina', verboImg: 'regar', complementoImg: 'rosal' },
  ],
  sinfones_r: [
    { id: 1, sujeto: 'El fotógrafo', verbo: 'retrata', complemento: 'a la princesa', sujetoImg: 'fotógrafo', verboImg: 'retratar', complementoImg: 'princesa' },
    { id: 2, sujeto: 'El ogro', verbo: 'grita', complemento: 'al dragón', sujetoImg: 'ogro', verboImg: 'gritar', complementoImg: 'dragón' },
    { id: 3, sujeto: 'El padre', verbo: 'frie', complemento: 'la croqueta', sujetoImg: 'padre', verboImg: 'freír', complementoImg: 'croqueta' },
    { id: 4, sujeto: 'El frutero', verbo: 'abre', complemento: 'la frutería', sujetoImg: 'frutero', verboImg: 'abrir', complementoImg: 'frutería' },
    { id: 5, sujeto: 'El grumete ', verbo: 'friega', complemento: 'el crucero', sujetoImg: 'grumete', verboImg: 'fregar', complementoImg: 'crucero' }
  ]
};
