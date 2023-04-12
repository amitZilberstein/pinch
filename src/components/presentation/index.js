import React, { useEffect, useRef } from 'react';
import ScrollCta from '../scrollCta';
import { RichText } from 'prismic-reactjs';
import SplitText from '../splitText';
import Button from '../button';
import RollingChars from '../rollingChars';
import VideoResponsive from '../videoResponsive';
import { normalize } from '../../helpers';
import lottie from 'lottie-web';
import dollarEntryAnimData from './dollar_entry.json';
import useOnScreen from '../../hooks/useOnScreen';
import radiatingTextWelcome from '../../images/display_text_1.svg';
import radiatingTextPayWith from '../../images/display_text_2.svg';
import mobileRadiatingTextWelcome from '../../images/display_text_1_mobile.svg';
import mobileRadiatingTextPayWith from '../../images/display_text_2_mobile.svg';
import smoothScrollTo from '../../helpers/smoothScrollTo';
import './styles.scss';

const Presentation = ({ data }) => {

	const dollarContainerEl = useRef(null);
	const dollarEntryAnim = useRef(null);
	const dollarIsOnScreen = useOnScreen(dollarContainerEl);
	const phoneContainerEl = useRef(null);
	const phoneEl = useRef(null);

	useEffect(() => {
		window.addEventListener('wheel', handleScroll);
		return () => {
			window.removeEventListener('wheel', handleScroll);
		}
	});

	useEffect(() => {
		if (dollarIsOnScreen === true) {
			dollarEntryAnim.current = lottie.loadAnimation({
				container: dollarContainerEl.current,
				renderer: 'svg',
				loop: false,
				autoplay: true,
				animationData: dollarEntryAnimData
			});
		}
		return () => {
			if (dollarEntryAnim.current) dollarEntryAnim.current.destroy();
		}
	}, [dollarIsOnScreen])

	const handleScroll = () => {
		// Phone rotation
		const phoneContainerRect = phoneContainerEl.current.getBoundingClientRect();
		if (phoneContainerRect.top < window.innerHeight && phoneContainerRect.top + phoneContainerRect.height > 0) {
			const pos = phoneContainerRect.top + phoneContainerRect.height;
			const ratio = normalize(pos, phoneContainerRect.height + window.innerHeight, 0);
			phoneEl.current.style.transform = `rotateX(${-50 * ratio}deg)`;
		}
	}

	 const handleButtonClick = () => {
		const target = document.querySelector('.GetPinchTarget');
		smoothScrollTo(target);
	 }

	return (
		<section className="Presentation">

			<div className="Presentation__ScrollCtaContainer">
				<ScrollCta />
			</div>

			<div className="Presentation__Cards">
				<div className="Presentation__Card Presentation__Card--Bottom" data-is-inview data-parallax="0.3">
					<div className="Presentation__CardAppear">
						<img srcSet={data.image_card_bottomSharp.childImageSharp.fluid.srcSet} />
					</div>
				</div>
				<div className="Presentation__Card Presentation__Card--Top" data-is-inview data-parallax="0.2">
					<div className="Presentation__CardAppear">
						<img srcSet={data.image_card_topSharp.childImageSharp.fluid.srcSet} />
					</div>
				</div>
			</div>

			{/*<div className="Presentation__Section Presentation__Welcome">*/}
			{/*	<div className="Presentation__Dots" data-is-inview>*/}
			{/*		<SplitText splitBy="chars" delay="0.01">*/}
			{/*			<RollingChars>*/}
			{/*				<span className="Presentation__DotsLine">Scroll to explore</span>*/}
			{/*				<span className="Presentation__DotsLine">- 01 / 08</span>*/}
			{/*			</RollingChars>*/}
			{/*		</SplitText>*/}
			{/*	</div>*/}
			{/*	<div className="Presentation__WelcomeSmallText" data-is-inview>*/}
			{/*		<div className="Dollarzzz">$</div>*/}
			{/*		<div className="Right">*/}
			{/*			<SplitText splitBy="chars" noDelay>*/}
			{/*				<RollingChars>*/}
			{/*					<span className="RightLine">Welcome to the</span>*/}
			{/*					<span className="RightLine">Gamers Bank</span>*/}
			{/*				</RollingChars>*/}
			{/*			</SplitText>*/}
			{/*		</div>*/}
			{/*	</div>*/}
			{/*	<div className="desktop">*/}
			{/*		<img src={radiatingTextWelcome} alt="Welcome to the gamers bank" />*/}
			{/*	</div>*/}
			{/*	<div className="mobile">*/}
			{/*		<img src={mobileRadiatingTextWelcome} alt="Welcome to the gamers bank" />*/}
			{/*	</div>*/}
			{/*</div>*/}
			<div className="no-welcome-spacer"></div>

			<div className="Presentation__Section Presentation__Two">
				<div className="Presentation__Dots" data-is-inview>
					<SplitText splitBy="chars" noDelay>
						<RollingChars>
							<span className="Presentation__DotsLine">banking with passion</span>
							<span className="Presentation__DotsLine">- 02 / 08</span>
						</RollingChars>
					</SplitText>
				</div>
				<h3 className="Presentation__Title" data-is-inview>
					<SplitText splitBy="lines">
						<RichText render={data.section_two_title} />
					</SplitText>
				</h3>
				<div className="Presentation__TwoContainer">
					<div className="Presentation__TwoVideo" ref={dollarContainerEl} data-is-inview>
					</div>
					<div className="Presentation__Body" data-is-inview>
						<SplitText splitBy="lines">
							<RichText render={data.section_two_text} />
						</SplitText>
					</div>
				</div>
			</div>

			<div className="Presentation__Section Presentation__Three">
				<div className="Presentation__Dots Presentation__Dots--Left" data-is-inview>
					<SplitText splitBy="chars" noDelay>
						<RollingChars>
							<span className="Presentation__DotsLine">Traditional banks</span>
							<span className="Presentation__DotsLine">- 03 / 08</span>
						</RollingChars>
					</SplitText>
				</div>
				<h3 className="Presentation__Title" data-is-inview>
					<SplitText splitBy="lines">
						<RichText render={data.section_three_title} />
					</SplitText>
				</h3>
				<div className="Presentation__ThreeContainer">
					<div className="Presentation__ThreeVideo">
						<VideoResponsive className="Presentation__Videos" srcDesktop={data.section_three_video.url} srcMobile={data.section_three_video_mobile.url} />
					</div>
					<div className="Presentation__ThreeTexts">
						<div className="Presentation__Body Presentation__Body--Big" data-is-inview>
							<SplitText splitBy="lines">
								<RichText render={data.section_three_text_big} />
							</SplitText>
						</div>
						<div className="Presentation__Body" data-is-inview>
							<SplitText splitBy="lines">
								<RichText render={data.section_three_text} />
							</SplitText>
						</div>
					</div>
				</div>
			</div>

			<div className="Presentation__Section Presentation__PayWith">
				<div className="desktop">
					<img src={radiatingTextPayWith} alt="Pay with Pinch support creators" />
				</div>
				<div className="mobile">
					<img src={mobileRadiatingTextPayWith} alt="Pay with Pinch support creators" />
				</div>
			</div>

			<div className="Presentation__Section Presentation__Four" ref={phoneContainerEl}>
				<div className="Presentation__Dots" data-is-inview>
					<SplitText splitBy="chars" noDelay>
						<RollingChars>
							<span className="Presentation__DotsLine">Pay with Pinch</span>
							<span className="Presentation__DotsLine">- 04 / 08</span>
						</RollingChars>
					</SplitText>
				</div>
				<div className="Presentation__FourText" data-is-inview>
					<SplitText splitBy="lines">
						<RichText render={data.section_four_text} />
					</SplitText>
				</div>
				<div className="PresentationFour__Image" data-is-inview>
					<div ref={phoneEl}>
						<div className="PresentationFour__ImageFloat">
							<img srcSet={data.section_four_imageSharp.childImageSharp.fluid.srcSet} />
						</div>
					</div>
				</div>
			</div>

			<div className="Presentation__Section Presentation__Five">
				<div className="Presentation__Dots Presentation__Dots--Normal" data-is-inview>
					<SplitText splitBy="chars" noDelay>
						<RollingChars delay={1000}>
							<span className="Presentation__DotsLine">05 / 08</span>
						</RollingChars>
					</SplitText>
				</div>
				<h3 className="Presentation__FiveTitle" data-is-inview>
					<SplitText splitBy="lines">
						<RichText render={data.section_five_title} />
					</SplitText>
				</h3>
				<div className="Presentation__FiveVideo">
					<VideoResponsive className="Presentation__Videos" srcDesktop={data.section_five_video.url} srcMobile={data.section_five_video_mobile.url} />
				</div>
				<div className="Presentation__FiveBottom">
					<div className="Presentation__Body Presentation__Body--Small" data-is-inview>
						<SplitText splitBy="lines">
							<RichText render={data.section_five_text} />
						</SplitText>
					</div>
					<Button text="Open account" type="secondary" hasArrow onClick={handleButtonClick} />
				</div>
			</div>

			<div className="Presentation__Section Presentation__Double">
				<div className="Presentation__DoubleInfos">
					<div className="Presentation__Dots Presentation__Dots--Normal" data-is-inview>
						<SplitText splitBy="chars" noDelay>
							<RollingChars delay={1000}>
								<span className="Presentation__DotsLine">06 / 08</span>
							</RollingChars>
						</SplitText>
					</div>
					<h3 className="Presentation__Body Presentation__Body--Big Presentation__DoubleTitle" data-is-inview>
						<SplitText splitBy="lines">
							<RichText render={data.section_six_title} />
						</SplitText>
					</h3>
					<div className="Presentation__Body Presentation__Body--Tiny" data-is-inview>
						<SplitText splitBy="lines">
							<RichText render={data.section_six_text} />
						</SplitText>
					</div>
					<Button text="Open account" type="secondary" hasArrow onClick={handleButtonClick} />
				</div>
				<div className="Presentation__DoubleVideo">
					<VideoResponsive className="Presentation__Videos" srcDesktop={data.section_six_video.url} srcMobile={data.section_six_video_mobile.url} />
				</div>
				<h3 className="Presentation__Body Presentation__Body--Big Presentation__DoubleTitle--Mobile" data-is-inview>
					<SplitText splitBy="lines">
						<RichText render={data.section_six_title} />
					</SplitText>
				</h3>
			</div>

			<div className="Presentation__Section Presentation__Double Presentation__Double--Right">
				<h3 className="Presentation__Body Presentation__Body--Big Presentation__DoubleTitle--Mobile" data-is-inview>
					<SplitText splitBy="lines">
						<RichText render={data.section_seven_title} />
					</SplitText>
				</h3>
				<div className="Presentation__DoubleVideo">
					<VideoResponsive className="Presentation__Videos" srcDesktop={data.section_seven_video.url} srcMobile={data.section_seven_video_mobile.url} />
				</div>
				<div className="Presentation__DoubleInfos">
					<div className="Presentation__Dots Presentation__Dots--Normal" data-is-inview>
						<SplitText splitBy="chars" noDelay>
							<RollingChars delay={1000}>
								<span className="Presentation__DotsLine">07 / 08</span>
							</RollingChars>
						</SplitText>
					</div>
					<h3 className="Presentation__Body Presentation__Body--Big Presentation__DoubleTitle" data-is-inview>
						<SplitText splitBy="lines">
							<RichText render={data.section_seven_title} />
						</SplitText>
					</h3>
					<div className="Presentation__Body Presentation__Body--Tiny" data-is-inview>
						<SplitText splitBy="lines">
							<RichText render={data.section_seven_text} />
						</SplitText>
					</div>
					<Button text="Open account" type="secondary" hasArrow onClick={handleButtonClick} />
				</div>
			</div>

		</section>
	)
}

export default Presentation;