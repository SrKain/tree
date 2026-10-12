import React from 'react';
import { motion, useReducedMotion, Variants } from 'motion/react';
import { EditorialLink } from '../data/links';

interface EditorialLinkRowProps {
  link: EditorialLink;
  isFirst?: boolean;
}

const EDITORIAL_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const EditorialLinkRow: React.FC<EditorialLinkRowProps> = ({
  link,
  isFirst = false,
}) => {
  const prefersReducedMotion = useReducedMotion();

  const rowVariants: Variants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 8,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.35,
        ease: EDITORIAL_EASE,
      },
    },
  };

  return (
    <motion.li variants={rowVariants} className="w-full">
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={link.ariaLabel}
        className={`group relative flex items-center justify-between gap-3 w-full min-h-[68px] sm:min-h-[72px] py-4 sm:py-5 px-1 -mx-1 rounded-[2px] ${
          isFirst ? 'border-t border-border-hairline' : ''
        } border-b border-border-hairline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary active:bg-bg-interactive/70 transition-colors duration-150 ease-editorial`}
      >
        {/* Linha divisória inferior ativa em cobre terroso (#8B4937) no hover e foco */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[-1px] left-0 right-0 h-[1px] bg-accent-primary origin-left scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100 transition-transform duration-200 ease-editorial"
        />

        {/* Zona Esquerda: Índice Editorial (01–04) + Traço Arquitetônico + Nome do Canal */}
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          {/* Número Editorial Tabular */}
          <span className="font-mono text-[11px] sm:text-[12px] tabular-nums text-text-muted group-hover:text-accent-primary group-focus-visible:text-accent-primary transition-colors duration-150 select-none shrink-0">
            {link.index}
          </span>

          {/* Divisória horizontal discreta */}
          <span
            aria-hidden="true"
            className="w-3 sm:w-4 h-[1px] bg-border-strong group-hover:bg-accent-primary group-focus-visible:bg-accent-primary transition-colors duration-150 shrink-0"
          />

          {/* Nome do Canal + Ponto Assinatura em Cobre */}
          <div className="flex items-baseline min-w-0">
            <span className="text-[16px] sm:text-[17px] font-medium tracking-[-0.015em] text-text-primary group-hover:text-accent-primary group-focus-visible:text-accent-primary transition-colors duration-150 whitespace-nowrap">
              {link.label}
            </span>
            <span
              aria-hidden="true"
              className="text-accent-primary font-semibold opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-150 ml-[1px]"
            >
              .
            </span>
          </div>
        </div>

        {/* Zona Direita: Informação Complementar Responsiva + Seta de Navegação Funcional */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0 shrink-0">
          <span className="text-[12px] sm:text-[12.5px] font-normal text-text-muted group-hover:text-text-secondary group-focus-visible:text-text-secondary transition-colors duration-150 tabular-nums truncate max-w-[135px] xs:max-w-[170px] sm:max-w-none">
            {link.subtitle}
          </span>

          {/* Seta linear com deslocamento sutil (compositor-only transform <= 200ms) */}
          <span
            aria-hidden="true"
            className="inline-flex items-center justify-center w-5 h-5 text-text-muted group-hover:text-accent-primary group-focus-visible:text-accent-primary transform group-hover:translate-x-1 group-focus-visible:translate-x-1 group-active:translate-x-1.5 transition-all duration-150 ease-editorial shrink-0"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current"
            >
              <path
                d="M2.5 8H13.5"
                strokeWidth="1.25"
                strokeLinecap="square"
              />
              <path
                d="M9 3.5L13.5 8L9 12.5"
                strokeWidth="1.25"
                strokeLinecap="square"
                strokeLinejoin="miter"
              />
            </svg>
          </span>
        </div>
      </a>
    </motion.li>
  );
};
