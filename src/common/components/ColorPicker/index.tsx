/**
 * 通用的两栏布局的颜色选取功能模块
 *
 * @param title 左侧显示的标题文案
 * @param name 该 <ColorPicker> 在 formData 中对应的 key，
 *             用于更改颜色后由 onChange 同步到 formData 中
 * @param position 控制颜色面板的位置，默认为 top
 * @param defaultColor 默认颜色，如果提供了，则在初始化 <ColorPicker> 时使用
 * @param onChange 更改颜色时的处理函数
 */

import React, { CSSProperties, useEffect, useState } from "react";
import { ChromePicker } from "react-color";
import Icon from "@src/common/components/Icon";
import classnames from "classnames";
import IconColorPickerShadow from "@assets/images/config-items/icon-color-picker-shadow.png";
import "./index.scss";

interface Props {
  title?: string;
  name?: string;
  position?: "top" | "bottom" | "left" | "right" | "left-bottom" | "left-top";
  defaultColor?: {
    r: number | string;
    g: number | string;
    b: number | string;
    a: number | string;
  };
  style?: CSSProperties;
  onChange: (name: string, rgb: object, arg2?: any) => void;
}

const ColorPicker: React.FC<Props> = props => {
  const { title, name, position = "top", style, onChange } = props;
  const innerDefaultColor = { r: 255, g: 255, b: 255, a: 1 };
  const [color, setColor] = useState(props.defaultColor || innerDefaultColor);
  const [isShowPicker, setIsShowPicker] = useState(false);

  const handleClickPreview = () => {
    setIsShowPicker(!isShowPicker);
  };

  const handleClosePicker = () => {
    setIsShowPicker(false);
  };

  const handleColorChange = ({ rgb }) => {
    setColor(rgb);
    onChange(name, rgb);
  };
  useEffect(()=>{
    if(props.defaultColor){
      setColor(props.defaultColor)
    }else{
      setColor(innerDefaultColor)
    }
  },[props.defaultColor])

  return (
    <div className={`fpp-color-picker-container ${title && "module__item"}`} >
      <div className="t14 mb-8 title-only-one-row">
        {title}
        <div className="fpp-color-picker">
          <div className="color-preview-container" onClick={handleClickPreview}>
            <img src={IconColorPickerShadow} alt="" />
            <Icon
              name="iconcaise"
              color={`rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`}
            />
          </div>
          {isShowPicker && (
            <div className="cover" onClick={handleClosePicker} />
          )}
          {isShowPicker && (
            <div
              className={classnames(
                "popover",
                `color-picker-position-${position}`
              )}
              contenteditable="true"
              style={{...style, caretColor: 'transparent', cursor:'pointer'}}>
              <ChromePicker color={color} onChange={handleColorChange} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
