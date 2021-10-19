import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ColorPicker from "@src/common/components/ColorPicker";
import useDebounce from "@src/hooks/useDebounce";
import { getCollectionsList } from "@src/api/collections";
import BusinessChoice from "@src/common/components/BusinessChoice";
import { get } from "lodash";
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { makeAttributeCamel } from "@src/utils/underscore2camel"

import InitData4CollectionDetailList from "./initialConfiguration/collectionDetailList";
import { CollectionDetailListFormDataType } from "./types/ConfigItemTypes";
import Icon from "@src/common/components/Icon";
import getStyle from "@src/utils/dndLockAxis";
import useUpdateEffect from "@src/hooks/useUpdateEffect";
import { CommonSelection } from './components/common/CommonSelection'
import { hoverAnimationOptions } from './components/common/CommonSelection/Constant'

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
  })
);

interface CollectionListProps {
  section: {
    [key: string]: any;
    settings: object;
  };
  sectionStamp: string | number;
}
const CollectionDetailList: React.FC<CollectionListProps> = props => {
  const { sectionStamp, section, onChange } = props;

  const classes = useStyles();

  const data = {};
  Object.assign(data, section.settings);
  data.blocks = section.blocks;
  data.name = section.name
  data.blocks.forEach(element => {
    if (element.link_to_obj) return

    if (element.collection && element.collection.id) {
      element.link_to_obj = {
        id: element.collection.id ? Number(element.collection.id) : 0,
        type: element.collection.type || 'collection',
        key_map: 'id,image,handle,title,products,review_star,review_count'
      }
    }
  });
  console.log(data, "collectiondetail1 section");

  const [formData, setFormData] = useState<CollectionDetailListFormDataType>(
    data
  );

  const handleDeleteBlock = (blockIndex?: number) => {
    formData.blocks.splice(blockIndex, 1);
    setFormData({ ...formData, blocks: formData.blocks });
  };

  const handleAddBlock = () => {
    const newblockData = { id: Math.round(Math.random() * 10000) }; // InitData4CollectionDetailList.blocks[0] //写死的初始数据
    formData.blocks.push(newblockData);
    setFormData({ ...formData });
  };

  const updageBlocks = (idx, collection) => {
    if (!collection[0]) {
      formData.blocks[idx].link_to_obj = {}
    } else {
      formData.blocks[idx].link_to_obj = {
        type: 'collection',
        id: collection[0].id,
        key_map: 'id,image,handle,title,products,review_star,review_count',
        ...collection[0],
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
      if (element.link_to_obj)return

      if (element.collection && element.collection.id) {
        element.link_to_obj = {
          id: element.collection.id ? Number(element.collection.id) : 0,
          type: element.collection.type || 'collection',
          key_map: 'id,image,handle,title,products,review_star,review_count'
        }
      }
    });

    settingKeys.forEach(key => {
      data.settings[key] = formData[key];
    });

    onChange(sectionStamp, { ...data });
  }, 500);
  const handleFormDataChange = (e, attribute_name) => {
    let name = attribute_name || e.target.name
    setFormData({
      ...formData,
      [name]: e.target.value
    });
  };

  const handleColorChange = (name: string, rgb: object) => {
    setFormData({ ...formData, [name]: rgb });
  };


  const handleDragEnd = result => {
    const startIndex = result.source.index;
    const endIndex = result.destination.index;
    const nextBlocks = Array.from(get(formData, "blocks", []));
    const [removed] = nextBlocks.splice(startIndex, 1);
    nextBlocks.splice(endIndex, 0, removed);

    setFormData({ ...formData, blocks: nextBlocks });
  };

  useUpdateEffect(() => {
    triggerSave();
  }, [formData]);

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
        <CommonSelection 
              name="hover_effect"
              title="滑过效果"
              value={formData.hover_effect||'hoverZoomOut'} 
              onChage={(name,value)=>handleSelectChange(name,value)}
              options={hoverAnimationOptions}
          ></CommonSelection>
        <div className="module__item">
          <div className="t14 mt-10 module__title">
            产品名称色
            <ColorPicker
              name="product_color"
              position="left-bottom"
              defaultColor={formData.product_color}
              onChange={handleColorChange}/>
          </div>
        </div>
      </div>
      <div className="module-detail pt-20 relative">
        {/* <FontSizeSelector
          title="产品名称字号"
          type="title"
          value={formData.product_title_size}
          handleSelector={e => handleFormDataChange(e, "product_title_size")}
        />
        <FontSizeSelector
          title="价格字号"
          value={formData.price_size}
          handleSelector={e => handleFormDataChange(e, "price_size")}
        />
        <div className="module__item">
          <div className="t14 mt-10 module__title">
            产品名称色
              <ColorPicker name="product_name_color" position="left-bottom" defaultColor={formData.product_name_color} onChange={handleColorChange} />
          </div>
        </div>
        <div className="module__item">
          <div className="t14 mt-10 module__title">
            原价色
              <ColorPicker name="origin_price_color" position="left-bottom" defaultColor={formData.price_color} onChange={handleColorChange} />
          </div>
        </div> */}
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
                                <Icon name="iconkeyidong" /> <div>系列列表 {idx + 1}</div>
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
          <div className="module-detail pt-20">
            <div className="module__item">
              <div className="append-block-btn" onClick={handleAddBlock}>
                <AddIcon className="pr-6" />
                添加内容
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionDetailList;
