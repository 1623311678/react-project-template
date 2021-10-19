const data =
{
    "name": "",
    "cname": {
        "en-US": "Collection list",
        "zh-CN": "系列列表"
    },
    "display": true,
    "blocks": [
        { block_id: Math.round((Math.random() * 10000)) },
        { block_id: Math.round((Math.random() * 10000)) },
        { block_id: Math.round((Math.random() * 10000)) },
        { block_id: Math.round((Math.random() * 10000)) },
    ],
    "settings": {
        layout_type: 'layout_1JPG',
        module_bg_color: '',
        series_test_color: '',
        logo_text_color: '',
        cart_background_color: "#FFD460", // 只有 layout_2JPG 时 可选
        auto_slide: false,
        slide_duration:2,
        hover_effect:'hoverZoomOut',
        show_number: true,
    },
    "type": "collection_list"
}


export default data;
