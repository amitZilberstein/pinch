import React, { useEffect, useContext } from "react"
import { ContextLoader } from '../../context';
import isInView from '../../helpers/isInView.js';
import Parallax from '../../helpers/parallax.js';
import { graphql } from "gatsby"
import { RichText } from 'prismic-reactjs';
import { linkResolver } from '../../utils/linkResolver'
import WaitlistInput from '../../components/waitlistInput';
import IntroText from '../../components/introText';
import Presentation from '../../components/presentation';
import SplitText from '../../components/splitText';
import GetPinch from '../../components/getPinch';
import Footer from '../../components/footer';
import ScrollCta from '../../components/scrollCta';
import SEO from "../../components/seo";
import './styles.scss';
import DetectSectionName from '../../helpers/detectSectionName';
import hideDisabledPagesLinks from '../../helpers/hideDisabledPagesLinks';

const Creator = ({ data: { prismic } }) => {

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

	const data = prismic.creator;
	const dataPresentation = prismic.allPresentations.edges[0].node;

  return (
		<div>
			<React.Fragment>
				<section className="Creator">
					<SEO bodyClass="creator" title={`${data.name[0].text} – Pinch`} />
					<div className="Creator__Hero" data-is-inview>
						<div className="Creator__Background">
							<img srcSet={data.background_imageSharp.childImageSharp.fluid.srcSet} />
							<div className="Creator__BackgroundOverlay"></div>
						</div>
						<div className="Creators__HeroContainer">
							<div className={`Creator__ImgContainer ${data.is_image_portrait ? 'portrait' : ''}`} data-is-inview>
								<img srcSet={data.image_creator_pageSharp.childImageSharp.fluid.srcSet} />
							</div>
							<div className="Creator__Infos">
								<h1 className="Creator__Name" data-is-inview>
									<SplitText splitBy="lines">
										{data.name[0].text}
									</SplitText>
								</h1>
								<div className="Creator__Description" data-is-inview>
									<SplitText splitBy="lines">
										<RichText render={data.description} serializeHyperlink={linkResolver} />
									</SplitText>
								</div>
								{dataPresentation.is_waitlist_email_input_visible &&
									<div className="Creator__Waitlist">
										<span data-is-inview>
											<SplitText splitBy="lines">Get your Pinch Beta card</SplitText>
										</span>
										<WaitlistInput placeholder="Enter your email" />
									</div>
								}
							</div>
						</div>
					</div>
					<div className="Creator__ScrollCtaMobile">
						<div data-is-inview>
							<ScrollCta />
						</div>
					</div>
					<div data-is-inview>
						<IntroText text={dataPresentation.intro_text} />
					</div>
					<Presentation data={dataPresentation} />
				</section>
				<GetPinch data={prismic.allGet_pinchs.edges[0].node} />
				<Footer />
			</React.Fragment>
		</div>
  )
}

export default Creator;

export const pageQuery = graphql`
  query CreatorBySlug($uid: String!) {
		prismic {
			allCommons {
				edges {
					node {
						activate_blog_and_articles_pages
						activate_featured_creators_page
					}
				}
			}
			creator(lang: "en-us", uid: $uid) {
				_meta {
					uid
				}
				name
				description
				image_creator_page
				is_image_portrait
				image_creator_pageSharp {
					childImageSharp {
						fluid(maxWidth: 4000) {
							srcSet
						}
					}
				}
				background_image
				background_imageSharp {
					childImageSharp {
						fluid(maxWidth: 4000) {
							srcSet
						}
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