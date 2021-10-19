import Card from '@material-ui/core/Card';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useEffect, useState } from "react";
import { get } from "lodash";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const useStyles = makeStyles({
  root: {
    padding: 0,
  },
  title: {
    padding: '8px 12px',
    fontSize: 14,
    backgroundColor: '#F7F8F9',
  },
  content: {
    padding: '12px',
  },
});

interface CustomPageProps {
  data?: object;
  pageList?: [],
  onChange: any;
}

const CustomPage: React.FC<CustomPageProps> = ({ data={
  blocks:[]
}, pageList , onChange }) => {
  
  const classes = useStyles();
  const [customPageList, setCustomPageList] = useState([]);
  const [selectPageList, setSelectPageList] = useState([]);//模板中存储的选中数据
  console.log('selectPageList=====', selectPageList);
  console.log('customPageList=====', customPageList);
  console.log('data=====', data);
  
  const [select, setSelect] = useState([]);//自定义页面
  const [activeObj,setActiveObj]=useState(null);//自定义产品特别说明
  
  const [isUpdate , setIsUpdate]=useState(null);

  useEffect(() => {
    createData()
  }, [selectPageList,customPageList]);
  useEffect(() => {
    const list = pageList.filter(item=>get(item,'published',false))
    setCustomPageList(list)
  }, [pageList]);
  useEffect(()=>{
    let List = []
    if (get(data,'blocks.length',0) > 0 ) {
      List = get(data,'blocks',[]).map(item => item.link_to_obj);
    }
    setSelectPageList(List)
  },[data])
  useEffect(()=>{
    if (isUpdate!=null) {
      onChangeEvent()
    }
  },[isUpdate])
  const createData = ()=>{
      let selectModel = []
      let activeObjModel = null;
      for (const iterator of selectPageList) {
        let type = get(iterator,'type','')
        switch (type) {
          case 'pages':
            let active = pageList.filter(item=>get(item,'published',false)).find(item => item.id == iterator.id)
            if (active) {
              selectModel.push(active)
            }
            break;
          case 'Instructions':
            activeObjModel=pageList.filter(item=>get(item,'published',false)).find(item => item.id == iterator.id);
            break;
        
          default:
            break;
        }
      }
      setSelect(selectModel)
      if (activeObjModel) {
        setActiveObj({...activeObjModel})
      }
  }
  const onChangeEvent = ()=>{
    let nextSelect = select.map(({ id, title , handle }) => ({
      link_to_obj: { id, title , handle, key_map: 'id,title,handle', type: 'pages' }
    }));
    if (activeObj) {
      const { id, title , handle } = activeObj
      nextSelect.push({link_to_obj:{ id, title , handle, key_map: 'id,title,handle', type: 'Instructions' }})
    }
    onChange('blocks', nextSelect);
  }
  return (
    <div className="module-info border-bottom-1px">
        <div className="t16 pl-16 pb-16">附加内容</div>
        <div className="module__item pl-16 pb-16">
          <Card className={classes.root}>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              自定义页面
            </Typography>
            <div className={classes.content}>
              <Autocomplete
                multiple
                id="custom-page-selector"
                options={customPageList}
                disableCloseOnSelect
                disableClearable
                value={select}
                onChange={(event, value) => {
                  setSelect(value);
                  setIsUpdate(!isUpdate)
                }}
                getOptionLabel={(option) => option.title}
                renderOption={(option, { selected }) => (
                  <React.Fragment>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.title}
                  </React.Fragment>
                )}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" />
                )}
              />
            </div>
          </Card>
        </div>
        <div className="module__item pl-16 pb-16">
          <Card className={classes.root}>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              自定义产品特别说明
            </Typography>
            <div className={classes.content}>
            {customPageList.length>0&&
            <Autocomplete
              id="CustomInstructions"
              options={customPageList}
              getOptionLabel={(option) =>{
                  return option.title
              }}
              value={activeObj}
              onChange={ (event, value) => {
                  setActiveObj(value)
                  setIsUpdate(!isUpdate)
              }}
              renderInput={(params) => (
                  <TextField {...params} variant="outlined" />
              )}
              />}
            </div>
          </Card>
      </div>
    </div>
  );
};

export default CustomPage;
