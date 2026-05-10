import React, { useState, useEffect } from 'react';
import './PhonemeSimulator.css';

interface PhonemeSimulatorProps {
  phoneme: string;
  description: string;
  soundText?: string;
  videoUrl?: string;
  referenceUrl?: string;
}

const PhonemeSimulator: React.FC<PhonemeSimulatorProps> = ({ phoneme, description, soundText, videoUrl, referenceUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(1);

  const speak = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(soundText || phoneme);
      utterance.lang = 'es-ES';
      utterance.rate = 0.5;
      
      utterance.onstart = () => {
        setIsPlaying(true);
        setCurrentPhase(2);
      };
      utterance.onend = () => {
        setIsPlaying(false);
        setTimeout(() => setCurrentPhase(1), 800);
      };
      utterance.onerror = () => setIsPlaying(false);
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const getJawOffset = () => {
    if (currentPhase === 1) return 0;
    switch (phoneme.toLowerCase()) {
      case 'z':
      case 'c': return 12;
      case 's': return 4;
      case 'r':
      case 'fonema r suave': return 6;
      default: return 0;
    }
  };

  const getTonguePath = () => {
    if (currentPhase === 1) {
      return "M 180,280 C 180,260 160,250 140,250 L 150,250 C 170,250 230,260 230,280 Z";
    }
    
    const isR = phoneme.toLowerCase() === 'r' || phoneme.toLowerCase().includes('r suave');
    
    switch (true) {
      case phoneme.toLowerCase() === 'z' || phoneme.toLowerCase() === 'c':
        return "M 180,280 C 180,240 140,205 105,190 L 115,185 C 130,205 230,240 230,280 Z";
      case phoneme.toLowerCase() === 's':
        // S: El ápice toca los alvéolos inferiores (punto bajo)
        return "M 180,280 C 180,260 150,230 115,220 L 125,220 C 140,230 230,260 230,280 Z";
      case isR && currentPhase === 2:
        // R Fase 2: El ápice toca los alvéolos
        return "M 180,280 C 180,230 150,170 135,165 L 145,165 C 160,185 230,240 230,280 Z";
      case isR && currentPhase === 3:
        // R Fase 3: El ápice desciende
        return "M 180,280 C 180,230 150,190 135,200 L 145,200 C 160,210 230,240 230,280 Z";
      case phoneme.toLowerCase().includes('sinfones') && currentPhase === 2:
        // Sinfones: Transición rápida al punto de la R
        return "M 180,280 C 180,230 150,170 135,165 L 145,165 C 160,185 230,240 230,280 Z";
      default:
        return "M 180,280 C 180,240 150,220 140,220 L 150,220 C 160,220 230,240 230,280 Z";
    }
  };

  const phases = phoneme.toLowerCase().includes('r') || phoneme.toLowerCase().includes('sinfones') ? [1, 2, 3] : [1, 2];

  return (
    <div className="phoneme-simulator">
      <div className="simulator-header">
        <span className="phoneme-label">{phoneme.toUpperCase()}</span>
        <div className="phase-indicator">
          {phases.map(p => (
            <button 
              key={p} 
              onClick={() => setCurrentPhase(p)}
              className={`phase-dot ${currentPhase === p ? 'active' : ''}`}
            >
              Fase {p}
            </button>
          ))}
        </div>
      </div>
      
      <div className="simulator-container">
        <svg className="simulator-svg" viewBox="0 0 400 400">
          <defs>
            <linearGradient id="tongueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#ff85a1', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#c9184a', stopOpacity: 1 }} />
            </linearGradient>
          </defs>

          <path fill="#f8f9fa" d="M 50,20 L 350,20 L 350,380 L 50,380 Z" />
          <path fill="#e9ecef" d="M 280,380 L 280,200 Q 280,150 250,120 L 320,120 L 320,380 Z" />
          <path fill="#dee2e6" d="M 100,150 C 120,120 200,120 250,150 L 250,135 C 200,105 120,105 100,135 Z" />
          <path className="skin" d="M 80,20 Q 85,80 70,110 Q 55,120 60,140 Q 65,150 100,150" fill="none" stroke="#f3d2c1" strokeWidth="15" />
          
          <path fill="#e5989b" d="M 250,150 Q 280,155 285,185 Q 280,195 270,190 Q 265,175 250,165 Z" 
                style={{ transform: currentPhase === 2 ? 'rotate(-10deg)' : 'none', transformOrigin: '250px 150px', transition: 'transform 0.5s' }} />

          <path className="teeth" d="M 115,150 Q 115,180 125,180 Q 135,180 135,150 Z" stroke="#ccc" fill="white" />

          <g style={{ transform: `translateY(${getJawOffset()}px)`, transition: 'transform 0.5s' }}>
            <path className="skin" d="M 100,230 Q 70,230 60,205 Q 55,185 70,175" fill="none" stroke="#f3d2c1" strokeWidth="12" />
            <path className="teeth" d="M 115,225 Q 115,195 125,195 Q 135,195 135,225 Z" stroke="#ccc" fill="white" />
            <path className="skin" d="M 100,230 Q 110,320 200,340" fill="none" stroke="#f3d2c1" strokeWidth="18" />
          </g>

          <path 
            className={`tongue ${phoneme.toLowerCase().includes('rr') && currentPhase === 2 ? 'vibrate' : ''}`} 
            d={getTonguePath()} 
            fill="url(#tongueGradient)" 
            stroke="#c9184a" 
            strokeWidth="2" 
          />
          
          <path 
            className={`air-flow ${isPlaying ? 'active' : ''}`} 
            d={phoneme.toLowerCase() === 'z' || phoneme.toLowerCase() === 'c' 
              ? "M 250,220 Q 180,180 90,195" 
              : "M 250,220 Q 180,160 120,175"
            }
            stroke="#48cae4" strokeWidth="6" strokeDasharray="10" fill="none" opacity={isPlaying ? 1 : 0} 
          />

          <g fontSize="10" fontWeight="bold" opacity="0.6">
            <text x="180" y="115">PALADAR</text>
            <text x="180" y="310">LENGUA</text>
            <text x="75" y="195">DIENTES</text>
          </g>
        </svg>
      </div>

      <div className="simulator-info">
        <p className="description-text">{description}</p>
        <div className="flex gap-3 justify-center">
          <button className="play-voice-btn" onClick={speak}>
            {isPlaying ? '🔊 Escuchando...' : '▶️ Reproducir Sonido'}
          </button>
          {videoUrl && (
            <a 
              href={videoUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="play-voice-btn bg-red-600 hover:bg-red-700"
            >
              📺 Ver Video
            </a>
          )}
          {referenceUrl && (
            <a 
              href={referenceUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="play-voice-btn bg-indigo-600 hover:bg-indigo-700"
            >
              🔗 Más info
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhonemeSimulator;
