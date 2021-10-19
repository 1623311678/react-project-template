import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
interface CommonButtonRadioProps {
  name: string;
  value: any;
  onChange(name, value): void;
  title: string;
  children?: React.ReactNode;
}
export function CommonButtonRadio(props: CommonButtonRadioProps) {
  const { name, value, onChange, title } = props;
  return (
    <div className="module__item">
      <div className="t14 mb-8 btn-style-row">
        <span>{title}</span>
        <RadioGroup
          className="radio-group"
          name={name}
          value={value}
          onChange={(e, value) => onChange(name, value)}
        >
          <FormControlLabel value="fill" control={<Radio />} label="填充" />
          <FormControlLabel value="outlined" control={<Radio />} label="边框" />
        </RadioGroup>
      </div>
    </div>
  );
}
