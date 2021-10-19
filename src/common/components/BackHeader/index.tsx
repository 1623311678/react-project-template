/**
 * @name 页面内容区标题
 * @param name    页面标题
 * @param isBack  是否显示返回按钮
 * @param backUrl 自定义跳转页面
 */

import React from "react";
import { useHistory } from "react-router-dom";
import Icon from "../Icon";
import "./index.scss";

interface BackHeaderProps {
  className?: string;
  isBack?: boolean;
  backUrl?: string | (() => void);
  size?: string | number;
  title: string;
  BackClick?:any;
  cusTitleStyle?:React.CSSProperties
}
export const BackHeader: React.FC<BackHeaderProps> = props => {
  const {
    className = "",
    isBack = false,
    title = "",
    backUrl = "",
    children,
    BackClick,
    cusTitleStyle,
    ...attrs
  } = props;
  const history = useHistory();
  const handleBackClick = () => {
    if(BackClick){
      BackClick()
    }else{if (typeof backUrl === "string") {
      if (backUrl) {
        history.push(backUrl);
      } else {
        history.goBack();
      }
    } else {
      backUrl();
    }}
  };
  return (
    <div {...attrs} className={`fpp_back ${className}`}>
      <div className="fpp_back-left">
        {isBack && (
          <span onClick={handleBackClick} className="fpp_back-icons">
            <Icon className="fpp_back-icon" name="iconhuitui" />
          </span>
        )}
        <div
          style={{ fontSize: isBack ? "18px" : "20px",...cusTitleStyle }}
          className="fpp_title"
        >
          {title}
        </div>
      </div>
      <div className="fpp_back-right">{children}</div>
    </div>
  );
};

export default BackHeader;
