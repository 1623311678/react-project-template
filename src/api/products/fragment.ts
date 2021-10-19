/**
 * @description FPP 产品 请求fragment
 */
import gql from "graphql-tag";

export const OrganizationCardCollectionConnectionFragment = gql`
fragment OrganizationCardCollectionConnection on CollectionConnection {
  edges {
    node {
      id
      title
      __typename
    }
  }
}`;

export const OrganizationCardProductDetailsFragment = gql`
  ${OrganizationCardCollectionConnectionFragment}
  fragment OrganizationCardProductDetails on Product {
    productType
    tags
    vendor
    smartCollections: collections(first: 250, queryFilter:  "collection_type:smart") {
      ...OrganizationCardCollectionConnection
    }
    customCollections: collections(first: 250, queryFilter: "collection_type:custom") {
      ...OrganizationCardCollectionConnection
    }
    __typename
  }
`;

export const ImagesCardImageFragment = gql`
  fragment ImagesCardImage on Image {
    id
    originalSrc
    altText
    __typename
  }
`;