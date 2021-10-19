import React from 'react'
import Switch from "@material-ui/core/Switch";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';

interface BasicConfigProps {
  data?: {
    bannerWidth?: boolean,
    goodsSort?: boolean,
    ShowLogo?: boolean,
    showPagination?: boolean,
    goodsRow?: number,
    goodsRowNumber?: number,
  };
  onChange: any
}

const BasicConfig: React.FC<BasicConfigProps> = ({
  data: {
    bannerWidth = true,
    goodsSort = false,
    showPagination = true,
    goodsRow = 3,
    goodsRowNumber = 3
  },
  onChange
}) => {
  return (
    <div className="module-info border-bottom-1px">
      <div className="module__item">
        <div className="t14 mb-8 title-only-one-row">
          宽度铺满整屏
          <Switch
            checked={bannerWidth}
            color="primary"
            name="title_uppercase"
            inputProps={{ "aria-label": "primary checkbox" }}
            onChange={(e) => { onChange('bannerWidth', e.target.checked) }}
          />
        </div>
      </div>
      <div className="module__item">
        <div className="t14 mb-8 title-only-one-row">
          产品排序
          <Switch
            checked={goodsSort}
            color="primary"
            name="title_uppercase"
            inputProps={{ "aria-label": "primary checkbox" }}
            onChange={(e) => { onChange('goodsSort', e.target.checked) }}
          />
        </div>
      </div>
      {/* <div className="module__item">
        <div className="t14 mb-8 title-only-one-row">
          logo
          <Switch
            checked={ShowLogo}
            color="primary"
            name="title_uppercase"
            onChange={(e) => { onChange('ShowLogo', e.target.checked) }}
          />
        </div>
      </div> */}
      {/* <div className="module__item">
        <div className="t14 mb-8 title-only-one-row">
          <RadioGroup row defaultValue="1">
            <FormControlLabel value="1" control={<Radio color="primary" />} label="深/原色" />
            <FormControlLabel value="2" control={<Radio color="primary" />} label="浅色" />
          </RadioGroup>
        </div>
      </div> */}
      <div className="module__item">
        <div className="t14 mb-8 title-only-one-row">
          分页
          <Switch
            checked={showPagination}
            color="primary"
            name="title_uppercase"
            onChange={(e) => { onChange('showPagination', e.target.checked) }}
          />
        </div>
      </div>
      <div className="module__item">
        <div className="t14 mb-8">
          <span>展示排数</span>
        </div>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs>
            <Slider
              min={3}
              max={10}
              value={typeof goodsRow === 'number' ? goodsRow : 3}
              onChange={(_, val) => { onChange('goodsRow', val) }}
            />
          </Grid>
          <Grid item>
            <span>{goodsRow}排</span>
          </Grid>
        </Grid>
      </div>
      <div className="module__item">
        <div className="t14 mb-8">
          <span>每排产品数</span>
        </div>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs>
            <Slider
              min={3}
              max={5}
              value={typeof goodsRowNumber === 'number' ? goodsRowNumber : 3}
              onChange={(_, val) => { onChange('goodsRowNumber', val) }}
            />
          </Grid>
          <Grid item>
            <span>{goodsRowNumber}个</span>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default BasicConfig