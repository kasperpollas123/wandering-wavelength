import { cities } from '../data/cities';
import { attorneys } from '../data/attorneys';

export async function get() {
  // Base URL for the site
  const baseUrl = 'https://www.expungementattorneys.online';
  
  // Current date for lastmod
  const today = new Date().toISOString().split('T')[0];
  
  // Main pages
  const mainPages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/about', priority: '0.8', changefreq: 'monthly' },
    { url: '/cities', priority: '0.9', changefreq: 'weekly' },
    { url: '/resources', priority: '0.8', changefreq: 'monthly' },
    { url: '/contact', priority: '0.7', changefreq: 'monthly' },
    { url: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
    { url: '/terms-of-service', priority: '0.3', changefreq: 'yearly' },
    { url: '/sitemap', priority: '0.5', changefreq: 'monthly' },
  ];
  
  // City pages
  const cityPages = cities.map(city => ({
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
  const allPages = [...mainPages, ...cityPages, ...attorneyPages];
  
  // Generate XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${today}</lastmod>
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