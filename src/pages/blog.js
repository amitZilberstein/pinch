import React, { useEffect, useContext } from "react"
import { navigate } from "gatsby";
import { ContextLoader } from '../context';
import isInView from '../helpers/isInView.js';
import { graphql } from "gatsby";
import ArticleCardLarge from '../components/articleCardLarge';
import ArticleCard from '../components/articleCard';
import GetPinch from '../components/getPinch';
import Footer from '../components/footer';
import '../styles/pages/blog.scss'
import DetectSectionName from '../helpers/detectSectionName';
import SEO from "../components/seo";
import hideDisabledPagesLinks from '../helpers/hideDisabledPagesLinks';

const Blog = ({ data: { prismic } }) => {

	const isPageActivated = prismic.allCommons.edges[0].node.activate_blog_and_articles_pages;
	const articles = prismic.allArticles.edges;

	const [isLoading] = useContext(ContextLoader);
	useEffect(() => {
		if (isLoading === true) return;
		hideDisabledPagesLinks(prismic.allCommons.edges[0].node);
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

	useEffect(() => {
		const detectSectionName = new DetectSectionName();
		return () => detectSectionName.destroy();
	})

	let lines = 0;

	return (
		<section className="Blog">
			<SEO bodyClass="Blog" title="Blog – Pinch" />
			<h1 style={{ display: 'none' }}>Blog</h1>
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
			<GetPinch data={prismic.allGet_pinchs.edges[0].node} />
			<Footer />
		</section>
	)
}
export default Blog;

export const blogQuery = graphql`
	query blogQuery {
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
`;
