import React, { useState, useEffect, useCallback, useMemo } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { get } from "lodash";
import Slider from '@material-ui/core/Slider';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ColorPicker from "@src/common/components/ColorPicker";
import Switch from "@material-ui/core/Switch";
import data from '../../ConfigItem/initialConfiguration/global/commodity'
import useDebounce from "@src/hooks/useDebounce";
import AttrFilter from '../components/AttrFilter'
import { allCollectionOptions } from "@src/api/collections";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import layout_1JPG from "@assets/images/config-items/global-product-layout-1.png"
import layout_2JPG from "@assets/images/config-items/global-product-layout-2.png"
import layout_3JPG from "@assets/images/config-items/global-product-layout-3.png"

import { CommonSelection } from "../../ConfigItem/components/common/CommonSelection";
import { hoverAnimationOptions } from "../../ConfigItem/components/common/CommonSelection/Constant";


// 这里取一下最新的设置项,以免后期有删改时,旧数据无法正常更新

import Events from "@src/common/Events"

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
    type: {
      width: "30% !important",
      height: "90px !important"     
    }
  }),{ name: "commodity" }
);

interface commodityProps {
    section?: {
        [key: string]: any;
        settings?: {
          [key: string]: any;
        }
      };
    sectionStamp?: string | number
}

const commodity: React.FC<commodityProps> = ({section = {}, onChange}) => {
  const classes = useStyles();
  const [attrFilter, setAttrFilter] = useState({});
  const [useImageOptions, setUseImageOptions] = useState({});
  const [formData, setFormData] = useState<any>(()=>({
        ...data.settings,
        ...section.settings
    }));
  /**
  * ColorPicker 颜色发生改变时的处理函数
  *
  * @param name 该元素在 formData 中的 key
  * @param rgb ColorPicker 返回的颜色描述对象
  */
  const handleColorChange = (name: string, rgb: object) => {
    setFormData({ ...formData, [name]: rgb });
  }
  const handleFormDataChange = (e:any, targetName?:string) => {
    const name = targetName || e.target.name;

    console.log(name,'name')
    console.log(e.target.value,'e.target.value')
    setFormData({
      ...formData,
      [name]: e.target.value
    });
  };

  const handleImageLayoutTypeChanged = (
    layoutType: "triangle" | "round" | "square"
  ) => {
    setFormData({
      ...formData,
      image_layout_type: layoutType
    });
  };

  const handleFormDataUpdate = (v,key) => {
    setFormData({
      ...formData,
      [key]: v
    });
  }
  const handleFormCheckChange = (e, checked:boolean) => {
    const name = e.target.name
    setFormData({
      ...formData,
      [name]: checked
    });
  }

  const handleLinkObjChanged = obj => {
    setFormData({
      ...formData,
      link_to_obj: obj
    })
  }

  const handleImagePickerEnsure = (picUrl: string) => {
    setFormData({ ...formData, image_src: picUrl });
  };
  const getAttrFilter = async function(){
    const attrFilter = {};
    const res = await allCollectionOptions()
    // 由于 allCollectionOptions 接口返回的数据结构已发生变化，因此此处进行处理，和之前保持一致
    const options = get(res, 'data.allCollectionOptions.options', []);
    console.log(options, 111111111);
    options.forEach(item => {
      attrFilter[item] = [];
    });
    setAttrFilter(attrFilter);
  }
  const triggerSave = useDebounce(()=>{
    const data = {
    name: "commodity",
    settings: {}
    };
    Object.keys(formData).forEach(k=>{
    data.settings[k] = formData[k]
    })

    onChange('commodity', { ...data });
  }, 500);
  const CreatUseImageOptions=function(){
      if (Object.keys(attrFilter).length>0) {
        const obj = {}
        formData.UseImageOptions.forEach(item => {
            obj[item]=attrFilter[item]
        });
        setUseImageOptions(obj)
      }
  }
  const updataUseImageOptions=function(value:any){
    
    setFormData({
        ...formData,
        UseImageOptions: Object.keys(value)
      })
  }
  const handleSelectChange = (name,value) => {
    const newFormData:any={
      ...formData,
      [name]: value
    }
    setFormData(newFormData);
  };
  useEffect(() => {
    triggerSave()
  }, [formData])
  useEffect(() => {
    CreatUseImageOptions()
  }, [formData.UseImageOptions,attrFilter])
  useEffect(()=>{
    getAttrFilter()
  },[])
  return (
    <div className="config-item-wrapper">
        <div className="module">
            <div className="module-detail pt-20 border-bottom-1px">
                <div className="t16 pl-16 pb-16" onClick={triggerSave}>通用</div>
                <div className="border-bottom-1px">
                    <div className="module__item mb0">
                        <div className="t14 mb-8 title-only-one-row">
                            原价
                            <Switch
                            checked={formData.Original}
                            onChange={handleFormCheckChange}
                            color="primary"
                            name="Original"
                            inputProps={{ "aria-label": "primary checkbox" }}
                            />
                        </div>
                    </div>
                    {/* <div className="module__item">
                        <div className="t14 mb-8 title-only-one-row">
                            评论星级
                            <Switch
                            checked={formData.StarReview}
                            onChange={handleFormCheckChange}
                            color="primary"
                            name="StarReview"
                            inputProps={{ "aria-label": "primary checkbox" }}
                            />
                        </div>
                    </div> */} 
                    
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
                </div>
                <div className="module__item mb0">
                    <div className="t14 mb-8 title-only-one-row">
                        折扣角标
                        <Switch
                        checked={formData.DiscountCornerMark}
                        onChange={handleFormCheckChange}
                        color="primary"
                        name="DiscountCornerMark"
                        inputProps={{ "aria-label": "primary checkbox" }}
                        />
                    </div>
                </div>
                <div className="module__item">
                    <div className="t14 mb-8">展示方式</div>
                    <div className="image-layout-types">
                        <div
                            className={`type ${classes.type} ${formData.image_layout_type ===
                            "triangle" && "selected"}`}
                            onClick={() => handleImageLayoutTypeChanged("triangle")}
                        >
                            <img src={layout_1JPG} alt="" />
                        </div>
                        <div
                            className={`type ${classes.type} ${formData.image_layout_type ===
                            "round" && "selected"}`}
                            onClick={() => handleImageLayoutTypeChanged("round")}
                        >
                            <img src={layout_2JPG} alt="" />
                        </div>
                        <div
                            className={`type ${classes.type} ${formData.image_layout_type ===
                            "square" && "selected"}`}
                            onClick={() => handleImageLayoutTypeChanged("square")}
                        >
                            <img src={layout_3JPG} alt="" />
                        </div>
                    </div>
                </div>
                <div className="module__item">
                    <div className="t14 mb-8">角标位置</div>
                    <FormControl size="small" variant="outlined" className={classes.formControl}>
                        <Select
                            value={formData.CornerMarkPosition}
                            name="CornerMarkPosition"
                            onChange={e => handleFormDataChange(e, "CornerMarkPosition")}
                        >
                            <MenuItem value={"left"}>居左</MenuItem>
                            <MenuItem value={"right"}>居右</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="module__item mb0">
                    <div className="t14 mb-8 title-only-one-row">
                        展示百分比
                    <Switch
                            checked={formData.DiscountCornerMarkWithPercentage}
                            onChange={handleFormCheckChange}
                            color="primary"
                            name="DiscountCornerMarkWithPercentage"
                            inputProps={{ "aria-label": "primary checkbox" }}
                        />
                    </div>
                </div>
                <ColorPicker name="CornerBackgroundColor" 
                position='bottom'
                defaultColor={ formData.CornerBackgroundColor } 
                title="角标背景色" 
                onChange={ handleColorChange } />
                <ColorPicker name="CornerTextColor" 
                position='bottom'
                defaultColor={ formData.CornerTextColor } 
                title="角标文字色" 
                onChange={ handleColorChange } />
               {/* <div className="module__item">
                    <div className="t14 mb-8">角标样式</div>
                    <FormControl size="small" variant="outlined" className={classes.formControl}>
                        <Select
                            value={formData.AngleOfTheStyle}
                            name="AngleOfTheStyle"
                            onChange={e => handleFormDataChange(e, "AngleOfTheStyle")}
                        >
                            <MenuItem value={"rectangle"}>长方形</MenuItem>
                            <MenuItem value={"trigon"}>三角形</MenuItem>
                            <MenuItem value={"round"}>圆形</MenuItem>
                        </Select>
                    </FormControl>
                </div>*/}
                
                <div className="module__item mb0">
                    <div className="t14 mb-8 title-only-one-row">
                        显示属性值 开关
                        <Switch
                        checked={formData.ShowAttributeValues}
                        onChange={handleFormCheckChange}
                        color="primary"
                        name="ShowAttributeValues"
                        inputProps={{ "aria-label": "primary checkbox" }}
                        />
                    </div>
                </div>
            </div>
            <div className="module-detail pt-20 border-bottom-1px">
                {/* <div className="module__item mb0">
                    <div className="t14 mb-8 title-only-one-row">
                        SKU 详情信息
                        <Switch
                        checked={formData.SKUInfo}
                        onChange={handleFormCheckChange}
                        color="primary"
                        name="SKUInfo"
                        inputProps={{ "aria-label": "primary checkbox" }}
                        />
                    </div>
                </div> */}
                <div className="module__item mb0">
                    <div className="t14 mb-8 title-only-one-row">
                        库存
                        <Switch
                        checked={formData.Stock}
                        onChange={handleFormCheckChange}
                        color="primary"
                        name="Stock"
                        inputProps={{ "aria-label": "primary checkbox" }}
                        />
                    </div>
                </div>
                {/* <div className="module__item mb0">
                    <div className="t14 mb-8 title-only-one-row">
                        销量
                        <Switch
                        checked={formData.Sales}
                        onChange={handleFormCheckChange}
                        color="primary"
                        name="Sales"
                        inputProps={{ "aria-label": "primary checkbox" }}
                        />
                    </div>
                </div> */}
                {/* <div className="module__item mb0">
                    <div className="t14 mb-8 title-only-one-row">
                        副标题
                        <Switch
                        checked={formData.Subhead}
                        onChange={handleFormCheckChange}
                        color="primary"
                        name="Subhead"
                        inputProps={{ "aria-label": "primary checkbox" }}
                        />
                    </div>
                </div> */}
                <div className="module__item mb0">
                    <div className="t14 mb-8 title-only-one-row">
                        数量选择框
                        <Switch
                        checked={formData.QuantitySelectionBox}
                        onChange={handleFormCheckChange}
                        color="primary"
                        name="QuantitySelectionBox"
                        inputProps={{ "aria-label": "primary checkbox" }}
                        />
                    </div>
                </div>
                {/* <div className="module__item mb0">
                    <div className="t14 mb-8 title-only-one-row">
                        展示Customize
                        <Switch
                        checked={formData.ShowCustomize}
                        onChange={handleFormCheckChange}
                        color="primary"
                        name="ShowCustomize"
                        inputProps={{ "aria-label": "primary checkbox" }}
                        />
                    </div>
                </div> */}
                
                <div className="module__item mb0">
                    <div className="t14 mb-8 title-only-one-row">
                        展示 QUICK VIEW
                        <Switch
                        checked={formData.ShowQuickView}
                        onChange={handleFormCheckChange}
                        color="primary"
                        name="ShowQuickView"
                        inputProps={{ "aria-label": "primary checkbox" }}
                        />
                    </div>
                </div>
            </div>
            <div className="module-detail pt-20 border-bottom-1px">
                <div className="t16 pl-16 pb-16">Add to cart 按钮</div>
                <div className="module__item mb-8">
                    <div className="t14  title-only-one-row">
                        展示
                        <Switch
                        checked={formData.ShowAddToCard}
                        onChange={handleFormCheckChange}
                        color="primary"
                        name="ShowAddToCard"
                        inputProps={{ "aria-label": "primary checkbox" }}
                        />
                    </div>
                </div>
                {formData.ShowAddToCard
                &&<>
                    <div className="module__item mb-8">
                        <div className="t14  module__title">
                        文本颜色
                        <ColorPicker
                            name="AddToCardFontColor"
                            position="left-bottom"
                            defaultColor={formData.AddToCardFontColor}
                            onChange={handleColorChange}
                        />
                        </div>
                    </div>
                    <div className="module__item mb-0">
                        <div className="t14  module__title">
                        按钮背景&边框色
                        <ColorPicker
                            name="AddToCardColor"
                            position="left-bottom"
                            defaultColor={formData.AddToCardColor}
                            onChange={handleColorChange}
                        />
                        </div>
                    </div>
                    <div className="t14  btn-style-row pl-24 pr-16 mb-8">
                            <div>按钮</div>
                            <div>
                                <RadioGroup
                                className="radio-group"
                                name="AddToCardType"
                                value={ formData.AddToCardType }
                                onChange={ (e, v) => {
                                handleFormDataUpdate(v, 'AddToCardType');
                                }}>
                                    <FormControlLabel value="1" control={<Radio name="1" />} label="填充" />
                                    <FormControlLabel value="2" control={<Radio name="2" />} label="边框" />
                                </RadioGroup>
                            </div>
                    </div>
                    <div className="module__item mb-16">
                        <div className="t14 mb-8">点击</div>
                        <FormControl size="small" variant="outlined" className={classes.formControl}>
                            <Select
                                value={formData.clickAddToCard}
                                name="clickAddToCard"
                                onChange={e => handleFormDataChange(e, "clickAddToCard")}
                            >
                                <MenuItem value={"toCart"}>跳转到cart页</MenuItem>
                                <MenuItem value={"notTaken"}>不跳转</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </>}
            </div>
            <div className="module-detail pt-20 border-bottom-1px">
                <div className="t16 pl-16 pb-16">Buy now 按钮</div>
                {/* <div className="module__item mb-0">
                    <div className="t14  title-only-one-row">
                        展示
                        <Switch
                        checked={formData.ShowBuyNow}
                        onChange={handleFormCheckChange}
                        color="primary"
                        name="ShowBuyNow"
                        inputProps={{ "aria-label": "primary checkbox" }}
                        />
                    </div>
                </div> */}
                {/* {formData.ShowBuyNow
                &&<> */}
                    <div className="module__item mb-8">
                        <div className="t14  module__title">
                            文本颜色
                            <ColorPicker
                                name="BuyNowFontColor"
                                position="left-bottom"
                                defaultColor={formData.BuyNowFontColor}
                                onChange={handleColorChange}
                            />
                        </div>
                    </div>
                    <div className="module__item mb-0">
                        <div className="t14  module__title">
                        按钮背景&边框色
                        <ColorPicker
                            name="BuyNowColor"
                            position="left-bottom"
                            defaultColor={formData.BuyNowColor}
                            onChange={handleColorChange}
                        />
                        </div>
                    </div>
                    <div className="t14 mb-8 btn-style-row pl-24 pr-16">
                        <div>按钮</div>
                        <div>
                            <RadioGroup
                            className="radio-group"
                            name="BuyNowType"
                            value={ formData.BuyNowType }
                            onChange={ (e, v) => {
                            handleFormDataUpdate(v, 'BuyNowType');
                            }}>
                                <FormControlLabel value="1" control={<Radio name="1" />} label="填充" />
                                <FormControlLabel value="2" control={<Radio name="2" />} label="边框" />
                            </RadioGroup>
                        </div>
                    </div>
                   
                {/* </>} */}
            </div>
            <div className="module-detail pt-20 border-bottom-1px">
                <div className="t16 pl-16 pb-16">More payment options 按钮</div>
                <div className="module__item mb-8">
                    <div className="t14  title-only-one-row">
                        展示
                        <Switch
                        checked={formData.ShowMorePaymentOptions}
                        onChange={handleFormCheckChange}
                        color="primary"
                        name="ShowMorePaymentOptions"
                        inputProps={{ "aria-label": "primary checkbox" }}
                        />
                    </div>
                </div>
                {formData.ShowMorePaymentOptions
                &&
                <div className="module__item mb-8">
                    <div className="t14  module__title">
                        字体色
                        <ColorPicker
                        name="MorePaymentOptionsColor"
                        position="left-bottom"
                        defaultColor={formData.MorePaymentOptionsColor}
                        onChange={handleColorChange}
                        />
                    </div>
                </div>
                }
            </div>
            <div className="module-detail pt-20 border-bottom-1px">
                <div className="t16 pl-16 pb-16">一起购买加购按钮</div>
                <div className="module__item mb-8">
                    <div className="t14  module__title">
                    文本颜色
                    <ColorPicker
                        name="AddSelectedToCardFontColor"
                        position="left-bottom"
                        defaultColor={formData.AddSelectedToCardFontColor}
                        onChange={handleColorChange}
                    />
                    </div>
                </div>
                <div className="module__item mb-0">
                    <div className="t14  module__title">
                    按钮背景&边框色
                    <ColorPicker
                        name="AddSelectedToCardColor"
                        position="left-bottom"
                        defaultColor={formData.AddSelectedToCardColor}
                        onChange={handleColorChange}
                    />
                    </div>
                </div>
                <div className="t14  btn-style-row pl-24 pr-16 mb-8">
                        <div>按钮</div>
                        <div>
                            <RadioGroup
                            className="radio-group"
                            name="AddSelectedToCardType"
                            value={ formData.AddSelectedToCardType }
                            onChange={ (e, v) => {
                            handleFormDataUpdate(v, 'AddSelectedToCardType');
                            }}>
                                <FormControlLabel value="1" control={<Radio name="1" />} label="填充" />
                                <FormControlLabel value="2" control={<Radio name="2" />} label="边框" />
                            </RadioGroup>
                        </div>
                </div>
            </div>
            <div className="module-detail mb0 pt-20 border-bottom-1px">
                <div className="t16 pl-16 pb-16">属性展示样式</div>
                <div className="module__item mb0">
                    <div className="t14 mb-8 title-only-one-row">
                        属性展示色块
                        <Switch
                        checked={formData.buttonColorBlock}
                        onChange={handleFormCheckChange}
                        color="primary"
                        name="buttonColorBlock"
                        inputProps={{ "aria-label": "primary checkbox" }}
                        />
                    </div>
                </div>
                <div className="module__item mb0">
                    <div className="t14 mb-8 title-only-one-row">
                        属性展示图片
                    </div>
                    <div className='mb-8'>
                        <AttrFilter data={attrFilter} filters={useImageOptions} onChange={
                            (key,value)=>{
                                updataUseImageOptions(value)
                            }
                        } />
                    </div>
                </div>
            </div>
            <div className="module-detail pt-20 border-bottom-1px">
                <div className="t16 pl-16 pb-16">产品列表</div>
                <div className="module__item">
                    <div className="t14 mb-8">产品列表图片尺寸</div>
                    <FormControl size="small" variant="outlined" className={classes.formControl}>
                        <Select
                            value={formData.ProductListPicture}
                            name="ProductListPicture"
                            onChange={e => handleFormDataChange(e, "ProductListPicture")}
                        >
                            <MenuItem value={"equal"}>1:1</MenuItem>
                            <MenuItem value={"TwoToThree"}>2:3</MenuItem>
                            <MenuItem value={"ThreeToFour"}>3:4</MenuItem>
                            <MenuItem value={"auto"}>自适应</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="t14  btn-style-row pl-24 pr-16 mb-8">
                    颜色筛选
                    <Switch
                        checked={formData.ProductColorChoose}
                        onChange={handleFormCheckChange}
                        color="primary"
                        name="ProductColorChoose"
                        inputProps={{ "aria-label": "primary checkbox" }}
                    />
                </div>
                <CommonSelection 
                    name="hover_effect"
                    title="滑过效果"
                    value={formData.hover_effect||'hoverZoomOut'} 
                    onChage={(name,value)=>handleSelectChange(name,value)}
                    options={hoverAnimationOptions}
                ></CommonSelection>
                <div className="module__item">
                    <div className="t14 mb-8">展示排数</div>
                    <div className="slider-wrapper">
                        <div className="s">
                            <Slider valueLabelDisplay="auto"
                            min={3} max={10} name="ShowProductBay"
                            value={formData.ShowProductBay}
                            onChange={(e, v) => handleFormDataUpdate(v, 'ShowProductBay')} />
                        </div>
                        <div className="tip">{formData.ShowProductBay} 排</div>
                    </div>
                </div>
                <div className="module__item">
                    <div className="t14 mb-8">每排产品数</div>
                    <div className="slider-wrapper">
                        <div className="s">
                            <Slider valueLabelDisplay="auto"
                            min={3} max={5} name="ShowProductNum"
                            value={formData.ShowProductNum}
                            onChange={(e, v) => handleFormDataUpdate(v, 'ShowProductNum')} />
                        </div>
                        <div className="tip">{formData.ShowProductNum} 个</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default commodity;
