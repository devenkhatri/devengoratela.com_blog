import * as React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby"

export default function Head({
  title = "",
  description = "",
  image = "",
  noIndex = false,
}) {
  const robots = noIndex ? `noindex, nofollow` : `index`;

  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            image
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const metaTitle = title || site.siteMetadata.title
  const imageUrl = image ? `https:${image.file.url}` : site.siteMetadata.image;
  

  return (
    <Helmet
      htmlAttributes={{
        lang: "en-US",
      }}
    >
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="robots" content={robots} />
      <meta property="og:title" name="title" content={metaTitle} />
      <meta
        property="og:description"
        name="description"
        content={metaDescription}
      />
      <meta property="og:image" name="image" content={imageUrl} />
      <meta property="og:type" content={`website`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:creator" content={site.siteMetadata.author || ""} />
    </Helmet>
  );
}
