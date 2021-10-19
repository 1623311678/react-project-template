
const data = {
    name: "",
    cname: {
      "en-US": "Rich Text",
      "zh-CN": "富文本"
    },
    display: true,
    blocks: [],
    settings: {
      module_bg_color:'',
      title_color: '',
      name: '',
      title_size: '16px',
      link_to_obj:{},
      title_uppercase: false
    },
    layoutConfig: [
      {
        Component: 'LabelColorPicker',
        formName: 'module_bg_color',
        label: '模块背景色'
      },
      {
        Component: 'Divider',
      },
      {
        Component: 'LabelColorPicker',
        formName: 'title_color',
        label: '标题',
        marginTop: true
      },
      {
        Component: 'Input',
        formName: 'name',
      },
      {
        Component: 'FontSize',
        formName: 'title_size',
        type: 'title',
        label: '标题字号',
        marginTop: true
      },
      {
        Component: 'Link',
        formName: 'link_to_obj',
        label: '链接',
        marginTop: true
      },
      {
        Component: 'SwitchTpl',
        formName: 'title_uppercase',
        label: '标题全大写',
        marginTop: true
      },
      {
        Component: 'LabelColorPicker',
        formName: 'border_color',
        label: '边框颜色',
        marginTop: true
      },
    ],
    type: "rich_text",
    version: 1,
};

export default data;
