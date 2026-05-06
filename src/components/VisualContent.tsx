import React, { useState, useEffect } from 'react';
import { getArasaacUrl } from '../utils/arasaac';

interface VisualContentProps {
  content?: string;
  className?: string;
  alt?: string;
}

export const VisualContent: React.FC<VisualContentProps> = ({ content, className, alt }) => {
  const [apiImg, setApiImg] = useState<string | null>(null);

  useEffect(() => {
    async function fetchImage() {
      if (!content || content.startsWith('http') || content.startsWith('data:image') || content.includes('/')) {
        setApiImg(null);
        return;
      }

      // Si el contenido es una palabra clave (no un enlace ni un emoji solo), buscamos en ARASAAC
      // Los emojis suelen tener longitud corta o caracteres especiales
      const isEmoji = content.length <= 4 && /\p{Emoji}/u.test(content);
      
      if (!isEmoji) {
        const url = await getArasaacUrl(content);
        setApiImg(url);
      } else {
        setApiImg(null);
      }
    }

    fetchImage();
  }, [content]);

  if (!content) {
    return <span className={className} />;
  }

  const isUrl = content.startsWith('http') || content.startsWith('data:image') || content.includes('/');
  const displaySrc = isUrl ? content : apiImg;

  if (displaySrc) {
    return (
      <img 
        src={displaySrc} 
        alt={alt ?? ''} 
        className={`${className} object-contain`} 
        referrerPolicy="no-referrer" 
      />
    );
  }

  return <span className={className}>{content}</span>;
};
