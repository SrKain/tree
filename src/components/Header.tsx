import React from 'react';
import { motion, useReducedMotion, Variants } from 'motion/react';
import { BrandProfile } from '../data/links';
import { BrandMark } from './BrandMark';

interface HeaderProps {
  profile: BrandProfile;
  isReady?: boolean;
}

const EDITORIAL_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const Header: React.FC<HeaderProps> = ({ profile, isReady = true }) => {
  const prefersReducedMotion = useReducedMotion();

  const headerContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.04,
        delayChildren: 0,
      },
    },
  };

  const itemVariants: Variants = {
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
    <motion.header
      variants={headerContainerVariants}
      initial="hidden"
      animate={isReady ? 'visible' : 'hidden'}
      className="w-full flex flex-col items-start pt-1 pb-7 sm:pb-9"
    >
      {/* 1. Identidade iasin. + Localização discreta no topo arquitetônico */}
      <motion.div
        variants={itemVariants}
        className="w-full flex items-baseline justify-between gap-4 pb-6 sm:pb-7 border-b border-border-hairline"
      >
        <a
          href={profile.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-baseline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-4 focus-visible:ring-offset-bg-primary transition-opacity duration-150 hover:opacity-85"
          aria-label="iasin. — Acessar website institucional iasin.dev.br"
        >
          <BrandMark size="md" accentPeriod />
        </a>

        <span className="font-mono text-[11px] tracking-[0.06em] text-text-muted tabular-nums shrink-0">
          {profile.location}
        </span>
      </motion.div>

      {/* 2. Identificação profissional de Kauan Iasin & 3. Especialidade / Papel profissional */}
      <motion.div
        variants={itemVariants}
        className="w-full pt-6 sm:pt-7 space-y-1.5"
      >
        <h1 className="text-[26px] sm:text-[30px] font-semibold tracking-[-0.025em] text-text-primary leading-[1.15] text-balance">
          {profile.name}
        </h1>
        <p className="text-[14px] sm:text-[15px] font-normal tracking-[0.005em] text-text-secondary leading-relaxed">
          {profile.role}
        </p>
      </motion.div>

      {/* 4. Posicionamento resumido */}
      <motion.div
        variants={itemVariants}
        className="w-full mt-5 sm:mt-6 pt-5 border-t border-border-hairline"
      >
        <p className="text-[13.5px] sm:text-[14px] font-normal text-text-secondary leading-[1.65] max-w-[46ch] text-pretty">
          {profile.statement}
        </p>
      </motion.div>
    </motion.header>
  );
};
