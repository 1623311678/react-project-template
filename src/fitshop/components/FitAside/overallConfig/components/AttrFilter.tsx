import React from 'react'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Checkbox from '@material-ui/core/Checkbox';
import { letterSort } from '@src/orders/tools';

interface AttrFilterProps {
  filters?: any;
  data: any;
  onChange?: any
}

let AttrFilter: React.FC<AttrFilterProps> = ({
  filters,
  data,
  onChange
}) => {
  if (!data) return null

  const ArrData = Object.keys(data)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('[event.target.name]: event.target.checked', {
      [event.target.name]: data[event.target.name]
    }, event.target.checked)
    const type = "attrFilter"
    if (event.target.checked) {
      onChange(type, { ...filters, [event.target.name]: data[event.target.name] })
      return
    }
    filters[event.target.name] && delete filters[event.target.name]
    onChange(type, filters)
  };


  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
      >
        选择要展示图片的属性
      </AccordionSummary>
      <AccordionDetails className="accordionDetail">
        {
          ArrData.map((_, index) => {
            return (
              <div className="cardItem" key={index}>
                <div className="module__item">
                  <div className="t14 mb-8">
                    <Checkbox
                      onChange={handleChange}
                      checked={Object.keys(filters).indexOf(_) !== -1}
                      color="primary"
                      inputProps={{ 'aria-label': 'secondary checkbox' }}
                      name={_}
                    />
                    <span>{_}</span>
                  </div>
                </div>
              </div>
            )
          })
        }
      </AccordionDetails>
      {/* <AccordionDetails className="accordionDetail">
        <div className="cardItem">
          <div className="module__item">
            <div className="t14 mb-8">
              <span>标题</span>
            </div>
            <TextField
              size="small"
              name="name"
              value={data.title || ''}
              onChange={(e)=>{onChange('attrFilter.title', e.target.value)}}
              variant="outlined"
            />
          </div>
          <div className="module__item">
            <div className="t14 mb-8">
              <span>属性</span>
            </div>
            <TextField
              size="small"
              name="name"
              value={data.content || ''}
              onChange={(e)=>{onChange('attrFilter.content', e.target.value)}}
              variant="outlined"
            />
          </div>
        </div>
        <div className="delete-row" onClick={onDel}><DeleteIcon />删除内容</div>
      </AccordionDetails> */}
    </Accordion>
  )
}

export default AttrFilter