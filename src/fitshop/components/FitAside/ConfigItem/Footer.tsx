// 页尾
import layout_1JPG from "@assets/images/config-items/icon-recommended-layout-1.png";
import layout_2JPG from "@assets/images/config-items/icon-recommended-layout-2.png";
import Accordion from "@material-ui/core/Accordion";
import AccordionActions from "@material-ui/core/AccordionActions";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Select from "@material-ui/core/Select";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Icon from "@src/common/components/Icon";
import ImagePickerLoad from "@src/common/components/ImagePicker/ImagePickerLoad";
import { fppMenu, fppMenuDetail } from "@src/api/onlineStore";
import ColorPicker from "@src/common/components/ColorPicker";
import { FooterFormDataType } from "@src/fitshop/components/FitAside/ConfigItem/types/ConfigItemTypes";
import useDebounce from "@src/hooks/useDebounce";
import getStyle from "@src/utils/dndLockAxis";
import { message } from "antd";
import classnames from "classnames";
import { find, findIndex, get } from "lodash";
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import useUpdateEffect from "@src/hooks/useUpdateEffect";

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
        padding: "8px 16px",
        flexDirection: "column"
      },
      accordionTitle: {
        background: "#F7F8F9"
      },
      accordionAction: {
        padding: 0
      },
      accordionDelete: {
        width: "100%"
      }
    }),
  { name: "Footer" }
);

interface Props {
  section: { [key: string]: any };
  sectionStamp: string | number;
}

const Footer: React.FC<Props> = props => {
  const { section, sectionStamp, onChange } = props;
  const initData: FooterFormDataType = {
    layout_type: "right",
    logo_position: "top",
    social_icon_type: "dark"
  };
  const [menuList, setMenuList] = useState([]);
  const [hasSubscribeModule, setHasSubscribeModule] = useState<boolean>(false);
  const [allowAddtionModule, setAllowAddtionModule] = useState<boolean>(true);
  const [menuListAnchorEl, setMenuListAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [showAddMenu, setShowAddMenu] = useState<boolean>(false);
  const [formData, setFormData] = useState<FooterFormDataType>({
    ...initData,
    ...section.settings
  });
  const classes = useStyles();

  /**
   * 限制：
   * - 订阅模块只能各添加一次，之后禁止添加
   */
  useEffect(() => {
    const subscribeModule = get(formData, "blocks", []).filter(
      item => item.type === "subscribe"
    );
    setHasSubscribeModule(subscribeModule.length > 0 ? true : false);

    const moduleCount = get(formData, "blocks", []).length;
    if (
      (formData.logo_position === "top" &&
        formData.layout_type === "right" &&
        moduleCount >= 4) ||
      (formData.logo_position === "left" &&
        formData.layout_type === "right" &&
        moduleCount >= 3) ||
      (formData.layout_type === "bottom" && moduleCount >= 3)
    ) {
      setAllowAddtionModule(false);
    } else {
      setAllowAddtionModule(true);
    }
  }, [formData]);

  /**
   * 获取可选菜单列表
   */
  useEffect(() => {
    fppMenu().then(({ data }) => {
      if (get(data, "fetchRoot.length")) {
        setMenuList(data.fetchRoot);
      }
    });
  }, []);

  const layoutPlaceholder = [
    { imgUrl: layout_2JPG, name: "right" },
    { imgUrl: layout_1JPG, name: "bottom" }
  ];

  const defaultModuleData = {
    menu: { type: "menu", title: "Menu", menu_list: [] },
    text: { type: "text", title: "Title", content: "Content" },
    subscribe: { type: "subscribe", title: "Subscribe" },
    social: { type: "social", title: "Follow us" }
  };

  /**
   * Blocks 中的表单元素发生更改时，将改变的值设置到对应的 block 中
   *
   * @param name 该值在 block 中的 key
   * @param value 新的值
   * @param blockId 唯一的 block 标识，用于查找目标 block
   */
  const handleSetBlockFormDataChange = async (
    name: string,
    value: string | number | boolean,
    blockId?: number
  ) => {
    const blocks = get(formData, "blocks", []);
    const target = blockId && find(blocks, item => item.id === blockId);

    if (target) {
      target[name] = value;

      if (name === "menu_id") {
        try {
          const { data } = await fppMenuDetail({ tid: Number(value) });
          const { items } = data.fetchDetail;
          target.menu_list = items;
        } catch (error) {
          message.error(`获取菜单详情失败，菜单 id: ${value}`);
        }
      }

      setFormData({ ...formData, blocks: [...blocks] });
    }
  };

  /**
   * <Input> / <Select> 等表单元素发生改变时的处理函数
   *
   * 如果传入了 blockId，说明本次更改的是某个 block 中的数据，交由
   * handleSetBlockFormDataChange 处理
   *
   * @param event 事件对象
   * @param targetName <Select> 的 onChange 事件需要此参数
   * @param blockId 唯一的 block 标识
   */
  const handleFormDataChange = (
    event: any,
    targetName?: string,
    blockId?: number
  ) => {
    const { name, value } = event.target;
    blockId
      ? handleSetBlockFormDataChange(name, value, blockId)
      : setFormData({ ...formData, [targetName || name]: value });
  };

  /**
   * <Switch> 表单元素发生改变时的处理函数
   *
   * 如果传入了 blockId，说明本次更改的是某个 block 中的数据，交由
   * handleSetBlockFormDataChange 处理
   *
   * @param event 事件对象
   * @param check 当前选中状态
   * @param blockId 唯一的 block 标识
   */
  const handleFormCheckChange = (
    event: any,
    check: boolean,
    blockId?: number
  ) => {
    const { name } = event.target;
    blockId
      ? handleSetBlockFormDataChange(name, check, blockId)
      : setFormData({ ...formData, [name]: check });
  };

  const handlePaymentChange = (event: any, check: boolean, index: number) => {
    const target = formData.payment[index];
    if (target) {
      target.show = check;
      setFormData({ ...formData });
    }
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
    setFormData({ ...formData, [name]: url });
  };

  const handleShowAddMenu = event => {
    setShowAddMenu(true);
    setMenuListAnchorEl(event.currentTarget);
  };

  const handleHideAddMenu = event => {
    setShowAddMenu(false);
    setMenuListAnchorEl(null);
  };

  /**
   * 添加 block，使用模块的默认值进行初始化
   *
   * @param type 添加模块的类型
   */
  const handleAddModule = (type: string) => {
    const newModule = { ...defaultModuleData[type], id: Date.now() };
    const blocks = get(formData, "blocks", []);
    setFormData({ ...formData, blocks: [...blocks, newModule] });
    setShowAddMenu(false);
  };

  /**
   * 移除某个 block
   *
   * @param id 唯一的 block 标识
   */
  const handleRemoveModule = (id: number) => {
    const blocks = get(formData, "blocks", []);
    const targetIndex = findIndex(blocks, item => item.id === id);
    if (targetIndex > -1) {
      blocks.splice(targetIndex, 1);
      setFormData({ ...formData, blocks: [...blocks] });
    }
  };

  /**
   * 更改布局时的处理函数
   *
   * @param name 该元素在 formData 中的 key
   * @param value 当前选择的布局类型
   */
  const handleLayoutTypeChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleDragEnd = result => {
    const startIndex = result.source.index;
    const endIndex = result.destination.index;
    const nextBlocks = Array.from(get(formData, "blocks", []));
    const [removed] = nextBlocks.splice(startIndex, 1);
    nextBlocks.splice(endIndex, 0, removed);

    setFormData({ ...formData, blocks: nextBlocks });
  };

  const handlePaymentDragEnd = result => {
    const startIndex = result.source.index;
    const endIndex = result.destination.index;
    const nextBlocks = Array.from(get(formData, "payment", []));
    const [removed] = nextBlocks.splice(startIndex, 1);
    nextBlocks.splice(endIndex, 0, removed);

    setFormData({ ...formData, payment: nextBlocks });
  };

  // <Switch> 元素所需的通用属性
  const commonSwitchProps = {
    color: "primary",
    onChange: handleFormCheckChange,
    inputProps: { "aria-label": "primary checkbox" }
  };

  // 集中存放各个 <Switch> 元素所需的属性，供 renderSwitch 使用
  const switchData = {
    media_icon: [
      {
        title: "Instagram Link",
        props: {
          ...commonSwitchProps,
          checked: formData.show_instagram,
          name: "show_instagram"
        }
      },
      {
        title: "Facebook Link",
        props: {
          ...commonSwitchProps,
          checked: formData.show_facebook,
          name: "show_facebook"
        }
      },
      {
        title: "Twitter Link",
        props: {
          ...commonSwitchProps,
          checked: formData.show_twitter,
          name: "show_twitter"
        }
      },
      {
        title: "Pinterest Link",
        props: {
          ...commonSwitchProps,
          checked: formData.show_pinterest,
          name: "show_pinterest"
        }
      },
      {
        title: "Youtube Link",
        props: {
          ...commonSwitchProps,
          checked: formData.show_youtube,
          name: "show_youtube"
        }
      }
    ],
    payment_icon: [
      {
        title: "Union Pay",
        props: {
          ...commonSwitchProps,
          checked: formData.show_union_pay,
          name: "show_union_pay"
        }
      },
      {
        title: "VISA",
        props: {
          ...commonSwitchProps,
          checked: formData.show_visa,
          name: "show_visa"
        }
      },
      {
        title: "JCB",
        props: {
          ...commonSwitchProps,
          checked: formData.show_jbc,
          name: "show_jbc"
        }
      },
      {
        title: "AMEX",
        props: {
          ...commonSwitchProps,
          checked: formData.show_amex,
          name: "show_amex"
        }
      },
      {
        title: "DISCOVER",
        props: {
          ...commonSwitchProps,
          checked: formData.show_discover,
          name: "show_discover"
        }
      },
      {
        title: "Diners Club",
        props: {
          ...commonSwitchProps,
          checked: formData.show_diners_club,
          name: "show_diners_club"
        }
      },
      {
        title: "Paypal",
        props: {
          ...commonSwitchProps,
          checked: formData.show_paypal,
          name: "show_paypal"
        }
      },
      {
        title: "MasterCard",
        props: {
          ...commonSwitchProps,
          checked: formData.show_mastercard,
          name: "show_mastercard"
        }
      },
      {
        title: "VISA Electron",
        props: {
          ...commonSwitchProps,
          checked: formData.show_visa_electron,
          name: "show_visa_electron"
        }
      }
    ]
  };

  /**
   * 用于输出 <Switch> 元素，减少样板代码
   *
   * 由于要兼容 blocks 中的 <Switch>，因此多了 blockId 参数和其他的一些处理
   *
   * @param title 标题
   * @param props <Switch> 元素所需的所有属性
   * @param blockId 唯一的 block 标识
   * @returns React Element
   */
  const renderSwitch = (title: string, props: object, blockId?: number) => {
    const blocks = get(formData, "blocks", []);
    const targetIndex = findIndex(blocks, item => item.id === blockId);
    return (
      <div className="t14 mb-8 title-only-one-row" key={title}>
        {title}
        <Switch
          {...props}
          checked={
            blockId
              ? get(formData, `blocks[${targetIndex}].${props.name}`)
              : props.checked
          }
          onChange={(event, check) =>
            handleFormCheckChange(event, check, blockId)
          }
        />
      </div>
    );
  };

  // 渲染社交媒体模块
  const renderSocialMedia = (id: number) => {
    const blocks = get(formData, "blocks", []);
    const targetIndex = findIndex(blocks, item => item.id === id);
    return (
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className={classes.accordionTitle}
        >
          <div className="common__accordion-title">
            <Icon name="iconkeyidong" />
            <Typography>社交媒体</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.accordionDetail}>
          <div></div>
        </AccordionDetails>

        <Divider />
        <AccordionActions className={classes.accordionAction}>
          <div
            className={classnames("delete-row", classes.accordionDelete)}
            onClick={() => handleRemoveModule(id)}
          >
            <DeleteIcon /> 删除内容
          </div>
        </AccordionActions>
      </Accordion>
    );
  };

  // 渲染订阅模块
  const renderSubscribe = (id: number) => {
    const blocks = get(formData, "blocks", []);
    const targetIndex = findIndex(blocks, item => item.id === id);
    return (
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className={classes.accordionTitle}
        >
          <div className="common__accordion-title">
            <Icon name="iconkeyidong" />
            <Typography>订阅&社交媒体</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.accordionDetail}>
          <div>
            <Typography className="t14 mb-8">订阅标题</Typography>
            <TextField
              className={classes.inputControl}
              size="small"
              name="title"
              value={get(formData, `blocks[${targetIndex}].title`)}
              onChange={event => handleFormDataChange(event, undefined, id)}
              variant="outlined"
            />
            <Typography className="t14 mb-8 mt-8">社交媒体标题</Typography>
            <TextField
              className={classes.inputControl}
              size="small"
              name="social_title"
              value={get(formData, `blocks[${targetIndex}].social_title`)}
              onChange={event => handleFormDataChange(event, undefined, id)}
              variant="outlined"
            />
            {switchData.media_icon.map(({ title, props }) =>
              renderSwitch(title, props, id)
            )}
          </div>
        </AccordionDetails>

        <Divider />
        <AccordionActions className={classes.accordionAction}>
          <div
            className={classnames("delete-row", classes.accordionDelete)}
            onClick={() => handleRemoveModule(id)}
          >
            <DeleteIcon /> 删除内容
          </div>
        </AccordionActions>
      </Accordion>
    );
  };

  // 渲染菜单模块
  const renderMenuList = (id: number) => {
    const blocks = get(formData, "blocks", []);
    const targetIndex = findIndex(blocks, item => item.id === id);
    return (
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className={classes.accordionTitle}
        >
          <div className="common__accordion-title">
            <Icon name="iconkeyidong" />
            <Typography>菜单链接</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.accordionDetail}>
          <div>
            <Typography className="t14 mb-8">标题</Typography>
            <TextField
              className={classes.inputControl}
              size="small"
              name="title"
              value={get(formData, `blocks[${targetIndex}].title`)}
              onChange={event => handleFormDataChange(event, undefined, id)}
              variant="outlined"
            />
            <div className="title-only-one-row footer-menu-title-wrapper">
              <Typography className="t14 mb-8 mt-8">标题</Typography>
              <a href="/admin/menus/" target="_blank">
                <div className="common__accordion-title">
                  <Icon name="iconbianji" /> 编辑菜单
                </div>
              </a>
            </div>
            <FormControl
              size="small"
              variant="outlined"
              className={classes.formControl}
            >
              <Select
                displayEmpty
                name="menu_id"
                value={get(formData, `blocks[${targetIndex}].menu_id`, "")}
                onChange={event => handleFormDataChange(event, undefined, id)}
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
        </AccordionDetails>

        <Divider />
        <AccordionActions className={classes.accordionAction}>
          <div
            className={classnames("delete-row", classes.accordionDelete)}
            onClick={() => handleRemoveModule(id)}
          >
            <DeleteIcon /> 删除内容
          </div>
        </AccordionActions>
      </Accordion>
    );
  };

  // 渲染自定义文本模块
  const renderCustomizeText = (id: number) => {
    const blocks = get(formData, "blocks", []);
    const targetIndex = findIndex(blocks, item => item.id === id);
    return (
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className={classes.accordionTitle}
        >
          <div className="common__accordion-title">
            <Icon name="iconkeyidong" />
            <Typography>文字介绍</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.accordionDetail}>
          <div>
            <Typography className="t14 mb-8">标题</Typography>
            <TextField
              className={classes.inputControl}
              size="small"
              name="title"
              value={get(formData, `blocks[${targetIndex}].title`)}
              onChange={event => handleFormDataChange(event, undefined, id)}
              variant="outlined"
            />
            <Typography className="t14 mb-8 mt-8">正文</Typography>
            <TextField
              className={classes.inputControl}
              size="small"
              name="content"
              multiline
              rows={4}
              value={get(formData, `blocks[${targetIndex}].content`)}
              onChange={event => handleFormDataChange(event, undefined, id)}
              variant="outlined"
            />
          </div>
        </AccordionDetails>

        <Divider />
        <AccordionActions className={classes.accordionAction}>
          <div
            className={classnames("delete-row", classes.accordionDelete)}
            onClick={() => handleRemoveModule(id)}
          >
            <DeleteIcon /> 删除内容
          </div>
        </AccordionActions>
      </Accordion>
    );
  };

  const moduleMap = {
    menu: renderMenuList,
    text: renderCustomizeText,
    subscribe: renderSubscribe,
    social: renderSocialMedia
  };

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
    onChange("footer", { ...section });
  }, 200);

  useUpdateEffect(() => triggerSave(), [formData]);

  return (
    <div className="config-item-wrapper">
      <div className="module-detail pt-20 border-bottom-1px">
        <div className="t16 pl-16 pb-16">颜色</div>
        <ColorPicker
          name="background_color"
          position="bottom"
          defaultColor={formData.background_color}
          title="背景"
          onChange={handleColorChange}
        />
        <ColorPicker
          name="title_color"
          position="bottom"
          defaultColor={formData.title_color}
          title="标题"
          onChange={handleColorChange}
        />
        <ColorPicker
          name="text_color"
          position="bottom"
          defaultColor={formData.text_color}
          title="正文"
          onChange={handleColorChange}
        />

        <div className="t14 mb-8 btn-style-row pl-24 pr-16">
          <span>社交媒体</span>
          <RadioGroup
            className="radio-group"
            name="social_icon_type"
            value={formData.social_icon_type}
            onChange={handleFormCheckChange}
          >
            <FormControlLabel value="dark" control={<Radio />} label="深色" />
            <FormControlLabel value="light" control={<Radio />} label="浅色" />
          </RadioGroup>
        </div>
      </div>

      <div className="module-detail pt-20 border-bottom-1px">
        <div className="t16 pl-16 pb-16">展示方式</div>

        <div className="module__item">
          <div className="image-layout-types-multi-line">
            {layoutPlaceholder.map(({ imgUrl, name }) => (
              <div
                key={name}
                className={classnames("type t2_1", {
                  selected: formData.layout_type === name
                })}
                onClick={() => handleLayoutTypeChange("layout_type", name)}
              >
                <img src={imgUrl} alt="" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="module-detail pt-20 border-bottom-1px">
        <div className="t16 pl-16 pb-16">内容</div>

        <div className="module__item">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {get(formData, "blocks", []).map(({ id, type }, index) => (
                    <Draggable key={id} draggableId={`${id}`} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getStyle(provided.draggableProps.style, snapshot)}
                        >
                          {moduleMap[type](id)}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <div className="footer-module-addtion-content mt-16">
            <Button
              aria-controls="footer-module-menu"
              aria-haspopup="true"
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleShowAddMenu}
              disabled={!allowAddtionModule}
            >
              添加模块
            </Button>
            <Menu
              id="footer-module-menu"
              keepMounted
              anchorEl={menuListAnchorEl}
              open={Boolean(showAddMenu)}
              onClose={handleHideAddMenu}
            >
              <MenuItem
                disabled={!allowAddtionModule}
                onClick={() => handleAddModule("menu")}
              >
                菜单链接
              </MenuItem>
              <MenuItem
                disabled={!allowAddtionModule}
                onClick={() => handleAddModule("text")}
              >
                文本
              </MenuItem>
              <MenuItem
                disabled={hasSubscribeModule || !allowAddtionModule}
                onClick={() => handleAddModule("subscribe")}
              >
                订阅 & 社交媒体
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>

      {get(formData, "layout_type") === "right" && (
        <div className="module-detail pt-20 border-bottom-1px">
          <div className="t16 pl-16 pb-16">LOGO/站点标题 位置</div>

          <div className="module__item">
            <FormControl
              size="small"
              variant="outlined"
              className={classes.formControl}
            >
              <Select
                displayEmpty
                name="logo_position"
                value={get(formData, "logo_position")}
                onChange={event => handleFormDataChange(event, "logo_position")}
              >
                <MenuItem value="top">居上</MenuItem>
                <MenuItem disabled={!allowAddtionModule} value="left">
                  居左
                </MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      )}

      <div className="module-detail pt-20 border-bottom-1px">
        <div className="t16 pl-16 pb-16 title-only-one-row">
          付款图标
          <Switch
            color="primary"
            name="show_payment_icon"
            checked={get(formData, "show_payment_icon")}
            onChange={handleFormCheckChange}
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        </div>
        <div className="module__item">
          <DragDropContext onDragEnd={handlePaymentDragEnd}>
            <Droppable droppableId="fitaside-payment-droppable">
              {provided => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {get(formData, 'payment', []).map((item, index) => (
                    <Draggable key={item.title} draggableId={item.title} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getStyle(provided.draggableProps.style, snapshot)}
                        >
                          <div className="t14 mb-8 title-only-one-row">
                            <div>
                              <Icon
                                name="iconkeyidong"
                                className="fitaside-sidebar-drag-icon mr-6"
                              />
                              {item.title}
                            </div>
                            <Switch
                              color="primary"
                              inputProps={{ "aria-label": "primary checkbox" }}
                              name={item.title}
                              checked={get(formData, `payment[${index}].show`)}
                              onChange={(event, check) => handlePaymentChange(event, check, index)}
                            />
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>

      <div className="module-detail pt-20 border-bottom-1px">
        <div className="pl-16 pr-16 pb-8 title-only-one-row">
          版权文本
          <Switch
            color="primary"
            name="show_copyright"
            checked={get(formData, "show_copyright")}
            onChange={handleFormCheckChange}
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        </div>

        <div className="module__item">
          <TextField
            className={classes.inputControl}
            size="small"
            name="copyright_text"
            value={get(formData, "copyright_text")}
            onChange={handleFormDataChange}
            variant="outlined"
          />
          <p className="weak-text-tips">仅对独立域名起作用</p>
        </div>
      </div>

      <div className="module-detail pt-20 border-bottom-1px">
        <div className="pl-16 pr-16 pb-8 title-only-one-row">
          特殊说明
          <Switch
            color="primary"
            name="show_special_tip"
            checked={get(formData, "show_special_tip")}
            onChange={handleFormCheckChange}
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        </div>

        <div className="module__item">
          <TextField
            className={classes.inputControl}
            size="small"
            name="special_tip"
            value={get(formData, "special_tip")}
            onChange={handleFormDataChange}
            variant="outlined"
          />
          <p className="weak-text-tips">将显示在最下方</p>
        </div>
      </div>

      <div className="module-detail pt-20 border-bottom-1px">
        <div className="pl-16 pr-16 pb-8 title-only-one-row">
          安全认证
          <Switch
            color="primary"
            name="show_security_approve"
            checked={get(formData, "show_security_approve")}
            onChange={handleFormCheckChange}
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        </div>

        <div className="module__item">
          <div className="site-logo-container">
            <ImagePickerLoad
              key={get(formData, "security_approve_image")}
              classNames="image-picker-wrapper"
              initialImgSrc={get(formData, "security_approve_image")}
              onEnsure={url => {
                const { imageUrl } = url;
                handleImagePickerEnsure("security_approve_image", imageUrl);
              }}
              modalType="image"
            />
            {get(formData, "security_approve_image") && (
              <DeleteIcon
                onClick={() => handleRemoveImage("security_approve_image")}
              />
            )}
          </div>
          <p className="weak-text-tips">仅对独立域名起作用</p>
        </div>

        <div className="module__item">
          <p className="t14 mb-8">安全认证链接</p>
          <TextField
            className={classes.inputControl}
            size="small"
            name="security_approve_link"
            value={get(formData, "security_approve_link")}
            onChange={handleFormDataChange}
            variant="outlined"
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
