// 对于section的操作,更新时只传section.

const data = {
  // section: {
    name: "",
    cname: {
      "en-US": "Two images",
      "zh-CN": "多图2"
    },
    display: true,
    blocks: [
      {
        image_src:"",
        link_to_obj: {
        },
        title: "",
        sub_title: "",
        title_size: "16px",
        sub_title_size: "16px",
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
        id: Math.round((Math.random() * 10000))
      },
    ],
    settings: {
      name:'',
      hover_effect:'hoverZoomOut',
      image_layout_type: 'equal' ,
      text_position: 'inner',
      show_image_spacing: true,
      show_mulityimage_spacing: true,
      logo_text_color: '',
      module_bg_color: '',
      image_height: "600",
      title_color: '',
      sub_title_color: '',
      button_text_color: '',
      text_direction:'center'
    },
    type: "two_images",
    version: 1,
};

export default data;
