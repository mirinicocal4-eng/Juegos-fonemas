import React, { useState, useEffect } from 'react';

interface VisualContentProps {
  content: string | undefined;
  alt?: string;
  className?: string;
}

/**
 * Componente unificado para mostrar contenido visual.
 * Soporta:
 * 1. Emojis directos.
 * 2. URLs de imágenes externas.
 * 3. Palabras clave que se resuelven a través de la API de ARASAAC.
 */
export const VisualContent: React.FC<VisualContentProps> = ({ content, alt = '', className = '' }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!content) return;

    // Reiniciamos estado cuando cambia el contenido
    setError(false);
    setImageUrl(null);

    // 1. Detectar si es un emoji
    const isEmoji = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u.test(content) || 
                    (content.length <= 2 && content.charCodeAt(0) > 255);

    if (isEmoji) {
      return; // No necesitamos URL
    }

    // 2. Detectar si es una URL
    const isUrl = content.startsWith('http') || content.includes('/') || content.includes('.');
    if (isUrl) {
      setImageUrl(content);
      return;
    }

    // 3. Consultar la API de ARASAAC
    const fetchArasaac = async () => {
      try {
        const response = await fetch(`https://api.arasaac.org/api/pictograms/es/search/${encodeURIComponent(content.toLowerCase())}`);
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            // Construir la URL estática con el ID real
            const pictoId = data[0]._id;
            setImageUrl(`https://static.arasaac.org/pictograms/${pictoId}/${pictoId}_300.png`);
            return;
          }
        }
        setError(true);
      } catch (err) {
        console.error('Error fetching ARASAAC picto:', err);
        setError(true);
      }
    };

    fetchArasaac();
  }, [content]);

  if (!content) return null;

  const isEmoji = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u.test(content) || 
                  (content.length <= 2 && content.charCodeAt(0) > 255);

  if (isEmoji) {
    return (
      <span className={className} role="img" aria-label={alt}>
        {content}
      </span>
    );
  }

  if (error) {
    return (
      <span className={`${className} flex items-center justify-center bg-zinc-800/50 rounded-lg text-2xl`} title={content}>
        🖼️
      </span>
    );
  }

  if (!imageUrl) {
    return (
      <span className={`${className} flex items-center justify-center bg-zinc-800/50 rounded-lg text-sm text-zinc-500 animate-pulse`} title={content}>
        ⏳
      </span>
    );
  }

  return (
    <img 
      src={imageUrl} 
      alt={alt || content} 
      className={`${className} object-contain`}
      onError={() => setError(true)}
    />
  );
};
