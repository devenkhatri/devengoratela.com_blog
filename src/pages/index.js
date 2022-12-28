import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'

import Layout from '../components/layout'
import Post from '../components/post'
import { IonCol, IonGrid, IonRow } from '@ionic/react'

class RootIndex extends React.Component {
  render() {
    const posts = get(this, 'props.data.allContentfulBlogPost.nodes')
    return (
      <Layout>
        <IonGrid>
          <IonRow>
            {posts.map((post) => {
              return (
                <IonCol key={post.slug}  size='12' sizeMd='6' sizeLg='4'>
                  <Post post={post} />
                </IonCol>
              )
            })}
          </IonRow>
        </IonGrid>
      </Layout>
    )
  }
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
      }
    }    
  }
`