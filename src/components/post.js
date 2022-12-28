import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from "@ionic/react";
import { Link } from "gatsby";
import React from "react";
import Tags from "./tags";
import _ from "lodash";
import { GatsbyImage } from "gatsby-plugin-image";

const Post = ({ post }) => {

    return (
        <IonCard>
            {!post?.heroImage?.gatsbyImage && <img alt="Silhouette of mountains" height={'100%'} src="https://ionicframework.com/docs/img/demos/card-media.png" /> }
            {post?.heroImage?.gatsbyImage && <GatsbyImage alt={post.title} image={post?.heroImage?.gatsbyImage} /> }
            <IonCardHeader>
                <IonCardTitle>
                    <Link to={`/blog/${post.slug}`}>
                        {post.title}
                    </Link>
                </IonCardTitle>
                <IonCardSubtitle>{post.publishDate}</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
                {_.truncate(post.description?.description, {
                    'length': 75,
                    'separator': ' '
                })}
            </IonCardContent>
            <Tags tags={post.tags} />
        </IonCard>
    );
}

export default Post;