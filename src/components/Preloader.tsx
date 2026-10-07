import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

interface PreloaderProps {
  onExitStart?: () => void;
  onComplete: () => void;
}

const EDITORIAL_EASE: [number, number, number, number] = [0.77, 0, 0.175, 1];

export const Preloader: React.FC<PreloaderProps> = ({ onExitStart, onComplete }) => {
  const prefersReducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<'show' | 'exit'>('show');

  useEffect(() => {
    if (prefersReducedMotion) {
      const quickExit = window.setTimeout(() => {
        setPhase('exit');
        onExitStart?.();
      }, 250);
      const quickDone = window.setTimeout(() => {
        onComplete();
      }, 450);
      return () => {
        window.clearTimeout(quickExit);
        window.clearTimeout(quickDone);
      };
    }

    const exitTimer = window.setTimeout(() => {
      setPhase('exit');
      onExitStart?.();
    }, 2000);

    const completeTimer = window.setTimeout(() => {
      onComplete();
    }, 2800);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(completeTimer);
    };
  }, [onComplete, onExitStart, prefersReducedMotion]);

  return (
    <AnimatePresence>
      <motion.div
        key="preloader"
        role="status"
        aria-label="Carregando iasin."
        initial={{ opacity: 1 }}
        animate={
          phase === 'exit'
            ? { opacity: 0, scale: prefersReducedMotion ? 1 : 1.1 }
            : { opacity: 1, scale: 1 }
        }
        exit={{ opacity: 0, scale: prefersReducedMotion ? 1 : 1.1 }}
        transition={{
          duration: prefersReducedMotion ? 0.2 : 0.8,
          ease: EDITORIAL_EASE,
        }}
        className="fixed inset-0 z-[100] bg-[#FAF9F7] flex items-center justify-center select-none"
        style={{ pointerEvents: phase === 'exit' ? 'none' : 'auto' }}
      >
        <div className="relative">
          <motion.span
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: prefersReducedMotion ? 0 : 0.3,
              duration: prefersReducedMotion ? 0.2 : 0.8,
              ease: 'easeOut',
            }}
            className="block font-serif text-5xl md:text-7xl text-[#0A0A0A] tracking-tight leading-none"
          >
            iasin.
          </motion.span>

          <div className="relative mt-2" aria-hidden="true">
            <motion.div
              initial={{ scaleX: prefersReducedMotion ? 1 : 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                delay: prefersReducedMotion ? 0 : 0.8,
                duration: prefersReducedMotion ? 0.15 : 1.0,
                ease: EDITORIAL_EASE,
              }}
              className="absolute left-0 right-0 h-[1px] bg-[#0A0A0A] origin-left"
            />
            <motion.div
              initial={{
                opacity: prefersReducedMotion ? 1 : 0,
                scale: prefersReducedMotion ? 1 : 0,
              }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: prefersReducedMotion ? 0 : 1.8,
                duration: prefersReducedMotion ? 0.15 : 0.3,
                ease: 'backOut',
              }}
              className="absolute right-0 -top-[2px] w-[5px] h-[5px] rounded-full bg-[#0A0A0A]"
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
