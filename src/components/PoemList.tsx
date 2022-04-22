import { useAtom } from 'jotai';

import styles from './PoemList.module.css';
import { poemsAtom } from '../atoms';
import { PoemItem } from './PoemItem';

export type TPoemListProps = {
  poems: any;
};

export function PoemList() {
  const [data] = useAtom(poemsAtom);

  if (!data || typeof data !== 'object') {
    return null;
  }

  if (data.hasOwnProperty('status')) {
    return <p className={styles.error}>Couldn't find any poem</p>;
  }

  return data.map((poem: any, index: number) => <PoemItem key={index} poem={poem} />);
}
