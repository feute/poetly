import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

import styles from './App.module.css';

const BASE_URL = 'https://poetrydb.org';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any>();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    fetchPoems(query);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }

  async function fetchPoems(query: string) {
    const response = await fetch(`${BASE_URL}/lines/${encodeURI(query)};1`);

    if (response.ok) {
      const json = await response.json();
      setResults(json);
    }
  }

  return (
    <div className={styles.root}>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Search" value={query} onChange={handleInputChange} />
      </form>
      {results && (
        <div>
          {results.map((poem: any, index: number) => (
            <h3 key={index}>
              {poem.title} - {poem.author}
            </h3>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
