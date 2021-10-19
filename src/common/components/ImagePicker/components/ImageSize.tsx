import React, { useEffect, useState, useContext } from "react";
import { Select } from "antd";
const { Option } = Select;
import { sizeList } from "../utils";
import { ImagePickerContext } from "../ImagePickerContext";

import "../index.scss";

interface ImageSizeProps {}
const ImageSize: React.FC<ImageSizeProps> = props => {
  const {} = props;
  const { currentImage, setCurrentImage } = useContext(ImagePickerContext);
  return (
    <div className="editor-upload-image-size">
      <div className="editor-upload-image-alt-title">尺寸:</div>
      <Select
        value={currentImage.imageSize}
        onChange={value =>
          setCurrentImage({ ...currentImage, imageSize: value })
        }
      >
        {sizeList.map(item => (
          <Option key={item.name} value={item.value}>
            {item.name}
          </Option>
        ))}
      </Select>
    </div>
  );
};
export default ImageSize;
