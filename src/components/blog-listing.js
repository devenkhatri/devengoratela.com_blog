import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import Layout from '../components/layout'
import Post from '../components/post'
import { IonButton, IonCol, IonGrid, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonRow } from '@ionic/react'
import { RWebShare } from 'react-web-share'
import { shareSocialOutline } from 'ionicons/icons'

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

    const extraEndButtons = () => (
      <RWebShare
          data={{
              text: "Deven Goratela Random Topic's Blog",
              url: `https://www.devengoratela.com/`,
              title: "Share Site",
          }}
      >
          <IonButton fill='clear' size={'small'}>
              <IonIcon slot="icon-only" icon={shareSocialOutline}></IonIcon>
          </IonButton>
      </RWebShare>
  )
  
    return (
      <Layout allLabels={allLabels} extraEndButtons={extraEndButtons}>
        <IonGrid>
          <IonRow>
            {items.map((post) => {
              return (
                <IonCol key={post.slug} size='12'>
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
              <IonInfiniteScrollContent></IonInfiniteScrollContent>
            </IonInfiniteScroll>
          </IonRow>
        </IonGrid>
      </Layout>
    )
  }

export default BlogListing;