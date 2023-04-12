import React, { useEffect, useRef, useState, useContext } from "react"
import { throttle } from 'underscore';
import './styles.scss'
import SplitText from '../splitText';
import RollingChars from '../rollingChars';
import lottie from 'lottie-web';
import buttonAnimEntryGradientData from './button_entry_gradient.json';
import buttonAnimHoverGradientData from './button_hover_gradient.json';
import buttonAnimEntryGradientLongData from './button_entry_gradient_long.json';
import buttonAnimHoverGradientLongData from './button_hover_gradient_long.json';
import buttonAnimEntryGreyData from './button_entry_grey.json';
import buttonAnimHoverGreyData from './button_hover_grey.json';
import buttonAnimEntryGreyLongData from './button_entry_grey_long.json';
import buttonAnimHoverGreyLongData from './button_hover_grey_long.json';
import useOnScreen from '../../hooks/useOnScreen';
import { ContextLoader } from '../../context';

/*
* style :
* 'colored' -> border have the gradient
* 'grey' -> border are grey
*
* type :
* primary -> higher (e.g nav button)
* secondary -> larger
*
* hasArrow :
* true -> arrow and text on the left
* false -> no arrow and text centered
*/

const Button = ({
	text,
	onClick,
	className = '',
	style = 'colored',
	type = 'primary',
	hasArrow = false,
}) => {

	const [isLoading] = useContext(ContextLoader);
	const [isEntryAnimEnded, updateIsEntryAnimEnded] = useState(false);
	const buttonEl = useRef(null);
	const onScreen = useOnScreen(buttonEl);
	const lottieEntryContainerEl = useRef(null);
	const lottieHoverContainerEl = useRef(null);
	let lottieEntryAnim = useRef(null);
	let lottieHoverAnim = useRef(null);
	const ratio = type === 'primary' ? 0.4198473282 : 0.3081081081;

	const [isMouseOver, updateIsMouseOver] = useState(false);

	useEffect(() => {
		let entryAnimData = null;
		let hoverAnimData = null;
		if (style === 'colored' && type === 'primary') {
			entryAnimData = buttonAnimEntryGradientData;
			hoverAnimData = buttonAnimHoverGradientData;
		}
		else if (style === 'colored' && type === 'secondary') {
			entryAnimData = buttonAnimEntryGradientLongData;
			hoverAnimData = buttonAnimHoverGradientLongData;
		}
		else if (style === 'grey' && type === 'primary') {
			entryAnimData = buttonAnimEntryGreyData;
			hoverAnimData = buttonAnimHoverGreyData;
		}
		else if (style === 'grey' && type === 'secondary') {
			entryAnimData = buttonAnimEntryGreyLongData;
			hoverAnimData = buttonAnimHoverGreyLongData;
		}

		if (onScreen === true && isLoading === false) {
			lottieEntryAnim.current = lottie.loadAnimation({
				container: lottieEntryContainerEl.current,
				renderer: 'svg',
				loop: false,
				autoplay: true,
				animationData: entryAnimData
			});

			lottieEntryAnim.current.addEventListener('complete', function() {
				updateIsEntryAnimEnded(true);
				lottieEntryAnim.current.destroy();
			})

			lottieHoverAnim.current = lottie.loadAnimation({
				container: lottieHoverContainerEl.current,
				renderer: 'svg',
				loop: false,
				autoplay: false,
				animationData: hoverAnimData
			});

			return function clear () {
				lottieEntryAnim.current.destroy();
				lottieHoverAnim.current.destroy();
			}
		}
	}, [onScreen, isLoading]);

	const handleClick = () => {
		if (onClick) onClick();
	}

	useEffect(() => {
		const throttleResize = throttle(handleResize, 200);
		window.addEventListener('resize', throttleResize);
		handleResize();
		return function clean () {
			window.removeEventListener('resize', throttleResize);
		}
	});

	const handleMouseEnter = () => {
		if (localStorage.getItem('is-touch') === 'true') return;
		if (isEntryAnimEnded && lottieHoverAnim.current) {
			updateIsMouseOver(true);
			lottieHoverAnim.current.setDirection(1);
			lottieHoverAnim.current.play();
		}
	}

	const handleMouseLeave = () => {
		if (localStorage.getItem('is-touch') === 'true') return;
		if (isEntryAnimEnded && lottieHoverAnim.current) {
			updateIsMouseOver(false);
			lottieHoverAnim.current.setDirection(-1);
			lottieHoverAnim.current.play();
		}
	}

	const handleResize = () => {
		const buttonW = buttonEl.current.offsetWidth;
		buttonEl.current.style.height = `${buttonW * ratio}px`;
	}

	return (
		<div
			className={`Button ${className} ${style} ${type} ${hasArrow ? 'has-arrow' : ''} ${onScreen ? 'on-screen' : ''} ${isEntryAnimEnded ? 'is-entry-anim-ended' : ''}`}
			ref={buttonEl}
			onClick={handleClick}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			data-is-inview
		>
			<div className="Button__Container">
				<span className="Button__Text">
					<SplitText splitBy="chars" delay="0.02">
						<RollingChars isMouseOver={isMouseOver}> {text} </RollingChars>
					</SplitText>
				</span>
				<svg className="Button__Arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 13.2"><path d="M2.4 1.2v1.4l11.1 8.2h1l11.1-8.2V1.2c0-.7.5-1.2 1.2-1.2S28 .5 28 1.2v1.3c0 1-.2 1.3-.7 1.7l-11.5 8.5c-.3.2-.7.4-1.1.4h-1.5c-.4 0-.8-.1-1.1-.4L.7 4.2C.1 3.8 0 3.5 0 2.5V1.2C0 .5.5 0 1.2 0s1.2.5 1.2 1.2z" fill="#fff"/></svg>
			</div>
			<div className="Button__LottieContainer Button__LottieContainer--Entry" ref={lottieEntryContainerEl}></div>
			<div className="Button__LottieContainer Button__LottieContainer--Hover" ref={lottieHoverContainerEl}></div>
		</div>
	)
}

export default Button
