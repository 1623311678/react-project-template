import React, { useState, useEffect } from "react";
import ShowMode from './components/ShowMode'
import Recommend from './components/Recommend'
import Share from './components/Share'
import CustomPage from "./components/CustomPage";
import useDebounce from "@src/hooks/useDebounce";

interface ProductDetailProps {
  templateOption: any
  handleChange: any
  pageList: [],
  // activeObj:any
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  handleChange,
  templateOption,
  pageList,
  // activeObj
}) => {
  const [formData, setFormData] = useState<any>({});
  
  const shwoModeHandle = (type: string, payload: any) => {
    const data = {
      ...formData,
      [type]: payload
    }
    setFormData(data)
    emitUpdate(data)
  }
  const emitUpdate = useDebounce((data)=>{
    handleChange(data)
  }, 1000)

  useEffect(()=>{
    setFormData(templateOption)
  },[templateOption])

  return (
    <div className="config-item-wrapper">
      <ShowMode 
        data={formData}
        onChange={shwoModeHandle}
      />
      <Recommend
        data={formData}
        onChange={shwoModeHandle}
      />
      <Share
        data={formData}
        onChange={shwoModeHandle}
      />
      <CustomPage
        data={formData}
        pageList={pageList}
        onChange={shwoModeHandle}
      />
          {/* <CustomInstructions 
            data={formData}
            pageList={pageList}
            activeObj={activeObj}
            onChange={shwoModeHandle}
          /> */}
    </div>
  );
};

export default ProductDetail;
