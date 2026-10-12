import React from 'react';

interface BrandMarkProps {
  size?: 'sm' | 'md';
  accentPeriod?: boolean;
  className?: string;
}

/**
 * Renderiza o wordmark institucional "iasin." estritamente em caixa baixa
 * com o ponto final preservado, utilizando a serifa editorial homologada no
 * ecossistema digital (Instrument Serif) e cores semânticas da marca.
 */
export const BrandMark: React.FC<BrandMarkProps> = ({
  size = 'md',
  accentPeriod = true,
  className = '',
}) => {
  const sizeClasses =
    size === 'sm'
      ? 'text-[20px] tracking-[-0.01em]'
      : 'text-[32px] sm:text-[36px] tracking-[-0.015em]';

  return (
    <span
      className={`inline-flex items-baseline font-serif font-normal text-text-primary leading-none select-none ${sizeClasses} ${className}`}
      aria-label="iasin."
    >
      <span>iasin</span>
      <span
        className={
          accentPeriod
            ? 'text-accent-primary transition-colors duration-150'
            : 'text-current'
        }
      >
        .
      </span>
    </span>
  );
};
