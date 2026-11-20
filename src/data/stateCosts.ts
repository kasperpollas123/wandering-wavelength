// What clearing a record costs in each state, and the published "second chance gap".
// Researched November 2026 from state statutes, courts and agencies (sources listed per state);
// the gap figures come from Paper Prisons Initiative state reports.
import costData from './stateCosts.json';
import gapData from './secondChanceGap.json';

export interface StateCost {
  state: string;
  main_process: string | null;
  court_fee: string | null;
  other_fees: { item: string; amount: string }[];
  fee_waiver: string | null;
  free_automatic: string | null;
  time: string | null;
  summary: string;
  sources: string[];
  confidence: 'high' | 'medium' | 'low';
  notes: string | null;
}
export interface Gap { state: string; eligible_not_cleared: number; share: number | null; what_it_counts: string; year: number; source_title: string; source_url: string; }

const costs = Object.fromEntries((costData as StateCost[]).map(c => [c.state, c]));
const gaps = Object.fromEntries((gapData as Gap[]).map(g => [g.state, g]));
export const costsChecked = 'November 2026';
export const getStateCost = (code: string): StateCost | undefined => costs[code];
export const getGap = (code: string): Gap | undefined => gaps[code];
export const allCosts = (costData as StateCost[]);

// "873,000" -> "about 873,000"; "1,100,000" -> "about 1.1 million"
export function roundPeople(n: number): string {
  if (n >= 1_000_000) return `about ${(Math.round(n / 100_000) / 10).toString()} million`;
  return `about ${Math.round(n / 1000).toLocaleString('en-US')},000`;
}
export const hostOf = (u: string) => { try { return new URL(u).hostname.replace(/^www\./, ''); } catch { return u; } };
