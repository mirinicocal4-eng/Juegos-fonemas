import React from 'react';

interface VisualContentProps {
  content: string | undefined;
  alt?: string;
  className?: string;
}

/**
 * Componente unificado para mostrar contenido visual.
 * Soporta:
 * 1. Emojis directos.
 * 2. URLs de imágenes externas (ARASAAC, etc).
 * 3. Palabras clave que deben convertirse a pictogramas de ARASAAC.
 */
export const VisualContent: React.FC<VisualContentProps> = ({ content, alt = '', className = '' }) => {
  if (!content) return null;

  // 1. Detectar si es un emoji (basado en el rango de caracteres o longitud corta)
  const isEmoji = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u.test(content) || 
                  (content.length <= 2 && content.charCodeAt(0) > 255);

  if (isEmoji) {
    return (
      <span className={className} role="img" aria-label={alt}>
        {content}
      </span>
    );
  }

  // 2. Detectar si es una URL (empieza por http o tiene formato de ruta de imagen)
  const isUrl = content.startsWith('http') || content.includes('/') || content.includes('.');

  if (isUrl) {
    return (
      <img 
        src={content} 
        alt={alt} 
        className={`${className} object-contain`}
        onError={(e) => {
          // Si falla la carga, intentamos tratarlo como palabra clave si no parece URL compleja
          if (!content.startsWith('http')) {
            (e.target as HTMLImageElement).src = `https://static.arasaac.org/pictograms/2309/${content.toLowerCase()}.png`;
          }
        }}
      />
    );
  }

  // 3. Si no es URL ni Emoji, lo tratamos como palabra clave de ARASAAC
  // Usamos el ID estándar de ARASAAC para búsquedas por nombre (aproximado)
  // Nota: En una implementación real, esto debería mapearse a IDs numéricos reales.
  const arasaacUrl = `https://static.arasaac.org/pictograms/2309/${content.toLowerCase()}.png`;

  return (
    <img 
      src={arasaacUrl} 
      alt={alt || content} 
      className={`${className} object-contain`}
      onError={(e) => {
        // Fallback final: mostrar un icono de imagen genérico o el texto
        const target = e.target as HTMLImageElement;
        target.style.display = 'none';
        const parent = target.parentElement;
        if (parent) {
          const textFallback = document.createElement('span');
          textFallback.innerText = '🖼️';
          textFallback.className = className;
          parent.appendChild(textFallback);
        }
      }}
    />
  );
};
