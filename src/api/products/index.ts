import * as query from './queries'
import * as mutation from './mutation'
import fppClient from "@src/api/base";

export const getAllProducts = (variables?: object) =>  fppClient.query({
    query: query.fppProductsList,
    fetchPolicy: "network-only",
    variables
})


export const getShopImages = (params) => {
    return fppClient.query({
        query: query.fppShopImages,
        fetchPolicy: "network-only",
        variables: params
    })
}

/** 获取免费素材 */
export const getFreeStuffImages = (params) => {
    return fppClient.query({
        query: query.fppFreeStuffImages,
        fetchPolicy: "network-only",
        variables: params
    })
}

export const fppGetDomain = () => {
    return fppClient.query({
        query: query.fppGetDomain,
        fetchPolicy: "network-only",
    })
}


export const addShopImage = (url) => {
    return fppClient.mutate({
        mutation: mutation.fppAddShopImage,
        variables: {
            image: {
                originalSrc: url,
            }
        }
    })
}

export const deleteShopImage = ({
    productId = 0,
    mediaIds = []
}) => {
    return fppClient.mutate({
        mutation: mutation.fppDeleteImages,// 这个mutation不能用于删除单个上传的图片,后期找安华换一下
        variables: {
            productId,
            mediaIds
        }
    })
}
export const deleteUploadShopImage = ({
    id
}) => {
    return fppClient.mutate({
        mutation: mutation.fppUploadDeleteImages,
        variables: {
            image: {
                id
            }
        }
    })
}
// 上传视频URL
export const productCreateMedia = (data) => {
    return fppClient.mutate({
        mutation: mutation.fppProductCreateMedia,
        variables: data
    })
}
// 媒体上传
export const productShopCreateMedia = (data) => {
    return fppClient.mutate({
        mutation: mutation.fppShopCreateMedia,
        variables: {
            media: data
        }
    })
}
