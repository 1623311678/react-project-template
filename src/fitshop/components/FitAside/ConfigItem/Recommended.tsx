import React, { useState , Fragment } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import ProjectLinkSelector from "@src/common/components/ProjectLinkSelector";
import ImagePickerLoad from "@src/common/components/ImagePicker/ImagePickerLoad";
import layout_1JPG from "@assets/images/config-items/icon-recommended-layout-1.png";
import layout_2JPG from "@assets/images/config-items/icon-recommended-layout-2.png";
import InitData4Recommended from "./initialConfiguration/recommendedSectionData";
import { RecommendedFormDataType } from "./types/ConfigItemTypes";
import useDebounce from "@src/hooks/useDebounce";
import { get } from "lodash";
import FontSizeSelector from "./widgets/FontSizeSelector";
import useUpdateEffect from "@src/hooks/useUpdateEffect";
import { CommonButtonSwitch } from "./components/common/CommonButtonSwitch";
import { CommonButtonRadio } from "./components/common/CommonButtonRadio";
import { CommonColorPicker } from "./components/common/CommonColorPicker";
import { CommonSelection } from "./components/common/CommonSelection";
import {
  layoutOptions,
  sizeOptions,
  sliceOptions,
  textLayoutOptions
} from "./components/common/CommonSelection/Constant";

const settingKeys = Object.keys(InitData4Recommended.settings);

const useStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      formControl: {
        margin: 0,
        width: "100%",
        height: 36
      },
      selectEmpty: {
        marginTop: theme.spacing(2)
      }
    }),
  { name: "Recommended" }
);

interface RecommendedProps {
  section: {
    [key: string]: any;
  };
  sectionStamp: string | number;
}

const layoutPlaceholder = [
  {
    imgUrl: layout_1JPG,
    label: "layout_1JPG"
  },
  {
    imgUrl: layout_2JPG,
    label: "layout_2JPG"
  }
];

const Recommended: React.FC<RecommendedProps> = props => {
  const { sectionStamp, section, onChange } = props;
  const classes = useStyles();
  const data: RecommendedFormDataType = {};
  data.name = section.name;
  Object.assign(data, section.settings);

  const [formData, setFormData] = useState<RecommendedFormDataType>(data);

  const recommandSize = ["600 * 600", "340 * 452"];

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

  const handleImagePickerEnsure = (picUrl: string, num?: number) => {
    if (!num) {
      setFormData({ ...formData, image_src: picUrl });
    } else {
      setFormData({ ...formData, image2_src: picUrl });
    }
  };

  const handleLayoutTypeChanged = (
    layoutType: "layout_1JPG" | "layout_2JPG"
  ) => {
    setFormData({
      ...formData,
      layout_type: layoutType
    });
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
  function handleDataChange(name: string, value: string) {
    formData[name] = value;
    setFormData({
      ...formData
    });
  }
  const triggerSave = useDebounce(() => {
    const data = JSON.parse(JSON.stringify(section));
    data.name = formData.name;

    formData.link_to_obj = {
      ...formData.link_to_obj,
      key_map: "id,featured_image,handle,title"
    };

    settingKeys.forEach(k => {
      data.settings[k] = formData[k];
    });

    onChange(sectionStamp, { ...data });
  }, 500);

  useUpdateEffect(() => {
    triggerSave();
  }, [formData]);
  function getTextLayout(){
    if(formData.text_layout){
      return formData.text_layout
    }
    if(formData.layout_type == 'layout_1JPG'){
      return 'center'
    }else if(formData.layout_type == 'layout_2JPG'){
      if(formData.image_text_layout =="image_left_and_text_right"){
        return 'right'
      }else if(formData.image_text_layout =="image_right_and_text_left"){
        return 'left'
      }else {
        return 'center'
      }
    }

  }

  return (
    <div className="config-item-wrapper">
      <div className="module">
        <div className="module-info border-bottom-1px">
          <CommonColorPicker
            title="模块标题"
            position="left-bottom"
            name="logo_text_color"
            value={formData.logo_text_color||'rgba(34,34,34,1)'}
            onChange={handleDataChange}
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
          <CommonColorPicker
            title="模块背景色"
            position="left-bottom"
            name="module_bg_color"
            value={formData.module_bg_color||'rgba(255,255,255,1)'}
            onChange={handleDataChange}
          ></CommonColorPicker>
        </div>
        <div className="module-detail pt-20 border-bottom-1px">
          <div className="t16 pl-16 pb-16">展示方式</div>
          <div className="module__item">
            <div className="image-layout-types">
              {layoutPlaceholder.map(lp => (
                <div
                  key={lp.label}
                  className={`type t2_1 ${formData.layout_type == lp.label &&
                    "selected"}`}
                  onClick={() => handleLayoutTypeChanged(lp.label)}
                >
                  <img src={lp.imgUrl} alt="" />
                </div>
              ))}
            </div>
          </div>
          <CommonSelection
            title="图文布局"
            value={formData.image_text_layout}
            name="image_text_layout"
            onChage={handleDataChange}
            options={layoutOptions}
          ></CommonSelection>
          <CommonButtonSwitch
            title={"展示图片装饰"}
            name="show_image_decorate"
            value={formData.show_image_decorate || false}
            onChange={handleFormCheckChange}
          ></CommonButtonSwitch>
          {formData.show_image_decorate&&<CommonButtonRadio
            title={"装饰样式"}
            name="decorate_style"
            value={formData.decorate_style || "fill"}
            onChange={(name, value) => handleDataChange(name, value)}
          ></CommonButtonRadio>
          }
          {formData.show_image_decorate&&<CommonColorPicker
            title={"装饰颜色"}
            name="decorate_color"
            value={formData.decorate_color||'rgba(34,34,34,1)'}
            onChange={(name, value) => handleDataChange(name, value)}
          ></CommonColorPicker>}
        </div>
        <div className="module-detail pt-20">
          <div className="t16 pl-16 pb-16">图片</div>
          <div className="module__item">
            <div className="t14 mb-8">上传图片1</div>
            {/* {formData.image_src && (
              <div className="t14 mb-8">已选({formData.image_src})</div>
            )} */}
            <div className="pic-upload">
              <ImagePickerLoad
                key={get(formData, "image_src")}
                classNames="image-picker-wrapper"
                initialImgSrc={get(formData, "image_src")}
                onEnsure={picUrl => {
                  const { imageUrl } = picUrl;
                  handleImagePickerEnsure(imageUrl);
                }}
              />
            </div>
            <div className="t12 mt-8 mb-16">建议尺寸：{recommandSize[0]}px</div>
          </div>
          {formData.layout_type == "layout_2JPG" && (
            <div className="module__item">
              <div className="t14 mb-8">上传图片2</div>
              <div className="pic-upload">
                <ImagePickerLoad
                  key={get(formData, "image2_src")}
                  classNames="image-picker-wrapper"
                  initialImgSrc={get(formData, "image2_src")}
                  onEnsure={picUrl => {
                    const { imageUrl } = picUrl;
                    handleImagePickerEnsure(imageUrl, 2);
                  }}
                />
              </div>
              <div className="t12 mt-8 mb-16">
                建议尺寸：{recommandSize[1]}px
              </div>
            </div>
          )}
          <CommonSelection
            title="图片高度"
            value={formData.image_height}
            name="image_height"
            onChage={handleDataChange}
            options={sizeOptions}
          ></CommonSelection>
          <CommonSelection
            title="截取位置"
            value={formData.cut_position}
            name="cut_position"
            onChage={handleDataChange}
            options={sliceOptions}
          ></CommonSelection>
          <div className="module__item">
            <div className="t14 mb-8">链接</div>
            <ProjectLinkSelector
              initialValue={formData.link_to_obj}
              onLinkSelected={handleLinkObjChanged}
              placeholder="选择商品或者系列链接"
            />
          </div>
          <CommonColorPicker
            title="标题"
            position="left-bottom"
            name="title_color"
            value={formData.title_color||'rgba(34,34,34,1)'}
            onChange={handleDataChange}
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
            title="副标题"
            position="left-bottom"
            name="sub_title_color"
            value={formData.sub_title_color||'rgba(34,34,34,1)'}
            onChange={handleDataChange}
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
          <CommonSelection
            title="文字布局"
            value={getTextLayout()}
            name="text_layout"
            onChage={handleDataChange}
            options={textLayoutOptions}
          ></CommonSelection>
          <CommonColorPicker
            title="价格"
            position="left-bottom"
            name="price_color"
            value={formData.price_color||'rgba(34,34,34,1)'}
            onChange={handleDataChange}
          >
            <TextField
              fullWidth
              name="price"
              value={formData.price}
              onChange={handleFormDataChange}
              size="small"
              variant="outlined"
            />
          </CommonColorPicker>
          <CommonColorPicker
            title="按钮文字"
            position="left-bottom"
            name="link_color"
            value={formData.link_color||'rgba(34,34,34,1)'}
            onChange={handleDataChange}
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
          {formData.layout_type == 'layout_1JPG'&&<CommonButtonRadio
            title={"按钮展示"}
            name="button_decorate"
            value={formData.button_decorate || "outlined"}
            onChange={(name, value) => handleDataChange(name, value)}
          ></CommonButtonRadio>
          }
          {formData.layout_type == 'layout_1JPG'&&<CommonColorPicker
            title="按钮背景&边框色"
            position="left-bottom"
            name="button_bg_and_border_color"
            value={formData.button_bg_and_border_color||'rgba(34,34,34,1)'}
            onChange={handleDataChange}
          ></CommonColorPicker>}
          {/* <FontSizeSelector
            title="按钮字号"
            value={formData.button_size||'14px'}
            handleSelector={e => handleFormDataChange(e, "button_size")}
          /> */}
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
          <CommonButtonSwitch
            title={"标题全大写"}
            onChange={handleFormCheckChange}
            name="title_uppercase"
            value={formData.title_uppercase}
          ></CommonButtonSwitch>
          <CommonButtonSwitch
            title={"副标题全大写"}
            onChange={handleFormCheckChange}
            name="sub_title_uppercase"
            value={formData.sub_title_uppercase}
          ></CommonButtonSwitch>
          <CommonButtonSwitch
            title={"按钮全大写"}
            onChange={handleFormCheckChange}
            name="button_uppercase"
            value={formData.button_uppercase}
          ></CommonButtonSwitch>
        </div>
      </div>
    </div>
  );
};

export default Recommended;
