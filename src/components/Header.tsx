import React from 'react';
import { motion, useReducedMotion, Variants } from 'motion/react';
import { BrandProfile } from '../data/links';
import { BrandMark } from './BrandMark';

interface HeaderProps {
  profile: BrandProfile;
  isReady: boolean;
}

const EDITORIAL_EASE: [number, number, number, number] = [0.77, 0, 0.175, 1];

export const Header: React.FC<HeaderProps> = ({ profile, isReady }) => {
  const prefersReducedMotion = useReducedMotion();

  const headerContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.08,
        delayChildren: prefersReducedMotion ? 0 : 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 16,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.2 : 0.6,
        ease: EDITORIAL_EASE,
      },
    },
  };

  return (
    <motion.header
      variants={headerContainerVariants}
      initial="hidden"
      animate={isReady ? 'visible' : 'hidden'}
      className="w-full flex flex-col items-start pt-2 pb-8 sm:pb-10"
    >
      {/* Top architectural graphic motif: precision dot + fine line */}
      <motion.div
        variants={itemVariants}
        className="w-full flex items-center justify-between mb-10 sm:mb-12"
        aria-hidden="true"
      >
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0A0A0A] inline-block" />
          <span className="w-8 h-[1px] bg-[#D4D4D0] inline-block" />
        </div>
        <span className="font-mono text-[11px] tracking-[0.08em] text-[#8A8A85] tabular-nums">
          {profile.location}
        </span>
      </motion.div>

      {/* Primary Brand Mark: iasin. */}
      <motion.div variants={itemVariants} className="mb-6 sm:mb-7">
        <a
          href={profile.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FAF9F7] transition-opacity duration-200 hover:opacity-75"
          aria-label="iasin. — Website oficial"
        >
          <BrandMark size="md" />
        </a>
      </motion.div>

      {/* Executive Identity Lockup: Kauan Iasin & Role */}
      <motion.div variants={itemVariants} className="w-full space-y-1.5">
        <h1 className="text-[26px] sm:text-[30px] font-medium tracking-[-0.025em] text-[#0A0A0A] leading-[1.15] text-balance">
          {profile.name}
        </h1>
        <p className="text-[14px] sm:text-[15px] font-normal tracking-[0.01em] text-[#666662] leading-relaxed">
          {profile.role}
        </p>
      </motion.div>

      {/* Signature Dash Divider & Subtle Editorial Positioning */}
      <motion.div
        variants={itemVariants}
        className="w-full mt-7 sm:mt-8 pt-6 sm:pt-7 border-t border-[#E6E5E0] flex flex-col gap-3"
      >
        <div className="flex items-center gap-2" aria-hidden="true">
          <span className="w-5 h-[1px] bg-[#0A0A0A] inline-block" />
          <span className="w-1 h-1 rounded-full bg-[#0A0A0A] inline-block" />
        </div>
        <p className="text-[13px] sm:text-[13.5px] font-normal text-[#73736E] leading-[1.65] max-w-[44ch]">
          {profile.statement}
        </p>
      </motion.div>
    </motion.header>
  );
};
