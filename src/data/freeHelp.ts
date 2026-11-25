// Free and low-cost record-clearing help by state (legal aid, law school clinics,
// public defender and court programs). Each entry was taken from the organization's
// own page or an official listing; see freeHelp.json for the source link of each.
import data from './freeHelp.json';
import { stateNames } from './cities';

export interface HelpOrg {
  name: string;
  type: string;
  url: string;
  area_served: string | null;
  what_they_offer: string;
  who_qualifies: string | null;
  cost: string | null;
  phone: string | null;
}

const states = (data as any).states as Record<string, HelpOrg[]>;
export const helpChecked: string = (data as any).checked || '';

export const getHelpForState = (code: string): HelpOrg[] => states[code] || [];

// States that have at least one organization, with their names
export const helpStates = Object.keys(states)
  .filter(code => stateNames[code] && states[code].length > 0)
  .map(code => ({ code, name: stateNames[code], count: states[code].length }))
  .sort((a, b) => a.name.localeCompare(b.name));
