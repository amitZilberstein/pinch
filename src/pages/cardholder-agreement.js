import React, { useEffect, useContext } from "react"
import { ContextLoader } from '../context';
import isInView from '../helpers/isInView.js';
import GetPinch from '../components/getPinch';
import Footer from '../components/footer';
import { RichText } from 'prismic-reactjs';
import '../styles/pages/cardholderAgreement.scss';
import DetectSectionName from '../helpers/detectSectionName';
import hideDisabledPagesLinks from '../helpers/hideDisabledPagesLinks';

const CardholderAgreement = ({ data: { prismic } }) => {

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

	const data = prismic.allCardholder_agreements.edges[0].node;

	return (
		<section className="CardholderAgreement">
			<div className="CardholderAgreement__Container">
				<div className="CardholderAgreement__Title">
					<RichText render={data.title} />
				</div>
				<p className="CardholderAgreement__Intro">
				<RichText render={data.intro} />
				</p>
				<div className="CardholderAgreement__Laws">
					{data.laws.map((law, index) => (
						<div className="CardholderAgreement__Law" key={`cardholder-agreement-${index}`}>
							<RichText render={law.title1} />
							<div>
								<RichText render={law.text} />
							</div>
						</div>
					))}
				</div>
			</div>
			<GetPinch data={prismic.allGet_pinchs.edges[0].node} />
			<Footer />
		</section>
	)
}

export default CardholderAgreement;

export const cardholderAgreementQuery = graphql`
  query cardholderAgreementQuery {
		prismic {
			allCommons {
				edges {
					node {
						activate_blog_and_articles_pages
						activate_featured_creators_page
					}
				}
			}
			allCardholder_agreements {
				edges {
					node {
						title
						intro
						laws {
							title1
							text
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

