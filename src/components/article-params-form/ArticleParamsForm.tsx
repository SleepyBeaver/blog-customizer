import { useRef, useState, useCallback } from 'react';
import clsx from 'clsx';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import { useClose } from '../hooks/useClose';

import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = () => {
    const ref = useRef<HTMLFormElement | null>(null)
    const [flag, setFlag] = useState(false);

    useClose({
        open: flag,
        onClose: () => setFlag(false),
        rootRef: ref
    })

    const toggleFlag = useCallback(() => {
        setFlag(prevFlag => !prevFlag);
    },[])

  return (
    <>
      <ArrowButton onClick={toggleFlag} isOpen={flag}/>
      <aside className = {clsx(styles.container, {[styles.container_open] : flag})}>
        <form className={styles.form}>
          <div className={styles.bottomContainer}>
            <Button title='Сбросить' htmlType='reset' type='clear' />
            <Button title='Применить' htmlType='submit' type='apply' />
          </div>
        </form>
      </aside>
    </>
  );
};
