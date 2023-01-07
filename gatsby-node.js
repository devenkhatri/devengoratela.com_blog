const path = require('path');

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type ContentfulLandingPage implements ContentfulReference & ContentfulEntry & Node @dontInfer {
      name: String
      slug: String
      noIndex: Boolean
      title: String
      description: String
      image: ContentfulAsset @link(by: "id", from: "image___NODE")
      sections: [ContentfulLandingPageSection] @link(by: "id", from: "sections___NODE")
    }

    type ContentfulLandingPageSection implements ContentfulReference & ContentfulEntry & Node  @dontInfer {
      name: String
      component: String
      heading: String
      content: [ContentfulLandingPageContent] @link(by: "id", from: "content___NODE")
      secondaryHeading: String
    }

    type ContentfulLandingPageContent implements ContentfulReference & ContentfulEntry & Node @dontInfer {
      name: String
      image: ContentfulAsset @link(by: "id", from: "image___NODE")
      links: [ContentfulLink] @link(by: "id", from: "links___NODE")
      primaryText: contentfulLandingPageContentPrimaryTextTextNode @link(by: "id", from: "primaryText___NODE")
      secondaryText: contentfulLandingPageContentSecondaryTextTextNode @link(by: "id", from: "secondaryText___NODE")
    }

    type ContentfulLink implements ContentfulReference & ContentfulEntry & Node @dontInfer {
      href: String
      text: String
    }
  `;

  createTypes(typeDefs);
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a template for blog and post
  const postTemplate = path.resolve('./src/templates/postTemplate.js')

  const result = await graphql(
    `
      {
        allContentfulBlogPost(sort: {publishDate: DESC}) {
          nodes {
            title
            slug
          }
        }        
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your Contentful posts`,
      result.errors
    )
    return
  }

  const posts = result.data.allContentfulBlogPost.nodes

  // Create blog(blogger) and posts(contentful) pages
  // But only if there's at least one blog post found in Contentful or blogger
  // `context` is available in the template as a prop and as a variable in GraphQL
  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostSlug = index === 0 ? null : posts[index - 1].slug
      const nextPostSlug =
        index === posts.length - 1 ? null : posts[index + 1].slug

      createPage({
        path: `/post/${post.slug}/`,
        component: postTemplate,
        context: {
          slug: post.slug,
          previousPostSlug,
          nextPostSlug,
        },
      })
    })
  }
  // if (blogs.length > 0) {
  //   blogs.forEach((blog, index) => {
  //     const previousPostSlug = index === 0 ? null : blogs[index - 1].slug
  //     const nextPostSlug =
  //       index === blogs.length - 1 ? null : blogs[index + 1].slug

  //     createPage({
  //       path: `/blog/${blog.slug}/`,
  //       component: blogTemplate,
  //       context: {
  //         slug: blog.slug,
  //         previousPostSlug,
  //         nextPostSlug,
  //       },
  //     })
  //   })
  // }
}