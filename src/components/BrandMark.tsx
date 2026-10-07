import React from 'react';

interface BrandMarkProps {
  size?: 'sm' | 'md';
  className?: string;
}

/**
 * Renders the "iasin." brand mark strictly in lowercase with the signature period,
 * set in Instrument Serif to match the official iasin.dev.br visual identity.
 */
export const BrandMark: React.FC<BrandMarkProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses =
    size === 'sm'
      ? 'text-[19px] tracking-[-0.01em]'
      : 'text-[28px] sm:text-[32px] tracking-[-0.015em]';

  return (
    <span
      className={`inline-flex items-baseline font-serif font-normal text-[#0A0A0A] leading-none select-none ${sizeClasses} ${className}`}
      aria-label="iasin."
    >
      <span>iasin.</span>
    </span>
  );
};
