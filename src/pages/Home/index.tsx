import React from "react"
import { post, get, uploadFile } from "@src/api/request"
import { HDButton } from "hundun-ui-library-react"
import bgImage from "@src/assets/images/bk.png"
function Home() {
  return (
    <div>
      <h2>主页1</h2>
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
      <HDButton text="深化开始的"></HDButton>
      <img src={bgImage} alt="bgImage" />
    </div>
  )
}
export default Home
