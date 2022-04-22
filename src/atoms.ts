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

if (process.env.NODE_ENV !== 'production') {
  queryAtom.debugLabel = 'query';
  poemsAtom.debugLabel = 'poems';
}
