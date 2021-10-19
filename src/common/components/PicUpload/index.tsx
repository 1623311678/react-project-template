import React from "react";
import "./index.scss";

interface PicUploadProps {
  handleClick: (e) => void;
}
const PicUpload: React.FC<PicUploadProps> = props => {
  return (
    <div className="pic-upload-wrapper" onClick={e => props.handleClick(e)}>
      + <span className="t">选择图片</span>
    </div>
  );
};

export default PicUpload;
