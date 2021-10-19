import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";

interface InsPlusProps {
  section: {
    [key: string]: any;
  };
}

const InsPlus: React.FC<InsPlusProps> = props => {
  const { section } = props;
  return (
    <div className="config-item-wrapper">
      <div className="module-info">
        <div className="module__item">
          <div className="t14 mb-8">模块标题</div>
          <TextField
            size="small"
            placeholder={section.name}
            variant="outlined"
          />
          <div className="t14 mt-10">模块背景色</div>
        </div>
      </div>
      <div className="module-detail pt-20">
        <div className="t16 pl-16 pb-16">图片</div>
        <div className="module__item">
          <div className="t14 mb-8">图文布局</div>
          <TextField size="small" placeholder="左右图文" variant="outlined" />
        </div>
        <div className="module__item">
          {/* <div className="t14 mb-8">上传图片</div>
          <div className="pic-upload">
            <PicUpload handleClick={handlePicUpload}></PicUpload>
          </div>
          <div className="t12 mt-8">建议尺寸：1920*667px，高度可自适应</div> */}
        </div>
        <div className="module__item">
          <div className="t14 mb-8">标题</div>
          <TextField size="small" placeholder="主标题" variant="outlined" />
        </div>
        <div className="module__item">
          <div className="t14 mb-8">副标题</div>
          <TextField size="small" placeholder="副标题" variant="outlined" />
        </div>
      </div>
    </div>
  );
};

export default InsPlus;
