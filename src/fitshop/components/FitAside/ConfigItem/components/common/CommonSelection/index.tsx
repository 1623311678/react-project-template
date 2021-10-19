import React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: 0,
      width: "100%",
      height: 36
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    },
    textArea: {
      width: "100%",
      height: "40px",
      borderColor: "#BDBDBD",
      borderRadius: "4px",
      backgroundColor: "#FFFFFF"
    }
  })
);
interface CommonSelectionProps {
  name: string;
  value: any;
  options: any[];
  onChage(name, value): void;
  title:string
}
export function CommonSelection(props: CommonSelectionProps) {
  const classes = useStyles();
  const { name, value, onChage, options,title } = props;
  return (
    <div className="module__item">
      <div className="t14 mb-8">{title}</div>
      <FormControl
        size="small"
        variant="outlined"
        className={classes.formControl}
      >
        <Select
          value={value}
          name={name}
          onChange={e => onChage(name, e.target.value)}
        >
          {options.map((item) => (
            <MenuItem value={item.key} key={item}>{item.value}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
