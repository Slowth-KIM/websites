import * as React from 'react';
import { rem } from 'polished';
import {
  graphql,
  Link,
  type PageProps,
} from 'gatsby';
import { styled } from 'gatsby-theme-stitches/src/config';
import { vars } from '@seed-design/design-token';
import PrCard from '../components/pr/PrCard';

type PrPageProps = PageProps<GatsbyTypes.PrPageQuery>;

export const query = graphql`
  query PrPage($locale: String!, $navigationId: String!) {
    ...TeamWebsite_DefaultLayout_query

    allPrismicAboutPrPost {
      nodes {
        ...PrCard_prpage
      }
    }
  }
`;

const PrPage: React.FC<PrPageProps> = ({ data }) => {
  console.log("data ::", data);
  return (
    <Container>
      {data.allPrismicAboutPrPost.nodes.map(node => (
        <PrCard key={node.uid} data={node.data} />
      ))}
    </Container>
  );
};

const Container = styled('main', {
  contentArea: true,
});

export default PrPage;
