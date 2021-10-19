import React from "react";
import Switch from "@material-ui/core/Switch";
interface CommonButtonSwitchProps {
  name: string;
  value: any;
  onChange(name, value): void;
  title:string;
}
export function CommonButtonSwitch(props: CommonButtonSwitchProps) {
  const { name, value, onChange,title} = props;
  return (
    <div className="module__item">
    <div className="t14 mb-8 title-only-one-row">
      {title}
      <Switch
        checked={value}
        onChange={onChange}
        color="primary"
        name={name}
        inputProps={{ "aria-label": "primary checkbox" }}
      />
    </div>
  </div>
  );
}