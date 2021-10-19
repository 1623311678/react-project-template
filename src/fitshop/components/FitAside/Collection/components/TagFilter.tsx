import React from 'react'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from "@material-ui/icons/Delete";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";

interface TagFilterProps {
  onDel: any;
  data: any;
  onChange?: any
}

const TagFilter: React.FC<TagFilterProps> = ({
  onDel,
  data = {
    title: '',
    showAll: true,
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
        标签筛选
      </AccordionSummary>
      <AccordionDetails className="accordionDetail">
        <div className="cardItem">
          <p className="des">标签可在后台<span>主题设置</span>模块设置标题</p>
          <div className="module__item">
            <div className="t14 mb-8">
              <span>标题</span>
            </div>
            <TextField
              size="small"
              name="name"
              value={data.title || ''}
              onChange={(e) => { onChange('tagFilter.title', e.target.value) }}
              variant="outlined"
            />
          </div>
          <div className="module__item">
            <div className="t14 mb-8 title-only-one-row">
              显示所有标签
              <Switch
                checked={data.showAll || false}
                color="primary"
                name="title_uppercase"
                inputProps={{ "aria-label": "primary checkbox" }}
                onChange={(e) => { onChange('tagFilter.showAll', e.target.checked) }}
              />
            </div>
            <p className="des">自动隐藏筛选结果为空的标签</p>
          </div>
          <div className="module__item">
            <div className="t14 mb-8">
              <span>显示部分标签</span>
            </div>
            <TextField
              size="small"
              name="name"
              value={data.content || ''}
              onChange={(e) => { onChange('tagFilter.content', e.target.value) }}
              variant="outlined"
            />
            <p className="des">仅当“显示所有标签”关闭时，才会显示此处设置的标签，多个标签以英文逗号隔开。</p>
          </div>
        </div>
        <div className="delete-row" onClick={onDel}><DeleteIcon />删除内容</div>
      </AccordionDetails>
    </Accordion>
  )
}

export default TagFilter