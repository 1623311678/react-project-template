/**
 * @description FPP 产品分类 请求query
 */
import gql from "graphql-tag";
import {
  CollectionRulesListFragment,
  SEOCardCollectionFragment,
  CollectionImageCardFragment,
  CollectionRulesFragment,
  ProductRowFragment
} from "./fragment";

// 产品分类列表
// export const fppCollectionsList = gql`
//   ${CollectionRulesListFragment}
//   query CollectionList($collectionsFirst: Int, $collectionsLast: Int, $before: String, $after: String, $sortKey: CollectionSortKeys, $reverse: Boolean, $query: String, $savedSearchId: ID) {
//     collections(first: $collectionsFirst, after: $after, last: $collectionsLast, before: $before, sortKey: $sortKey, reverse: $reverse, query: $query, savedSearchId: $savedSearchId) {
//       pageInfo {
//         hasNextPage
//         hasPreviousPage
//       }
//       edges {
//         cursor
//         node {
//           id
//           title
//           image {
//             id
//             altText
//             originalSrc
//   #         transformedSrc

//           }
//           ...CollectionRulesList
//         }
//       }
//     }
//   }
// `;
export const fppCollectionsList = gql`
  ${CollectionRulesListFragment}
  query collectionList(
    $first: Int
    $last: Int
    $before: String
    $after: String
    $query: String
    $sortKey: CollectionSortKeys
    $reverse: Boolean
  ) {
    collections(
      first: $first
      last: $last
      before: $before
      after: $after
      query: $query
      sortKey: $sortKey
      reverse: $reverse
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        cursor
        node {
          id
          title
          handle
          productsCount
          image {
            id
            altText
            originalSrc
          }
          ...CollectionRulesList
        }
      }
    }
  }
`;

// 产品规则联动列表
export const fppCollectionsRulesList = gql`
  query CollectionRulesInfo {
    collectionRulesConditions {
      ruleType
      allowedRelations
      defaultRelation
    }
  }
`;

// 产品分类详情
export const fppCollectionById = gql`
  ${SEOCardCollectionFragment}
  ${CollectionRulesFragment}
  ${CollectionImageCardFragment}
  query CollectionShow($collectionId: ID!, $isCreating: Boolean = false) {
    collection(id: $collectionId) @skip(if: $isCreating) {
      id
      title
      handle
      descriptionHtml
      sortOrder
      #   templateSuffix
      ...SEOCardCollection
      ...CollectionRules
      ...CollectionImageCard
    }
  }
`;

// 产品分类关联产品
// export const fppProductsInCollection = gql`
//   ${ProductRowFragment}
//   query ProductsInCollection($collectionId: ID!, $first: Int, $after: String) {
//     collection(id: $collectionId) {
//       id
//       #   isRebuilding
//       #   productsCount
//       #   archivedProductsCount
//       products(first: $first, after: $after) {
//         ...ProductRow
//       }
//     }
//   }
// `;
// export const fppProductsInCollection = gql`
//   query ProductsInCollection(
//     $collectionId: ID!,
//     $first: Int, 
//     $after: String
//   ) {
//     collection(id: $collectionId) {
//       id
//       products(
//         first: $first
//         after: $after
//       ) {
//         edges {
//           cursor
//           node {
//             id
//             title
//             status
//             featuredImage {
//               id
//               transformedSrc
//               __typename
//             }
//             __typename
//           }
//           __typename
//         }
//         pageInfo {
//           hasNextPage
//         }
//         __typename
//       }
//       __typename
//     }
//     __typename
//   }
// `;
export const fppProductsInCollection = gql`
  query ProductsInCollection(
    $collectionId: ID!,
    $first: Int, 
    $after: String
  ) {
    collection(id: $collectionId) {
      id
      products(
        first: $first
        after: $after
      ) {
        ...ProductRow
      }
      __typename
    }
    __typename
  }
  fragment ProductRow on ProductConnection {
    edges {
      node {
        id
        title
        status
        featuredImage {
          id
          transformedSrc(maxWidth: 80, maxHeight: 80)
          altText
          __typename
        }
        featuredMedia {
          ... on MediaImage {
            id
            __typename
          }
          ... on Video {
            id
            __typename
          }
          ... on Model3d {
            id
            __typename
          }
          ... on ExternalVideo {
            id
            __typename
          }
          preview {
            image {
              id
              transformedSrc(maxWidth: 80, maxHeight: 80)
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      cursor
      __typename
    }
    pageInfo {
      hasNextPage
      __typename
    }
    __typename
    }
`;

// 手动关联产品列表
// export const fppProductResourcePicker = gql`
//   query ProductResourcePicker($first: Int!, $after: String, $selectProductsInCollectionId: ID = "", $searchQuery: String = "", $sortKey: ProductSortKeys = TITLE) {
//     products(first: $first, query: $searchQuery, after: $after, sortKey: $sortKey) {
//       edges {
//         cursor
//         node {
//           id
//           title
//           status
//          featuredImage {
//            id
//            altText
//            transformedSrc(maxWidth: 200, maxHeight: 200)
//             __typename
//          }
//           inCollection(id: $selectProductsInCollectionId)
//         }
//       }
//       pageInfo {
//         hasNextPage
//       }
//     }
//   }
// `;
export const fppProductResourcePicker = gql`
  query ProductResourcePicker(
    $first: Int!
    $after: String
    $query: String
    $collectionId: Int!
    $sortKey: ProductSortKeys = TITLE
  ) {
    products(
      first: $first
      query: $query
      after: $after
      collectionId: $collectionId
      sortKey: $sortKey
    ) {
      edges {
        cursor
        node {
          id
          title
          status
          inCollection
          featuredImage {
            id
            altText
            transformedSrc(maxWidth: 200, maxHeight: 200)
            __typename
          }
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;



// 产品系列筛选列表
export const allCollectionOptions = gql`
  query Options {
    allCollectionOptions {
      options
      productTypes
      tags
    }
  }
`;

// 产品系列总条数
export const fppCollectionsTotal = gql`
query CollectionCountBySearch ($query: String!) {
  collectionCountBySearch (query: $query) { count }
}
`;


// 产品系列列表Es
export const fppEsCollectionsList = gql`
  ${CollectionRulesListFragment}
  query collectionList(
    $first: Int
    $last: Int
    $before: String
    $after: String
    $query: String
    $queryFilter: String
    $sortKey: CollectionSortKeys
    $reverse: Boolean
  ) {
    collections(
      first: $first
      last: $last
      before: $before
      after: $after
      query: $query
      queryFilter: $queryFilter
      sortKey: $sortKey
      reverse: $reverse
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        cursor
        node {
          id
          title
          handle
          productsCount
          image {
            id
            altText
            originalSrc
          }
          ...CollectionRulesList
        }
      }
    }
  }
`;

// 产品系列总条数Es
export const fppEsCollectionsTotal = gql`
query CollectionCountBySearch ($query: String!, $queryFilter: String) {
  collectionCountBySearch (query: $query, queryFilter: $queryFilter) { count }
}
`;

// 产品系列关联产品Es
export const fppEsProductResourcePicker = gql`
  query ProductResourcePicker(
    $first: Int!
    $after: String
    $query: String
    $queryFilter: String
    $collectionId: Int!
    $sortKey: ProductSortKeys = TITLE
  ) {
    products(
      first: $first
      query: $query
      queryFilter: $queryFilter
      after: $after
      collectionId: $collectionId
      sortKey: $sortKey
    ) {
      edges {
        cursor
        node {
          id
          title
          status
          inCollection
          featuredImage {
            id
            altText
            transformedSrc(maxWidth: 200, maxHeight: 200)
            __typename
          }
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;
