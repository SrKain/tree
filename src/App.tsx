/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useState } from 'react';
import { motion, useReducedMotion, Variants } from 'motion/react';
import { LINKS, PROFILE } from './data/links';
import { Preloader } from './components/Preloader';
import { Header } from './components/Header';
import { EditorialLinkRow } from './components/EditorialLinkRow';
import { Footer } from './components/Footer';

const EDITORIAL_EASE: [number, number, number, number] = [0.77, 0, 0.175, 1];

export default function App() {
  const prefersReducedMotion = useReducedMotion();
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [revealContent, setRevealContent] = useState(false);

  const handleExitStart = useCallback(() => {
    setRevealContent(true);
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    setPreloaderDone(true);
    setRevealContent(true);
  }, []);

  const listVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.07,
        delayChildren: prefersReducedMotion ? 0 : 0.25,
      },
    },
  };

  return (
    <div className="min-h-dvh w-full bg-[#FAF9F7] text-[#0A0A0A] flex flex-col justify-between relative overflow-x-hidden">
      {/* Official iasin.dev.br Preloader */}
      {!preloaderDone && (
        <Preloader
          onExitStart={handleExitStart}
          onComplete={handlePreloaderComplete}
        />
      )}

      {/* Subtle architectural margin hairlines on wide desktop viewports */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-[540px] border-x border-[#EFEEEA] hidden sm:block"
      />

      {/* Main Centered Editorial Column */}
      <motion.main
        initial={{
          opacity: 0,
          y: prefersReducedMotion ? 0 : 30,
        }}
        animate={
          revealContent
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: prefersReducedMotion ? 0 : 30 }
        }
        transition={{
          duration: prefersReducedMotion ? 0.25 : 0.6,
          ease: EDITORIAL_EASE,
        }}
        className="relative z-10 w-full max-w-[460px] mx-auto px-6 sm:px-8 py-12 sm:py-20 my-auto flex flex-col justify-center"
      >
        {/* Identity Header */}
        <Header profile={PROFILE} isReady={revealContent} />

        {/* Navigation Links Section */}
        <nav aria-label="Canais oficiais da iasin." className="w-full my-2">
          <motion.ul
            variants={listVariants}
            initial="hidden"
            animate={revealContent ? 'visible' : 'hidden'}
            className="w-full flex flex-col"
          >
            {LINKS.map((link, idx) => (
              <EditorialLinkRow
                key={link.id}
                link={link}
                isFirst={idx === 0}
              />
            ))}
          </motion.ul>
        </nav>

        {/* Minimal Signature Footer */}
        <Footer profile={PROFILE} isReady={revealContent} />
      </motion.main>
    </div>
  );
}
