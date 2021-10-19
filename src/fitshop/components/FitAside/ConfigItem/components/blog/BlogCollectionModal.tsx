import React, { memo, useEffect, useState } from 'react'
import { Drawer, Table, Button, Input, Modal } from 'antd';
import { getBlogAlbums } from "@src/api/blog";
import { getTimeStringInSiteTimeZone } from "@src/utils/timezone";
import Pagination from "./Pagination/Pagination"
import { PlusOutlined } from '@ant-design/icons';
import b_del from "@assets/images/b_del.svg"
import b_swi from "@assets/images/b_swi.svg"
import "./blogCollectionModal.scss"

const columns = [
  {
    title: '专辑名称',
    dataIndex: 'title',
    key: 'title',
    render: field => <div style={{ width: "200px" }}>{field}</div>
  },
  {
    title: '最后一次修改时间',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    render: field => <span>{getTimeStringInSiteTimeZone(field)}</span>
  }
]

const PAGE_SIZE = 10

const pagrinfo = {
  "first": PAGE_SIZE,
  "last": PAGE_SIZE,
  "before":"",
  "after":"",
  "title":"",
}


const BlogCollectionModal = ({
  handleSelectAlbum,
  handleDelAlbum,
  selectedRows
}) => {
  const [show, setShow] = useState(true)
  const [albumDrawerVisible, setAlbumDrawerVisible] = useState(false)
  const [dataSource, setDataSource] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [selecteds, setSelecteds] = useState([])
  const [loading, setLoading] = useState(false)
  const [variables, setVariables] = useState(pagrinfo)
  const [pageCursor, setPageCursor] = useState({
    hasPreviousPage: false,
    hasNextPage: true,
    beforeCursor: "",
    afterCursor: ""
  });

  useEffect(() => {
    handleGetBlogAlbums(variables)
  }, [])

  // 默认选择的keys
  useEffect(() => {
    setSelectedRowKeys([selectedRows.id])
    setSelecteds([selectedRows])
    if (selectedRows.id) {
      setShow(false)
    } else {
      setShow(true)
    }
  }, [selectedRows])

  const handleGetBlogAlbums = async (variables) => {
    setLoading(true)
    const blogs = await getBlogAlbums(variables)
    const nodes = blogs.data.albums.edges
    const _dataSource = nodes.map(_ => _.node)
    setDataSource(_dataSource)
    if (nodes.length) {
      setPageCursor({
        hasPreviousPage: blogs.data.albums.pageInfo.hasPreviousPage,
        hasNextPage: blogs.data.albums.pageInfo.hasNextPage,
        beforeCursor: nodes[0].cursor,
        afterCursor: nodes[nodes.length - 1].cursor
      });
    }
    setLoading(false)
  }

  const handleChange = (selectedRowKeys, selectedRows) => {
    setSelectedRowKeys(selectedRowKeys)
    setSelecteds(selectedRows)
  }

  const rowSelection = {
    type: 'radio',
    selectedRowKeys,
    onChange: handleChange,
  };

  const handleClickBeforePage = () => {
    handleGetBlogAlbums({
      ...variables,
      first: null,
      last: PAGE_SIZE,
      before: pageCursor.beforeCursor
    });
  };

  const handleClickAfterPage = () => {
    handleGetBlogAlbums({
      ...variables,
      first: PAGE_SIZE,
      last: null,
      after: pageCursor.afterCursor
    });
  };

  const onOk = () => {
    handleSelectAlbum(selecteds[0])
    setAlbumDrawerVisible(false)
  }

  return (
    <>
      {
        show ? (
          <Button 
            style={{ 
              width: "100%", 
              backgroundColor: "#068468" 
            }} 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={() => setAlbumDrawerVisible(true)}
          >
            添加博客专辑
          </Button>
        ) : (
          <div style={{
            "display": "flex",
            "height": "36px",
            "lineHeight": "36px",
            "backgroundColor": "#eef0f2",
            "padding": "0 10px",
            "marginBottom": "20px",
            "justifyContent": "space-between",
            "WebkitAlignItems": "center"
          }}>
            <div className="blog-collection-desigen-title">
              {selecteds[0].title}
            </div>
            <span style={{ "display": "flex", alignItems: "center" }}>
              <div onClick={() => setAlbumDrawerVisible(true)}><img style={{ width: "18px", marginRight: "10px" }} src={b_swi} /></div>
              <div onClick={handleDelAlbum}><img style={{ width: "13px" }} src={b_del} /></div>
            </span>
          </div>
        )
      }
      <Modal
        className="blog-collection-modal"
        title="专辑选择"
        onCancel={() => setAlbumDrawerVisible(false)}
        visible={albumDrawerVisible}
        bodyStyle={{ paddingBottom: 80 }}
        maskClosable={false}
        footer={
          <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span>
              已选择{selectedRowKeys.length}个专辑
            </span>
            <span
              style={{
                textAlign: 'right',
              }}
            >
              <Button onClick={() => setAlbumDrawerVisible(false)} style={{ marginRight: 8 }}>
                取消
              </Button>
              <Button onClick={onOk} type="primary">
                保存
              </Button>
            </span>
          </span>
        }
      >
        <div className="blog-seo-drawer">
          <Table 
            rowKey={record => record.id}
            loading={loading}
            rowSelection={rowSelection}
            columns={columns} 
            dataSource={dataSource} 
            pagination={false}
          />
        </div>
        <Pagination
          hasPreviousPage={pageCursor.hasPreviousPage}
          hasNextPage={pageCursor.hasNextPage}
          beforeCallback={handleClickBeforePage}
          afterCallback={handleClickAfterPage}
        />
      </Modal>
    </>
  )
}

export default memo(BlogCollectionModal)



