/**
 * @description FPP 产品 请求query
 */
import gql from "graphql-tag";
import {
  OrganizationCardProductDetailsFragment,
  ImagesCardImageFragment
} from "./fragment";
import { MAX_VARIANTS_NUMBER } from "@src/common/constant";

// 产品列表
export const fppProductsList = gql`
  query productList(
    $first: Int,
    $last: Int,
    $before: String,
    $after: String,
    $query: String,
    $queryFilter: String
    $sortKey: ProductSortKeys,
    $reverse: Boolean
    ) {
        products(
            first: $first,
            last: $last,
            before: $before,
            after: $after,
            query: $query,
            queryFilter: $queryFilter
            sortKey: $sortKey,
            reverse: $reverse
            )
    {
    edges {
      cursor
      node {
        combination {
          id
          name
        }
        id
        title
        hasOnlyDefaultVariant
        productType
        descriptionHtml
        handle
        status
        vendor
        totalInventory
        totalVariants
        tracksInventory
        tags
        variant {
          price
          compareAtPrice
        }
        featuredImage {
          id
          transformedSrc
          __typename
        }
      }
    }
    pageInfo {
        hasNextPage
        hasPreviousPage
    }
  }
  }
`

// 产品详情
export const fppProductById = id => gql`
  query {
    product(id:${id}) {
      id
      title
      descriptionHtml
      status
      seo {
        title
        description
      }
      handle
      vendor
      tags
      productType
      featuredImage {
        id
        transformedSrc
        __typename
      }

      options {
        id
        name
        position
        values
      }
      hasOnlyDefaultVariant
      variants(first: ${MAX_VARIANTS_NUMBER}) {
        edges {
          node {
            id
            position
            title
            image {
              id
             originalSrc
              altText
            }
            barcode
            weight
            weightUnit
            compareAtPrice
            price
            sku
            taxable
            selectedOptions {
              name
              value
            }
            inventoryPolicy
            requiresShipping
            inventoryQuantity
            inventoryItem {
              unitCost {
                amount
              }
              tracked
              inventoryLevels {
                edges {
                  node {
                    id
                    available
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

// 变体详情
export const fppProductVariantById = gql`
  query VariantDetails(
    $productId: ID!
    $variantId: ID!
    $includeProductVariant: Boolean = true
  ) {
    product(id: $productId) {
      id
      handle
      title
      status
      options {
        name
      }
      #     isGiftCard
      #     hasOnlyDefaultVariant
      totalVariants
      allVariant: variants(first: ${MAX_VARIANTS_NUMBER}) {
        edges {
          node {
            id
            title
            image {
              id
              originalSrc
              altText
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    productVariant(id: $variantId) @include(if: $includeProductVariant) {
      id
      image {
        id
        originalSrc
        altText
        __typename
      }
      title
      displayName
      requiresShipping
      weight
      weightUnit
      barcode
      sku
      inventoryPolicy
      price
      compareAtPrice
      inventoryQuantity
      taxable
      inventoryItem {
        tracked
        unitCost {
          amount
          __typename
        }
        inventoryLevels {
          edges {
            node {
              available
              id
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      selectedOptions {
        name
        value
        __typename
      }

      fulfillmentService {
        id
        __typename
      }

      product {
        id
        __typename
      }
      __typename
    }
    __typename
  }
`;

// 产品组织下拉列表（产品类别、供应商、标签）
export const fppProductOrganization = gql`
  query all {
    allProductTags
    allProductTypes
    allProductVendors
  }
`;

// 产品标签下拉列表
export const fppProductTagsList = gql`
  query getTags {
    allProductTags
  }
`;

// 获取产品分类下拉
export const fppCollectionsFind = gql`
  query CollectionsFind($first: Int!, $query: String, $queryFilter: String, $after: String, $sortKey: CollectionSortKeys = TITLE) {
    collections(
        first: $first,
        query: $query,
        queryFilter: $queryFilter,
        after: $after,
        sortKey: $sortKey) {
      edges {
        cursor
        node {
          id
          title
        }
      }
      pageInfo {
        hasNextPage
      }
    }
    smartCollections: collections(first: 1, queryFilter: "collection_type:smart") {
           edges {
            cursor
            node {
              id
              title
            }
            __typename
           }
          __typename
      }
  }
`;

// 产品关联的产品分类
export const fppOrganizationCardProduct = gql`
  ${OrganizationCardProductDetailsFragment}
  query OrganizationCardProduct($productId: ID!) {
    product(id: $productId) {
      id
      ...OrganizationCardProductDetails
      __typename
    }
  }
`;

// 媒体库图片
export const fppProductMediaImage = gql`
  query ProductMedia($productId: ID!, $imagesFirst: Int!,  $imagesAfter: String) {
    product(id: $productId) {
      id
      __typename
      images(first: $imagesFirst, after: $imagesAfter) {
        edges {
          node {
            ...ImagesCardImage
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
    }
  }

  fragment ImagesCardImage on Image {
    id
    originalSrc
    altText
    src
    contentType
    __typename
  }
`;
//personalize



// 店铺所有图片
export const fppShopImages = gql`
  query allShopImages($productImagesFirst: Int, $productImagesLast: Int, $productCursorAfter: String, $productCursorBefore: String, $productVideosFirst: Int, $productVideosLast: Int, $productVideosCursorAfter: String, $productVideosCursorBefore: String, $uploadedImagesFirst: Int, $uploadedImagesLast: Int, $uploadedCursorAfter: String, $uploadedCursorBefore: String, $uploadedVideosFirst: Int, $uploadedVideosLast: Int, $uploadedVideosCursorAfter: String, $uploadedVideosCursorBefore: String,
    $personalizeImagesFirst: Int, $personalizeImagesLast: Int, $personalizeCursorBefore: String, $personalizeCursorAfter: String, $type: String!
  ) {
    shop {
      productImages(first: $productImagesFirst, after: $productCursorAfter, last: $productImagesLast, before: $productCursorBefore) {
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        edges {
          node {
            id
            contentType
            altText
            originalSrc
            src
            width
            height
          }
          cursor
        }
      }
      productVideos: productImages(first: $productVideosFirst, after: $productVideosCursorAfter, last: $productVideosLast, before: $productVideosCursorBefore, contentType: VIDEO) {
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        edges {
          node {
            id
            contentType
            altText
            originalSrc
            src
            width
            height
          }
          cursor
        }
      }
      uploadedImages(first: $uploadedImagesFirst, after: $uploadedCursorAfter, last: $uploadedImagesLast, before: $uploadedCursorBefore) {
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        edges {
          node {
            id
            contentType
            altText
            originalSrc
            src
            width
            height
          }
          cursor
        }
      }
      uploadedVideos: uploadedImages(
              first: $uploadedVideosFirst,
              after: $uploadedVideosCursorAfter,
              last: $uploadedVideosLast,
              before: $uploadedVideosCursorBefore,
              contentType: VIDEO
              ) {
                  pageInfo {
          hasNextPage
          hasPreviousPage
        }
        edges {
          node {
            id
            contentType
            altText
            originalSrc
            src
            width
            height
          }
          cursor
        }
      }
    }
     personalizeImages:personalizeDefaultUploads(first: $personalizeImagesFirst, last: $personalizeImagesLast, before: $personalizeCursorBefore, after: $personalizeCursorAfter, type: $type){
        edges {
          cursor
          node {
            id
            filename
            contentType
            originalSrc
          }
        }
         pageInfo {
          hasNextPage
          hasPreviousPage
        }
      }
  }
`;

// 免费素材图片
export const fppFreeStuffImages = gql`
  query material($sort: String, $current: Int, $offset: Int){
    decorateMaterial(sort: $sort, current: $current, offset: $offset){
        code
        msg
        data{
            content{
                url
                width
                height
            }
            total
        }
    }
  }
`

// 批量编辑变体
export const fppVariantsListCard = gql`
  query VariantsListCard($productId: ID!, $variantsLimit: Int = ${MAX_VARIANTS_NUMBER}, $ids: [ID!] =[]) {
    product(id: $productId) {
      id
      variants(first: $variantsLimit, ids: $ids) {
        edges {
          cursor
          node {
            id
            title
            price
            sku
            weight
            weightUnit
            compareAtPrice
            taxable
            barcode
            inventoryPolicy
            requiresShipping
            inventoryItem {
              unitCost {
                amount
                __typename
              }
              tracked
              inventoryLevels {
                edges {
                  node {
                    id
                    available
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
            image {
              id
              altText
              originalSrc
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }

  }
`;

// 批量编辑产品
export const fppBatchProductList = gql`
  query productByIds($ids: [ID!]!) {
    productBulkGetById(ids: $ids) {
      edges {
        node {
          id
          title
          tags
          vendor
          productType
          status
          vendor
          hasOnlyDefaultVariant
          featuredImage {
            id
            transformedSrc
            __typename
          }
          options {
            id
            name
            position
            values
          }
          variants(first: ${MAX_VARIANTS_NUMBER})  {
            edges {
              node {
                id
                title
                barcode
                price
                taxable
                sku
                weight
                weightUnit
                requiresShipping
                compareAtPrice
                inventoryPolicy
                inventoryItem {
                  unitCost {
                    amount
                  }
                  tracked
                  inventoryLevels {
                    edges {
                      node {
                        available
                        id
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

// 轮询查看导入状态
// export const fppCsvjobresult = gql`
//   query csvjobresult($jobId: ID!) {
//     csvJobResult(jobId: $jobId){
//       jobId
//       msg
//       code
//       totalTaskNum
//       remainTaskNum
//     }
//   }
// `;
export const fppCsvjobresult = gql`
  query csvjobresult($jobId: ID!) {
    csvJobResult(jobId: $jobId) {
      jobId
      msg
      code
      totalTaskNum
      remainTaskNum
      error {
        name
        message
      }
      skip {
        name
        message
      }
    }
  }
`;

// 主域名
export const fppGetDomain = gql`
  query shopSettingGeneric {
    shopSettingGeneric {
        domain
    }
  }
`;

// 店铺所有视频
export const fppShopVideos = gql`
  query allShopImages(
    $productVideosFirst: Int,
    $productVideosLast: Int,
    $productVideosCursorAfter: String,
    $productVideosCursorBefore: String,
    $uploadedVideosFirst: Int,
    $uploadedVideosLast: Int,
    $uploadedVideosCursorAfter: String,
    $uploadedVideosCursorBefore: String) {
    shop {
      productVideos: productImages(
        first: $productVideosFirst,
        after: $productVideosCursorAfter,
        last: $productVideosLast,
        before: $productVideosCursorBefore,
        contentType: VIDEO) {
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        edges {
          node {
            id
            contentType
            altText
            originalSrc
            src
            width
            height
          }
          cursor
        }
      }
      uploadedVideos: uploadedImages(
              first: $uploadedVideosFirst,
              after: $uploadedVideosCursorAfter,
              last: $uploadedVideosLast,
              before: $uploadedVideosCursorBefore,
              contentType: VIDEO
              ) {
                  pageInfo {
          hasNextPage
          hasPreviousPage
        }
        edges {
          node {
            id
            contentType
            altText
            originalSrc
            src
            width
            height
          }
          cursor
        }
      }
    }
  }
`;

// 店铺所有图片
export const fppAllShopImages = gql`
query allShopImages(
  $productImagesFirst: Int, 
  $productImagesLast: Int, 
  $productCursorAfter: String, 
  $productCursorBefore: String, 
  $uploadedImagesFirst: Int, 
  $uploadedImagesLast: Int, 
  $uploadedCursorAfter: String, 
  $uploadedCursorBefore: String, 
  ) {
    shop {
      productImages(
        first: $productImagesFirst, 
        after: $productCursorAfter, 
        last: $productImagesLast, 
        before: $productCursorBefore
      ) {
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        edges {
          node {
            id
            contentType
            altText
            originalSrc
            src
            width
            height
          }
          cursor
        }
      }
      
      uploadedImages(first: $uploadedImagesFirst, after: $uploadedCursorAfter, last: $uploadedImagesLast, before: $uploadedCursorBefore) {
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        edges {
          node {
            id
            contentType
            altText
            originalSrc
            src
            width
            height
          }
          cursor
        }
      }
    }
  }
`;
// 产品总条数
export const fppProductsTotal = gql`
  query ProductCountBySearch ($query: String!) {
    productCountBySearch (query: $query) { count }
  }
`;

// 产品列表Es
export const fppEsProductsList = gql`
  query productList(
    $first: Int,
    $last: Int,
    $before: String,
    $after: String,
    $query: String, 
    $queryFilter: String,
    $sortKey: ProductSortKeys,
    $reverse: Boolean
    ) {
        products(
            first: $first,
            last: $last,
            before: $before,
            after: $after,
            query: $query,
            queryFilter: $queryFilter,
            sortKey: $sortKey,
            reverse: $reverse
            ) 
    {
    edges {
      cursor
      node {
        id
        title
        productType
        descriptionHtml
        handle
        title
        status
        vendor
        tracksInventory
        totalInventory
        totalVariants
        variant {
            title
            price
            compareAtPrice
        }
        tags
        featuredImage {
          id
          transformedSrc
          __typename
        }
      }
    }
    pageInfo {
        hasNextPage
        hasPreviousPage
    }
  }
  }
`;

// 产品总条数Es
export const fppEsProductsTotal = gql`
query ProductCountBySearch ( $query: String!, 
  $queryFilter: String) {
  productCountBySearch (query: $query, queryFilter: $queryFilter) { count }
}
`;

// 获取产品分类下拉Es
export const fppEsCollectionsFind = gql`
  query CollectionsFind(
    $first: Int!, 
    $query: String, 
    $queryFilter: String,
    $after: String, 
    $sortKey: CollectionSortKeys = TITLE
    ) {
    collections(
        first: $first,
        query: $query,
        queryFilter: $queryFilter,
        after: $after,
        sortKey: $sortKey) {
      edges {
        cursor
        node {
          id
          title
        }
      }
      pageInfo {
        hasNextPage
      }
    }
    smartCollections: collections(first: 1, queryFilter: "collection_type:smart") {
           edges {
            cursor
            node {
              id
              title
            }
            __typename
           }
          __typename
      }
  }
`;
