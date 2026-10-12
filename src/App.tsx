/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { motion, useReducedMotion, Variants } from 'motion/react';
import { LINKS, PROFILE } from './data/links';
import { Header } from './components/Header';
import { EditorialLinkRow } from './components/EditorialLinkRow';
import { Footer } from './components/Footer';

const TRACKING_PARAMS = [
  'fbclid',
  'gclid',
  'igshid',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
];

export default function App() {
  const prefersReducedMotion = useReducedMotion();

  /**
   * Sanitização silenciosa de URL (Meta / Instagram In-App Browser):
   * Quando o visitante acessa pelo link da bio do Instagram, a Meta anexa
   * parâmetros extensos (?utm_source=ig&fbclid=...). Limpamos a barra de
   * endereço via replaceState sem recarregar a página, garantindo que a URL
   * permaneça limpa (https://tree.iasin.dev.br/) caso o usuário copie ou
   * compartilhe o endereço diretamente do navegador.
   */
  useEffect(() => {
    try {
      const currentUrl = new URL(window.location.href);
      let modified = false;

      for (const param of TRACKING_PARAMS) {
        if (currentUrl.searchParams.has(param)) {
          currentUrl.searchParams.delete(param);
          modified = true;
        }
      }

      if (modified) {
        const cleanSearch = currentUrl.searchParams.toString();
        const cleanUrl = `${currentUrl.pathname}${cleanSearch ? `?${cleanSearch}` : ''}${currentUrl.hash}`;
        window.history.replaceState({}, document.title, cleanUrl);
      }
    } catch {
      // Ignora silenciosamente em ambientes restritos de WebView
    }
  }, []);

  const listVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.04,
        delayChildren: prefersReducedMotion ? 0 : 0.04,
      },
    },
  };

  return (
    <div className="min-h-dvh w-full bg-bg-primary text-text-primary flex flex-col justify-between relative overflow-x-hidden">
      {/* Linhas de margem arquitetônicas discretas em telas maiores */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-[540px] border-x border-border-hairline/70 hidden sm:block"
      />

      {/* Coluna Editorial Centralizada (Mobile-first, leitura e precisão arquitetônica) */}
      <main className="relative z-10 w-full max-w-[460px] mx-auto px-5 sm:px-8 py-10 sm:py-16 my-auto flex flex-col justify-center">
        {/* Cabeçalho Institucional e Identidade */}
        <Header profile={PROFILE} isReady={true} />

        {/* Lista de Canais Oficiais */}
        <nav aria-label="Canais oficiais da iasin." className="w-full my-1">
          <motion.ul
            variants={listVariants}
            initial="hidden"
            animate="visible"
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

        {/* Rodapé com Utilidades e Assinatura Institucional */}
        <Footer profile={PROFILE} isReady={true} />
      </main>
    </div>
  );
}
