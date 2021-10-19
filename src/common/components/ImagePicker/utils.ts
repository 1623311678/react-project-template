// 图片大小
export const sizeList = [
  { name: "初始", value: "" },
  { name: "微型 (16x16)", value: "16x16" },
  { name: "图标 (32x32)", value: "32x32" },
  { name: "缩略 (50x50)", value: "50x50" },
  { name: "小 (100x100)", value: "100x100" },
  { name: "简洁 (160x160)", value: "160x160" },
  { name: "中 (240x240)", value: "240x240" },
  { name: "大 (480x480)", value: "480x480" },
  { name: "特大 (600x600)", value: "600x600" },
  { name: "1024x1024 (1024x1024)", value: "1024x1024" },
  { name: "2048x2048 (2048x2048)", value: "2048x2048" }
];
export const TabList = [
  { name: "上传的图片", uploadType: "image", value: 1, type: "uploadedImages" },
  { name: "产品的图片", uploadType: "image", value: 2, type: "productImages" },
  { name: "上传的视频", uploadType: "video", value: 3, type: "productVideos" },
  { name: "视频YouTube URL", uploadType: "video", value: 4, type: "URL" },
  {
    name: "定制化图片",
    uploadType: "personalize",
    value: 5,
    type: "personalizeImages"
  },
  { name: "免费素材", uploadType: "image", value: 6, type: "freeStuff" }
];
// 上传tab显示，默认显示全部 <全部（不包括定制化）>
export const TabListVal = TabList.filter(
  i => i.uploadType !== "personalize"
).map(i => i.value);
// 上传图片tabs
export const uploadTabList = (
  tabArr: number[],
  modalType: "video" | "image" | "personalize" | "all" = "image"
) => {
  let tabArrTypes = [];
  switch (modalType) {
    case "personalize": //定制化
      tabArrTypes = [5];
      break;
    case "image":
      tabArrTypes = [1, 2, 6];
      break;
    case "video":
      tabArrTypes = [3, 4];
      break;
    case "all":
      tabArrTypes = tabArr.length ? tabArr : [1, 2, 3, 4, 6];
      break;
    default:
      tabArrTypes = [1, 2, 6];
      break;
  }
  const listArr = TabList.filter(item => {
    return tabArrTypes.includes(item.value);
  });
  return listArr;
};
/**
 * @description 封装 Promise.all 遇到 reject 后，直接返回问题
 * @param arg promise数组
 * @returns Promise
 */
export function promiseAll(...arg: any[]) {
  return new Promise((resolve, reject) => {
    const promiseAll = [...arg]
      .flat(Infinity)
      .map(
        item =>
          (Object.prototype.toString.call(item) === "[object Promise]" &&
            item.catch(e => e)) ||
          item
      );
    Promise.all(promiseAll).then(res => {
      resolve(res);
    });
  });
}
