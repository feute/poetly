import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef } from 'react';

import styles from './SearchInput.module.css';

export type TSearchInputProps = ComponentPropsWithoutRef<'input'>;

export const SearchInput = forwardRef<HTMLInputElement, TSearchInputProps>(
  ({ className, ...props }, ref) => (
    <input type="text" ref={ref} className={styles.input.concat(' ', className || '')} {...props} />
  )
);
