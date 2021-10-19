import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import ColorPicker from "@src/common/components/ColorPicker";

import TextField from "@material-ui/core/TextField";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Events from "@src/common/Events"
import useDebounce from "@src/hooks/useDebounce";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import Switch from "@material-ui/core/Switch";

import { ProductDetailFormDataType } from "./types/ConfigItemTypes";

import layout_1JPG from "@assets/images/config-items/collection-layout-1.jpg"
import layout_2JPG from "@assets/images/config-items/collection-layout-2.jpg"

import InitData4ProductDetail from "./initialConfiguration/productDetailData"

import ModalInner from "@src/common/components/ModalInner"
import { getCollectionsList } from "@src/api/collections"
import Icon from "@src/common/components/Icon";
const layoutPlaceholder = [{
  imgUrl: layout_1JPG,
  label: 'layout_1JPG'
}, {
  imgUrl: layout_2JPG,
  label: 'layout_2JPG'
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

interface ProductDetailProps {
  section: {
    [key: string]: any;
    settings: object
  };
  sectionStamp: string | number

}
const ProductDetail: React.FC<ProductDetailProps> = props => {
  const { section } = props;

  console.log(section , 'collection section')
  const classes = useStyles();

  const data = {}
  Object.assign(data, section.settings)

  const [formData, setFormData] = useState<ProductDetailFormDataType>(section);

  const [showModal, setShowModal] = useState(false)
  const [ProductDetail, setProductDetail] = useState([])
  const [collectionSelected, setCollectionSelected] = useState([])
  const [editingCollectionIndex, setEditingCollectionIndex] = useState(null)

  const handleDeleteBlock = (blockIndex?: number) => {
    formData.blocks.splice(blockIndex, 1)
    setFormData({ ...formData, blocks: formData.blocks })
  }

  const handleAddBlock = () => {
    const newblockData = InitData4ProductDetail.blocks[0] //写死的初始数据
    formData.blocks.push(newblockData)
    setFormData({ ...formData })
  }

  const handleToggle = (col) => () => {
    const {id} = col
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
  const updageBlocks = ()=>{
    let collection = null
    for (let i = 0; i < ProductDetail.length; i++){
      if (ProductDetail[i].id == collectionSelected[0]){
        collection = ProductDetail[i]
        break;
      }
    }
    
    formData.blocks[editingCollectionIndex].collection = collection
    setFormData({ 
      ...formData, 
      blocks: formData.blocks
    })
    setShowModal(false)
  }
  const handleEditCollection = (idx) => {
    setEditingCollectionIndex(idx)
    setShowModal(true)
  }
  const triggerSave = useDebounce(() => {
    const data = JSON.parse(JSON.stringify(section));
    data.name = formData.name;
    data.blocks = formData.blocks;
    console.log(data,' data, ----')
    return
    Events.trigger("theme:update", { data, sectionStamp: props.sectionStamp })
  }, 500);
  const handleFormDataChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleLayoutTypeChanged = (layoutType: 'layout_1JPG' | 'layout_2JPG') => {
    setFormData({
      ...formData,
      layout_type: layoutType
    })
  }
  
  useEffect(() => {
    triggerSave()
  }, [formData])

  useEffect(()=>{
    getCollectionsList().then(({data}) => {
      let arr = []
      let nodes = data.collections.edges;
      nodes.map(item => {
        arr.push(item.node);
      });
      setProductDetail(arr);
    })
  }, [])
  return (
    <div className="config-item-wrapper">
      <div className="module-info border-bottom-1px">
        <div className="module__item">
          <div className="t14 mb-8">模块标题</div>
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
              <Icon name="iconcaise" />
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
                  className={`type t2_1 ${formData.layout_type == lp.label && 'selected'}`}
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
        {
          formData.layout_type == 'layout_2JPG' && 
          <div className="module__item">
            <div className="t14 mt-10 module__title">
              卡片背景色
              <Icon name="iconcaise" />
            </div>
          </div>
        }
        
      </div>
      <div className="module-detail pt-20 relative">
        <div className="adding-wrapper pl-24 pr-24">
          {formData.blocks && formData.blocks.map((s_b,idx) => {
            return (
              <Accordion key={idx}>
                <AccordionSummary
                  className={classes.accordionTitle}
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                >
                  系列列表{idx}
                </AccordionSummary>
                <AccordionDetails className={classes.accordionDetail}>
                  <div className="s_b-box">
                    <div className="ml-12 mr-12 mt-20">
                      {s_b.collection 
                        ? <div className="collection-r"> {s_b.collection.title} </div>
                        : <div className="append-block-btn mb-10" onClick={() => handleEditCollection(idx)}><AddIcon className="pr-6" />添加系列</div>
                      }
                    </div>
                  </div>
                  <div className="delete-row" onClick={() => handleDeleteBlock(idx)}><DeleteIcon />  删除内容</div>
                </AccordionDetails>
              </Accordion>
            )
          })}
          <div className="module-detail pt-20">
            <div className="module__item">
              <div className="append-block-btn" onClick={handleAddBlock}><AddIcon className="pr-6" />添加内容</div>
            </div>
          </div>
        </div>
        <ModalInner 
          cancelcb={()=> setShowModal(false)}
          okcb={updageBlocks}
          initialShow={showModal}>
          <List>
            {ProductDetail.map((col)=>{
              return (
                <ListItem key={col.id} role={undefined} dense button onClick={handleToggle(col)}>
                  <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={collectionSelected.indexOf(col.id) !== -1}
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText primary={col.title} />
              </ListItem>
              )
            })}
          </List>
        </ModalInner>
      </div>
    </div>
  );
};

export default ProductDetail;
