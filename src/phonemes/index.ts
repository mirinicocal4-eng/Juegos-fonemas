import { R_PHONEME_DATA } from './R';
import { S_PHONEME_DATA } from './S';
import { Z_PHONEME_DATA } from './Z';
import { BR_PHONEME_DATA } from './BR';
import { PR_PHONEME_DATA } from './PR';
import { TR_PHONEME_DATA } from './TR';
import { DR_PHONEME_DATA } from './DR';
import { GR_PHONEME_DATA } from './GR';
import { CR_PHONEME_DATA } from './CR';
import { FR_PHONEME_DATA } from './FR';
import { Phoneme, PhonemeContent } from '../types';

export const PHONEME_DATA: Record<Phoneme, PhonemeContent> = {
  R: R_PHONEME_DATA,
  S: S_PHONEME_DATA,
  Z: Z_PHONEME_DATA,
  BR: BR_PHONEME_DATA,
  PR: PR_PHONEME_DATA,
  TR: TR_PHONEME_DATA,
  DR: DR_PHONEME_DATA,
  GR: GR_PHONEME_DATA,
  CR: CR_PHONEME_DATA,
  FR: FR_PHONEME_DATA,
};
