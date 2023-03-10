import React from 'react';
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from '@reach/router';
import { archiveOutline, archiveSharp, bookmarkOutline,heartOutline, heartSharp, homeOutline, homeSharp, videocam, videocamOutline } from 'ionicons/icons';
import './Menu.css';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
  target?: string;
}

const appPages: AppPage[] = [
  {
    title: 'Home',
    url: '/',
    iosIcon: homeOutline,
    mdIcon: homeSharp
  },
  // {
  //   title: 'Demo-1',
  //   url: '/demo/',
  //   iosIcon: paperPlaneOutline,
  //   mdIcon: paperPlaneSharp
  // },
   {
     title: 'Buy me a coffee',
     url: 'https://buy.stripe.com/4gw6rJ6xw1nkfbq7ss',
     iosIcon: heartOutline,
     mdIcon: heartSharp
   },
  {
    title: 'Blog Archive',
    url: 'https://devengoratela.blogspot.com/',
    iosIcon: archiveOutline,
    mdIcon: archiveSharp,
    target: '_blank'
  },
  {
    title: 'Youtube Channel',
    url: 'https://www.youtube.com/playlist?list=PLzl--ASgM3jOLJL9A61LN1JLzjRsq53Y0',
    iosIcon: videocamOutline,
    mdIcon: videocam,
    target: '_blank'
  },  
  // {
  //   title: 'Trash',
  //   url: '/page/Trash/',
  //   iosIcon: trashOutline,
  //   mdIcon: trashSharp
  // },
  // {
  //   title: 'Spam',
  //   url: '/page/Spam/',
  //   iosIcon: warningOutline,
  //   mdIcon: warningSharp
  // }
];

// const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

const Menu: React.FC = ({ labels }: any) => {
  const isBrowser = typeof window !== "undefined"
  const location = isBrowser ? useLocation() : { pathname: "" };
  return (
    <IonMenu contentId="main-content" type="reveal">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>The Randome Topic Blog</IonListHeader>
          <IonNote>hi@devengoratela.com</IonNote>
          {isBrowser && appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} href={appPage.url} target={appPage.target} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>

        {labels &&
          <IonList id="labels-list">
            <IonListHeader>Tags</IonListHeader>
            {labels.map((label, index) => (
              <IonItem lines="none" key={index}>
                <IonIcon slot="start" icon={bookmarkOutline} />
                <IonLabel>{label}</IonLabel>
              </IonItem>
            ))}
          </IonList>
        }
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
