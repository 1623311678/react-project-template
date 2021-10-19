import { List, ListItem } from "@src/common/components/List";
import OverallConfig from "@src/fitshop/components/FitAside/overallConfig";
import { FitShopStoreContext } from "@src/fitshop/reducer";
import { findIndex } from 'lodash';
import React, { useContext, useState } from 'react';

const GlobalConfig: React.FC = () => {
  const [ state, dispatch ] = useContext(FitShopStoreContext);
  const { globalConfig, initialGlobalConfig } = state;
  const [ overall_config_list_active, set_overall_config_list_active ] = useState(0);

  const GLOBAL_CONFIG_MODULE = [
    { key: "normal", title: "常规" },
    { key: "fonts_and_colors", title: "字体" },
    { key: "cartConfig", title: "购物车" },
    { key: "commodity", title: "产品" },
    { key: "blog", title: "博客" },
    { key: "social_media", title: "社交媒体" },
  ];

  /**
   * 全局模块 (header footer global) 发生变化时的处理函数，将新的模块数据更新到 store 中，
   * 并触发预览更新
   *
   * 发生变化时，将 store 中的原始数据和本次的新数据进行对比，如果不同，则将 modifyGlobalConfig
   * 置为 true，表示全局配置发生了变化
   *
   * @param nextGlobalSection 将要更新的全局模块数据
   */
  const handleGlobalSectionUpdate = (nextGlobalSection: object) => {
    dispatch({ type: "update:global", payload: { data: nextGlobalSection } });
    window.frames[0].postMessage({ data: nextGlobalSection, key: "preview-global-update" }, "*");

    const hasModifyGlobalConfig = initialGlobalConfig !== JSON.stringify(nextGlobalSection);
    if (initialGlobalConfig !== undefined) {
      dispatch({ type: "update:modifyGlobalConfig", payload: { modifyGlobalConfig: hasModifyGlobalConfig } })
    }
  };

  const handleChangeConfig = (flag, data) => {
    const targetIndex = findIndex(globalConfig.globalConfig, item => item.name === flag);
    targetIndex > -1
      ? globalConfig.globalConfig[targetIndex].data = data
      : globalConfig.globalConfig.push({ name: flag, type: flag, data, id: new Date().getTime() });
    handleGlobalSectionUpdate(globalConfig);
  };

  return (
    <div className="shop-config-wrapper">
      <div className="config-name-list">
        <List
          component="nav"
          aria-label="main mailbox folders"
          className="pd-0"
        >
          {GLOBAL_CONFIG_MODULE.map((item, index) => (
            <ListItem
              key={index}
              className="c-n__row"
              selected={overall_config_list_active === index}
              onClick={() => {
                set_overall_config_list_active(index);
              }}
            >
              {item.title}
            </ListItem>
          ))}
        </List>
      </div>
      <div className="config__context pb-20">
        <OverallConfig
          globalConfig={globalConfig.globalConfig}
          pages={GLOBAL_CONFIG_MODULE[overall_config_list_active].key}
          onChange={handleChangeConfig}
        />
      </div>
    </div>
  )
};

export default GlobalConfig;