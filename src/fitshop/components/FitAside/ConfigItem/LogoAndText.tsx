// 图标文字
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
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
import ImagePickerLoad from "@src/common/components/ImagePicker/ImagePickerLoad";

import InitData4LogoAndText from "./initialConfiguration/logoAndText";
import { LogoAndTextFormDataType } from "./types/ConfigItemTypes";
import FontSizeSelector from "./widgets/FontSizeSelector";
import getStyle from "@src/utils/dndLockAxis";
import useUpdateEffect from "@src/hooks/useUpdateEffect";

const settingKeys = Object.keys(InitData4LogoAndText.settings);

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
  }),{ name: "LogoAndText" }
);

interface LogoAndTextProps {
  section: {
    [key: string]: any;
  };
  sectionStamp: string | number;
}

const LogoAndText: React.FC<LogoAndTextProps> = props => {
  const { sectionStamp, section, onChange } = props;
  const classes = useStyles();

  const data: LogoAndTextFormDataType = {};
  Object.assign(data, section.settings);
  data.name = section.name;
  data.blocks = section.blocks;
  const [formData, setFormData] = useState<LogoAndTextFormDataType>(data);

  // 更改当前配置项
  const handleFormDataChange = (e: any, targetName?: string) => {
    const name = targetName || e.target.name;
    setFormData({
      ...formData,
      [name]: e.target.value
    });
  };

  // 更改每一个图片的配置
  const handleblockDataChange = (
    e: any,
    blockIndex?: number,
    targetName?: string
  ) => {
    const name = targetName || e.target.name;
    if (name == "modle_height") {
      formData[name] = Number(e.target.value);
    } else {
      const blockData = {
        ...formData.blocks[blockIndex],
        [name]: e.target.value
      };
      formData.blocks[blockIndex] = blockData;
    }
    setFormData({ ...formData });
  };

  const handleImagePickerEnsure = (picUrl: string, blockIndex?: number) => {
    formData.blocks[blockIndex].image_src = picUrl;
    setFormData({ ...formData });
  };

  const handleAddBlock = () => {
    const newblockData = {
      ...InitData4LogoAndText.blocks[0],
      id: Math.round(Math.random() * 10000)
    }; // 写死的初始数据
    formData.blocks.push(newblockData);
    setFormData({ ...formData });
  };
  const handleDeleteBlock = (blockIndex?: number) => {
    formData.blocks.splice(blockIndex, 1);
    setFormData({ ...formData });
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
  function handleChangeAttr(e, name) {
    switch (name) {
      case "title_size":
      case "text_size":
        {
          for (let i = 0; i < formData.blocks.length; i += 1) {
            formData.blocks[i][name] = e.target.value;
          }
        }
        break;
      case "title_uppercase":
      case "text_uppercase":
        formData[name] = e.target.checked;
        break;
      case "modle_height":
        formData[name] = e.target.value;
        break;
    }
    setFormData({ ...formData });
  }
  const handleRemoveImage = idx => {
    const data = { ...formData };
    delete data.blocks[idx].image_src;
    setFormData({ ...data });
  };
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
                defaultColor={(formData as any).logo_text_color}
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
                defaultColor={(formData as any).module_bg_color}
                onChange={handleColorChange}
              />
            </div>
          </div>
        </div>
        <div className="module-detail border-bottom-1px pt-20">
          <div className="t16 pl-16 pb-16">布局</div>
          <div className="module__item">
            <FormControl
              size="small"
              variant="outlined"
              className={classes.formControl}
            >
              <Select
                name="title_size"
                value={formData.logo_position}
                onChange={e => handleFormDataChange(e, "logo_position")}
              >
                <MenuItem value={"logo_left"}>图标居左</MenuItem>
                <MenuItem value={"logo_top"}>图标居上</MenuItem>
              </Select>
            </FormControl>
          </div>
          <FontSizeSelector
            title="标题字号"
            type="title"
            value={formData.title_size || (formData.blocks[0] && formData.blocks[0].title_size)}
            handleSelector={e => handleFormDataChange(e, "title_size")}
          />
          <FontSizeSelector
            title="正文字号"
            value={formData.text_size || (formData.blocks[0] && formData.blocks[0].text_size)}
            handleSelector={e => handleFormDataChange(e, "text_size")}
          />
          <div className="module__item">
            <div className="t14 mb-8 title-only-one-row">
            标题色
              <ColorPicker
                position="left-bottom"
                name="title_color"
                defaultColor={(formData as any).title_color}
                onChange={handleColorChange}
              />
            </div>
          </div>
          <div className="module__item">
            <div className="t14 mb-8 title-only-one-row">
            正文色
              <ColorPicker
                position="left-bottom"
                name="sub_title_color"
                defaultColor={(formData as any).sub_title_color}
                onChange={handleColorChange}
              />
            </div>
          </div>
          <div className="module__item">
            <div className="t14 mb-8 title-only-one-row">
              标题全大写
              <Switch
                checked={(formData as any).title_uppercase}
                onChange={e => handleChangeAttr(e, "title_uppercase")}
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
              正文全大写
              <Switch
                checked={(formData as any).text_uppercase}
                onChange={e => handleChangeAttr(e, "text_uppercase")}
                color="primary"
                name="text_uppercase"
                inputProps={{
                  "aria-label": "primary checkbox"
                }}
              />
            </div>
          </div>
          {/* <div className="module__item">
            <div className="t14 mb-8 module__title">模块高度</div>
            <FormControl
              size="small"
              variant="outlined"
              className={classes.formControl}
            >
              <Select
                name="text_size"
                value={(formData as any).modle_height}
                onChange={e => handleChangeAttr(e, "modle_height")}
              >
                <MenuItem value={"big"}>大</MenuItem>
                <MenuItem value={"middle"}>中</MenuItem>
                <MenuItem value={"small"}>小</MenuItem>
              </Select>
            </FormControl>
          </div> */}
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
                                  <Icon name="iconkeyidong" /> 内容 {idx + 1}
                                </div>
                              </AccordionSummary>
                              <AccordionDetails
                                className={classes.accordionDetail}
                              >
                                <div className="s_b-box pl-16 pr-16 pt-8">
                                  <div className="image-setup">
                                    <div className="module__item">
                                      <div className="t14 mb-8">上传图标</div>
                                      <div
                                        className="pic-upload site-logo-container"
                                        style={{ position: "relative" }}
                                      >
                                        <ImagePickerLoad
                                          key={get(blockData, "image_src")}
                                          classNames="image-picker-small-wrapper"
                                          initialImgSrc={get(
                                            blockData,
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
                                        <div className="t12 mt-8">建议尺寸：100 * 100px</div>
                                        {blockData.image_src && (
                                          <DeleteIcon
                                            onClick={() =>
                                              handleRemoveImage(idx)
                                            }
                                          />
                                        )}
                                      </div>
                                    </div>
                                    <div className="module__item">
                                      <div className="t14 mb-8 module__title">
                                        标题
                                      </div>
                                      <TextField
                                        fullWidth
                                        name="title"
                                        value={blockData.title}
                                        onChange={e =>
                                          handleblockDataChange(e, idx)
                                        }
                                        size="small"
                                        placeholder="主标题"
                                        variant="outlined"
                                      />
                                    </div>
                                    <div className="module__item">
                                      <div className="t14 mb-8 module__title">
                                        正文
                                      </div>
                                      <TextField
                                        fullWidth
                                        name="text"
                                        value={blockData.text}
                                        onChange={e =>
                                          handleblockDataChange(e, idx)
                                        }
                                        size="small"
                                        placeholder="正文"
                                        variant="outlined"
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
        {formData.blocks && formData.blocks.length < 4 && (
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
  );
};

export default LogoAndText;
