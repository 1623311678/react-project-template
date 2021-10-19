import React from "react";
import Switch from "@material-ui/core/Switch";
import ColorPicker from "@src/common/components/ColorPicker";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  spaceBetween: {
    display: "flex",
    justifyContent: "space-between"
  }
});

interface RecommendProps {
  data?: {
    bgColor?: any;
    textColor?: string;
    showDiscount?: boolean;
  };
  onChange: any;
}

const BgColor: React.FC<RecommendProps> = ({
  data: {
    showDiscount = true,
    bgColor = { r: 0, g: 0, b: 0, a: 1 }, //{r:249,g:249,b:249,a:1},
    textColor
  },
  onChange
}) => {
  const classes = useStyles();
  return (
    <div className="module-info border-bottom-1px">
      <div className="t16 pl-16 pb-16">订单摘要背景</div>
      <div className="module__item">
        <div className={`t14 mb-8 ${classes.spaceBetween}`}>
          <span>背景颜色</span>
          <ColorPicker
            position="left-bottom"
            name="bgColor"
            defaultColor={bgColor}
            onChange={(e, color) => {
              onChange(e, color);
            }}
          />
        </div>
      </div>
      <div className="module__item">
        <div className="t14 mb-8">
          文字颜色
          <RadioGroup
            row
            value={textColor || "dark"}
            onChange={e => {
              onChange("textColor", e.target.value);
            }}
          >
            <FormControlLabel
              value="dark"
              control={<Radio color="primary" />}
              label="深/原色"
            />
            <FormControlLabel
              value="simple"
              control={<Radio color="primary" />}
              label="浅色"
            />
          </RadioGroup>
        </div>
      </div>
      <div className="module__item">
        <div className="t14 mb-8 title-only-one-row">
          展示优惠码输入框
          <Switch
            checked={showDiscount || false}
            color="primary"
            name="showDiscount"
            inputProps={{ "aria-label": "primary checkbox" }}
            onChange={e => {
              onChange("showDiscount", e.target.checked);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BgColor;
