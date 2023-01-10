import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonItem, IonButtons, IonButton, IonIcon, IonRow, IonCol } from "@ionic/react";
import { Link } from "gatsby";
import React from "react";
import Tags from "./tags";
import _ from "lodash";
import { GatsbyImage } from "gatsby-plugin-image";
import * as styles from "./post.module.css";
import { shareSocialOutline, videocam } from "ionicons/icons";
import { TextToSpeech } from "tts-react";
import { RWebShare } from "react-web-share";
import ReactPlayer from "react-player";

const Post = ({ post }) => {
    // const tagsJoin = _.join(post.tags, ',')
    //https://awik.io/generate-random-images-unsplash-without-using-api/
    //https://source.unsplash.com/random/900×700/?fruit
    // const randomImageByTags = `https://source.unsplash.com/random/?${tagsJoin}`;
    // console.log("**** randomImageByTags", randomImageByTags)
    // const excerpt = _.truncate(post.excerpt, {
    //     'length': 200,
    //     'separator': ' '
    // });

    return (
        <IonCard>
            <IonRow>
                <IonCol size='12' sizeLg='3'>
                    {!post.youtubeUrl && !post.image && <img alt="Placehold Image" src={`https://via.placeholder.com/424x212.png?text=${post.title}`} className={styles.cardImageTop} />}
                    {!post.youtubeUrl && post.image && <GatsbyImage alt={post.title} image={post.image} className={styles.cardImageTop} />}
                    {post.youtubeUrl && <ReactPlayer url={post.youtubeUrl} width="100%" height="100%" />}
                </IonCol>
                <IonCol>
                    <IonCardHeader>
                        <IonCardTitle>
                            <Link to={`/${post.type}/${post.slug}`}>
                                {post.title}
                            </Link>
                        </IonCardTitle>
                        <IonCardSubtitle>{post.publishDate}</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <TextToSpeech
                            allowMuting
                            align="vertical"
                            markTextAsSpoken
                            rate={1}
                            size="medium"
                            position="topRight"
                            volume={1}
                        >
                            {post.excerpt}
                        </TextToSpeech>
                        {/* <span display="none">{excerpt}</span> */}
                    </IonCardContent>
                    <IonItem lines="none">
                        <Tags tags={post.tags} />
                        <IonButtons slot="end">
                            <RWebShare
                                data={{
                                    text: post.title,
                                    url: `https://www.devengoratela.com/${post.type}/${post.slug}`,
                                    title: "Share Post",
                                }}
                            >
                                <IonButton color={'success'}>
                                    <IonIcon slot="icon-only" icon={shareSocialOutline}></IonIcon>
                                </IonButton>
                            </RWebShare>
                            {post.youtubeUrl && <IonButton color={'danger'} href={post.youtubeUrl}>
                                <IonIcon slot="icon-only" icon={videocam}></IonIcon>
                            </IonButton>
                            }
                        </IonButtons>
                    </IonItem>
                </IonCol>
            </IonRow>


        </IonCard>
    );
}

export default Post;