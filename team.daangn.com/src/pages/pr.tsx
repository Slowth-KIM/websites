import * as React from 'react';
import {
  graphql,
  type PageProps,
} from 'gatsby';
import { styled } from 'gatsby-theme-stitches/src/config';
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
  return (
    <Container>
      {data.allPrismicAboutPrPost.nodes.map(node => (
        <PrCard key={node.uid} data={node} />
      ))}
    </Container>
  );
};

const Container = styled('main', {
  contentArea: true,
});

export default PrPage;
