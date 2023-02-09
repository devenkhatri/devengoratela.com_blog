require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
};

if (process.env.CONTENTFUL_HOST) {
  contentfulConfig.host = process.env.CONTENTFUL_HOST;
  contentfulConfig.accessToken = process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN;
}

const { spaceId, accessToken } = contentfulConfig;

if (!spaceId || !accessToken) {
  throw new Error(
    "Contentful spaceId and the access token need to be provided. Received: " +
    JSON.stringify(contentfulConfig)
  );
}

// starter config
module.exports = {
  siteMetadata: {
    title: "Deven Goratela",
    description: "The Random Topics Blog",
    author: "Deven Goratela"
  },
  plugins: [
    {
      resolve: `gatsby-theme-landing-page`,
      options: contentfulConfig,
    },
    // {
    //   resolve: 'gatsby-source-blogger',
    //   options: {
    //     apiKey: process.env.GATSBY_BLOGGER_APIKEY,
    //     blogId: process.env.GATSBY_BLOGGER_BLOGID,
    //     downloadImage: true
    //   }
    // },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          process.env.GATSBY_GOOGLE_ANALYTICS_MEASUREMENT_ID, // Google Analytics / GA
        ],
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: true,
          // Setting this parameter is also optional
          respectDNT: true,
          // Avoids sending pageview hits from custom paths
          exclude: ["/preview/**", "/do-not-track/me/too/"],
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Deven Goratela`,
        short_name: `Deven Goratela`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#000`,
        display: `standalone`,
        icon: `src/assets/favicon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [`/`, `/post/*`],
      },
    },
  ],
};
