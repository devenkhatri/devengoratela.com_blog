import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import { readingTime } from 'reading-time-estimator'

import Seo from '../components/seo'
import Layout from '../components/layout'
import Tags from '../components/tags'
import * as styles from './blog-post.module.css'
import { IonContent } from '@ionic/react'

const BlogTemplate = (props) => {
    const blog = get(props, 'data.bloggerPost')
    const previous = get(props, 'data.previous')
    const next = get(props, 'data.next')
    const blogBody = blog.content
    const readingResult = readingTime(blogBody, 10)

    //https://awik.io/generate-random-images-unsplash-without-using-api/
    //https://source.unsplash.com/random/900×700/?fruit

    return (
        <Layout title={blog.title}>
            <Seo
                title={blog.title}
                description={blogBody}
                // image={`http:${post.heroImage?.resize.src}`}
            />
            {/* <Hero
                image={post.heroImage?.gatsbyImage}
                title={post.title}
                content={post.description}
            /> */}
            <IonContent fullscreen={true} className="ion-padding">
                <span>
                    <time dateTime={blog.published}>{blog.published}</time> –{' '}
                    {readingResult && readingResult.text}
                </span>
                <div>
                    <div dangerouslySetInnerHTML={{__html: blogBody}} />
                    <Tags tags={blog.labels} />
                    {(previous || next) && (
                        <nav>
                            <ul className={styles.articleNavigation}>
                                {previous && (
                                    <li>
                                        <Link to={`/blog/${previous.slug}`} rel="prev">
                                            ← {previous.title}
                                        </Link>
                                    </li>
                                )}
                                {next && (
                                    <li>
                                        <Link to={`/blog/${next.slug}`} rel="next">
                                            {next.title} →
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </nav>
                    )}
                </div>
            </IonContent>
        </Layout>
    )
}

export default BlogTemplate

export const pageQuery = graphql`
  query BlogBySlug(
    $slug: String!
    $previousPostSlug: String
    $nextPostSlug: String
  ) {
    bloggerPost(slug: {eq: $slug}) {
        slug
        title
        published
        url
        content
        labels
        featuredImage {
          childImageSharp {
            gatsbyImageData
          }
        }
    }
    previous: bloggerPost(slug: { eq: $previousPostSlug }) {
      slug
      title
    }
    next: bloggerPost(slug: { eq: $nextPostSlug }) {
      slug
      title
    }
  }
`