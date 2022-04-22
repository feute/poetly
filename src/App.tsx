import { Provider } from 'jotai';
import { Suspense } from 'react';

import styles from './App.module.css';
import { ThemeToggler } from './components/ThemeToggler';
import { SearchForm } from './components/SearchForm';
import { PoemsErrorBoundary } from './components/PoemsErrorBoundary';
import { PoemList } from './components/PoemList';

function App() {
  return (
    <Provider>
      <div className={styles.root}>
        <ThemeToggler />
        <h1 className={styles.heading}>Poetly</h1>
        <main className={styles.mainSection}>
          <SearchForm />
          <Suspense fallback={<p className={styles.loading}>Loading...</p>}>
            <PoemsErrorBoundary>
              <PoemList />
            </PoemsErrorBoundary>
          </Suspense>
        </main>
        <footer className={styles.footer}>
          <p className={styles.footerText}>
            Created by{' '}
            <a href="https://github.com/feute" target="_blank" rel="noreferrer noopener">
              Ángel
            </a>
          </p>
        </footer>
      </div>
    </Provider>
  );
}

export default App;
