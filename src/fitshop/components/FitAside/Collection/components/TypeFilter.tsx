import React from 'react'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Checkbox from '@material-ui/core/Checkbox';

interface TypeFilterProps {
  filters?: [string];
  data: [string];
  onChange?: (type, payload) => void;
}

/**
 * 分类筛选组件
 * 
 * @param {array} filters 存储已选中的 option 元素
 * @param {array} data 存储所有可选的 option 元素
 * @param {function} onChange 已选 option 元素发生变化时的处理函数
 * @returns React element
 */
const TypeFilter: React.FC<TypeFilterProps> = ({ filters, data, onChange }) => {
  if (!data) { return null };

  /**
   * 点击 option 元素时，在 filters 中查询是否已存在该元素：
   *  - 如果 filters 中已存在该元素，则将其移出 filters
   *  - 如果 filters 中没有该元素，则将其添加到 filters
   * 
   * @param {object} event 事件描述对象
   */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    const targeIndex = filters.indexOf(name);
    if (targeIndex === -1 && checked) {
      filters.push(name);
    } else {
      filters.splice(targeIndex, 1);
    }
    onChange("typeFilter", [ ...filters ]);
  };

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content">
        分类筛选
      </AccordionSummary>
      <AccordionDetails className="accordionDetail">
        {
          data.map((item, index) => (
            <div className="cardItem" key={index}>
              <div className="module__item">
                <div className="t14 mb-8">
                  <Checkbox
                    onChange={handleChange}
                    checked={filters.indexOf(item) !== -1}
                    color="primary"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                    name={item}
                  />
                  <span>{item}</span>
                </div>
              </div>
            </div>
          ))
        }
      </AccordionDetails>
    </Accordion>
  )
}

export default TypeFilter;