import "./fa.scss";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { allCollectionOptions } from "@src/api/collections";
import { fetchPageConfig } from "@src/api/decorate";
import { Tab,Tabs } from "@src/common/components/Tab";
import GlobalConfig from "@src/fitshop/components/GlobalConfig";
import { get } from 'lodash';
import React, { useContext, useEffect,useState } from "react";

import { FitShopStoreContext } from "../../reducer";
import CollectionConfig from "./Collection";
import collectionDetail from "./ConfigItem/initialConfiguration/collectionDetail";

const FitAsideCollection: React.FC<{}> = ({ previewId }) => {
  const [ShopEditor, GlobalSetting] = ["店铺编辑", "全局设置"];
  const FIT_TABS_LIST = [ShopEditor, GlobalSetting];
  const [state, dispatch] = useContext(FitShopStoreContext);
  const [tabValue, changeTabValue] = useState(ShopEditor);
  const [templateOption, setTemplateOption] = useState({});
  const [attrFilter, setAttrFilter] = useState([]);
  const [typeFilter, setTypeFilter] = useState([]);
  const { initialPageConfig } = state;

  useEffect(() => {
    getDecorateRelease();
  }, []);

  /**
   * 将要更新时，检查当前已选的 filter 是否存在在 filter 全量列表中，
   * 如果没有找到，则说明当前的 filter 已不存在，从已选的 filter 列表
   * 中删除该 filter
   * 
   * @param ary 将要更新的页面配置对象
   */
  const postMessageToIframe = ary => {
    const dataBody = JSON.parse(JSON.stringify(ary));
    const { filters } = dataBody;
    if (filters) {
      for (const iterator of filters) {
        if (attrFilter.indexOf(iterator) === -1) {
          delete dataBody.filters[iterator]
        }
      }
    }
    window.frames[0].postMessage(
      {
        key: "preview-template",
        data: dataBody
      },
      "*"
    );
  };

  // 初始化模版数据 拿正式数据
  const getDecorateRelease = async () => {
    // 获取商品filter筛选
    const res = await allCollectionOptions();
    const attrFilter = get(res, 'data.allCollectionOptions.options', []);
    const typeFilter = get(res, 'data.allCollectionOptions.productTypes', []);

    setAttrFilter(attrFilter);
    setTypeFilter(typeFilter);

    dispatch({ type: 'update:collectionDetailFilterMap', payload: { collectionDetailFilterMap: attrFilter } })

    const data = await fetchPageConfig({
      flag: "release",
      route: "collection_detail",
      record: previewId,
    });
    const pageConfig = get(data, 'data.decorate.config[0]', {
      type: 'collection_detail',
      name: 'collection_detail',
      id: Math.round(Math.random() * 10000),
      data: JSON.stringify(collectionDetail.options),
    });

    // 添加默认值
    if (pageConfig.data === '{}') {
      pageConfig.data = JSON.stringify(collectionDetail.options);
    }
    const dataBody = JSON.parse(pageConfig.data);

    /**
     * 兼容代码，由于数据结构变更，filters 由 object 改为 array，在此对线上数据
     * 进行兼容处理，避免意外情况
     */
    const { filters } = dataBody;
    if (filters && Object.prototype.toString.call(filters) === '[object Object]') {
      dataBody.filters = Object.keys(filters);
    }

    pageConfig.data = dataBody;
    setTemplateOption(pageConfig);
    dispatch({ type: 'update:willrelease', payload: { data: [pageConfig] } })
    dispatch({ type: "init:pageConfig", payload: { initialPageConfig: JSON.stringify([pageConfig]) } });
  };

  const handleChange = data => {
    delete data.attrFilter;
    delete data.typeFilter;
    const nextPageConfig = { ...templateOption, data };
    setTemplateOption(nextPageConfig);
    dispatch({ type: 'update:willrelease', payload: { data: [nextPageConfig] } })
    postMessageToIframe(nextPageConfig.data);

    const hasModifyPageConfig = initialPageConfig !== JSON.stringify([nextPageConfig]);
    if (initialPageConfig !== undefined) {
      dispatch({ type: "update:modifyPageConfig", payload: { modifyPageConfig: hasModifyPageConfig } });
    }
  };

  const handleTabChange = (value) => {
    changeTabValue(value);
  };

  const renderPageConfig = () => (
    <div className="shop-config-wrapper">
      <div className="config-name-list">
        <List
          component="nav"
          aria-label="main mailbox folders"
          className="pd-0"
        >
          <ListItem className={`c-n__row`} selected={true}>
            <span>系列详情</span>
          </ListItem>
        </List>
      </div>
      <div className="config__context pb-20">
        <CollectionConfig
          handleChange={handleChange}
          templateOption={{ ...get(templateOption, 'data', {}), attrFilter, typeFilter }}
        />
      </div>
    </div>
  )

  const renderMap = {
    [ShopEditor]: () => renderPageConfig(),
    [GlobalSetting]: () => <GlobalConfig/>,
  };

  return (
    <div className="fit-aside-container">
      <Tabs className="fitTabs" value={tabValue} onChange={handleTabChange}>
        {
          FIT_TABS_LIST.map(item => (
            <Tab key={item} label={item} name={item} />
          ))
        }
      </Tabs>
      <div className="tab-panel">
        { renderMap[tabValue]() }
      </div>
    </div>
  );
};
FitAsideCollection.displayName = "FitAsideCollection";
export default FitAsideCollection;
