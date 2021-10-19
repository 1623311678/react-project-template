import React, { useState, useEffect, useCallback, useMemo } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import ColorPicker from "@src/common/components/ColorPicker";

import { SubscribeEmailFormData } from "./types/ConfigItemTypes";
import useDebounce from "@src/hooks/useDebounce";
import Events from "@src/common/Events"
import InitData4SubscribeEmail from "./initialConfiguration/subscribeEmial"
import FontSizeSelector from "./widgets/FontSizeSelector";
import useUpdateEffect from "@src/hooks/useUpdateEffect";

// 这里取一下最新的设置项,以免后期有删改时,旧数据无法正常更新
const settingKeys = Object.keys(InitData4SubscribeEmail.settings)

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: 0,
      width: "100%",
      height: 36
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    }
  })
);

interface SubscribeEmailProps {
  section: {
    [key: string]: any;
  };
  sectionStamp: string | number
}

const SubscribeEmail: React.FC<SubscribeEmailProps> = props => {
  const { sectionStamp, section, onChange } = props;
  const classes = useStyles();
  let data: SubscribeEmailFormData = {}
  Object.assign(data, section.settings)

  const [formData, setFormData] = useState<SubscribeEmailFormData>(data);


  const handleFormDataChange = (e:any, targetName?:string) => {
    let name = targetName || e.target.name
    setFormData({
      ...formData,
      [name]: e.target.value
    });
  };
  const handleFormCheckChange = (e, checked:boolean) => {
    let name = e.target.name
    setFormData({
      ...formData,
      [name]: checked
    });
  }

  const handleColorChange = (name: string, rgb: object) => {
    setFormData({ ...formData, [name]: rgb });
  }

  const triggerSave = useDebounce(()=>{
    const data = JSON.parse(JSON.stringify(section));
    data.name= formData.name;
    settingKeys.forEach(k=>{
      data.settings[k] = formData[k]
    })

    onChange(sectionStamp, { ...data });
  }, 500);

  useUpdateEffect(() => {
    triggerSave()
  }, [formData])

  return (
    <div className="config-item-wrapper">
      <div className="module">
        <div className="module-info">
          <div className="module__item">
            <div className="t14 mb-8 module__title">
              模块背景色
              <ColorPicker name="module_bg_color" position="left-bottom" defaultColor={formData.module_bg_color} onChange={handleColorChange} />
            </div>
          </div>
        </div>
        <div className="module-detail pt-20">
          <div className="t16 pl-16 pb-16">文案</div>
          <div className="module__item">
            <div className="t14 mb-8 module__title">标题
              <ColorPicker position="left-bottom" name="title_color" defaultColor={formData.title_color} onChange={handleColorChange} />
            </div>
            <TextField fullWidth name="title" value={formData.title} onChange={handleFormDataChange} size="small" placeholder="主标题" variant="outlined" />
          </div>
          <div className="module__item">
            <div className="t14 mb-8 module__title">副标题
              <ColorPicker position="left-bottom" name="sub_title_color" defaultColor={formData.sub_title_color} onChange={handleColorChange} />
            </div>
            <TextField fullWidth name="sub_title" value={formData.sub_title} onChange={handleFormDataChange} size="small" placeholder="副标题" variant="outlined" />
          </div>
          <div className="module__item">
            <div className="t14 mb-8 module__title">按钮文字
             <ColorPicker position="left-bottom" name="button_text_color" defaultColor={formData.button_text_color} onChange={handleColorChange} />
            </div>
            <TextField fullWidth name="button_label" value={formData.button_label} onChange={handleFormDataChange} size="small" placeholder="按钮文字" variant="outlined" />
          </div>
          <div className="module__item">
            <div className="t14 mb-8 btn-style-row">
              <span>按钮展示</span>
              <RadioGroup className="radio-group"  name="button_variant" value={formData.button_variant} onChange={handleFormCheckChange}>
                <FormControlLabel value="fill" control={<Radio />} label="填充"/>
                <FormControlLabel value="outlined" control={<Radio />} label="边框"/>
              </RadioGroup>
            </div>
          </div>
          <div className="module__item">
            <div className="t14 mb-8 module__title">
              按钮背景&边框色
              <ColorPicker name="button_bg_and_border_color" position="left-top" defaultColor={formData.button_bg_and_border_color} onChange={handleColorChange} />
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
            <div className="t14 mb-8 module__title">感谢标题
              <ColorPicker name="thank_title_color" position="left-bottom" defaultColor={formData.thank_title_color} onChange={handleColorChange} />
            </div>
            <TextField fullWidth name="thank_title" value={formData.thank_title} onChange={handleFormDataChange} size="small" placeholder="主标题" variant="outlined" />
          </div>
          <div className="module__item">
            <div className="t14 mb-8 module__title">感谢副标题
              <ColorPicker name="thank_sub_title_color" position="left-bottom" defaultColor={formData.thank_sub_title_color} onChange={handleColorChange} />
            </div>
            <TextField fullWidth name="thank_sub_title" value={formData.thank_sub_title} onChange={handleFormDataChange} size="small" placeholder="副标题" variant="outlined" />
          </div>

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
          {/* <div className="module__item">
            <div className="t14 mb-8">文字&按钮位置</div>
            <FormControl size="small" variant="outlined" className={classes.formControl}>
              <Select
                value={formData.alignment}
                onChange={e => handleFormDataChange(e,"alignment")}
              >
                <MenuItem value={'left'}>左</MenuItem>
                <MenuItem value={'center'}>中</MenuItem>
                <MenuItem value={'right'}>右</MenuItem>
              </Select>
            </FormControl>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SubscribeEmail;
