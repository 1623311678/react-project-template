import React from "react"
import { post, get, uploadFile } from "@src/api/request"
function Home() {
  return (
    <div>
      <h2>主页</h2>
      <input
        type="file"
        onChange={e => {
          const form = document.getElementById("file-test")
          console.log("e", form["files"][0])
          uploadFile("/upload", form["files"][0])
        }}
        id="file-test"></input>
      <form
        action="/api/upload"
        method="post"
        name="fData"
        encType="multipart/form-data"
        target="stop">
        <input type="file" name="file" />
        <input
          id="submit_form"
          type="submit"
          className="btn btn-success save"
          value="保存"
        />
      </form>
      <iframe name="stop" style={{ display: "none" }}></iframe>{" "}
    </div>
  )
}
export default Home
