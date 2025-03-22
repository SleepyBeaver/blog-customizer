import { useRef, useState, FormEvent } from 'react';
import clsx from 'clsx';

import {
	OptionType,
	ArticleStateType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

import styles from './ArticleParamsForm.module.scss';

import { useClose } from '../hooks/useClose';

type ArticleParamsFormProps = {
	onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onApply }: ArticleParamsFormProps) => {
	const ref = useRef<HTMLFormElement | null>(null);
	const [isOpen, setIsOpen] = useState(false);
	const [paramsFormState, setParamsFormState] =
		useState<ArticleStateType>(defaultArticleState);

	const handleChange = (field: keyof ArticleStateType) => {
		return (value: OptionType) => {
			setParamsFormState((prevState) => ({ ...prevState, [field]: value }));
		};
	};

	const resetParamsFormState = () => {
		onApply(defaultArticleState);
		setParamsFormState(defaultArticleState);
	};

	const applyParamsFormState = (event: FormEvent) => {
		event.preventDefault();
		onApply(paramsFormState);
	};

	useClose({
		isOpen: isOpen,
		onClose: () => setIsOpen(false),
		rootRef: ref,
	});

	const toggleIsOpen = () => {
		setIsOpen((prevIsOpen) => !prevIsOpen);
	};

	return (
		<>
			<ArrowButton onClick={toggleIsOpen} isOpen={isOpen} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={applyParamsFormState}
					onReset={resetParamsFormState}>
					<Text size={31} weight={800} uppercase as={'h2'}>
						Задайте параметры
					</Text>
					<Select
						selected={paramsFormState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleChange('fontFamilyOption')}
						title='Шрифт'
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={paramsFormState.fontSizeOption}
						onChange={handleChange('fontSizeOption')}
						title='Font size'
					/>
					<Select
						selected={paramsFormState.fontColor}
						options={fontColors}
						onChange={handleChange('fontColor')}
						title='Font color'
					/>
					<Separator />
					<Select
						selected={paramsFormState.backgroundColor}
						options={backgroundColors}
						onChange={handleChange('backgroundColor')}
						title='Backgorund color'
					/>
					<Select
						selected={paramsFormState.contentWidth}
						options={contentWidthArr}
						onChange={handleChange('contentWidth')}
						title='Content width'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
