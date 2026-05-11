import React, { useState, useEffect } from 'react';
import { getArasaacUrl } from '../utils/arasaac';

interface VisualContentProps {
  content?: string;
  className?: string;
  alt?: string;
}

export const VisualContent: React.FC<VisualContentProps> = ({ content, className, alt = '' }) => {
  const [apiImg, setApiImg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchImage() {
      if (!content) {
        setApiImg(null);
        setError(false);
        return;
      }

      // Si ya es una URL, no hacemos nada
      if (content.startsWith('http') || content.startsWith('data:image') || content.includes('/')) {
        setApiImg(null);
        setError(false);
        return;
      }

      // Si es un emoji, no buscamos
      const isEmoji = content.length <= 4 && /\p{Emoji}/u.test(content);
      if (isEmoji) {
        setApiImg(null);
        setError(false);
        return;
      }

      // Si es un número (ID), construimos la URL directamente
      if (/^\d+$/.test(content)) {
        setApiImg(`https://static.arasaac.org/pictograms/${content}/${content}_300.png`);
        setError(false);
        return;
      }

      // Si es una palabra, buscamos en la API
      setLoading(true);
      setError(false);
      try {
        const url = await getArasaacUrl(content);
        if (url) {
          setApiImg(url);
        } else {
          setError(true);
        }
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchImage();
  }, [content]);

  if (!content) return null;

  const isUrl = content.startsWith('http') || content.startsWith('data:image') || content.includes('/');
  const displaySrc = isUrl ? content : apiImg;

  if (loading) {
    return <div className={`${className} animate-pulse bg-zinc-800 rounded-lg flex items-center justify-center text-xs text-zinc-500`}>Cargando...</div>;
  }

  if (displaySrc) {
    return (
      <img 
        src={displaySrc} 
        alt={alt} 
        className={`${className} object-contain`} 
        referrerPolicy="no-referrer"
        onError={() => setError(true)}
      />
    );
  }

  return (
    <div className={`${className} flex flex-col items-center justify-center gap-1`}>
      <span className="text-sm font-medium">{content}</span>
      {error && <span title="No se encontró imagen" className="text-amber-500 text-xs">⚠️</span>}
    </div>
  );
};
