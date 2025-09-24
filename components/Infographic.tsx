import React from 'react';

interface InfographicProps {
  imageDataUrl: string | null;
  altText: string;
}

export const Infographic: React.FC<InfographicProps> = ({ imageDataUrl, altText }) => {
  if (!imageDataUrl) {
    return null; // Or a placeholder
  }

  return (
    <img
      id="infographic"
      src={imageDataUrl}
      alt={altText}
      className="w-full h-full object-contain"
    />
  );
};