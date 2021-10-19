/**
 * @description FPP 空页面
 */
import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import defaultEmptyIcon from "../../../../assets/images/fppProduct/empty.svg";
import "./index.scss";

export interface EmptyPageProps {
  emptyIcon?: string; 
  title?: string;
  info?: string;
  content?: React.ReactNode;
}

export const EmptyPage: React.FC<EmptyPageProps> = props => {
  const { 
    emptyIcon,
    title,
    info,
    content
  } = props;

  return (<Card>
    <div className="empty-page">
      <div className="empty-page-img">
        <img src={emptyIcon || defaultEmptyIcon} />
      </div>
      <div className="empty-page-title">{title}</div>
      <div className="empty-page-info">{info}</div>
      <div className="empty-page-content">
        {content}
      </div>
    </div>
  </Card>);
}

export default EmptyPage;