import React from 'react'
import { graphql } from 'gatsby'
import _ from 'lodash'
import BlogListing from '../components/blog-listing'
import { IonLabel } from '@ionic/react'

const BlogArchiveIndex = ({ data }) => {
  // const blogs = data.allBloggerPost.nodes

  // const allBlogPosts = _.map(blogs, (blog) => ({
  //   title: blog.title,
  //   slug: blog.slug,
  //   type: 'blog',
  //   bodyHTMLText: blog.content,
  //   excerpt: blog.content,
  //   publishDate: blog.published,
  //   image: blog.featuredImage?.childImageSharp?.gatsbyImageData,
  //   tags: blog.labels
  // }))

  return (
    // <BlogListing allBlogPosts={allBlogPosts} />
    <IonLabel>Coming Soon...</IonLabel>
  )
}

export default BlogArchiveIndex

/*
export const pageQuery = graphql`
  query HomeQuery {
    allBloggerPost(sort: {published: DESC}) {
      nodes {
        title
        slug
        published(formatString: "MMMM Do, YYYY")
        content
        labels
        featuredImage {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, width: 424, height: 212)
          }
        }      
      }
    }
  }
`
*/