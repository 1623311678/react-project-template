import layout_1JPG from "@assets/images/config-items/icon-consumer-feed-layout-1.jpg";
import layout_2JPG from "@assets/images/config-items/icon-consumer-feed-layout-2.jpg";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Slider from "@material-ui/core/Slider";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import Icon from "@src/common/components/Icon";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ColorPicker from "@src/common/components/ColorPicker";

import useDebounce from "@src/hooks/useDebounce";
import { get } from "lodash";
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import InitData4ConsumerFeed from "./initialConfiguration/consumerFeedData";
import { ConsumerFeedFormDataType } from "./types/ConfigItemTypes";
import FontSizeSelector from "./widgets/FontSizeSelector";
import getStyle from "@src/utils/dndLockAxis";
import ImagePickerLoad from "@src/common/components/ImagePicker/ImagePickerLoad";
import useUpdateEffect from "@src/hooks/useUpdateEffect";

const settingKeys = Object.keys(InitData4ConsumerFeed.settings);

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
  })
);

const layoutPlaceholder = [
  {
    imgUrl: layout_1JPG,
    label: "layout_1JPG"
  },
  {
    imgUrl: layout_2JPG,
    label: "layout_2JPG"
  }
];

const sliderMarks = [
  {
    value: 1,
    label: "1s"
  },
  {
    value: 5,
    label: "5s"
  }
];

interface ConsumerFeedProps {
  section: {
    [key: string]: any;
  };
  sectionStamp: string | number;
}

const ConsumerFeed: React.FC<ConsumerFeedProps> = props => {
  const { sectionStamp, section, onChange } = props;
  const classes = useStyles();

  let data: ConsumerFeedFormDataType = {};
  Object.assign(data, section.settings);
  data.name = section.name;
  data.blocks = section.blocks;
  const [formData, setFormData] = useState<ConsumerFeedFormDataType>(data);

  // 更改当前配置项
  const handleFormDataChange = (e: any, targetName?: string) => {
    let name = targetName || e.target.name;
    setFormData({
      ...formData,
      [name]: e.target.value
    });
  };
  const handleAutoSlide = (e, checked: boolean) => {
    setFormData({
      ...formData,
      auto_slide: checked
    });
  };

  const handleLoopDurationChange = (e, v) => {
    setFormData({
      ...formData,
      loop_duration: v
    });
  };

  // 更改每一个图片的配置
  const handleBlockDataChange = (
    e: any,
    blockIndex?: number,
    targetName?: string
  ) => {
    let name = targetName || e.target.name;
    const blockData = {
      ...formData.blocks[blockIndex],
      [name]: e.target.value
    };
    formData.blocks[blockIndex] = blockData;
    setFormData({ ...formData });
  };

  const handleLayoutTypeChanged = (
    layoutType: "layout_1JPG" | "layout_2JPG"
  ) => {
    setFormData({
      ...formData,
      layout_type: layoutType
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

  const handleAddBlock = () => {
    const newImageData = {
      ...InitData4ConsumerFeed.blocks[0],
      id: Math.round(Math.random() * 10000),
      name_font_size: formData.blocks.length>0 ? formData.blocks[0].name_font_size : 'medium',
      feed_font_size: formData.blocks.length>0 ? formData.blocks[0].feed_font_size : 'medium',
      img_size: formData.blocks.length>0 ? formData.blocks[0].img_size : '60%',
    }; //写死的初始数据
    formData.blocks.push(newImageData);
    setFormData({ ...formData });
  };
  const handleDeleteBlock = (blockIndex?: number) => {
    formData.blocks.splice(blockIndex, 1);
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

  const handleImagePickerEnsure = (picUrl: string, blockIndex?: number) => {
    formData.blocks[blockIndex].image_src = picUrl;
    setFormData({ ...formData });
  };

  const triggerSave = useDebounce(() => {
    const data = JSON.parse(JSON.stringify(section));
    data.name = formData.name;
    data.blocks = formData.blocks;
    settingKeys.forEach(k => {
      data.settings[k] = formData[k];
    });

    onChange(sectionStamp, { ...data });
  }, 500);

  function handleChangeAttr(e, name) {
    for (let i = 0; i < formData.blocks.length; i += 1) {
      formData.blocks[i][name] = e.target.value;
    }
    setFormData({ ...formData });
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
                defaultColor={formData.module_bg_color}
                onChange={handleColorChange}
              />
            </div>
          </div>
        </div>
        <div className="module-detail border-bottom-1px pt-20">
          <div className="t16 pl-16 pb-16">展示方式</div>
          <div className="module__item">
            <div className="image-layout-types">
              {layoutPlaceholder.map(lp => {
                return (
                  <div
                    key={lp.label}
                    className={`type t2_1 ${formData.layout_type == lp.label &&
                      "selected"}`}
                    onClick={() => handleLayoutTypeChanged(lp.label)}
                  >
                    <img src={lp.imgUrl} alt="" />
                  </div>
                );
              })}
            </div>
          </div>
          {formData.layout_type == "layout_2JPG" && (
            <div className="module__item">
              <div className="t14 mb-8 title-only-one-row">
                自动轮播
                <Switch
                  checked={formData.auto_slide}
                  onChange={handleAutoSlide}
                  color="primary"
                  name="title_uppercase"
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              </div>
            </div>
          )}
          {formData.layout_type == "layout_2JPG" && (
            <div className="module__item">
              <div className="t14 mb-8">轮播时间</div>
              <Slider
                valueLabelDisplay="auto"
                min={2}
                max={5}
                name="loop_time"
                value={formData.loop_duration}
                onChange={handleLoopDurationChange}
                marks={sliderMarks}
                aria-labelledby="continuous-slider"
              />
            </div>
          )}
        </div>
        <div className="module-detail border-bottom-1px pt-20 pb-20">
          {/* <div className="t16 pl-16 pb-16">图片</div> */}
          <FontSizeSelector
            title="客户名称字号"
            type="title"
            value={formData.blocks[0] && formData.blocks[0].name_font_size}
            handleSelector={e => handleChangeAttr(e, "name_font_size")}
          />
          <FontSizeSelector
            title="客户感言字号"
            value={formData.blocks[0] && formData.blocks[0].feed_font_size}
            handleSelector={e => handleChangeAttr(e, "feed_font_size")}
          />
          <div className="module__item">
            <div className="t14 mb-8">列表图片尺寸</div>
            <FormControl
              size="small"
              variant="outlined"
              className={classes.formControl}
            >
              <Select
               value={formData.blocks[0] && formData.blocks[0].img_size}
               onChange={e => handleChangeAttr(e, "img_size")}
              >
                <MenuItem value={"60%"}>5:3</MenuItem>
                <MenuItem value={"100%"}>1:1</MenuItem>
                <MenuItem value={"133%"}>3:4</MenuItem>
              </Select>
            </FormControl>
          </div>  
          <div className="module__item">
            <div className="t14 mb-8 module__title">
              文字色
              <ColorPicker
                position="left-bottom"
                name="feed_font_color"
                defaultColor={formData.feed_font_color}
                onChange={handleColorChange
                }
              />
            </div>
          </div>
          <div className="adding-wrapper pl-24 pr-24">
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {get(formData, "blocks", []).map((blockData, idx) => (
                      <Draggable
                        key={blockData.id}
                        draggableId={`${blockData.id}`}
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
                                  <Icon name="iconkeyidong" /> 客户名称{" "}
                                  {idx + 1}
                                </div>
                              </AccordionSummary>
                              <AccordionDetails
                                className={classes.accordionDetail}
                              >
                                <div className="s_b-box pl-16 pr-16 pt-8">
                                  <div className="image-setup">
                                    <div className="module__item">
                                      <div className="t14 mb-8 module__title">
                                        客户名称
                                      </div>
                                      <TextField
                                        fullWidth
                                        name="consumer_name"
                                        value={blockData.consumer_name}
                                        onChange={e =>
                                          handleBlockDataChange(e, idx)
                                        }
                                        size="small"
                                        placeholder="客户名称"
                                        variant="outlined"
                                      />
                                    </div>
                                    <div className="module__item ">
                                      <div className="t14 mb-8 module__title">
                                        感言文案
                                      </div>
                                      <TextField
                                        fullWidth
                                        name="consumer_feed"
                                        value={blockData.consumer_feed}
                                        onChange={e =>
                                          handleBlockDataChange(e, idx)
                                        }
                                        size="small"
                                        placeholder="客户感言"
                                        variant="outlined"
                                      />
                                    </div>
                                    <div>
                                      <div className="t14 mb-8">上传图片</div>
                                      <ImagePickerLoad
                                        key={get(blockData, "image_src")}
                                        classNames="image-picker-small-wrapper"
                                        initialImgSrc={get(blockData, "image_src")}
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
                                  </div>
                                </div>
                                <div
                                  className="delete-row"
                                  onClick={() => handleDeleteBlock(idx)}
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
          </div>
        </div>
        {formData.blocks && formData.blocks.length < 3 && (
          <div className="module-detail pt-20">
            <div className="module__item">
              <div className="append-block-btn" onClick={handleAddBlock}>
                <AddIcon className="pr-6" />
                添加评论
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsumerFeed;
