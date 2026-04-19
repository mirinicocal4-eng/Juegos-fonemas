export const isSpeechSynthesisSupported = (): boolean =>
  typeof window !== 'undefined' && 'speechSynthesis' in window;

export const getSpeechSynthesis = (): SpeechSynthesis | null =>
  isSpeechSynthesisSupported() ? window.speechSynthesis : null;

export const setupSpeechVoices = (
  setVoices: (voices: SpeechSynthesisVoice[]) => void
): (() => void) | undefined => {
  const synth = getSpeechSynthesis();
  if (!synth) return;

  const updateVoices = () => setVoices(synth.getVoices());
  updateVoices();
  synth.addEventListener('voiceschanged', updateVoices);

  return () => synth.removeEventListener('voiceschanged', updateVoices);
};

const createUtterance = (
  text: string,
  voices: SpeechSynthesisVoice[] = []
): SpeechSynthesisUtterance => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'es-ES';
  utterance.volume = 1;
  utterance.pitch = 1;
  utterance.rate = 0.95;

  const availableVoices = voices.length > 0 ? voices : getSpeechSynthesis()?.getVoices() || [];
  const esVoice = availableVoices.find((v) => v.lang.startsWith('es')) || availableVoices[0];

  if (esVoice) {
    utterance.voice = esVoice;
  }

  return utterance;
};

export const speakText = (
  text: string,
  voices: SpeechSynthesisVoice[] = [],
  onUnsupported?: () => void
): void => {
  const synth = getSpeechSynthesis();
  if (!synth) {
    onUnsupported?.();
    return;
  }

  const utterance = createUtterance(text, voices);
  const speak = () => {
    synth.cancel();
    synth.speak(utterance);
  };

  if (voices.length > 0) {
    speak();
    return;
  }

  const onVoicesChanged = () => {
    const updatedVoices = synth.getVoices();
    const esVoiceLoaded = updatedVoices.find((v) => v.lang.startsWith('es')) || updatedVoices[0];
    if (esVoiceLoaded) {
      utterance.voice = esVoiceLoaded;
    }
    speak();
    synth.removeEventListener('voiceschanged', onVoicesChanged);
  };

  synth.addEventListener('voiceschanged', onVoicesChanged);
};
