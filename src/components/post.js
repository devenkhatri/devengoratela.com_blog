import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from "@ionic/react";
import { Link } from "gatsby";
import React from "react";
import Tags from "./tags";
import _ from "lodash";
import { GatsbyImage, StaticImage } from "gatsby-plugin-image";

const Post = ({ post }) => {
    const tagsJoin = _.join(post.tags, ',')
    return (
        <IonCard>
            {!post?.heroImage?.gatsbyImage && <StaticImage alt="Silhouette of mountains" src={`https://source.unsplash.com/random/?${tagsJoin}`} /> }
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