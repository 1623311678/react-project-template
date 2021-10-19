// 分页
import React, { memo } from 'react'
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import "./index.scss";

export interface FppPaginationProps {
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  beforeCallback?: () => void;
  afterCallback?: () => void;
}

const Pagination: React.FC<FppPaginationProps> = ({
  hasPreviousPage,
  hasNextPage,
  beforeCallback,
  afterCallback
}) => {

  const handleClickBefore = () => {
    beforeCallback();
  }

  const handleClickAfter = () => {
    afterCallback();
  }

  return (
  <div className="table-pagination">
    <div
      className={`pagination-btn ${!hasPreviousPage && 'forbid-click'}`}
      onClick={hasPreviousPage?handleClickBefore:()=>{}}
    >
      <LeftOutlined />
    </div>
    <div
      className={`pagination-btn ${!hasNextPage && 'forbid-click'}`}
      onClick={hasNextPage?handleClickAfter:() => {}}
    >
      <RightOutlined />
    </div>
  </div>
  )
}

export default memo(Pagination)