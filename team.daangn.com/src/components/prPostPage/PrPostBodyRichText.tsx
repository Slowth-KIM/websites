import * as React from "react";
import { PrismicRichText } from "@prismicio/react";
import { rem } from "polished";
import { styled } from "gatsby-theme-stitches/src/config";
import { vars } from '@seed-design/design-token';

const PrPostBodyRichText = ({
  slice,
}: {
  slice: Queries.PrismicAboutPrPost
}) => {
  return (
    <section>
      <PrismicRichText
        field={slice.primary.content.richText}
        fallback={<h4>{JSON.stringify(slice.primary.content)}</h4>}
        components={{
          heading2: ({ children, key }) => <SubTitle key={key}>{children}</SubTitle>,
          paragraph: ({ children, key }) => <Description key={key}>{children}</Description>,
          preformatted: ({ node, key }) => {
            return (
              <div className="Code">
                <pre key={key}>
                  <code className="language-javascript">
                    {node.text}
                  </code>
                </pre>
              </div>
            );
          },
          list: ({ children, key }) => <UList key={key}>{children}</UList>,
          oList: ({ children, key }) => <OList key={key}>{children}</OList>,
          image: ({ node }) => {
            return (
              <Image
                src={node.url}
                alt={node.alt ?? undefined}
                data-copyright={node.copyright ? node.copyright : undefined}
              />
            );
          },
        }}
      />
    </section>
  );
}

const SubTitle = styled("h2", {
  marginTop: rem(40),
  marginBottom: rem(18),
});

const Description = styled("p", {
  marginBottom: rem(12),
  lineHeight: rem(28),
  fontSize: "$body1",
  color: vars.$scale.color.gray700,
  letterSpacing: rem(0.4),
});

const UList = styled("ul", {
  lineHeight: rem(30),
  margin: 0,
  marginBottom: rem(12),
  paddingInlineStart: rem(42),
  color: vars.$scale.color.gray700,
  fontSize: "$body1",
});

const OList = styled("ol", {
  lineHeight: rem(30),
  margin: 0,
  marginBottom: rem(12),
  paddingInlineStart: rem(42),
  color: vars.$scale.color.gray700,
  fontSize: "$body1",
});

const Image = styled("img", {
  width: "100%",
  margin: `${rem(20)} 0`,
});

export default PrPostBodyRichText;
