import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import DeleteIcon from "@material-ui/icons/Delete";
import Switch from "@material-ui/core/Switch";
import Icon from "@src/common/components/Icon";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ColorPicker from "@src/common/components/ColorPicker";
import useDebounce from "@src/hooks/useDebounce";
import { getCollectionsList } from "@src/api/collections";
import { makeAttributeCamel } from "@src/utils/underscore2camel";

import BusinessChoice from "@src/common/components/BusinessChoice";
import { get } from "lodash";
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import InitData4CollectionDetailList from "./initialConfiguration/collectionDetailList";
import { CollectionDetailListFormDataType } from "./types/ConfigItemTypes";
import { FormControl, Select, MenuItem } from "@material-ui/core";
import ImagePickerLoad from "@src/common/components/ImagePicker/ImagePickerLoad";
import Slider from "@material-ui/core/Slider";
import getStyle from "@src/utils/dndLockAxis";
import { CommonSelection } from './components/common/CommonSelection'
import useUpdateEffect from "@src/hooks/useUpdateEffect";
import { hoverAnimationOptions } from './components/common/CommonSelection/Constant'

const mobileTextOptions = [
  {
  key:'slide',value:"滑动展示"
},{
  key:'list',value:"陈列展示"
}]

const settingKeys = Object.keys(InitData4CollectionDetailList.settings);
interface colorPicker {
  r: number | string;
  g: number | string;
  b: number | string;
  a: number | string;
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
  }),{ name: "CollectionDetailListCover" }
);

interface CollectionListProps {
  section: {
    [key: string]: any;
    settings: object;
  };
  sectionStamp: string | number;
  onChange:(params1:any,params:2)=>void
}
const CollectionDetailListCover: React.FC<CollectionListProps> = props => {
  const { sectionStamp, section, onChange } = props;

  const classes = useStyles();

  const data = {};
  Object.assign(data, section.settings);
  data.blocks = section.blocks;
  data.name = section.name;

  const [formData, setFormData] = useState<CollectionDetailListFormDataType>(
    data
  );

  const handleDeleteBlock = (blockIndex?: number) => {
    formData.blocks.splice(blockIndex, 1);
    setFormData({ ...formData, blocks: formData.blocks });
  };

  const updageBlocks = (idx, collection) => {
    if (!collection[0]) {
      formData.blocks[idx].link_to_obj = {};
    } else {
      formData.blocks[idx].link_to_obj = {
        id: collection[0].id ? Number(collection[0].id) : 0,
        type: collection[0].type || "collection",
        title: collection[0].title,
        image: collection[0].image,
        key_map: "id,image,handle,title,total_products,products,review_star,review_count"
      };
    }

    setFormData({
      ...formData,
      blocks: formData.blocks
    });
  };
  const triggerSave = useDebounce(() => {
    const data = JSON.parse(JSON.stringify(section));
    data.name = formData.name;
    data.blocks = formData.blocks;

    data.blocks.forEach(element => {
      if (element.link_to_obj) {return;}

      if (element.collection && element.collection.id) {
        element.link_to_obj = {
          id: element.collection.id ? Number(element.collection.id) : 0,
          type: element.collection.type || "collection",
          key_map: "id,image,handle,title,total_products,products,review_star,review_count"
        };
      }
    });

    settingKeys.forEach(key => {
      data.settings[key] = formData[key];
    });

    onChange(sectionStamp, { ...data });
  }, 500);
  const handleFormDataChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleColorChange = (name: string, rgb: object) => {
    setFormData({ ...formData, [name]: rgb });
  };

  const handleImagePickerEnsure = (picUrl: any, blockIndex?: number) => {
    const { imageUrl,imageWidth,imageHeight } = picUrl;
    formData.blocks[blockIndex].image_src = imageUrl;
    formData.blocks[blockIndex].image_w = imageWidth;
    formData.blocks[blockIndex].image_h = imageHeight;
    setFormData({ ...formData });
  };

  const handleSwitchChanged = (checked: boolean, key: string) => {
    setFormData({
      ...formData,
      [key]: checked
    });
  }

  const handleDragEnd = result => {
    const startIndex = result.source.index;
    const endIndex = result.destination.index;
    const nextBlocks = Array.from(get(formData, "blocks", []));
    const [removed] = nextBlocks.splice(startIndex, 1);
    nextBlocks.splice(endIndex, 0, removed);

    setFormData({ ...formData, blocks: nextBlocks });
  };
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

  // 获取系列列表
  const getCollectionList = async variables => {
    const data = await getCollectionsList(variables);
    const nodes = data.data.collections.edges;
    const pageInfo = data.data.collections.pageInfo;
    return {
      nodes: nodes.map(item => item.node),
      pageInfo,
      cursor: nodes.length ? nodes.pop().cursor : ""
    };
  };
  const handleSliderChange = (v, key) => {
    setFormData({
      ...formData,
      [key]: v
    });
  };
  return (
    <div className="config-item-wrapper">
      <div className="module-info border-bottom-1px">
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
            value={formData.name}
            onChange={handleFormDataChange}
            variant="outlined"
          />
        </div>
        <div className="module__item">
          <div className="t14 mt-10 module__title">
            模块背景色
            <ColorPicker
              name="module_bg_color"
              position="left-bottom"
              defaultColor={formData.module_bg_color}
              onChange={handleColorChange}
            />
          </div>
        </div>
        <div className="module__item">
          <div className="t14 mt-10 module__title">
            产品名称色
            <ColorPicker
              name="product_color"
              position="left-bottom"
              defaultColor={formData.product_color}
              onChange={handleColorChange}
            />
          </div>
        </div>
        <div className="module__item">
          <div className="t14 mb-10 module__title">
            卡片背景色
            <ColorPicker
              name="card_bg_color"
              position="left-bottom"
              defaultColor={
                formData.card_bg_color as colorPicker
              }
              onChange={handleColorChange}
            />
          </div>
        </div>
        <div className="module__item">
          <div className="t14 mb-10 module__title">
            封面文字色
            <ColorPicker
              name="cover_text_color"
              position="left-bottom"
              defaultColor={
                formData.cover_text_color as colorPicker
              }
              onChange={handleColorChange}
            />
          </div>
        </div>
        <div className="module__item">
          <div className="t14 mb-8 title-only-one-row">
            显示产品数量
            <Switch
              checked={typeof(formData.show_number) === 'undefined' ? true : formData.show_number}
              onChange={(e, v) => handleSwitchChanged(v, 'show_number')}
              color="primary"
              name="show_number"
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          </div>
        </div>
      </div>
      <div className="module-detail pt-20 relative">
        <div className="module__item">
          <div className="t14 mb-8 title-only-one-row">轮播时间</div>
          <div className="slider-wrapper">
            <div className="s">
              <Slider
                valueLabelDisplay="auto"
                min={2}
                max={5}
                name="slide_duration"
                value={formData.slide_duration ? formData.slide_duration : 2}
                onChange={(e, v) => handleSliderChange(v, "slide_duration")}
              />
            </div>
            <div className="tip">
              {formData.slide_duration ? formData.slide_duration : 2}秒
            </div>
          </div>
        </div>
        <CommonSelection 
              name="hover_effect"
              title="滑过效果"
              value={formData.hover_effect||'hoverZoomOut'} 
              onChage={(name,value)=>handleSelectChange(name,value)}
              options={hoverAnimationOptions}
          ></CommonSelection>
        <div className="adding-wrapper pl-24 pr-24">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {get(formData, "blocks", []).map((s_b, idx) => (
                    <Draggable
                      key={s_b.id}
                      draggableId={`${s_b.id}`}
                      index={idx}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getStyle(provided.draggableProps.style, snapshot)}
                        >
                          <Accordion key={idx}>
                            <AccordionSummary
                              className={classes.accordionTitle}
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                            >
                              <div className="common__accordion-title">
                                <Icon name="iconkeyidong" /> 系列列表
                              </div>
                            </AccordionSummary>
                            <AccordionDetails
                              className={classes.accordionDetail}
                            >
                              <div className="s_b-box">
                                <div className="ml-12 mr-12 mt-20">
                                  <BusinessChoice
                                    title="系列"
                                    defaultSelectedRows={
                                      s_b.link_to_obj
                                        ? s_b.link_to_obj instanceof Array
                                          ? s_b.link_to_obj
                                          : [
                                              makeAttributeCamel(
                                                s_b.link_to_obj
                                              )
                                            ]
                                        : []
                                    }
                                    getlist={getCollectionList}
                                    handleSelect={payload =>
                                      updageBlocks(idx, payload)
                                    }
                                  />
                                  <div className="module__item">
                                    <div className="t14 mb-8">上传图片</div>
                                    <div className="pic-upload">
                                      <ImagePickerLoad
                                        key={get(s_b, "image_src")}
                                        classNames="image-picker-small-wrapper"
                                        initialImgSrc={get(s_b, "image_src")}
                                        onEnsure={url => {
                                          handleImagePickerEnsure(
                                            url,
                                            idx
                                          );
                                        }}
                                        modalType="image"
                                      />
                                      <div className="t12 mt-8">建议尺寸：360 * 540px</div>
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
                                        name="text_position"
                                        value={
                                          formData.text_position
                                            ? formData.text_position
                                            : "top_left"
                                        }
                                        onChange={e => handleFormDataChange(e)}
                                      >
                                        {textPositionList.map(fp => (
                                            <MenuItem value={fp.value}>
                                              {fp.label}
                                            </MenuItem>
                                          ))}
                                      </Select>
                                    </FormControl>
                                  </div>
                                  <CommonSelection 
                                    name="mobile_display"
                                    title="移动端展示方式"
                                    value={formData.mobile_display||'list'} 
                                    onChage={(name,value)=>handleSelectChange(name,value)}
                                    options={mobileTextOptions}
                                    ></CommonSelection>
                                </div>
                              </div>
                              {get(formData, "blocks", []).length > 1 && (
                                <div
                                  className="delete-row"
                                  onClick={() => handleDeleteBlock(idx)}
                                >
                                  <DeleteIcon /> 删除内容
                                </div>
                              )}
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
  );
};

export default CollectionDetailListCover;
