import React, { useState, useContext } from "react";
import { ListContext } from "./ListContext";

interface ListItemProps {
  selected?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: (any) => void;
}

export const ListItem: React.FC<ListItemProps> = props => {
  const {
    className = "",
    selected = false,
    disabled = false,
    children,
    onClick,
    ...attrs
  } = props;
  // const { loading } = useContext(ListContext);
  return (
    <li
      {...attrs}
      onClick={e => onClick(e)}
      className={`fpp_list-item ${className}  ${
        disabled ? "fpp_list-disabled" : ""
      }  ${selected ? "fpp_list-active" : ""}`}
    >
      {children}
    </li>
  );
};
