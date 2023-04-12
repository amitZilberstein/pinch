import React, { useRef } from "react";
import ScrollCtaImage from '../../images/scroll-cta.png';
import smoothScrollTo from '../../helpers/smoothScrollTo';
import './styles.scss';

const ScrollCta = () => {

	const handleClick = () => {
		const target = document.querySelector('.Presentation__Cards');
		if (!target) return;
		smoothScrollTo(target);
	}

	return (
		<div data-is-inview className="ScrollCta" onClick={handleClick}>
			<img src={ScrollCtaImage} />
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 13.2"><path d="M2.4 1.2v1.4l11.1 8.2h1l11.1-8.2V1.2c0-.7.5-1.2 1.2-1.2S28 .5 28 1.2v1.3c0 1-.2 1.3-.7 1.7l-11.5 8.5c-.3.2-.7.4-1.1.4h-1.5c-.4 0-.8-.1-1.1-.4L.7 4.2C.1 3.8 0 3.5 0 2.5V1.2C0 .5.5 0 1.2 0s1.2.5 1.2 1.2z" fill="#fff"/></svg>
		</div>
	)
}

export default ScrollCta;