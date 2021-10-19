import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import DeleteIcon from "@material-ui/icons/Delete";
import RadioGroup from "@material-ui/core/RadioGroup";
import Slider from "@material-ui/core/Slider";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ColorPicker from "@src/common/components/ColorPicker";
import Icon from "@src/common/components/Icon";

import ImagePickerLoad from "@src/common/components/ImagePicker/ImagePickerLoad";

import useDebounce from "@src/hooks/useDebounce";
import ProjectLinkSelector from "@src/common/components/ProjectLinkSelector";
import { get } from "lodash";
import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import InitData4CarouselImages from "./initialConfiguration/carouselImagesectionData";
import { CarouselImagesFormDataType } from "./types/ConfigItemTypes";
import FontSizeSelector from "./widgets/FontSizeSelector";
import getStyle from "@src/utils/dndLockAxis";
import useUpdateEffect from "@src/hooks/useUpdateEffect";
import { CommonSelection } from "./components/common/CommonSelection";
import { slideAnimationOptions,textButtonPosition } from './components/common/CommonSelection/Constant'
const settingKeys = Object.keys(InitData4CarouselImages.settings);
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
  }),{ name: "CarouselImages" }
);

interface CarouselImagesProps {
  section: {
    [key: string]: any;
  };
  sectionStamp: string | number;
  onChange:(params1:any,params2:any)=>void
}

const CarouselImages: React.FC<CarouselImagesProps> = props => {
  const { sectionStamp, section, onChange } = props;
  const classes = useStyles();
  const data: CarouselImagesFormDataType = {};
  Object.assign(data, section.settings);
  data.blocks = section.blocks;
  const [formData, setFormData] = useState<CarouselImagesFormDataType>(data);

  // 更改当前配置项 
  const handleFormDataChange = (e: any, targetName?: string, idx?: number) => {
    const name = targetName || e.target.name;

    if (idx !== undefined) {
      formData.blocks[idx][name] = e.target.value;
    } else {
      formData[name] = e.target.value;
    }
    setFormData({
      ...formData
    });
  };
  const handleImageCheckChange = (e, checked: boolean, idx) => {
    const name = e.target.name;
    formData.blocks[idx][name] = checked;
    setFormData({
      ...formData
    });
  };
  const handleSwitchChanged = (checked: boolean, key: string) => {
    setFormData({
      ...formData,
      [key]: checked
    });
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

  const handleImagePickerEnsure = (
    picUrl: string | any,
    attributeName: string,
    blockIndex?: number,
    isVideo: boolean = false
  ) => {
    if (isVideo) {
      const {
        uploadType,
        imageUrl,
        videoSrc,
        videoType,
        imageWidth,
        imageHeight
      } = picUrl;
      formData.blocks[blockIndex][attributeName] = {
        uploadType,
        image_src: imageUrl,
        video_src: videoSrc,
        videoType,
        image_w: imageWidth,
        image_h: imageHeight
      };
      setFormData({ ...formData });
    } else {
      formData.blocks[blockIndex][attributeName] = picUrl;
      setFormData({ ...formData });
    }
  };

  const handleSliderChange = (v, key) => {
    setFormData({
      ...formData,
      [key]: v
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

  const triggerSave = useDebounce(() => {
    const data = JSON.parse(JSON.stringify(section));
    data.blocks = formData.blocks;

    data.blocks.forEach(element => {
      if (get(element, 'link_to_obj.id')) {
        element.link_to_obj = {
          ...element.link_to_obj,
          key_map: 'id,handle,title'
        }
      }
    });
    settingKeys.forEach(k => {
      if (k !== "blocks") {
        data.settings[k] = formData[k];
      }
    });

    onChange(sectionStamp, { ...data });
  }, 500);

  const handleAddBlock = () => {
    const newblockData = JSON.parse(
      JSON.stringify(InitData4CarouselImages.blocks[0])
    ); // 写死的初始数据
    newblockData.id = Math.round(Math.random() * 10000);
    formData.blocks.push(newblockData);
    setFormData({ ...formData });
  };

  const handleDeleteBlock = (blockIndex?: number) => {
    formData.blocks.splice(blockIndex, 1);
    setFormData({ ...formData });
  };

  const handleLinkObjChanged = (obj, idx) => {
    formData.blocks[idx].link_to_obj = {
      ...obj,
      key_map: 'id,handle,title'
    };

    setFormData({
      ...formData
    });
  };

  const handleDragEnd = result => {
    const startIndex = result.source.index;
    const endIndex = result.destination.index;
    const nextBlocks = Array.from(get(formData, "blocks", []));
    const [removed] = nextBlocks.splice(startIndex, 1);
    nextBlocks.splice(endIndex, 0, removed);

    setFormData({ ...formData, blocks: nextBlocks });
  };
  function handleSelectChange(name,value,idx?){
    if (idx !== undefined&&idx!==null) {
      formData.blocks[idx][name] = value;
      setFormData({
        ...formData
      });
    }else{
      const newFormData:any={
        ...formData,
        [name]: value
      }
      setFormData(newFormData);
    }
  }
  function getAnimationEffect(effect){
    if(effect==="hoverZoomOut"||effect === 'hoverZoomIn'||effect==="hoverWhiteLayout"){
      return effect
    }else{
      return 'hoverZoomOut'
    }
  }
  useUpdateEffect(() => {
    triggerSave();
  }, [formData]);

  return (
    <div className="config-item-wrapper muliti-images">
      <div className="module">
        <div className="module-detail border-bottom-1px pt-20">
          <div className="t16 pl-16 pb-16">展示方式</div>
          <div className="module__item">
            <div className="t14 mb-8 title-only-one-row">
              自动轮播
              <Switch
                checked={formData.auto_slide}
                onChange={(e, v) => handleSwitchChanged(v, "auto_slide")}
                color="primary"
                name="auto_slide"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            </div>
          </div>
          <div className="module__item">
            <div className="t14 mb-8 title-only-one-row">
              宽度铺满全屏
              <Switch
                checked={formData.full_screen}
                onChange={(e, v) => handleSwitchChanged(v, "full_screen")}
                color="primary"
                name="full_screen"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            </div>
          </div>
          <div className="module__item">
            <div className="t14 mb-8 title-only-one-row">
              图片铺满页头
              <Switch
                checked={formData.full_header}
                onChange={(e, v) => handleSwitchChanged(v, "full_header")}
                color="primary"
                name="full_header"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            </div>
          </div>
          <div className="module__item">
            <div className="t14 mb-8 title-only-one-row">轮播时间</div>
            <div className="slider-wrapper">
              <div className="s">
                <Slider
                  valueLabelDisplay="auto"
                  min={2}
                  max={5}
                  name="slide_duration"
                  value={Number(formData.slide_duration)}
                  onChange={(e, v) => handleSliderChange(v, "slide_duration")}
                />
              </div>
              <div className="tip">{formData.slide_duration}秒</div>
            </div>
          </div>
          <CommonSelection 
              name="slide_effect"
              title="动画效果"
              value={getAnimationEffect(formData.slide_effect)} 
              onChage={(name,value)=>handleSelectChange(name,value)}
              options={slideAnimationOptions}
          ></CommonSelection>
        </div>
        <div className="module-detail border-bottom-1px pt-20 pb-20">
          <div className="t16 pl-16 pb-16">图片</div>
          <div className="module__item">
            <div className="t14 mb-8 title-only-one-row">图片上间距</div>
            <TextField 
              name="img_top_margin" 
              type="number" 
              size="small" 
              fullWidth
              value={ formData.img_top_margin }
              onChange={ handleFormDataChange }
              placeholder={ formData.img_top_margin }
              variant="outlined" />
          </div>
          <div className="module__item">
            <div className="t14 mb-8 title-only-one-row">图片下间距</div>
            <TextField 
              name="img_bottom_margin" 
              type="number" 
              size="small" 
              fullWidth
              value={ formData.img_bottom_margin }
              onChange={ handleFormDataChange }
              placeholder={ formData.img_bottom_margin }
              variant="outlined" />
          </div>
          <div className="adding-wrapper pl-24 pr-24">
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="droppable" direction="vertical">
                {(provided) => (
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
                            style={getStyle(provided.draggableProps.style, snapshot)}
                          >
                            <Accordion key={imageData.id}>
                              <AccordionSummary
                                className={classes.accordionTitle}
                                expandIcon={<ExpandMoreIcon />}
                              >
                                <div className="common__accordion-title">
                                  <Icon name="iconkeyidong" /> <div>图片 {idx + 1}</div>
                                </div>
                              </AccordionSummary>
                              <AccordionDetails
                                className={classes.accordionDetail}
                              >
                                <div className="s_b-box pl-16 pr-16 pt-8">
                                  <div className="image-setup">
                                    <div className="module__item">
                                      <div className="t14 mb-8">选择图片</div>
                                      <div className="pic-upload">
                                        <ImagePickerLoad
                                          key={get(
                                            imageData.media_obj,
                                            "image_src"
                                          )}
                                          classNames="image-picker-small-wrapper"
                                          initialImgSrc={get(
                                            imageData.media_obj,
                                            "image_src"
                                          )}
                                          onEnsure={url => {
                                            const isVideo = true;
                                            handleImagePickerEnsure(
                                              url,
                                              "media_obj",
                                              idx,
                                              isVideo
                                            );
                                          }}
                                          modalType="all"
                                        />
                                      </div>
                                      <div className="t12 mt-8">
                                        建议尺寸：1920 * 670px
                                      </div>
                                    </div>
                                    <div className="module__item">
                                      <div className="t14 mb-8">
                                        上传图片(手机端)
                                      </div>
                                      <ImagePickerLoad
                                        key={get(imageData.image_src_mobile, "image_src")}
                                        classNames="image-picker-small-wrapper"
                                        initialImgSrc={get(
                                          imageData.image_src_mobile,
                                          "image_src"
                                        )}
                                        onEnsure={url => {
                                          // const { imageUrl } = url;
                                          const isVideo = true;
                                          handleImagePickerEnsure(
                                            url,
                                            "image_src_mobile",
                                            idx,
                                            isVideo
                                          );
                                        }}
                                        modalType="all"
                                      />
                                      <div className="t12 mt-8">
                                        建议尺寸：750 * 520px
                                      </div>
                                    </div>
                                    <div className="module__item">
                                      <div className="t14 mb-8">图片链接</div>
                                      <ProjectLinkSelector
                                        initialValue={imageData.link_to_obj}
                                        onLinkSelected={obj =>
                                          handleLinkObjChanged(obj, idx)
                                        }
                                        placeholder="请选择跳转到的页面"
                                      />
                                    </div>
                                    {/* <div className="module__item">
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
                                            handleFormDataChange(
                                              e,
                                              "cut_position",
                                              idx
                                            )
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
                                    </div> */}
                                    <div className="module__item">
                                      <div className="t14 mb-8 module__title">
                                        标题
                                        <ColorPicker
                                          position="left-bottom"
                                          name="title_color"
                                          defaultColor={imageData.title_color}
                                          onChange={(name, rgb) =>
                                            handleColorChange(name, rgb, idx)
                                          }
                                        />
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
                                        <ColorPicker
                                          position="left-bottom"
                                          name="sub_title_color"
                                          defaultColor={
                                            imageData.sub_title_color
                                          }
                                          onChange={(name, rgb) =>
                                            handleColorChange(name, rgb, idx)
                                          }
                                        />
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
                                        <ColorPicker
                                          position="left-bottom"
                                          name="button_text_color"
                                          defaultColor={
                                            imageData.button_text_color
                                          }
                                          onChange={(name, rgb) =>
                                            handleColorChange(name, rgb, idx)
                                          }
                                        />
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
                                    <div className="module__item">
                                      <div className="t14 mb-8 btn-style-row">
                                        <span>按钮展示</span>
                                        <RadioGroup
                                          className="radio-group"
                                          name="button_variant"
                                          value={imageData.button_variant}
                                          onChange={e =>
                                            handleImageDataChange(e, idx)
                                          }
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
                                    <div className="module__item">
                                      <div className="t14 mb-8 module__title">
                                        按钮背景&边框色
                                        <ColorPicker
                                          name="button_bg_and_border_color"
                                          position="left-top"
                                          defaultColor={
                                            imageData.button_bg_and_border_color
                                          }
                                          onChange={(name, rgb) =>
                                            handleColorChange(name, rgb, idx)
                                          }
                                        />
                                      </div>
                                    </div>
                                    <FontSizeSelector
                                      title="标题字号"
                                      type="title"
                                      value={imageData.title_size}
                                      handleSelector={e =>
                                        handleImageDataChange(
                                          e,
                                          idx,
                                          "title_size"
                                        )
                                      }
                                    />
                                    <FontSizeSelector
                                      title="副标题字号"
                                      value={imageData.sub_title_size}
                                      handleSelector={e =>
                                        handleImageDataChange(
                                          e,
                                          idx,
                                          "sub_title_size"
                                        )
                                      }
                                    />
                                    <div className="module__item">
                                      <div className="t14 mb-8 title-only-one-row">
                                        标题全大写
                                        <Switch
                                          checked={imageData.title_uppercase}
                                          onChange={(e, checked) =>
                                            handleImageCheckChange(
                                              e,
                                              checked,
                                              idx
                                            )
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
                                          checked={
                                            imageData.sub_title_uppercase
                                          }
                                          onChange={(e, checked) =>
                                            handleImageCheckChange(
                                              e,
                                              checked,
                                              idx
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
                                          checked={imageData.button_uppercase}
                                          onChange={(e, checked) =>
                                            handleImageCheckChange(
                                              e,
                                              checked,
                                              idx
                                            )
                                          }
                                          color="primary"
                                          name="button_uppercase"
                                          inputProps={{
                                            "aria-label": "primary checkbox"
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div className="module__item">
                                      <div className="t14 mb-8">
                                        文字&按钮位置
                                      </div>
                                      <CommonSelection 
                                        name="text_and_button_position"
                                        title=""
                                        value={imageData.text_and_button_position} 
                                        onChage={(name,value)=>handleSelectChange(name,value,idx)}
                                        options={textButtonPosition}
                                      ></CommonSelection>
                                    </div>
                                  </div>
                                </div>
                                {
                                  !!(formData.blocks && formData.blocks.length > 1) && 
                                  <div
                                    className="delete-row"
                                    onClick={() => handleDeleteBlock(idx)}
                                  >
                                      <DeleteIcon /> 删除内容
                                  </div>
                                }
                                
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
            {formData.blocks && formData.blocks.length < 5 && (
              <div className="module-detail pt-20">
                <div className="module__item">
                  <div className="append-block-btn" onClick={handleAddBlock}>
                    <AddIcon className="pr-6" />
                    添加内容
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselImages;
