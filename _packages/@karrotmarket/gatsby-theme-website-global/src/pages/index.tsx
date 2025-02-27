import * as React from 'react';

import { rem } from 'polished';
import { graphql, type PageProps, type HeadProps } from 'gatsby';
import { HeadSeo, OpenGraph, TwitterCard } from 'gatsby-plugin-head-seo/src';
import { mapAbstractType } from '@cometjs/graphql-utils';
import { withPrismicPreview } from 'gatsby-plugin-prismic-previews';

import Layout from '../components/Layout';
import AppLink from '../components/AppLink';
import HeroSection from '../components/home/HeroSection';
import MockupSection from '../components/home/MockupSection';
import ReviewSection from '../components/home/ReviewSection';
import CenterSection from '../components/home/CenterSection';
import PopularSection from '../components/home/PopularSection';
import DownloadSection from '../components/home/DownloadSection';
import ParallaxSection from '../components/home/ParallaxSection';
import IllustrationSection from '../components/home/IllustrationSection';

export const query = graphql`
  query ThemeWebsiteGlobal_IndexPageQuery($locale: String) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    prismicSiteNavigation(uid: { eq: "global" }, lang: { eq: $locale }) {
      _previewable
      ...DefaultLayout_data
    }
    prismicGlobalContents(lang: { eq: $locale }) {
      _previewable
      data {
        main_page_title
        main_page_description
        main_opengraph_image {
          localFile {
            childImageSharp {
              fixed(width: 1200, height: 630, toFormat: PNG, quality: 90) {
                src
                width
                height
              }
            }
          }
        }

        ...AppLink_links
        main_body {
          __typename
          ...HeroSection_content
          ...PopularSection_content
          ...ParallaxSection_content
          ...MockupSection_content
          ...ReviewSection_content
          ...CenterSection_content
          ...DownloadSection_content
          ...IllustrationSection_content
        }
      }
    }
    hotArticles: allHotArticle {
      nodes {
        ...PopularSection_articles
      }
    }
  }
`;

type IndexPageProps = PageProps<GatsbyTypes.ThemeWebsiteGlobal_IndexPageQueryQuery>;
const IndexPage: React.FC<IndexPageProps> = ({ data }) => {
  if (!(data.prismicGlobalContents?.data?.main_body && data.hotArticles.nodes)) {
    return <></>;
  }

  const { main_body } = data.prismicGlobalContents?.data;

  return (
    <Layout data={data.prismicSiteNavigation.data}>
      <div>
        {main_body.map((content, i) =>
          mapAbstractType(content, {
            PrismicGlobalContentsDataMainBodyHeroSection: (content) => (
              // rome-ignore lint/suspicious/noArrayIndexKey: intentional
              <HeroSection key={i} content={content} links={data.prismicGlobalContents?.data} />
            ),
            PrismicGlobalContentsDataMainBodyPopularSection: (content) => (
              // rome-ignore lint/suspicious/noArrayIndexKey: intentional
              <PopularSection key={i} content={content} articles={data.hotArticles.nodes} />
            ),
            PrismicGlobalContentsDataMainBodyParallaxSection: (content) => (
              // rome-ignore lint/suspicious/noArrayIndexKey: intentional
              <ParallaxSection key={i} content={content} />
            ),
            PrismicGlobalContentsDataMainBodyMockupSection: (content) => (
              // rome-ignore lint/suspicious/noArrayIndexKey: intentional
              <MockupSection key={i} content={content} />
            ),
            PrismicGlobalContentsDataMainBodyCentreSection: (content) => (
              // rome-ignore lint/suspicious/noArrayIndexKey: intentional
              <CenterSection key={i} content={content} />
            ),
            PrismicGlobalContentsDataMainBodyReviewSection: (content) => (
              // rome-ignore lint/suspicious/noArrayIndexKey: intentional
              <ReviewSection key={i} content={content} />
            ),
            PrismicGlobalContentsDataMainBodyDownloadSection: (content) => (
              // rome-ignore lint/suspicious/noArrayIndexKey: intentional
              <DownloadSection key={i} content={content} links={data.prismicGlobalContents?.data} />
            ),
            PrismicGlobalContentsDataMainBodyIllustrationSection: (content) => (
              // rome-ignore lint/suspicious/noArrayIndexKey: intentional
              <IllustrationSection key={i} content={content} />
            ),
          }),
        )}
        <AppLink type="mobile" theme="primary" links={data.prismicGlobalContents?.data} />
      </div>
      <div style={{ minWidth: rem(1230) }} />
    </Layout>
  );
};

export default withPrismicPreview(IndexPage);

type IndexPageHeadProps = HeadProps<GatsbyTypes.ThemeWebsiteGlobal_IndexPageQueryQuery>;
export const Head: React.FC<IndexPageHeadProps> = ({ data, location }) => {
  if (!data.prismicGlobalContents?.data) {
    throw new Error('No data');
  }

  const { main_page_title, main_page_description, main_opengraph_image } =
    data.prismicGlobalContents?.data;

  const metaImage = main_opengraph_image?.localFile?.childImageSharp?.fixed;

  return (
    <HeadSeo location={location} title={main_page_title} description={main_page_description}>
      {(props) => [
        <OpenGraph
          og={{
            ...props,
            type: 'website',
            ...(metaImage && {
              images: [
                {
                  url: new URL(
                    metaImage.src,
                    metaImage.src.startsWith('http') ? metaImage.src : props.url,
                  ),
                  width: metaImage.width,
                  height: metaImage.height,
                },
              ],
            }),
          }}
        />,
        <TwitterCard
          card={{
            ...props,
            type: 'summary',
          }}
        />,
      ]}
    </HeadSeo>
  );
};
