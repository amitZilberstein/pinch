import React, { useEffect, useRef, useState, useContext } from "react"
import { navigate } from "gatsby";
import { ContextLoader } from '../context';
import isInView from '../helpers/isInView.js';
import { throttle } from 'underscore';
import FeaturedCreatorsCanvas from '../helpers/featuredCreatorsCanvas';
import { RichText } from 'prismic-reactjs';
import '../styles/pages/featuredCreators.scss';
import SplitText from '../components/splitText';
import RollingChars from '../components/rollingChars';
import SEO from "../components/seo";
import hideDisabledPagesLinks from '../helpers/hideDisabledPagesLinks';

const FeaturedCreators = ({ data: { prismic } }) => {

	const isPageActivated = prismic.allCommons.edges[0].node.activate_featured_creators_page;
	const dataCreators = prismic.allCreators.edges.filter(edge => edge.node.is_featured);

	const [isLoading] = useContext(ContextLoader);
	useEffect(() => {
		if (isLoading === true) return;

		if (isPageActivated === false) {
			navigate('/', { replace: true })
			return;
		};

	}, [isLoading]);

	useEffect(() => {
		if (isLoading === true) return;
		const isInViewDetector = new isInView();
		isInViewDetector.pageLoadedTick();
		return () => {
		isInViewDetector.destroy();
		}
	})

	// Desktop
	let canvas = null;
	const containerEl = useRef(null);
	const introEl = useRef(null);
	let timeoutIntroId = null;

	useEffect(() => {
		if (isLoading === true) return;
		hideDisabledPagesLinks(prismic.allCommons.edges[0].node);
		if (localStorage.getItem('is-touch') === 'false') {
			canvas = new FeaturedCreatorsCanvas(dataCreators);
		}
		return function clear () {
			if (canvas) canvas.destroy();
		}
	}, [isLoading])

	useEffect(() => {
		timeoutIntroId = setTimeout(() => {
			if (canvas) canvas.introAnimation();
		}, 500);
		return function clear () {
			clearTimeout(timeoutIntroId);
		}
	})

	useEffect(() => {
		window.addEventListener('wheel', handleWheel);
		return function clear () {
			window.removeEventListener('wheel', handleWheel)
		}
	})

	const handleWheel = () => {
		if (canvas) {
			canvas.addWheelAndClickEvent();
			containerEl.current.classList.add('started');
			introEl.current.classList.add('hidden');
			window.removeEventListener('wheel', handleWheel);
		}
	}

	// Mobile
	const containerListMobileEl = useRef(null);
	const itemEls = useRef([]);
	const [currentIndex, updateCurrentIndex] = useState(0);
	let itemHeight = 0;

	// Set height depending on content height
	useEffect(() => {
		itemEls.current.map(itemEl => {
			const closedHeight = itemEl.getBoundingClientRect().height;
			const contentEl = itemEl.querySelector('.FeaturedCreators__CreatorDescription');
			const contentElHeight = contentEl.getBoundingClientRect().height;
			const openHeightInPx = closedHeight + contentElHeight;
			const openHeightInVw = 100 * (openHeightInPx / window.innerWidth);
			itemEl.setAttribute('data-open-height', openHeightInVw);
		})
	}, [])

	const handleItemClick = e => {
		const previousItem = itemEls.current[currentIndex];
		if (previousItem) {
			previousItem.classList.remove('current');
			previousItem.style = '';
		};

		const newIndex = e.target.closest('[data-creator-index]').getAttribute('data-creator-index');
		const newItem = itemEls.current[newIndex];

		if (currentIndex === newIndex) {
			updateCurrentIndex(null);
		} else {
			updateCurrentIndex(newIndex);
			newItem.classList.add('current');
			newItem.style = `height: ${newItem.getAttribute('data-open-height')}vw;`;
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
			itemHeight = itemEls.current[0].getBoundingClientRect().height;
		} else if (itemEls.current[1]) {
			itemHeight = itemEls.current[1].getBoundingClientRect().height;
		}
	}

	return (
		<section className="FeaturedCreators" ref={containerEl} data-is-inview>
			<SEO bodyClass="FeaturedCreatorsPage" title="Featured Creators – Pinch" />
			<div className="FeaturedCreators__Overlay"></div>
			<div className="FeaturedCreators__Intro" ref={introEl}>
				<div className="FeaturedCreators__TitleContainer">
					<h1 className="FeaturedCreators__Title" data-is-inview>
						<span> Featured </span>
						<span className="space">&nbsp;</span>
						<span className="red"> Creators </span>
					</h1>
				</div>
				<div className="FeaturedCreators__Cta FeaturedCreators__Cta--Desktop" data-is-inview>
					<SplitText splitBy="chars" noDelay>
						<RollingChars onScreenTrigger={false} delay={1500}>
							Scroll to navigate forwards
						</RollingChars>
					</SplitText>
				</div>
				<div className="FeaturedCreators__Cta FeaturedCreators__Cta--Mobile" data-is-inview>
					<SplitText splitBy="chars" noDelay>
						<RollingChars onScreenTrigger={false} delay={1500}>
							Scroll to navigate
						</RollingChars>
					</SplitText>
				</div>
				<div className="FeaturedCreators__Anim" data-is-inview></div>
			</div>
			<div className="FeaturedCreators__Footer" data-is-inview>
				<span>Featured Creators</span>
				<span>Scroll to navigate</span>
			</div>
			<ul
				className="FeaturedCreators__ListMobile"
				ref={containerListMobileEl}
				data-is-inview
			>
				{dataCreators.map((creator, index) => (
					<li className="FeaturedCreators__Creator"
						key={`creator-item-${index}`}
						data-creator-index={index}
						onClick={handleItemClick}
						ref={ref => itemEls.current[index] = ref}
					>
						<img srcSet={creator.node.imageSharp.childImageSharp.fluid.srcSet} />
						<div className="FeaturedCreators__CreatorInfosTop">
							<h3 className="FeaturedCreators__Name"> {creator.node.name[0].text} </h3>
							<svg viewBox="0 0 24 54" xmlns="http://www.w3.org/2000/svg"><path d="M3.124 50.79l18.448-23.726L3.124 3.34" stroke="#FFF" strokeWidth="6" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="bevel"/></svg>
						</div>
						<div className="FeaturedCreators__CreatorDescription">
							<RichText render={creator.node.description} />
						</div>
					</li>
				))}
			</ul>
		</section>
	)
}

export default FeaturedCreators;

export const featuredCreatorsQuery = graphql`
	query featuredCreatorsQuery {
		prismic {
			allCreators(sortBy:meta_lastPublicationDate_DESC) {
				edges {
					node {
						_meta {
							uid
						}
						name
						is_featured
						description
						image
						imageSharp {
							childImageSharp {
								fluid(maxWidth: 4000) {
									srcSet
								}
							}
						}
					}
				}
			}
			allCommons {
				edges {
					node {
						activate_blog_and_articles_pages
						activate_featured_creators_page
					}
				}
			}
		}
	}
`;
