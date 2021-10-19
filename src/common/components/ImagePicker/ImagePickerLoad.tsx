/**
 * @name  图片/视频上传组件

 * @param classNames      自定义class
 * @param initialImgSrc   初始化Image高亮
 * @param onEnsure        确认按钮回调
 * @param tabList         tab列表显示字段
 * @param showSizeChanger 是否显示尺寸
 */

import React, { useEffect, useState, useContext } from "react";
import { ImagePickerContext } from "./ImagePickerContext";
import ModelPicker from "./ModelPicker";
import { Spin } from "antd";
import { TabListVal } from "./utils";
import "./index.scss";
import EventEmitterRC from "@src/hooks/useEventEmitter/EventEmitterRC";

interface ImagePickerLoadProps {
  classNames?: string | string[];
  initialImgSrc?: string;
  onEnsure?: (any) => void;
  tabList?: Array<1 | 2 | 3 | 4 | 5>;
  showSizeChanger?: boolean;
  modalType?: "image" | "video" | "personalize" | "all";
  clearStatus?;
}
const ImagePickerLoad: React.FC<ImagePickerLoadProps> = props => {
  const {
    classNames = "",
    initialImgSrc = "",
    onEnsure,
    tabList,
    showSizeChanger = false,
    modalType = "image"
  } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imageLoadLoading, setImageLoadLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState<any>({
    imageId: "",
    imageUrl: initialImgSrc,
    imageWidth: "",
    imageHeight: "",
    imageSize: "",
    imageAlt: "",
    videoSrc: "",
    uploadType: "",
    videoType: ""
  });
  useEffect(() => {
    setCurrentImage({ ...currentImage, imageUrl: initialImgSrc });
  }, [initialImgSrc]);
  // 弹框页，点击确认按钮，回调，返回图像数据
  const handleOnEnsure = (event): any => {
    const eventImages = { ...currentImage, ...event };
    // setImageLoadLoading(true);
    setCurrentImage({ ...eventImages });
    onEnsure(eventImages);
    setIsModalVisible(false);
  };
  const handleImageOnLoad = () => {
    if (imageLoadLoading) {
      onEnsure(currentImage);
    }
    setImageLoadLoading(false);
  };
  function clear() {
    const params = {
      imageId: "",
      imageUrl: "",
      imageWidth: "",
      imageHeight: "",
      imageSize: "",
      imageAlt: "",
      videoSrc: "",
      uploadType: "",
      videoType: ""
    };
    setCurrentImage(params);
  }
  useEffect(() => {
    if (!props.clearStatus) return;
    clear();
  }, [props.clearStatus]);
  return (
    <EventEmitterRC>
      <Spin spinning={imageLoadLoading}>
        <div className={`${classNames}`}>
          <div
            className="fpp_pic-upload"
            onClick={() => {
              setIsModalVisible(true);
            }}
          >
            <img
              src={currentImage.imageUrl}
              alt={currentImage.imageAlt}
              // onLoad={handleImageOnLoad}
              // onError={handleImageOnLoad}
            />
            <p className="text">
              + <span className="t">选择图片</span>
            </p>
          </div>
        </div>
      </Spin>
      <ModelPicker
        onCancel={() => setIsModalVisible(false)}
        visible={isModalVisible}
        modalType={modalType}
        initialImgSrc={initialImgSrc}
        onEnsure={handleOnEnsure}
        tabList={tabList}
        showSizeChanger={showSizeChanger}
      />
    </EventEmitterRC>
  );
};
export default ImagePickerLoad;
