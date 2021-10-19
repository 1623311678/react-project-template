import "./fsp.scss";

import { ExclamationCircleOutlined } from "@ant-design/icons";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import fppClient from "@src/api/base";
import { fppCollectionsList } from "@src/api/collections/queries";
import {
  fetchGlobalConfig,
  saveGlobalConfig,
  savePageConfig,
  getRecordDetail,
} from "@src/api/decorate";
import { fppProductsList } from "@src/api/products/queries";
import { fppMutationRecordPublish } from "@src/api/themeTemplate";
import Icon from "@src/common/components/Icon";
import useNavigator from "@src/hooks/useNavigator";
import idGenerator from "@src/utils/idGenerator";
import { message } from "antd";
import { Modal } from "antd";
import { get, find } from "lodash";
import React, { useEffect, useReducer, useState } from "react";
import { useParams, useHistory } from "react-router";
import { IS_PRODUCTION_MODE } from "@src/config";
import { getDomainList } from "@src/api/domainManage";

import {
  fitShopPageReducer,
  FitShopStoreContext,
  initialFitshopState
} from "../../reducer";
import FitAside from "../FitAside";
import collectionDetail from "../FitAside/ConfigItem/initialConfiguration/collectionDetail";
import InitData4ProductDetail from "../FitAside/ConfigItem/initialConfiguration/productDetailData";
import FitAsideCheckout from "../FitAside/FitAsideCheckout";
import FitAsideCollection from "../FitAside/FitAsideCollection";
import FitAsideProductDetail from "../FitAside/FitAsideProductDetail";
import FitMain from "../FitMain";
import FitMainContent from "../FitMain/FitMainContent";
import { simplifyLinkToObj } from '../FitAside/FitAside'

const { confirm } = Modal;

const FitShopPage: React.FC<{}> = () => {
  const history = useHistory();
  const [publishSuccess, setPublishSuccess] = useState(false);
  const [dataSource, setDataSource] = useState<any>({
    isShowProduct: true,
    isShowCollection: true
  });
  const navigate = useNavigator();
  const id = Number(useParams().id) || undefined;
  const previewThemeFlag = id ? "&theme=" + id : "";

  const fitShopPageStore = useReducer(fitShopPageReducer, initialFitshopState);
  const [fitShopPageState, dispatch] = fitShopPageStore;
  const { modifyGlobalConfig, modifyPageConfig } = fitShopPageState;

  /**
   * 根据 modifyGlobalConfig 和 modifyPageConfig 的值的不同，设置或重置 onbeforeunload 事件
   * - hasModify 为 true 时，设置事件，进行退出提示
   * - hasModify 为 false 时，重置事件，不进行退出提示
   */
  useEffect(() => {
    window.onbeforeunload =
      modifyGlobalConfig || modifyPageConfig
        ? () => "如果退出此页面，任何未保存的更改都将丢失。"
        : null;
  }, [modifyGlobalConfig, modifyPageConfig]);

  const getDomain = () => {
    getDomainList().then((data) => {
      const list = get(data, 'data.domains.edges', []);
      const defaultDomain = find(list, (item) => item.node.isDefault === true);
      if (defaultDomain) {
        const domain = get(defaultDomain, 'node.domain');
        localStorage.setItem('default_domain', `https://${domain}`);
      }
    })
  }

  /**
   * 在此处获取全局数据，并进行处理，同时将接口返回的全局数据转换成字符串后存储到 store 中，
   * 用于后续修改全局数据后进行对比，判断是否真的修改了配置
   */
  const handleFetchGlobalConfig = async () => {
    /**
     * 如果存在模板 id，则使用 id 获取模板详情，验证模板状态，如果获取到的数据中
     * 没有 data.id，则说明模板已经不存在，此时需要跳转到 notFound 页面
     */
    if (id) {
      const { data: recordData } = await getRecordDetail(id);
      const realId = get(recordData, 'recordRetrieve.data.id');
      if (!realId) {
        return history.push("/notFound");
      }
    }

    let globalConfig = await fetchGlobalConfig({
      flag: "release",
      record: id
    });
    globalConfig = get(globalConfig, "data.decorateGlobal", {});

    // 后台返回的 data 都是 string，在此处将其转为 object
    globalConfig.header.data = JSON.parse(globalConfig.header.data);
    globalConfig.footer.data = JSON.parse(globalConfig.footer.data);
    globalConfig.globalConfig.forEach(
      item => item.data && (item.data = JSON.parse(item.data))
    );

    const footerSetting = get(globalConfig, "footer.data.settings", {});

    /**
     * 由于需求变更，支付方式需要支持拖动排序，造成了数据结构的变化，因此此处做兼容处理
     */
    if (!footerSetting.payment) {
      footerSetting.payment = [
        {
          id: "union_pay",
          show: footerSetting.show_union_pay,
          title: "Union Pay"
        },
        { id: "visa", show: footerSetting.show_visa, title: "VISA" },
        { id: "jbc", show: footerSetting.show_jbc, title: "JCB" },
        { id: "amex", show: footerSetting.show_amex, title: "AMEX" },
        {
          id: "discover",
          show: footerSetting.show_discover,
          title: "DISCOVER"
        },
        {
          id: "diners_club",
          show: footerSetting.show_diners_club,
          title: "Diners Club"
        },
        { id: "paypal", show: footerSetting.show_paypal, title: "Paypal" },
        {
          id: "mastercard",
          show: footerSetting.show_mastercard,
          title: "MasterCard"
        },
        {
          id: "visa_electron",
          show: footerSetting.show_visa_electron,
          title: "VISA Electron"
        },
        { id: "giropay", show: false, title: "Giropay" },
        { id: "sepa", show: false, title: "SEPA" },
        { id: "trustpay", show: false, title: "TrustPay" },
        { id: "ideal", show: false, title: "iDEAL" },
        { id: "maybank", show: false, title: "Maybank" },
        { id: "sofort", show: false, title: "SOFORT" },
        { id: "maestro", show: false, title: "Maestro" }
      ];

      delete footerSetting.show_union_pay;
      delete footerSetting.show_visa;
      delete footerSetting.show_jbc;
      delete footerSetting.show_amex;
      delete footerSetting.show_discover;
      delete footerSetting.show_diners_club;
      delete footerSetting.show_paypal;
      delete footerSetting.show_mastercard;
      delete footerSetting.show_visa_electron;
    }

    if (get(footerSetting, "payment.length") > 0) {
      const hasMaestro = find(
        footerSetting.payment,
        item => item.id === "maestro"
      );

      if (!hasMaestro) {
        footerSetting.payment.push({
          id: "maestro",
          show: false,
          title: "Maestro"
        });
      }
    }

    dispatch({ type: "update:global", payload: { data: globalConfig } });
    dispatch({
      type: "init:globalConfig",
      payload: { initialGlobalConfig: JSON.stringify(globalConfig) }
    });
  };

  useEffect(() => {
    getDomain();
    handleFetchGlobalConfig();
    // 获取当前店铺有没有系列和产品
    handleFetchProductsAndCollections();
  }, []);

  /**
   * 获取当前店铺有没有产品和系列
   * 没有产品不显示商品详情
   * 没有系列不显示系列详情
   */
  const handleFetchProductsAndCollections = async () => {
    const products = await fppClient.query({
      query: fppProductsList,
      fetchPolicy: "network-only", // 不需要缓存
      variables: { first: 1 }
    });

    const collections = await fppClient.query({
      query: fppCollectionsList,
      fetchPolicy: "network-only",
      variables: { first: 1 }
    });

    setDataSource({
      isShowProduct: products.data.products?.edges?.length,
      isShowCollection: collections.data.collections?.edges?.length
    });
  };

  /**
   * 在此处将预览的配置数据保存至线上，同时保存当前编辑的页面配置数据，和全局配置数据
   *
   * 保存时，需要将 store 中的配置数据深拷贝一份，避免数据操作时影响 store 中的数据
   * 保存时，需要将所有配置数据中的 data 转成 string，避免接口的字段校验
   *
   * 保存成功后，将 store 中的用于判断是否修改数据相关的状态进行重置
   *
   * @param isSave 是否是保存
   */
  const handleRelease = async (isSave: boolean) => {
    const { decorateData, globalConfig, editingRoute } = fitShopPageState;
    const nextPageConfig = JSON.parse(JSON.stringify(decorateData));
    const nextGlobalConfig = JSON.parse(JSON.stringify(globalConfig));

    // 清洗数据
    nextPageConfig.forEach(item => {

      if (item.data.blocks && item.data.blocks.length) {
        item.data.blocks.forEach(b => {
          if (b.link_to_obj) {
            b.link_to_obj = simplifyLinkToObj(b.link_to_obj)
          }
        })
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


      /**
       * 将 preview 的数据更新到 release 时，又会触发 id 冲突，所以这里重新生成一个唯一
       * 的 id，避免接口错误
       */
      if (editingRoute === "home") {
        item.id = idGenerator();
      }
    });

    // 清洗全局数据
    const headerData = nextGlobalConfig.header.data;
    delete headerData.settings.menu_list;

    for (const key in nextGlobalConfig) {
      const { data } = nextGlobalConfig[key];
      data && (nextGlobalConfig[key].data = JSON.stringify(data));
    }

    for (const key in nextGlobalConfig.globalConfig) {
      const { data } = nextGlobalConfig.globalConfig[key];
      data && (nextGlobalConfig.globalConfig[key].data = JSON.stringify(data));
    }

    let success = true;
    const [pageResult, globalResult] = await Promise.all([
      savePageConfig({
        flag: "release",
        route: editingRoute,
        config: nextPageConfig,
        record: id
      }),
      saveGlobalConfig({ flag: "release", ...nextGlobalConfig, record: id })
    ]);

    if (
      get(pageResult, 'data.decorateUpdate.userErrors.length') > 0 ||
      get(globalResult, 'data.decorateGlobalUpdate.userErrors.length') > 0
    ) {
      success = false;
    }

    if (success) {
      message.success(isSave ? "保存成功！" : "发布成功！", 1);
    } else {
      const pageError = get(pageResult, 'data.decorateUpdate.userErrors.0.message');
      const globalError = get(globalResult, 'data.decorateGlobalUpdate.userErrors.0.message');
      message.error(pageError || globalError, 1);
      return Promise.reject();
    }

    dispatch({
      type: "update:modifyGlobalConfig",
      payload: { modifyGlobalConfig: false }
    });
    dispatch({
      type: "init:globalConfig",
      payload: { initialGlobalConfig: JSON.stringify(globalConfig) }
    });

    dispatch({
      type: "update:modifyPageConfig",
      payload: { modifyPageConfig: false }
    });
    dispatch({
      type: "init:pageConfig",
      payload: { initialPageConfig: JSON.stringify(decorateData) }
    });
  };

  const handleBack = () => {
    if (IS_PRODUCTION_MODE) {
      window.location.href = "/admin/themeTemplate";
    } else {
      window.location.href = "/themeTemplate";
    }
  };

  /**
   * 进行页面切换
   *
   * @param pageName 将要切换到的页面
   */
  const changeRoute = (pageName: string) => {
    dispatch({ type: "changeEdtingRoute", payload: { pageName } });
  };

  /**
   * 切换页面时，如果当前页面的数据编辑过但是还未保存，在切换时进行提示
   *
   * @param event
   */
  const handleeidtingRouteChange = event => {
    const pageName = event.target.value;
    if (modifyPageConfig) {
      confirm({
        title: "确认要进行切换吗？",
        icon: <ExclamationCircleOutlined />,
        content: "切换后，当前修改的配置数据会丢失",
        onOk() {
          changeRoute(pageName);
        }
      });
    } else {
      changeRoute(pageName);
    }
  };

  const handleChangePreviewMode = previewMode => {
    dispatch({
      type: "changePreviewMode",
      payload: {
        previewMode
      }
    });
  };

  /**
   * 点击发布指定模板数据时的处理函数
   *
   * 发布时，先将当前数据保存一次，然后再进行发布
   */
  const handlePublishArchiveTheme = async () => {
    try {
      await handleRelease(true);
      await fppMutationRecordPublish({ id: +id });
      message.success("发布成功！", 1);
    } catch (error) {
      message.error("发布失败，请稍后重试", 1);
    }
  };

  // 跳转到店铺功能，需要使用 a 标签实现，否则会出现 url 闪动问题
  return (
    <FitShopStoreContext.Provider value={fitShopPageStore}>
      <div className="fsp-container">
        <div className="top-bar">
          <div className="left">
            <div className="back-btn" onClick={handleBack}>
              <Icon name="iconhuitui" />
            </div>
            {/* <span className="line-1-y"></span> */}
            <FormControl size="small" variant="outlined">
              <Select
                value={fitShopPageState.editingRoute}
                onChange={handleeidtingRouteChange}
              >
                <MenuItem value={"home"}>首页</MenuItem>
                {dataSource.isShowProduct && (
                  <MenuItem value={"product_detail"}>产品详情页</MenuItem>
                )}
                {dataSource.isShowCollection && (
                  <MenuItem value={"collection_detail"}>系列详情页</MenuItem>
                )}
                <MenuItem value={"checkout"}>结算页</MenuItem>
              </Select>
            </FormControl>
            {!!id && (
              <div className="save-btn" onClick={() => handleRelease(true)}>
                <Icon name="iconbaocun" />
                保存
              </div>
            )}
          </div>
          <div className="toggle-screen">
            <div
              className="pc"
              onClick={() => {
                handleChangePreviewMode("pc");
              }}
            >
              <Icon
                name="icondiannao"
                className={fitShopPageState.previewMode == "pc" && "selected"}
              />
            </div>
            <div
              className="mobile"
              onClick={() => {
                handleChangePreviewMode("mobile");
              }}
            >
              <Icon
                name="iconshouji"
                className={
                  fitShopPageState.previewMode == "mobile" && "selected"
                }
              />
            </div>
          </div>
          <div className="right">
            <div
              className="release"
              onClick={
                id ? handlePublishArchiveTheme : () => handleRelease(false)
              }
            >
              <Icon name="iconfabu" />
              发布
            </div>
            <span className="line-1-y"></span>
            <a
              className="preview"
              href={`${localStorage.getItem('default_domain') || '/'}?theme=${id || ""}`} 
              target="_blank"
            >
              <Icon name="iconchakan" />
              查看店铺
            </a>
          </div>
        </div>
        {fitShopPageState.editingRoute === "home" && (
          <div className="fsp-content">
            <FitAside previewId={id} />
            <FitMain previewId={id} />
          </div>
        )}
        {fitShopPageState.editingRoute === "product_detail" && (
          <div className="fsp-content">
            <FitAsideProductDetail previewId={id} />
            <FitMainContent
              path={`products/119/?preview=true${previewThemeFlag}`}
              data={InitData4ProductDetail}
            />
          </div>
        )}
        {fitShopPageState.editingRoute === "collection_detail" && (
          <div className="fsp-content">
            <FitAsideCollection previewId={id} />
            <FitMainContent
              path={`collections/0/?preview=true${previewThemeFlag}`}
              data={collectionDetail}
            />
          </div>
        )}
        {fitShopPageState.editingRoute === "checkout" && (
          <div className="fsp-content">
            <FitAsideCheckout previewId={id} />
            <FitMainContent
              path={`checkouts/f80cacea60de83a53ebb7218611c3cd2/?preview=true${previewThemeFlag}`}
              data={collectionDetail}
            />
          </div>
        )}
      </div>
    </FitShopStoreContext.Provider>
  );
};
FitShopPage.displayName = "FitShopPage";
export default FitShopPage;
