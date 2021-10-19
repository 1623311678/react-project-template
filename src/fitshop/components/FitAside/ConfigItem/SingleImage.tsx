// 单图
import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import ProjectLinkSelector from "@src/common/components/ProjectLinkSelector";
import FontSizeSelector from "./widgets/FontSizeSelector";
import { SingleImageFormData } from "./types/ConfigItemTypes";
import useDebounce from "@src/hooks/useDebounce";
import InitData4SingleImage from "../ConfigItem/initialConfiguration/singleImageSectionData";
import ImagePickerLoad from "@src/common/components/ImagePicker/ImagePickerLoad";
import useUpdateEffect from "@src/hooks/useUpdateEffect";
import { get } from "lodash";
import { CommonSelection } from "./components/common/CommonSelection";
import { hoverAnimationOptions } from './components/common/CommonSelection/Constant'
import { CommonColorPicker } from "./components/common/CommonColorPicker";

// 这里取一下最新的设置项,以免后期有删改时,旧数据无法正常更新
const settingKeys = Object.keys(InitData4SingleImage.settings);

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
  }),{ name: "SingleImage" }
);

interface SingleImageProps {
  section: {
    [key: string]: any;
  };
  sectionStamp: string | number;
  onChange:(params1,params2)=>void
}

const SingleImage: React.FC<SingleImageProps> = props => {
  const { sectionStamp, section, onChange } = props;
  const classes = useStyles();
  const data: SingleImageFormData = {};
  data.name = section.name;
  Object.assign(data, section.settings);
  const [formData, setFormData] = useState<SingleImageFormData>(data);

  /**
   * ColorPicker 颜色发生改变时的处理函数
   *
   * @param name 该元素在 formData 中的 key
   * @param rgb ColorPicker 返回的颜色描述对象
   */
  const handleColorChange = (name: string, rgb: object) => {
    setFormData({ ...formData, [name]: rgb });
  };

  const handleFormDataChange = (e: any, targetName?: string) => {
    const name = targetName || e.target.name;

    setFormData({
      ...formData,
      [name]:
        typeof e.target.value == "string"
          ? e.target.value.trim()
          : e.target.value
    });
  };
  const handleFormCheckChange = (e, checked: boolean) => {
    const name = e.target.name;
    setFormData({
      ...formData,
      [name]: checked
    });
  };

  const handleLinkObjChanged = (obj = {}) => {
    setFormData({
      ...formData,
      link_to_obj: { ...obj, key_map: "id,handle,title" }
    });
  };

  const handleImagePickerEnsure = (
    picUrl: string | any,
    attribute: string,
    isVideo: boolean = false
  ) => {
    if (isVideo) {
      const {
        uploadType,
        imageUrl,
        videoSrc,
        videoType,
        imageWidth,
        imageHeight
      } = picUrl;
      setFormData({
        ...formData,
        [attribute]: {
          uploadType,
          image_src: imageUrl,
          video_src: videoSrc,
          videoType,
          image_w: imageWidth,
          image_h: imageHeight
        }
      });
    } else {
      setFormData({ ...formData, [attribute]: picUrl });
    }
  };

  const triggerSave = useDebounce(() => {
    const data = JSON.parse(JSON.stringify(section));
    data.name = formData.name;
    settingKeys.forEach(k => {
      data.settings[k] = formData[k];
    });

    onChange(sectionStamp, { ...data });
  }, 500);
  function handleSelectChange(name,value,idx?){
    if (idx !== undefined&&idx!==null) {
      formData.blocks[idx][name] = value;
      setFormData({
        ...formData
      });
    }else{
      const newFormData:any={
        ...formData,
        [name]: value
      }
      setFormData(newFormData);
    }
  }
  useUpdateEffect(() => {
    triggerSave();
  }, [formData]);

  return (
    <div className="config-item-wrapper">
      <div className="module">
        <div className="module-info">
          <CommonColorPicker
           name="logo_text_color"
           title="模块标题"
           value={formData.logo_text_color} 
           onChange={(name,value)=>handleSelectChange(name,value)}
           position="left-bottom"
          >
          <TextField
              size="small"
              name="name"
              fullWidth
              value={formData.name}
              onChange={handleFormDataChange}
              placeholder={formData.name}
              variant="outlined"
            />
          </CommonColorPicker>
        </div>
        <div className="module-detail pt-20">
          <div className="t16 pl-16 pb-16">图片</div>
          <div className="module__item">
            <div className="t14 mb-8">上传图片</div>
            <ImagePickerLoad
              key={get(formData.media_obj, "image_src")}
              classNames="image-picker-wrapper"
              initialImgSrc={get(formData.media_obj, "image_src")}
              onEnsure={url => {
                const isVideo = true;
                handleImagePickerEnsure(url, "media_obj", isVideo);
              }}
              modalType="all"
            />
            <div className="t12 mt-8">建议尺寸：1920 * 670px</div>
          </div>
          <CommonSelection 
              name="hover_effect"
              title="滑过效果"
              value={formData.hover_effect||'hoverZoomOut'} 
              onChage={(name,value)=>handleSelectChange(name,value)}
              options={hoverAnimationOptions}
          ></CommonSelection>
          <div className="module__item">
            <div className="t14 mb-8">上传图片(手机端)</div>
            <ImagePickerLoad
              key={get(formData.image_src_mobile, "image_src")}
              classNames="image-picker-wrapper"
              initialImgSrc={get(formData.image_src_mobile, "image_src")}
              onEnsure={url => {
                // const { imageUrl } = url;
                // handleImagePickerEnsure(imageUrl, "image_src_mobile");

                const isVideo = true;
                handleImagePickerEnsure(url, "image_src_mobile", isVideo);
              }}
              modalType="all"
            />
            <div className="t12 mt-8">建议尺寸：750 * 520px</div>
          </div>
          {/* <div className="module__item">
            <div className="t14 mb-8">图片高度</div>
            <TextField
              name="image_height"
              type="number"
              size="small"
              fullWidth
              value={formData.image_height}
              onChange={handleFormDataChange}
              placeholder={formData.image_height}
              variant="outlined"
            />
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
          </div> */}
          <div className="module__item">
            <div className="t14 mb-8 title-only-one-row">
              宽度铺满全屏
              <Switch
                checked={formData.full_screen}
                onChange={handleFormCheckChange}
                color="primary"
                name="full_screen"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            </div>
          </div>
          <div className="module__item">
            <div className="t14 mb-8">链接</div>
            <ProjectLinkSelector
              initialValue={formData.link_to_obj}
              onLinkSelected={handleLinkObjChanged}
              placeholder="选择商品或者系列链接"
            />
          </div>
          <CommonColorPicker
           name="title_color"
           title="标题"
           value={formData.title_color} 
           onChange={(name,value)=>handleSelectChange(name,value)}
           position="left-bottom"
          >
          <TextField
              fullWidth
              name="title"
              value={formData.title}
              onChange={handleFormDataChange}
              size="small"
              placeholder="主标题"
              variant="outlined"
            />
          </CommonColorPicker>
          <CommonColorPicker
           name="sub_title_color"
           title="副标题"
           value={formData.sub_title_color} 
           onChange={(name,value)=>handleSelectChange(name,value)}
           position="left-bottom"
          >
          <TextField
              fullWidth
              name="sub_title"
              value={formData.sub_title}
              onChange={handleFormDataChange}
              size="small"
              placeholder="副标题"
              variant="outlined"
            />
          </CommonColorPicker>
          <CommonColorPicker
           name="button_text_color"
           title="按钮文字"
           value={formData.button_text_color} 
           onChange={(name,value)=>handleSelectChange(name,value)}
           position="left-bottom"
          >
           <TextField
              fullWidth
              name="button_label"
              value={formData.button_label}
              onChange={handleFormDataChange}
              size="small"
              placeholder="按钮文字"
              variant="outlined"
            />
          </CommonColorPicker>
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
          <CommonColorPicker
           name="button_bg_and_border_color"
           title="按钮背景&边框色"
           value={formData.button_bg_and_border_color} 
           onChange={(name,value)=>handleSelectChange(name,value)}
           position="left-top"
          >
          </CommonColorPicker>
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
          <div className="module__item">
            <div className="t14 mb-8">文字&按钮位置</div>
            <FormControl
              size="small"
              variant="outlined"
              className={classes.formControl}
            >
              <Select
                value={formData.alignment}
                onChange={e => handleFormDataChange(e, "alignment")}
              >
                <MenuItem value={"left"}>左</MenuItem>
                <MenuItem value={"center"}>中</MenuItem>
                <MenuItem value={"right"}>右</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleImage;
