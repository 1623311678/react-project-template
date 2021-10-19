import React, { useState, useEffect } from "react";
import { get } from "lodash";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import data from '../../ConfigItem/initialConfiguration/global/normal'
import useDebounce from "@src/hooks/useDebounce";

// 这里取一下最新的设置项,以免后期有删改时,旧数据无法正常更新


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: 0,
      width: "100%",
      height: 36
    }
  })
);
interface NormalProps {
  section?: {
    name?: string,
    settings?: {
      [key: string]: any;
    }
  };
  sectionStamp?: string | number
}

const normal: React.FC<NormalProps> = ({section = {}, onChange}) => {
  const [formData, setFormData] = useState<any>(()=>({
      ...data.settings,
      ...section.settings
    }));
    const classes = useStyles();
  /**
  * ColorPicker 颜色发生改变时的处理函数
  *
  * @param name 该元素在 formData 中的 key
  * @param rgb ColorPicker 返回的颜色描述对象
  */
  const handleColorChange = (name: string, rgb: object) => {
    setFormData({ ...formData, [name]: rgb });
  }

  const handleFormDataChange = (e:any, targetName?:string) => {
    const name = targetName || e.target.name;
    if(name === "image_border_radius"){
      if (Number(e.target.value)<0){
        e.target.value = 0;
      }else if(Number(e.target.value)>40){
        e.target.value = 40;
      }
    }
    if(name === "button_border_radius"){
      if (Number(e.target.value)<0){
        e.target.value = 0;
      }else if(Number(e.target.value)>30){
        e.target.value = 30;
      }
    }
    setFormData({
      ...formData,
      [name]: e.target.value
    });
  };

  const handleFormCheckChange = (event: any) => {
    const { name } = event.target;
    setFormData({ ...formData, [name]: event.target.value });
    
    if( event.target.value==="border_radius" && !(formData.image_border_radius || formData.button_border_radius)){
      setFormData({ ...formData,[name]: event.target.value, ['image_border_radius']: '16' , ['button_border_radius']: '8'});
    }
  };

  const triggerSave = useDebounce(()=>{
      const data = {
        name: "normal",
        settings: {}
      };
      
      Object.keys(formData).forEach(k=>{
          data.settings[k] = formData[k]
      })

    onChange('normal', { ...data })
  }, 500);

  useEffect(() => {
    triggerSave()
  }, [formData])

  return (
    <div className="config-item-wrapper">
      <div className="module">
        <div className="module-detail pt-20 border-bottom-1px">
          <div className="t16 pl-16 pb-16" onClick={triggerSave}>布局</div>
         
          <div className="module__item">
            <div className="t14 mb-8">内容宽度</div>
            <TextField 
              name="content_width" 
              type="number" 
              size="small" 
              fullWidth
              value={formData.content_width}
              onChange={handleFormDataChange}
              placeholder={ formData.content_width }
              variant="outlined" />
            <div className="t12 mt-8">内容宽度单位为px</div>
          </div>
          <div className="module__item">
            <div className="t14 mb-8">模块之间间距</div>
            <TextField 
              name="spacing_module" 
              type="number" 
              size="small" 
              fullWidth
              value={ formData.spacing_module }
              onChange={ handleFormDataChange }
              placeholder={ formData.spacing_module }
              variant="outlined" />
            <div className="t12 mt-8">模块留白单位为px</div>
          </div>
        </div>
        <div className="module-detail pt-20 border-bottom-1px">
        <div className="t16 pl-16 pb-16">风格</div>
         <div className="module__item">
         <div className="t14 mb-8">风格</div>
             <FormControl size="small" variant="outlined" className={classes.formControl}>
                <Select
                    value={formData.show_border_radius || "no_border_radius"}
                    name="show_border_radius"
                    onChange={e => handleFormCheckChange(e)}
                >
                    <MenuItem value={"border_radius"}>圆角</MenuItem>
                    <MenuItem value={"no_border_radius"}>直角</MenuItem>
                </Select>
            </FormControl>
         </div>

        {
          get(formData, "show_border_radius") === "border_radius" && ([
            <div className="module__item" key="image_border_radius">
              <div className="t14 mb-8">图片圆角度数</div>
              <TextField 
                name="image_border_radius" 
                type="number" 
                size="small" 
                fullWidth
                value={ formData.image_border_radius }
                onChange={ handleFormDataChange }
                placeholder={ formData.image_border_radius }
                variant="outlined"
              />
            </div>,
            <div className="module__item" key="button_border_radius">
              <div className="t14 mb-8">按钮圆角度数</div>
              <TextField 
                name="button_border_radius" 
                type="number" 
                size="small" 
                fullWidth
                value={ formData.button_border_radius }
                onChange={ handleFormDataChange }
                placeholder={ formData.button_border_radius }
                variant="outlined"
              />
            </div>
          ])
        }
        </div>
      </div>
    </div>
  );
};

export default normal;
