import React, { useEffect, useContext } from "react"
import { navigate } from "gatsby";
import { ContextLoader } from '../../context';
import isInView from '../../helpers/isInView.js';
import { graphql } from "gatsby"
import { RichText } from 'prismic-reactjs';
import { linkResolver } from '../../utils/linkResolver'
import ArticleCardLarge from '../../components/articleCardLarge';
import SplitText from '../../components/splitText';
import Footer from '../../components/footer';
import SEO from "../../components/seo";
import hideDisabledPagesLinks from '../../helpers/hideDisabledPagesLinks';
import './styles.scss';

const Article = ({ data: { prismic }, pageContext: { nextArticleUid } }) => {

	const isPageActivated = prismic.allCommons.edges[0].node.activate_blog_and_articles_pages;

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

	const url = typeof window !== 'undefined' ? window.location.href : '';

	const data = prismic.article;
	const nextArticle = prismic.allArticles.edges.filter(article => article.node._meta.uid === nextArticleUid);

	const publicationDate = new Date(data._meta.firstPublicationDate.slice(0, 10));
	const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'long', day: '2-digit' });
	const [{ value: month },,{ value: day },,{ value: year }] = dateTimeFormat.formatToParts(publicationDate);
	const formatedDate = `${month} ${day} ${year}`;

	const sections = data.body ? data.body.map((section, index) => {
		if (section.type === 'normal_paragraph') {
			return (
				<div className="Article__Section Article__NormalParagraph" key={`normal-paragraph-${index}`}>
					<RichText render={section.primary.text} serializeHyperlink={linkResolver} />
				</div>
			)
		}
		else if (section.type === 'full_width_image') {
			return (
				<div className="Article__Section Article__FullWidthImage" key={`full-width-image-${index}`}>
					<div className="mask" data-is-inview>
						<div data-is-inview>
							<img srcSet={section.primary.imageSharp.childImageSharp.fluid.srcSet} />
						</div>
					</div>
				</div>
			)
		}
		else if (section.type === 'quote') {
			return (
				<div className="Article__Section Article__Quote" key={`quote-${index}`}>
					<div className="Article__QuoteText" data-is-inview>
						<SplitText splitBy="lines" baseDelay="0.2">
							<RichText render={section.primary.text} />
						</SplitText>
					</div>
					<div className="Article__QuoteAuthor">- <RichText render={section.primary.author} /></div>
				</div>
			)
		}
		else if (section.type === 'image') {
			return (
				<div className="Article__Section Article__Image" key={`image-${index}`}>
					<div className="mask" data-is-inview>
						<div data-is-inview>
							<img srcSet={section.primary.imageSharp.childImageSharp.fluid.srcSet} />
						</div>
					</div>
				</div>
			)
		}
	}) : [];

  return (
		<div>
			<React.Fragment>
				<section className="Article">

					<SEO bodyClass="article" title={`${data.title[0].text} – Pinch`} />

					<div className="Article__Hero" data-is-inview>
						<div className="Article__Date">
							<span> {formatedDate} / {data.minutes_to_read} min read </span>
						</div>
						{data.main_imageSharp &&
							<div className="Article__MainImage" data-is-inview>
								<img srcSet={data.main_imageSharp.childImageSharp.fluid.srcSet}/>
							</div>
						}
					</div>

					{data.title &&
						<h1 className="Article__Title" data-is-inview>
							<SplitText splitBy="lines">
								{data.title[0].text}
							</SplitText>
						</h1>
					}

					<div className="Article__IntroContainer">
						<div className="Article__IntroShare" data-is-inview>
							<span>Share Article</span>
							<a href={`https://twitter.com/intent/tweet?text=${url}`} target="_blank">
								<svg xmlns="http://www.w3.org/2000/svg" fill="inherit" fillRule="evenodd" viewBox="0 0 32.04 25.7" width="32.04" height="25.7"><path data-name="Forme 13" d="M32.03 3.1a15.5 15.5 0 01-3.77 1A6.571 6.571 0 0031.15.5a14.734 14.734 0 01-4.18 1.6 6.553 6.553 0 00-11.36 4.4 6.97 6.97 0 00.17 1.5A18.946 18.946 0 012.24 1.2a6.49 6.49 0 002.03 8.7 9.358 9.358 0 01-2.97-.8 6.507 6.507 0 005.27 6.4 9.855 9.855 0 01-1.73.2 5.071 5.071 0 01-1.24-.1 6.464 6.464 0 006.13 4.5 12.926 12.926 0 01-8.16 2.8 8.129 8.129 0 01-1.56-.1 19.12 19.12 0 0010.07 2.9 18.449 18.449 0 0018.7-18.4c0-.3-.01-.6-.02-.9a12.984 12.984 0 003.27-3.3z"></path></svg>
							</a>
							<a href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} target="_blank">
								<svg xmlns="http://www.w3.org/2000/svg" fill="inherit" fillRule="evenodd" viewBox="0 0 15.91 31.6" width="15.91" height="31.6"><path data-name="Forme 12" d="M0 10.4h3.41V7.3c0-1.4.04-3.6 1.1-4.9A5.967 5.967 0 019.8 0a21.821 21.821 0 016.1.6l-.85 4.8a11.772 11.772 0 00-2.74-.4c-1.33 0-2.51.5-2.51 1.7v3.7h5.43l-.38 4.8H9.8v16.4H3.41V15.2H0v-4.8"></path></svg>
							</a>
						</div>

						<p className="Article__Intro">
							{data.intro[0].text}
						</p>
					</div>

					<div className="Article__Sections">
						{sections}
					</div>

					<div className="Article__FooterShare">
						<span>Share Article</span>
						<a href={`https://twitter.com/intent/tweet?text=${url}`} target="_blank">
							<svg xmlns="http://www.w3.org/2000/svg" fill="inherit" fillRule="evenodd" viewBox="0 0 32.04 25.7" width="32.04" height="25.7"><path data-name="Forme 13" d="M32.03 3.1a15.5 15.5 0 01-3.77 1A6.571 6.571 0 0031.15.5a14.734 14.734 0 01-4.18 1.6 6.553 6.553 0 00-11.36 4.4 6.97 6.97 0 00.17 1.5A18.946 18.946 0 012.24 1.2a6.49 6.49 0 002.03 8.7 9.358 9.358 0 01-2.97-.8 6.507 6.507 0 005.27 6.4 9.855 9.855 0 01-1.73.2 5.071 5.071 0 01-1.24-.1 6.464 6.464 0 006.13 4.5 12.926 12.926 0 01-8.16 2.8 8.129 8.129 0 01-1.56-.1 19.12 19.12 0 0010.07 2.9 18.449 18.449 0 0018.7-18.4c0-.3-.01-.6-.02-.9a12.984 12.984 0 003.27-3.3z"></path></svg>
						</a>
						<a href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} target="_blank">
							<svg xmlns="http://www.w3.org/2000/svg" fill="inherit" fillRule="evenodd" viewBox="0 0 15.91 31.6" width="15.91" height="31.6"><path data-name="Forme 12" d="M0 10.4h3.41V7.3c0-1.4.04-3.6 1.1-4.9A5.967 5.967 0 019.8 0a21.821 21.821 0 016.1.6l-.85 4.8a11.772 11.772 0 00-2.74-.4c-1.33 0-2.51.5-2.51 1.7v3.7h5.43l-.38 4.8H9.8v16.4H3.41V15.2H0v-4.8"></path></svg>
						</a>
					</div>

				</section>
				<ArticleCardLarge data={nextArticle[0].node} />
				<Footer />
			</React.Fragment>
		</div>
  )
}

export default Article;

export const pageQuery = graphql`
  query ArticleBySlug($uid: String!) {
		prismic {
			allCommons {
				edges {
					node {
						activate_blog_and_articles_pages
						activate_featured_creators_page
					}
				}
			}
			allArticles(sortBy:meta_firstPublicationDate_DESC) {
				edges {
					node {
						_meta {
							uid
							firstPublicationDate
						}
						title
						minutes_to_read
						main_image
          	main_imageSharp {
							childImageSharp {
								fluid(maxWidth: 3000) {
									srcSet
								}
							}
						}
					}
				}
			}
			article(lang: "en-us", uid: $uid) {
				_meta {
					uid
					firstPublicationDate
				}
				title
				main_image
      	main_imageSharp {
					childImageSharp {
						fluid(maxWidth: 3000) {
							srcSet
						}
					}
				}
				minutes_to_read
				intro
				body {
					... on PRISMIC_ArticleBodyNormal_paragraph {
						type
						label
						primary {
							text
						}
					}
					... on PRISMIC_ArticleBodyQuote {
						type
						label
						primary {
							author
							text
						}
					}
					... on PRISMIC_ArticleBodyImage {
						type
						label
						primary {
							image
							imageSharp {
								childImageSharp {
									fluid(maxWidth: 3000) {
										srcSet
									}
								}
							}
						}
					}
					... on PRISMIC_ArticleBodyFull_width_image {
						type
						label
						primary {
							image
							imageSharp {
								childImageSharp {
									fluid(maxWidth: 3000) {
										srcSet
									}
								}
							}
						}
					}
				}
			}
		}
  }
`