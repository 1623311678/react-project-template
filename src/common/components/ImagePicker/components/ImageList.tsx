import React, { useEffect, useState, useContext } from "react";
import { ImagePickerContext } from "../ImagePickerContext";
import "../index.scss";
import { deleteUploadShopImage } from "@src/api/products";
import Icon from "@src/common/components/Icon";
import { Button } from "antd";
import { promiseAll } from "../utils";
import { postUpload } from "@src/api/ajax";
import { productShopCreateMedia } from "@src/api/products";
import { randomRowKey } from "./ImageFreeStuff";
import { PAGE_SIZE } from "../ModelPicker";
interface ImageListProps {
  imageList: any[];
  ImageTabList: any[];
  pageCursor: object;
}
const ImageList: React.FC<ImageListProps> = props => {
  const { imageList = [], ImageTabList, pageCursor } = props;
  const {
    setCurrentImage,
    currentImage,
    updateFnDispatch,
    currentTab,
    setIsFirstFetch,
    loading
  } = useContext(ImagePickerContext);
  const [uploadBtnLoading, setUploadBtnLoading] = useState<boolean>(false);
  const ref = React.createRef<HTMLLIElement>();

  /** 交叉观察器 */
  useEffect(() => {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (pageCursor[currentPageCursor()].hasNextPage) {
            handleClickAfterPage(currentPageCursor());
            observer.unobserve(entry.target);
          }
        }
      });
    });
    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  });

  /** 占位图，判断是否和视口交叉，加载数据 */
  const renderPlaceholderImages = () => {
    if (pageCursor[currentPageCursor()].hasNextPage) {
      return Array.from({ length: 1 }, () => (
        <li key={randomRowKey()} className="fpp_image-li" ref={ref}></li>
      ));
    } else {
      return null;
    }
  };

  /** 下一页fetch */
  const handleClickAfterPage = type => {
    let obj = {};
    switch (type) {
      case "productImages":
        obj = {
          productImagesFirst: PAGE_SIZE,
          productImagesLast: null,
          productCursorAfter: pageCursor[type].afterCursor
        };
        break;
      case "uploadedImages":
        obj = {
          uploadedImagesFirst: PAGE_SIZE,
          uploadedImagesLast: null,
          uploadedCursorAfter: pageCursor[type].afterCursor
        };
        break;
      case "productVideos":
        obj = {
          productVideosFirst: PAGE_SIZE,
          productVideosLast: null,
          productVideosCursorAfter: pageCursor[type].afterCursor
        };
        break;
      case "uploadedVideos":
        obj = {
          uploadedVideosFirst: PAGE_SIZE,
          uploadedVideosLast: null,
          uploadedVideosCursorAfter: pageCursor[type].afterCursor
        };
        break;
      case "personalizeImages":
        obj = {
          personalizeImagesFirst: PAGE_SIZE,
          personalizeImagesLast: null,
          personalizeCursorAfter: pageCursor[type].afterCursor
        };
        break;
    }
    setIsFirstFetch(false);
    updateFnDispatch({ type: "fetch", data: obj });
  };

  /** 当前tab名字 */
  const currentPageCursor = () => {
    const currentPage = ImageTabList.find(item => item.value === currentTab);
    return currentPage?.type || "uploadedImages";
  };

  const handleClickImage = item => {
    setCurrentImage({
      ...currentImage,
      imageId: item.id,
      imageUrl: item.originalSrc,
      imageWidth: item.width,
      imageHeight: item.height,
      videoSrc: item.src,
      uploadType: item.contentType,
      videoType: item.videoType
    });
  };

  const handleDeletePic = (e, itemId) => {
    // deleteShopImage();
    e.stopPropagation();
    const queryParams = {
      id: itemId
    };
    deleteUploadShopImage(queryParams).then(res => {
      setIsFirstFetch(true);
      updateFnDispatch({ type: "fetch", data: {} });
    });
  };

  const acceptType = () => {
    switch (currentTab) {
      case 1:
        return "image/*";
      case 3:
        return ".mp4";
      case 5:
        return "image/*";
      default:
        return "image/*";
    }
  };

  const onImageUpload = file =>
    new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("content_type", file?.type);
      postUpload(formData).then(data => {
        const params = {};
        if (+currentTab === 3) {
          params.extraSource = data.video?.url;
        }
        params.originalSource = data.url;
        let mediaContentType = "IMAGE";
        if (+currentTab === 1) {
          mediaContentType = "IMAGE";
        } else if (+currentTab === 5) {
          mediaContentType = "PERSONALIZE_IMAGE";
        } else if (+currentTab === 3) {
          mediaContentType = "VIDEO";
        }
        params.mediaContentType = mediaContentType;
        productShopCreateMedia([params]).then(() => resolve(data));
      });
    });

  // 图片弹窗 上传文件
  const handleClickUpload = () => {
    document.getElementById("editorUploadImageID").click();
  };

  // 点击上传文件按钮
  const handleInputFileChange = e => {
    const files =
      (!!e.target.files.length && Object.values(e.target.files)) || [];
    const filesPromiseArr = [];
    files.forEach((file, index) => {
      filesPromiseArr[index] = new Promise((resolve, reject) => {
        onImageUpload(file).then(data => {
          resolve(data);
        });
      });
    });
    setUploadBtnLoading(true);
    promiseAll(filesPromiseArr).then(() => {
      setIsFirstFetch(true);
      setUploadBtnLoading(false);
      updateFnDispatch({ type: "fetch", data: {} });
    });
  };

  return (
    <div className="fpp_image-list">
      {imageList.length || !loading ? (
        <ul className="fpp_image-ul">
          {(currentTab === 1 || currentTab === 3 || currentTab === 5) && (
            <Button
              loading={uploadBtnLoading}
              onClick={handleClickUpload}
              className="fpp_button-upload"
            >
              {uploadBtnLoading ? "" : "+"}
              <input
                type="file"
                accept={acceptType()}
                multiple
                id="editorUploadImageID"
                onChange={handleInputFileChange}
              />
            </Button>
          )}
          {imageList.map((item, index) => (
            <li
              key={item.id}
              className={`fpp_image-li ${
                currentImage.imageUrl === item.originalSrc
                  ? "fpp_image-active"
                  : ""
              }`}
              onClick={() => handleClickImage(item)}
            >
              <img
                src={item.originalSrc}
                alt="图片"
                onLoad={() => {
                  document.querySelector(`.loading-${index}`).style.display =
                    "none";
                }}
              />
              {+currentTab === 1 && (
                <div
                  className="fpp_del-icon"
                  onClick={e => handleDeletePic(e, item.id)}
                >
                  <Icon name="iconshanchu1" />
                </div>
              )}
              <div className="fpp_correct-icon">
                <span></span>
              </div>

              <div className={`loading-box loading-${index}`}>
                <div className="loading-animate"></div>
              </div>
            </li>
          ))}
          {renderPlaceholderImages()}
        </ul>
      ) : (
        <div className="no-content">暂无内容</div>
      )}
    </div>
  );
};
export default ImageList;
