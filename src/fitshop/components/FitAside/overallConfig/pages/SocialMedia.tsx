import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import data from "../../ConfigItem/initialConfiguration/global/SocialMedia";
import useDebounce from "@src/hooks/useDebounce";

// 这里取一下最新的设置项,以免后期有删改时,旧数据无法正常更新

interface SocialMediaProps {
  section?: {
    [key: string]: any;
    settings?: {
      [key: string]: any;
    };
  };
  sectionStamp?: string | number;
}
const SocialMedia: React.FC<SocialMediaProps> = ({
  section = {},
  onChange
}) => {
  const [formData, setFormData] = useState<any>(() => {
    return {
      ...data.settings,
      ...section.settings
    };
  });
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
    let name = targetName || e.target.name;
    setFormData({
      ...formData,
      [name]: e.target.value
    });
  };

  const handleFormCheckChange = (e, checked: boolean) => {
    let name = e.target.name;
    setFormData({
      ...formData,
      [name]: checked
    });
  };

  const handleLinkObjChanged = obj => {
    setFormData({
      ...formData,
      link_to_obj: obj
    });
  };

  const handleImagePickerEnsure = (picUrl: string) => {
    setFormData({ ...formData, image_src: picUrl });
  };
  const triggerSave = useDebounce(() => {
    const data = {
      name: "social_media",
      settings: {}
    };
    Object.keys(formData).forEach(k => {
      data.settings[k] = formData[k];
    });

    onChange("social_media", { ...data });
  }, 500);
  useEffect(() => {
    triggerSave();
  }, [formData]);

  return (
    <div className="config-item-wrapper">
      <div className="module">
        <div className="module-detail pt-20 border-bottom-1px">
          <div className="t16 pl-16 pb-16" onClick={triggerSave}>
            链接
          </div>
          <div className="module__item">
            <div className="t14 mb-8">Instagram link</div>
            <TextField
              name="InstagramLink"
              type="text"
              size="small"
              fullWidth
              value={formData.InstagramLink}
              onChange={handleFormDataChange}
              placeholder={formData.InstagramLink}
              variant="outlined"
            />
          </div>
          <div className="module__item">
            <div className="t14 mb-8">Facebook link</div>
            <TextField
              name="FacebookLink"
              type="text"
              size="small"
              fullWidth
              value={formData.FacebookLink}
              onChange={handleFormDataChange}
              placeholder={formData.FacebookLink}
              variant="outlined"
            />
          </div>
          <div className="module__item">
            <div className="t14 mb-8">Twitter link</div>
            <TextField
              name="TwitterLink"
              type="text"
              size="small"
              fullWidth
              value={formData.TwitterLink}
              onChange={handleFormDataChange}
              placeholder={formData.TwitterLink}
              variant="outlined"
            />
          </div>
          <div className="module__item">
            <div className="t14 mb-8">Pinterest link</div>
            <TextField
              name="PinterestLink"
              type="text"
              size="small"
              fullWidth
              value={formData.PinterestLink}
              onChange={handleFormDataChange}
              placeholder={formData.PinterestLink}
              variant="outlined"
            />
          </div>
          <div className="module__item">
            <div className="t14 mb-8">Youtube link</div>
            <TextField
              name="YoutubeLink"
              type="text"
              size="small"
              fullWidth
              value={formData.YoutubeLink}
              onChange={handleFormDataChange}
              placeholder={formData.YoutubeLink}
              variant="outlined"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialMedia;
