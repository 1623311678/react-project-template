import React, { useEffect, useState, useContext } from "react";
import { ImagePickerContext } from "./ImagePickerContext";
import ImageList from "./components/ImageList";
import "./index.scss";

interface VideoPickerProps {
  imageList: any[];
}
const VideoPicker: React.FC<VideoPickerProps> = props => {
  const { imageList } = props;
  const {} = useContext(ImagePickerContext);
  return (
    <div className="editor-upload-video">
      <ImageList imageList={imageList} />
    </div>
  );
};
export default VideoPicker;
