/**
 *  !!!!
 *  Ajax方式只在文件上传的地方使用 !!!!,
 *  B端所有接口都走 GraphQL !!!!
 */

import request from './request'
// 上传图片到CDN
export const postUpload = (data) => {
  return request({
    url: '/upload',
    method: 'post',
    type: 'mediaURL',
    headers: {
      'Content-Type': 'multipart/form-data;charset=UTF-8',
    },
    data
  });
}

// 产品导入
export const postImportProducts = (data) => {
  return request({
    method: "POST",
    url: `/csv/import-product`,
    type: 'exportURL',
    headers: {
      'Content-Type': 'multipart/form-data;charset=UTF-8'
    },
    data
  })
}

// 产品导出 (勾选)
export const postExportProductsByIds = ( data ) => {
  return request({
    method: "POST",
    url: `/csv/bulk-by-ids`,
    type: 'exportURL',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

// 产品导出 (条件)
export const postExportProductsBySearch = ( data ) => {
  return request({
    method: "POST",
    url: `/csv/bulk-by-search`,
    type: 'exportURL',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}


// 产品评论导入
export const postImportProductsReviews = (data) => {
  return request({
    method: "POST",
    url: `/csv/reviews/import`,
    type: 'exportURL',
    headers: {
      'Content-Type': 'multipart/form-data;charset=UTF-8'
    },
    data
  })
}

export const importOrderFile = (data) => {
  return request({
    url: '/order/import-order',
    method: 'POST',
    type: 'exportURL',
    headers: {
      'Content-Type': 'multipart/form-data;charset=UTF-8',
    },
    data
  });
}