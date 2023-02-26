import * as React from 'react';
import {
  graphql,
  Link,
  type PageProps,
} from 'gatsby';
import { rem } from "polished";
import { GatsbyImage } from 'gatsby-plugin-image';
import { SliceZone } from "@prismicio/react";
import { styled } from 'gatsby-theme-stitches/src/config';
import { vars } from '@seed-design/design-token';

import PrPostBodyRichText from '../components/prPostPage/PrPostBodyRichText';

export const query = graphql`
  query PrPostPage($uid: String!, $locale: String!, $navigationId: String!) {
    ...TeamWebsite_DefaultLayout_query
    prismicAboutPrPost(uid: { eq: $uid }) {
      uid
      tags
      data {
        title {
          text
        }
        published_at
        author {
          document {
            ... on PrismicMemberProfile {
              id
              data {
                nickname
                role
                name
                image {
                  gatsbyImageData
                }
              }
            }
          }
        }
        tags
        body {
          ... on PrismicAboutPrPostDataBodyRichTextSection {
            id
            slice_type
            primary {
              content {
                richText
              }
            }
          }
        }
      }
    }
  }
`;

type PrPostPageProps = PageProps<GatsbyTypes.PrPostPageQuery>;

const PrPostPage: React.FC<PrPostPageProps> = ({ data }) => {
  return (
    <Container>
      <Header>
        <Title>{data.prismicAboutPrPost?.data.title.text}</Title>
        <Date>{data.prismicAboutPrPost?.data.published_at}</Date>
      </Header>
      <Body>
        <ContentContainer>
          <SliceZone
            slices={data.prismicAboutPrPost.data.body as any[]}
            components={{
              rich_text_section: PrPostBodyRichText,
            }}
          />
        </ContentContainer>
        <Author>
          {data?.prismicAboutPrPost?.data.author?.document?.data?.image && (
            <AuthorImage
              image={data.prismicAboutPrPost?.data.author.document.data.image.gatsbyImageData}
              alt="member-profile"
            />
          )}
          <AuthorInfo>
            <AuthorName>{data.prismicAboutPrPost?.data.author.document.data.nickname}</AuthorName>
            <p>{data.prismicAboutPrPost?.data.author.document.data.role}</p>
          </AuthorInfo>
        </Author>
        <Tags>
          {data.prismicAboutPrPost.data.tags.split(',').map((tag) => {
            tag.trim();
            return <Tag key={tag}>{tag}</Tag>
          })}
        </Tags>
      </Body>
      <Footer>
        <Home to="/pr">PR 홈</Home>
      </Footer>
    </Container>
  );
};

const Container = styled("div", {
  contentArea: true,
  textAlign: "center",
  color: vars.$scale.color.gray900,
});

const Header = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: rem(66),
});

const Title = styled("h1", {
  fontSize: "$subtitle1",
  marginBottom: rem(12),

  "@md": {
    fontSize: "$heading4",
  },
});

const Date = styled("div", {
  display: "flex",
  color: vars.$scale.color.gray600,
});

const Body = styled("section", {
  position: "relative",
  boxSizing: "border-box",
  maxWidth: rem(1024),
  paddingX: rem(8),
  margin: "0 auto",
  textAlign: "left",

  "@md": {
    paddingX: rem(84),
  },
});

const ContentContainer = styled("div", {
  display: "flex",
  flexFlow: "row nowrap",
  height: "auto",
  overflow: "auto",
});

const Author = styled("div", {
  display: "flex",
  alignItems: "center",
  margin: `${rem(56)} 0`,
});

const AuthorImage = styled(GatsbyImage, {
  width: rem(50),
  height: rem(50),
  borderRadius: "50%",
});

const AuthorInfo = styled("div", {
  display: "flex",
  flexDirection: "column",
  marginLeft: rem(12),
  fontSize: "$body2",
});

const AuthorName = styled("h3", {
  marginBottom: rem(4),
  fontWeight: 600,
});

const Tags = styled("div", {
  display: "flex",
});

const Tag = styled("div", {
  width: "fit-content",
  padding: `${rem(6)} ${rem(12)}`,
  marginLeft: rem(8),
  border: "none",
  borderRadius: rem(40),
  backgroundColor: vars.$scale.color.gray50,
  fontSize: "$body2",
});

const Footer = styled("div", {
  display: "flex",
  justifyContent: "center",
  boxSizing: "border-box",
  width: "max-content",
  maxWidth: rem(1200),
  margin: "0 auto",
  marginTop: rem(66),
  paddingX: rem(84),
});

const Home = styled(Link, {
  width: "fit-content",
  padding: `${rem(16)} ${rem(20)}`,
  border: "none",
  borderRadius: rem(40),
  backgroundColor: vars.$scale.color.gray50,
  color: vars.$scale.color.gray900,
  fontSize: "$body1",
  fontWeight: "bold",
  textDecoration: "none",
  pointer: "cursor",
});

export default PrPostPage;
