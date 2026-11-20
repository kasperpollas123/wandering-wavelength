// "How long does it stay on your record" guides, built from stateFacts.json
// (researched per state against official sources; see scripts/research/state_facts_2026-11.json
// for what could not be confirmed).
import data from './stateFacts.json';
import { stateNames } from './cities';

export type Clearable = 'yes' | 'some' | 'no' | 'unclear';
export interface OffenceFact { clearable: Clearable; wait: string | null; note: string | null; }
export interface StateFacts {
  remedy_name: string | null;
  misdemeanor: OffenceFact;
  felony: OffenceFact;
  dui: OffenceFact;
  non_conviction: string | null;
  automatic: string | null;
  dui_driving_record: string | null;
  sources: string[];
}

export const factsChecked: string = (data as any).checked;
const states = (data as any).states as Record<string, StateFacts>;
export const getStateFacts = (code: string): StateFacts | undefined => states[code];
export const factStates = Object.keys(states)
  .filter(code => stateNames[code])
  .map(code => ({ code, name: stateNames[code], facts: states[code] }))
  .sort((a, b) => a.name.localeCompare(b.name));

export const clearableLabel: Record<Clearable, string> = { yes: 'Yes', some: 'In some cases', no: 'No', unclear: 'Not confirmed' };

export interface GuideTopic {
  slug: string;
  key: 'dui' | 'misdemeanor' | 'felony';
  noun: string;      // "a DUI"
  short: string;     // "DUI"
  title: string;
  description: string;
  intro: string[];
}

export const guideTopics: GuideTopic[] = [
  {
    slug: 'how-long-does-a-dui-stay-on-your-record',
    key: 'dui',
    noun: 'a DUI',
    short: 'DUI',
    title: 'How Long Does a DUI Stay on Your Record? State by State',
    description: 'A DUI stays on your criminal record unless your state lets you clear it. For every state: can a DUI be cleared, how long you wait, and the driving record.',
    intro: [
      'A DUI sits on two separate records, and they follow different rules.',
      'The criminal record: a DUI conviction stays there permanently unless your state lets you clear it. About half the states do not allow a DUI conviction to be cleared at all. The rest allow it after a waiting period, often for a first offense only.',
      'The driving record: every state also counts earlier DUIs when it punishes a new one, for a set number of years (often called the lookback period), and the motor vehicle agency keeps its own record. Clearing the criminal record usually does not change the driving record.',
    ],
  },
  {
    slug: 'how-long-does-a-misdemeanor-stay-on-your-record',
    key: 'misdemeanor',
    noun: 'a misdemeanor',
    short: 'Misdemeanor',
    title: 'How Long Does a Misdemeanor Stay on Your Record? State by State',
    description: 'A misdemeanor stays on your record unless it is cleared. For every state: whether a misdemeanor can be expunged or sealed, and how long you wait.',
    intro: [
      'A misdemeanor conviction does not drop off a criminal record by itself. It stays permanently unless the state clears it, either because you ask a court or because the state does it automatically.',
      'Most states let at least some misdemeanor convictions be cleared after a waiting period. The wait usually starts when the sentence is finished, including probation and any fines, and it restarts or ends if there is a new conviction.',
      'Some offenses are commonly left out even where misdemeanors can be cleared: DUI, domestic violence and sex offenses are the usual exclusions.',
    ],
  },
  {
    slug: 'how-long-does-a-felony-stay-on-your-record',
    key: 'felony',
    noun: 'a felony',
    short: 'Felony',
    title: 'How Long Does a Felony Stay on Your Record? State by State',
    description: 'A felony stays on your record unless it is cleared. For every state: whether a felony can be expunged or sealed, which ones, and how long you wait.',
    intro: [
      'A felony conviction stays on a criminal record permanently unless the state clears it. No state removes felonies just because time has passed, although several now seal some of them automatically after a set number of years.',
      'Most states allow some felonies to be cleared, usually lower-level, non-violent ones, after a longer wait than for misdemeanors. A few states do not allow any felony conviction to be cleared, and in some the only route is a pardon.',
      'Violent felonies, sex offenses and offenses against children are excluded almost everywhere.',
    ],
  },
];
