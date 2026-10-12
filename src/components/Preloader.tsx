import React, { useEffect } from 'react';

interface PreloaderProps {
  onExitStart?: () => void;
  onComplete: () => void;
}

/**
 * Nota de Arquitetura e Performance (Auditoria Seção 4):
 * A espera artificial anterior de 2,8 segundos foi removida para priorizar o
 * tempo do usuário, LCP, INP e acesso com zero fricção aos canais da iasin.
 * Este componente é mantido apenas por compatibilidade estrutural e executa
 * a liberação imediata caso seja invocado.
 */
export const Preloader: React.FC<PreloaderProps> = ({
  onExitStart,
  onComplete,
}) => {
  useEffect(() => {
    onExitStart?.();
    onComplete();
  }, [onExitStart, onComplete]);

  return null;
};
