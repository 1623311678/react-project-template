import React, { useEffect, useContext, createRef, useState } from "react";
import { ImagePickerContext } from "../ImagePickerContext";
import "../index.scss";
import { Spin } from "antd";
import classnames from "classnames";
import { getFreeStuffImages } from "@src/api/products";

/** 对一些没有主键key的列表，生成唯一主键用 */
export const randomRowKey = () => Math.random().toString();

const imageFreeStuff: React.FC = () => {
  const { setCurrentImage, currentImage } = useContext(ImagePickerContext);
  const [currentTab, setCurrentTab] = useState<string>("");
  const [pageNo, setPageNo] = useState<number>(1);
  const [imageList, setImageList] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [maxPageNo, setMaxPageNo] = useState<number>(1);
  const ref = React.createRef<HTMLLIElement>();

  /** 左侧tab列表 */
  const TAB_LIST = [
    {
      value: "",
      label: "全部"
    },
    {
      value: "favor",
      label: "推荐素材"
    },
    {
      value: "female_fashion",
      label: "女性时尚"
    },
    {
      value: "male_fashion",
      label: "男性时尚"
    },
    {
      value: "furniture",
      label: "居家家具"
    },
    {
      value: "jewelry",
      label: "珠宝配饰"
    },
    {
      value: "simple",
      label: "简约"
    },
    {
      value: "soho",
      label: "居家办公"
    },
    {
      value: "sale",
      label: "商品折扣"
    },
    {
      value: "shop",
      label: "本地商店"
    },
    {
      value: "nature",
      label: "自然风景"
    },
    {
      value: "coffee",
      label: "咖啡"
    },
    {
      value: "photo",
      label: "摄影"
    },
    {
      value: "food",
      label: "可口美食"
    },
    {
      value: "kid",
      label: "儿童"
    },
    {
      value: "perfume",
      label: "香水"
    },
    {
      value: "pet",
      label: "宠物"
    },
    {
      value: "summer",
      label: "夏天"
    },
    {
      value: "tech",
      label: "科技"
    },
    {
      value: "watch",
      label: "手表"
    }
  ];

  /** 当前选中图片 */
  const handleClickImage = item => {
    // 回复到初始图片地址
    const newItem = { ...item };
    newItem.url = newItem.url.replace(
      "cdn-cgi/image/width=800,height=800,quality=85/",
      ""
    );
    setCurrentImage({
      ...currentImage,
      imageId: "free_stuff_image_Id",
      imageUrl: newItem.url,
      imageWidth: item.width,
      imageHeight: item.height,
      uploadType: "IMAGE"
    });
  };

  /** 交叉观察器 */
  useEffect(() => {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (pageNo + 1 <= maxPageNo) {
            setPageNo(pageNo + 1);
            getTabImages(currentTab, pageNo + 1);
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
  }, [imageList]);

  /** 占位图，判断是否和视口交叉，加载数据 */
  const renderPlaceholderImages = () => {
    if (pageNo + 1 <= maxPageNo) {
      return Array.from({ length: 1 }, () => (
        <li key={randomRowKey()} className="fpp_image-li" ref={ref}></li>
      ));
    } else {
      return null;
    }
  };

  /** 免费素材：获取免费素材 */
  const getTabImages = async (tabName: string, currentPageNo: number) => {
    setCurrentTab(tabName);
    const result = await getFreeStuffImages({
      sort: tabName,
      current: currentPageNo,
      offset: 20
    });
    const {
      data: {
        decorateMaterial: {
          data: { content, total }
        }
      }
    } = result;

    // 裁剪图片，完全显示加载慢
    content.forEach(v => {
      v.url = v.url.replace(
        /material/g,
        "cdn-cgi/image/width=800,height=800,quality=85/material"
      );
    });

    setLoading(false);
    setMaxPageNo(Math.ceil(total / 12));
    // tab切换，初始化imageList为空
    if (currentPageNo === 1) {
      setImageList(content);
    } else {
      setImageList(imageList.concat(content));
    }
  };

  useEffect(() => {
    getTabImages("", 1);
  }, []);

  /** tab切换 */
  const tabChange = item => {
    setLoading(true);
    setCurrentTab("");
    setPageNo(1);
    setImageList([]);
    getTabImages(item.value, 1);
  };

  /** 返回图片的hash文件名 */
  const getImageHashName = (url: string) => {
    if (url) {
      const arr = url.split("/");
      return arr[arr.length - 1];
    }
  };

  return (
    <div className="free-stuff-box">
      <div className="free-stuff-tab">
        <ul>
          {TAB_LIST.map(item => (
            <li
              key={item.value}
              className={classnames({
                "free-stuff-tab-active": item.value === currentTab
              })}
              onClick={() => tabChange(item)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>
      <div className="fpp_image-list">
        {imageList.length ? (
          <ul className="fpp_image-ul">
            {imageList.map((item, index) => (
              <li
                key={randomRowKey()}
                className={`fpp_image-li ${
                  getImageHashName(currentImage.imageUrl) ===
                  getImageHashName(item.url)
                    ? "fpp_image-active"
                    : ""
                }`}
                onClick={() => handleClickImage(item)}
                ref={ref}
              >
                <img
                  src={item.url}
                  alt="图片"
                  onLoad={() => {
                    document.querySelector(`.loading-${index}`).style.display =
                      "none";
                  }}
                />
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
          <Spin spinning={loading}>
            <div className="no-content">暂无内容</div>
          </Spin>
        )}
      </div>
    </div>
  );
};

export default imageFreeStuff;
