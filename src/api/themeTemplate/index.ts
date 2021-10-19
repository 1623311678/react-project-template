import * as mutations from './mutation'
import * as queries from './queries'
import fppClient from "@src/api/base";

/*mutation请求*/
//模版导入
export const mutationDecorate = (mid) => {
    return fppClient
        .mutate({
            mutation: mutations.mutationDecorate,
            variables: {
                mid,
                fetchPolicy: "network-only" //不需要缓存
            }
        })
}
export const fppMutationRecordRename = (params: { id: number | string, name: string }) => {
    return fppClient
        .mutate({
            mutation: mutations.fppMutationRecordRename,
            variables: {
                ...params,
                fetchPolicy: "network-only" //不需要缓存
            }
        })
}
export const fppMutationRecordPublish = (params: { id: number }) => {
    return fppClient
        .mutate({
            mutation: mutations.fppMutationRecordPublish,
            variables: {
                ...params,
                fetchPolicy: "network-only" //不需要缓存
            }
        })
}
export const fppMutationRecordRemove = (params: { id: number }) => {
    return fppClient
        .mutate({
            mutation: mutations.fppMutationRecordRemove,
            variables: {
                ...params,
                fetchPolicy: "network-only" //不需要缓存
            }
        })
}
/*query请求*/
//模版列表
export const queryDecorate = () => {
    return fppClient
        .query({
            query: queries.queryDecorate,
            fetchPolicy: "network-only",//不需要缓存
        })
}
//存档主题列表
export const fppQueryRecordList = () => {
    return fppClient
        .query({
            query: queries.fppQueryRecordList,
            fetchPolicy: "network-only",//不需要缓存
        })
}
//获取当前主题
export const fppQueryDecorateServing = () => {
    return fppClient
        .query({
            query: queries.fppQueryDecorateServing,
            fetchPolicy: "network-only",//不需要缓存
        })
}
