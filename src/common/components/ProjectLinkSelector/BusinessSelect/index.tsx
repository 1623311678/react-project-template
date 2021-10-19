/**
 * 商品和系列选择器
 */

import React, { memo, useEffect, useCallback, useState } from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Input } from 'antd';
import SelectList from './components/List'
import "./index.scss"

const useStyles = makeStyles(
  theme => ({
    selectContent: {
      display: "flex",
      minHeight: "120px",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      border: "0.5px solid #ccc",
      borderRadius: "5px",
      backgroundColor: "rgba(246, 246, 247, 1)",
      marginBottom: "10px",
      padding: "12px"
    },
    selectButton: {
      width: "50%",
      minWidth: "80px",
      minHeight: "32px",
      border: "0.5px solid #ccc",
      borderRadius: "5px",
      backgroundColor: "#fff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontWeight: 500,
      fontSize: "14px",
    },
    optionButton: {
      marginTop: "10px",
      display: "flex",
      justifyContent: "space-between",
    },
    selectImage: {
      marginRight: "10px",
      width: "30px",
      height: "30px"
    },
    selectedItem: {
      display: "flex",
      // justifyContent: "space-between",
      alignItems: "center"
    },
    selectedItemTitle: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      height: "40px"
    },
    checkItem: {
      borderBottom: "0.5px solid #ccc",
      marginBottom: "5px",
      padding: "5px",
      width: "100%"
    },
    loading: {
      position: "absolute",
      left: "50%",
      marginLeft: "-20px",
      top: "30%"
    },
    searchinput: {
      width: "94%",
      marginLeft: "3%",
      marginTop: "4px"
    }
  }),
  {
    name: "BusinessSelect"
  }
);

export interface BusinessSelectProps {
  getlist?: (_v: any) => any;
  columns?: any[];
  forType?: string,
  defaultSelectedRows: any[];
  handleSelect?: (_v: any) => any;
  handleCancel?: () => any
}

const _variables = {
  first: 10,
  after: null,
  query: null,
  sortKey: "ID",
  reverse: false
}

const BusinessSelect: React.FC<BusinessSelectProps> = ({ defaultSelectedRows, getlist, handleSelect, forType, handleCancel }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState<Boolean>(true);
  const [butLoading, setButLoading] = useState<Boolean>(false);
  const [show, setShow] = useState<Boolean>(false)
  const [selectedRows, setSelectedRows] = useState<Array<any>>(defaultSelectedRows)
  const [lists, setLists] = useState<Array<any>>([])
  const [pageInfo, setPageInfo] = useState<any>()
  const [variables, setVariables] = useState<any>(_variables)

  useEffect(() => {
    setSelectedRows(defaultSelectedRows)
  }, [defaultSelectedRows])

  useEffect(()=>{
    handleListShow()
  },[])


  // 打开选择列表
  const handleListShow = async () => {
    setShow(true)
    setLoading(true)
    const { nodes, pageInfo, cursor } = await getlist(variables)
    setLists(nodes)
    setPageInfo(pageInfo)
    if (pageInfo.hasNextPage) {
      setVariables({
        ...variables,
        after: cursor
      })
    }
    setLoading(false)
  }

  // 搜索
  const handleSearch = async (e) => {
    const _value = e.target.value
    const _serVariables = {
      ..._variables,
      query: _value
    }
    setLists([])
    setLoading(true)
    const { nodes, pageInfo, cursor } = await getlist(_serVariables)
    setLists(nodes)
    setPageInfo(pageInfo)
    setLoading(false)
    if (pageInfo.hasNextPage) {
      setVariables({
        ..._serVariables,
        after: cursor
      })
    }
  }

  // 加载更多items
  const handleMore = async () => {
    setButLoading(true)
    const { nodes, pageInfo, cursor } = await getlist(variables)
    setLists([
      ...lists,
      ...nodes
    ])
    setPageInfo(pageInfo)
    setButLoading(false)
    if (pageInfo.hasNextPage) {
      setVariables({
        ...variables,
        after: cursor
      })
    }
  }

  // 处理选中的keys
  const handleToggle = (item) => {
    setVariables(_variables)
    if (item) {
      handleSelect(item)
    }
  }

  // list props
  const listProps = {
    forType,
    butLoading,
    lists: lists,
    pageInfo: pageInfo,
    selectedRows: selectedRows,
    handleMore: handleMore,
    handleToggle: handleToggle
  }

  return (
    <>
      <div className={`pls__business-select-root`}>
        <div className="input-content">
          <Input
            placeholder="搜索"
            className={classes.searchinput}
            type="search"
            onChange={handleSearch}
          />
        </div>
        {
          loading ? (<div style={{ minHeight: "450px" }}><CircularProgress className={classes.loading} /></div>) : <SelectList {...listProps} />
        }

      </div> 
    </>
  )
}

export default memo(BusinessSelect)