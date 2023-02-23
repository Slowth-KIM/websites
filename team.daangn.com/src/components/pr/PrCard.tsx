import * as React from 'react';
import {
  graphql,
  Link,
  type PageProps,
} from "gatsby";
import { rem } from "polished";
import { GatsbyImage } from "gatsby-plugin-image";
import { styled } from "gatsby-theme-stitches/src/config";
import { vars } from "@seed-design/design-token";

type PrCardProps = {
  data: GatsbyTypes.PrCard_prpageFragment,
};

export const query = graphql`
  fragment PrCard_prpage on PrismicAboutPrPost {
    uid
    data {
      title {
        text
      }
      thumbnail_image {
        localFile {
          publicURL
          childrenImageSharp {
            gatsbyImageData
          }
        }
        alt
      }
      summary
      published_at
    }
  }
`;

const PostCard: React.FC<PrCardProps> = ({ data }) => {
  return (
      <Container>
        <ThumbnailImage
          alt={"이미지"}
          // image={data?.thumnail_image?.localFile?.childImageSharp?.gatsbyImageData}
          image={data.thumbnail_image.localFile.childrenImageSharp[0].gatsbyImageData}
          css={{
            width: rem(250),
            height: rem(140),
            borderRadius: rem(16),
          }}
          // css={{
          //   width: image?.thumbnails?.mobile?.dimensions?.width / 2,
          //   height: image?.thumbnails?.mobile?.dimensions?.height / 2,
          //   "@md": {
          //     width: image?.dimensions?.width / 2,
          //     height: image?.dimensions?.height / 2,
          //   },
          // }}
        />
        <DescriptionWrapper>
          <Title>{data.title.text}</Title>
          <Summary>{data.summary}</Summary>
          <PublishDate>{data.published_at.replaceAll("-", ".")}</PublishDate>
        </DescriptionWrapper>
      </Container>
  );
};

const Container = styled('div', {
  display: 'grid',
  gridTemplateColumns: '0.5fr 1fr',
  width: '100%',
  maxHeight: rem(100),
  marginBottom: rem(100),
});

const ThumbnailImage = styled(GatsbyImage, {});

const DescriptionWrapper = styled('div', {
  position: 'relative',
});

const Title = styled('h3', {
  fontSize: "$subtitle4",

  // "@media (min-width: 1096px)" : {
  //   fontSize: "$subtitle3",
  // }
});

const Summary = styled("p", {
  marginTop: rem(8),
  color: vars.$scale.color.gray700,
  fontSize: "$body3",
  whiteSpace: 'pre-line',

  // "@media (min-width: 1096px)" : {
  //   width: "100%",
  //   fontSize: "$body2",
  // }
});

const PublishDate = styled("p", {
  position: 'absolute',
  bottom: 10,
  marginTop: rem(4),
  color: vars.$scale.color.gray600,
  fontSize: "$body3",
  whiteSpace: 'pre-line',

  // "@media (min-width: 1096px)" : {
  //   width: "100%",
  //   fontSize: "$body2",
  // }
});

export default PostCard;
