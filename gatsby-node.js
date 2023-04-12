/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it


exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
	if (stage === "develop-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /locomotive-scroll/,
            use: loaders.null(),
					},
					{
            test: /splitting/,
            use: loaders.null(),
          }
        ],
      },
    })
	}
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /locomotive-scroll/,
            use: loaders.null(),
					},
					{
            test: /splitting/,
            use: loaders.null(),
          }
        ],
      },
    })
	}
}

const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
	const { createPage } = actions

  const pages = await graphql(`
    {
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
				allArticles {
					edges {
						node {
							_meta {
								uid
								tags
							}
							title
						}
					}
				}
				allCreators {
					edges {
						node {
							_meta {
								uid
							}
						}
					}
				}
			}
    }
	`)

	let tags = [];

	const templateArticle = path.resolve("src/templates/article/index.jsx")
	// const articles = pages.data.prismic.allArticles.edges;
	const articles = [];
  articles.forEach((article, index) => {
		let nextArticle = null;
		if (articles.length - 1 === index) nextArticle = articles[0];
		else nextArticle = articles[index + 1];
    createPage({
      path: `/${article.node._meta.uid}`,
      component: templateArticle,
      context: {
				uid: article.node._meta.uid,
				index: index,
				nextArticleUid: nextArticle.node._meta.uid
      },
		})

		article.node._meta.tags.map(tag => {
			if (tags.indexOf(tag) === -1) {
				tags.push(tag);
			}
		})
	})

	const templateTag = path.resolve("src/templates/tag/index.jsx");
	tags.forEach(tag => {
		createPage({
			path: `/${tag}`,
			component: templateTag,
			context: {
				tag: tag
			}
		})
	})

	const templateCreator = path.resolve("src/templates/creator/index.jsx")
	const creators = pages.data.prismic.allCreators.edges;
	creators.forEach(creator => {
		createPage({
			path: `/${creator.node._meta.uid}`,
			component: templateCreator,
			context: {
				uid: creator.node._meta.uid
			}
		})
	})

}


// Fix error on prismic end
// More info : https://github.com/birkir/gatsby-source-prismic-graphql/issues/162
var fs = require('fs');
var dir = "./.cache/caches/gatsby-source-prismic-graphql"

exports.onPreBootstrap = () => {
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
 }