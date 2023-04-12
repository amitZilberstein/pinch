require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Pinch Website`,
    description: `Pinch Website`,
		author: `Pinchbank`,
		siteUrl: `https://pinch-ouiwill.netlify.app/`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
		},
		`gatsby-plugin-sass`,
		{
      resolve: `gatsby-source-prismic-graphql`,
      options: {
        repositoryName: `pinch`,
        accessToken: process.env.API_KEY
      },
		},
		{
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/layouts/index.js`)
      },
		},
		`gatsby-plugin-sitemap`,
		{
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        policy: [{ userAgent: '*', allow: '/' }]
      }
		}
  ],
}
