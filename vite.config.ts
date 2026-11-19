import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import { writeSitemapFile } from './scripts/generate-sitemap';
import { injectRouteMeta, prerenderAllRouteHtml } from './scripts/seo-meta';

function autoSeoAndSitemapPlugin(): Plugin {
  return {
    name: 'unitswift-auto-seo-sitemap',
    buildStart() {
      writeSitemapFile(__dirname);
    },
    configureServer() {
      writeSitemapFile(__dirname);
    },
    transformIndexHtml(html, ctx) {
      const reqPath = ctx.originalUrl || '/';
      if (reqPath.startsWith('/assets/') || reqPath.startsWith('/@')) {
        return html;
      }
      return injectRouteMeta(html, reqPath);
    },
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist');
      prerenderAllRouteHtml(distDir);
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), autoSeoAndSitemapPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
