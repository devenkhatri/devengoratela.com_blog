import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from "@ionic/react";
import { Link } from "gatsby";
import React from "react";
import Tags from "./tags";
import _ from "lodash";
import { GatsbyImage, StaticImage } from "gatsby-plugin-image";

const Post = ({ post }) => {
    const tagsJoin = _.join(post.tags, ',')
    const randomImageByTags = `https://source.unsplash.com/random/?${tagsJoin}`;
    // console.log("**** randomImageByTags", randomImageByTags)
    const excerpt = _.truncate(post.excerpt, {
        'length': 75,
        'separator': ' '
    });
    return (
        <IonCard>
            {!post.image && randomImageByTags && <StaticImage alt="Silhouette of mountains" src={randomImageByTags} /> }
            {post.image && <GatsbyImage alt={post.title} image={post.image} />}
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