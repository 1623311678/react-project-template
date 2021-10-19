// 对于section的操作,更新时只传section.
// import {ConsumerFeedFormDataType} from '../types/ConfigItemTypes'
const data = {
    name: "",
    cname: {
        "en-US": "consumer feed",
        "zh-CN": "用户感言"
    },
    display: true,
    blocks: [
        {
            consumer_name: 'username',
            consumer_feed: '',
            name_font_size: '16',
            feed_font_size: '16',
            title_color: '',
            img_size : '60%',
            sub_title_color: '14',
            image_src : '',
            id: Math.round((Math.random() * 10000)),
        },
    ],
    settings: {
        name: '',
        layout_type: 'layout_1JPG',
        auto_slide: true,
        loop_duration: 5,
        logo_text_color: '',
        module_bg_color: '',
        feed_font_color: '',
    },
    type: "consumer_feed",
    version: 1,
};

export default data;
