import React, { useEffect, useContext } from "react"
import { ContextLoader } from '../context';
import isInView from '../helpers/isInView.js';
import FaqComponent from '../components/faq';
import GetPinch from '../components/getPinch';
import Footer from '../components/footer';
import SEO from "../components/seo";
import '../styles/pages/faqPage.scss';
import DetectSectionName from '../helpers/detectSectionName';
import hideDisabledPagesLinks from '../helpers/hideDisabledPagesLinks';
import radiatingFaq from '../images/faq.svg';
import radiatingFaqMobile from '../images/faq_mobile.svg';

const FaqPage = ({ data: { prismic } }) => {

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

	const dataFaq = prismic.allFaqs.edges[0].node;

	return (
		<section className="FaqPage">
			<SEO bodyClass="faq" title="Faq – Pinch" />
			<div className="FaqPage__Title">
				<h1 style={{ display: 'none' }}>FAQ</h1>
				<div className="desktop">
					<img src={radiatingFaq} alt="FAQ’S" />
				</div>
				<div className="mobile">
					<img src={radiatingFaqMobile} alt="FAQ’S" />
				</div>
			</div>
			<FaqComponent data={dataFaq.list} />
			<GetPinch data={prismic.allGet_pinchs.edges[0].node} />
			<Footer />
		</section>
	)
}

export default FaqPage;

export const faqPageQuery = graphql`
  query faqPageQuery {
		prismic {
			allCommons {
				edges {
					node {
						activate_blog_and_articles_pages
						activate_featured_creators_page
					}
				}
			}
			allFaqs {
				edges {
					node {
						list {
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

