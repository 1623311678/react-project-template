import React, { useContext,useEffect, useRef, useState } from "react";

import { FitShopStoreContext } from '../../reducer'

export interface FitMainContentProps {
  path: string;
  data?: any;
  onLoad?:any;
}


const postMessageToIframe = ary => {
  window.frames[0].postMessage(
    {
      key: "preview-template",
      data: ary
    },
    "*"
  );
};

const FitMainContent: React.FC<FitMainContentProps> = ({ path, data, onLoad}) => {
  // 一开始先显示release的数据
  let previewLink = `${window.location.origin}/${path}`;
  if (window.location.origin.indexOf("localhost") > -1) {
    previewLink = `http://localhost:3000/${path}`;
  }
  const hasThemeParam = path.indexOf('theme=') > -1;
  const [state, dispatch] = useContext(FitShopStoreContext)
  const [ onLoadType , setOnLoadType ] = useState(false);
  const [iframeSize, setIframeSize] = useState({
      width: '100%',
      height: '100%',
  })
  const iframeContainerRef = useRef(null);
  


  const handleIframeLoad = () => {
    if (iframeContainerRef.current) {
      setPreviewSize()
    }
    setOnLoadType(true)
  }

  function setPreviewSize() {
    const isMobileMode = false
    const resizeData = {
      isMobileMode,
      containerWidth: null,
      containerHeight: null
    }
    if (state.previewMode == 'mobile') {
      resizeData.isMobileMode = true
      setIframeSize({
        width: '375px',
        height: '100%'
      })
    } else {
      const w = iframeContainerRef.current.offsetWidth - 10;
      const h = iframeContainerRef.current.offsetHeight - 20;
      resizeData.containerWidth = w
      resizeData.containerHeight = h
      setIframeSize({
        width: '100%',
        height: '100%'
      })
    }

    window.frames[0].postMessage({
      key: 'adjust-size',
      data: resizeData,
    }, '*')


    window.frames[0].postMessage({ key: "preview-data", data }, "*");
  }
  useEffect(() => {
    setOnLoadType(false)
  }, []);
  useEffect(()=>{
    let data = null;
    let attrFilter = state.collectionDetailFilterMap
    if(!(attrFilter&&onLoadType)) return
    for (const iterator of state.decorateData) {
      iterator.name&&iterator.name=='collection_detail';
      data = JSON.parse(JSON.stringify(iterator.data))
    }
    if(data&&data.filters){
      for (const iterator of Object.keys(data.filters)) {
        if (!(attrFilter[iterator])) {
          delete data.filters[iterator]
        }
      }
    }
    if(data){
      postMessageToIframe(data)
    }
  },[state.collectionDetailFilterMap,onLoadType])
  useEffect(() => {
    setPreviewSize()
  }, [state.previewMode])

  return (
    <div className="fit-main fit-preview-container" ref={iframeContainerRef}>
      <iframe
        id="fpp-iframe"
        style={{
          width: iframeSize.width,
          height: iframeSize.height,
          pointerEvents: hasThemeParam ? 'none' : 'auto',
        }}
        src={previewLink}
        frameBorder="0"
        onLoad={handleIframeLoad}
      ></iframe>
    </div>
  );
};
FitMainContent.displayName = "FitMainContent";
export default FitMainContent;
