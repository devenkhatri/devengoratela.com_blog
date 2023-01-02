import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonItem, IonButtons, IonButton, IonIcon } from "@ionic/react";
import { Link } from "gatsby";
import React from "react";
import Tags from "./tags";
import _ from "lodash";
import { GatsbyImage } from "gatsby-plugin-image";
import * as styles from "./post.module.css";
import { videocam, volumeMedium } from "ionicons/icons";

const Post = ({ post }) => {
    // const tagsJoin = _.join(post.tags, ',')
    //https://awik.io/generate-random-images-unsplash-without-using-api/
    //https://source.unsplash.com/random/900×700/?fruit
    // const randomImageByTags = `https://source.unsplash.com/random/?${tagsJoin}`;
    // console.log("**** randomImageByTags", randomImageByTags)
    const excerpt = _.truncate(post.excerpt, {
        'length': 75,
        'separator': ' '
    });
    return (
        <IonCard>
            {!post.image && <img alt="Placehold Image" src={`https://via.placeholder.com/424x212.png?text=${post.title}`} className={styles.cardImageTop} />}
            {post.image && <GatsbyImage alt={post.title} image={post.image} className={styles.cardImageTop} />}
            <IonCardHeader>
                <IonCardTitle>
                    <Link to={`/${post.type}/${post.slug}`}>
                        {post.title}
                    </Link>
                </IonCardTitle>
                <IonCardSubtitle>{post.publishDate}</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
                <div dangerouslySetInnerHTML={{ __html: excerpt }} />
            </IonCardContent>
            <IonItem>
                <Tags tags={post.tags} />
                <IonButtons slot="end">
                    <IonButton color={'success'}>
                        <IonIcon slot="icon-only" icon={volumeMedium}></IonIcon>
                    </IonButton>
                    <IonButton color={'danger'}>
                        <IonIcon slot="icon-only" icon={videocam}></IonIcon>
                    </IonButton>
                </IonButtons>
            </IonItem>
        </IonCard>
    );
}

export default Post;