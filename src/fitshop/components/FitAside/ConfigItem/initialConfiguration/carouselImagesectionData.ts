// 对于section的操作,更新时只传section.

const data = {
  // section: {
  name: "",
  cname: {
    "en-US": "Carousel Images",
    "zh-CN": "轮播图"
  },
  display: true,
  blocks: [
    {
      image_src: "",
      media_obj: {
        uploadType: "IMAGE",
        videoType: 'URL',
        image_src: "",
        image_w: "",
        image_h: "",
        video_src: "",
      },
      image_src_mobile: "",
      link_to_obj: {
      },
      sub_title: "",
      title_size: "20",
      sub_title_size: "16",
      button_label: "",
      cut_position: "center", // 截取位置
      button_variant: 'outlined',
      title_uppercase: true,
      sub_title_uppercase: false,
      button_uppercase: true,
      alignment: "left",
      title_color: '',
      sub_title_color: '',
      button_text_color: '',
      text_and_button_position: 'left',
      id: Math.round((Math.random() * 10000)),
    },
    // 默认1张
    // { id: Math.round((Math.random() * 10000)), },
    // { id: Math.round((Math.random() * 10000)), },
    // { id: Math.round((Math.random() * 10000)), },
    // { id: Math.round((Math.random() * 10000)), },
  ],
  settings: {
    auto_slide: true,
    full_screen: true,
    slide_duration: 4,
    slide_effect: 'hoverZoomOut',
    img_top_margin: '',
    img_bottom_margin: '',
    full_header:false,
  },
  type: "carousel_images",
};

export default data;
