import React from "react";
import "./index.scss";
import { TabContext } from "./TabContext";
interface TabsProps {
  value: number | string;
  onChange?: (any) => void;
  className?: string;
}
export const Tabs: React.FC<TabsProps> = ({
  value,
  onChange,
  className = "",
  children,
  ...attrs
}) => {
  return (
    <TabContext.Provider value={{ value, onChange }}>
      <ul {...attrs} className={`fpp_tab ${className}`}>
        {children}
      </ul>
    </TabContext.Provider>
  );
};
