import React from 'react'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from "@material-ui/icons/Delete";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";

interface PriceFilterProps {
  onDel: any;
  data: any;
  onChange?: any
}

const PriceFilter: React.FC<PriceFilterProps> = ({
  onDel,
  data = {
    title: '',
    content: ''
  },
  onChange
}) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
      >
        价格筛选
      </AccordionSummary>
      <AccordionDetails className="accordionDetail">
        <div className="cardItem">
          <div className="module__item">
            <div className="t14 mb-8">
              <span>标题</span>
            </div>
            <TextField
              size="small"
              name="name"
              value={data.title || ''}
              onChange={(e) => { onChange('priceFilter.title', e.target.value) }}
              variant="outlined"
            />
          </div>
          <div className="module__item">
            <div className="t14 mb-8">
              <span>价格区间的边界值</span>
            </div>
            <TextField
              size="small"
              name="name"
              value={data.content || ''}
              onChange={(e) => { onChange('priceFilter.content', e.target.value) }}
              variant="outlined"
            />
            <p className="des">设置不同价格区间的边界值，多个值以英文逗号隔开。ps，货币单位取店铺的结算货币。</p>
          </div>
        </div>
        <div className="delete-row" onClick={onDel}><DeleteIcon />  删除内容</div>
      </AccordionDetails>
    </Accordion>
  )
}

export default PriceFilter