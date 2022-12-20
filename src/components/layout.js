import * as React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import { Head } from "gatsby-theme-landing-page";
import "../ionictheme.css";
import * as cssVars from "gatsby-theme-landing-page/src/styles/variables.module.css";
import * as styles from "./layout.module.css";
import { home, list, moonOutline, sunnyOutline } from "ionicons/icons";

import { IonApp, IonPage, IonContent, IonFooter, IonToolbar, IonTitle, IonHeader, IonLabel, IonIcon, IonRefresher, IonRefresherContent, IonButtons, IonMenuButton, IonButton, IonTabBar, IonTabButton } from '@ionic/react'
import { refreshPage } from "../utils";

export default function Layout(props) {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
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
      <IonPage className={[cssVars.root, styles.root].join(" ")}>
        <IonHeader translucent={true} className={styles.header}>
          <Head {...props} />
          <IonToolbar color={'primary'}>
            <IonTitle size={'small'}>
              <Link to="/">{props.title || data.site.siteMetadata.title}</Link>
            </IonTitle>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonButtons slot="end">
              <IonButton onClick={toggleDarkModeHandler}>
                <IonIcon slot="icon-only" icon={!darkMode?moonOutline:sunnyOutline}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen={true}>
          <IonRefresher slot="fixed" onIonRefresh={refreshPage}>
            <IonRefresherContent></IonRefresherContent>
          </IonRefresher>
          <main className={styles.main}>{props.children}</main>
          <IonFooter>
            <IonToolbar>
              <IonTitle>
                © {new Date().getFullYear()}, Built with
                {` `}
                <a href="https://www.gatsbyjs.org">Gatsby</a>
                {` | `}
                <Link to="/demo">Demo</Link>
              </IonTitle>
            </IonToolbar>
          </IonFooter>
        </IonContent>
        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/">
            <IonIcon icon={home} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="blog" href="/demo/">
            <IonIcon icon={list} />
            <IonLabel>Blog</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonPage>
    </IonApp>
  );
}
