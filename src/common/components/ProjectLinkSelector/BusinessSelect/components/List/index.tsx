import React, { memo, useCallback } from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from "@material-ui/core/CircularProgress";
import { IS_PRODUCTION_MODE } from "@src/config"

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

export interface SelectListProps {
  forType?: string;
  lists?: any[];
  butLoading?: Boolean;
  pageInfo: any;
  selectedRows?: any[];
  handleToggle: () => void;
  handleMore: () => void;
}

const SelectList = ({
  forType,
  lists,
  butLoading,
  pageInfo,
  selectedRows,
  handleToggle,
  handleMore
}) => {

  const classes = useStyles();

  const handleRouter = () => {
    if (forType) {
      if (forType === 'product') {
        window.open(window.location.origin + (IS_PRODUCTION_MODE ? '/admin/products/add' : '/products/add'))
      }
      if (forType == 'collection') {
        window.open(window.location.origin + (IS_PRODUCTION_MODE ? '/admin/collections/add' : '/collections/add'))
      }
      if (forType == 'blog') {
        window.open(window.location.origin + (IS_PRODUCTION_MODE ? '/admin/blog/articles/new' : '/blog/articles/new'))
      }
      if (forType == 'blogs') {
        window.open(window.location.origin + (IS_PRODUCTION_MODE ? '/admin/blog/collections/new' : '/blog/collections/new'))
      }
    } else {
      window.open(window.location.origin)
    }
  }

  let title = '' 
  
  if(forType === 'product') {
    title = "产品"
  } else if (forType === 'collection') {
    title = "系列"
  } else if (forType === 'blog') {
    title = "博客"
  } else if (forType === 'blogs') {
    title = "博客专辑"
  }

  return (
    <List style={{ 
      flex: 1, 
      verflowY: "auto", 
      marginBottom: "10px", 
      height: "450px", 
      display: 'flex', 
      alignItems: 'center',
      flexDirection: 'column' 
      }}>
      {lists.length ? lists.map((col) => {
        return (
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
              col.image && <img className="collection-row__img mr-10" src={col.image.originalSrc || col.image.src} alt={col.image.altText} />
            }
            {
              col.featuredImage && <img className="collection-row__img mr-10" src={col.featuredImage.transformedSrc} alt={col.featuredImage.altText} />
            }
            <ListItemText className={classes.itemContentTitle} primary={col.title} />
          </ListItem>
        )
      }) : (
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
                `创建${title}`
              }
            </span>
          </div>)
      }
      {
        (pageInfo && pageInfo.hasNextPage) && <Button style={{ width: "90%" }} className={classes.moreButton} variant="outlined" onClick={handleMore} >{butLoading ? <CircularProgress className={classes.loading} /> : "加载更多"}</Button>
      }
    </List>
  )
}

SelectList.displayName = "SelectList";
export default memo(SelectList)
