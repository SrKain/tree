import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { BrandProfile } from '../data/links';
import { BrandMark } from './BrandMark';

interface FooterProps {
  profile: BrandProfile;
  isReady: boolean;
}

const EDITORIAL_EASE: [number, number, number, number] = [0.77, 0, 0.175, 1];

export const Footer: React.FC<FooterProps> = ({ profile, isReady }) => {
  const [copied, setCopied] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(profile.websiteUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
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
      window.setTimeout(() => setCopied(false), 2000);
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
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
      animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
      transition={{
        delay: prefersReducedMotion ? 0 : 0.55,
        duration: prefersReducedMotion ? 0.2 : 0.6,
        ease: EDITORIAL_EASE,
      }}
      className="w-full pt-10 sm:pt-12 pb-4 flex flex-col gap-6"
    >
      {/* Subtle Graphic Dash */}
      <div className="flex items-center justify-between" aria-hidden="true">
        <span className="w-6 h-[1px] bg-[#D4D4D0] inline-block" />
        <span className="w-1 h-1 rounded-full bg-[#8F8F8A] inline-block" />
      </div>

      {/* Bottom Signature Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-baseline gap-3">
          <BrandMark size="sm" />
          <span aria-hidden="true" className="text-[#C7C6C1] text-xs select-none">
            —
          </span>
          <span className="text-[11.5px] font-normal text-[#8F8F8A] tabular-nums">
            © {profile.copyrightYear} iasin.
          </span>
        </div>

        {/* Quiet Digital Business Card Utilities (unboxed editorial text) */}
        <div className="flex items-center gap-2.5 text-[11.5px] text-[#8F8F8A]">
          <button
            type="button"
            onClick={handleDownloadVCard}
            className="hover:text-[#0A0A0A] focus-visible:outline-none focus-visible:text-[#0A0A0A] focus-visible:underline transition-colors duration-150 cursor-pointer whitespace-nowrap"
            aria-label="Salvar contato de Kauan Iasin em formato vCard"
          >
            salvar contato
          </button>
          <span aria-hidden="true" className="text-[#D4D4D0]">
            ·
          </span>
          <button
            type="button"
            onClick={handleCopyUrl}
            className="hover:text-[#0A0A0A] focus-visible:outline-none focus-visible:text-[#0A0A0A] focus-visible:underline transition-colors duration-150 cursor-pointer whitespace-nowrap"
            aria-label="Copiar endereço do site iasin.dev.br"
          >
            {copied ? 'copiado.' : 'copiar site'}
          </button>
        </div>
      </div>
    </motion.footer>
  );
};
