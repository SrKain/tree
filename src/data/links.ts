export interface EditorialLink {
  id: string;
  index: string;
  label: string;
  url: string;
  subtitle: string;
  ariaLabel: string;
}

export interface BrandProfile {
  brand: 'iasin.';
  name: string;
  role: string;
  statement: string;
  location: string;
  whatsappRaw: string;
  websiteUrl: string;
  copyrightYear: number;
}

export const PROFILE: BrandProfile = {
  brand: 'iasin.',
  name: 'Kauan Iasin',
  role: 'Technology & Business Consultant',
  statement: 'Estratégia digital, arquitetura de tecnologia e precisão executiva para negócios.',
  location: 'Curitiba, BR',
  whatsappRaw: '+55 41 98788-3510',
  websiteUrl: 'https://iasin.dev.br',
  copyrightYear: 2026,
};

const WHATSAPP_MESSAGE = 'Olá, vim pelo Link Tree da iasin. Gostaria de falar com você.';

export const LINKS: EditorialLink[] = [
  {
    id: 'website',
    index: '01',
    label: 'website',
    url: 'https://iasin.dev.br',
    subtitle: 'iasin.dev.br',
    ariaLabel: 'Acessar website oficial iasin.dev.br',
  },
  {
    id: 'instagram',
    index: '02',
    label: 'instagram',
    url: 'https://www.instagram.com/kauan_iasin/',
    subtitle: '@kauan_iasin',
    ariaLabel: 'Acessar perfil no Instagram @kauan_iasin',
  },
  {
    id: 'linkedin',
    index: '03',
    label: 'linkedin',
    url: 'https://www.linkedin.com/in/kauan-iasin/',
    subtitle: '/in/kauan-iasin/',
    ariaLabel: 'Acessar perfil profissional no LinkedIn de Kauan Iasin',
  },
  {
    id: 'whatsapp',
    index: '04',
    label: 'whatsapp',
    url: `https://wa.me/5541987883510?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
    subtitle: '+55 41 98788-3510',
    ariaLabel: 'Iniciar conversa no WhatsApp com Kauan Iasin',
  },
];
