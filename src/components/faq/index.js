import React, { useState, useRef, useEffect } from "react";
import { throttle } from 'underscore';
import { RichText } from 'prismic-reactjs';
import { limitStringSize } from '../../helpers';
import smoothScrollTo from '../../helpers/smoothScrollTo';
import './styles.scss';

const Faq = ({ data }) => {

	const [currentIndex, updateCurrentIndex] = useState(null);
	const leftItemEls = useRef([]);
	const rightItemEls = useRef([]);
	let timeoutId = null;
	let itemHeight = 0;
	const transitionTime = 800;

	// Set height depending on content height
	useEffect(() => {
		rightItemEls.current.map(itemEl => {
			const closedHeight = itemEl.querySelector('.Faq__RightQuestion').getBoundingClientRect().height;
			const contentEl = itemEl.querySelector('.Faq__RightAnswer');
			const contentElHeight = contentEl.getBoundingClientRect().height;
			const openHeightInPx = closedHeight + contentElHeight;
			const openHeightInVw = 100 * (openHeightInPx / window.innerWidth);
			itemEl.style.height = closedHeight + 'px';
			itemEl.setAttribute('data-closed-height', closedHeight);
			itemEl.setAttribute('data-open-height', openHeightInVw);
		})
	}, [])

	const handleLeftItemClick = e => {
		const newIndex = e.target.closest('[data-faq-index]').getAttribute('data-faq-index');
		const targetItem = rightItemEls.current[newIndex];
		const y = targetItem.getBoundingClientRect().y;
		if (y < 0 || y > window.innerHeight * 0.8) {
			smoothScrollTo(targetItem)
		}
		handleItemClick(e);
	}

	const handleItemClick = e => {
		const previousItem = rightItemEls.current[currentIndex];
		const previousItemLeft = leftItemEls.current[currentIndex];
		if (previousItem) {
			previousItemLeft.classList.remove('current');
			previousItem.classList.remove('current');
			previousItem.style.height = previousItem.getAttribute('data-closed-height') + 'px';
		};

		const newIndex = e.target.closest('[data-faq-index]').getAttribute('data-faq-index');
		const newItem = rightItemEls.current[newIndex];

		if (currentIndex === newIndex) {
			updateCurrentIndex(null);
		} else {
			updateCurrentIndex(newIndex);
			newItem.classList.add('current');
			newItem.style = `height: ${newItem.getAttribute('data-open-height')}vw;`;
			leftItemEls.current[newIndex].classList.add('current');
		}
	}

	useEffect(() => {
		const throttleResize = throttle(handleResize, 200);
		window.addEventListener('resize', throttleResize);
		handleResize();
		return function clean () {
			window.removeEventListener('resize', throttleResize);
		}
	})

	const handleResize = () => {
		if (currentIndex !== 0) {
			itemHeight = rightItemEls.current[0].getBoundingClientRect().height;
		} else if (rightItemEls.current[1]) {
			itemHeight = rightItemEls.current[1].getBoundingClientRect().height;
		}
	}

	return (
		<div className="Faq" data-is-inview>
			<ul className="Faq__Left">
				{data.map((item, index) => (
					<li
						className="Faq__LeftItem"
						data-faq-index={index}
						onClick={handleLeftItemClick}
						ref={ref => leftItemEls.current[index] = ref}
						key={`faq-left-${index}`}
					>
							{limitStringSize(item.question[0].text, 40)}
					</li>
				))}
			</ul>
			<ul className="Faq__Right">
				{data.map((item, index) => (
					<li
						className="Faq__RightItem"
						data-faq-index={index}
						onClick={handleItemClick}
						ref={ref => rightItemEls.current[index] = ref}
						key={`faq-right-${index}`}
					>
						<svg className="Faq__RightArrow" viewBox="0 0 28 13.2"><path d="M2.4 1.2v1.4l11.1 8.2h1l11.1-8.2V1.2c0-.7.5-1.2 1.2-1.2S28 .5 28 1.2v1.3c0 1-.2 1.3-.7 1.7l-11.5 8.5c-.3.2-.7.4-1.1.4h-1.5c-.4 0-.8-.1-1.1-.4L.7 4.2C.1 3.8 0 3.5 0 2.5V1.2C0 .5.5 0 1.2 0s1.2.5 1.2 1.2z" fill="#fff"/></svg>
						<p className="Faq__RightQuestion">{item.question[0].text}</p>
						<p className="Faq__RightAnswer"><RichText render={item.answer} /></p>
					</li>
				))}
			</ul>
		</div>
	)
}

export default Faq
