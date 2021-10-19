import React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputBase from "@material-ui/core/InputBase";
import { withStyles } from "@material-ui/core/styles";
import ColorPicker from "@src/common/components/ColorPicker";

const BootstrapInput = withStyles(theme => ({
  root: {
    width: "100%"
  },
  input: {
    borderRadius: 4,
    position: "relative",
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
    }
  }
}))(InputBase);

const Disconut = ({ data, onChange }) => {
  const {
    showLogo = {
      type: "none"
    }
  } = data;
  return (
    <div className="module-info border-bottom-1px">
      <div className="t16 pl-16 pb-16">Logo与站点标题</div>
      <div className="module__item">
        <div className="t14 mb-8">展示Logo与站点标题</div>
        <Select
          value={showLogo ? showLogo.type : "none"}
          input={<BootstrapInput />}
          onChange={e => {
            onChange("showLogo", {
              ...showLogo,
              type: e.target.value
            });
          }}
        >
          <MenuItem value={"none"}>无</MenuItem>
          <MenuItem value={"logo"}>展示站点Logo</MenuItem>
          <MenuItem value={"name"}>展示站点标题</MenuItem>
        </Select>
      </div>
      {showLogo && showLogo.type === "name" && (
        <div className="module__item">
          <div className="t14 mb-8 title-only-one-row">
            标题颜色
            <ColorPicker
              position="left-bottom"
              name="color"
              defaultColor={showLogo.color || "#222"}
              onChange={(_, color) => {
                onChange("showLogo", { ...showLogo, color });
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Disconut;
