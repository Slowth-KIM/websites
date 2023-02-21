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
      <Container>PostCard</Container>
  );
};

const Container = styled('div', {
  backgroundColor: 'lightgreen',
  width: '100%',
});

const Thumbnail = styled(GatsbyImage, {});

export default PostCard;
