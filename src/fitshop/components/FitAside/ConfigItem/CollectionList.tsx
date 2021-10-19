import layout_1JPG from "@assets/images/config-items/collection-layout-1.jpg"
import layout_2JPG from "@assets/images/config-items/collection-layout-2.jpg"
import layout_3JPG from "@assets/images/config-items/collection-layout-3.png"
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import Icon from "@src/common/components/Icon";
import { makeAttributeCamel } from "@src/utils/underscore2camel"

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ColorPicker from "@src/common/components/ColorPicker";
import useDebounce from "@src/hooks/useDebounce";
import { getCollectionsList } from "@src/api/collections"
import { get } from 'lodash';
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import BusinessChoice from "@src/common/components/BusinessChoice";

import InitData4CollectionList from "./initialConfiguration/collectionList"
import { CollectionListFormDataType } from "./types/ConfigItemTypes";
import getStyle from "@src/utils/dndLockAxis";
import useUpdateEffect from "@src/hooks/useUpdateEffect";
import { CommonSelection } from "./components/common/CommonSelection";
import { hoverAnimationOptions } from "./components/common/CommonSelection/Constant";


const settingKeys = Object.keys(InitData4CollectionList.settings)

const layoutPlaceholder = [{
  imgUrl: layout_1JPG,
  label: 'layout_1JPG'
}, {
  imgUrl: layout_2JPG,
  label: 'layout_2JPG'
}, {
  imgUrl: layout_3JPG,
  label: 'layout_3JPG'
}]
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
      marginRight: 0,
    },
    accordionDetail: {
      padding: 0,
      flexDirection: 'column'
    },
    accordionTitle: {
      background: '#F7F8F9'
    }
  })
);

interface CollectionListProps {
  section: {
    [key: string]: any;
    settings?: object
  };
  sectionStamp: string | number

}
const CollectionList: React.FC<CollectionListProps> = props => {
  const { sectionStamp, section, onChange } = props;
  
  const classes = useStyles();

  const data: CollectionListProps["section"] = {}
  Object.assign(data, section.settings)
  data.blocks = section.blocks
  data.name = section.name

  const [formData, setFormData] = useState<CollectionListFormDataType>(data);

  const [showModal, setShowModal] = useState(false)
  const [collectionList, setCollectionList] = useState([])
  const [collectionSelected, setCollectionSelected] = useState([])
  const [editingCollectionIndex, setEditingCollectionIndex] = useState(null)

  const handleDeleteBlock = (blockIndex?: number) => {
    formData.blocks.splice(blockIndex, 1)
    setFormData({ ...formData, blocks: formData.blocks })
  }

  const handleAddBlock = () => {
    const newblockData = { block_id: Math.round((Math.random() * 10000)) } // InitData4CollectionList.blocks[0] //写死的初始数据
    formData.blocks.push(newblockData)
    setFormData({ ...formData })
  }

  const handleToggle = (col) => () => {
    const { id } = col
    const currentIndex = collectionSelected.indexOf(id);
    let newList = [...collectionSelected];

    // 只能选一个
    if (currentIndex === -1) {
      // newList.push(id);
      newList = [id]
    } else {
      // newList.splice(currentIndex, 1);
      newList = []
    }
    setCollectionSelected(newList);
  };
  const handleAutoSlide = (e, checked: boolean) => {
    setFormData({
      ...formData,
      auto_slide: checked
    });
  }

  const handleEditCollection = (idx) => {
    setEditingCollectionIndex(idx)
    setShowModal(true)
  }
  const triggerSave = useDebounce(() => {
    const data = JSON.parse(JSON.stringify(section));
    data.name = formData.name;
    data.blocks = formData.blocks;

    data.blocks.forEach(element => {
      if (get(element, 'link_to_obj.id')) {
        element.link_to_obj = {
          ...element.link_to_obj,
          key_map: 'id,image,handle,title,total_products,review_star,review_count'
        }
      } else if (get(element, 'collection.id')) {
        element.link_to_obj = {
          ...element.collection,
          key_map: 'id,image,handle,title,total_products,review_star,review_count'
        }
      }
    });

    settingKeys.forEach(key => {
      data.settings[key] = formData[key]
    })

    onChange(sectionStamp, { ...data });
  }, 500);
  const handleFormDataChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleColorChange = (name: string, rgb: object) => {
    setFormData({ ...formData, [name]: rgb });
  }

  const handleLayoutTypeChanged = (layoutType: 'layout_1JPG' | 'layout_2JPG') => {
    setFormData({
      ...formData,
      layout_type: layoutType
    })
  }

  const handleSwitchChanged = (checked: boolean, key: string) => {
    setFormData({
      ...formData,
      [key]: checked
    });
  }

  const handleDragEnd = (result) => {
    const startIndex = result.source.index;
    const endIndex = result.destination.index;
    const nextBlocks = Array.from(get(formData, 'blocks', []));
    const [removed] = nextBlocks.splice(startIndex, 1);
    nextBlocks.splice(endIndex, 0, removed);

    setFormData({ ...formData, blocks: nextBlocks });
  }
  const handleSliderChange = (v, key) => {
    setFormData({
      ...formData,
      [key]: v
    });
  };

  useUpdateEffect(() => {
    triggerSave()
  }, [formData])

  // 获取系列列表
  const getCollectionList = async variables => {
    let data = await getCollectionsList(variables);
    let nodes = data.data.collections.edges;
    let pageInfo = data.data.collections.pageInfo;
    return {
      nodes: nodes.map(item => item.node),
      pageInfo: pageInfo,
      cursor: nodes.length ? nodes.pop().cursor : ""
    };
  };

  const updageBlocks = (idx, collection) => {
    formData.blocks[idx].link_to_obj = { 
      ...collection[0], 
      type: 'collection' ,
      key_map: 'id,image,handle,title,total_products,review_star,review_count'
    };
    setFormData({
      ...formData,
      blocks: formData.blocks
    });
  };
  function handleSelectChange(name,value){
    const newFormData:any={
      ...formData,
      [name]: value
    }
    setFormData(newFormData);
  }

  return (
    <div className="config-item-wrapper">
      <div className="module-info border-bottom-1px">
        <div className="module__item">
          <div className="t14 mb-8 module__title">模块标题
              <ColorPicker position="left-bottom" name="logo_text_color" defaultColor={formData.logo_text_color} onChange={handleColorChange} />
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
              <ColorPicker name="module_bg_color" position="left-bottom" defaultColor={formData.module_bg_color} onChange={handleColorChange} />
          </div>
        </div>
        <div className="module__item">
          <div className="t14 mt-10 module__title">
            系列名称色
              <ColorPicker name="series_test_color" position="left-bottom" defaultColor={formData.series_test_color} onChange={handleColorChange} />
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
      <div className="module-detail pt-20 border-bottom-1px">
        <div className="t16 pl-16 pb-16">展示方式</div>
        <div className="module__item">
          <div className="image-layout-types">
            {layoutPlaceholder.map(lp => {
              return (
                <div
                  key={lp.label}
                  className={`type t2_1 ${formData.layout_type == lp.label && 'selected'} product_list_type`}
                  onClick={() => handleLayoutTypeChanged(lp.label)}>
                  <img src={lp.imgUrl} alt="" />
                </div>
              )
            })}
          </div>
        </div>
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
        <CommonSelection 
              name="hover_effect"
              title="滑过效果"
              value={formData.hover_effect||'hoverZoomOut'} 
              onChage={(name,value)=>handleSelectChange(name,value)}
              options={hoverAnimationOptions}
          ></CommonSelection>
        {/* <div className="module__item">
            <div className="t14 mb-8 title-only-one-row">轮播时间</div>
            <div className="slider-wrapper">
              <div className="s">
                <Slider
                  valueLabelDisplay="auto"
                  min={2}
                  max={5}
                  name="slide_duration"
                  value={formData.slide_duration?formData.slide_duration:2}
                  onChange={(e, v) => handleSliderChange(v, "slide_duration")}
                />
              </div>
              <div className="tip">{formData.slide_duration?formData.slide_duration:2}秒</div>
            </div>
          </div> */}
        {
          formData.layout_type == 'layout_2JPG' &&
          <div className="module__item">
            <div className="t14 mt-10 module__title">
              卡片背景色
              <ColorPicker name="cart_background_color" position="left-bottom" defaultColor={formData.cart_background_color} onChange={handleColorChange} />
            </div>
          </div>
        }

      </div>
      <div className="module-detail pt-20 relative">
        <div className="adding-wrapper pl-24 pr-24">

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="droppable">

              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {
                    get(formData, 'blocks', []).map((s_b, idx) => (
                      <Draggable key={s_b.block_id} draggableId={`${s_b.block_id}`} index={idx}>
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
                                <Icon name="iconkeyidong" /> 系列 {idx + 1}
                              </div>
                              </AccordionSummary>
                              <AccordionDetails className={classes.accordionDetail}>
                                <div className="s_b-box">
                                  <div className="ml-12 mr-12 mt-20" onClick={() => handleEditCollection(idx)}>
                                    <BusinessChoice
                                      title="系列"
                                      defaultSelectedRows={
                                        s_b.link_to_obj
                                          ? s_b.link_to_obj instanceof Array
                                            ? s_b.link_to_obj
                                            : [makeAttributeCamel(s_b.link_to_obj)]
                                          : []
                                      }
                                      getlist={getCollectionList}
                                      handleSelect={payload =>
                                        updageBlocks(idx, payload)
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="delete-row" onClick={() => handleDeleteBlock(idx)}><DeleteIcon />  删除内容</div>
                              </AccordionDetails>
                            </Accordion>
                          </div>
                        )}
                      </Draggable>
                    ))
                  }
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <div className="module-detail pt-20">
            <div className="module__item">
              <div className="append-block-btn" onClick={handleAddBlock}><AddIcon className="pr-6" />添加内容</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionList;
