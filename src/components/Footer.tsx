import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { BrandProfile } from '../data/links';
import { BrandMark } from './BrandMark';

interface FooterProps {
  profile: BrandProfile;
  isReady?: boolean;
}

const EDITORIAL_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const Footer: React.FC<FooterProps> = ({ profile, isReady = true }) => {
  const [copied, setCopied] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(profile.websiteUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = profile.websiteUrl;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleDownloadVCard = () => {
    const vcard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'N:Iasin;Kauan;;;',
      `FN:${profile.name}`,
      'ORG:iasin.',
      `TITLE:${profile.role}`,
      'TEL;TYPE=CELL:+5541987883510',
      `URL:${profile.websiteUrl}`,
      'X-SOCIALPROFILE;TYPE=linkedin:https://www.linkedin.com/in/kauan-iasin/',
      'X-SOCIALPROFILE;TYPE=instagram:https://www.instagram.com/kauan_iasin/',
      'END:VCARD',
    ].join('\r\n');

    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'kauan-iasin.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
      animate={
        isReady
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: prefersReducedMotion ? 0 : 8 }
      }
      transition={{
        delay: prefersReducedMotion ? 0 : 0.12,
        duration: prefersReducedMotion ? 0.01 : 0.35,
        ease: EDITORIAL_EASE,
      }}
      className="w-full pt-8 sm:pt-10 pb-4 flex flex-col gap-6"
    >
      {/* Utilidades Editoriais Discretas (Alvos de toque >= 44px para acessibilidade mobile) */}
      <div className="flex flex-wrap items-center justify-between gap-y-2 gap-x-4 border-b border-border-hairline pb-5">
        <span className="font-mono text-[11px] tracking-[0.04em] text-text-muted select-none">
          utilidades
        </span>

        <div className="flex items-center gap-3 text-[12.5px] text-text-secondary">
          <button
            type="button"
            onClick={handleDownloadVCard}
            className="min-h-[44px] px-1 inline-flex items-center hover:text-accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary rounded-[2px] transition-colors duration-150 cursor-pointer whitespace-nowrap"
            aria-label="Salvar contato de Kauan Iasin em formato vCard"
          >
            <span className="underline decoration-border-strong underline-offset-4 hover:decoration-accent-primary transition-colors duration-150">
              salvar contato
            </span>
          </button>

          <span aria-hidden="true" className="text-border-strong select-none">
            ·
          </span>

          <button
            type="button"
            onClick={handleCopyUrl}
            className="min-h-[44px] px-1 inline-flex items-center gap-1.5 hover:text-accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary rounded-[2px] transition-colors duration-150 cursor-pointer whitespace-nowrap"
            aria-label={
              copied
                ? 'Endereço iasin.dev.br copiado para a área de transferência'
                : 'Copiar endereço do site iasin.dev.br'
            }
          >
            {copied ? (
              <>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="stroke-accent-primary shrink-0"
                >
                  <path
                    d="M2.5 8.5L6.5 12.5L13.5 4.5"
                    strokeWidth="1.5"
                    strokeLinecap="square"
                  />
                </svg>
                <span className="text-accent-primary font-medium">
                  endereço copiado
                </span>
              </>
            ) : (
              <span className="underline decoration-border-strong underline-offset-4 hover:decoration-accent-primary transition-colors duration-150">
                copiar site
              </span>
            )}
          </button>

          {/* Região live para leitores de tela */}
          <span className="sr-only" role="status" aria-live="polite">
            {copied ? 'Endereço https://iasin.dev.br copiado com sucesso.' : ''}
          </span>
        </div>
      </div>

      {/* Identificação e Assinatura Institucional da Marca */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pt-1">
        <div className="flex items-baseline gap-2.5">
          <BrandMark size="sm" accentPeriod />
          <span
            aria-hidden="true"
            className="text-border-strong text-xs select-none"
          >
            —
          </span>
          <p className="text-[12.5px] font-serif italic tracking-[0.01em] text-text-secondary">
            {profile.signature}
          </p>
        </div>

        <span className="font-mono text-[11px] text-text-muted tabular-nums">
          © {profile.copyrightYear} iasin.
        </span>
      </div>
    </motion.footer>
  );
};
