import { useSetAtom } from 'jotai';
import { useRef, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

import styles from './SearchForm.module.css';
import { queryAtom } from '../atoms';
import { SearchInput } from './SearchInput';

export function SearchForm() {
  const setQueryAtom = useSetAtom(queryAtom);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setQueryAtom(query);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }

  function clear() {
    setQuery('');
    setQueryAtom('');

    inputRef.current?.focus();
  }

  return (
    <form onSubmit={handleSubmit} className={styles.wrapper}>
      <div className={styles.inputWrapper}>
        <SearchInput
          type="text"
          placeholder="Search poem..."
          ref={inputRef}
          value={query}
          onChange={handleInputChange}
          className={query && styles.input}
        />
        {query && (
          <button type="button" className={styles.clearButton} onClick={clear}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </button>
        )}
      </div>
    </form>
  );
}
