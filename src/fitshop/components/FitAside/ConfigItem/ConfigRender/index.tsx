import React,{ useState } from 'react'
import useDebounce from "@src/hooks/useDebounce";
import Comps from './ComponentCollection'
import './config.scss'

interface CustomComponentProps {
  section: {
    [key: string]: any;
  };
  sectionStamp: string | number;
  onChange:(params1:any,params2:any)=>void
}


function renderItem (props) {
    const { item: { Component, marginTop }, idx } = props
    const Comp = Comps[Component]
    return Comp ? <div  
        className={`c configItemContaienr ${Component} ${marginTop ? 'marginTop' : ''}`}
        key={`${Component}_${idx}`}
    >
        {Comp(props)}
    </div> : <span>未找到匹配组件</span>
}

function mixinHackData ({item, section}) {
    if (section.type === "rich_text" && item.Component === 'Link') {
        item.selectionPosition = 'bottom'
    }
    return item
}


function ConfigRender ({
    layoutConfig, onChange, sectionStamp, section
}) {
    const [formData, setFormData] = useState(createData(true));

    const onFormDataChange = (name, value) => {
        const newFormData = {
            ...formData,
            [name]: value
        }
        setFormData(newFormData);
        triggerOnChange(newFormData)
    };

    function createData (isFormData=false) {
        const sectionCatch = JSON.parse(JSON.stringify(section))
        if (isFormData) {
            return {
                name: sectionCatch.name,
                blocks: sectionCatch.blocks,
                ...sectionCatch.settings                
            }
        }
        return {
            ...sectionCatch,
            name: sectionCatch.name,
            blocks: sectionCatch.blocks,
        }
    }

    const triggerOnChange = useDebounce((newFormData) => {
        const data = createData()
        Object.keys(newFormData).forEach(k => {
            if (k !== "blocks") {
                data.settings[k] = newFormData[k];
            }
        })
        onChange(sectionStamp, data);
    }, 500);

    return <div className="config-render-container">
        {layoutConfig.map((item, idx) => renderItem({
            item: mixinHackData({item, section}),
            onChange: onFormDataChange,
            formData,
            idx
        }))}
    </div>
}

const CustomComponent: React.FC<CustomComponentProps> = props => {
    const { sectionStamp, section, onChange } = props;
    return ConfigRender({
      layoutConfig: section.layoutConfig, 
      onChange,
      section,
      sectionStamp
    });
  };
export default CustomComponent