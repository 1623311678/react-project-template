/**
 * @name  图片/视频上传组件入口文件
 * @param visible         model显示
 * @param onCancel        model关闭回调
 * @param modalType       上传类型
 * @param classNames      自定义class
 * @param initialImgSrc   初始化Image高亮
 * @param onEnsure        确认按钮回调
 * @param tabList         tab列表显示字段
 * @param showSizeChanger 是否显示尺寸
 */
import React, { useEffect, useState, useReducer } from "react";
import { getShopImages } from "@src/api/products";
import { Modal } from "antd";
import { ImagePickerContext } from "./ImagePickerContext";
import ImagePicker from "./ImagePicker";
import ModelFooter from "./components/ModelFooter";
import { uploadTabList, TabListVal } from "./utils";
import "./index.scss";

export const VIDEO = "video";
export const IMAGE = "image";
export const ALL = "all";
export const DEFAULT_SIZE = "480x480";
export const PAGE_SIZE = 24;
interface ModelPickerProps {
  visible: boolean;
  onCancel?: () => void;
  modalType: "video" | "personalize" | "image" | "all";
  classNames?: string | string[];
  initialImgSrc?: string;
  onEnsure?: (any) => void;
  // tabList?: number[];
  tabList?: Array<1 | 2 | 3 | 4 | 5>;
  showSizeChanger?: boolean;
}
// 免费素材
export interface FreeStuffState {
  currentTab: string;
  loading: boolean;
  imageList: Array<{
    url?: string;
    width?: string;
    height?: string;
  }>;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  pageNo: number;
}

const ModelPicker: React.FC<ModelPickerProps> = props => {
  const {
    modalType = "image",
    visible,
    classNames,
    initialImgSrc,
    onEnsure,
    onCancel,
    tabList = TabListVal,
    showSizeChanger = true
  } = props;
  const [currentTab, setCurrentTab] = useState(1); // 当前tab
  const [loading, setLoading] = useState(false); // loading
  const [isModalVisible, setIsModalVisible] = useState(visible); // model isShow
  const [uploadedImages, setUploadedImages] = useState([]); // 上传的图片list
  const [productImages, setProductImages] = useState([]); // 产品的图片list
  const [productVideos, setProductVideos] = useState([]); // 产品的视频list
  const [uploadedVideos, setUploadedVideos] = useState([]); // 上传的视频list
  const [personalizeImages, setPersonalizeImages] = useState([]); // 定制化图片list
  const [isFirstFetch, setIsFirstFetch] = useState<boolean>(true); // 是否第一次请求
  const [pageCursor, setPageCursor] = useState({
    productImages: {
      hasPreviousPage: false,
      hasNextPage: true,
      beforeCursor: "",
      afterCursor: ""
    },
    uploadedImages: {
      hasPreviousPage: false,
      hasNextPage: true,
      beforeCursor: "",
      afterCursor: ""
    },
    productVideos: {
      hasPreviousPage: false,
      hasNextPage: true,
      beforeCursor: "",
      afterCursor: ""
    },
    uploadedVideos: {
      hasPreviousPage: false,
      hasNextPage: true,
      beforeCursor: "",
      afterCursor: ""
    },
    personalizeImages: {
      hasPreviousPage: false,
      hasNextPage: true,
      beforeCursor: "",
      afterCursor: ""
    }
  });
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
  const [ImageTabList, setImageTabList] = useState([]);

  /** 当前tab名字 */
  const currentPageCursor = () => {
    const currentPage = ImageTabList.find(item => item.value === currentTab);
    return currentPage?.type || "uploadedImages";
  };

  useEffect(() => {
    setIsModalVisible(visible);
    if (visible) {
      fetchShopImages && fetchShopImages({});
      const tabs = uploadTabList(tabList, modalType);
      setCurrentTab(tabs[0].value);
      setImageTabList(tabs);
      setCurrentImage({ ...currentImage, imageUrl: initialImgSrc });
    } else {
      setIsFirstFetch(true);
      setProductImages([]);
      setUploadedImages([]);
    }
  }, [visible]);

  // 获取上传图片 / 产品图片
  const fetchShopImages = params => {
    if (isFirstFetch) {
      setLoading(true);
    }
    const baseQuery = {
      productImagesFirst: PAGE_SIZE,
      productCursorAfter: "",
      productImagesLast: null,
      productCursorBefore: "",

      productVideosFirst: PAGE_SIZE,
      productVideosCursorAfter: "",
      productVideosLast: null,
      productVideosCursorBefore: "",

      uploadedImagesFirst: PAGE_SIZE,
      uploadedCursorAfter: "",
      uploadedImagesLast: null,
      uploadedCursorBefore: "",

      uploadedVideosFirst: PAGE_SIZE,
      uploadedVideosCursorAfter: "",
      uploadedVideosLast: null,
      uploadedVideosCursorBefore: "",

      personalizeImagesFirst: PAGE_SIZE,
      personalizeCursorAfter: "",
      personalizeImagesLast: null,
      personalizeCursorBefore: "",

      type: "IMAGE"
    };
    const queryParams = { ...baseQuery, ...params };
    getShopImages(queryParams)
      .then(({ data }) => {
        const ImageList = Object.keys(pageCursor);
        data = {
          ...data,
          shop: {
            ...data.shop,
            personalizeImages: data.personalizeImages
          }
        };
        const [
          productImagesArr,
          uploadedImagesArr,
          productVideosArr,
          uploadedVideosArr,
          personalizeImagesArr
        ] = ImageList.map(i => {
          if (isFirstFetch) {
            pageCursor[i] = {
              hasPreviousPage: data.shop[i].pageInfo.hasPreviousPage,
              hasNextPage: data.shop[i].pageInfo.hasNextPage,
              beforeCursor: data.shop[i].edges[0]?.cursor,
              afterCursor:
                data.shop[i].edges[data.shop[i].edges.length - 1]?.cursor
            };
          } else {
            // 每个tab状态分开存，在另一个tab请求时，param传递当前tab参数，其他参数为初始值，那么，其他tab返回第一页的图片、是否有下一页变为了true，因此，不走上面if的统一处理
            pageCursor[currentPageCursor()] = {
              hasPreviousPage:
                data.shop[currentPageCursor()].pageInfo.hasPreviousPage,
              hasNextPage: data.shop[currentPageCursor()].pageInfo.hasNextPage,
              beforeCursor: data.shop[currentPageCursor()].edges[0]?.cursor,
              afterCursor:
                data.shop[currentPageCursor()].edges[
                  data.shop[currentPageCursor()].edges.length - 1
                ]?.cursor
            };
          }

          return (
            (!!data?.shop[i]?.edges.length &&
              data?.shop[i]?.edges.map(item => {
                item.node.videoType = "URL";
                return item.node;
              })) ||
            []
          );
        });
        setPageCursor({ ...pageCursor });

        // 判断是否初次加载
        if (isFirstFetch) {
          setUploadedImages([...uploadedImagesArr]);
          setProductImages([...productImagesArr]);
          setUploadedVideos([...uploadedVideosArr]);
          setPersonalizeImages([...personalizeImagesArr]);
        } else {
          if (currentTab === 1) {
            // 上传的图片
            setUploadedImages(uploadedImages.concat(uploadedImagesArr));
          } else if (currentTab === 2) {
            // 产品的图片
            setProductImages(productImages.concat(productImagesArr));
          } else if (currentTab === 3) {
            // 上传的视频
            setUploadedVideos(productImages.concat(uploadedVideosArr));
          } else if (currentTab === 5) {
            // 定制化图片
            setPersonalizeImages(productImages.concat(personalizeImagesArr));
          }
        }
        setProductVideos([...productVideosArr]);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleCancel = () => {
    // setCurrentImage({
    //   imageId: "",
    //   imageUrl: "",
    //   imageSize: DEFAULT_SIZE,
    //   imageAlt: "",
    //   videoSrc: "",
    //   uploadType: ""
    // });
    setIsModalVisible(false);
    onCancel();
  };
  const [updateFn, updateFnDispatch] = useReducer(
    (state, { type, data = {} }) => {
      switch (type) {
        case "fetch":
          fetchShopImages(data);
          return "";
        case "close":
          handleCancel();
          return "";
      }
    },
    ""
  );
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
    <ImagePickerContext.Provider
      value={{
        currentImage,
        setCurrentImage,
        currentTab,
        setCurrentTab,
        loading,
        setLoading,
        modalType,
        updateFnDispatch,
        setIsFirstFetch
      }}
    >
      {isModalVisible && (
        <Modal
          title={modalTitle()}
          visible={isModalVisible}
          onCancel={handleCancel}
          className={`fpp_insert-image-modal ${classNames}`}
          width={840}
          centered
          footer={
            <ModelFooter
              pageCursor={pageCursor}
              ImageTabList={ImageTabList}
              onEnsure={onEnsure}
            />
          }
        >
          {/* {modalType == VIDEO ? (
              <VideoPicker imageList={productVideos} />
            ) : ( */}
          <ImagePicker
            ImageTabList={ImageTabList}
            showSizeChanger={showSizeChanger}
            uploadedImages={uploadedImages}
            productVideos={productVideos}
            productImages={productImages}
            uploadedVideos={uploadedVideos}
            personalizeImages={personalizeImages}
            pageCursor={pageCursor}
          />
          {/* )} */}
        </Modal>
      )}
    </ImagePickerContext.Provider>
  );
};
export default ModelPicker;
