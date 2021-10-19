import { Input, Spin } from "antd";
import React, { useState, useContext } from "react";

import ImageList from "./components/ImageList";
import ImageFreeStuff from "./components/ImageFreeStuff";
import ImageReplaceText from "./components/ImageReplaceText";
import ImageSize from "./components/ImageSize";
import { ImagePickerContext } from "./ImagePickerContext";
import useEventEmitter from "@src/hooks/useEventEmitter/useEventEmitter";

import { Tabs, Tab } from "@src/common/components/Tab";
import errorIcon from "../../../../assets/images/fppProduct/error.svg";

import { DEFAULT_SIZE } from "./ModelPicker";
import "./index.scss";

interface ImagePickerProps {
  ImageTabList: any[];
  uploadedImages: any[];
  productImages: any[];
  productVideos: any[];
  uploadedVideos: any[];
  personalizeImages: any[];
  showSizeChanger?: boolean;
  pageCursor: object;
}
const ImagePicker: React.FC<ImagePickerProps> = props => {
  const {
    ImageTabList,
    showSizeChanger,
    uploadedImages,
    productImages,
    uploadedVideos,
    personalizeImages,
    pageCursor
  } = props;
  const [errorVideoUrl, setErrorVideoUrl] = useState(false);
  const { useListener } = useEventEmitter();
  const {
    currentTab,
    setCurrentImage,
    currentImage,
    loading,
    setLoading,
    setCurrentTab,
    setIsFirstFetch
  } = useContext(ImagePickerContext);

  const handleChangeTab = key => {
    setLoading(false);
    setErrorVideoUrl(false);
    setCurrentImage({
      imageId: "",
      imageUrl: "",
      imageWidth: "",
      imageHeight: "",
      imageSize: DEFAULT_SIZE,
      imageAlt: "",
      videoSrc: "",
      uploadType: "",
      videoType: ""
    });
    setCurrentTab(key);
    setIsFirstFetch(false);
  };
  useListener("VIDEO_URL", flag => {
    setErrorVideoUrl(flag);
  });
  return (
    <>
      <Tabs value={currentTab} onChange={handleChangeTab}>
        {ImageTabList.length &&
          ImageTabList.map((item, index) => (
            <Tab key={index} label={item.name} name={item.value}></Tab>
          ))}
      </Tabs>
      {currentTab === 1 && (
        <Spin spinning={loading}>
          <ImageList
            imageList={uploadedImages}
            ImageTabList={ImageTabList}
            pageCursor={pageCursor}
          />

          {currentImage.imageId && (
            <>
              {<ImageReplaceText />}
              {showSizeChanger && <ImageSize />}
            </>
          )}
        </Spin>
      )}
      {currentTab === 2 && (
        <Spin spinning={loading}>
          <ImageList
            imageList={productImages}
            ImageTabList={ImageTabList}
            pageCursor={pageCursor}
          />
          {showSizeChanger && currentImage.imageId && <ImageSize />}
        </Spin>
      )}
      {currentTab === 3 && (
        <Spin spinning={loading}>
          <ImageList
            imageList={uploadedVideos}
            ImageTabList={ImageTabList}
            pageCursor={pageCursor}
          />
        </Spin>
      )}

      {currentTab === 4 && (
        <div className="editor-product-image-url">
          <div>粘贴YouTube URL</div>
          <Input
            placeholder="https://"
            onChange={e =>
              setCurrentImage({ ...currentImage, videoSrc: e.target.value })
            }
          />
          {errorVideoUrl ? (
            // <div className="media-url-error-info">
            //   <img src={errorIcon} alt="errorIcon" />
            //   无效的 URL。
            // </div>

            <div className="media-url-error-info">
              <img src={errorIcon} alt="errorIcon" />
              URL 无效。使用有效的 YouTube 或再试一次。
            </div>
          ) : (
            <div className="media-url-info">我们当前支持 YouTube 视频</div>
          )}
        </div>
      )}
      {currentTab === 5 && (
        <Spin spinning={loading}>
          <ImageList
            imageList={personalizeImages}
            ImageTabList={ImageTabList}
            pageCursor={pageCursor}
          />
        </Spin>
      )}
      {currentTab === 6 && <ImageFreeStuff />}
    </>
  );
};

export default ImagePicker;
