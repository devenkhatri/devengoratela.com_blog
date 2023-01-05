import React from 'react'
import { graphql } from 'gatsby'
import _ from 'lodash'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'
import BlogListing from '../components/blog-listing'

const RootIndex = ({ data }) => {
  const posts = data.allContentfulBlogPost.nodes
  const allBlogPosts = _.map(posts, (post) => ({
    title: post.title,
    slug: post.slug,
    type: 'post',
    bodyRichText: post.body?.raw,
    excerpt: post.body?.raw && documentToPlainTextString(JSON.parse(post.body?.raw)),
    publishDate: post.publishDate,
    image: post.heroImage?.gatsbyImage,
    tags: post.tags
  }))
  
  // const extraEndButtons = () => (
  //   <IonButton onClick={() => { doResuffle(); setItems([]); setCurrentPage(1); }}>
  //     <IonIcon slot="icon-only" icon={shuffle}></IonIcon>
  //   </IonButton>
  // )

  return (
    <BlogListing allBlogPosts={allBlogPosts} />
  )
}

export default RootIndex

export const pageQuery = graphql`
  query HomeQuery {
    allContentfulBlogPost(sort: {publishDate: DESC}) {
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
        youtubeUrl
      }
    }        
  }
`