import React, { useEffect, useContext } from "react"
import { ContextLoader } from '../context';
import isInView from '../helpers/isInView.js';
import Parallax from '../helpers/parallax.js';
import IntroText from '../components/introText';
import WaitlistInput from '../components/waitlistInput';
import Presentation from '../components/presentation';
import GetPinch from '../components/getPinch';
import Footer from '../components/footer';
import VideoResponsive from '../components/videoResponsive';
import '../styles/pages/homepage.scss'
import hideDisabledPagesLinks from '../helpers/hideDisabledPagesLinks';
import DetectSectionName from '../helpers/detectSectionName';
import SEO from "../components/seo";

const IndexPage = ({ data: { prismic }, ...props }) => {

	const [isLoading] = useContext(ContextLoader);
	useEffect(() => {
		if (isLoading === true) return;
		hideDisabledPagesLinks(prismic.allCommons.edges[0].node);
		const parallax = new Parallax();
		return () => {
			parallax.destroy();
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

	useEffect(() => {
		const detectSectionName = new DetectSectionName();
		return () => detectSectionName.destroy();
	})

	let scrollProgressBarEl = null;
	let rafId = null;
	useEffect(() => {
		if (isLoading === true) return;
		scrollProgressBarEl = document.querySelector('.ScrollProgressBar');
		updateProgressBar();
		return () => {
			cancelAnimationFrame(rafId);
		}
	}, [isLoading])

	const updateProgressBar = () => {
		rafId = window.requestAnimationFrame(updateProgressBar);
		if (!scrollProgressBarEl) return;
		const scaleY = (1 / (document.documentElement.scrollHeight - window.innerHeight)) * Math.abs(window.pageYOffset);
		scrollProgressBarEl.style.transform = `scaleY(${scaleY})`;
	}

	const dataPresentation = prismic.allPresentations.edges[0].node;

	return (
		<section className="Homepage">
			<SEO bodyClass="Homepage" title="Pinch – Banking with passion" />
			<VideoResponsive
				className="Homepage__IntroVideo"
				srcDesktop='/intro.mp4'
				srcMobile={null}
				autoPlay={false}
				loop={false}
				playsInline={false}
			/>
			<div className="Homepage__Intro">
				<IntroText text={dataPresentation.intro_text} />
				{dataPresentation.is_waitlist_email_input_visible &&
					<div>
						<span className="Homepage__IntroWaitListLabel" data-is-inview>Join Waitlist</span>
						<div className="Homepage__WaitlistInputContainer Homepage__WaitlistInputContainer--Desktop">
							<WaitlistInput placeholder={'Join the waitlist'} />
						</div>
						<div className="Homepage__WaitlistInputContainer Homepage__WaitlistInputContainer--Mobile">
							<WaitlistInput placeholder={'Enter your email'} />
						</div>
					</div>
				}
			</div>
			<Presentation data={dataPresentation} />
			<GetPinch data={prismic.allGet_pinchs.edges[0].node} />
			<Footer />
		</section>
	)
}

export default IndexPage;

export const homePageQuery = graphql`
  query homePageQuery {
		prismic {
			allCommons {
				edges {
					node {
						activate_blog_and_articles_pages
						activate_featured_creators_page
						activate_faq_page
						activate_for_creators_page
					}
				}
			}
			allPresentations {
				edges {
					node {
						intro_text
						is_waitlist_email_input_visible
						image_card_top
						image_card_topSharp {
							childImageSharp {
								fluid {
									srcSet
								}
							}
						}
						image_card_bottom
						image_card_bottomSharp {
							childImageSharp {
								fluid(quality: 90, maxWidth: 4000) {
									srcSet
								}
							}
						}
						section_two_title
						section_two_text
						section_three_title
						section_three_video {
							... on PRISMIC__FileLink {
								_linkType
								url
								name
							}
						}
						section_three_video_mobile {
							... on PRISMIC__FileLink {
								_linkType
								url
								name
							}
						}
						section_three_text
						section_three_text_big
						section_four_text
						section_four_image
						section_four_imageSharp {
							childImageSharp {
								fluid(maxWidth: 4000) {
									srcSet
								}
							}
						}
						section_five_title
						section_five_video {
							... on PRISMIC__FileLink {
								_linkType
								url
								name
							}
						}
						section_five_video_mobile {
							... on PRISMIC__FileLink {
								_linkType
								url
								name
							}
						}
						section_five_text
						section_six_title
						section_six_video {
							... on PRISMIC__FileLink {
								_linkType
								url
								name
							}
						}
						section_six_video_mobile {
							... on PRISMIC__FileLink {
								_linkType
								url
								name
							}
						}
						section_six_text
						section_seven_title
						section_seven_video {
							... on PRISMIC__FileLink {
								_linkType
								url
								name
							}
						}
						section_seven_video_mobile {
							... on PRISMIC__FileLink {
								_linkType
								url
								name
							}
						}
						section_seven_text
					}
				}
			}
			allGet_pinchs {
				edges {
					node {
						subscribe_title
						subscribe_subtitle
						subscribe_email_placeholder
						subscribe_button_text
						is_subscribe_visible
						is_download_visible
						download_title
						download_background_enter_video {
							... on PRISMIC__FileLink {
								url
							}
						}
						download_background_loop_video {
							... on PRISMIC__FileLink {
								url
							}
						}
						download_background_image_mobile
						download_background_image_mobileSharp {
							childImageSharp {
								fluid(maxWidth: 4000) {
									srcSet
								}
							}
						}
						download_google_play_link {
							... on PRISMIC__ExternalLink {
								url
							}
						}
						download_app_store_link {
							... on PRISMIC__ExternalLink {
								url
							}
						}
					}
				}
			}
		}
  }
`
