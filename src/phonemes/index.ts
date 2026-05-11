import { R_PHONEME_DATA } from './R';
import { RR_PHONEME_DATA } from './RR';
import { S_PHONEME_DATA } from './S';
import { Z_PHONEME_DATA } from './Z';
import { SINFONES_PHONEME_DATA } from './SINFONES';
import { Phoneme, PhonemeContent } from '../types';

export const PHONEME_DATA: Record<Phoneme, PhonemeContent> = {
  R: R_PHONEME_DATA,
  RR: RR_PHONEME_DATA,
  S: S_PHONEME_DATA,
  Z: Z_PHONEME_DATA,
  SINFONES: SINFONES_PHONEME_DATA,
};
