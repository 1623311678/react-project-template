import React, { useState, useEffect } from "react";
import ColorPicker from "@src/common/components/ColorPicker";
import TextField from "@material-ui/core/TextField";
import data from '../../ConfigItem/initialConfiguration/global/CartConfig'
import useDebounce from "@src/hooks/useDebounce";
import Switch from "@material-ui/core/Switch";
import Slider from '@material-ui/core/Slider';

// 这里取一下最新的设置项,以免后期有删改时,旧数据无法正常更新


interface CartConfigProps {
  section?: {
    name?: string,
    settings?: {
      [key: string]: any;
    }
  };
  sectionStamp?: string | number
  onChange?:any
}

const CartConfig: React.FC<CartConfigProps> = ({section = {}, onChange}) => {
  const [formData, setFormData] = useState<any>(()=>{
    return {
      ...data.settings,
      ...section.settings
    }
  });

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
    let name = targetName || e.target.name;
    setFormData({
      ...formData,
      [name]: e.target.value
    });
  };
  const handleFormDataUpdate = (v,key) => {
    setFormData({
      ...formData,
      [key]: v
    });
  }
  const handleFormCheckChange = (e, checked:boolean) => {
    let name = e.target.name
    setFormData({
      ...formData,
      [name]: checked
    });
  }
  const triggerSave = useDebounce(()=>{
      const data = {
        name: "cartConfig",
        settings: {}
      };
      
      Object.keys(formData).forEach(k=>{
          data.settings[k] = formData[k]
      })

    onChange('cartConfig', { ...data })
  }, 500);

  useEffect(() => {
    triggerSave()
  }, [formData])

  return (
    <div className="config-item-wrapper">
      <div className="module">
        <div className="module-detail pt-20 border-bottom-1px">
          <div className="t16 pl-16 pb-16" onClick={triggerSave}>购物车</div>
          <div className="module__item mb0">
            <div className="t14 mb-8 title-only-one-row">
                购物车相关推荐
                <Switch
                checked={formData.switchRecommend}
                onChange={handleFormCheckChange}
                color="primary"
                name="switchRecommend"
                inputProps={{ "aria-label": "primary checkbox" }}
                />
            </div>
          </div>
          {
            formData.switchRecommend&&
            <>
              <div className="module__item">
                <div className="t14 mb-8">标题</div>
                <TextField 
                  name="title" 
                  size="small" 
                  fullWidth
                  value={formData.title}
                  onChange={handleFormDataChange}
                  placeholder={ formData.title }
                  variant="outlined" />
              </div>
              <div className="module__item mb-8">
                  <div className="t14  module__title">
                  标题颜色
                  <ColorPicker
                      name="titleColor"
                      position="left-bottom"
                      defaultColor={formData.titleColor}
                      onChange={handleColorChange}
                  />
                  </div>
              </div>
              <div className="module__item">
                  <div className="t14 mb-8">产品展示数量</div>
                  <div className="slider-wrapper">
                      <div className="s">
                          <Slider valueLabelDisplay="auto"
                          min={1} max={6} name="QuantityOfGoods"
                          value={formData.QuantityOfGoods}
                          onChange={(e, v) => handleFormDataUpdate(v, 'QuantityOfGoods')} />
                      </div>
                      <div className="tip">{formData.QuantityOfGoods}</div>
                  </div>
              </div>
            </>
          }
          <div className="module__item mb-8">
              <div className="t14  module__title">
              Checkout 按钮颜色
              <ColorPicker
                  name="checkoutBackColor"
                  position="left-bottom"
                  defaultColor={formData.checkoutBackColor}
                  onChange={handleColorChange}
              />
              </div>
          </div>
          <div className="module__item mb-8">
              <div className="t14  module__title">
              Checkout 字体颜色
              <ColorPicker
                  name="checkoutFontColor"
                  position="left-bottom"
                  defaultColor={formData.checkoutFontColor}
                  onChange={handleColorChange}
              />
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartConfig;
