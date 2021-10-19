import React from "react";
import ColorPicker from "@src/common/components/ColorPicker";
interface CommonColorPickerProps {
  name: string;
  value: any;
  onChange(name, value): void;
  title:string;
  position?:any;
  children?:React.ReactNode
}
export function CommonColorPicker(props: CommonColorPickerProps) {
  const { name, value, onChange, position="left-bottom",title,children } = props;
  return (
    <div className="module__item">
    <div className="t14 mb-8 module__title">
      {title}
      <ColorPicker
        position={position}
        name={name}
        defaultColor={value}
        onChange={onChange}
      />
    </div>
    {children}
  </div>
  );
}