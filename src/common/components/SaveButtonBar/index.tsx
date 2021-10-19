/**
 * @name 页面保存按钮
 * @param isShow    保存bar是否显示
 * @param handleSave  保存按钮回调
 * @param handleCancel 取消按钮回调
 * @param loading 保存按钮的loading效果
 * @param titleShow 标题是否显示
 * @param cancelTextShow 取消按钮是否显示
 * @param saveTextShow 保存按钮是否显示
 * @param title 标题文案
 * @param cancelText 取消按钮文案
 * @param saveText 保存按钮文案
 */

import React from "react";
import "./index.scss";
import {Button} from "antd";

interface SaveButtonBarProps {
  handleCancel?:() => void;
  handleSave?:() => void;
  isShow?: boolean;
  loading?: boolean;
  titleShow?: boolean;
  cancelTextShow?: boolean;
  saveTextShow?: boolean;
  title?: String;
  cancelText?: String;
  saveText?: String;
}
export const SaveButtonBar: React.FC<SaveButtonBarProps> = props => {
  const {
      handleCancel,
      handleSave,
      isShow = true,
      loading = false,
      titleShow = true,
      cancelTextShow = true,
      saveTextShow = true,
      title = '未保存的更改',
      cancelText = '取消',
      saveText = '保存',
  } = props;
  return (
        <>
            {
                isShow&&(
                    <div className="save-buttonBar">
                        <div className="save-buttonBar-container">
                            <div className="save-buttonBar-container-title" style={{'visibility':titleShow?'unset':'hidden'}}>
                                {title}
                            </div>
                            <div className="save-buttonBar-button">
                                <Button
                                    style={{'visibility':cancelTextShow?'unset':'hidden'}}
                                    className="save-buttonBar-button-item save-buttonBar-button-item-cancel"
                                    onClick={handleCancel}
                                >
                                    {cancelText}
                                </Button>
                                <Button
                                    style={{'visibility':saveTextShow?'unset':'hidden'}}
                                    loading={loading}
                                    className="save-buttonBar-button-item"
                                    type="primary"
                                    onClick={handleSave}
                                >
                                    {saveText}
                                </Button>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
  );
};

export default SaveButtonBar;
