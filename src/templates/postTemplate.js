import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import { BLOCKS } from '@contentful/rich-text-types'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import Seo from '../components/seo'
import Layout from '../components/layout'
import Tags from '../components/tags'
import './blog-post.module.css'
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonItem, IonLabel, IonNote } from '@ionic/react'
import { arrowBack, arrowForward, shareSocialOutline, videocam } from 'ionicons/icons'
import { RWebShare } from 'react-web-share'

const PostTemplate = (props) => {
    const post = get(props, 'data.contentfulBlogPost')
    const previous = get(props, 'data.previous')
    const next = get(props, 'data.next')
    const plainTextDescription = post.description?.description

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

    const extraEndButtons = () => (
        <RWebShare
            data={{
                text: post.title,
                url: `https://www.devengoratela.com/${post.type}/${post.slug}`,
                title: "Share Post",
            }}
        >
            <IonButton fill='clear' size={'small'}>
                <IonIcon slot="icon-only" icon={shareSocialOutline}></IonIcon>
            </IonButton>
        </RWebShare>
    )

    return (
        <Layout extraEndButtons={extraEndButtons}>
            <Seo
                title={post.title}
                description={plainTextDescription}
                image={post.image}
            />
            <IonCard>
                <IonCardHeader>
                    <IonCardTitle color={'primary'}>{post.title}</IonCardTitle>
                    <IonCardSubtitle>{post.publishDate}</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                    {post.body?.raw && renderRichText(post.body, options)}
                    {post.youtubeUrl && <IonNote>
                        <IonButton href={post.youtubeUrl} fill='clear' target='_blank' color={'danger'}>
                            <IonIcon icon={videocam} slot="end" />
                            <IonLabel>Youtube video of this Blog</IonLabel>
                        </IonButton>
                    </IonNote>
                    }
                    <Tags tags={post.tags} />
                </IonCardContent>
            </IonCard>
            {(previous || next) && (
                <IonItem>
                    {previous && (
                        <IonButton slot='start' href={`/post/${previous.slug}`} fill='clear'>
                            <IonIcon icon={arrowBack} slot="start" />
                            <IonLabel>{previous.title}</IonLabel>
                        </IonButton>
                    )}
                    {next && (
                        <IonButton slot='end' href={`/post/${next.slug}`} fill='clear'>
                            <IonIcon icon={arrowForward} slot="end" />
                            <IonLabel>{next.title}</IonLabel>
                        </IonButton>
                    )}
                </IonItem>
            )}
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
      youtubeUrl
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