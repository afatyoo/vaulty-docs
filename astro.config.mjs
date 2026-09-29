// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// Dokumentasi Vaulty. Indonesia sebagai bahasa utama (di akar), Inggris di /en/.
// Situs statis, disajikan nginx seperti landing page.
export default defineConfig({
  site: process.env.SITE_URL || 'https://docs.vaulty.id',
  integrations: [
    starlight({
      title: { id: 'Dokumentasi Vaulty', en: 'Vaulty Docs' },
      description: 'Panduan memakai Vaulty: mencatat keuangan, paket dan pembayaran, dan menyambungkan agen AI lewat MCP.',
      logo: { src: './src/assets/logo.svg', alt: 'Vaulty' },
      favicon: '/favicon.svg',
      defaultLocale: 'root',
      locales: {
        root: { label: 'Bahasa Indonesia', lang: 'id' },
        en: { label: 'English', lang: 'en' },
      },
      customCss: ['./src/styles/brand.css'],
      editLink: { baseUrl: 'https://github.com/afatyoo/vaulty-docs/edit/main/' },
      lastUpdated: true,
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/afatyoo/vaulty-docs' }],
      sidebar: [
        { label: 'Mulai', translations: { en: 'Getting started' }, items: [{ autogenerate: { directory: 'mulai' } }] },
        { label: 'Panduan penggunaan', translations: { en: 'User guide' }, items: [{ autogenerate: { directory: 'panduan' } }] },
        { label: 'Paket dan pembayaran', translations: { en: 'Plans and payments' }, items: [{ autogenerate: { directory: 'paket' } }] },
        { label: 'Agen AI (MCP)', translations: { en: 'AI agents (MCP)' }, items: [{ autogenerate: { directory: 'agen-ai' } }] },
        { label: 'Bantuan', translations: { en: 'Help' }, items: [{ autogenerate: { directory: 'bantuan' } }] },
      ],
    }),
  ],
});
