import React, { useContext, useEffect, useRef,useState } from "react";

export interface FitMainProps { }

import { FitShopStoreContext } from '../../reducer'


const FitMain: React.FC<FitMainProps> = props => {
  const { previewId } = props;
  const [state, dispatch] = useContext(FitShopStoreContext)
  const [iframeSize, setIframeSize] = useState({
    width: '100%',
    height: '100%',
  })
  const iframeContainerRef = useRef(null);

  const handleIframeLoad = () => {
    if (iframeContainerRef.current) {
      setPreviewSize()
    }
  }

  const previewThemeFlag = previewId ? ('&theme=' + previewId) : ''
  let previewLink = `${ window.location.origin }?preview=true${ previewThemeFlag }`;
  if (window.location.origin.indexOf("localhost") > -1) {
    previewLink = `http://localhost:3000?preview=true${ previewThemeFlag }`;
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
  }

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
          pointerEvents: previewId !== undefined ? 'none' : 'auto',
        }}
        src={previewLink}
        sandbox="allow-same-origin allow-forms allow-popups allow-scripts allow-modals"
        frameBorder="0"
        onLoad={handleIframeLoad}
      />
    </div>
  );
};
FitMain.displayName = "FitMain";
export default FitMain;
