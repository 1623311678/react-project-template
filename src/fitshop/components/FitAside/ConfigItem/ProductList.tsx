import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useDebounce from "@src/hooks/useDebounce";
import Switch from "@material-ui/core/Switch";
import Slider from '@material-ui/core/Slider';
import ColorPicker from "@src/common/components/ColorPicker";
import BusinessChoice from "@src/common/components/BusinessChoice";
import AdvancedProductSelector from "@src/common/components/AdvancedProductSelector";
import { makeAttributeCamel } from "@src/utils/underscore2camel"
import { get } from 'lodash';

import InitData4ProductList from "./initialConfiguration/productList"

import { ProductListFormDataType } from "./types/ConfigItemTypes";

import layout_2JPG from "@assets/images/config-items/productlist-layout-2.png"
import layout_1JPG from "@assets/images/config-items/productlist-layout-1.png"
import layout_3JPG from "@assets/images/config-items/productlist-layout-3.png"
import layout_4JPG from "@assets/images/config-items/productlist-layout-4.png"

import { getAllProducts } from "@src/api/products"
import FormControl from "@material-ui/core/FormControl";
import FontSizeSelector from "./widgets/FontSizeSelector";
import useUpdateEffect from "@src/hooks/useUpdateEffect";
import { CommonSelection } from "./components/common/CommonSelection";
import { hoverAnimationOptions } from "./components/common/CommonSelection/Constant";

const settingKeys = Object.keys(InitData4ProductList.settings)


const layoutPlaceholder = [
  {
    imgUrl: layout_2JPG,
    label: 'layout_2JPG'
  }, {
    imgUrl: layout_1JPG,
    label: 'layout_1JPG'
  },{
    imgUrl: layout_4JPG,
    label: 'layout_4JPG'
  },{
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

interface ProductListProps {
  section: {
    [key: string]: any;
    settings: object
  };
  sectionStamp: string | number

}
const ProductList: React.FC<ProductListProps> = props => {
  const { sectionStamp, section, onChange } = props;
  const [chooseType, setChoosseType] = useState('for_products')
  const [accordionExpanded, setAccordionExpanded] = useState(false)

  const classes = useStyles();

  const data: ProductListFormDataType = {}
  Object.assign(data, section.settings)
  data.name = section.name
  data.blocks = section.blocks

  console.log(section, 'product section')

  const [formData, setFormData] = useState<ProductListFormDataType>(data);

  const handleSwitchChanged = (checked: boolean, key: string) => {
    setFormData({
      ...formData,
      [key]: checked
    });
  }
  const triggerSave = useDebounce(() => {
    const data = JSON.parse(JSON.stringify(section));
    data.name = formData.name;
    data.blocks = formData.blocks

    settingKeys.forEach(key => {
      data.settings[key] = formData[key]
    })

    onChange(sectionStamp, { ...data });
  }, 500);
  const handleFormDataChange = (e: any, targetName?: string) => {
    let name = targetName || e.target.name
    setFormData({
      ...formData,
      [name]: e.target.value
    });
  };
  const handleSliderChange = (v, key) => {
    setFormData({
      ...formData,
      [key]: v
    });
  }

  const handleLayoutTypeChanged = (layoutType: 'layout_1JPG' | 'layout_2JPG' | 'layout_3JPG') => {
    setFormData({
      ...formData,
      layout_type: layoutType
    })
  }

  const handleColorChange = (name: string, rgb: object) => {
    setFormData({ ...formData, [name]: rgb });
  }
  const handleChooseTypeChanged = (e) => {
    e && e.stopPropagation(); 
    setChoosseType(e.target.value)
    setAccordionExpanded(true)
  }

  useUpdateEffect(() => {
    triggerSave()
  }, [formData])

  // 获取产品列表
  const getProductList = async (variables) => {
    variables.queryFilter = 'status:ACTIVE'
    let data = await getAllProducts(variables);
    let nodes = data.data.products.edges;
    let pageInfo = data.data.products.pageInfo;
    return {
      nodes: nodes.map(item => item.node),
      pageInfo: pageInfo,
      cursor: nodes.length ? nodes.pop().cursor : ""
    };
  };

  const updageBlocks = (payload) => {
    setFormData({
      ...formData,
      blocks: payload.map(p=>{
        return {
          link_to_obj: {
            id: p.id,
            title: p.title,
            handle: p.handle,
            featuredImage: p.featuredImage,
            type: p.type || 'product',
            key_map: 'id,featured_image,handle,title,variant,review_star,review_count',
          }
        }
      })
    });
  }
  function handleSelectChange(name,value){
    const newFormData:any={
      ...formData,
      [name]: value
    }
    setFormData(newFormData);
  }
  return (
    <div className="config-item-wrapper product-list-wrapper">
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
        {
          formData.layout_type === "layout_3JPG" && 
          <div className="module__item">
          <div className="t14 mt-10 module__title">
            卡片背景色
              <ColorPicker name="card_bg_color" position="left-bottom" defaultColor={formData.card_bg_color} onChange={handleColorChange} />
          </div>
        </div>
        }
        
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
        <CommonSelection 
              name="hover_effect"
              title="滑过效果"
              value={formData.hover_effect||'hoverZoomOut'} 
              onChage={(name,value)=>handleSelectChange(name,value)}
              options={hoverAnimationOptions}
          ></CommonSelection>
      </div>
      <div className="module-detail pt-20 relative">
        <div className="t16 pl-16 pb-16">产品</div>
        <div className="pl-24 pr-24">
          <Accordion
            expanded={accordionExpanded}
            onChange={(e, expanded) => {setAccordionExpanded(expanded)}}
          >
            <AccordionSummary
              className={classes.accordionTitle}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
            >
              
              <FormControl size="small" variant="outlined" className={classes.formControl}>
                <Select
                  name="chooseType"
                  value={chooseType}
                  onChange={(e) => handleChooseTypeChanged(e)}
                >
                  <MenuItem value={'for_products'}>选择产品</MenuItem>
                  <MenuItem value={'for_collection'}>按系列选择</MenuItem>
                </Select>
              </FormControl>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetail}>
              {chooseType === 'for_products' 
              ? 
                <BusinessChoice
                  title="产品"
                  check={true}
                  defaultSelectedRows={get(formData, 'blocks', []).map(item => makeAttributeCamel(item.link_to_obj))}
                  getlist={getProductList}
                  handleSelect={updageBlocks}
                  />
                :
                <AdvancedProductSelector
                  title="系列"
                  check={true}
                  defaultSelectedRows={get(formData, 'blocks', []).map(item => makeAttributeCamel(item.link_to_obj))}
                  getlist={getProductList}
                  handleSelect={updageBlocks}
                />
              }
            </AccordionDetails>
          </Accordion>
        </div>
        {/* <div className="module__item mt-10">
          <div className="t14 mb-8">排序</div>
          <FormControl size="small" variant="outlined" className={classes.formControl}>
            <Select
              name="sortRule"
              value={formData.sortRule}
              onChange={e => handleFormDataChange(e, "sortRule")}
            >
              <MenuItem value={'sales'}>销量</MenuItem>
              <MenuItem value={'updateAt'}>发布日期</MenuItem>
              <MenuItem value={'weight'}>权重</MenuItem>
            </Select>
          </FormControl>
        </div> */}
        {
          formData.layout_type !== "layout_3JPG" ?
            <div className="module__item mt-20">
              <div className="t14 mb-8">展示行数</div>
              <div className="slider-wrapper">
                <div className="s">
                  <Slider valueLabelDisplay="auto"
                    min={1} max={3} name="row_counts"
                    value={formData.row_counts}
                    onChange={(e, v) => handleSliderChange(v, 'row_counts')} />
                </div>
                <div className="tip">{formData.row_counts}行</div>
              </div>
            </div>:null
        }
        <div className={formData.layout_type !== "layout_3JPG"?"module__item":"module__item mt-20"}>
          <div className="t14 mb-8">{formData.layout_type !== "layout_3JPG"?"每行产品数":"最多展示产品数"} </div>
          {
            formData.layout_type !== "layout_3JPG"?
            <div className="slider-wrapper">
              <div className="s">
                <Slider valueLabelDisplay="auto" min={3} max={5} name="product_count_per_row" value={formData.product_count_per_row} onChange={(e, v) => handleSliderChange(v, 'product_count_per_row')} aria-labelledby="continuous-slider" />
              </div>
              <div className="tip">{formData.product_count_per_row}个</div>
            </div>
            :
            <div className="slider-wrapper">
              <div className="s">
                <Slider valueLabelDisplay="auto" min={2} max={6} name="product_layout_count_per_row" value={formData.product_layout_count_per_row} onChange={(e, v) => handleSliderChange(v, 'product_layout_count_per_row')} aria-labelledby="continuous-slider" />
              </div>
              <div className="tip">{formData.product_layout_count_per_row || 3}个</div>
          </div>
          }
         
          
        </div>
        <FontSizeSelector
          title="产品名称字号"
          value={formData.product_title_size}
          handleSelector={e => handleFormDataChange(e, "product_title_size")}
        />
        <FontSizeSelector
          title="价格字号"
          value={formData.price_size}
          handleSelector={e => handleFormDataChange(e, "price_size")}
        />
        <div className="module__item mt-10">
          <div className="t14 mb-8">产品名称&价格位置</div>
          <FormControl size="small" variant="outlined" className={classes.formControl}>
            <Select
              name="position_of_title_and_price"
              value={formData.position_of_title_and_price}
              onChange={e => handleFormDataChange(e, "position_of_title_and_price")}
            >
              <MenuItem value={'center'}>居中</MenuItem>
              <MenuItem value={'left'}>居左</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="module__item">
          <div className="t14 mt-10 module__title">
            产品名称色
              <ColorPicker name="product_name_color" position="left-bottom" defaultColor={formData.product_name_color} onChange={handleColorChange} />
          </div>
        </div>
        <div className="module__item">
          <div className="t14 mt-10 module__title">
            售价色
              <ColorPicker name="discount_price_color" position="left-bottom" defaultColor={formData.discount_price_color} onChange={handleColorChange} />
          </div>
        </div>
        <div className="module__item">
          <div className="t14 mt-10 module__title">
            原价色
              <ColorPicker name="origin_price_color" position="left-bottom" defaultColor={formData.origin_price_color} onChange={handleColorChange} />
          </div>
        </div>
        <div className="module__item">
          <div className="t14 mt-10 module__title">
            打折色
              <ColorPicker name="bargain_price_color" position="left-bottom" defaultColor={formData.bargain_price_color} onChange={handleColorChange} />
          </div>
        </div>
        <div className="module__item">
          <div className="t14 mb-8 title-only-one-row">
            显示"View All"
            <Switch
              checked={formData.show_view_all}
              onChange={(e, v) => handleSwitchChanged(v, 'show_view_all')}
              color="primary"
              name="show_view_all"
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          </div>
        </div>
        <div className="module__item">
          <div className="t14 mb-8 title-only-one-row">
            折扣角标标签
            <Switch
              checked={formData.show_discount_tip}
              onChange={(e, v) => handleSwitchChanged(v, 'show_discount_tip')}
              color="primary"
              name="show_discount_tip"
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
