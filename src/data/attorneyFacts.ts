// Short labels and summaries for listing cards and firm pages.
// Everything here is derived from the firm's own profile (attorneyProfiles.json); nothing is guessed.
import type { Attorney } from './attorneys';

export const DEFAULT_IMAGE = '/images/default-attorney.svg';

export interface Badge { label: string; tone: 'green' | 'blue' | 'amber' | 'violet' | 'gray'; }

const SERVICE_RULES: [RegExp, string][] = [
  [/juvenile/i, 'Juvenile records'],
  [/pardon|clemency/i, 'Pardons'],
  [/firearm|gun/i, 'Gun rights'],
  [/nondisclosure/i, 'Nondisclosure'],
  [/set[- ]?aside/i, 'Set-asides'],
  [/vacat/i, 'Vacating convictions'],
  [/seal/i, 'Record sealing'],
  [/expun|expung|clear/i, 'Expungement'],
  [/certificate/i, 'Certificates of relief'],
  [/early termination|probation/i, 'Ending probation early'],
  [/dui|dwi|ovi|owi/i, 'DUI records'],
];

export function serviceLabels(a: Attorney, max = 4): string[] {
  const raw = a.profile?.record_clearing_services?.length ? a.profile.record_clearing_services : (a.rcPage?.services || []);
  const out: string[] = [];
  for (const s of raw) {
    const hit = SERVICE_RULES.find(([re]) => re.test(s));
    const label = hit ? hit[1] : null;
    if (label && !out.includes(label)) out.push(label);
  }
  // Expungement first, then the rest in the firm's own order
  out.sort((x, y) => (x === 'Expungement' ? -1 : y === 'Expungement' ? 1 : 0));
  return out.slice(0, max);
}

export const isFormerProsecutor = (a: Attorney) =>
  /former[^.]{0,40}(prosecutor|district attorney|state attorney)|(prosecutor|district attorney)[^.]{0,20}(before|previously)/i.test(a.profile?.description || '');

export function otherLanguages(a: Attorney): string[] {
  return (a.profile?.languages || []).filter(l => l && !/english/i.test(l)).map(l => l.replace(/^espa.ol$/i, 'Spanish'));
}

export function badges(a: Attorney): Badge[] {
  const p = a.profile;
  const out: Badge[] = [];
  if (p?.free_consultation === true) out.push({ label: 'Free consultation', tone: 'green' });
  const langs = otherLanguages(a);
  if (langs.length) out.push({ label: langs.length === 1 ? `Speaks ${langs[0]}` : `Speaks ${langs.slice(0, 2).join(' & ')}`, tone: 'violet' });
  if (isFormerProsecutor(a)) out.push({ label: 'Former prosecutor', tone: 'amber' });
  if (p?.fees && /flat/i.test(p.fees)) out.push({ label: 'Flat fees', tone: 'blue' });
  if (p?.payment_plans === true) out.push({ label: 'Payment plans', tone: 'blue' });
  return out;
}

export const BADGE_CLASS: Record<Badge['tone'], string> = {
  green: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  blue: 'bg-sky-50 text-sky-800 border-sky-200',
  amber: 'bg-amber-50 text-amber-800 border-amber-200',
  violet: 'bg-violet-50 text-violet-800 border-violet-200',
  gray: 'bg-gray-50 text-gray-700 border-gray-200',
};

// First one or two sentences of the profile, kept short for a card
export function summary(a: Attorney, max = 230): string {
  const text = (a.profile?.description || '').split('\n').find(p => p.trim()) || '';
  if (!text) return '';
  const sentences = text.match(/[^.!?]+[.!?]+(\s|$)/g) || [text];
  let out = '';
  for (const s of sentences) {
    if ((out + s).length > max && out) break;
    out += s;
  }
  out = out.trim();
  return out.length > max + 60 ? out.slice(0, max).replace(/\s+\S*$/, '') + '…' : out;
}

export function initials(name: string): string {
  const words = name
    .replace(/\b(the|law offices? of|law firm|attorneys? at law|attorneys?|lawyers?|llc|pllc|pc|p\.c\.|pa|p\.a\.|llp|ltd|inc|esq\.?|group|legal|services)\b/gi, ' ')
    .replace(/[^A-Za-z\s&-]/g, ' ')
    .split(/\s+/).filter(w => /^[A-Za-z]/.test(w));
  return (words.slice(0, 2).map(w => w[0].toUpperCase()).join('') || name.slice(0, 1).toUpperCase());
}

export const hasPhoto = (a: Attorney) => Boolean(a.image) && a.image !== DEFAULT_IMAGE;

export const telHref = (phone: string) => `tel:${(phone || '').replace(/[^0-9+]/g, '')}`;

export const prettyPhone = (phone: string) => {
  const d = (phone || '').replace(/\D/g, '').replace(/^1(?=\d{10}$)/, '');
  return d.length === 10 ? `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}` : phone;
};

export const prettyHost = (url: string) => (url || '').replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '');

// Best-known first: more reviews and a higher rating count for more; firms with a written profile rank above those without
export function listingOrder(a: Attorney, b: Attorney): number {
  const score = (x: Attorney) => (x.profile ? 1 : 0) * 100 + (x.rating || 0) * Math.log10((x.reviewCount || 0) + 1) * 4 + (hasPhoto(x) ? 2 : 0);
  return score(b) - score(a);
}
