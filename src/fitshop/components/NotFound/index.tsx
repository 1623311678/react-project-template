import React from "react";
import { IS_PRODUCTION_MODE } from "@src/config";
import "./index.scss";
const ThemesNotFount: React.FC = props => {
  const handleClick = () => {
    if (IS_PRODUCTION_MODE) {
      window.location.href = "/admin/themeTemplate";
    } else {
      window.location.href = "/themeTemplate";
    }
  };
  return (
    <div className="ThemesNotFount">
      <div className="shade"></div>
      <p>找不到您查找的模版</p>
      <div className="goTemp" onClick={handleClick}>
        前往模版
      </div>
    </div>
  );
};
export default ThemesNotFount;
