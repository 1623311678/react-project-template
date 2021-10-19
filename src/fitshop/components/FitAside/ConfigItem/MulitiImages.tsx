import multi3_1JPG from "@assets/images/config-items/muliti3-1.jpg";
import multi3_2JPG from "@assets/images/config-items/muliti3-2.jpg";
import multi4_1JPG from "@assets/images/config-items/muliti4-1.jpg";
import multi4_2JPG from "@assets/images/config-items/muliti4-2.jpg";
import multi5_1JPG from "@assets/images/config-items/muliti5-1.jpg";
import multi5_2JPG from "@assets/images/config-items/muliti5-2.jpg";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Select from "@material-ui/core/Select";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import Icon from "@src/common/components/Icon";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ColorPicker from "@src/common/components/ColorPicker";
import useDebounce from "@src/hooks/useDebounce";
import ProjectLinkSelector from "@src/common/components/ProjectLinkSelector";
import { get } from "lodash";
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import FontSizeSelector from "./widgets/FontSizeSelector";
import ImagePickerLoad from "@src/common/components/ImagePicker/ImagePickerLoad";

// 多图345的数据和2的差不多一样,
import InitData4MulitiImages from "./initialConfiguration/twoImageSectionData";
import {
  MulitiImages__Image_Layout_Type,
  MulitiImagesFormDataType
} from "./types/ConfigItemTypes";
import getStyle from "@src/utils/dndLockAxis";
import useUpdateEffect from "@src/hooks/useUpdateEffect";
import { CommonSelection } from "./components/common/CommonSelection";
import { hoverAnimationOptions } from "./components/common/CommonSelection/Constant";

const settingKeys = Object.keys(InitData4MulitiImages.settings);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: 0,
      width: "100%",
      height: 36
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    },
    radioRoot: {
      marginLeft: 0,
      marginRight: 0
    },
    accordionDetail: {
      padding: 0,
      flexDirection: "column"
    },
    accordionTitle: {
      background: "#F7F8F9"
    }
  }),{ name: "MulitiImages" }
);

const getLayoutPlaceholder = sectionType => {
  switch (sectionType) {
    case "three_images":
      return [
        {
          imgUrl: multi3_1JPG,
          label: "multi3_1",
          default: true
        },
        {
          imgUrl: multi3_2JPG,
          label: "multi3_2"
        }
      ];
    case "four_images":
      return [
        {
          imgUrl: multi4_1JPG,
          label: "multi4_1",
          default: true
        },
        {
          imgUrl: multi4_2JPG,
          label: "multi4_2"
        }
      ];
    case "five_images":
      return [
        {
          imgUrl: multi5_1JPG,
          label: "multi5_1",
          default: true
        },
        {
          imgUrl: multi5_2JPG,
          label: "multi5_2"
        }
      ];
    default:
      return [];
  }
};

interface MulitiImagesProps {
  section: {
    [key: string]: any;
  };
  sectionStamp: string | number;
}

const textPositionList = [
  {
    label: "上左",
    value: "top_left"
  },
  {
    label: "上中",
    value: "top_center"
  },
  {
    label: "上右",
    value: "top_right"
  },
  {
    label: "居左",
    value: "left"
  },
  {
    label: "居中",
    value: "center"
  },
  {
    label: "居右",
    value: "right"
  },
  {
    label: "下左",
    value: "bottom_left"
  },
  {
    label: "下中",
    value: "bottom_center"
  },
  {
    label: "下右",
    value: "bottom_right"
  }
];

const MulitiImages: React.FC<MulitiImagesProps> = props => {
  const { sectionStamp, section, onChange } = props;
  const classes = useStyles();

  const data: MulitiImagesFormDataType = {};

  Object.assign(data, section.settings);

  data.name = section.name;
  data.blocks = section.blocks;
  const layoutPlaceholder = getLayoutPlaceholder(section.type);
  for (let i = 0; i < layoutPlaceholder.length; i++) {
    if (layoutPlaceholder[i].default) {
      data.image_layout_type =
        data.image_layout_type && data.image_layout_type.indexOf("multi") > -1
          ? data.image_layout_type
          : layoutPlaceholder[i].label;
    }
  }

  const [formData, setFormData] = useState<MulitiImagesFormDataType>(data);

  const recommandSizeObject = {
    'three_images': {
      'equal': ['584 * 800', '600 * 392', '600 * 392'],
      'multi3_1': ['584 * 800', '600 * 392', '600 * 392'],
      'multi3_2': ['390 * 600', '390 * 600', '390 * 600'],
    },
    'four_images': {
      'equal': ['526 * 770', '660 * 368', '322 * 386', '322 * 386'],
      'multi4_1': ['526 * 770', '660 * 368', '322 * 386', '322 * 386'],
      'multi4_2': ['486 * 664', '628 * 800', '628 * 800', '486 * 664'],
    },
    'five_images': {
      'equal': ['790 * 442', '388 * 442', '388 * 442', '396 * 598', '396 * 288'],
      'multi5_1': ['790 * 442', '388 * 442', '388 * 442', '396 * 598', '396 * 288'],
      'multi5_2': ['306 * 442', '306 * 442', '560 * 900', '306 * 442', '306 * 442'],
    },
  }

  const getRecommandSzie = (layoutType) => recommandSizeObject[section.type][layoutType];
  const defaultRecommandSize = getRecommandSzie(formData.image_layout_type || 'equal');
  const [recommandSize, setRecommandSize] = useState<[]>(defaultRecommandSize);

  // 更改当前配置项
  const handleFormDataChange = (e: any, targetName?: string) => {
    const name = targetName || e.target.name;
    setFormData({
      ...formData,
      [name]: e.target.value
    });
  };
  const handleShowImageSpacing = (e, checked: boolean) => {
    setFormData({
      ...formData,
      show_mulityimage_spacing: checked
    });
  };

  /**
   * ColorPicker 颜色发生改变时的处理函数
   *
   * @param name 该元素在 formData 中的 key
   * @param rgb ColorPicker 返回的颜色描述对象
   */
  const handleColorChange = (name: string, rgb: object, idx) => {
    if (idx !== undefined) {
      formData.blocks[idx][name] = rgb;
    } else {
      formData[name] = rgb;
    }
    setFormData({ ...formData });
  };

  // 更改每一个图片的配置
  const handleImageDataChange = (
    e: any,
    blockIndex?: number,
    targetName?: string
  ) => {
    const name = targetName || e.target.name;
    const blockData = {
      ...formData.blocks[blockIndex],
      [name]: e.target.value
    };
    formData.blocks[blockIndex] = blockData;
    setFormData({ ...formData });
  };

  const handleImagePickerEnsure = (picUrl: string, blockIndex?: number) => {
    formData.blocks[blockIndex].image_src = picUrl;
    setFormData({ ...formData });
  };

  const handleImageLayoutTypeChanged = (
    layoutType: MulitiImages__Image_Layout_Type
  ) => {
    setFormData({
      ...formData,
      image_layout_type: layoutType
    });

    const nextRecommandSize = getRecommandSzie(layoutType);
    setRecommandSize(nextRecommandSize);
  };

  const handleLinkObjChanged = (obj, idx) => {
    formData.blocks[idx].link_to_obj = { ...obj, key_map: "id,handle,title" };

    setFormData({ ...formData });
  };

  const handleDragEnd = result => {
    const startIndex = result.source.index;
    const endIndex = result.destination.index;
    const nextBlocks = Array.from(get(formData, "blocks", []));
    const [removed] = nextBlocks.splice(startIndex, 1);
    nextBlocks.splice(endIndex, 0, removed);

    setFormData({ ...formData, blocks: nextBlocks });
  };

  const triggerSave = useDebounce(() => {
    const data = JSON.parse(JSON.stringify(section));
    data.name = formData.name;
    data.blocks = formData.blocks;
    settingKeys.forEach(k => {
      if (k !== "blocks") {
        data.settings[k] = formData[k];
      }
    });

    onChange(sectionStamp, { ...data });
  }, 500);

  enum golabalImageConfigType {
    BTN_DISPALY,
    BTN_BG_COLOR,
    TITLE_SIZE,
    SUBTITLE_SIZE,
    TITLE_CAPITAL,
    SUBTITLE_CAPITAL,
    BTN_CAPITAL
  }
  interface colorPicker {
    r: number | string;
    g: number | string;
    b: number | string;
    a: number | string;
  }
  function changeImgesConfig(e, type: golabalImageConfigType, params?: any) {
    const obj = {};
    switch (type) {
      case golabalImageConfigType.BTN_DISPALY:
        {
          const name: string = e.target.name;
          obj[name] = e.target.value;
        }
        break;
      case golabalImageConfigType.BTN_BG_COLOR:
        {
          obj[e] = params;
        }
        break;
      case golabalImageConfigType.TITLE_SIZE:
        {
          obj[params] = e.target.value;
        }
        break;
      case golabalImageConfigType.SUBTITLE_SIZE:
        {
          obj[params] = e.target.value;
        }
        break;
      case golabalImageConfigType.TITLE_CAPITAL:
      case golabalImageConfigType.SUBTITLE_CAPITAL:
      case golabalImageConfigType.BTN_CAPITAL:
        {
          const name: string = e.target.name;
          obj[name] = e.target.checked;
        }
        break;
    }
    for (let i = 0; i < formData.blocks.length; i += 1) {
      const blockItem = formData.blocks[i];
      if (!blockItem.title) {
        blockItem.title = "";
      }
      if (!blockItem.sub_title) {
        blockItem.sub_title = "";
      }
      if (!blockItem.button_label) {
        blockItem.button_label = "";
      }
      Object.assign(blockItem, obj);
    }
    setFormData({ ...formData });
  }
  function handleSelectChange(name,value){
    const newFormData:any={
      ...formData,
      [name]: value
    }
    setFormData(newFormData);
  }
  useUpdateEffect(() => {
    triggerSave();
  }, [formData]);

  return (
    <div className="config-item-wrapper muliti-images">
      <div className="module">
        <div className="module-info border-bottom-1px ">
          <div className="module__item">
            <div className="t14 mb-8 module__title">
              模块标题
              <ColorPicker
                position="left-bottom"
                name="logo_text_color"
                defaultColor={formData.logo_text_color}
                onChange={handleColorChange}
              />
            </div>
            <TextField
              size="small"
              name="name"
              fullWidth
              value={formData.name}
              onChange={handleFormDataChange}
              placeholder={formData.name}
              variant="outlined"
            />
          </div>
          <div className="module__item">
            <div className="t14 mb-8 module__title">
              模块背景色
              <ColorPicker
                name="module_bg_color"
                position="left-bottom"
                defaultColor={formData.module_bg_color as colorPicker}
                onChange={handleColorChange}
              />
            </div>
          </div>
        </div>
        <div className="module-detail border-bottom-1px pt-20">
          <div className="t16 pl-16 pb-16">展示方式</div>
          <div className="module__item">
            <div className="image-layout-types">
              {layoutPlaceholder.map(lp => (
                  <div
                    key={lp.label}
                    className={`type t2_1 ${formData.image_layout_type ==
                      lp.label && "selected"}`}
                    onClick={() =>
                      handleImageLayoutTypeChanged(
                        lp.label as MulitiImages__Image_Layout_Type
                      )
                    }
                  >
                    <img src={lp.imgUrl} alt="" />
                  </div>
                ))}
            </div>
          </div>
          <div className="module__item">
            <div className="t14 mb-8">文字显示位置</div>
            <FormControl
              size="small"
              variant="outlined"
              className={classes.formControl}
            >
              <Select
                name="title_size"
                value={formData.text_position}
                onChange={e => handleFormDataChange(e, "text_position")}
              >
                <MenuItem value={"inner"}>图片中显示文本</MenuItem>
                <MenuItem value={"hover"}>划过时显示文本</MenuItem>
                {/* <MenuItem value={'under_image'}>图片下显示文本</MenuItem> */}
              </Select>
            </FormControl>
          </div>
          <div className="module__item">
              <div className="t14 mb-8">文字显示方位</div>
              <FormControl
                size="small"
                variant="outlined"
                className={classes.formControl}
              >
                <Select
                  name="text_direction"
                  value={
                    formData.text_direction
                      ? formData.text_direction
                      : "center"
                  }
                  onChange={e => handleFormDataChange(e, "text_direction")}
                >
                  {textPositionList.map(fp => (
                      <MenuItem value={fp.value}>
                        {fp.label}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </div>
          <div className="module__item">
            <div className="t14 mb-8 title-only-one-row">
              图片间距
              <Switch
                checked={formData.show_mulityimage_spacing == undefined ? true : formData.show_mulityimage_spacing} //兼容旧数据
                onChange={handleShowImageSpacing}
                color="primary"
                name="title_uppercase"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            </div>
          </div>
        </div>
        <div className="module-detail border-bottom-1px pt-20 pb-20">
          <div className="t16 pl-16 pb-16">图片</div>
          {/* 全局设置图片配置 */}
          <div className="image-attr-setting">
          <CommonSelection 
              name="hover_effect"
              title="滑过效果"
              value={formData.hover_effect||'hoverZoomOut'} 
              onChage={(name,value)=>handleSelectChange(name,value)}
              options={hoverAnimationOptions}
          ></CommonSelection>
            <div className="module__item">
              <div className="t14 mb-8 module__title">
              标题
                <ColorPicker
                  name="title_color"
                  position="left-top"
                  style={{ left: "10px" }}
                  defaultColor={formData.title_color}
                  onChange={handleColorChange}
                />
              </div>
            </div>
            <div className="module__item">
              <div className="t14 mb-8 module__title">
              副标题
                <ColorPicker
                  name="sub_title_color"
                  position="left-top"
                  style={{ left: "10px" }}
                  defaultColor={formData.sub_title_color}
                  onChange={handleColorChange}
                />
              </div>
            </div>
            <div className="module__item">
              <div className="t14 mb-8 module__title">
              按钮文字
                <ColorPicker
                  name="button_text_color"
                  position="left-top"
                  style={{ left: "10px" }}
                  defaultColor={formData.button_text_color}
                  onChange={handleColorChange}
                />
              </div>
            </div>
            <div className="module__item">
              <div className="t14 mb-8 module__title">
                按钮背景&边框色
                <ColorPicker
                  name="button_bg_and_border_color"
                  position="left-top"
                  style={{ left: "10px" }}
                  defaultColor={
                    (formData.blocks[0]
                      .button_bg_and_border_color as unknown) as colorPicker
                  }
                  // onChange={(name, rgb) => handleColorChange(name, rgb,0)}
                  onChange={(name, color) =>
                    changeImgesConfig(
                      name,
                      golabalImageConfigType.BTN_BG_COLOR,
                      color
                    )
                  }
                />
              </div>
            </div>
            <div className="module__item">
              <div className="t14 mb-8 btn-style-row">
                <span>按钮展示</span>
                <RadioGroup
                  className="radio-group"
                  name="button_variant"
                  onChange={e =>
                    changeImgesConfig(e, golabalImageConfigType.BTN_DISPALY)
                  }
                  value={formData.blocks[0].button_variant}
                  // onChange={e => handleImageDataChange(e, idx)}
                >
                  <FormControlLabel
                    value="fill"
                    control={<Radio />}
                    label="填充"
                  />
                  <FormControlLabel
                    value="outlined"
                    control={<Radio />}
                    label="边框"
                  />
                </RadioGroup>
              </div>
            </div>
            <FontSizeSelector
              title="标题字号"
              type="title"
              value={formData.blocks[0].title_size}
              handleSelector={e =>
                changeImgesConfig(
                  e,
                  golabalImageConfigType.TITLE_SIZE,
                  "title_size"
                )
              }
            />
            <FontSizeSelector
              title="副标题字号"
              value={formData.blocks[0].sub_title_size}
              handleSelector={e =>
                changeImgesConfig(
                  e,
                  golabalImageConfigType.SUBTITLE_SIZE,
                  "sub_title_size"
                )
              }
            />

            <div className="module__item">
              <div className="t14 mb-8 title-only-one-row">
                标题全大写
                <Switch
                  checked={formData.blocks[0].title_uppercase}
                  onChange={e =>
                    changeImgesConfig(e, golabalImageConfigType.TITLE_CAPITAL)
                  }
                  color="primary"
                  name="title_uppercase"
                  inputProps={{
                    "aria-label": "primary checkbox"
                  }}
                />
              </div>
            </div>
            <div className="module__item">
              <div className="t14 mb-8 title-only-one-row">
                副标题全大写
                <Switch
                  checked={formData.blocks[0].sub_title_uppercase}
                  onChange={e =>
                    changeImgesConfig(
                      e,
                      golabalImageConfigType.SUBTITLE_CAPITAL
                    )
                  }
                  color="primary"
                  name="sub_title_uppercase"
                  inputProps={{
                    "aria-label": "primary checkbox"
                  }}
                />
              </div>
            </div>
            <div className="module__item">
              <div className="t14 mb-8 title-only-one-row">
                按钮全大写
                <Switch
                  checked={formData.blocks[0].button_uppercase}
                  onChange={e =>
                    changeImgesConfig(e, golabalImageConfigType.BTN_CAPITAL)
                  }
                  color="primary"
                  name="button_uppercase"
                  inputProps={{
                    "aria-label": "primary checkbox"
                  }}
                />
              </div>
            </div>
          </div>
          <div className="adding-wrapper pl-24 pr-24">
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {get(formData, "blocks", []).map((imageData, idx) => (
                      <Draggable
                        key={imageData.id}
                        draggableId={`${imageData.id}`}
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
                                  <Icon name="iconkeyidong" /> 图片 {idx + 1}
                                </div>
                              </AccordionSummary>
                              <AccordionDetails
                                className={classes.accordionDetail}
                              >
                                <div className="s_b-box pl-16 pr-16 pt-8">
                                  <div className="image-setup">
                                    <div className="module__item">
                                      <div className="t14 mb-8">上传图片</div>
                                      <div className="pic-upload">
                                        <ImagePickerLoad
                                          key={get(imageData, "image_src")}
                                          classNames="image-picker-small-wrapper"
                                          initialImgSrc={get(
                                            imageData,
                                            "image_src"
                                          )}
                                          onEnsure={url => {
                                            const { imageUrl } = url;
                                            handleImagePickerEnsure(
                                              imageUrl,
                                              idx
                                            );
                                          }}
                                          modalType="image"
                                        />
                                      </div>
                                      <div className="t12 mt-8">
                                        建议尺寸：{ recommandSize[idx] }px
                                      </div>
                                    </div>
                                    <div className="module__item">
                                      <div className="t14 mb-8">截取位置</div>
                                      <FormControl
                                        size="small"
                                        variant="outlined"
                                        className={classes.formControl}
                                      >
                                        <Select
                                          value={imageData.cut_position}
                                          name="cut_position"
                                          onChange={e =>
                                            handleImageDataChange(e, idx)
                                          }
                                        >
                                          <MenuItem value={"top"}>上</MenuItem>
                                          <MenuItem value={"center"}>
                                            中
                                          </MenuItem>
                                          <MenuItem value={"bottom"}>
                                            下
                                          </MenuItem>
                                        </Select>
                                      </FormControl>
                                    </div>
                                    {/* ---------- */}
                                    <div className="module__item">
                                      <div className="t14 mb-8">链接</div>
                                      <ProjectLinkSelector
                                        initialValue={imageData.link_to_obj}
                                        onLinkSelected={obj =>
                                          handleLinkObjChanged(obj, idx)
                                        }
                                        placeholder="请选择跳转到的页面"
                                      />
                                    </div>
                                    <div className="module__item">
                                      <div className="t14 mb-8 module__title">
                                        标题
                                      </div>
                                      <TextField
                                        fullWidth
                                        name="title"
                                        value={imageData.title}
                                        onChange={e =>
                                          handleImageDataChange(e, idx)
                                        }
                                        size="small"
                                        placeholder="主标题"
                                        variant="outlined"
                                      />
                                    </div>
                                    <div className="module__item">
                                      <div className="t14 mb-8 module__title">
                                        副标题
                                      </div>
                                      <TextField
                                        fullWidth
                                        name="sub_title"
                                        value={imageData.sub_title}
                                        onChange={e =>
                                          handleImageDataChange(e, idx)
                                        }
                                        size="small"
                                        placeholder="副标题"
                                        variant="outlined"
                                      />
                                    </div>
                                    <div className="module__item">
                                      <div className="t14 mb-8 module__title">
                                        按钮文字
                                      </div>
                                      <TextField
                                        fullWidth
                                        name="button_label"
                                        value={imageData.button_label}
                                        onChange={e =>
                                          handleImageDataChange(e, idx)
                                        }
                                        size="small"
                                        placeholder="按钮文字"
                                        variant="outlined"
                                      />
                                    </div>
                                  </div>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default MulitiImages;
