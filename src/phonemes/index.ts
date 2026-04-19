import { R_PHONEME_DATA } from './R';
import { RR_PHONEME_DATA } from './RR';
import { S_PHONEME_DATA } from './S';
import { Z_PHONEME_DATA } from './Z';
import {
  BR_PHONEME_DATA,
  PR_PHONEME_DATA,
  TR_PHONEME_DATA,
  DR_PHONEME_DATA,
  GR_PHONEME_DATA,
  CR_PHONEME_DATA,
  FR_PHONEME_DATA
} from './SINFONES';
import { Phoneme, PhonemeContent } from '../types';

export const PHONEME_DATA: Record<Phoneme, PhonemeContent> = {
  R: R_PHONEME_DATA,
  RR: RR_PHONEME_DATA,
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
