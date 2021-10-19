/**
 * @description FPP 产品分类 请求muration
 */
import gql from "graphql-tag";


// 创建产品系列
export const fppCreateCollection = gql`
mutation CreateCollection($collection: CollectionInput!) {
  collectionCreate(input: $collection) {
    collection {
      id
      title
      descriptionHtml
      sortOrder
      handle
      templateSuffix
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
      ...SEOCardCollection
      ...CollectionImageCard
      __typename
      }
    userErrors {
      field
      message
      __typename
      }
    __typename
  }
}

fragment SEOCardCollection on Collection {
  seo {
    title
    description
    __typename
  }
  __typename
}

fragment CollectionImageCard on Collection {
  image {
    id
    altText
    originalSrc
    __typename
  }
  __typename
}

`;

// 修改产品系列
export const fppUpdateCollection = gql`
mutation UpdateCollection($collection: CollectionInput!) {
  collectionUpdate(input: $collection) {
    collection {
      id
      title
      descriptionHtml
      sortOrder
      handle
      templateSuffix
#       productsCount
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
      ...SEOCardCollection
      ...CollectionImageCard
      __typename
    }
     userErrors {
       field
       message
       __typename
     }
    job {
      id
      __typename
    }
    __typename
  }
  __typename
}

fragment SEOCardCollection on Collection {
  seo {
    title
    description
    __typename
  }
  __typename
}

fragment CollectionImageCard on Collection {
  image {
    id
    altText
    originalSrc
    __typename
  }
  __typename
}
`;

// 删除产品分类
export const fppDeleteCollection = gql`
  mutation DeleteCollection($collection: CollectionDeleteInput!) {
    collectionDelete(input: $collection) {
      userErrors {
        field
        message
      }
    }
  }
`;

// 手动添加关联产品
export const fppAddProducts = gql`
  mutation AddProducts($id: ID!, $productIds: [ID!]!) {
    collectionAddProducts(id: $id, productIds: $productIds) {
      userErrors {
        field
        message
      }
    }
  }
`;

// 手动移除关联产品
export const fppRemoveProducts = gql`
  mutation RemoveProducts($id: ID!, $productIds: [ID!]!) {
    collectionRemoveProducts(id: $id, productIds: $productIds) {
      userErrors {
        field
        message
      }
    }
  }
`;

// 产品系列关联产品排序
export const fppUpdateCollectionSortOrder = gql`
mutation UpdateCollectionSortOrder(
  $collection: CollectionInput!,
  $first: Int, 
  $after: String
  ) {
collectionUpdate(input: $collection) {
  collection {
    id
    sortOrder
    products(first: $first, after: $after) {
      ...ProductRow
      __typename
    }
    __typename
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

// 产品系列关联产品拖拽排序
export const fppReorderProducts = gql`
  mutation ReorderProducts(
    $id: ID!, 
    $moves: [MoveInput!]!
    ) {
        collectionReorderProducts(
            id: $id, 
            moves: $moves
    ) {
        userErrors {
            field
            message
        }
    }
  }
`;

// 批量删除
export const fppCollectionBulkDelete = gql`
mutation CollectionBulkDelete($collectionIds: [ID]!, $query: String) {
  collectionBulkDelete(collectionIds: $collectionIds, query: $query) {
    job {
      id
    }
    userErrors {
      field
      message
    }
  }
}
`;