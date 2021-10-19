import React  from "react";
import Normal from "./pages/normal"
import FontsAndColors from "./pages/FontsAndColors"
import CartConfig from "./pages/CartConfig"
import Commodity from "./pages/commodity"
import SocialMedia from "./pages/SocialMedia"
import '@src/common/styles/GlobalFont/index.scss';
import { findIndex } from 'lodash';
import Blog from './pages/Blog';
interface overallConfigProps {
  pages: string,
  globalConfig: {
    normal?: {}
    fonts_and_colors?: {}
    commodity?: {}
    social_media?: {}
    CartConfig?: {}
  },
  settings?:object
  onChange?:any
}
const overallConfig: React.FC<overallConfigProps> = ({ pages, globalConfig, onChange }) => {
  const targetIndex = findIndex(globalConfig, item => item.name === pages);
  const target = targetIndex > -1 ? globalConfig[targetIndex] : {};
  const props = { section: target.data, onChange };

  switch (pages) {
    case "normal":
      return <Normal { ...props } />
    case "fonts_and_colors":
      return <FontsAndColors { ...props } />
    case "cartConfig":
      return <CartConfig { ...props } />
    case "commodity":
      return <Commodity { ...props } />
    case "blog":
      return <Blog { ...props } />
    case "social_media":
      return <SocialMedia { ...props } />
    default:
      return (<> no data </>);
  }
};

export default overallConfig;
