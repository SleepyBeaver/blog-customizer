import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, FormEvent } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState, ArticleStateType, OptionType } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [paramsFormState, setParamsFormState] = useState<ArticleStateType>(defaultArticleState)
	const [articleState, setArticleState] = useState(defaultArticleState)

	const setFontFamily = (select: OptionType) => {
		setParamsFormState({...paramsFormState, fontFamilyOption: select})
	}

	const setFontSize = (select: OptionType) => {
		setParamsFormState({...paramsFormState, fontSizeOption: select})
	}

	const setFontColor = (select: OptionType) => {
		setParamsFormState({...paramsFormState, fontColor: select})
	}

	const setBackgroundColor = (select: OptionType) => {
		setParamsFormState({...paramsFormState, backgroundColor: select})
	}

	const setContainerWidth = (select: OptionType) => {
		setParamsFormState({...paramsFormState, contentWidth: select})
	}

	const resetParamsFormState = () => {
		setArticleState(defaultArticleState);
		setParamsFormState(defaultArticleState)
	}

	const applyParamsFormState = (event: FormEvent) => {
		event.preventDefault();
		setArticleState(paramsFormState);
	}
	
	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm 
			fontFamily = {setFontFamily} 
			fontSize = {setFontSize} 
			fontColor = {setFontColor}
			backgroundColor = {setBackgroundColor}
			contentWidth = {setContainerWidth} 
			resetButton = {resetParamsFormState}
			applyButton = {applyParamsFormState}
			paramsFormState = {paramsFormState} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
