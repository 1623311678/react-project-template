import React from "react";
import Switch from "@material-ui/core/Switch";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ImagePickerLoad from "@src/common/components/ImagePicker/ImagePickerLoad";

import InputBase from "@material-ui/core/InputBase";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

const BootstrapInput = withStyles(theme => ({
  root: {
    width: "100%"
  },
  input: {
    borderRadius: 4,
    position: "relative",
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
    }
  }
}))(InputBase);

interface RecommendProps {
  data?: {
    showBanner?: boolean;
    bannerUrl?: string;
    bannerHeight?: string;
    imgPos?: string;
    bannerCover?: boolean;
    logoColor?: string;
  };
  onChange: any;
}

const AddImg: React.FC<RecommendProps> = ({
  data: { showBanner, bannerUrl, bannerHeight, imgPos, bannerCover, logoColor },
  onChange
}) => {
  return (
    <div className="module-info border-bottom-1px">
      <div className="t16 pl-16 pb-16">Banner设置</div>
      <div className="module__item">
        <div className="t14 mb-8 title-only-one-row">
          顶部单图
          <Switch
            checked={showBanner || false}
            color="primary"
            name="title_uppercase"
            inputProps={{ "aria-label": "primary checkbox" }}
            onChange={e => {
              onChange("showBanner", e.target.checked);
            }}
          />
        </div>
      </div>
      {showBanner && (
        <>
          <div className="module__item">
            <div className="t14 mb-8">上传图片</div>
            <ImagePickerLoad
              classNames="image-picker-wrapper"
              initialImgSrc={bannerUrl || ""}
              onEnsure={url => {
                const { imageUrl } = url;
                onChange("bannerUrl", imageUrl);
              }}
              modalType="image"
            />
            <div className="t12 mt-8">建议尺寸：1920*667px，高度可自适应</div>
          </div>
          <div className="module__item">
            <div className="t14 mb-8">图片高度</div>
            <div>
              <TextField
                name="bannerHeight"
                type="number"
                size="small"
                fullWidth
                value={bannerHeight || "400"}
                onChange={e => {
                  onChange("bannerHeight", e.target.value);
                }}
                variant="outlined"
              />
            </div>
          </div>
          <div className="module__item">
            <div className="t14 mb-8">截取位置</div>
            <div>
              <Select
                value={imgPos || "top"}
                input={<BootstrapInput />}
                onChange={e => {
                  onChange("imgPos", e.target.value);
                }}
              >
                <MenuItem value={"top"}>上</MenuItem>
                <MenuItem value={"center"}>中</MenuItem>
                <MenuItem value={"bottom"}>下</MenuItem>
              </Select>
            </div>
          </div>
          <div className="module__item">
            <div className="t14 mb-8 title-only-one-row">
              宽度铺满整屏
              <Switch
                checked={bannerCover || false}
                color="primary"
                name="title_uppercase"
                inputProps={{ "aria-label": "primary checkbox" }}
                onChange={e => {
                  onChange("bannerCover", e.target.checked);
                }}
              />
            </div>
          </div>
          {/* <div className="module__item">
            <div className="t14 mb-8 title-only-one-row">
              Logo
              <RadioGroup
                row
                defaultValue={logoColor || "1"}
                onChange={e => {
                  onChange("logoColor", e.target.value);
                }}
              >
                <FormControlLabel
                  value="1"
                  control={<Radio color="primary" />}
                  label="深/原色"
                />
                <FormControlLabel
                  value="2"
                  control={<Radio color="primary" />}
                  label="浅色"
                />
              </RadioGroup>
            </div>
          </div> */}
        </>
      )}
    </div>
  );
};

export default AddImg;
