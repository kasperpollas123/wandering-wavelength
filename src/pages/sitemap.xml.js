export async function get() {
  try {
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
      { url: '/faqs', priority: '0.6', changefreq: 'monthly' },
    ];
    
    // Generate XML with just the main pages for now
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${mainPages.map(page => `  <url>
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
  } catch (error) {
    console.error('Error generating sitemap:', error);
    
    // Return a minimal valid sitemap in case of error
    return {
      body: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.expungementattorneys.online/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`,
      headers: {
        'Content-Type': 'application/xml'
      }
    };
  }
} 