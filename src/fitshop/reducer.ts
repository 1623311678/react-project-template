import React from "react";

export type ReducerAction__Type =
    | "test:countplus"
    | "update:willrelease"
    | "update:preview"
    | "update:collectionDetailFilterMap"
    | "toPreview"
    | "changeSelectedSectionIndex"
    | "changeEdtingRoute"
    | "changePreviewMode"
    | "update:global"
    | "update:modifyGlobalConfig"
    | "update:modifyPageConfig"
    | "init:globalConfig"
    | "init:pageConfig"

export enum RouteNameEnum {
    HOME = 'home',
    CHECKOUT = 'checkout',
    PRODUCT_DETAIL = 'product_detail',
    COLLECTION_DETAIL = 'collection_detail'
}

export interface FiiShopPageState {
    count: number
    decorateData: object[]
    selectedSectionIndex: string | number
    editingRoute: string | RouteNameEnum
    previewMode: string
    globalConfig?: object
    modifyGlobalConfig?: boolean
    modifyPageConfig?: boolean
    initialGlobalConfig?: string
    initialPageConfig?: string
    collectionDetailFilterMap?: object
}

export interface ReducerAction<T extends string> {
    type: ReducerAction__Type
    payload: {
        data?: object
        selectedIndex?: string | number
        pageName?: string
        previewMode?: string | 'pc' | 'mobile'
        globalConfig?: object
        modifyGlobalConfig?: boolean
        modifyPageConfig?: boolean
        initialGlobalConfig?: string
        initialPageConfig?: string
        collectionDetailFilterMap?: object

    }
}

// function updatePreview<T extends string>(
//     prevState:
// )

export function fitShopPageReducer<T extends string>(state: FiiShopPageState, action: ReducerAction<T>) {
    console.log(action)
    switch (action.type) {
        case 'test:countplus':
            return { ...state, count: state.count + 1 }
        case 'update:willrelease':
            return { ...state, decorateData: action.payload.data }
        case 'changeSelectedSectionIndex':
            return { ...state, selectedSectionIndex: action.payload.selectedIndex }
        case 'changeEdtingRoute':
            return { ...state, editingRoute: action.payload.pageName }
        case 'changePreviewMode':
            return { ...state, previewMode: action.payload.previewMode }
        case 'update:global':
            return { ...state, globalConfig: action.payload.data }
        case 'update:modifyGlobalConfig':
            return { ...state, modifyGlobalConfig: action.payload.modifyGlobalConfig }
        case 'update:modifyPageConfig':
            return { ...state, modifyPageConfig: action.payload.modifyPageConfig }
        case 'init:globalConfig':
            return { ...state, initialGlobalConfig: action.payload.initialGlobalConfig }
        case 'init:pageConfig':
            return { ...state, initialPageConfig: action.payload.initialPageConfig }
        case "update:collectionDetailFilterMap":
            return { ...state, collectionDetailFilterMap: action.payload.collectionDetailFilterMap }
            
        }
}

type IFitShopStoreContext = [
    FiiShopPageState,
    React.Dispatch<ReducerAction<string>>
]

export const initialFitshopState: FiiShopPageState = {
    count: 0,
    decorateData: [],
    selectedSectionIndex: '',
    editingRoute: 'home',
    previewMode: 'pc',
    globalConfig: { header: {}, footer: {}, globalConfig: [] },
    modifyGlobalConfig: false,
    modifyPageConfig: false,
    initialGlobalConfig: undefined,
    initialPageConfig: undefined,
}

export const FitShopStoreContext = React.createContext<IFitShopStoreContext>([
    initialFitshopState,
    (T) => undefined
])