/**
 * B端 - 商铺编辑 - Header 模块代码
 */

import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import DeleteIcon from "@material-ui/icons/Delete";
import ColorPicker from "@src/common/components/ColorPicker";
import Events from "@src/common/Events";
import useDebounce from "@src/hooks/useDebounce";
import { fppMenu, fppMenuDetail } from "@src/api/onlineStore";
import ProjectLinkSelector from "@src/common/components/ProjectLinkSelector";
import { message } from "antd";
import { get } from "lodash";
import React, { Children, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Select as AntdSelect, Radio, Collapse } from "antd";
const { Panel } = Collapse;
const { Option } = AntdSelect;
import { HeaderFormDataType } from "./types/ConfigItemTypes";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import getStyle from "@src/utils/dndLockAxis";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";

import ImagePickerLoad from "@src/common/components/ImagePicker/ImagePickerLoad";
import Icon from "@src/common/components/Icon";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import useUpdateEffect from "@src/hooks/useUpdateEffect";

import FontSizeSelector from "./widgets/FontSizeSelector";

const useStyles = makeStyles(
  () =>
    createStyles({
      formControl: {
        margin: 0,
        width: "100%"
      },
      inputControl: {
        width: "100%"
      },
      accordionDetail: {
        padding: 0,
        flexDirection: "column"
      },
      accordionTitle: {
        background: "#F7F8F9"
      },
      addItemButton: {
        width: "100%",
        height: "55px",
        color: "rgba(44, 110, 203, 1)",
        lineHeight: "55px",
        fontWeight: 600,
        display: "flex",
        alignItems: "center",
        "&:hover": {
          background: "rgba(242, 247, 254, 1)"
        }
      },
      addItemIcon: {
        margin: "0  20px 0 10px"
      }
    }),
  { name: "Header" }
);
const ContentLocation = [
  { name: "居左", id: "flex-start", id2: "left" },
  { name: "居中", id: "center", id2: "center" },
  { name: "居右", id: "flex-end", id2: "right" }
];
const ImageWidth = [
  { name: "200px", id: 200 },
  { name: "250px", id: 250 },
  { name: "300px", id: 300 }
];
const BLOCKS_CHILDREN = {
  name: "",
  image: "",
  location: "",
  link_to_obj: {},
  tid: "",
  type: "menuImage"
};
interface Props {
  section: { [key: string]: any };
  sectionStamp: string | number;
}
const MENU_SELECT_AREA = "flex-start";
const MENU_TITLE_AREA = "left";
const MENU_IMAGE_WIDTH = 200;
const MENU_NAVBAR_SIZE = '14px';
const Header: React.FC<Props> = props => {
  const initData: HeaderFormDataType = {
    board_background_color: { r: 34, g: 51, b: 59, a: 1 },
    board_text_color: { r: 255, g: 255, b: 255, a: 1 },
    board_title: "",
    icon_text_color: undefined,
    logo_text_color: undefined,
    menu_list: [],
    menu_text_color: undefined,
    select_bg_color: undefined,
    menu_title_color: undefined,
    menu_select_area: MENU_SELECT_AREA,
    menu_title_area: MENU_TITLE_AREA,
    menu_image_width: MENU_IMAGE_WIDTH,
    menu_pc_navbar_size: MENU_NAVBAR_SIZE,
    menu_mobile_navbar_size: MENU_NAVBAR_SIZE,
    mobile_menuImage_show: false,
    menu_addImage_list: [],
    currencyByIp: false, // 根据Ip确定货币
    lanByBrowser: false, // 根据浏览器确定语言
  };
  const { section, sectionStamp, onChange } = props;

  section.blocks = section.blocks ? section.blocks : [];
  delete section.settings.blocks;
  let dataSection: HeaderFormDataType = Object.assign(
    {},
    initData,
    section.settings
  );
  dataSection.blocks = section.blocks;
  const [formData, setFormData] = useState<HeaderFormDataType>(dataSection);
  const [menuList, setMenuList] = useState([]);
  const classes = useStyles();

  /**
   * 获取可选菜单列表
   */
  React.useEffect(() => {
    const {
      menu_list = [],
      menu_id,
      menu_select_area,
      menu_title_area,
      menu_image_width,
    } = formData;
    let _menu_list = menuImageData(menu_list);
    const nextFormData = {
      menu_addImage_list:
        JSON.parse(JSON.stringify(formData.menu_addImage_list)) || [],
      menu_id: formData.menu_id
    };
    const menuItem = {
      menu_id,
      menu_select_area,
      menu_title_area,
      menu_image_width
    };
    pushMenuImageItem(menuItem, nextFormData, _menu_list);
    // setFormData({ ...formData, ...nextFormData, blocks: _menu_list });
    fppMenu().then(({ data }) => {
      if (get(data, "fetchRoot.length")) {
        // 判断当前menu_id是否已被删除
        const result = data.fetchRoot.findIndex(
          item => item.tid === formData.menu_id
        );
        // const _menu_id = result < 0 ? null : formData.menu_id;
        if (result < 0) {
          // 当前menu_id菜单id，已被删除，
          // 删除在 menu_addImage_list 中的数据
          nextFormData.menu_addImage_list = nextFormData.menu_addImage_list.filter(
            item => item.menu_id !== formData.menu_id
          );
          // 重置menu_id为null
          nextFormData.menu_id = null;
          _menu_list = [];
        }
        setFormData({
          ...formData,
          ...nextFormData,
          blocks: _menu_list
        });
        setMenuList(data.fetchRoot);
      }
    });
  }, []);
  const isMenuRemove = () => {};

  /**
   * <Input> / <Select> 等表单元素发生改变时的处理函数
   *
   * 如果当前是更改了菜单，则根据菜单 id 获取菜单详情，将 id 与详情数据一同放入 formData 中
   *
   * @param event 事件对象
   * @param targetName <Select> 的 onChange 事件需要此参数
   */
  const handleFormDataChange = async (event: any, targetName?: string) => {
    const { name, value } = event.target;
    interface NextFormDataType{
      [key:string]: any
    }
    const nextFormData:NextFormDataType = {
      [targetName || name]: value,
      menu_addImage_list: JSON.parse(
        JSON.stringify(formData.menu_addImage_list)
      )
    };
    let blocks = formData.blocks;
    if (targetName === "menu_id") {
      try {
        const { data } = await fppMenuDetail({ tid: Number(value) });
        const { items } = data.fetchDetail;

        /**
         * 由于一级导航是否有三级，在前端的展示形式是不同的，因此在此处添加是否有三级导航的
         * 标记，如果有 hasThreeLevel 标记，说明该一级导航拥有三级
         */
        items.forEach(item => {
          const stringify = JSON.stringify(item);
          if (/\"son\"\:\[\{.+\"son\"\:\[\{/.test(stringify)) {
            item.hasThreeLevel = true;
          }
        });

        nextFormData.menu_list = items;
        // 组合外层blocks数据，给后端更新menu_list
        blocks = menuImageData(items);
        // 判断切换的菜单，是否存在 menu_addImage_list 中，如果存在，直接赋值给blocks11
        const curItem = formData.menu_addImage_list.find(
          item => item.menu_id === Number(value)
        );
        if (curItem) {
          blocks = curItem.blocks;
          nextFormData["menu_select_area"] = curItem.menu_select_area;
          nextFormData["menu_title_area"] = curItem.menu_title_area;
          nextFormData["menu_image_width"] = curItem.menu_image_width;
        } else {
          nextFormData["menu_select_area"] = MENU_SELECT_AREA;
          nextFormData["menu_title_area"] = MENU_TITLE_AREA;
          nextFormData["menu_image_width"] = MENU_IMAGE_WIDTH;
          // 像 menu_addImage_list 中 push 新的导航数据
          const menuItem = {
            menu_id: Number(value),
            menu_select_area: MENU_SELECT_AREA,
            menu_title_area: MENU_TITLE_AREA,
            menu_image_width: MENU_IMAGE_WIDTH
          };
          pushMenuImageItem(menuItem, nextFormData, blocks);
        }
      } catch (error) {
        console.log(error, "errorerrorerrorerror");
        message.error(`获取菜单详情失败，菜单 id: ${value}`);
      }
    }
    setFormData({ ...formData, ...nextFormData, blocks });
  };
  // 操作导航图片数据，同步更新 menu_addImage_list 的数据
  const updateMenuItemImage = blocks => {
    const _menu_addImage_list = JSON.parse(
      JSON.stringify(formData.menu_addImage_list)
    );
    const curItem = _menu_addImage_list.find(
      item => item.menu_id === formData.menu_id
    );
    if (curItem) {
      curItem.blocks = blocks;
    }
    return _menu_addImage_list;
  };
  /**
   *
   * @param menuItem
              menu_id: 菜单id
              menu_select_area: 菜单位置
              menu_image_width: 菜单宽度
   * @param nextFormData 新的 menu_addImage_list
   * @param blocks 更新后的图片列表blocks
   */
  const pushMenuImageItem = (menuItem, nextFormData, blocks) => {
    const _menu_addImage_list = formData.menu_addImage_list;
    const isCurMenuItem = _menu_addImage_list.findIndex(
      item => item.menu_id === menuItem.menu_id
    );
    if (isCurMenuItem < 0) {
      const addMenuItem = {
        menu_id: menuItem.menu_id,
        menu_select_area: menuItem.menu_select_area,
        menu_title_area: menuItem.menu_title_area,
        menu_image_width: menuItem.menu_image_width,
        blocks: blocks
      };
      nextFormData.menu_addImage_list.push(addMenuItem);
    }
  };
  /**
   * @param items menuList 导航菜单数据
   * @@returns itemsArr 组合后的导航菜单数据
   */
  const menuImageData = (items: Array<any>) => {
    let itemsArr = [];
    if (!items && !items.length) return itemsArr;
    const blocks = formData.blocks;
    itemsArr = items.map(i => {
      if (formData.blocks.length) {
        blocks.forEach(j => {
          if (j.children && j.children.length) {
            if (i.tid === j.tid) {
              i["children"] = j.children;
            }
          }
        });
      }
      return i;
    });
    console.log(itemsArr, "itemsArritemsArritemsArritemsArritemsArr");
    return itemsArr;
  };
  /**
   * <Switch> 表单元素发生改变时的处理函数
   *
   * @param event 事件对象
   * @param check 当前选中状态
   */
  const handleFormCheckChange = (e: any, check: boolean) => {
    const { name } = e.target;
    setFormData({ ...formData, [name]: check });
  };

  /**
   * ColorPicker 颜色发生改变时的处理函数
   *
   * @param name 该元素在 formData 中的 key
   * @param rgb ColorPicker 返回的颜色描述对象
   */
  const handleColorChange = (name: string, rgb: object) => {
    setFormData({ ...formData, [name]: rgb });
  };

  /**
   * 上传图片成功时的处理函数
   *
   * @param name
   * @param url
   */
  const handleImagePickerEnsure = (name: string, url: string) => {
    console.log(url, "uuuuuuuuuuuuuuuuuuuu");
    setFormData({ ...formData, [name]: url });
  };

  /**
   * 更换公告栏链接时的处理函数
   *
   * @param data <ProjectLinkSelector> 返回的链接数据
   */
  const handleBoardLinkChange = (data: object) => {
    setFormData({
      ...formData,
      link_to_obj: { ...data, key_map: "id,handle,title" }
    });
  };

  // <Switch> 元素所需的通用属性
  const commonSwitchProps = {
    color: "primary",
    onChange: handleFormCheckChange,
    inputProps: { "aria-label": "primary checkbox" }
  };

  // 集中存放各个 <Switch> 元素所需的属性，供 renderSwitch 使用
  const switchData = {
    mobileShow: [
      {
        title: "移动端导航图片展示",
        props: {
          ...commonSwitchProps,
          checked: formData.mobile_menuImage_show,
          name: "mobile_menuImage_show"
        }
      }
    ],
    board: [
      {
        title: "开启公告栏",
        props: {
          ...commonSwitchProps,
          checked: formData.show_board,
          name: "show_board"
        }
      },
      {
        title: "仅首页显示公告栏",
        props: {
          ...commonSwitchProps,
          checked: formData.show_board_only_home,
          name: "show_board_only_home"
        }
      }
    ],
    icon: [
      {
        title: "购物车",
        props: {
          ...commonSwitchProps,
          checked: formData.show_cart,
          name: "show_cart"
        }
      },
      {
        title: "个人中心",
        props: {
          ...commonSwitchProps,
          checked: formData.show_user_center,
          name: "show_user_center"
        }
      },
      {
        title: "搜索",
        props: {
          ...commonSwitchProps,
          checked: formData.show_search,
          name: "show_search"
        }
      },
      {
        title: "多语言",
        props: {
          ...commonSwitchProps,
          checked: formData.show_multi_language,
          name: "show_multi_language"
        }
      },
      {
        title: "根据浏览器切换语言",
        props: {
          ...commonSwitchProps,
          checked: formData.lanByBrowser,
          name: "lanByBrowser"
        }
      },
      {
        title: "多货币",
        props: {
          ...commonSwitchProps,
          checked: formData.show_multi_currency,
          name: "show_multi_currency"
        }
      },
      {
        title: "根据IP切换货币",
        props: {
          ...commonSwitchProps,
          checked: formData.currencyByIp,
          name: "currencyByIp"
        }
      },
      {
        title: "导航栏悬浮",
        props: {
          ...commonSwitchProps,
          checked: formData.navigation_float,
          name: "navigation_float"
        }
      }
    ]
  };

  /**
   * 用于输出 <Switch> 元素，减少样板代码
   *
   * @param title 标题
   * @param props <Switch> 元素所需的所有属性
   * @returns React Element
   */
  const renderSwitch = (title, props) => (
    <div className="module__item" key={title}>
      <div className="t14 mb-8 title-only-one-row">
        {title}
        <Switch {...props} />
      </div>
    </div>
  );

  /**
   * 删除图片时的处理函数
   * @param name 该图片在 formData 中的 key
   */
  const handleRemoveImage = (name: string) => {
    setFormData({ ...formData, [name]: undefined });
  };

  /**
   * 深拷贝初始的 section 数据，并将当前模块的所有数据同步到新创建的 section 中，
   * 然后触发 theme:update 操作将 section 数据同步到 preview 中
   */
  const triggerSave = useDebounce(() => {
    section.settings = { ...section.settings, ...formData };
    section.blocks = formData.blocks;
    onChange("header", { ...section });
  }, 200);

  useUpdateEffect(() => triggerSave(), [formData]);

  const handleDeleteBlock = (parentIndex: number, childIndex: number) => {
    const blocks = formData.blocks;
    blocks[parentIndex].children.splice(childIndex, 1);
    const menu_addImage_list = updateMenuItemImage(blocks);
    setFormData({ ...formData, menu_addImage_list, blocks });
  };
  const handleDragEnd = (result, parentIndex) => {
    if (!result.destination) {
      return;
    }
    const blocks = formData.blocks;
    const items = reorder(
      blocks[parentIndex].children,
      result.source.index,
      result.destination.index
    );
    blocks[parentIndex].children = items;
    const menu_addImage_list = updateMenuItemImage(blocks);
    setFormData({ ...formData, menu_addImage_list, blocks });
  };
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };
  const handleAddBlock = index => {
    const blocks = formData.blocks;
    const _BLOCKS_CHILDREN = Object.assign(
      JSON.parse(JSON.stringify(BLOCKS_CHILDREN)),
      {
        tid: Date.now()
      }
    );
    if (!blocks[index].children) {
      blocks[index].children = [];
    }
    blocks[index].children.push(_BLOCKS_CHILDREN);
    const menu_addImage_list = updateMenuItemImage(blocks);
    setFormData({ ...formData, menu_addImage_list, blocks });
  };
  const handleFormMenuDataChange = (
    event: any,
    targetName: string,
    parentIndex: number,
    childIndex: number
  ) => {
    const { name, value } = event.target;
    const blocks = formData.blocks;
    blocks[parentIndex].children[childIndex][targetName || name] = value;
    const menu_addImage_list = updateMenuItemImage(blocks);
    setFormData({ ...formData, menu_addImage_list, blocks });
  };
  return (
    <div className="config-item-wrapper">
      <Helmet>
        {formData.ico_image && (
          <link rel="icon" type="image/png" href={formData.ico_image} />
        )}
      </Helmet>
      <div className="module-detail pt-20 border-bottom-1px">
        <div className="title-only-one-row t16 pl-16 pr-16 pb-16 header-menu-title-wrapper">
          <div>菜单</div>
          <a href="/admin/menus/" target="_blank">
            <Icon name="iconbianji" /> 编辑菜单
          </a>
        </div>
        <div className="module__item">
          <FormControl
            size="small"
            variant="outlined"
            className={classes.formControl}
          >
            <Select
              displayEmpty
              name="menu_id"
              value={formData.menu_id || ""}
              onChange={event => handleFormDataChange(event, "menu_id")}
            >
              <MenuItem key="unselect" value="" disabled>
                请选择菜单
              </MenuItem>
              {menuList.map(item => (
                <MenuItem key={item.tid} value={item.tid}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        {!!formData.blocks.length && (
          <>
            <div className="module__item">
              <div className="t14 mb-8 mt-8">导航下拉栏的内容位置</div>
              <FormControl
                size="small"
                variant="outlined"
                className={classes.formControl}
              >
                <Select
                  displayEmpty
                  name="menu_select_area"
                  value={formData.menu_select_area || ""}
                  onChange={event =>
                    handleFormDataChange(event, "menu_select_area")
                  }
                >
                  {ContentLocation.map(item => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="module__item">
              <div className="t14 mb-8 mt-8">标题位置</div>
              <FormControl
                size="small"
                variant="outlined"
                className={classes.formControl}
              >
                <Select
                  displayEmpty
                  name="menu_title_area"
                  value={formData.menu_title_area || ""}
                  onChange={event =>
                    handleFormDataChange(event, "menu_title_area")
                  }
                >
                  {ContentLocation.map(item => (
                    <MenuItem key={item.id2} value={item.id2}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <FontSizeSelector
              title="PC端标题字号"
              type="subTitle"
              value={formData.menu_pc_navbar_size}
              handleSelector={e => handleFormDataChange(e, "menu_pc_navbar_size")}
            />
            <FontSizeSelector
              title="移动端标题字号"
              type="subTitle"
              value={formData.menu_mobile_navbar_size}
              handleSelector={e => handleFormDataChange(e, "menu_mobile_navbar_size")}
            />
            <div className="module__item">
              <div className="t14 mb-8 mt-8">图片宽度</div>
              <FormControl
                size="small"
                variant="outlined"
                className={classes.formControl}
              >
                <Select
                  displayEmpty
                  name="menu_image_width"
                  value={formData.menu_image_width || ""}
                  onChange={event =>
                    //feature/facebook-share
                    handleFormDataChange(event, "menu_image_width")
                  }
                >
                  <MenuItem key="unselect" value="" disabled>
                    请选择菜单
                  </MenuItem>
                  {ImageWidth.map(item => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            {switchData.mobileShow.map(({ title, props }) =>
              renderSwitch(title, props)
            )}
            <div className="module__item menuAddImage">
              <div
                className="t14 mb-8 mt-8"
                onClick={() => {
                  console.log(formData, "formDataformDataformData");
                  console.log(dataSection, "dataSectiondataSectiondataSection");
                  console.log(section, "sectionsectionsection");
                }}
              >
                导航添加图片
              </div>
              <div>
                {get(formData, "blocks").map((item, index) => (
                  <Accordion key={index}>
                    <AccordionSummary
                      className={classes.accordionTitle}
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                    >
                      <div className="common__accordion-title">
                        <span>{item.name}</span>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails className={classes.accordionDetail}>
                      <div className="AccordionDetailsContext">
                        <DragDropContext
                          onDragEnd={event => handleDragEnd(event, index)}
                        >
                          <Droppable droppableId="droppable">
                            {(provided, snapshot) => (
                              <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                              >
                                {// !!item.children.length &&
                                (item.children || []).map((blockData, idx) => (
                                  <Draggable
                                    key={idx}
                                    draggableId={`${idx}`}
                                    index={idx}
                                  >
                                    {(provided, snapshot) => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={getStyle(
                                          provided.draggableProps.style,
                                          snapshot
                                        )}
                                      >
                                        <Accordion key={idx}>
                                          <AccordionSummary
                                            className={classes.accordionTitle}
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                          >
                                            <div className="common__accordion-title">
                                              <Icon name="iconkeyidong" />
                                              <span className="title">
                                                {blockData?.name ||
                                                  "内容 " + (idx + 1)}
                                              </span>
                                            </div>
                                          </AccordionSummary>
                                          <AccordionDetails
                                            className={classes.accordionDetail}
                                          >
                                            <div className="addImageMenuChild">
                                              <div className="mt-8 mb-8">
                                                标题
                                              </div>
                                              <TextField
                                                className="textfield"
                                                fullWidth
                                                name="name"
                                                value={blockData?.name}
                                                onChange={e =>
                                                  handleFormMenuDataChange(
                                                    e,
                                                    "name",
                                                    index,
                                                    idx
                                                  )
                                                }
                                                size="small"
                                                placeholder="标题"
                                                variant="outlined"
                                              />
                                            </div>

                                            <div className="addImageMenuChild">
                                              <div className="mb-8">图片</div>
                                              <ImagePickerLoad
                                                key={blockData.tid}
                                                classNames="image-picker-wrapper"
                                                initialImgSrc={blockData.image}
                                                onEnsure={url => {
                                                  const { imageUrl } = url;
                                                  handleFormMenuDataChange(
                                                    {
                                                      target: {
                                                        name: "image",
                                                        value: imageUrl
                                                      }
                                                    },
                                                    "image",
                                                    index,
                                                    idx
                                                  );
                                                }}
                                                modalType="image"
                                              />
                                            </div>
                                            {/* <div className="addImageMenuChild">
                                              <div className="mb-8">位置</div>
                                              <FormControl
                                                size="small"
                                                variant="outlined"
                                                className={classes.formControl}
                                              >
                                                <Select
                                                  displayEmpty
                                                  name="location"
                                                  value={
                                                    blockData?.location || ""
                                                  }
                                                  onChange={e =>
                                                    handleFormMenuDataChange(
                                                      e,
                                                      "location",
                                                      index,
                                                      idx
                                                    )
                                                  }
                                                >
                                                  <MenuItem
                                                    key="unselect"
                                                    value=""
                                                    disabled
                                                  >
                                                    请选择内容位置
                                                  </MenuItem>
                                                  {ContentLocation.map(item => (
                                                    <MenuItem
                                                      key={item.id2}
                                                      value={item.id2}
                                                    >
                                                      {item.name}
                                                    </MenuItem>
                                                  ))}
                                                </Select>
                                              </FormControl>
                                            </div> */}

                                            <div className="addImageMenuChild">
                                              <div className="mb-8">
                                                关联链接
                                              </div>
                                              <ProjectLinkSelector
                                                initialValue={
                                                  blockData.link_to_obj
                                                }
                                                onLinkSelected={(obj: any) => {
                                                  // const {
                                                  //   id,
                                                  //   type,
                                                  //   handle
                                                  // } = obj;
                                                  // const value = {
                                                  //   id,
                                                  //   type,
                                                  //   handle,
                                                  //   key_map: "id,handle,title"
                                                  // };
                                                  handleFormMenuDataChange(
                                                    {
                                                      target: {
                                                        name: "link_to_obj",
                                                        value: obj
                                                      }
                                                    },
                                                    "link_to_obj",
                                                    index,
                                                    idx
                                                  );
                                                }}
                                                placeholder="选择产品或者系列链接"
                                              />
                                            </div>

                                            <div
                                              className="delete-row"
                                              onClick={() =>
                                                handleDeleteBlock(index, idx)
                                              }
                                            >
                                              <DeleteIcon /> 删除内容
                                            </div>
                                          </AccordionDetails>
                                        </Accordion>
                                      </div>
                                    )}
                                  </Draggable>
                                ))}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                        </DragDropContext>
                        {/* <div
                            className={"addItemButton"}
                            onClick={handleClickOpen}
                          >
                            <AddCircleOutlineIcon
                              className={classes.addItemIcon}
                            />
                            添加图片
                          </div> */}

                        <div
                          className="append-block-btn addItemButton"
                          onClick={() => handleAddBlock(index)}
                        >
                          <AddIcon className="pr-6" />
                          添加内容
                        </div>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      <div className="module-detail pt-20 border-bottom-1px">
        <div className="t16 pl-16 pb-16">公告栏</div>
        {switchData.board.map(({ title, props }) => renderSwitch(title, props))}
        <div className="module__item">
          <div className="t14 mb-8">公告栏文案</div>
          <TextField
            className={classes.inputControl}
            size="small"
            name="board_title"
            value={formData.board_title}
            onChange={handleFormDataChange}
            variant="outlined"
          />
        </div>

        <div className="module__item">
          <div className="t14 mb-8">公告栏链接</div>
          <ProjectLinkSelector
            initialValue={formData.link_to_obj}
            onLinkSelected={handleBoardLinkChange}
            placeholder="选择产品或者系列链接"
          />
        </div>
      </div>

      <div className="module-detail pt-20 border-bottom-1px">
        <div className="t16 pl-16 pb-16">顶部Logo和图标</div>
        <div className="module__item">
          <div className="t14 mb-8">站点标题</div>
          <TextField
            className={classes.inputControl}
            size="small"
            name="site_title"
            value={formData.site_title}
            onChange={handleFormDataChange}
            variant="outlined"
          />
        </div>
        <div className="module__item">
          <div className="t14 mb-8">Logo位置</div>
          <FormControl
            size="small"
            variant="outlined"
            className={classes.formControl}
          >
            <Select
              displayEmpty
              name="logo_position"
              value={formData.logo_position}
              onChange={event => handleFormDataChange(event, "logo_position")}
            >
              <MenuItem value="single_center">居中</MenuItem>
              <MenuItem value="multi_center">居中两行</MenuItem>
              <MenuItem value="single_left">居左</MenuItem>
              <MenuItem value="multi_left">居左两行</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className="module__item">
          <div className="t14 mb-8">Logo上传</div>
          <div className="site-logo-container">
            <ImagePickerLoad
              key={get(formData, "logo_image")}
              classNames="image-picker-wrapper"
              initialImgSrc={get(formData, "logo_image")}
              onEnsure={url => {
                const { imageUrl } = url;
                handleImagePickerEnsure("logo_image", imageUrl);
              }}
              modalType="image"
            />
            {get(formData, "logo_image") && (
              <DeleteIcon onClick={() => handleRemoveImage("logo_image")} />
            )}
          </div>
          <div className="t12 mt-8 mb-16">
            适用于白底上显示建议尺寸600*600，减少左右留白
          </div>
          {/*<div className="site-logo-container">*/}
          {/*  <ImagePickerLoad*/}
          {/*    key={get(formData, "logo_image_full_screen")}*/}
          {/*    classNames="image-picker-wrapper"*/}
          {/*    initialImgSrc={get(formData, "logo_image_full_screen")}*/}
          {/*    onEnsure={url => {*/}
          {/*      const { imageUrl } = url;*/}
          {/*      handleImagePickerEnsure("logo_image_full_screen", imageUrl);*/}
          {/*    }}*/}
          {/*    modalType="image"*/}
          {/*  />*/}
          {/*  {get(formData, "logo_image_full_screen") && (*/}
          {/*    <DeleteIcon*/}
          {/*      onClick={() => handleRemoveImage("logo_image_full_screen")}*/}
          {/*    />*/}
          {/*  )}*/}
          {/*</div>*/}
          {/*<div className="t12 mt-8">适用于全屏（Banner）上显示</div>*/}
        </div>

        {switchData.icon.map(({ title, props }) => renderSwitch(title, props))}
      </div>

      <div className="module-detail pt-20 border-bottom-1px">
        <div className="module__item">
          <div className="t14 mb-8">浏览器角标</div>
          <div className="site-logo-container">
            <ImagePickerLoad
              key={get(formData, "ico_image")}
              classNames="image-picker-wrapper"
              initialImgSrc={get(formData, "ico_image")}
              onEnsure={url => {
                const { imageUrl } = url;
                handleImagePickerEnsure("ico_image", imageUrl);
              }}
              modalType="image"
            />
            {get(formData, "ico_image") && (
              <DeleteIcon onClick={() => handleRemoveImage("ico_image")} />
            )}
          </div>
        </div>
      </div>

      <div className="module-detail pt-20 border-bottom-1px">
        <div className="t16 pl-16 pb-16">颜色</div>
        {get(formData, "show_board") && (
          <>
            <ColorPicker
              name="board_background_color"
              defaultColor={formData.board_background_color}
              title="公告栏背景"
              onChange={handleColorChange}
            />
            <ColorPicker
              name="board_text_color"
              defaultColor={formData.board_text_color}
              title="公告栏文字"
              onChange={handleColorChange}
            />
          </>
          // select_bg_color: undefined,
          // menu_title_color: undefined,
        )}

        <ColorPicker
          name="menu_area_background_color"
          defaultColor={formData.menu_area_background_color}
          title="菜单栏背景"
          onChange={handleColorChange}
        />
        <ColorPicker
          name="select_bg_color"
          defaultColor={formData.select_bg_color}
          title="下拉栏背景颜色"
          onChange={handleColorChange}
        />
        {get(formData, "logo_position").indexOf("multi") > -1 && (
          <ColorPicker
            name="logo_area_background_color"
            defaultColor={formData.logo_area_background_color}
            title="Logo 栏背景"
            onChange={handleColorChange}
          />
        )}
        <ColorPicker
          name="logo_text_color"
          defaultColor={formData.logo_text_color}
          title="站点标题颜色"
          onChange={handleColorChange}
        />
        <ColorPicker
          name="menu_text_color"
          defaultColor={formData.menu_text_color}
          title="菜单文字"
          onChange={handleColorChange}
        />
        <ColorPicker
          name="menu_title_color"
          defaultColor={formData.menu_title_color}
          title="标题颜色"
          onChange={handleColorChange}
        />
        <ColorPicker
          name="icon_text_color"
          defaultColor={formData.icon_text_color}
          title="图标 & 文字"
          onChange={handleColorChange}
        />
        <ColorPicker
          name="cart_number_text_color"
          defaultColor={formData.cart_number_text_color}
          title="购物车数量颜色"
          onChange={handleColorChange}
        />
      </div>
    </div>
  );
};

export default Header;
