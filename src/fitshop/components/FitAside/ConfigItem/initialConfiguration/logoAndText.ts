// 对于section的操作,更新时只传section.

const data = {
  // section: {
    name: "",
    cname: {
      "en-US": "Two images",
      "zh-CN": "图标文字"
    },
    display: true,

    blocks: [
      {
        logo_url: "",
        title: "",
        text: "",
        title_size:  "16px",
        text_size: "14px",
        title_uppercase: false,
        text_uppercase: false,
        id: Math.round((Math.random() * 10000)),
      },
    ],
    settings: {
      name:'',
      logo_position: 'logo_top',
      module_bg_color: '',
      logo_text_color: '',
      title_color: '',
      sub_title_color: '',
      modle_height:'big',
      title_uppercase:null,
      text_uppercase:null,
      title_size:  "16px",
      text_size: "14px",
    },
    type: "logo_and_text",
    version: 1,
  // },
  // is_global_config: false,
  // url: "/?preview_theme_id=174b1d5d-088d-4484-9b85-b54c61d028ad&locale=zh_CN",
  // global_config: {
  //   libs: ""
  // }
};

export default data;
