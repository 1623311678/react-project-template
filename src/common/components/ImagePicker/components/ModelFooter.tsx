import React, { useEffect, useContext } from "react";
import { ImagePickerContext } from "../ImagePickerContext";
// import Button from "@material-ui/core/Button";
import { Button } from "antd";
import {
  getYtbVideoId,
  youtubeToAjax,
  youtubeToIframe
} from "@src/common/utils";
import { productShopCreateMedia } from "@src/api/products";
import { VIDEO, IMAGE, ALL } from "../ModelPicker";
import useEventEmitter from "@src/hooks/useEventEmitter/useEventEmitter";

import "../index.scss";

interface ModelFooterProps {
  pageCursor: object;
  ImageTabList: any[];
  onEnsure: (any) => void;
}
const ModelFooter: React.FC<ModelFooterProps> = props => {
  const { pageCursor, onEnsure } = props;
  const { useEmit } = useEventEmitter();
  const {
    currentTab,
    currentImage,
    modalType,
    updateFnDispatch,
    setCurrentImage
  } = useContext(ImagePickerContext);

  const handleOk = () => {
    // 根据url上传YTB视频
    if (currentTab == 4) {
      // let pattern = /(http(s?)|):\/\/www.youtube.com\/watch\?v=(.+)/;
      // let pattern2 = /(http(s?)|):\/\/youtu.be\/\w{1,}/;
      const ytbId = getYtbVideoId(currentImage.videoSrc);

      if (ytbId) {
        // 转换成后端接口接受的ytb视频格式
        const originalSource = youtubeToAjax(ytbId);
        const queryParams = {
          mediaContentType: "EXTERNAL_VIDEO",
          originalSource
        };
        // 转换成iframe播放的ytb视频格式
        const videoSrc = youtubeToIframe(ytbId);
        productShopCreateMedia([queryParams]).then(data => {
          const res = data?.data?.shopImageUpload?.image[0];
          const currentImageObj = {
            imageId: res.id,
            imageUrl: res.originalSrc,
            imageWidth: "",
            imageHeight: "",
            imageSize: "",
            imageAlt: "",
            videoSrc,
            uploadType: "VIDEO",
            videoType: "YTB"
          };
          setCurrentImage(currentImageObj);
          updateFnDispatch({ type: "close" });
          onEnsure && onEnsure(currentImageObj);
        });
      } else {
        useEmit("VIDEO_URL", true);
      }
    } else {
      onEnsure && onEnsure(currentImage);
      updateFnDispatch({ type: "close" });
    }
  };

  useEffect(() => {}, [pageCursor]);

  const modalTitle = () => {
    switch (modalType) {
      case VIDEO:
        return "插入视频";
      case IMAGE:
        return "插入图片";
      case ALL:
        return "插入媒体";
      default:
        return "插入图片";
    }
  };

  return (
    <div className="fpp_ImageModelFooter">
      <div>
        <Button onClick={() => updateFnDispatch({ type: "close" })}>
          取消
        </Button>
        <Button
          disabled={!currentImage.imageId && !currentImage.videoSrc}
          onClick={handleOk}
          className={
            !currentImage.imageId && !currentImage.videoSrc ? "" : "active-btn"
          }
        >
          {modalTitle()}
        </Button>
      </div>
    </div>
  );
};
export default ModelFooter;
