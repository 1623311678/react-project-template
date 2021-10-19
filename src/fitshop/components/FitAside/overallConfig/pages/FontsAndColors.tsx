import React, { useState, useEffect, useCallback, useMemo } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Modal, Button , Input , Table } from 'antd';
import { get , ceil } from "lodash";
import Slider from '@material-ui/core/Slider';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import {SearchOutlined} from '@ant-design/icons';
import useDebounce from "@src/hooks/useDebounce";
import data from '../../ConfigItem/initialConfiguration/global/FontsAndColors'
import font_data from '@src/common/fontObj/font'
// '../../ConfigItem/initialConfiguration/global/FontsAndColors'

// 这里取一下最新的设置项,以免后期有删改时,旧数据无法正常更新

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

interface fonts_and_colors_props {
  section?: {
    [key: string]: any;
    settings?: {
      [key: string]: any;
    }
  };
  sectionStamp?: string | number,
  onChange?:any
}
interface table_listType {
  key: React.Key;
  name: string;
  value: any;
  activeValue:string
}
const fonts_and_colors: React.FC<fonts_and_colors_props> =({section = {}, onChange}) => {
  const [ font_list,set_font_list ] = useState(font_data)
  const [formData, setFormData] = useState<any>(()=>{
      return {
        ...data.settings,
        ...section.settings
      }
    });
  const [is_modal_visible, set_is_modal_visible] = useState(false);
  const [ filter_qord_weight , set_filter_qord_weight ] = useState('');
  const [ table_list , set_table_list ] = useState<table_listType[]>([])
  const [ selectedRowKeys , set_selectedRowKeys ] = useState([0]);
  const [ font_modal_name , set_font_modal_name ] = useState('')
  const [ pages , set_pages ] = useState({
                                            current:1,
                                            total:table_list.length,
                                            pageSize:5
                                          })
  const TableStructure = [
    {
      title: '字体名称',
      dataIndex: 'name',
      render: (text: string,record:table_listType) => <span style={{fontFamily:record.activeValue}}>{text}</span>,
    },
    {
      title: '字重',
      dataIndex: 'value',
      render: (tags, record, index) => {
        return(
      <FormControl size="small" variant="outlined" className={classes.formControl}>
      <Select
        value={record.activeValue}
        name={record.name}
        onChange={
          (e)=>{
            let list = table_list;
            list[ (pages.current-1)*5 + index].activeValue=String(e.target.value)||''
            set_table_list([...list]) 
          }
        }
      >
        {
          tags.map((item,index)=>{
            return(
              <MenuItem value={item.value} key={index}>{item.label}</MenuItem>
            )
          })
        }
      </Select>
    </FormControl>)}
    },
  ];
  const classes = useStyles();
  const rowSelection = {
    onChange: (selectedRowKeys:any, selectedRows: table_listType[]) => {
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      set_selectedRowKeys(selectedRowKeys)
    },
    selectedRowKeys
  };
  /**
  * ColorPicker 颜色发生改变时的处理函数
  *
  * @param name 该元素在 formData 中的 key
  * @param rgb ColorPicker 返回的颜色描述对象
  */
  const handleColorChange = (name: string, rgb: object) => {
    setFormData({ ...formData, [name]: rgb });
  }
  const handleformDataChange = (e:any, targetName?:string) => {
    let name = targetName || e.target.name;
    setFormData({
      ...formData,
      [name]: e.target.value
    });
  };
  const handleFormDataUpdate = (v,key) => {
    setFormData({
      ...formData,
      [key]: v
    });
  }
  const handleLinkObjChanged = obj => {
    setFormData({
      ...formData,
      link_to_obj: obj
    })
  }
  const handleImagePickerEnsure = (picUrl: string) => {
    setFormData({ ...formData, image_src: picUrl });
  };
  const triggerSave = useDebounce(()=>{
    const data = {
      name: "fonts_and_colors",
      settings: {}
    };
    Object.keys(formData).forEach(k=>{
      data.settings[k] = formData[k]
    })

    onChange('fonts_and_colors', { ...data });
  }, 500);
  const fuzzyQuery =  (list:any[], keyWord)=> {
    if (keyWord) {
      var arr = [];
      for (const [index,iterator] of list.entries()) {
        if (iterator.title.toLowerCase().match(keyWord.toLowerCase()) != null) {
          arr.push(iterator);
        }
      }
      return arr;
    }else{
      return list;
    }
    }
  const createFontModal = ()=>{
    set_pages({
      ...pages,
      current:1
    })
    set_font_modal_name('');
    set_selectedRowKeys([0]);
    set_filter_qord_weight('');
    set_table_list(font_list.map((item,index)=>{
      return {
        key: index,
        name: item.title,
        value: item.value,
        activeValue:item.value[0].value||''
      }
    })
    )
  }
  const onOkFontModal = ()=>{
    handleFormDataUpdate(table_list[selectedRowKeys[0]].activeValue,font_modal_name)
    set_is_modal_visible(false);
    createFontModal();
  }
  const openFontModal = (name:string)=>{
    set_is_modal_visible(true);
    set_font_modal_name(name);
    set_table_list(table_list.map(( item , index )=>{
      if (item.name==String(get(formData,name,'')).split('-')[0]) {
        set_selectedRowKeys([index]);
        set_pages({
          ...pages,
          current:ceil((index+1)/5)
        })
        return {
          ...item,
          activeValue:get(formData,name,item.value[0].value)
        }
      }else{
        return item
      }
    }))
  }
  const cancelFontModal = ()=>{
    set_is_modal_visible(false);
    createFontModal();
  }
  useEffect(()=>{
    set_selectedRowKeys([])
      set_table_list(fuzzyQuery(font_list,filter_qord_weight).map((item,index)=>{
        if (item.title==String(get(formData,font_modal_name,'')).split('-')[0]) {
          set_selectedRowKeys([index]);
          set_pages({
            ...pages,
            current:ceil((index+1)/5)
          })
          return {
            key: index,
            name: item.title,
            value: item.value,
            activeValue:get(formData,font_modal_name,item.value[0].value)
          };
        }else{
          return {
            key: index,
            name: item.title,
            value: item.value,
            activeValue:item.value[0].value
          }
        }
      }))
  },[filter_qord_weight])
  useEffect(() => {
    triggerSave()
  }, [formData])
  return (
    <div className="config-item-wrapper">
      <div className="module">
      <Modal 
      title="字体选择" 
      visible={is_modal_visible} 
      centered
      onOk={onOkFontModal} 
      closable={false} 
      cancelText='取消'
      onCancel={cancelFontModal}
      >
         <Input
          size='large'
          prefix={<SearchOutlined />}
          value={filter_qord_weight}
          onChange={(e)=>{
            set_filter_qord_weight(e.target.value);
          }}
         />
         <Table
        //  pageSize
        rowSelection={{
          type: 'radio',
          ...rowSelection,
        }}
        columns={TableStructure}
        dataSource={table_list}
        pagination={{
          ...pages,
          onChange: (current) => set_pages({
            ...pages,
            current
          })
        }}
      />
      </Modal>
        <div className="module-detail pt-20 border-bottom-1px">
          <div className="t16 pl-16 pb-16" onClick={triggerSave}>通用字体</div>
          <div className="module__item">
            <div className="t14 mb-8">标题</div>
            <Button 
            style={{height:40 , 
              fontFamily:formData.titleFont
            }} 
            onClick={()=>{
              openFontModal('titleFont')
            }} 
            block>{get(formData,'titleFont','Roboto-Regular').split('-')[0]}</Button>
          </div>
          <div className="module__item">
            <div className="t14 mb-8">正文</div>
            <Button
            onClick={()=>{
              openFontModal('bodyFont')
            }}
            style={{height:40 , fontFamily:formData.bodyFont}} 
            block>
              {get(formData,'bodyFont','Roboto-Regular').split('-')[0]}
              </Button>
          </div>
          <div className="module__item">
            <div className="t14 mb-8">按钮</div>
            <Button
            onClick={()=>{
              openFontModal('buttonFont')
            }}
            style={{height:40 , fontFamily:formData.buttonFont}} 
            block>
              {get(formData,'buttonFont','Roboto-Regular').split('-')[0]}
              </Button>
          </div>
          <div className="module__item">
            <div className="t14 mb-8">价格</div>
            <Button
            onClick={()=>{
              openFontModal('priceFont')
            }}
            style={{height:40 , fontFamily:formData.priceFont}} 
            block>
              {get(formData,'priceFont','Roboto-Regular').split('-')[0]}
            </Button>
          </div>
          <div className="module__item">
            <div className="t14 mb-8">字间距</div>
            <div className="slider-wrapper">
                <div className="s">
                <Slider valueLabelDisplay="auto"
                    min={0} max={2} step={0.1} name="letterSpacing"
                    value={formData.letterSpacing}
                    onChange={(e, v) => handleFormDataUpdate(v, 'letterSpacing')} />
                </div>
                <div className="tip">{formData.letterSpacing} px</div>
            </div>
          </div>
          
        </div>
        {/* 2021-10-12 将 通用颜色 去掉 */}
        {/*<div className="module-detail pt-20 border-bottom-1px">*/}
        {/*    <div className="t16 pl-16 pb-16">通用颜色</div>*/}
        {/*    /!* <div className="module__item">*/}
        {/*        <ColorPicker name="MarkingColor" defaultColor={ formData.MarkingColor } title="评分颜色" onChange={ handleColorChange } />*/}
        {/*    </div> *!/*/}
        {/*    <div className="module__item">*/}
        {/*        <div className="t14 mb-8">蒙层不透明度</div>*/}
        {/*        <div className="slider-wrapper">*/}
        {/*            <div className="s">*/}
        {/*            <Slider valueLabelDisplay="auto"*/}
        {/*                min={0} max={100} name="MaskOpacity"*/}
        {/*                value={formData.MaskOpacity}*/}
        {/*                onChange={(e, v) => handleFormDataUpdate(v, 'MaskOpacity')} />*/}
        {/*            </div>*/}
        {/*            <div className="tip">{formData.MaskOpacity} %</div>*/}
        {/*        </div>*/}
        {/*    </div>*/}
        {/*    <div className="t14 mb-8 btn-style-row pl-24 pr-16">*/}
        {/*        <span>蒙层颜色</span>*/}
        {/*        <RadioGroup*/}
        {/*        className="radio-group"*/}
        {/*        name="MaskColor"*/}
        {/*        value={ formData.MaskColor }*/}
        {/*        onChange={ (e, v) => {*/}
        {/*          handleFormDataUpdate(v, 'MaskColor');*/}
        {/*        }}>*/}
        {/*            <FormControlLabel value="black" control={<Radio name="black" />} label="黑色" />*/}
        {/*            <FormControlLabel value="white" control={<Radio name="white" />} label="白色" />*/}
        {/*        </RadioGroup>*/}
        {/*    </div>*/}
        {/*</div>*/}
      </div>
    </div>
  );
};

export default fonts_and_colors;
