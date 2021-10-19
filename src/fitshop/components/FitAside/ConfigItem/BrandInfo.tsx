// 品牌信息
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import ColorPicker from "@src/common/components/ColorPicker";
import ProjectLinkSelector from "@src/common/components/ProjectLinkSelector";
import InitData4BrandInfo from "../ConfigItem/initialConfiguration/brandInfoData";

import { BrandInfoFormData } from "./types/ConfigItemTypes";
import useDebounce from "@src/hooks/useDebounce";
import FontSizeSelector from "./widgets/FontSizeSelector";
import ImagePickerLoad from "@src/common/components/ImagePicker/ImagePickerLoad";
import { get } from "lodash";
import { CommonSelection } from './components/common/CommonSelection'
import useUpdateEffect from "@src/hooks/useUpdateEffect";

const mobileTextOptions = [
  {
    key: "top",
    value: "图上方"
  },
  {
    key: "bottom",
    value: "图下方"
  }
];

// 这里取一下最新的设置项,以免后期有删改时,旧数据无法正常更新
const settingKeys = Object.keys(InitData4BrandInfo.settings);

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
    textArea: {
      width: "100%",
      height: "40px",
      borderColor: "#BDBDBD",
      borderRadius: "4px",
      backgroundColor: "#FFFFFF"
    }
  }),{ name: "BrandInfo" }
);

interface BrandInfoProps {
  section: {
    [key: string]: any;
  };
  sectionStamp: string | number;
}

const textPositionList = [
  {
    label: "上左",
    value: "top_left"
  },
  {
    label: "上中",
    value: "top_center"
  },
  {
    label: "上右",
    value: "top_right"
  },
  {
    label: "居左",
    value: "left"
  },
  {
    label: "居中",
    value: "center"
  },
  {
    label: "居右",
    value: "right"
  },
  {
    label: "下左",
    value: "bottom_left"
  },
  {
    label: "下中",
    value: "bottom_center"
  },
  {
    label: "下右",
    value: "bottom_right"
  }
];

const BrandInfo: React.FC<BrandInfoProps> = props => {
  const { sectionStamp, section, onChange } = props;
  const classes = useStyles();
  const data: BrandInfoFormData = {};
  data.name = section.name;
  Object.assign(data, section.settings);

  const [formData, setFormData] = useState<BrandInfoFormData>(data);

  const handleFormDataChange = (e: any, targetName?: string) => {
    const name = targetName || e.target.name;
    setFormData({
      ...formData,
      [name]: e.target.value
    });
  };
  const handleFormCheckChange = (e, checked: boolean) => {
    const name = e.target.name;
    setFormData({
      ...formData,
      [name]: checked
    });
  };

  const handleColorChange = (name: string, rgb: object) => {
    setFormData({ ...formData, [name]: rgb });
  };

  const handleLinkObjChanged = obj => {
    setFormData({
      ...formData,
      link_to_obj: {
        ...obj,
        key_map: "id,featured_image,handle,title"
      }
    });
  };

  const handleImagePickerEnsure = (picUrl: string) => {
    setFormData({ ...formData, image_src: picUrl });
  };
  function handleSelectChange(name, value) {
    const newFormData: any = {
      ...formData,
      [name]: value
    };
    setFormData(newFormData);
  }
  const triggerSave = useDebounce(() => {
    const data = JSON.parse(JSON.stringify(section));
    data.name = formData.name;
    data.blocks = formData.blocks;

    if (get(formData, "link_to_obj.id") !== undefined) {
      formData.link_to_obj = {
        ...formData.link_to_obj,
        key_map: "id,featured_image,handle,title"
      };
    }

    settingKeys.forEach(key => {
      data.settings[key] = formData[key];
    });
    onChange(sectionStamp, { ...data });
  }, 500);

  useUpdateEffect(() => {
    triggerSave();
  }, [formData]);

  return (
    <div className="config-item-wrapper">
      <div className="module">
        <div className="module-info">
          <div className="module__item">
            <div className="t14 mb-8 module__title">
              模块标题
              <ColorPicker
                position="left-bottom"
                name="logo_text_color"
                defaultColor={formData.logo_text_color}
                onChange={handleColorChange}
              />
            </div>
            <TextField
              size="small"
              name="name"
              fullWidth
              value={formData.name}
              onChange={handleFormDataChange}
              placeholder={formData.name}
              variant="outlined"
            />
          </div>
          <div className="module__item">
            <div className="t14 mb-8 module__title">
              模块背景色
              <ColorPicker
                name="module_bg_color"
                position="left-bottom"
                defaultColor={formData.module_bg_color}
                onChange={handleColorChange}
              />
            </div>
          </div>
        </div>
        <div className="module-detail pt-20">
          <div className="t16 pl-16 pb-16">图片</div>
          <div className="module__item">
            <div className="t14 mb-8">图文布局</div>
            <FormControl
              size="small"
              variant="outlined"
              className={classes.formControl}
            >
              <Select
                value={formData.image_text_layout}
                name="image_text_layout"
                onChange={e => handleFormDataChange(e, "image_text_layout")}
              >
                <MenuItem value={"image_left_and_text_right"}>
                  左图右文
                </MenuItem>
                <MenuItem value={"image_right_and_text_left"}>
                  右图左文
                </MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="module__item">
            <div className="t14 mb-8">文字显示位置</div>
            <FormControl
              size="small"
              variant="outlined"
              className={classes.formControl}
            >
              <Select
                name="text_direction"
                value={formData.text_direction ? formData.text_direction : "top_right"}
                onChange={e => handleFormDataChange(e, "text_direction")}
              >
                {textPositionList.map(fp => (
                  <MenuItem value={fp.value}>
                    {fp.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <CommonSelection
            name="mobile_text_position"
            title="移动端文本展示方式"
            value={formData.mobile_text_position || "top"}
            onChage={(name, value) => handleSelectChange(name, value)}
            options={mobileTextOptions}
          ></CommonSelection>

          <div className="module__item">
            <div className="t14 mb-8">上传图片</div>
            <ImagePickerLoad
              classNames="image-picker-wrapper"
              initialImgSrc={formData.image_src}
              onEnsure={url => {
                const { imageUrl } = url;
                handleImagePickerEnsure(imageUrl);
              }}
              modalType="image"
            />
            <div className="t12 mt-8">建议尺寸：436 * 630px</div>
          </div>
          <div className="module__item">
            <div className="t14 mb-8">图片高度</div>
            <FormControl
              size="small"
              variant="outlined"
              className={classes.formControl}
            >
              <Select
                value={formData.image_height}
                name="image_height"
                onChange={e => handleFormDataChange(e, "image_height")}
              >
                <MenuItem value={"large"}>大</MenuItem>
                <MenuItem value={"medium"}>中</MenuItem>
                <MenuItem value={"small"}>小</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="module__item">
            <div className="t14 mb-8">截取位置</div>
            <FormControl
              size="small"
              variant="outlined"
              className={classes.formControl}
            >
              <Select
                value={formData.cut_position}
                name="cut_position"
                onChange={e => handleFormDataChange(e, "cut_position")}
              >
                <MenuItem value={"top"}>上</MenuItem>
                <MenuItem value={"center"}>中</MenuItem>
                <MenuItem value={"bottom"}>下</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="module__item">
            <div className="t14 mb-8">链接</div>
            <ProjectLinkSelector
              initialValue={formData.link_to_obj}
              onLinkSelected={handleLinkObjChanged}
              placeholder="选择商品或者系列链接"
            />
          </div>
          <div className="module__item">
            <div className="t14 mb-8 module__title">
              标题
              <ColorPicker
                position="left-bottom"
                name="title_color"
                defaultColor={formData.title_color}
                onChange={handleColorChange}
              />
            </div>
            <TextField
              fullWidth
              name="title"
              value={formData.title}
              onChange={handleFormDataChange}
              size="small"
              placeholder="主标题"
              variant="outlined"
            />
          </div>
          <div className="module__item">
            <div className="t14 mb-8 module__title">
              副标题
              <ColorPicker
                position="left-bottom"
                name="sub_title_color"
                defaultColor={formData.sub_title_color}
                onChange={handleColorChange}
              />
            </div>
            <TextareaAutosize
              className={classes.textArea}
              name="sub_title"
              value={formData.sub_title}
              onChange={handleFormDataChange}
              placeholder="副标题"
              rowsMin={2}
              rowsMax={4}
            />
          </div>
          <div className="module__item">
            <div className="t14 mb-8 module__title">
              按钮文字
              <ColorPicker
                position="left-bottom"
                name="button_text_color"
                defaultColor={formData.button_text_color}
                onChange={handleColorChange}
              />
            </div>
            <TextField
              fullWidth
              name="button_label"
              value={formData.button_label}
              onChange={handleFormDataChange}
              size="small"
              placeholder="按钮文字"
              variant="outlined"
            />
          </div>
          <div className="module__item">
            <div className="t14 mb-8 btn-style-row">
              <span>按钮展示</span>
              <RadioGroup
                className="radio-group"
                name="button_variant"
                value={formData.button_variant}
                onChange={handleFormCheckChange}
              >
                <FormControlLabel
                  value="fill"
                  control={<Radio />}
                  label="填充"
                />
                <FormControlLabel
                  value="outlined"
                  control={<Radio />}
                  label="边框"
                />
              </RadioGroup>
            </div>
          </div>
          <div className="module__item">
            <div className="t14 mb-8 module__title">
              按钮背景&边框色
              <ColorPicker
                name="button_bg_and_border_color"
                position="left-top"
                defaultColor={formData.button_bg_and_border_color}
                onChange={handleColorChange}
              />
            </div>
          </div>
          <FontSizeSelector
            title="标题字号"
            type="title"
            value={formData.title_size}
            handleSelector={e => handleFormDataChange(e, "title_size")}
          />
          <FontSizeSelector
            title="副标题字号"
            value={formData.sub_title_size}
            handleSelector={e => handleFormDataChange(e, "sub_title_size")}
          />

          <div className="module__item">
            <div className="t14 mb-8 title-only-one-row">
              标题全大写
              <Switch
                checked={formData.title_uppercase}
                onChange={handleFormCheckChange}
                color="primary"
                name="title_uppercase"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            </div>
          </div>
          <div className="module__item">
            <div className="t14 mb-8 title-only-one-row">
              副标题全大写
              <Switch
                checked={formData.sub_title_uppercase}
                onChange={handleFormCheckChange}
                color="primary"
                name="sub_title_uppercase"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            </div>
          </div>
          <div className="module__item">
            <div className="t14 mb-8 title-only-one-row">
              按钮全大写
              <Switch
                checked={formData.button_uppercase}
                onChange={handleFormCheckChange}
                color="primary"
                name="button_uppercase"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandInfo;
