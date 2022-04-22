import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/query';

const BASE_URL = 'https://poetrydb.org';

export const queryAtom = atom('');
export const poemsAtom = atomWithQuery((get) => ({
  queryKey: ['poems', get(queryAtom)],
  queryFn: async ({ queryKey: [, query] }) => {
    if (!query || typeof query !== 'string') {
      return null;
    }

    const response = await fetch(`${BASE_URL}/lines/${encodeURI(query.trim())}`);
    return response.json();
  },
}));

export const darkModeAtom = atom(JSON.parse(String(localStorage.getItem('darkMode'))) ?? false);
export const darkModeAtomWithPersistence = atom(
  (get) => get(darkModeAtom),
  (get, set, value) => {
    set(darkModeAtom, value);
    localStorage.setItem('darkMode', JSON.stringify(Boolean(value)));
    document.documentElement.classList.add(value ? 'dark' : 'light');
    document.documentElement.classList.remove(value ? 'light' : 'dark');
  }
);

if (process.env.NODE_ENV !== 'production') {
  queryAtom.debugLabel = 'query';
  poemsAtom.debugLabel = 'poems';
  darkModeAtom.debugLabel = 'darkMode';
  darkModeAtomWithPersistence.debugLabel = 'darkModeWithPersistence';
}
