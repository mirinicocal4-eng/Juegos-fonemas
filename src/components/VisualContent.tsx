import React from 'react';

interface VisualContentProps {
  content: string;
  className?: string;
}

export const VisualContent: React.FC<VisualContentProps> = ({ content, className }) => {
  const isImage = content.startsWith('http') || content.startsWith('data:image') || content.includes('/');

  if (isImage) {
    return (
      <img 
        src={content} 
        alt="" 
        className={`${className} object-contain`} 
        referrerPolicy="no-referrer" 
      />
    );
  }

  return <span className={className}>{content}</span>;
};
