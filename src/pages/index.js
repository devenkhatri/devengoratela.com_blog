import React, { useEffect, useState } from 'react'
import { graphql } from 'gatsby'
import _ from 'lodash'
import Layout from '../components/layout'
import Post from '../components/post'
import { IonButton, IonCol, IonGrid, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonRow } from '@ionic/react'
import { shuffle } from 'ionicons/icons'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'

const RootIndex = ({ data }) => {
  const posts = data.allContentfulBlogPost.nodes
  const blogs = data.allBloggerPost.nodes

  const [allBlogPosts, setAllBlogPosts] = useState([]);
  const [items, setItems] = useState([]);
  const scrollSize = 18;
  const [currentPage, setCurrentPage] = useState(1);
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);  

  useEffect(() => {
    doResuffle();
  }, []);

  useEffect(() => {
    generateItems();
  },[allBlogPosts])

  const doResuffle = () => {    
    let localPosts = [];
    localPosts = _.union(localPosts, _.map(posts, (post) => ({
      title: post.title,
      slug: post.slug,
      bodyRichText: post.body?.raw,
      excerpt: post.body?.raw && documentToPlainTextString(JSON.parse(post.body?.raw)),
      publishDate: post.publishDate,
      image: post.heroImage?.gatsbyImage,
      tags: post.tags
    }
    )))
    localPosts = _.union(localPosts, _.map(blogs, (blog) => ({
      title: blog.title,
      slug: blog.slug,
      bodyHTMLText: blog.content,
      excerpt: blog.content,
      publishDate: blog.published,
      image: blog.featuredImage?.childImageSharp?.gatsbyImageData,
      tags: blog.labels
    }
    )))
    setAllBlogPosts(_.shuffle(localPosts))        
  }
  const generateItems = () => {
      let newPageLength = Object.keys(items).length + (scrollSize * currentPage);
      setItems(_.slice(allBlogPosts, 0, newPageLength));
      forceUpdate(); //this is used to force the state update after setting items
  };

  const extraEndButtons = () => (
    <IonButton onClick={()=>setCurrentPage(1)}>
      <IonIcon slot="icon-only" icon={shuffle}></IonIcon>
    </IonButton>
  )

  return (
    <Layout extraEndButtons={extraEndButtons}>      
      <IonGrid>
        <IonRow>
          {items.map((post) => {
            return (
              <IonCol key={post.slug} size='12' sizeMd='6' sizeLg='4'>
                <Post post={post} />
              </IonCol>
            )
          })}
          <IonInfiniteScroll
              onIonInfinite={(ev) => {
                setCurrentPage(currentPage + 1);
                generateItems();
                setTimeout(() => ev.target.complete(), 500);
              }}
            >
              <IonInfiniteScrollContent loadingText="Loading data..." loadingSpinner="bubbles"></IonInfiniteScrollContent>
            </IonInfiniteScroll>
        </IonRow>
      </IonGrid>
    </Layout>
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
      }
    }    
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