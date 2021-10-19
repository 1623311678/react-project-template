/**
 * @description FPP 产品请求mutation
 */
import gql from "graphql-tag";
import { MAX_VARIANTS_NUMBER } from "@src/common/constant";

// 添加产品
export const fppCreateProduct = gql`
  mutation productCreate($product: ProductInput!, $media: [CreateMediaInput!]) {
    productCreate(input: $product, media: $media) {
      product {
        id
        title
      }
      userErrors {
        field
        message
      }

    }
  }
`;

// 新建变体
export const fppCreateProductVariant = gql`
  mutation CreateProductVariant($productVariant: ProductVariantInput!) {
    productVariantCreate(input: $productVariant) {
      product {
        id
        __typename
      }
      userErrors {
        field
        message
      }
      productVariant {
        id
        title
        requiresShipping
        weight
        weightUnit
        barcode
        sku
        inventoryPolicy
        fulfillmentService {
          id
          __typename
        }
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
        inventoryItem {
          unitCost {
            amount
          }
          inventoryLevels {
            edges {
              node {
                available
                id
              }
            }
          }
        }
        selectedOptions {
          name
          value
        }
        fulfillmentService {
          id
          __typename
        }

        __typename
      }
      __typename
    }
  }
`;

export const fppUpdateProductVariant = gql`
  mutation UpdateProductVariant($productVariant: ProductVariantInput! ) {
    productVariantUpdate(input: $productVariant) {
      productVariant {
        id
        __typename
      }
      userErrors {
        field
        message
      }
      __typename
    }
  }
`;

// 删除产品
export const deleteProductById = gql`
  mutation productDelete($product: ProductDeleteInput!) {
    productDelete(input: $product) {
      userErrors {
        field
        message
      }
    }
  }
`;

// 变体排序
export const sortProductVariant = gql`
  mutation ProductOptionsAndVariantsReorder(
    $id: ID!
    $options: [ProductOptionInput!]!
  ) {
    productOptionsAndVariantsReorder(id: $id, options: $options) {
      userErrors {
        field
        message
        __typename
      }
      product {
        variants(first: ${MAX_VARIANTS_NUMBER}) {
          edges {
            node {
              id
              requiresShipping
              weight
              weightUnit
              barcode
              sku
              position
              inventoryPolicy
              fulfillmentService {
                id
                __typename
              }
              inventoryItem {
                tracked
                unitCost {
                  amount
                  __typename
                }
                harmonizedSystemCode
                __typename
              }
              inventoryQuantity
              image {
                id
                src: originalSrc
                altText
                __typename
              }
              selectedOptions {
                name
                value
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
      }
      __typename
    }
  }
`;

// 修改产品
export const fppUpdateProduct = gql`
  mutation productUpdate($product: ProductInput!) {
    productUpdate(input: $product) {
      userErrors {
        field
        message
        __typename
      }
      product {
        id
        title
        handle
        vendor
        descriptionHtml
        seo {
          title
          description
        }
        tags
        variants {
          edges {
            node {
              id
              image {
                id
                originalSrc
                altText
              }
              barcode
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
  }
`;

// 删除变体
export const fppDeleteVariantById = gql`
  mutation productVariantDelete($id: ID!) {
    productVariantDelete(id: $id) {
      userErrors {
        field
        message
      }
    }
  }
`;

// 删除产品图片
export const fppDeleteImages = gql`
  mutation ProductDeleteMedia($productId: ID!, $mediaIds: [ID!]!) {
    productDeleteMedia(productId: $productId, mediaIds: $mediaIds) {
      userErrors {
        field
        message
        __typename
      }
      __typename
    }
  }
`;
// 删除上传图片
export const fppUploadDeleteImages = gql`
  mutation DeleteShopImage($image: shopImageDeleteInput!) {
    shopImageDelete(input: $image) {
      userErrors {
        field
        message
        __typename
      }
      __typename
    }
  }
`;

// 媒体图片排序
export const fppReorderProductMedia = gql`
  mutation ReorderProductMedia($id: ID!, $moves: [MoveInput!]!) {
    productReorderMedia(id: $id, moves: $moves) {
      userErrors {
        field
        message
        __typename
      }
      __typename
    }
    __typename
  }
`;

// 批量编辑变体
export const fppProductVariantPartialUpdate = gql`
mutation productVariantPartialUpdate($productVariant: ProductVariantPartialUpdateInput!) {
  productVariantPartialUpdate(input: $productVariant) {
    userErrors {
      field
      message
    }
    ProductVariant {
      id
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
`;

// 批量编辑产品及其变体
export const fppProductPartialUpdate = gql`
  mutation productPartialUpdate($product: ProductPartialUpdateInput!) {
    productPartialUpdate(input: $product) {
      userErrors {
        field
        message
      }
      Product {
        id
        title
        tags
        vendor
        productType
        status
        variants {
          edges {
            node {
              id
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
`;

// 批量编辑 修改标签
export const fppProductBulkTagsAction = gql`
  mutation productBulkTagsAction($productIds: [ID!]!, $tags: [String!]!, $action: BulkTagsAction!, $query: String) {
    productBulkTagsAction(productIds: $productIds, tags: $tags, action:$action, query: $query) {
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

// 批量编辑 修改分类
export const fppProductBulkCollectionsAction = gql`
  mutation productBulkCollectionsAction($productIds: [ID!]!, $collectionsIds: [ID!]!, $action: BulkCollectionsAction!, $query: String) {
    productBulkCollectionsAction(productIds: $productIds, collectionsIds:$collectionsIds, action: $action, query: $query) {
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

// 批量编辑 修改发布状态
export const fppProductBulkChangeStatus = gql`
  mutation productBulkChangeStatus($productIds: [ID!]!, $status: ProductStatus!, $query: String) {
    productBulkChangeStatus(productIds: $productIds, status:$status, query: $query) {
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

// 批量编辑变体 缺货后是否继续销售
export const fppBulkUpdateVariantInventoryPolicy = gql`
  mutation BulkUpdateVariantInventoryPolicy(
    $variantIds: [ID!]!,
    $inventoryPolicy: ProductVariantInventoryPolicy!
  ) {
    bulkProductVariantUpdateInventoryPolicy(
      productVariantIds: $variantIds,
      inventoryPolicy: $inventoryPolicy
    ) {
      productVariants {
        id
        inventoryPolicy
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
`;

// 批量编辑变体 库存数量
export const fppVariantBulkAdjustQuantity = gql`
  mutation VariantBulkAdjustQuantity(
    $inventoryItemAdjustments: [InventoryAdjustItemInput!]!,
    $locationId: ID!
  ) {
      inventoryBulkAdjustQuantityAtLocation(
        inventoryItemAdjustments: $inventoryItemAdjustments,
        locationId: $locationId
      ) {
        inventoryLevels {
          id
          location {
            id
            __typename
          }
          item {
            id
            variant {
              id
              inventoryQuantity
              product {
                id
                totalInventory
                __typename
              }
              __typename
            }
            __typename
          }
          available
          __typename
        }
        userErrors {
          message
          __typename
        }
        __typename
    }
  }
`;

export const fppProductBulkDelete = gql`
mutation productBulkDelete($productIds: [ID]!, $query: String) {
  productBulkDelete(productIds: $productIds, query: $query) {
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

// 复制产品
export const fppProductDuplicate = gql`
  mutation productDuplicate(
    $productId: ID!,
    $newTitle: String!,
    $includeImages: Boolean!,
    $copySku: Boolean!,
    $copyBarcode: Boolean!,
    $copyAvailability: Boolean!,
    $copyInventoryQuantity: Boolean!,
    $newStatus: ProductStatus!
  ) {
      productDuplicate(
        productId: $productId,
        newTitle: $newTitle,
        includeImages: $includeImages,
        copySku: $copySku,
        copyBarcode: $copyBarcode,
        copyAvailability: $copyAvailability,
        copyInventoryQuantity: $copyInventoryQuantity,
        newStatus: $newStatus
      ) {
        productId
        userErrors {
          field
          message
          __typename
        }
        __typename
      }
    }
`;

// 修改产品的媒体
export const fppProductCreateMedia = gql`
  mutation ProductCreateMedia($productId: ID!, $media: [CreateMediaInput!]!) {
    productCreateMedia(productId: $productId, media: $media) {
      image {
        id
        originalSrc
        src
      }
      userErrors {
        field
        message
        __typename
      }
      __typename
    }
  }
`;

// 传完CDN 添加到店铺媒体库
export const fppAddShopImage = gql`
mutation ShopCreateMedia($media: [CreateMediaInput!]!) {
  shopImageUpload(media: $media) {
    image {
      id
      originalSrc
      src
    }
    userErrors {
      field
      message
      __typename
    }
    __typename
  }
}
`;

// 导入提交
export const fppCsvjobsubmit = gql`
  mutation csvjobsubmit($jobId: ID!) {
    csvJobSubmit(jobId: $jobId){
      jobId,
      code,
      msg
    }
  }
`;

// URL上传图片
export const fppUploadImageByUrl = gql`
  mutation uploadImageByUrl($url: URL!) {
    uploadImageByUrl(externalUrl: $url) {
      originalSource
      userErrors {
        field
        message
      }
    }
  }
`;

// 媒体上传
export const fppShopCreateMedia = gql`
  mutation ShopCreateMedia($media: [CreateMediaInput!]!) {
    shopImageUpload(media: $media) {
      image {
        id
        originalSrc
        src
      }
      userErrors {
        field
        message
        __typename
      }
      __typename
    }
  }
`;

// 批量修改产品类别
export const fppProductBulkChangeType = gql`
mutation productBulkChangeType($productIds: [ID!]!, $productType: String!, $query: String) {
  productBulkChangeType(productIds: $productIds, productType: $productType, query: $query) {
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

// 批量删除产品变体
export const fppProductVariantBulkDelete = gql`
mutation productVariantBulkDelete($productId: ID!, $variantIds: [ID!]!) {
  productVariantBulkDelete(productId: $productId, variantIds: $variantIds) {
      userErrors  {
          field
          message
      }
  }
}
`;

// 修改产品媒体
export const fppProductUpdateMedia = gql`
  mutation productUpdateMedia($productId: ID!, $media: UpdateMediaInput!) {
    productUpdateMedia(productId: $productId, media: $media) {
      userErrors {
        field
        message
        __typename
      }
      __typename
    }
  }
`;
