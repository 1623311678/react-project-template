import React from 'react'
import ColorPicker from "@src/common/components/ColorPicker";
import FontSizeSelector from "../widgets/FontSizeSelector";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";
import ProjectLinkSelector from "@src/common/components/ProjectLinkSelector";
import './config.scss'


/******
 * 配置模块自定义组件
 * @param {string} Component 组件名称 LabelColorPicker
 * @param {string} formName 表单中对应的名称 module_bg_color
 * @param {string} label 文字 标题
 * @param {boolean} marginTop 是否存在距离顶部的距离 true
 * @param {string} type 
 * 
 */



/**********
 * label 颜色选择器
 */
 function Label (props) {
    const {
        item:{label}
    } = props
    return <span >{label}</span>
}

/**********
 * label 颜色选择器
 */
function LabelColorPicker (props) {
    const {
        item:{label, formName }, onChange, formData
    } = props
    const onColorPickerChange = (name, rgb) => {
        onChange(name, rgb)
    }
    return <>
        {label}
        <ColorPicker
            position="left-bottom"
            name={formName}
            defaultColor={formData[formName]}
            onChange={onColorPickerChange}
        />
  </>
}

// 分割线
function Divider () {
    return <div className="divider"></div>
}

// 输入框
function Input (props) {
    const {
        item:{ formName}, onChange, formData
    } = props
    
    const onInputChange = (e) => {
        onChange(formName, e.target.value)
    }
    return <TextField
        size="small"
        name={formName}
        fullWidth
        value={formData[formName]}
        onChange={onInputChange}
        variant="outlined"
    />
}

// 字号选择器
function FontSize (props) {
    const {
        item:{ label, formName, type}, onChange, formData
    } = props
    return <FontSizeSelector
        title={label}
        type={type}
        value={formData[formName]}
        handleSelector={e => onChange(formName, e.target.value)}
    />
}

// 添加链接
function Link (props) {
    const {
        item, item:{ label, formName }, onChange, formData
    } = props
    return <>
        <div className="t14 mb-8">{label}</div>
        <ProjectLinkSelector
            initialValue={formData[formName]}
            onLinkSelected={e => onChange(formName, { ...e, key_map: "id,handle,title" })}
            placeholder="请选择跳转到的页面"
            {...item}
        />
    </>
}

function SwitchTpl (props) {
    const {
        item:{ label, formName }, onChange, formData
    } = props
    return <div className="jusitify-between">
        {label}
        <Switch
            checked={formData[formName]}
            onChange={(e, checked) => onChange(formName, checked)}
            color="primary"
            name={formName}
            inputProps={{ "aria-label": "primary checkbox"}}
        />
    </div>
}


export default {
    Label,
    LabelColorPicker,
    Divider,
    Input,
    FontSize,
    Link,
    SwitchTpl
}

