/**
 * FPP 在线商店 queries
 */
import gql from "graphql-tag";

export const fppMenu = gql`
  query menu {
    fetchRoot {
      tid
      name
      handle
      son
    }
  }
`;

export const getDecorateHeader = gql`
  query getDecorateHeader($flag: String) {
    decorateHeader(flag: $flag){
      id
      name
      data
      type
    }
  }
`;

export const fppMenuDetail = gql`
  query menu($tid: Float!) {
    fetchDetail(tid: $tid) {
      root {
        tid
        name
        handle
      }
      items {
        tid
        name
        subject
        tag
        sid
        display
        handle
        son {
          tid
          name
          subject
          tag
          sid
          display
          handle
          son {
            tid
            name
            subject
            tag
            sid
            display
            handle
          }
        }
      }
    }
  }
`;

// 产品-列表
export const productList = gql`
  query productList {
    products {
      edges {
        node {
          featuredImage {
            id
            transformedSrc(maxWidth: 350, maxHeight: 350)
            __typename
          }
          id
          title
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        __typename
      }
    }
  }
`;

export const collectionList = gql`
  query CollectionList(
    $collectionsFirst: Int
    $collectionsLast: Int
    $before: String
    $after: String
    $sortKey: CollectionSortKeys
    $reverse: Boolean
    $query: String
    $savedSearchId: ID
  ) {
    collections(
      first: $collectionsFirst
      after: $after
      last: $collectionsLast
      before: $before
      sortKey: $sortKey
      reverse: $reverse
      query: $query
      savedSearchId: $savedSearchId
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        __typename
      }
      edges {
        cursor
        node {
          id
          title
          image {
            id
            altText
            originalSrc
            #             transformedSrc
            __typename
          }
          ...CollectionRulesList
          __typename
        }
        __typename
      }
      __typename
    }
  }

  fragment CollectionRulesList on Collection {
    ruleSet {
      appliedDisjunctively
      rules {
        column
        relation
        condition
        __typename
      }
      __typename
    }
    __typename
  }
`;
