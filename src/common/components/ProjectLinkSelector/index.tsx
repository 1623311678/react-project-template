/**

 */
import { get } from "lodash";
import { List, message } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import Icon from "@src/common/components/Icon";
import { getAllProducts } from "@src/api/products"
import { getCollectionsList } from "@src/api/collections"
import { getPageList } from '@src/api/pageCreator'
import { getBlogs } from "@src/api/blog";
import { getBlogAlbums } from "@src/api/blog";
import useClickedOutside from "../../hooks/useClickedOutside";
import BusinessSelect from './BusinessSelect'

import "./index.scss";

interface Props {
  initialValue?: {
    id?: string,
    type?: string,
    link?: string,
    title?: string,
  }
  selectionPosition?: string,  // 下拉选项位置 top/bottom
  placeholder?: string
  onLinkSelected: (selectItmes: [object]) => void,
};

type MENU_TYPE = {
  name?: string,
  icon?: string,
  type?: string
}

const InitialMenus = [
  {
    name: '系列',
    icon: 'iconzhekou',
    type: 'collection'
  },
  {
    name: '产品',
    icon: 'iconshangpinguanli1',
    type: 'product'
  },
  {
    name: '规则',
    icon: 'iconshangpinguanli1',
    type: 'legal'
  },
  {
    name: '自定义页面',
    icon: 'iconshangpinguanli1',
    type: 'pages'
  },
  {
    name: '所有系列',
    icon: 'iconshangpinguanli1',
    type: 'collections'
  },
  {
    name: '所有产品',
    icon: 'iconshangpinguanli1',
    type: 'products'
  },
  {
    name: '首页',
    icon: 'iconshangpinguanli1',
    type: 'home'
  },
  {
    name: '购物车',
    icon: 'iconshangpinguanli1',
    type: 'cart'
  },
  {
    name: '博客详情',
    icon: 'iconshangpinguanli1',
    type: 'blog'
  },
  {
    name: '博客专辑',
    icon: 'iconshangpinguanli1',
    type: 'blogs'
  },
]

interface SelectedItemProps {
  menu: MENU_TYPE
  selectedItem: {
    title?: string,
    link?: string // 这个不是从搜索数据中拿来的,是选中后自己拼接的
  }
}
function SelectedItem(props: SelectedItemProps) {
  const {
    menu,
    selectedItem
  } = props
  return (
    <div className="selected-item">
      <div className=""><Icon className="mr-4" name={menu.icon} /></div>
      {/* <div className="">{selectedItem.title}</div> */}
    </div>
  )
}


// 获取产品列表
const getProductList = async (variables) => {
  variables.queryFilter = 'status:ACTIVE'
  let data = await getAllProducts(variables);
  let nodes = data.data.products.edges;
  let pageInfo = data.data.products.pageInfo;
  return {
    nodes: nodes.map(item => item.node),
    pageInfo: pageInfo,
    cursor: nodes.length ? nodes.pop().cursor : ""
  };
};


// 获取系列列表
const getCollectionList = async variables => {
  let data = await getCollectionsList(variables);
  let nodes = data.data.collections.edges;
  let pageInfo = data.data.collections.pageInfo;
  return {
    nodes: nodes.map(item => item.node),
    pageInfo: pageInfo,
    cursor: nodes.length ? nodes.pop().cursor : ""
  };
};

// 获取博客专辑列表
const getBlogAlbumList = async (variables) => {
  const data = await getBlogAlbums(variables);
  const nodes = data.data.albums.edges
  const pageInfo = data.data.albums.pageInfo;
  return {
    nodes: nodes.map(item => item.node),
    pageInfo: pageInfo,
    cursor: nodes.length ? nodes.pop().cursor : ""
  };
};



// 获取博客列表
const getBlogList = async variables => {
  variables.title=variables.query || ''
  delete variables.query
  delete variables.reverse
  delete variables.sortKey
  const data = await getBlogs(variables);
  const nodes = data.data.articles.edges
  const pageInfo = data.data.articles.pageInfo;
  return {
    nodes: nodes.map(item => item.node),
    pageInfo: pageInfo,
    cursor: nodes.length ? nodes.pop().cursor : ""
  };
};



const ProjectLinkSelector: React.FC<Props> = props => {
  const {
    initialValue = {},
    placeholder = "请选择",
    selectionPosition
  } = props;


  const inputRef = useRef()
  const [menu, setMenu] = useState<any>(initialValue)

  const [selectedItem, setSelectedItem] = useState(initialValue || {})
  const [inputValue, setInputValue] = useState(initialValue && initialValue.title)

  const [showSubPanel, setShowSubPanel] = useState(false)
  const [showContent, setShowContent] = useState(false)


  const [pagesList, setPagesList] = useState([])

  const { clickedOutside, setElementRef } = useClickedOutside();


  const legalList = [
    {
      title: "退款政策",
      id: "refund_policy"
    },
    {
      title: "隐私策略",
      id: "privacy_policy"
    },
    {
      title: "服务条款",
      id: "terms_of_service"
    },
    {
      title: "物流政策",
      id: "shipping_policy"
    }
  ]

  const fetchPagesList = async (param = '') => {
    try {
      const res = await getPageList(param);
      const userErrors = get(res, 'data.shopSettingPageList.userErrors', [])
      if (userErrors.length > 0) {
        message.error(userErrors[0].message);
      } else {
        let dataList = [];
        for (const iterator of get(res, 'data.shopSettingPageList', [])) {
          if (iterator.published) {
            dataList.push({
              title: iterator.title,
              id: iterator.id,
              handle:iterator.handle
            })
          }
        }
        setPagesList(dataList)
      }
    } catch (error) {

    }
  }

  const handleMenuSelected = (menu: MENU_TYPE) => {
    const { type } = menu
    if (type === 'collections' || type === 'products' || type === 'cart' || type === 'checkout' || type === 'home') {
      return handleLink(menu)
    }
    setMenu(menu)
    switch (type) {
      case 'collection':

        break;
      case 'product':

        break;
      case 'legal':
        break;
      case 'pages':
        fetchPagesList()
        break;
      default:
        break;
    }
    setShowSubPanel(true)
  }

  const handleLink = (menu) => {
    const _menu = menu
    _menu.link = `/${menu.type}`
    _menu.id = ""
    _menu.title = _menu.name
    setMenu(_menu)
    setSelectedItem(_menu)
    setInputValue(_menu.name)
    setShowContent(false)
    setShowSubPanel(false)
    props.onLinkSelected(_menu)
  }

  function handleSelectedRow(col) {
    let item = col
    // 系列和商品列表都有title, 其他不一定
    if (menu.type == 'collection') {
      item.type = 'collection'
      item.link = `/collections/${col.handle}`
    } else if (menu.type == 'product') {
      item.type = 'product'
      item.link = `/products/${col.handle}`
    } else if (menu.type == 'legal') {
      item.type = 'policies'
      item.link = `/policies/${col.id}`
    } else if (menu.type == 'pages') {
      item.type = 'pages'
      item.link = `/pages/${col.handle}`
    } else if (menu.type == 'blog') {
      item.type = 'blog'
      item.link = `/blog/${col.handle}`
    } else if (menu.type == 'blogs') {
      item.type = 'blogs'
      item.link = `/blogs/${col.handle}`
    }
    setSelectedItem(col)
    setInputValue(col.title)
    setShowContent(false)
    setShowSubPanel(false)

    props.onLinkSelected(col)
  }

  function handleBack() {
    setShowSubPanel(false)
  }

  function handleInputerWrapperClick(e) {
    e && e.stopPropagation()
    inputRef && inputRef.current.focus()
    setShowContent(true)
  }

  function handleInputChange(e) {
    setInputValue(e.target.value)
    if(e.target.value.length===0){
      const clearData:any = selectedItem
      clearData.type = null
      clearData.link = null
      clearData.icon = null
      clearData.title = null
      props.onLinkSelected(clearData)
      setSelectedItem(null)
      setMenu({})
    }
  }

  function resetSelf() {
    setShowContent(false)
    setShowSubPanel(false)
  }

  useEffect(() => {
    resetSelf();
  }, [clickedOutside]);


  return (
    <div ref={setElementRef()} className={`fpp-project-link-selector-container`}>
      {showContent &&
        <div className="sp__content" 
          style={
            selectionPosition === 'bottom' ? {top: '0',bottom:'auto'} : {}
          }>
          {!showSubPanel &&
            <div className="panel">
              <List>
                {InitialMenus.map((menu) =>
                  < List.Item className="menu-row" key={menu.type} onClick={() => handleMenuSelected(menu)}>
                    <Icon className="mr-10" name={menu.icon} />
                    {menu.name}
                  </List.Item>)}
              </List>
            </div>
          }

          {showSubPanel &&
            <div className="sub-penal">
              <div className="sp__header" onClick={handleBack}>
                <Icon name="iconhuitui" />
                {menu.type == 'collection' && '选择系列'}
                {menu.type == 'product' && '选择产品'}
                {menu.type == 'blog' && '选择博客'}
                {menu.type == 'blogs' && '选博客专辑'}
                {(menu.type == 'legal' && legalList) && legalList.length + '个结果'} 
                {(menu.type == 'pages' && pagesList) && pagesList.length + '个结果'}
                
              </div>
              <List>
                {/* 系列 */}
                {menu.type == 'collection' && <BusinessSelect
                    forType="collection"
                    defaultSelectedRows={[selectedItem]}
                    getlist={getCollectionList}
                    handleCancel={() => setShowSubPanel(false)}
                    handleSelect={handleSelectedRow}
                  />
                }

                {/* 产品 */}
                {menu.type == 'product' && 
                  <BusinessSelect 
                    forType="product"
                    defaultSelectedRows={[selectedItem]}
                    getlist={getProductList}
                    handleCancel={() => setShowSubPanel(false)}
                    handleSelect={handleSelectedRow}
                  />
                }
                {/* 规则 */}
                {menu.type == 'legal' && legalList.map((col, index) =>
                  <List.Item key={col.id} className="selector-row" onClick={e => handleSelectedRow(col)}>
                    <span>{col.title}</span>
                  </List.Item>
                )}
                {/*  */}
                {menu.type == 'pages' && pagesList.map((col, index) =>
                  <List.Item key={index} className="selector-row" onClick={e => handleSelectedRow(col)}>
                    <span>{col.title}</span>
                  </List.Item>
                )}
                {/* 博客专辑 */}
                {menu.type == 'blogs' && 
                  <BusinessSelect 
                    forType="blogs"
                    defaultSelectedRows={[selectedItem]}
                    getlist={getBlogAlbumList}
                    handleCancel={() => setShowSubPanel(false)}
                    handleSelect={handleSelectedRow}
                  />
                }
                {/* 博客详情 */}
                {menu.type == 'blog' && 
                  <BusinessSelect 
                    forType="blog"
                    defaultSelectedRows={[selectedItem]}
                    getlist={getBlogList}
                    handleCancel={() => setShowSubPanel(false)}
                    handleSelect={handleSelectedRow}
                  />
                }
              </List>
            </div>
          }
        </div>
      }
      <div className="input-wrapper" onClick={handleInputerWrapperClick}>
        <div className="selected-list">
          <SelectedItem menu={menu} selectedItem={selectedItem} />
        </div>
        <input
          ref={inputRef}
          className="inputer"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}  >
        </input>
        {selectedItem && selectedItem.link &&
          <a className="visit" target="blank" href={selectedItem.link}>Visit</a>
        }
      </div>
    </div>
  );
}

export default ProjectLinkSelector;