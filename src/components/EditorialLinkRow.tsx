import React from 'react';
import { motion, useReducedMotion, Variants } from 'motion/react';
import { EditorialLink } from '../data/links';

interface EditorialLinkRowProps {
  link: EditorialLink;
  isFirst?: boolean;
}

const EDITORIAL_EASE: [number, number, number, number] = [0.77, 0, 0.175, 1];

export const EditorialLinkRow: React.FC<EditorialLinkRowProps> = ({ link, isFirst = false }) => {
  const prefersReducedMotion = useReducedMotion();

  const rowVariants: Variants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 16,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.2 : 0.55,
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
        className={`group relative flex items-center justify-between w-full min-h-[68px] sm:min-h-[72px] py-4 sm:py-5 ${
          isFirst ? 'border-t border-[#E6E5E0]' : ''
        } border-b border-[#E6E5E0] focus-visible:outline-none focus-visible:bg-[#F2F1ED]/70 active:bg-[#F2F1ED] transition-colors duration-200 ease-editorial`}
      >
        {/* Active hairline overlay that draws across on hover/focus */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[-1px] left-0 right-0 h-[1px] bg-[#0A0A0A] origin-left scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100 transition-transform duration-300 ease-editorial"
        />

        {/* Left Zone: Index + Graphic Dash + Link Name */}
        <div className="flex items-center gap-3.5 sm:gap-4 min-w-0 pr-3">
          {/* Tabular Number Index */}
          <span className="font-mono text-[11px] sm:text-[12px] tabular-nums text-[#8F8F8A] group-hover:text-[#0A0A0A] group-focus-visible:text-[#0A0A0A] transition-colors duration-200 select-none shrink-0">
            {link.index}
          </span>

          {/* Editorial Dash (—) with subtle elongation on hover */}
          <span
            aria-hidden="true"
            className="w-3.5 sm:w-4 h-[1px] bg-[#C7C6C1] group-hover:bg-[#0A0A0A] group-focus-visible:bg-[#0A0A0A] origin-left group-hover:scale-x-125 transition-transform duration-200 ease-editorial shrink-0"
          />

          {/* Link Label + Dot Motif */}
          <div className="flex items-baseline min-w-0 transform group-hover:translate-x-1 group-focus-visible:translate-x-1 transition-transform duration-200 ease-editorial">
            <span className="text-[15.5px] sm:text-[16.5px] font-normal tracking-[-0.015em] text-[#171717] group-hover:text-[#0A0A0A] truncate">
              {link.label}
            </span>
            <span
              aria-hidden="true"
              className="text-[#0A0A0A] font-semibold opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200 ml-[1px]"
            >
              .
            </span>
          </div>
        </div>

        {/* Right Zone: Discrete Metadata Handle + Minimal Linear SVG Arrow */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <span className="text-[12px] sm:text-[12.5px] font-normal text-[#8F8F8A] group-hover:text-[#52524E] transition-colors duration-200 tabular-nums whitespace-nowrap">
            {link.subtitle}
          </span>

          {/* Minimalist monochrome linear arrow SVG */}
          <span
            aria-hidden="true"
            className="inline-flex items-center justify-center w-5 h-5 text-[#73736E] group-hover:text-[#0A0A0A] group-focus-visible:text-[#0A0A0A] transform group-hover:translate-x-1 group-focus-visible:translate-x-1 transition-transform duration-200 ease-editorial"
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
                strokeWidth="1.15"
                strokeLinecap="square"
              />
              <path
                d="M9 3.5L13.5 8L9 12.5"
                strokeWidth="1.15"
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
