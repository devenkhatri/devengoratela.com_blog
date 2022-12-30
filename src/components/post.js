import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from "@ionic/react";
import { Link } from "gatsby";
import React from "react";
import Tags from "./tags";
import _ from "lodash";
import { GatsbyImage } from "gatsby-plugin-image";
import * as styles from "./post.module.css";

const Post = ({ post }) => {
    const tagsJoin = _.join(post.tags, ',')
    //https://awik.io/generate-random-images-unsplash-without-using-api/
    //https://source.unsplash.com/random/900×700/?fruit
    const randomImageByTags = `https://source.unsplash.com/random/?${tagsJoin}`;
    // console.log("**** randomImageByTags", randomImageByTags)
    const excerpt = _.truncate(post.excerpt, {
        'length': 75,
        'separator': ' '
    });
    return (
        <IonCard>
            {!post.image && <img alt="Placehold Image" src={`https://via.placeholder.com/424x212.png?text=${post.title}`} className={styles.cardImageTop} /> }
            {post.image && <GatsbyImage alt={post.title} image={post.image} className={styles.cardImageTop} />}
            <IonCardHeader>
                <IonCardTitle>
                    <Link to={`/blog/${post.slug}`}>
                        {post.title}
                    </Link>
                </IonCardTitle>
                <IonCardSubtitle>{post.publishDate}</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
                <div dangerouslySetInnerHTML={{ __html: excerpt }} />
            </IonCardContent>
            <Tags tags={post.tags} />
        </IonCard>
    );
}

export default Post;