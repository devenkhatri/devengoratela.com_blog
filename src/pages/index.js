import React from 'react'
import { graphql, Link } from 'gatsby'
import get from 'lodash/get'

import Layout from '../components/layout'
import { GatsbyImage } from 'gatsby-plugin-image'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import Tags from '../components/tags'
// import Hero from '../components/hero'
// import ArticlePreview from '../components/article-preview'

class RootIndex extends React.Component {
  render() {
    const posts = get(this, 'props.data.allContentfulBlogPost.nodes')

    return (
      <Layout>
        <ul>
        {posts.map((post) => {
          return (
            <li key={post.slug}>
              <Link to={`/blog/${post.slug}`}>
                <GatsbyImage alt="" image={post.heroImage?.gatsbyImage} />
                <h2>{post.title}</h2>
              </Link>
              <div>
                <small className="meta">{post.publishDate}</small>
              </div>
              <div>
                {post.description?.description}
              </div>
              <div>                
                <Tags tags={post.tags} />
              </div>
            </li>
          )
        })}
      </ul>
      </Layout>
    )
  }
}

export default RootIndex

export const pageQuery = graphql`
  query HomeQuery {
    allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
      nodes {
        title
        slug
        publishDate(formatString: "MMMM Do, YYYY")
        tags
        heroImage {
          gatsbyImage(
            layout: FULL_WIDTH
            placeholder: BLURRED
            width: 424
            height: 212
          )
        }
        description {
          description
        }
      }
    }    
  }
`