import React, { useEffect, useContext } from "react"
import { ContextLoader } from '../context';
import isInView from '../helpers/isInView.js';
import FaqComponent from '../components/faq';
import GetPinch from '../components/getPinch';
import Footer from '../components/footer';
import SplitText from '../components/splitText';
import RollingChars from '../components/rollingChars';
import SEO from "../components/seo";
import '../styles/pages/forCreators.scss';
import DetectSectionName from '../helpers/detectSectionName';
import radiatingForCreators from '../images/for_creators.svg';
import radiatingForCreatorsMobile from '../images/for_creators_mobile.svg';
import NumberImage01 from '../images/for_creators_01.svg';
import NumberImage02 from '../images/for_creators_02.svg';
import NumberImage03 from '../images/for_creators_03.svg';
import hideDisabledPagesLinks from '../helpers/hideDisabledPagesLinks';

const numbersImages = [NumberImage01, NumberImage02, NumberImage03];

const ForCreators = ({ data: { prismic } }) => {

	const [isLoading] = useContext(ContextLoader);
	useEffect(() => {
		if (isLoading === true) return;
		hideDisabledPagesLinks(prismic.allCommons.edges[0].node);
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

	const dataCreators = prismic.allFor_creatorss.edges[0].node;

	return (
		<section className="ForCreators">
			<SEO bodyClass="for-creators" title="For Creators – Pinch" />
			<div className="ForCreators__Container">
				<div className="ForCreators__Dot" data-is-inview>
					<SplitText splitBy="chars" noDelay>
						<RollingChars delay={1500} onScreenTrigger={false}>
								<span className="ForCreators__DotLine">Info for creators</span>
								<span className="ForCreators__DotLine">/ Scroll</span>
						</RollingChars>
					</SplitText>
				</div>
				<div className="ForCreators__Title" data-is-inview>
					<h1 style={{ display: 'none' }}>For Creators</h1>
					<div className="desktop">
						<img src={radiatingForCreators} alt="For creators" />
					</div>
					<div className="mobile">
						<img src={radiatingForCreatorsMobile} alt="For creators" />
					</div>
				</div>
				<div className="ForCreators__How">
					<h2 className="ForCreators__HowTitle"> {dataCreators.subtitle[0].text} </h2>
					<div className="ForCreators__HowList">
						{dataCreators.list.map((item, index) => (
							<div className="ForCreators__HowItem" key={`list-creators-${index}`}>
								<div className="ForCreators__HowNumber">
									<img src={numbersImages[index]} alt={index} />
								</div>
								<div className="ForCreators__HowInfos">
									<div className="ForCreators__HowInfosContainer">
										<span className="ForCreators__HowStep" data-is-inview>
											<SplitText splitBy="chars" noDelay>
												<RollingChars delay={1000}>
													<span className="ForCreators__HowStepLine">Step {index + 1}</span>
												</RollingChars>
											</SplitText>
										</span>
										<h3 className="ForCreators__HowItemTitle">{item.title[0].text}</h3>
										<p className="ForCreators__HowDesc">{item.description[0].text}</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
				<div className="ForCreators__Faq">
					<h2 className="ForCreators__FaqTitle"> FAQ's </h2>
					<FaqComponent data={dataCreators.faq_list} />
				</div>
			</div>
			<GetPinch data={prismic.allGet_pinchs.edges[0].node} />
			<Footer />
		</section>
	)
}

export default ForCreators;

export const forCreatorsQuery = graphql`
  query forCreatorsQuery {
		prismic {
			allCommons {
				edges {
					node {
						activate_blog_and_articles_pages
						activate_featured_creators_page
					}
				}
			}
			allFor_creatorss {
				edges {
					node {
						subtitle
						list {
							title
							description
						}
						faq_list {
							answer
							question
						}
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

