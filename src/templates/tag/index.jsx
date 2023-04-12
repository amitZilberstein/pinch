import React, { useEffect, useContext } from "react"
import { ContextLoader } from '../../context';
import isInView from '../../helpers/isInView.js';
import { graphql } from "gatsby"
import GetPinch from '../../components/getPinch';
import Footer from '../../components/footer';
import ArticleCardLarge from '../../components/articleCardLarge';
import ArticleCard from '../../components/articleCard';
import SEO from "../../components/seo";
import hideDisabledPagesLinks from '../../helpers/hideDisabledPagesLinks';

import './styles.scss';

const Tag = ({ data: { prismic }, pageContext: { tag } }) => {

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

	const articles = prismic.allArticles.edges.filter(edge => edge.node._meta.tags.indexOf(tag) !== -1);

	let lines = 0;

  return (
		<div>
			<React.Fragment>
				<section className="Blog">

					<SEO bodyClass="tag" title={`${tag} – Pinch`} />

					<ArticleCardLarge data={articles[0].node} />
					<div className="Blog__List" data-is-inview>
						{articles.map((article, index) => {
							if (index === 0) return;
							let type = 'normal';
							if (lines % 2 === 0) {
								lines += 1;
								type = 'full';
							} else {
								lines += 0.5;
							}
							return <ArticleCard data={article.node} type={type} key={`article-card-${index}`} />
						})}
					</div>
				</section>
				<GetPinch data={prismic.allGet_pinchs.edges[0].node} />
				<Footer />
			</React.Fragment>
		</div>
  )
}

export default Tag

export const pageQuery = graphql`
  query ArticlesByTag {
		prismic {
			allCommons {
				edges {
					node {
						activate_blog_and_articles_pages
						activate_featured_creators_page
					}
				}
			}
			allArticles(sortBy:meta_lastPublicationDate_DESC) {
				edges {
					node {
						_meta {
							uid
							firstPublicationDate
							tags
						}
						title
						minutes_to_read
						main_image
          	main_imageSharp {
							childImageSharp {
								fluid(maxWidth: 4000) {
									srcSet
								}
							}
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