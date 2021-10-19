import React, { memo, useState } from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from "@material-ui/core/CircularProgress";
import { IS_PRODUCTION_MODE } from '@src/config';
import { getProductsInCollectionById } from '@src/api/collections'
import Icon from "@src/common/components/Icon";

const useStyles = makeStyles(
  theme => ({
    selectContent: {
      display: "flex",
      height: "100px",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      margin: "12px",
      border: "0.5px solid #ccc",
      borderRadius: "5px",
      backgroundColor: "rgba(246, 246, 247, 1)"
    },
    moreButton: {
      fontWeight: 500,
      fontSize: "14px",
      margin: "0 auto",
      width: "140px"
    },
    loading: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "24px !important",
      height: "24px !important",
      "& svg": {
        marginLeft: 0
      }
    },
    noFound: {
      marginTop: "40px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    searchButton: {
      fill: "#c4cdd5",
      width: "60px",
      height: "60px"
    },
    searchTitle: {
      fontSize: "18px",
      margin: "20px 0",
    },
    searchDesc: {
      fontSize: "14px",
      fontWeight: 400,
      marginBottom: "10px"
    },
    searchCreate: {
      fontSize: "14px",
      fontWeight: 400,
      color: "rgba(44, 110, 203, 1)",
      textDecoration: "underline",
      cursor: "pointer"
    },
    itemContent: {
      paddingLeft: "10px",
      paddingRight: "10px",
      maxHeight: "76px"
    },
    itemContentBack: {
      paddingLeft: "10px",
      paddingRight: "10px",
      maxHeight: "76px",
      borderBottom: "1px solid #333",
    },
    itemContentTitle: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      maxHeight: "60px",
      wordBreak: 'break-all'
    },
    itemIcon: {
      minWidth: "40px"
    }
  }),
  {
    name: "SelectList"
  }
);

const _variables = {
  first: 10,
  after: null,
  query: null,
  sortKey: "ID",
  status: 'ACTIVE',
  reverse: false
}

export interface SelectListProps {
  title?: string;
  lists?: any[];
  butLoading?: boolean;
  pageInfo: any;
  selectedRows?: any[];
  handleToggle: () => void;
  handleMore: () => void;
}

const SelectList = ({
  title="系列",
  lists,
  butLoading,
  pageInfo,
  selectedRows,
  handleToggle,
  handleMore
}) => {

  const [showSubPanel, setShowSubPanel] = useState(false)
  const [productLists, setProductLists] = useState([])
  const [productListPageInfo, setProductListPageInfo] = useState({})
  const [btnLoading, setBtnLoading] = useState<boolean>(butLoading);
  const [productListVariables, setProductListVariables] = useState<{
    collectionId: string | number,
    first: number,
    after: number
  }>(_variables)


  const handleSelectCollection = async (col) => {
    productListVariables.collectionId = col.id
    getProducts(productListVariables)
  }


  const getProducts = async (productListVariables)=>{
    const res = await getProductsInCollectionById(productListVariables)

    const { edges, pageInfo } = res?.data?.collection?.products

    setShowSubPanel(true)

    setProductLists([
      ...productLists,
      ...edges.map(e => e.node)
    ])
    const cursor = edges.length ? edges.pop().cursor : ""
    setProductListPageInfo(pageInfo)
    setBtnLoading(false)
    if (pageInfo.hasNextPage) {
      setProductListVariables({
        ...productListVariables,
        after: cursor
      })
    }
  }

  const handleMoreProducts = ()=>{
    getProducts(productListVariables)
  }

  const classes = useStyles();
  const handleRouter = () => {
    window.open(window.location.origin + (IS_PRODUCTION_MODE ? '/admin/collections/add' : '/collections/add'))
  }
  const handleBack = ()=>{
    setShowSubPanel(false)
    setProductLists([])
    setProductListVariables(_variables)
  }

  return (<>
    { !showSubPanel ? 
      <List style={{ flex: 1, overflowY: "auto", marginBottom: "10px", maxHeight: "450px" }}>
        {lists.length ? lists.map((col) => (
            <ListItem className={classes.itemContent} key={col.id} role={undefined} dense button onClick={() => handleSelectCollection(col)}>
              {
                col.image && <img className="collection-row__img mr-10" src={col.image.originalSrc} alt={col.image.altText} />
              }
              {
                col.featuredImage && <img className="collection-row__img mr-10" src={col.featuredImage.transformedSrc} alt={col.featuredImage.altText} />
              }
              <ListItemText className={classes.itemContentTitle} primary={col.title} />
            </ListItem>
          )) : (
            <div className={classes.noFound}>
              <SearchIcon className={classes.searchButton} />
              <span className={classes.searchTitle}>
                未找到结果
              </span>
              <span className={classes.searchDesc}>
                尝试使用其他搜索查询
            </span>
              <span className={classes.searchCreate} onClick={handleRouter}>
                {
                  title ? `创建${title}` : "创建产品"
                }
              </span>
            </div>)
        }
        {
          (pageInfo && pageInfo.hasNextPage) && <Button style={{ width: "90%" }} className={classes.moreButton} variant="outlined" onClick={handleMore} >{btnLoading ? <CircularProgress className={classes.loading} /> : "加载更多"}</Button>
        }
      </List>
    : 
      <List style={{ flex: 1, overflowY: "auto", marginBottom: "10px", maxHeight: "450px" }}>
        <ListItem className={classes.itemContentBack} onClick={handleBack}>
          <ListItemIcon className={classes.itemIcon}>
            <Icon name="iconhuitui" />
          </ListItemIcon>
        </ListItem>

        {productLists.length ? productLists.map((col) => (
              <ListItem className={classes.itemContent} key={col.id} role={undefined} dense button onClick={() => handleToggle(col)}>
                <ListItemIcon className={classes.itemIcon}>
                  <Checkbox
                    edge="start"
                    checked={selectedRows.findIndex((_i) => _i.id == col.id) !== -1}
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                {
                  col.image && <img className="collection-row__img mr-10" src={col.image.originalSrc} alt={col.image.altText} />
                }
                {
                  col.featuredImage && <img className="collection-row__img mr-10" src={col.featuredImage.transformedSrc} alt={col.featuredImage.altText} />
                }
                <ListItemText className={classes.itemContentTitle} primary={col.title} />
              </ListItem>
            )) : (
              <div className={classes.noFound}>
                <SearchIcon className={classes.searchButton} />
                <span className={classes.searchTitle}>
                  未找到结果
                </span>
                <span className={classes.searchDesc}>
                  尝试使用其他搜索查询
              </span>
                <span className={classes.searchCreate} onClick={handleRouter}>
                  {
                     "创建产品"
                  }
                </span>
              </div>)
          }
          {
          (productListPageInfo && productListPageInfo.hasNextPage) && <Button style={{ width: "90%" }} className={classes.moreButton} variant="outlined" onClick={handleMoreProducts} >{btnLoading ? <CircularProgress className={classes.loading} /> : "加载更多"}</Button>
          }
        </List>
    
    
    }
  </>)
}

SelectList.displayName = "SelectList";
export default memo(SelectList)
