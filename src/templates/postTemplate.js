import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'
import { BLOCKS } from '@contentful/rich-text-types'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { readingTime } from 'reading-time-estimator'

import Seo from '../components/seo'
import Layout from '../components/layout'
import Tags from '../components/tags'
import * as styles from './blog-post.module.css'

const PostTemplate = (props) => {
    const post = get(props, 'data.contentfulBlogPost')
    const previous = get(props, 'data.previous')
    const next = get(props, 'data.next')
    const plainTextDescription = post.description?.description
    const plainTextBody = documentToPlainTextString(JSON.parse(post.body.raw))
    const readingResult = readingTime(plainTextBody, 10)

    //https://awik.io/generate-random-images-unsplash-without-using-api/
    //https://source.unsplash.com/random/900×700/?fruit

    const options = {
        renderNode: {
            [BLOCKS.EMBEDDED_ASSET]: (node) => {
                const { gatsbyImage, description } = node.data.target
                return (
                    <GatsbyImage
                        image={getImage(gatsbyImage)}
                        alt={description}
                    />
                )
            },
        },
    };

    return (
        <Layout title={post.title}>
            <Seo
                title={post.title}
                description={plainTextDescription}
                image={`http:${post.heroImage?.resize.src}`}
            />
            {/* <Hero
                image={post.heroImage?.gatsbyImage}
                title={post.title}
                content={post.description}
            /> */}
            <div fullscreen={true} className="ion-padding">
                <span>
                    Author: {post.author?.name} &middot;{' '}
                    <time dateTime={post.rawDate}>{post.publishDate}</time> –{' '}
                    {readingResult && readingResult.text}
                </span>
                <div className={styles.article}>
                    <div className={styles.body}>
                        {post.body?.raw && renderRichText(post.body, options)}
                    </div>
                    <Tags tags={post.tags} />
                    {(previous || next) && (
                        <nav>
                            <ul className={styles.articleNavigation}>
                                {previous && (
                                    <li>
                                        <Link to={`/post/${previous.slug}`} rel="prev">
                                            ← {previous.title}
                                        </Link>
                                    </li>
                                )}
                                {next && (
                                    <li>
                                        <Link to={`/post/${next.slug}`} rel="next">
                                            {next.title} →
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </nav>
                    )}
                </div>
            </div>
        </Layout>
    )
}

export default PostTemplate

export const pageQuery = graphql`
  query PostBySlug(
    $slug: String!
    $previousPostSlug: String
    $nextPostSlug: String
  ) {
    contentfulBlogPost(slug: { eq: $slug }) {
      slug
      title
      author {
        name
      }
      publishDate(formatString: "MMMM Do, YYYY")
      rawDate: publishDate
      heroImage {
        gatsbyImage(layout: FULL_WIDTH, placeholder: BLURRED, width: 1280)
        resize(height: 630, width: 1200) {
          src
        }
      }
      body {
        raw        
      }
      tags
      description {
        description
      }
    }
    previous: contentfulBlogPost(slug: { eq: $previousPostSlug }) {
      slug
      title
    }
    next: contentfulBlogPost(slug: { eq: $nextPostSlug }) {
      slug
      title
    }
  }
`