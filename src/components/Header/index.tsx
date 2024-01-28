import React from "react"
import { Dropdown, Card, Button } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { removeUserInfo } from "@src/store/userInfoSlice"

const Header = () => {
  const dispatch = useDispatch()
  const name = useSelector((state: any) => {
    return state.userInfo.userName
  })
  return (
    <div
      style={{
        height: 80,
        background: "black",
        display: "flex",
        alignItems: "center"
      }}>
      <div
        className="title"
        style={{
          color: "white",
          width: "200px",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "25px"
        }}>
        混沌工程化
      </div>
      <Dropdown
        overlay={
          <Card title="退出登录">
            <Button
              onClick={() => {
                dispatch(removeUserInfo())
              }}>
              退出
            </Button>
          </Card>
        }>
        <div
          className="avtar"
          style={{
            width: "50px",
            height: "50px",
            minWidth: "50px",
            minHeight: "50px",
            background: "green",
            marginLeft: "80%",
            borderRadius: "25px",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            fontWeight: "bold",
            overflow: "hidden"
          }}>
          {name}
        </div>
      </Dropdown>
    </div>
  )
}
export default Header
