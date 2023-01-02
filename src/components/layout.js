import * as React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import { Head } from "gatsby-theme-landing-page";
import * as styles from "./layout.module.css";
import { moonOutline, sunnyOutline } from "ionicons/icons";

import { IonApp, IonPage, IonContent, IonFooter, IonToolbar, IonTitle, IonHeader, IonIcon, IonRefresher, IonRefresherContent, IonButtons, IonMenuButton, IonButton } from '@ionic/react'
import { refreshPage } from "../utils";
import Menu from "./Menu";

export default function Layout(props) {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          description
          author
        }
      }
    }
  `)

  const [darkMode, setDarkMode] = React.useState(false);

  const toggleDarkModeHandler = () => {
    document && document.body.classList.toggle("dark");
    setDarkMode(!darkMode);
  };

  return (
    <IonApp>
      <Menu labels={props.allLabels} />
      <IonPage id="main-content">
        <IonHeader translucent={true} className={styles.header}>
          <Head {...props} />
          <IonToolbar color={'primary'}>
            <IonTitle>
              <Link to="/">{props.title || data.site.siteMetadata.title}</Link>
            </IonTitle>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonButtons slot="end">
              {props.extraEndButtons && props.extraEndButtons()}
              <IonButton onClick={toggleDarkModeHandler}>
                <IonIcon slot="icon-only" icon={!darkMode ? moonOutline : sunnyOutline}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen={true}>
          <IonRefresher slot="fixed" onIonRefresh={refreshPage}>
            <IonRefresherContent></IonRefresherContent>
          </IonRefresher>
          <main className={styles.main}>{props.children}</main>
          <IonFooter translucent={true}>
            <IonToolbar>
              <IonTitle>
                © {data.site.siteMetadata.author}, {new Date().getFullYear()}
                {` | `}
                {data.site.siteMetadata.description}
              </IonTitle>
            </IonToolbar>
          </IonFooter>
        </IonContent>
      </IonPage>
    </IonApp>
  );
}
