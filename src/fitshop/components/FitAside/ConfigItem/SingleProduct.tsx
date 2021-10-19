import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import useDebounce from "@src/hooks/useDebounce";
import Switch from "@material-ui/core/Switch";
import ColorPicker from "@src/common/components/ColorPicker";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import BusinessChoice from "@src/common/components/BusinessChoice";
import { makeAttributeCamel } from "@src/utils/underscore2camel"

import { SingleProductFormDataType } from "./types/ConfigItemTypes";
import InitData4SingleProduct from "./initialConfiguration/singleProduct"
import { get } from 'lodash';

import { getAllProducts } from "@src/api/products"
import FormControl from "@material-ui/core/FormControl";
import useUpdateEffect from "@src/hooks/useUpdateEffect";

import { CommonSelection } from "./components/common/CommonSelection";
import { hoverAnimationOptions } from "./components/common/CommonSelection/Constant";

const settingKeys = Object.keys(InitData4SingleProduct.settings)

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
  }),{ name: "SingleProduct" }
);


interface SingleProductProps {
  section: {
    [key: string]: any;
    settings?: object
  };
  sectionStamp: string | number

}
const SingleProduct: React.FC<SingleProductProps> = props => {
  const { sectionStamp, section, onChange } = props;
  const classes = useStyles();

  const data: SingleProductFormDataType = {}
  Object.assign(data, section.settings)
  data.name = section.name
  console.log(data, 'product section')

  const [formData, setFormData] = useState<SingleProductFormDataType>(data);


  const handleColorChange = (name: string, rgb: object) => {
    setFormData({ ...formData, [name]: rgb });
  }

  const handleSwitchChanged = (checked: boolean, key: string) => {
    console.log(checked, key);
    setFormData({
      ...formData,
      [key]: checked
    });
  }
  const triggerSave = useDebounce(() => {
    const data = JSON.parse(JSON.stringify(section));
    data.name = formData.name;

    settingKeys.forEach(key => {
      data.settings[key] = formData[key]
    })

    /**
     * 旧数据兼容处理，如果当前站点有 product 但是没有 link_to_obj，需要将 product 数据
     * 添加到 link_to_obj 中，方便后续使用 link_to_obj，然后将冗余的 product 数据删除
     */
    if (
      get(data, 'settings.product.id') &&
      !get(data, 'settings.link_to_obj.id')
    ) {
      data.settings.link_to_obj = {
        ...data.settings.product,
        type: 'product',
        key_map: 'id,title,featured_image',
      };
      delete data.settings.product;
    }

    /**
     * 旧输入更正处理
     * 如果有 link_to_obj，但是其中没有 type，则添加上 type
     */
    if (
      get(data, 'settings.link_to_obj') &&
      !get(data, 'settings.link_to_obj.type')
    ) {
      data.settings.link_to_obj.type = 'product';
    }

    onChange(sectionStamp, { ...data });
  }, 500);
  const handleFormDataChange = (e: any, targetName?: string) => {
    const name = targetName || e.target.name
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

  useUpdateEffect(() => {
    triggerSave()
  }, [formData])


  // 获取产品列表
  const getProductList = async (variables) => {
    variables.queryFilter = 'status:ACTIVE'
    const data = await getAllProducts(variables);
    const nodes = data.data.products.edges;
    const pageInfo = data.data.products.pageInfo;
    return {
      nodes: nodes.map(item => item.node),
      pageInfo,
      cursor: nodes.length ? nodes.pop().cursor : ""
    };
  };

  const updageBlocks = (payload) => {
    setFormData({
      ...formData,
      link_to_obj: { ...payload[0], key_map: 'id,title,featured_image', type: 'product' }
    });
  };
  const handleSelectChange = (name,value) => {
    const newFormData:any={
      ...formData,
      [name]: value
    }
    setFormData(newFormData);
  };

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
      </div>
      <div className="module-detail pt-20 relative">
        <div className="t16 pl-16 pb-16">产品</div>
        <div className="pl-24 pr-24">
          <BusinessChoice
            title="产品"
            defaultSelectedRows={
              formData.link_to_obj
                ? formData.link_to_obj instanceof Array
                  ? formData.link_to_obj
                  : [makeAttributeCamel(formData.link_to_obj)]
                : []
            }
            getlist={getProductList}
            handleSelect={updageBlocks}
          />
        </div>
        <ColorPicker name="productColor" 
        position='bottom'
        defaultColor={ formData.productColor } 
        title="产品名称色" 
        onChange={ handleColorChange } />
        <div className="module__item">
          <div className="t14 mb-8 title-only-one-row">
            显示售价
            <Switch
              checked={formData.show_price}
              onChange={(e, v) => handleSwitchChanged(v, 'show_price')}
              color="primary"
              name="show_price"
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          </div>
        </div>
        <ColorPicker name="priceColor" 
        position='bottom'
        defaultColor={ formData.priceColor } 
        title="售价色" 
        onChange={ handleColorChange } />
        <ColorPicker name="DiscountColor" 
        position='bottom'
        defaultColor={ formData.DiscountColor } 
        title="打折色" 
        onChange={ handleColorChange } />
        <ColorPicker name="originalColor" 
        position='bottom'
        defaultColor={ formData.originalColor } 
        title="原价色" 
        onChange={ handleColorChange } />
        <div className="module__item">
          <div className="t14 mb-8 title-only-one-row">
            显示属性
            <Switch
              checked={formData.show_attribute}
              onChange={(e, v) => handleSwitchChanged(v, 'show_attribute')}
              color="primary"
              name="show_attribute"
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          </div>
        </div>
        {/* <div className="module__item">
          <div className="t14 mb-8 title-only-one-row">
            显示描述
            <Switch
              checked={formData.show_description}
              onChange={(e, v) => handleSwitchChanged(v, 'show_description')}
              color="primary"
              name="show_description"
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          </div>
        </div> */}
        <div className="module__item">
          <div className="t14 mb-8 title-only-one-row">
            显示缩略图
            <Switch
              checked={formData.show_mini_pic}
              onChange={(e, v) => handleSwitchChanged(v, 'show_mini_pic')}
              color="primary"
              name="show_mini_pic"
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          </div>
        </div>

        <div className="module__item">
          <div className="t14 mb-8 title-only-one-row">
            首图不展示变体图
            <Switch
              checked={formData.noVariantImageFirst}
              onChange={(e, v) => handleSwitchChanged(v, 'noVariantImageFirst')}
              color="primary"
              name="noVariantImageFirst"
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          </div>
        </div>

        {/* <div className="module__item">
          <div className="t14 mt-10 module__title">
            文字色
              <ColorPicker name="fontcolor" position="left-bottom" defaultColor={formData.fontcolor||'rgba(34,34,34,1)'} onChange={handleColorChange} />
          </div>
        </div> */}
        <div className="t14 mb-8 btn-style-row pl-24 pr-16">
          <span>文字色</span>
          <RadioGroup
            className="radio-group"
            name="fontcolor"
            value={formData.fontcolor || 'black'}
            onChange={(e, v) => {
              handleSliderChange(v, 'fontcolor');
            }}>
            <FormControlLabel value="black" control={<Radio name="black" />} label="深色" />
            <FormControlLabel value="white" control={<Radio name="white" />} label="浅色" />
          </RadioGroup>
        </div>
        <div className="module__item mt-10">
          <div className="t14 mb-8">缩略图布局</div>
          <FormControl size="small" variant="outlined" className={classes.formControl}>
            <Select
              name="mini_pic_layout"
              value={formData.mini_pic_layout}
              onChange={e => handleFormDataChange(e, "mini_pic_layout")}
            >
              <MenuItem value={'left'}>居左</MenuItem>
              <MenuItem value={'right'}>居右</MenuItem>
              <MenuItem value={'bottom'}>居下</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="module__item mt-10">
          <div className="t14 mb-8">图文结构</div>
          <FormControl size="small" variant="outlined" className={classes.formControl}>
            <Select
              name="img_layout"
              value={formData.img_layout || 'left'}
              onChange={e => handleFormDataChange(e, "img_layout")}
            >
              <MenuItem value={'left'}>图片居左</MenuItem>
              <MenuItem value={'right'}>图片居右</MenuItem>
            </Select>
          </FormControl>
        </div>
        {/* 暂时让去掉了
         <div className="module__item mt-10">
          <div className="t14 mb-8">产品布局</div>
          <FormControl size="small" variant="outlined" className={classes.formControl}>
            <Select
              name="product_layout"
              value={formData.product_layout}
              onChange={e => handleFormDataChange(e, "product_layout")}
            >
              <MenuItem value={'image_left_and_text_right'}>左图右文</MenuItem>
              <MenuItem value={'image_right_and_text_left'}>右图左文</MenuItem>
            </Select>
          </FormControl>
        </div> */}
        {/* 暂时让去掉了
        <CommonSelection 
            name="hover_effect"
            title="滑过效果"
            value={formData.hover_effect||'hoverZoomOut'} 
            onChage={(name,value)=>handleSelectChange(name,value)}
            options={hoverAnimationOptions}
        ></CommonSelection> */}
        <div className="module__item">
          <div className="t14 mb-8 title-only-one-row">
            折扣角标标签
            <Switch
              checked={formData.show_discount_marker}
              onChange={(e, v) => handleSwitchChanged(v, 'show_discount_marker')}
              color="primary"
              name="show_discount_marker"
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
