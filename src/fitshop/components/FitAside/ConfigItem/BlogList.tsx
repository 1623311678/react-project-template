import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import useDebounce from "@src/hooks/useDebounce";
import Switch from "@material-ui/core/Switch";
import Slider from '@material-ui/core/Slider';
import ColorPicker from "@src/common/components/ColorPicker";
import InitData4BlogList from "./initialConfiguration/blogList"
import { BlogListFormDataType } from "./types/ConfigItemTypes";
import layout_2JPG from "@assets/images/config-items/productlist-layout-2.png"
import layout_1JPG from "@assets/images/config-items/productlist-layout-1.png"
import { getBlogAlbums } from "@src/api/blog";
import FormControl from "@material-ui/core/FormControl";
import FontSizeSelector from "./widgets/FontSizeSelector";
import BlogAlbum from './components/blog/BlogCollectionModal'
import useUpdateEffect from "@src/hooks/useUpdateEffect";

import { CommonSelection } from "./components/common/CommonSelection";
import { hoverAnimationOptions } from "./components/common/CommonSelection/Constant";

const settingKeys = Object.keys(InitData4BlogList.settings)


const layoutPlaceholder = [
  {
    imgUrl: layout_2JPG,
    label: 'layout_2JPG'
  }, {
    imgUrl: layout_1JPG,
    label: 'layout_1JPG'
  }]
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
    radioRoot: {
      marginLeft: 0,
      marginRight: 0,
    },
    accordionDetail: {
      padding: 0,
      flexDirection: 'column'
    },
    accordionTitle: {
      background: '#F7F8F9'
    }
  })
);

interface BlogListProps { 
  section: {
    [key: string]: any;
    settings: object
  };
  sectionStamp: string | number

}
const BlogList: React.FC<BlogListProps> = props => {
  const { sectionStamp, section, onChange } = props;

  const classes = useStyles();

  const data: BlogListFormDataType = {}
  Object.assign(data, section.settings)
  data.name = section.name
  data.blocks = section.blocks

  const [formData, setFormData] = useState<BlogListFormDataType>(data);

  const handleSwitchChanged = (checked: boolean, key: string) => {
    setFormData({
      ...formData,
      [key]: checked
    });
  }
  
  const triggerSave = useDebounce(() => {
    const data = JSON.parse(JSON.stringify(section));
    data.name = formData.name;
    data.blocks = formData.blocks

    settingKeys.forEach(key => {
      data.settings[key] = formData[key]
    })

    onChange(sectionStamp, { ...data });
  }, 500);
  
  const handleFormDataChange = (e: any, targetName?: string) => {
    let name = targetName || e.target.name
    setFormData({
      ...formData,
      [name]: e.target.value
    });
  };

  const handleSliderChange = (v, key) => {
    setFormData({
      ...formData,
      [key]: v
    });
  }

  const handleLayoutTypeChanged = (layoutType: 'layout_1JPG' | 'layout_2JPG') => {
    setFormData({
      ...formData,
      layout_type: layoutType
    })
  }

  const handleColorChange = (name: string, rgb: object) => {
    setFormData({ ...formData, [name]: rgb });
  }

  const handleFormCheckChange = (e, checked: boolean) => {
    let name = e.target.name;
    setFormData({
      ...formData,
      [name]: checked
    });
  };

  useUpdateEffect(() => {
    triggerSave()
  }, [formData])

  // 获取产品列表
  const handleSelectAlbum = (blog) => {
    setFormData({
      ...formData,
      link_to_obj: {
        ...blog,
        type: 'blogs',
        key_map: 'id,handle,title',
      }
    });
  };

  const handleDelAlbum = () => {
    setFormData({
      ...formData,
      link_to_obj: {}
    });
  }

  const updageBlocks = (payload) => {
    setFormData({
      ...formData,
      blocks: payload.map(p=>{
        return {
          link_to_obj: {
            ...p,
            id: p.id,
            type: p.type || 'product',
            key_map: 'id,featured_image,handle,title,variant',
          }
        }
      })
    });
  }
  const handleSelectChange = (name,value) => {
    const newFormData:any={
      ...formData,
      [name]: value
    }
    setFormData(newFormData);
  };

  return (
    <div className="config-item-wrapper product-list-wrapper">
      <div className="module-info border-bottom-1px">
        <div className="module__item">
          <div className="t14 mb-8 module__title">模块标题
              <ColorPicker position="left-bottom" name="title_color" defaultColor={formData.title_color} onChange={handleColorChange} />
          </div>
          <TextField
            size="small"
            name="title"
            value={formData.title}
            onChange={handleFormDataChange}
            variant="outlined"
          />
        </div>
        <div className="module__item">
          <div className="t14 mb-8 module__title">模块副标题
              <ColorPicker position="left-bottom" name="description_color" defaultColor={formData.description_color} onChange={handleColorChange} />
          </div>
          <TextField
            size="small"
            name="description"
            value={formData.description}
            onChange={handleFormDataChange}
            variant="outlined"
          />
        </div>
        <div className="module__item">
          <div className="t14 mt-10 module__title">
            模块背景色
              <ColorPicker name="module_bg_color" position="left-bottom" defaultColor={formData.module_bg_color} onChange={handleColorChange} />
          </div>
        </div>
      </div>
      {/* <div className="module-detail pt-20 border-bottom-1px">
        <div className="t16 pl-16 pb-16">展示方式</div>
        <div className="module__item">
          <div className="image-layout-types">
            {layoutPlaceholder.map(lp => {
              return (
                <div
                  key={lp.label}
                  className={`type t2_1 ${formData.layout_type == lp.label && 'selected'}`}
                  onClick={() => handleLayoutTypeChanged(lp.label)}>
                  <img src={lp.imgUrl} alt="" />
                </div>
              )
            })}
          </div>
        </div>
      </div> */}
      <div className="module-detail pt-20 relative">
        <div className="t16 pl-16 pb-16">博客专辑</div>
        <div className="pl-24 pr-24">
          <BlogAlbum 
            handleSelectAlbum={handleSelectAlbum}
            handleDelAlbum={handleDelAlbum}
            selectedRows={formData.link_to_obj}
          />
        </div>
        <div className="module__item mt-20">
          <div className="t14 mb-8">展示行数</div>
          <div className="slider-wrapper">
            <div className="s">
              <Slider valueLabelDisplay="auto"
                min={1} max={3} name="row_counts"
                value={formData.row_counts}
                onChange={(e, v) => handleSliderChange(v, 'row_counts')} />
            </div>
            <div className="tip">{formData.row_counts}行</div>
          </div>
        </div>
        <div className="module__item">
          <div className="t14 mb-8">每行博客数</div>
          <div className="slider-wrapper">
            <div className="s">
              <Slider valueLabelDisplay="auto" min={2} max={4} name="blog_count_per_row" value={formData.blog_count_per_row} onChange={(e, v) => handleSliderChange(v, 'blog_count_per_row')} aria-labelledby="continuous-slider" />
            </div>
            <div className="tip">{formData.blog_count_per_row}个</div>
          </div>
        </div>
        <CommonSelection 
            name="hover_effect"
            title="滑过效果"
            value={formData.hover_effect||'hoverZoomOut'} 
            onChage={(name,value)=>handleSelectChange(name,value)}
            options={hoverAnimationOptions}
        ></CommonSelection>
        <FontSizeSelector
          title="主标题字号"
          type="title"
          value={formData.title_size}
          handleSelector={e => handleFormDataChange(e, "title_size")}
        />
        <FontSizeSelector
          title="副标题字号"
          type="title"
          value={formData.description_size}
          handleSelector={e => handleFormDataChange(e, "description_size")}
        />
        <FontSizeSelector
          title="博客名称字号"
          type="title"
          value={formData.blog_title_size}
          handleSelector={e => handleFormDataChange(e, "blog_title_size")}
        />
        <FontSizeSelector
          title="博客简介字号"
          value={formData.blog_description_size}
          handleSelector={e => handleFormDataChange(e, "blog_description_size")}
        />
        {/* <div className="module__item mt-10">
          <div className="t14 mb-8">博客名称位置</div>
          <FormControl size="small" variant="outlined" className={classes.formControl}>
            <Select
              name="blog_title_position"
              value={formData.blog_title_position}
              onChange={e => handleFormDataChange(e, "blog_title_position")}
            >
              <MenuItem value={'center'}>居中</MenuItem>
              <MenuItem value={'left'}>居左</MenuItem>
            </Select>
          </FormControl>
        </div> */}
        <div className="module__item">
          <div className="t14 mt-10 module__title">
            博客名称色
              <ColorPicker name="blog_title_color" position="left-bottom" defaultColor={formData.blog_title_color} onChange={handleColorChange} />
          </div>
        </div>
        <div className="module__item">
          <div className="t14 mt-10 module__title">
            博客简介色
              <ColorPicker name="blog_description_color" position="left-bottom" defaultColor={formData.blog_description_color} onChange={handleColorChange} />
          </div>
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
                checked={formData.description_uppercase}
                onChange={handleFormCheckChange}
                color="primary"
                name="description_uppercase"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            </div>
          </div>
        <div className="module__item">
          <div className="t14 mb-8 title-only-one-row">
            显示"View All"
            <Switch
              checked={formData.show_view_all}
              onChange={(e, v) => handleSwitchChanged(v, 'show_view_all')}
              color="primary"
              name="show_view_all"
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogList;
