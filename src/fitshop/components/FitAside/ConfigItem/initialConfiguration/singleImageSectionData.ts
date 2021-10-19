// 对于section的操作,更新时只传section.

const data = {
  // section: {
  name: "",
  type: "overlay_image",
  cname: {
    "en-US": "Single image",
    "zh-CN": "单图片"
  },
  display: true,
  settings: {
    title_color: '',
    sub_title_color: '',
    button_text_color: '',
    video_obj: {},
    image_src: "",
    hover_effect:'hoverZoomOut',
    media_obj: {
      uploadType: "IMAGE",
      videoType: 'URL',
      image_src: "",
      image_w: "",
      image_h: "",
      video_src: "",
    },
    image_src_mobile: {
      uploadType: "IMAGE",
      videoType: 'URL',
      image_src: "",
      image_w: "",
      image_h: "",
      video_src: "",
    },
    link_to_obj: {},
    image_height: "400",
    title: "",
    sub_title: "",
    title_size: "40",
    sub_title_size: "24",
    button_label: "",
    cut_position: "center", // 截取位置
    button_variant: 'outlined',
    title_uppercase: true,
    sub_title_uppercase: false,
    button_uppercase: true,
    alignment: "left",
    button_bg_and_border_color: '',
    logo_text_color: '',
    full_screen: true,
  },
};

export default data;
