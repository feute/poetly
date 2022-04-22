import { useAtom } from 'jotai';
import { Fragment, useEffect, useState } from 'react';

import styles from './PoemItem.module.css';
import { queryAtom } from '../atoms';

type TPoemLinesProps = {
  lines: any;
};

function PoemLines({ lines }: TPoemLinesProps) {
  const [query] = useAtom(queryAtom);
  const [index, setIndex] = useState(-1);

  useEffect(() => {
    if (!lines || typeof lines !== 'object' || lines.length === 0) {
      return;
    }

    lines.map((line: string, _index: number) => {
      if (line.toLowerCase().includes(query.toLowerCase())) {
        setIndex(_index);
      }
      return line;
    });
  }, [lines, query]);

  if (index < 0) {
    return null;
  }

  return (
    <Fragment>
      {index > 0 && <p className={styles.preverse}>{lines[index - 1]}</p>}
      <p className={styles.verse}>{lines[index]}</p>
      {index < lines.length - 1 && <p className={styles.preverse}>{lines[index + 1]}</p>}
    </Fragment>
  );
}

export type TPoemItemProps = {
  poem: any;
};

export function PoemItem({ poem }: TPoemItemProps) {
  if (!poem || typeof poem !== 'object') {
    return null;
  }

  return (
    <article className={styles.wrapper}>
      <header className={styles.header}>
        <h4 className={styles.title}>{poem.title}</h4>
        <p className={styles.author}>{poem.author}</p>
      </header>
      <PoemLines lines={poem.lines} />
    </article>
  );
}
