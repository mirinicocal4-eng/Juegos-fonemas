import React from 'react';

interface VisualContentProps {
  content?: string;
  className?: string;
  alt?: string;
}

export const VisualContent: React.FC<VisualContentProps> = ({ content, className, alt }) => {
  if (!content) {
    return <span className={className} />;
  }

  const isImage = content.startsWith('http') || content.startsWith('data:image') || content.includes('/');

  if (isImage) {
    return (
      <img 
        src={content} 
        alt={alt ?? ''} 
        className={`${className} object-contain`} 
        referrerPolicy="no-referrer" 
      />
    );
  }

  return <span className={className}>{content}</span>;
};
