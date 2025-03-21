import { useRef, useState, useCallback, FormEvent } from 'react';
import clsx from 'clsx';

import { OptionType, ArticleStateType, fontFamilyOptions, fontSizeOptions, fontColors, backgroundColors, contentWidthArr } from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from "src/ui/text";
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

import styles from './ArticleParamsForm.module.scss';

import { useClose } from '../hooks/useClose';


type ArticleParamsFormProps = {
  fontFamily: (select: OptionType) => void,
  fontSize: (select: OptionType) => void,
  fontColor: (select: OptionType) => void,
  backgroundColor: (select: OptionType) => void,
  contentWidth: (select: OptionType) => void,
  resetButton: () => void,
  applyButton: (event: FormEvent) => void,
  paramsFormState: ArticleStateType,
}

export const ArticleParamsForm = ({
  fontFamily,
  fontSize,
  fontColor,
  backgroundColor,
  contentWidth,
  resetButton,
  applyButton,
  paramsFormState
}: ArticleParamsFormProps) => {
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
        <form className={styles.form} onSubmit = {applyButton}>
          <Text size = {31} weight = {800} uppercase as = {'h3'}>Задайте параметры</Text>
          <Select selected = {paramsFormState.fontFamilyOption} options = {fontFamilyOptions} onChange = {fontFamily} title = 'Шрифт'/>
          <RadioGroup name = 'fontSize' options = {fontSizeOptions} selected = {paramsFormState.fontSizeOption} onChange = {fontSize} title = 'Font size' />
          <Select selected = {paramsFormState.fontColor} options = {fontColors} onChange = {fontColor} title = 'Font color' />
          <Separator/>
          <Select selected = {paramsFormState.backgroundColor} options = {backgroundColors} onChange = {backgroundColor} title = 'Backgorund color' />
          <Select selected = {paramsFormState.contentWidth} options = {contentWidthArr} onChange = {contentWidth} title = 'Content width' />
          <div className={styles.bottomContainer}>
            <Button title='Сбросить' htmlType='reset' type='clear' onClick = {resetButton}/>
            <Button title='Применить' htmlType='submit' type='apply' />
          </div>
        </form>
      </aside>
    </>
  );
};
