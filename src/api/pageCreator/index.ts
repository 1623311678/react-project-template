import * as mutations from './mutation'
import * as queries from './queries'
import fppClient from "@src/api/base";


//获取自建页面列表
export const getPageList = (param:string='') => {
    return fppClient
        .query({
            query: queries.getPageList,
            variables: {
                input: {
                    title: param
                }
              },
            fetchPolicy: "network-only",//不需要缓存
        })
}
//获取自建页面详情
export const getPageDetails = (param:string='') => {
    return fppClient
        .query({
            query: queries.getPageDetails,
            variables: {
                input: {
                    id: param
                }
              },
            fetchPolicy: "network-only",//不需要缓存
        })
}
//批量控制页面
export type PagesUpdateType = {
    pageIds:any[],
    published:boolean
}
export const PagesUpdate = (param:PagesUpdateType) => {
    return fppClient
        .mutate({
            mutation: mutations.PagesUpdate,
            variables: {
                input: param,
                fetchPolicy: "network-only",//不需要缓存
            },
        })
}
//创建页面
export type PageCreateType = {
    title: string,
    body: string,
    published: boolean
}
export const PageCreate = (param:PageCreateType)=>{
    return fppClient
        .mutate({
            mutation: mutations.PageCreate,
            variables: {
                input: param,
                fetchPolicy: "network-only",//不需要缓存
            },
        })
}
export const PageDelete = (id:string)=>{
    return fppClient
        .mutate({
            mutation: mutations.PageDelete,
            variables: {
                input: {
                    id
                },
                fetchPolicy: "network-only",//不需要缓存
            },
        })
}
export type PageUpdateType = {
    title: string,
    body: string,
    published: boolean,
    id:string
}
export const PageUpdate = (param:PageUpdateType)=>{
    return fppClient
        .mutate({
            mutation: mutations.PageUpdate,
            variables: {
                input: param,
                fetchPolicy: "network-only",//不需要缓存
            },
        })
}
export type PageCopyType = {
    pageId: string,
    newPageTitle: string,
}
export const PageCopy = (param:PageCopyType)=>{
    return fppClient
        .mutate({
            mutation: mutations.PageCopy,
            variables: {
                input: param,
                fetchPolicy: "network-only",//不需要缓存
            },
        })
}
