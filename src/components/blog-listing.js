import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import Layout from '../components/layout'
import Post from '../components/post'
import { IonCol, IonGrid, IonInfiniteScroll, IonInfiniteScrollContent, IonRow } from '@ionic/react'

const BlogListing = ({allBlogPosts}) => {
  
    const [items, setItems] = useState([]);
    const scrollSize = 18;
    const [currentPage, setCurrentPage] = useState(1);
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
  
    useEffect(() => {
      generateItems();
    }, [currentPage])
  
    const generateItems = () => {
      let newPageLength = Object.keys(items).length + (scrollSize * currentPage);
      setItems(_.slice(allBlogPosts, 0, newPageLength));
      forceUpdate(); //this is used to force the state update after setting items
    };

    const allLabels = _.uniq(_.flatten(_.map(allBlogPosts, post => post.tags || [])))
  
    return (
      <Layout allLabels={allLabels}>
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

export default BlogListing;