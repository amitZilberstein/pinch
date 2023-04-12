import React, { useEffect, useRef, useState, useContext } from 'react';
import './styles.scss';
import useOnScreen from '../../hooks/useOnScreen';
import { ContextLoader } from '../../context';

const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const RollingChars = ({
	children,
	delay = 100,
	onScreenTrigger = true,
	isMouseOver = null
}) => {

	const [isLoading] = useContext(ContextLoader);

	const containerEl = useRef(null);
	const charsEl = useRef(null);
	let intervalsId = [];
	let timeoutsId = [];

	const onScreen = useOnScreen(containerEl);
	const [isAnimStarted, updateIsAnimStarted] = useState(false);

	useEffect(() => {
		if ((onScreenTrigger === true && onScreen === true && isLoading === false) ||
				(onScreenTrigger === false && isLoading === false)) {
			setTimeout(() => {
				startAnim();
			}, delay);
		};
	}, [onScreen, isLoading]);

	const startAnim = () => {
		updateIsAnimStarted(true);
		if (containerEl.current === null) return;
		charsEl.current = [...containerEl.current.querySelectorAll('.char')];
		charsEl.current.map((char, index) => {
			const duration = Math.random() * 0.75;
			char.style.transition = `opacity ${duration}s linear`;
			char.style.animationDuration = `${duration}s`;

			if (intervalsId[index]) window.clearRequestInterval(intervalsId[index]);
			intervalsId[index] = window.requestInterval(() => {
				char.innerHTML = alphabet[Math.floor(Math.random() * alphabet.length)];
			}, 100);

			clearTimeout(timeoutsId[index]);
			timeoutsId[index] = setTimeout(() => {
				if (intervalsId[index]) window.clearRequestInterval(intervalsId[index]);
				char.innerHTML = char.getAttribute('data-char');
				char.style.transition = ``;
			}, duration * 1000);
		})
	}

	useEffect(() => {
		if (isMouseOver !== null) {
			updateIsAnimStarted(false);
			setTimeout(() => {
				startAnim(true);
			}, 100)
		}
	}, [isMouseOver])

	return (
		<span
			className={`RollingChars no-reset ${isAnimStarted ? 'is-anim-started' : ''}`}
			ref={containerEl}
		>
			{children}
		</span>
	);
}

export default RollingChars;