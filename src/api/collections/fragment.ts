/**
 * @description FPP 产品分类 fragment
 */
import gql from "graphql-tag";

export const CollectionRulesListFragment = gql`
  fragment CollectionRulesList on Collection {
    ruleSet {
      appliedDisjunctively
      rules {
        column
        relation
        condition
      }
    }
  }
`;

export const SEOCardCollectionFragment = gql`
  fragment SEOCardCollection on Collection {
    seo {
      title
      description
    }
  }
`;

export const CollectionImageCardFragment = gql`
  fragment CollectionImageCard on Collection {
    image {
      id
      altText
      originalSrc
    }
  }
`;

export const CollectionRulesFragment = gql`
  fragment CollectionRules on Collection {
    ruleSet {
      appliedDisjunctively
      rules {
        column
        relation
        condition
      }
    }
  }
`;

export const ProductRowFragment = gql`
fragment ProductRow on ProductConnection {
  edges {
    node {
      id
      title
      status
      featuredImage {
        id
        # originalSrc
        transformedSrc
        altText
        __typename
      }
#         featuredMedia {
#           ... on MediaImage {
#             id
#             __typename
#                 }
#           ... on Video {
#             id
#             __typename
#                 }
#           ... on Model3d {
#             id
#             __typename
#                 }
#           ... on ExternalVideo {
#             id
#             __typename
#                 }
#           preview {
#             image {
#               id
#               transformedSrc(maxWidth: 80, maxHeight: 80)
#               __typename
#                     }
#             __typename
#                 }
#           __typename
#             }
      }
    cursor
  }
  pageInfo {
    hasNextPage
  }
}
`;
