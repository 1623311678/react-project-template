import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import data from '../../ConfigItem/initialConfiguration/global/blog'
import useDebounce from "@src/hooks/useDebounce";

interface BlogProps {
    section?: {
        [key: string]: any;
        settings?: {
          [key: string]: any;
        }
      };
    sectionStamp?: string | number
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: 0,
      width: "100%",
      height: 36
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    }
  })
);

const Blog: React.FC<BlogProps> = ({section = {}, onChange}) => {
  const classes = useStyles();
  const [formData, setFormData] = useState<any>(()=>{
    return {
        ...data.settings,
        ...section.settings
    }
  });

  const handleFormDataChange = (e:any, targetName?:string) => {
    let name = targetName || e.target.name;
    setFormData({
      ...formData,
      [name]: e.target.value
    });
  };
  const triggerSave = useDebounce(()=>{
    const data = {
    name: "blog",
    settings: {}
    };
    Object.keys(formData).forEach(k=>{
    data.settings[k] = formData[k]
    })

    onChange('blog', { ...data });
  }, 500);

  useEffect(() => {
    triggerSave()
  }, [formData])

  return (
    <div className="config-item-wrapper">
        <div className="module">
            <div className="module-detail pt-20 border-bottom-1px">
                <div className="t16 pl-16 pb-16">博客列表</div>
                <div className="module__item">
                    <div className="t14 mb-8">博客列表图片尺寸</div>
                    <FormControl size="small" variant="outlined" className={classes.formControl}>
                        <Select
                            value={formData.BlogListPicture}
                            name="BlogListPicture"
                            onChange={e => handleFormDataChange(e, "BlogListPicture")}
                        >
                            <MenuItem value={"FiveToThree"}>5:3</MenuItem>
                            <MenuItem value={"equal"}>1:1</MenuItem>
                            <MenuItem value={"ThreeToFour"}>3:4</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Blog;
