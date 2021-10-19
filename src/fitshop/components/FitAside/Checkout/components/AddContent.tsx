import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import { getPageList } from "@src/api/pageCreator";
import { get } from "lodash";

interface AddPolicyProps {
  data?: any;
  onChange?: (type: string, payload: any) => void;
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const useStyles = makeStyles(
  {
    root: {
      padding: 0
    },
    title: {
      padding: "8px 12px",
      fontSize: 14,
      backgroundColor: "#F7F8F9"
    },
    content: {
      padding: "12px"
    }
  }
);

const policyList = [
  { title: "退款政策", handle: "policies_refund_policy" },
  { title: "隐私政策", handle: "policies_privacy_policy" },
  { title: "服务条款", handle: "policies_terms_of_service" },
  { title: "物流政策", handle: "policies_shipping_policy" }
];

const AddContent: React.FC<AddPolicyProps> = ({ data, onChange }) => {
  const classes = useStyles();
  const [optionList, setOptionList] = useState(policyList);
  const { addContent } = data;

  useEffect(() => {
    (async () => {
      const res = await getPageList();
      const pageList = get(res, "data.shopSettingPageList", []);
      setOptionList(policyList.concat(pageList));
    })();
  }, []);

  return (
    <div className="module-info border-bottom-1px">
      <div className="t16 pl-16 pb-16">附加内容</div>
      <div className="module__item pl-16 pb-16">
        <Card className={classes.root}>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            自定义页面
          </Typography>
          <div className={classes.content}>
            <Autocomplete
              multiple
              id="custom-page-selector"
              options={optionList}
              disableCloseOnSelect
              disableClearable
              value={addContent || []}
              onChange={(event, value) => {
                onChange("addContent", value);
              }}
              getOptionLabel={option => option.title}
              getOptionSelected={(option, value) =>
                option.title === value.title
              }
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
              renderInput={params => (
                <TextField {...params} variant="outlined" />
              )}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AddContent;
