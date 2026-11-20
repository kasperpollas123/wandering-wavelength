// Builds src/data/extraCities.json: cities that have 3 or more attorneys in
// attorney_enriched_reviews.json but no hand-written entry in src/data/cities.ts.
// Run: node scripts/build-directory.mjs   (also run by vercel-build.sh)
import { readFileSync, writeFileSync } from 'node:fs';

const MIN_ATTORNEYS = 3;
const STATES = { alabama: 'AL', alaska: 'AK', arizona: 'AZ', arkansas: 'AR', california: 'CA', colorado: 'CO', connecticut: 'CT', delaware: 'DE', 'district of columbia': 'DC', florida: 'FL', georgia: 'GA', hawaii: 'HI', idaho: 'ID', illinois: 'IL', indiana: 'IN', iowa: 'IA', kansas: 'KS', kentucky: 'KY', louisiana: 'LA', maine: 'ME', maryland: 'MD', massachusetts: 'MA', michigan: 'MI', minnesota: 'MN', mississippi: 'MS', missouri: 'MO', montana: 'MT', nebraska: 'NE', nevada: 'NV', 'new hampshire': 'NH', 'new jersey': 'NJ', 'new mexico': 'NM', 'new york': 'NY', 'north carolina': 'NC', 'north dakota': 'ND', ohio: 'OH', oklahoma: 'OK', oregon: 'OR', pennsylvania: 'PA', 'rhode island': 'RI', 'south carolina': 'SC', 'south dakota': 'SD', tennessee: 'TN', texas: 'TX', utah: 'UT', vermont: 'VT', virginia: 'VA', washington: 'WA', 'west virginia': 'WV', wisconsin: 'WI', wyoming: 'WY' };

const sanitize = s => s.toLowerCase().replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '');
const titleCase = s => s.split(' ').map(w => (w ? w[0].toUpperCase() + w.slice(1) : w)).join(' ');

// Same parsing as loadAttorneysFromJson in src/data/attorneys.ts
function cityState(listing) {
  if (!listing.city) return null;
  const parts = listing.city.split(',');
  if (parts.length < 2) return null;
  const city = parts[0].trim();
  const raw = parts[1].trim();
  let state = /^[A-Z]{2}$/.test(raw) ? raw : STATES[raw.toLowerCase()] || raw;
  if (!/^[A-Z]{2}$/.test(state) && listing.address) {
    const m = (listing.address.split(',').pop() || '').trim().match(/^[A-Z]{2}/);
    if (m) state = m[0];
  }
  return { city, state };
}

const listings = JSON.parse(readFileSync('attorney_enriched_reviews.json', 'utf8')).listings || [];
const citiesTs = readFileSync('src/data/cities.ts', 'utf8');
const hardcoded = [...citiesTs.matchAll(/state: "([A-Z]{2})",\s*slug: "([^"]+)"/g)].map(m => ({ state: m[1], slug: m[2] }));
const hardSlugs = new Set(hardcoded.map(c => c.slug));
// Hand-written city pages that also pull in attorneys from other places (see getAttorneysByCitySlug)
const coveredByHardcoded = (slug, state) =>
  hardcoded.some(c => c.slug === slug && c.state === state) ||
  (slug === 'new-york-city' && state === 'NY') || (slug === 'washington' && state === 'DC') ||
  state === 'OR' || (slug === 'lincoln' && state === 'NE');

const groups = new Map();
for (const l of listings) {
  if (!l.name) continue;
  const cs = cityState(l);
  if (!cs || !/^[A-Z]{2}$/.test(cs.state)) continue;
  const baseSlug = sanitize(cs.city);
  if (coveredByHardcoded(baseSlug, cs.state)) continue;
  const key = `${baseSlug}|${cs.state}`;
  if (!groups.has(key)) groups.set(key, { name: titleCase(cs.city), state: cs.state, baseSlug, attorneyCount: 0 });
  groups.get(key).attorneyCount++;
}

const extra = [...groups.values()].filter(g => g.attorneyCount >= MIN_ATTORNEYS);
const slugCount = {};
for (const g of extra) slugCount[g.baseSlug] = (slugCount[g.baseSlug] || 0) + 1;
for (const g of extra) {
  // Add the state when the plain name is taken by a hand-written city or by another state's city
  g.slug = hardSlugs.has(g.baseSlug) || slugCount[g.baseSlug] > 1 ? `${g.baseSlug}-${g.state.toLowerCase()}` : g.baseSlug;
  g.seoSlug = `expungement-attorneys-${g.slug}`;
}
extra.sort((a, b) => a.state.localeCompare(b.state) || a.name.localeCompare(b.name));
writeFileSync('src/data/extraCities.json', JSON.stringify(extra, null, 2) + '\n');
console.log(`extraCities.json: ${extra.length} cities with ${MIN_ATTORNEYS}+ attorneys (${extra.reduce((n, g) => n + g.attorneyCount, 0)} attorneys)`);
