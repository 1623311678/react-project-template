export enum POS_TYPE {
    center = "center",
    top = "top",
    bottom = "bottom",
    left = "left",
}
//单图
export type SingleImageFormData = {
    name?: string;
    // image_src?: string;
    // video_obj?: {
    //     cover?: string,
    //     video_src?: string,
    // },
    image_src_mobile?: {
        uploadType: 'VIDEO' | 'IMAGE',
        videoType: "YTB" | 'URL',
        image_src?: string,
        image_w?: number,
        image_h?: number,
        video_src?: string,
    };
    media_obj?: {
        uploadType: 'VIDEO' | 'IMAGE',
        videoType: "YTB" | 'URL',
        image_src?: string,
        image_w?: number,
        image_h?: number,
        video_src?: string,
    },
    image_height?: string;
    title?: string;
    sub_title?: string;
    title_size?: "40" | "30" | "20",
    sub_title_size?: "24" | "20" | "16",
    button_label?: string;
    cut_position?: POS_TYPE; // 截取位置
    link_to_obj?: object; // 图片跳转后的页面
    button_variant?: 'fill' | 'outlined';
    title_uppercase?: boolean;
    sub_title_uppercase?: boolean;
    button_uppercase?: boolean;
    button_bg_and_border_color?: string,
    logo_text_color?: string,
    title_color?: string | rgb,
    sub_title_color?: string | rgb,
    button_text_color?: string | rgb,
    alignment?: 'left' | 'center' | 'right';
    [key: string]: string | boolean | object
}
//多图
export type TwoImagesFormDataType = {
    name?: string;
    blocks?: Array<{
        name?: string;
        image_src_mobile?: string;
        image_src?: string,
        image_w?: number | string,
        image_h?: number | string,
        image_height?: string;
        title?: string;
        sub_title?: string;
        title_size?: "40" | "30" | "20",
        sub_title_size?: "24" | "20" | "16",
        button_label?: string;
        cut_position?: POS_TYPE; // 截取位置
        link_to_obj?: object; // 图片跳转后的页面
        button_variant?: 'fill' | 'outlined';
        title_uppercase?: boolean;
        sub_title_uppercase?: boolean;
        button_uppercase?: boolean;
        button_bg_and_border_color?: string,
        logo_text_color?: string,
        title_color: string | rgb,
        sub_title_color: string | rgb,
        button_text_color: string | rgb,
        alignment?: 'left' | 'center' | 'right';
        [key: string]: string | number | boolean | object
    }>,
    image_layout_type?: 'equal' | 'left_bigger' | MulitiImages__Image_Layout_Type
    text_position?: 'inner' | 'hover' | 'under_image'
    show_image_spacing?: boolean,
    show_mulityimage_spacing?: boolean,
    module_bg_color?: string | rgb,
    text_direction?: string,
    [key: string]: any
}
//多图
export type MulitiImagesFormDataType = TwoImagesFormDataType

type ImageTextLayout = 'image_left_and_text_right' | 'image_right_and_text_left'

export type MulitiImages__Image_Layout_Type =
    'multi3_1' | 'multi3_2' | 'multi4_1' | 'multi4_2' | 'multi5_1' | 'multi5_2'
//品牌信息
export type BrandInfoFormData = SingleImageFormData & {
    image_text_layout?: ImageTextLayout,
    image_src?: string,
    image_w?: number | string,
    image_h?: number | string,
    image_height?: 'large' | 'medium' | 'small',
    title_color: string | rgb,
    sub_title_color: string | rgb,
    button_text_color: string | rgb,
    module_bg_color: string | rgb,
    text_direction?: string,
}

export type ConsumerFeedFormDataType = {
    name?: string,
    logo_text_color?: string,
    layout_type?: 'layout_1JPG' | 'layout_2JPG',
    auto_slide?: boolean,
    loop_duration?: number,
    feed_font_color?: string | rgb, 
    blocks?: Array<{
        consumer_name?: string,
        consumer_feed?: string,
        name_font_size?: '18' | '16' | '14',
        feed_font_size?: '16' | '14' | '12',
        title_color: string | rgb,
        sub_title_color: string | rgb,
        img_size?: string,
    }>
}


export type RecommendedFormDataType = {
    name?: string;
    image_text_layout?: ImageTextLayout,
    image_src?: string;
    image_w?: number,
    image_h?: number,
    image2_src?: string; // 第二种展示方式时,需上传两张图
    image_height?: 'large' | 'medium' | 'small',
    title?: string;
    sub_title?: string;
    title_size?: "40" | "30" | "20",
    price?: number,
    sub_title_size?: "24" | "20" | "16",
    button_label?: string;
    cut_position?: POS_TYPE; // 截取位置
    link_to_obj?: {
        [key: string]: any
    },
    title_uppercase?: boolean;
    sub_title_uppercase?: boolean;
    show_image_decorate?:boolean;
    decorate_style?:any;
    button_uppercase?: boolean;
    price_color: string | rgb,
    link_color: string | rgb,
    title_color: string | rgb,
    sub_title_color: string | rgb,
    button_text_color: string | rgb,
    module_bg_color: string | rgb,
    [key: string]: any
}

//图标文字
export type LogoAndTextFormDataType__Logo = 'logo_left' | 'logo_top'
export type LogoAndTextFormDataType = {
    name?: string;
    logo_position?: LogoAndTextFormDataType__Logo;
    module_bg_color: string | rgb,
    logo_text_color: string | rgb,
    title_color: string | rgb,
    sub_title_color: string | rgb,
    title_size?: "40" | "30" | "20",
    text_size?: "20" | "16" | "12",
    blocks: Array<{
        logo_url?: string,
        image_src?: string,
        image_w?: number,
        image_h?: number,
        title?: string,
        text?: string,
        title_size?: "40" | "30" | "20",
        text_size?: "20" | "16" | "12",
        title_uppercase?: boolean,
        text_uppercase?: boolean,
        title_color: string | rgb,
        sub_title_color: string | rgb,
    }>
}

export type SubscribeEmailFormData = {
    title?: string;
    sub_title?: string;
    title_size?: "40" | "30" | "20",
    button_label?: string;
    sub_title_size?: "24" | "20" | "16",
    title_uppercase?: boolean;
    sub_title_uppercase?: boolean;
    button_uppercase?: boolean;
    thank_title?: string;
    thank_sub_title?: string;
    button_variant?: 'fill' | 'outlined';

    module_bg_color?: string | rgb,
    logo_text_color?: string | rgb,
    title_color?: string | rgb,
    sub_title_color?: string | rgb,
    button_text_color?: string | rgb,
    button_bg_and_border_color?: string | rgb,
    thank_title_color?: string | rgb,
    thank_sub_title_color?: string | rgb,

}

export type CollectionListFormDataType = {
    name?: string;
    layout_type?: 'layout_1JPG' | 'layout_2JPG' | 'layout_3JPG',
    cart_background_color?: string, // 只有 layout_2JPG 时 可选
    module_bg_color?: string | rgb,
    series_test_color?: string | rgb,
    logo_text_color?: string | rgb,
    auto_slide?: boolean,
    slide_duration?: number,
    hover_effect?: string,
    show_number?: boolean,
    blocks: Array<{
        title?: string,
        collection?: {
            id?: string,
            image?: Array<string>,
            number?: number,
            title?: string,
            type?: "collection" | '',
            url?: string // 类似/collections/test专辑-collection"
        }
    }>
}
//系列详情
export type CollectionDetailListFormDataType = {
    name?: string;
    layout_type?: 'layout_1JPG' | 'layout_2JPG',
    module_bg_color?: string | rgb,
    product_color?: string | rgb,
    logo_text_color?: string | rgb,
    card_bg_color?: string | rgb,
    cover_text_color?: string | rgb,
    hover_effect?: string,

    show_number?: boolean,
    product_name_color?: string | rgb,
    price_color?: string | rgb,
    product_title_size?: string,
    price_size?: string,
    slide_duration?: number,
    mobile_display?: string,

    blocks: Array<{
        cover_image?: string,
        image_src?: string,
        image_w?: number,
        image_h?: number,
        block_bg_color?: string,
        text_position?: string,
        link_to_obj?: {
            id?: string,
            image?: Array<string>,
            number?: number,
            title?: string,
            type?: "collection" | '',
            key_map?: string
        }
    }>
}

export type ProductDetailFormDataType = {

}

export type ProductListFormDataType = {
    name?: string;
    hover_effect?: string;
    layout_type?: 'layout_1JPG' | 'layout_2JPG' | 'layout_3JPG' | 'layout_4JPG',
    product_list?: Array<{
        id?: string,
        title?: string,
        status?: string,
        featuredImage?: string,
        discount: string
    }>,
    blocks?: Array<{
        link_to_obj: {
            id?: string,
            type?: string,
        }
    }>,
    sortRule?: any,
    row_counts?: number,
    product_count_per_row?: number,
    product_layout_count_per_row?: number,
    image_height?: number | string,
    product_title_size?: string,
    price_size?: string,
    position_of_title_and_price?: 'left' | 'right',
    show_view_all?: boolean,
    show_discount_tip?: boolean,

    module_bg_color?: string | rgb,
    card_bg_color?: string | rgb, 
    product_name_color?: string | rgb,
    logo_text_color?: string | rgb,
    discount_price_color?: string | rgb,
    origin_price_color?: string | rgb,
    bargain_price_color?: string | rgb,
}

export type SingleProductFormDataType = {
    name?: string,
    logo_text_color?: string | rgb,
    module_bg_color?: string | rgb,
    // 原价色 售价色 打折色
    originalColor: any,
    priceColor: any,
    DiscountColor: any,
    productColor: any,
    fontcolor?: string,
    product?: {
        id?: string,
        title?: string,
        status?: string,
        featuredImage?: string,
        discount: string
    },
    show_price?: boolean,
    show_attribute?: boolean,
    show_description?: boolean,
    show_mini_pic?: boolean,
    show_discount_marker?: boolean,
    mini_pic_layout?: 'left' | 'right' | 'bottom',
    img_layout?: 'left' | 'right',
    product_layout?: ImageTextLayout,
    noVariantImageFirst?: boolean,
    [key:string]:any
}
//轮播
export type CarouselImagesFormDataType = {
    auto_slide?: boolean,
    full_screen?: boolean,
    full_header?:boolean,
    slide_duration?: number | string,
    slide_effect?: string,
    img_top_margin?: string,
    img_bottom_margin?: string,
    blocks?: Array<{
        // image_src: string,
        media_obj?: {
            uploadType: 'VIDEO' | 'IMAGE',
            videoType: "YTB" | 'URL',
            image_src?: string,
            image_w?: number,
            image_h?: number,
            video_src?: string,
        },
        image_src_mobile: string,
        link_to_obj?: {
            id?: string,
            title?: string,
            key_map?: string,
        },
        cut_position?: POS_TYPE, // 截取位置
        title?: string,
        sub_title?: string,
        button_label?: string,
        title_size?: "40" | "30" | "20",
        sub_title_size?: "24" | "20" | "16",
        button_variant?: 'fill' | 'outlined',
        title_color?: string | rgb,
        sub_title_color?: string | rgb,
        button_bg_and_border_color?: string,
        title_uppercase?: boolean,
        sub_title_uppercase?: boolean,
        button_uppercase?: boolean,
        text_and_button_position?: POS_TYPE
    }>
}

// 博客专辑
export type BlogListFormDataType = {
    title?: string;
    title_size?: string,
    title_color?: string | rgb,
    title_uppercase?: boolean;
    description?: string;
    description_size?: string;
    description_color?: string | rgb,
    description_uppercase?: boolean;
    layout_type?: 'layout_1JPG' | 'layout_2JPG',
    blog_list?: Array<{
        id?: string,
        title?: string,
        status?: string,
        featuredImage?: string,
        discount: string
    }>,
    blocks?: Array<{
        link_to_obj: {
            id?: string,
            type?: string,
        }
    }>,
    module_bg_color?: string | rgb,
    row_counts?: number,
    show_view_all?: boolean,
    blog_count_per_row?: number,
    blog_title_color?: string | rgb,
    blog_title_size?: string,
    blog_title_position?: POS_TYPE
    blog_description_size?: string,
    blog_description_color?: string | rgb,
    hover_effect?:string
}

// Header 配置模块数据类型定义
export type rgb = { r: number | string, g: number | string, b: number | string, a: number | string }
export type HeaderFormDataType = {
    blocks?: Array<any>,
    show_board?: boolean,
    show_board_only_home?: boolean,
    board_link?: object,
    site_title?: string,
    logo_position?: 'left' | 'center' | 'right',
    show_cart?: boolean,
    show_user_center?: boolean,
    show_search?: boolean,
    show_multi_language?: boolean,
    show_multi_currency?: boolean,
    navigation_float?: boolean,
    currencyByIp?: boolean, // 根据Ip确定货币
    lanByBrowser?: boolean, // 根据浏览器确定语言
    logo_area_background_color?: rgb,
    logo_area_text_color?: rgb,
    logo_area_icon_color?: rgb,
    menu_area_background_color?: rgb,
    menu_area_text_color?: rgb,
    board_title: string,
    board_background_color: rgb,
    board_text_color: rgb,
    logo_text_color: rgb,
    menu_text_color: rgb,
    select_bg_color: rgb,
    menu_title_color: rgb,
    icon_text_color: rgb,
    cart_number_text_color: rgb,
    menu_id: number,
    menu_list: [],
    ico_image?: string,
    menu_select_area?: string,
    menu_title_area?: string,
    menu_image_width?: number,
    menu_pc_navbar_size?: string,
    menu_mobile_navbar_size?: string,
    mobile_menuImage_show?: boolean,
    // menu_addImage_list?: Array<{
    //     children?: Array<{
    //         name?: string,
    //         image?: string,
    //         location?: string
    //         link_to_obj?: object,
    //         tid?: string | number
    //     }>,
    //     [key: string]: any,
    // }>,
    menu_addImage_list?: Array<{
        menu_id: number,
        menu_select_area: string,
        menu_title_area: string,
        menu_image_width: number,
        blocks: Array<any>
    }>
    [key:string]: any
}
//页尾
export type FooterFormDataType = {
    logo_position?: 'top' | 'left',
    layout_type?: 'bottom' | 'right',
    show_instagram?: boolean,
    show_facebook?: boolean,
    show_twitter?: boolean,
    show_pinterest?: boolean,
    show_youtube?: boolean,
    show_paypal?: boolean,
    show_ocean_pay?: boolean,
    show_world_pay?: boolean,
    show_master_card?: boolean,
    show_union_card?: boolean,
    show_copyright?: boolean,
    copyright_text: string,
    background_color?: rgb,
    text_color?: rgb,
    title_color?: rgb,
    blocks: [],
    show_payment_icon?: boolean,
    social_icon_type?: 'dark' | 'light',
}