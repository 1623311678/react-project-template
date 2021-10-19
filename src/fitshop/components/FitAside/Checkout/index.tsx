import React, { useState, useEffect } from "react";
import Addimg from "./components/AddImg";
import BgColor from "./components/BgColor";
import SwitchGroups from "./components/SwitchGroups";
import AddContent from "./components/AddContent";
import useDebounce from "@src/hooks/useDebounce";
import "./index.scss";

interface CollectionConfigProps {
  handleChange: any;
  templateOption: any;
}

const CollectionConfig: React.FC<CollectionConfigProps> = ({
  handleChange,
  templateOption
}) => {
  const [formData, setFormData] = useState<any>({});
  const shwoModeHandle = (type: string, payload: any) => {
    const data = {
      ...formData,
      [type]: payload
    };
    setFormData(data);
    emitUpdate(data);
  };

  const emitUpdate = useDebounce(data => {
    handleChange && handleChange(data);
  }, 1000);
  useEffect(() => {
    setFormData(templateOption);
  }, [templateOption]);
  return (
    <div className="config-item-wrapper">
      <Addimg data={formData} onChange={shwoModeHandle} />
      <SwitchGroups data={formData} onChange={shwoModeHandle} />
      <BgColor data={formData} onChange={shwoModeHandle} />
      <AddContent data={formData} onChange={shwoModeHandle} />
    </div>
  );
};

export default CollectionConfig;
