import React, { useEffect, useState, useContext } from "react";
import { Input } from "antd";
import { ImagePickerContext } from "../ImagePickerContext";

import "../index.scss";

interface ImageReplaceTextProps {}
const ImageReplaceText: React.FC<ImageReplaceTextProps> = props => {
  const {} = props;
  const { currentImage, setCurrentImage } = useContext(ImagePickerContext);
  return (
    <div className="editor-upload-image-alt">
      <div className="editor-upload-image-alt-title">图片替换文本</div>
      <Input
        onChange={e =>
          setCurrentImage({ ...currentImage, imageAlt: e.target.value })
        }
      />
    </div>
  );
};
export default ImageReplaceText;
