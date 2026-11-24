import type { APIRoute } from 'astro';
import { withBase } from '../i18n';

export const GET: APIRoute = ({ site }) =>
  new Response(
    [
      'User-agent: *',
      `Allow: ${withBase('/')}`,
      `Disallow: ${withBase('/404')}`,
      '',
      `Sitemap: ${new URL(withBase('/sitemap-index.xml'), site!)}`,
      '',
    ].join('\n'),
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
