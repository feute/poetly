import { Provider } from 'jotai';
import { Suspense } from 'react';

import styles from './App.module.css';
import { SearchForm } from './components/SearchForm';
import { PoemsErrorBoundary } from './components/PoemsErrorBoundary';
import { PoemList } from './components/PoemList';

function App() {
  return (
    <Provider>
      <div className={styles.root}>
        <h1 className={styles.heading}>Poetly</h1>
        <main className={styles.mainSection}>
          <SearchForm />
          <Suspense fallback={<p className={styles.loading}>Loading...</p>}>
            <PoemsErrorBoundary>
              <PoemList />
            </PoemsErrorBoundary>
          </Suspense>
        </main>
        <div />
      </div>
    </Provider>
  );
}

export default App;
