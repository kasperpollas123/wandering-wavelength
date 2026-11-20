import { cities, stateNames, stateSlug } from '../data/cities';
import { attorneys, getAttorneysByState, getAttorneysForCity } from '../data/attorneys';
import { helpStates } from '../data/freeHelp';
import { guideTopics } from '../data/guides';
import articles from '../data/articles.json';

export async function get() {
  // Base URL for the site
  const baseUrl = 'https://www.expungementattorneys.org';
  
  // Current date for lastmod
  const today = new Date().toISOString().split('T')[0];
  
  // Main pages
  const mainPages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/about', priority: '0.8', changefreq: 'monthly' },
    { url: '/cities', priority: '0.9', changefreq: 'weekly' },
    { url: '/states', priority: '0.9', changefreq: 'weekly' },
    { url: '/resources', priority: '0.8', changefreq: 'monthly' },
    { url: '/faqs', priority: '0.7', changefreq: 'monthly' },
    { url: '/contact', priority: '0.7', changefreq: 'monthly' },
    { url: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
    { url: '/terms-of-service', priority: '0.3', changefreq: 'yearly' },
    { url: '/sitemap', priority: '0.5', changefreq: 'monthly' },
  ];
  
  // City pages
  const cityPages = cities.filter(city => getAttorneysForCity(city).length > 0).map(city => ({
    url: `/cities/${city.seoSlug || city.slug}`,
    priority: '0.8',
    changefreq: 'weekly'
  }));
  
  // Attorney pages
  const attorneyPages = attorneys.map(attorney => ({
    url: `/attorneys/${attorney.slug}`,
    priority: '0.7',
    changefreq: 'weekly'
  }));
  
  // Combine all pages
  // State pages (states with at least one attorney)
  const statePages = Object.keys(stateNames)
    .map(code => ({ url: `/states/${stateSlug(code)}`, priority: '0.8', changefreq: 'weekly' }));

  // Free help pages
  const helpPages = [{ url: '/free-expungement-help', priority: '0.9', changefreq: 'monthly' },
    ...helpStates.map(s => ({ url: `/free-expungement-help/${stateSlug(s.code)}`, priority: '0.8', changefreq: 'monthly' }))];

  const guidePages = [{ url: '/guides', priority: '0.8', changefreq: 'monthly' },
    ...guideTopics.map(t => ({ url: `/guides/${t.slug}`, priority: '0.9', changefreq: 'monthly' })),
    ...articles.map(a => ({ url: `/guides/${a.slug}`, priority: '0.9', changefreq: 'monthly' }))];

  const allPages = [...mainPages, ...statePages, ...helpPages, ...guidePages, ...cityPages, ...attorneyPages];
  
  // Generate XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
  
  return {
    body: sitemap,
    headers: {
      'Content-Type': 'application/xml'
    }
  };
} 