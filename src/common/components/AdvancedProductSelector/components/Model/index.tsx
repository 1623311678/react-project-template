
import makeStyles from "@material-ui/core/styles/makeStyles";
import classNames from "classnames";
import React, { useEffect } from "react";
import Button from '@material-ui/core/Button';
import CloseIcon from "@material-ui/icons/Close";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Input } from 'antd';
import "./index.scss"

const useStyles = makeStyles(
  theme => ({
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
    },
    selectedItemTitle: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      height: "40px",
      wordBreak: "break-word"
    }
  }),
  {
    name: "SelectModel"
  }
);

export interface SelectModelProps {
  children?: React.ReactNode;
  className?: string;
  show?: boolean;
  title?: string;
  loading?: boolean;
  selectedRows?: any[];
  handleOk: (i: any) => void;
  handleCancel: () => void;
  handleSearch: () => void;
}

const SelectModel: React.FC<SelectModelProps> = ({
  children,
  className,
  show,
  title,
  loading,
  selectedRows,
  handleOk,
  handleCancel,
}) => {

  const classes = useStyles({});

  return (
    <>
      {show ?
        <div className={`${classNames(classes.root, className)} ${show && 'show'} modal-inner-root-choice`}>
          {
            loading ? (<div style={{ minHeight: "450px" }}><CircularProgress className={classes.loading} /></div>) : children
          }
          <div className="b-content">
            {
              selectedRows.map(_r => {
                if (_r.id){
                  return (
                    <div key={_r.id} className="b-product">
                      {_r.image && <img className="collection-row__img mr-10" src={_r.image.originalSrc} alt={_r.image.altText} />}
                      {_r.featuredImage && <img className="collection-row__img mr-10" src={_r.featuredImage.transformedSrc} alt={_r.featuredImage.altText} />}
                      <div className="b-product-right">
                        <div className="b-title">当前选择</div>
                        <div className={classes.selectedItemTitle}>{_r.title}</div>
                      </div>
                    </div>
                  )
                }
              })
            }
            <div className="b-wrapper">
              <Button variant="outlined" onClick={handleCancel}>
                取消
            </Button>
              <Button variant="contained" color="primary" onClick={handleOk}>
                选择
            </Button>
            </div>
          </div>

        </div> : ""
      }
    </>
  );
};

SelectModel.displayName = "SelectModel";
export default SelectModel;

