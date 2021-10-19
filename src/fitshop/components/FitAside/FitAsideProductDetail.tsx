import "./fa.scss";

import List from '@material-ui/core/List';
import ListItem from "@material-ui/core/ListItem";
import { fetchPageConfig } from "@src/api/decorate";
import { Tab,Tabs } from "@src/common/components/Tab";
import { getPageList } from "@src/api/pageCreator";
import GlobalConfig from "@src/fitshop/components/GlobalConfig";
import { get } from 'lodash';
import React, { useContext, useEffect,useState } from "react";

import { FitShopStoreContext } from '../../reducer'
import ProductDetailConfiItem from "./ProductDetail"

const FitAside: React.FC<{}> = ({ previewId }) => {
  const [ShopEditor, GlobalSetting] = ["店铺编辑", "全局设置"];
  const FIT_TABS_LIST = [ShopEditor, GlobalSetting];
  const [state, dispatch] = useContext(FitShopStoreContext)
  const [tabValue, changeTabValue] = useState(ShopEditor);
  const [templateOption, setTemplateOption] = useState({});
  const [pageList, setPageList] = useState<[]>([]);
  // const [instructionsActiveObj, setInstructionsActiveObj] = useState<[]>([]);
  const { initialPageConfig } = state;

  useEffect(() => {
    getDecorateRelease()
  }, [])

  const postMessageToIframe = (ary) => {
    window.frames[0].postMessage({
      key: 'preview-template',
      data: ary
    }, '*')
  }

  const getDecorateRelease = async () => {
    const data = await fetchPageConfig({
      flag: 'release',
      route: 'product_detail',
      record: previewId,
    });
    const pageConfig = get(data, 'data.decorate.config[0]', {
      name: "product_detail",
      type: "product_detail",
      id: Math.round(Math.random() * 10000),
      data: JSON.stringify({blocks:[]}),
    });

    // 数据矫正
    pageConfig.name = "product_detail";
    pageConfig.type = "product_detail";

    pageConfig.data = JSON.parse(pageConfig.data);
    setTemplateOption(pageConfig);
    dispatch({ type: 'update:willrelease', payload: { data: [pageConfig] } })
    dispatch({ type: "init:pageConfig", payload: { initialPageConfig: JSON.stringify([pageConfig]) } });

    const res = await getPageList();
    const { blocks = [] } = pageConfig.data;
    // setInstructionsActiveObj(Instructions)
    const pageList = get(res, 'data.shopSettingPageList', []);
    setPageList(pageList);
  }
  const handleChange = (data) => {
    const nextPageConfig = { ...templateOption, data };
    setTemplateOption(nextPageConfig);
    dispatch({ type: 'update:willrelease', payload: { data: [nextPageConfig] } })
    postMessageToIframe(nextPageConfig.data);

    const hasModifyPageConfig = initialPageConfig !== JSON.stringify([nextPageConfig]);
    if (initialPageConfig !== undefined) {
      dispatch({ type: "update:modifyPageConfig", payload: { modifyPageConfig: hasModifyPageConfig } });
    }
  }

  const renderPageConfig = () => (
    <div className="shop-config-wrapper">
      <div className="config-name-list">
        <List component="nav" aria-label="main mailbox folders" className="pd-0">
          <ListItem className={`c-n__row`} selected={true}>
            <span>产品详情</span>
          </ListItem>
        </List>
      </div>
      <div className="config__context pb-20">
        <ProductDetailConfiItem
          handleChange={handleChange}
          templateOption={get(templateOption, 'data', {})}
          pageList={pageList}
          // activeObj={instructionsActiveObj}
        />
      </div>
    </div>
  );

  const renderMap = {
    [ShopEditor]: () => renderPageConfig(),
    [GlobalSetting]: () => <GlobalConfig/>,
  };

  const handleTabChange = (value) => {
    changeTabValue(value);
  }

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
FitAside.displayName = "FitAside";
export default FitAside;
