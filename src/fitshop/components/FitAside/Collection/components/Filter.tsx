import React, { useState, useEffect, useRef } from 'react'
import Switch from "@material-ui/core/Switch";
import AddIcon from "@material-ui/icons/Add";
import TagFilter from './TagFilter';
import PriceFilter from './PriceFilter';
import AttrFilter from './AttrFilter';
import TypeFilter from './TypeFilter';

interface FilterCompProps {
  data?: {
    isFilter?: boolean,
    tagFilter?: any,
    priceFilter?: any,
    attrFilter?: any,
    filters?: any,
    typeFilter?: [string],
    selectTypeFilters?: [string],
    showCount?: boolean,
  };
  onChange: any;
  filterChange: any;
  onDelFilter: any;
}

const FilterComp: React.FC<FilterCompProps> = ({
  data: {
    isFilter,
    tagFilter,
    priceFilter,
    attrFilter = [],
    filters = [],
    typeFilter = [],
    selectTypeFilters = [],
    showCount = false,
  },
  onChange,
  filterChange,
  onDelFilter
}) => {
  const [showAdd, setShowAdd] = useState(false)
  const add_Btn = useRef(null)
  const [filter, setFilter] = useState(false)

  // 添加筛选
  const selectAddType = (type) => {
    setFiltersStatus(type)
    setShowAdd(false)
  }
  // 删除筛选
  const handleDel = (type) => {
    onDelFilter(type)
  }
  // 设置筛选状态
  const setFiltersStatus = (type) => {
    switch (type) {
      case 'tagFilter':
        onChange('tagFilter', {
          title: ""
        })
        break;
      case 'priceFilter':
        onChange('priceFilter', {
          title: ""
        })
        break;
      case 'typeFilter':
        onChange('typeFilter', [])
        break;
      default:
        onChange('attrFilter', [])
        break;
    }
  }

  useEffect(() => {
    setFilter(isFilter)
  }, [isFilter])
  return (
    <div className="module-info border-bottom-1px">
      <div className="t16 pl-16 pb-16">筛选纬度</div>
      <div className="module__item">
        <div className="t14 mb-8 title-only-one-row">
          产品筛选
          <Switch
            checked={filter}
            color="primary"
            name="title_uppercase"
            onChange={(e) => { onChange('isFilter', e.target.checked) }}
          />
        </div>
      </div>
      {isFilter &&
        <div className="adding-wrapper pl-24 pr-24">
          <div className="t14 mb-8 title-only-one-row">
            展示产品数量
            <Switch
              checked={showCount}
              color="primary"
              name="showCount"
              onChange={(e) => { onChange('showCount', e.target.checked) }}
            />
          </div>
          <TypeFilter data={typeFilter} filters={selectTypeFilters} onChange={filterChange} />
          <AttrFilter data={attrFilter} filters={filters} onChange={filterChange} />
          {tagFilter && <TagFilter data={tagFilter} onDel={() => { handleDel('tagFilter') }} onChange={filterChange} />}
          {priceFilter && <PriceFilter data={priceFilter} onDel={() => { handleDel('priceFilter') }} onChange={filterChange} />}
          <div className="module-detail pt-20">
            {showAdd && <ul className="append-block-btn-modal">
              <li className={`item${tagFilter ? ' active' : ''}`} onClick={() => { selectAddType('tagFilter') }}>标签筛选{tagFilter ? "（已添加）" : ''}</li>
              <li className={`item${priceFilter ? ' active' : ''}`} onClick={() => { selectAddType('priceFilter') }}>价格筛选{priceFilter ? "（已添加）" : ''}</li>
            </ul>}
            <div className="module__item" ref={add_Btn}>
              {
                tagFilter && priceFilter ? (
                  <div className="append-block-btn" style={{ background: "#f5f5f5", border: "1px solid #d9d9d9", color: "rgba(0,0,0,.25)" }}><AddIcon className="pr-6" />添加内容</div>
                ) : (<div className="append-block-btn" onClick={(e) => {
                  setShowAdd(!showAdd)
                }}><AddIcon className="pr-6" />添加内容</div>)
              }

            </div>
          </div>

        </div>
      }
    </div>
  )
}

export default FilterComp