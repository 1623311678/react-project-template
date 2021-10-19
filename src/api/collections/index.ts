import * as query from './queries'
import fppClient from "@src/api/base";




export const getCollectionsList = (param?: object) => {
    return fppClient.query({
        query: query.fppCollectionsList,
        fetchPolicy: "network-only",
        variables: param
    })
}


export const allCollectionOptions = () => {
    return fppClient.query({
        query: query.allCollectionOptions,
        fetchPolicy: "network-only"
    })
}


export const getProductsInCollectionById = (_varaibles) =>  fppClient.query({
    query: query.fppProductsInCollection,
    fetchPolicy: "network-only",
    variables: _varaibles
})




