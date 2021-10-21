/**
 * 以往进行店铺编辑时，部分模块在选择产品、系列等，会将数据直接固定到模块配置中，后续产品、系列
 * 数据发生变更时，无法更新模块中的对应数据，没有实时性。另外有些模块的数据，是在 C 端的
 * 浏览器端发送请求进行获取的，实际应该在服务端获取到数据并生成 HTML。因此与后端约定
 * link_to_obj 字段中中的为动态数据，以 id type 作为标识，每次获取模板配置时，后端通过
 * id type 获取实时数据，填充到模板数据中，以此来保证数据的实时性。另外 link_to_obj.key_map
 * 用于过滤字段，只获取真正需要的数据。
 *
 * 相应的，在店铺编辑时，初次获取 release 数据，并将其同步到 preview 中，后续每当配置发生更改
 * 时，将其保存到 preview 中，同时更新模板数据，并通过 postmessage 发送到 C 端，进行视图更新
 */

import "./fa.scss";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { fetchPageConfig, savePageConfig } from "@src/api/decorate";
import Icon from "@src/common/components/Icon";
import { List, ListItem } from "@src/common/components/List";
import { Tab, Tabs } from "@src/common/components/Tab";
import { LocaleConsumer } from "@src/components/Locale";
import GlobalConfig from "@src/fitshop/components/GlobalConfig";
import getStyle from "@src/utils/dndLockAxis";
import { find, findIndex, get } from "lodash";
import React, { useContext, useEffect, useRef, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import { FitShopStoreContext } from "../../reducer";
import LocaleHelper from "../helper";
import AddSections from "./AddSections";
import ConfigItem from "./ConfigItem/index";
import InitData4BlogList from "./ConfigItem/initialConfiguration/blogList";
import InitData4BrandInfo from "./ConfigItem/initialConfiguration/brandInfoData";
import InitData4CarouselImages from "./ConfigItem/initialConfiguration/carouselImagesectionData";
import InitData4CollectionDetailList from "./ConfigItem/initialConfiguration/collectionDetailList";
import InitData4CollectionDetailListCover from "./ConfigItem/initialConfiguration/collectionDetailListCover";
import InitData4CollectionList from "./ConfigItem/initialConfiguration/collectionList";
import InitData4ConsumerFeed from "./ConfigItem/initialConfiguration/consumerFeedData";
import InitData4LogoAndText from "./ConfigItem/initialConfiguration/logoAndText";
import InitData4ProductList from "./ConfigItem/initialConfiguration/productList";
import InitData4Recommended from "./ConfigItem/initialConfiguration/recommendedSectionData";
import InitData4SingleImage from "./ConfigItem/initialConfiguration/singleImageSectionData";
import InitData4SingleProduct from "./ConfigItem/initialConfiguration/singleProduct";
import InitData4SubscribeEmail from "./ConfigItem/initialConfiguration/subscribeEmial";
import InitData4TwoImages from "./ConfigItem/initialConfiguration/twoImageSectionData";
import richText from "./ConfigItem/initialConfiguration/richText";

const [ShopEditor, GlobalSetting] = ["店铺编辑", "全局设置"];
const FIT_TABS_LIST = [ShopEditor, GlobalSetting];

export const simplifyLinkToObj = lkobj => ({
  id: lkobj.id,
  key_map: lkobj.key_map,
  type: lkobj.type
});



const FitAside: React.FC = ({ previewId }) => {
  const [state, dispatch] = useContext(FitShopStoreContext);
  const { decorateData, globalConfig } = state;
  const [tabValue, changeTabValue] = useState(ShopEditor);
  const [selectSection, setSelectSection] = useState<object>({});
  const [isShowAdd, setIsShowAdd] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const hasSelectDefault = useRef(null);
  const { initialGlobalConfig, initialPageConfig } = state;

  // 默认选中 header
  useEffect(() => {
    const header = get(state, "globalConfig.header");
    if (!hasSelectDefault.current && header.data) {
      header.data && setSelectSection(header);
      hasSelectDefault.current = true;
    }
  }, [state]);

  /**
   * 在此处获取一次页面 release 配置数据，将获取到的 release 配置数据同步到 preview 中，
   * 后续修改模板配置时，都是与 preview 进行交互。同时将接口返回的页面配置数据转换成字符串
   * 后存储到 store 中，用于后续修改页面配置数据后进行对比，判断是否真的修改了配置。
   */
  const fetchReleaseConfig = async () => {
    setIsLoading(true);
    let homePageData = await fetchPageConfig({
      flag: "release",
      route: "home",
      record: previewId
    });
    homePageData = get(homePageData, "data.decorate.config", []);

    homePageData.forEach(item => {
      const tempData = JSON.parse(item.data);
      if (tempData.blocks && tempData.blocks.length) {
        tempData.blocks.forEach(b => {
          if (b.link_to_obj) {
            b.link_to_obj = simplifyLinkToObj(b.link_to_obj);
          }
        });
      }
      if (
        item.type === "product_list" &&
        get(item, "data.settings.product_list", null)
      ) {
        delete item.data.settings.product_list;
      }
      item.data = JSON.stringify(tempData);
    });

    let homePagePreviewData = await savePageConfig({
      flag: "preview",
      route: "home",
      config: homePageData,
      record: previewId
    });
    homePagePreviewData = get(
      homePagePreviewData,
      "data.decorateUpdate.decorate.config",
      []
    );

    // 后台返回的 data 都是 string，在此处将其转为 object
    homePagePreviewData.forEach(item => (item.data = JSON.parse(item.data)));

    dispatch({
      type: "update:willrelease",
      payload: { data: homePagePreviewData }
    });
    dispatch({
      type: "init:pageConfig",
      payload: { initialPageConfig: JSON.stringify(homePagePreviewData) }
    });
    setIsLoading(false);
  };

  /**
   * 组件加载后，获取 线上首页配置数据 和 线上全局配置数据(header footer global)
   */
  useEffect(() => {
    fetchReleaseConfig();
  }, []);

  const handleAddSection = async sec => {
    const newSec = {
      name: "",
      data: {},
      id: Math.round(Math.random() * 10000)
    };
    let blockData = {};

    switch (sec.type) {
      case "overlay_image": // 又叫single-image
        (newSec.name = "overlay_image"), (newSec.data = InitData4SingleImage);
        break;
      case "recommended": // 又叫single-image
        (newSec.name = "特别推荐"), (newSec.data = InitData4Recommended);
        break;
      case "two_images":
        (newSec.name = "two_images"),
          (newSec.name = sec.type),
          (InitData4TwoImages.type = sec.type);
        InitData4TwoImages.name = sec.label;
        InitData4TwoImages.cname = {
          "en-US": sec.name,
          "zh-CN": sec.label
        };
        blockData = InitData4TwoImages.blocks[0];
        InitData4TwoImages.blocks = [
          { ...blockData, id: Math.round(Math.random() * 10000) },
          { ...blockData, id: Math.round(Math.random() * 10000) }
        ];
        newSec.data = InitData4TwoImages;
        break;
      case "three_images": // 多图3/4/5和2是一样的,只是个别属性不同
        (newSec.name = sec.type), (InitData4TwoImages.type = sec.type);
        InitData4TwoImages.name = sec.label;
        InitData4TwoImages.cname = {
          "en-US": sec.name,
          "zh-CN": sec.label
        };
        blockData = InitData4TwoImages.blocks[0];
        InitData4TwoImages.blocks = [
          { ...blockData, id: Math.round(Math.random() * 10000) },
          { ...blockData, id: Math.round(Math.random() * 10000) },
          { ...blockData, id: Math.round(Math.random() * 10000) }
        ];
        newSec.data = InitData4TwoImages;
        break;
      case "four_images":
        (newSec.name = sec.type), (InitData4TwoImages.type = sec.type);
        InitData4TwoImages.name = sec.label;
        InitData4TwoImages.cname = {
          "en-US": sec.name,
          "zh-CN": sec.label
        };
        blockData = InitData4TwoImages.blocks[0];
        InitData4TwoImages.blocks = [
          { ...blockData, id: Math.round(Math.random() * 10000) },
          { ...blockData, id: Math.round(Math.random() * 10000) },
          { ...blockData, id: Math.round(Math.random() * 10000) },
          { ...blockData, id: Math.round(Math.random() * 10000) }
        ];
        newSec.data = InitData4TwoImages;
        break;
      case "five_images":
        (newSec.name = sec.type), // 这个name是服务端要的
          (InitData4TwoImages.type = sec.type);
        InitData4TwoImages.name = sec.label; // 这个name是前端要显示的
        InitData4TwoImages.cname = {
          "en-US": sec.name,
          "zh-CN": sec.label
        };
        blockData = InitData4TwoImages.blocks[0];
        InitData4TwoImages.blocks = [
          { ...blockData, id: Math.round(Math.random() * 10000) },
          { ...blockData, id: Math.round(Math.random() * 10000) },
          { ...blockData, id: Math.round(Math.random() * 10000) },
          { ...blockData, id: Math.round(Math.random() * 10000) },
          { ...blockData, id: Math.round(Math.random() * 10000) }
        ];
        newSec.data = InitData4TwoImages;
        break;
      case "brand_info":
        (newSec.name = "brand_info"), (newSec.data = InitData4BrandInfo);
        break;
      case "consumer_feed":
        (newSec.name = "consumer_feed"), (newSec.data = InitData4ConsumerFeed);
        break;
      case "logo_and_text":
        (newSec.name = "logo_and_text"), (newSec.data = InitData4LogoAndText);
        break;
      case "subscribe_email":
        (newSec.name = "subscribe_email"),
          (newSec.data = InitData4SubscribeEmail);
        break;
      case "collection_list":
        (newSec.name = "collection_list"),
          (newSec.data = InitData4CollectionList);
        break;
      case "product_list":
        (newSec.name = "product_list"), (newSec.data = InitData4ProductList);
        break;
      case "single_product":
        (newSec.name = "single_product"),
          (newSec.data = InitData4SingleProduct);
        break;
      case "carousel_images":
        (newSec.name = "carousel_images"),
          (newSec.data = InitData4CarouselImages);
        break;
      case "collection_detail_list":
        (newSec.name = "collection_detail_list"),
          (newSec.data = InitData4CollectionDetailList);
        break;
      case "collection_detail_list_cover":
        (newSec.name = "collection_detail_list_cover"),
          (newSec.data = InitData4CollectionDetailListCover);
        break;
      case "blog_list":
        (newSec.name = "blog_list"), (newSec.data = InitData4BlogList);
        break;
      case "rich_text":
        (newSec.name = "rich_text"), (newSec.data = richText);
        break;
      default:
        break;
    }

    newSec.type = newSec.name;

    setIsShowAdd(false);
    setSelectSection(JSON.parse(JSON.stringify(newSec)));

    // 由于一直在引用并修改初始数据对象，所以这里解除掉引用，否则后面再添加模块时会被影响
    const nextSectionList = [
      ...decorateData,
      JSON.parse(JSON.stringify(newSec))
    ];
    await handleHomeSectionUpdate(JSON.parse(JSON.stringify(nextSectionList)));

    // 添加模块后，通知 C 端自动定位到该模块
    const timer = setTimeout(() => {
      const sectionId = `${newSec.type}-${newSec.id}`;
      window.frames[0].postMessage(
        { key: "location-section", data: sectionId },
        "*"
      );
      clearTimeout(timer);
    }, 200);
  };

  const handleChangeTabValue = v => {
    changeTabValue(v);
  };

  const handleClickAddButton = () => {
    setIsShowAdd(true);
    setSelectSection({});
  };

  /**
   * 点击列表元素时：
   * - 更新当前选中的标识为点击项的唯一标识
   * - 从 sectionsObj 中找出当前点击项，更新到状态中
   * - 隐藏添加模块项
   *
   * 添加定位功能：
   *    点击列表时，右侧预览会定位到对应模块的位置，通过 postMessage 触发定位效果
   *
   * @param event object 点击事件对象
   * @param section object 选中的 section 数据
   */
  const handleListItemClick = (event: object, section: object) => {
    setIsShowAdd(false);
    setSelectSection(section);

    const sectionId = event.target.getAttribute("data-section-id");
    window.frames[0].postMessage(
      { key: "location-section", data: sectionId },
      "*"
    );
  };

  /**
   * 拖拽结束时的处理函数，如果 开始索引 和 结束索引 不同，表示真的进行了拖动，此时执行位置
   * 变动
   *
   * @param result
   */
  const handleDragEnd = result => {
    const startIndex = result.source.index;
    const endIndex = result.destination.index;
    const isRealChange = startIndex !== endIndex;

    if (isRealChange) {
      const [removed] = decorateData.splice(startIndex, 1);
      decorateData.splice(endIndex, 0, removed);
      handleHomeSectionUpdate(decorateData);
    }
  };

  /**
   * 删除一个模块后，如果当前选中的模块为被删除的模块，则侧栏切换到被删除模块的上一个模块
   *
   * @param event 点击事件对象
   * @param id 模块的唯一标识
   */
  const deleteSection = (event, id: string | number) => {
    event.stopPropagation();
    const targetIndex = findIndex(decorateData, item => item.id === id);

    if (targetIndex !== undefined) {
      if (selectSection.id === id) {
        setSelectSection(
          targetIndex === 0
            ? globalConfig.header
            : decorateData[targetIndex - 1]
        );
      }

      decorateData.splice(targetIndex, 1);
      handleHomeSectionUpdate(decorateData);
    }
  };

  /**
   * 全局模块 (header footer) 发生变化时的处理函数，将新的模块数据更新到 store 中，
   * 并触发预览更新
   *
   * 发生变化时，将 store 中的原始数据和本次的新数据进行对比，如果不同，则将 modifyGlobalConfig
   * 置为 true，表示全局配置发生了变化
   *
   * @param nextGlobalSection 将要更新的全局模块数据
   */
  const handleGlobalSectionUpdate = (nextGlobalSection: object) => {
    dispatch({ type: "update:global", payload: { data: nextGlobalSection } });
    window.frames[0].postMessage(
      { data: nextGlobalSection, key: "preview-global-update" },
      "*"
    );

    const hasModifyGlobalConfig =
      initialGlobalConfig !== JSON.stringify(nextGlobalSection);
    if (initialGlobalConfig !== undefined) {
      dispatch({
        type: "update:modifyGlobalConfig",
        payload: { modifyGlobalConfig: hasModifyGlobalConfig }
      });
    }
  };

  /**
   * 首页模块发生变化时的处理函数，将新的模块数据保存到 preview 接口，将 preview 返回的数据
   * 更新到 store 中
   *
   * @param nextSectionList 将要更新的首页模块数据
   */
  const handleHomeSectionUpdate = async (nextSectionList: []) => {
    const nextSectionDataForSave = JSON.parse(JSON.stringify(nextSectionList));

    // 一些老的数据不全，后来增加了一些逻辑
    // 所以在这里 重新对一些数据进行清洗
    nextSectionDataForSave.forEach(item => {
      if (item.data.blocks && item.data.blocks.length) {
        item.data.blocks.forEach(b => {
          if (b.link_to_obj) {
            b.link_to_obj = simplifyLinkToObj(b.link_to_obj);
          }
        });
      }

      if (item.type === "product_list") {
        if (get(item, "data.settings.product_list", null)) {
          delete item.data.settings.product_list;
        }

        // 产品列表， link_to_obj 的 key_map 数据补充
        if (item.data.blocks && item.data.blocks.length) {
          item.data.blocks.forEach(b => {
            if (b.link_to_obj) {
              b.link_to_obj.key_map =
                "id,featured_image,handle,title,variant,review_star,review_count";
            }
          });
        }
      }

      item.data = JSON.stringify(item.data);
    });
    let homePagePreviewData = await savePageConfig({
      flag: "preview",
      route: "home",
      config: nextSectionDataForSave,
      record: previewId
    });
    homePagePreviewData = get(
      homePagePreviewData,
      "data.decorateUpdate.decorate.config",
      []
    );
    const nextHomePagePreviewData = JSON.parse(
      JSON.stringify(homePagePreviewData)
    );
    nextHomePagePreviewData.forEach(
      item => (item.data = JSON.parse(item.data))
    );

    dispatch({
      type: "update:willrelease",
      payload: { data: nextHomePagePreviewData }
    });
    window.frames[0].postMessage(
      { key: "preview-home-update", data: nextHomePagePreviewData },
      "*"
    );

    const hasModifyPageConfig =
      initialPageConfig !== JSON.stringify(nextHomePagePreviewData);
    if (initialPageConfig !== undefined) {
      dispatch({
        type: "update:modifyPageConfig",
        payload: { modifyPageConfig: hasModifyPageConfig }
      });
    }
  };

  /**
   * 渲染固定的模块，目前只有 header footer
   *
   * @param type 模块的类型，header | footer
   * @returns React Element
   */
  const renderFixedSection = type => {
    const config = get(globalConfig, type);
    return (
      config && (
        <ListItem
          className={`c-n__row`}
          key={config.id}
          selected={selectSection.id === config.id}
          onClick={event => handleListItemClick(event, config)}
          data-section-id={config.type}
        >
          <span className="fitaside-sidebar-text">
            {get(config, "data.cname.zh-CN")}
          </span>
        </ListItem>
      )
    );
  };

  const handleChangeConfig = (flag, data) => {
    if (flag === "header" || flag === "footer") {
      globalConfig[flag] = { ...globalConfig[flag], data };
      handleGlobalSectionUpdate(globalConfig);
    } else {
      const target = find(decorateData, item => item.id === flag);
      if (target) {
        target.data = data;
        handleHomeSectionUpdate(decorateData);
      }
    }
  };

  /**
   * 渲染由接口数据动态生成的首页模块
   *
   * 这些模块是可以拖动排序的，具体的拖动处理请查看 handleDragEnd
   *
   * data-section-id 为模块的唯一标识，与 C 端格式一致，用于在预览时进行模块定位
   *
   * @tips draggableId 必须为字符串
   * @param locale ???
   * @returns React Element
   */
  const renderAsyncListItem = locale => (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="fitaside-sidebar-droppable">
        {provided => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {decorateData.map((item, index) => (
              <Draggable key={item.id} draggableId={`${item.id}`} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getStyle(provided.draggableProps.style, snapshot)}
                  >
                    <ListItem
                      className={`c-n__row`}
                      key={item.id}
                      selected={selectSection.id === item.id}
                      onClick={event => handleListItemClick(event, item)}
                      data-section-id={`${item.type}-${item.id}`}
                    >
                      <Icon
                        name="iconkeyidong"
                        className="fitaside-sidebar-drag-icon mr-6"
                      />
                      <span className="fitaside-sidebar-text">
                        {LocaleHelper.getCardName(
                          locale,
                          get(item, "data.cname", {})
                        )}
                      </span>
                      <IconButton
                        className="fitaside-sidebar-remove-icon"
                        edge="end"
                        aria-label="delete"
                        onClick={event => deleteSection(event, item.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItem>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );

  const isShowConfigModule = !isShowAdd && get(selectSection, "id");

  const findSectionData = id => {
    const target = find(decorateData, item => item.id === id);
    return target ? target.data : selectSection.data;
  };

  return (
    <LocaleConsumer>
      {({ locale }) => (
        <div className="fit-aside-container">
          <Tabs
            value={tabValue}
            className="fitTabs"
            onChange={handleChangeTabValue}
          >
            {FIT_TABS_LIST.map(item => (
              <Tab key={item} label={item} name={item} />
            ))}
          </Tabs>
          <div className="tab-panel">
            {tabValue === ShopEditor ? (
              // 店铺编辑
              <div className="shop-config-wrapper">
                <div className="config-name-list">
                  {renderFixedSection("header")}
                  <List loading={isLoading}>{renderAsyncListItem(locale)}</List>
                  {renderFixedSection("footer")}
                  {!isLoading && (
                    <ListItem
                      className="c-n__row"
                      selected={isShowAdd}
                      onClick={handleClickAddButton}
                    >
                      添加模块
                    </ListItem>
                  )}
                </div>
                <div className="config__context">
                  {isShowConfigModule && (
                    <ConfigItem
                      sectionStamp={selectSection.id}
                      section={findSectionData(selectSection.id)}
                      onChange={handleChangeConfig}
                    />
                  )}
                  {isShowAdd && (
                    <AddSections handleItemClick={handleAddSection} />
                  )}
                </div>
              </div>
            ) : (
              // 全局设置
              <GlobalConfig />
            )}
          </div>
        </div>
      )}
    </LocaleConsumer>
  );
};

FitAside.displayName = "FitAside";
export default FitAside;
