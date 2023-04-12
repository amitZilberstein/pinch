import React, {useRef, useEffect, useContext} from 'react';
import Splitting from 'splitting';
import { ContextLoader } from '../../context';

const SplitText = ({
	baseDelay = 0,
	delay = 0.025,
	noDelay = false,
	splitBy = 'words',
	children
}) => {

	const [isLoading] = useContext(ContextLoader);

	const refText = useRef(null);

	useEffect(() => {
		if (isLoading === true) return;

		const results = Splitting({target: refText.current, by: splitBy });
		if (splitBy === 'words' && !noDelay) {
			results[0].words.map((word, index) => {
				word.style.transitionDelay = baseDelay + (index * delay) + 's';
			});
		} else if (splitBy === 'chars' && !noDelay) {
			results[0].chars.map((char, index) => {
				char.style.transitionDelay = baseDelay + (index * delay) + 's';
				char.style.animationDelay = baseDelay + (index * delay) + 's';
			});
		} else if (splitBy === 'lines') {
			results[0].lines.map((line, lineIndex) => {
				line.map(word => {
					word.classList.add(`line-${lineIndex}`)
					const content = word.innerHTML;
					word.innerHTML = '';
					const wrapperEl = document.createElement('span');
					wrapperEl.innerHTML = content;
					word.appendChild(wrapperEl);
				})
			})
		}

	}, [isLoading])

	return (
		<span ref={refText}>
			{children}
		</span>
	)
}

export default SplitText;