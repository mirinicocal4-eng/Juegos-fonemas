// Speech Recognition Helper for Browser Web Speech API

// Extiende Window para navegadores con prefijo webkit
interface IWindow extends Window {
  webkitSpeechRecognition?: any;
  SpeechRecognition?: any;
}

export const isSpeechRecognitionSupported = (): boolean => {
  if (typeof window === 'undefined') return false;
  const win = window as unknown as IWindow;
  return Boolean(win.SpeechRecognition || win.webkitSpeechRecognition);
};

export const startListening = (
  expectedText: string,
  onResult: (isMatch: boolean, recognizedText: string) => void,
  onError?: (error: string) => void,
  onEnd?: () => void
): (() => void) => {
  if (!isSpeechRecognitionSupported()) {
    onError?.('El reconocimiento de voz no está soportado en este navegador. Te recomendamos usar Google Chrome o Microsoft Edge.');
    return () => {};
  }

  const win = window as unknown as IWindow;
  const SpeechRecognitionClass = win.SpeechRecognition || win.webkitSpeechRecognition;
  const recognition = new SpeechRecognitionClass();

  recognition.lang = 'es-ES';
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.maxAlternatives = 3;

  const normalize = (t: string) =>
    t.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '')
      .trim();

  const targetClean = normalize(expectedText);

  let answered = false;

  recognition.onresult = (event: any) => {
    answered = true;
    const alternatives: string[] = [];
    for (let i = 0; i < event.results[0].length; i++) {
      alternatives.push(event.results[0][i].transcript);
    }

    const recognized = alternatives[0] || '';
    const isMatch = alternatives.some((alt) => {
      const cleanAlt = normalize(alt);
      return cleanAlt.includes(targetClean) || targetClean.includes(cleanAlt);
    });

    onResult(isMatch, recognized);
  };

  recognition.onerror = (event: any) => {
    if (event.error === 'no-speech') {
      onError?.('No se ha detectado sonido. ¡Habla cerca del micro!');
    } else if (event.error === 'not-allowed') {
      onError?.('Permiso de micrófono denegado. Permite el acceso al micrófono en el navegador.');
    } else {
      onError?.(`Error de audio: ${event.error}`);
    }
  };

  recognition.onend = () => {
    if (!answered) {
      onEnd?.();
    }
  };

  try {
    recognition.start();
  } catch (err: any) {
    onError?.('No se pudo activar el micrófono.');
  }

  // Devuelve la función para cancelar si el usuario vuelve a hacer clic
  return () => {
    try {
      recognition.abort();
    } catch {}
  };
};

