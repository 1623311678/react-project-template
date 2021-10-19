import React from 'react'
import Icon from "@src/common/components/Icon";
import TextField from "@material-ui/core/TextField";
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Switch from "@material-ui/core/Switch";

const useStyles = makeStyles({
  spaceBetween: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  inputWidth:{
    width: '100%'
  }
});

interface RecommendProps {
  data?:{
    recommendShow?:boolean,
    recommendTitle?: string,
    recommendCount?: number,
  },
  onChange: any
}

const Recommend: React.FC<RecommendProps> = ({
  data:{
    recommendShow=true,
    recommendTitle,
    recommendCount
  },
  onChange
}) => {
  const classes = useStyles();
  const realNumber = typeof recommendCount === 'number' ? recommendCount : 3
  return (
    <div className="module-info border-bottom-1px">
      <div className="t16 pl-16 pb-16">推荐</div>
      <div className="module__item mb0">
          <div className="t14 mb-8 title-only-one-row">
              打开推荐
              <Switch
              color="primary"
              name="recommendShow"
              inputProps={{ "aria-label": "primary checkbox" }}
              checked={recommendShow}
              onChange={(e, checked:boolean) => {
                onChange('recommendShow', checked)
              }}
              />
          </div>
      </div>
      {recommendShow&&
      <>
        <div className="module__item">
          <div className={`t14 mb-8 ${classes.spaceBetween}`}>
            <span>推荐标题</span>
            <Icon name="iconcaise" />
          </div>
          <TextField
            size="small"
            name="name"
            className={classes.inputWidth}
            value={recommendTitle || ''}
            onChange={(e)=>{onChange('recommendTitle', e.target.value)}}
            variant="outlined"
          />
        </div>
        <div className="module__item">
          <div className="t14 mb-8">
            <span>推荐产品数量</span>
          </div>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs>
              <Slider
                min={3}
                max={5}
                value={realNumber}
                onChange={(_,val)=>{onChange('recommendCount', val)}}
              />
            </Grid>
            <Grid item>
              <span>{realNumber}个</span>
            </Grid>
          </Grid>
        </div>
      </>
      }
    </div>
  )
}

export default Recommend