import React, { useState, useContext } from "react";
import { TabContext } from "./TabContext";

interface TabProps {
  name: string | number | object;
  label: string | number;
  className?: string;
}

export const Tab: React.FC<TabProps> = props => {
  const { name, label, className = "", children, ...attrs } = props;
  const { value, onChange } = useContext(TabContext);
  return (
    <>
      <li
        {...attrs}
        onClick={() => onChange(name)}
        className={`fpp_tab-item ${className} ${
          name === value ? "fpp_tab-active" : ""
        }`}
      >
        {label}
      </li>
    </>
  );
};
