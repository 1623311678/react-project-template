import React from "react";
import "./ci.scss";

import BrandInfo from "./BrandInfo";
import ConsumerFeed from "./ConsumerFeed";
import SingleImage from "./SingleImage";
import Recommended from "./Recommended";
import LogoAndText from "./LogoAndText";
import TwoImages from "./TwoImages";
import MulitiImages from "./MulitiImages";
import InsPlus from "./InsPlus";
import CollectionList from "./CollectionList";
import CollectionDetailList from "./CollectionDetailList";
import CollectionDetailListCover from "./CollectionDetailListCover";
import ProductList from "./ProductList";
import SingleProduct from "./SingleProduct";
import SubscribeEmail from "./SubscribeEmail";
import CarouselImages from "./CarouselImages";
import BlogList from "./BlogList";
import ConfigRender from "./ConfigRender";
import Header from "./Header";
import Footer from "./Footer";
import { useParams } from "react-router-dom";

interface ConfigItemProps {
  section: object;
  sectionStamp: string | number;
}

const ConfigItem: React.FC<ConfigItemProps> = props => {
  const { section, sectionStamp, onChange } = props;
  const key = `${section.type}-${sectionStamp}`;

  console.log(section, sectionStamp, 111111);
  const { id } = useParams();

  if (!section) return <> </>;

  switch (section.type) {
    case "brand_info":
      return (
        <BrandInfo
          key={key}
          sectionStamp={sectionStamp}
          section={section}
          onChange={onChange}
        />
      );
    case "consumer_feed":
      return (
        <ConsumerFeed
          key={key}
          sectionStamp={sectionStamp}
          section={section}
          onChange={onChange}
        />
      );
    case "instagram_plus":
      return (
        <InsPlus
          key={key}
          sectionStamp={sectionStamp}
          section={section}
          onChange={onChange}
        />
      );
    case "overlay_image": // 也叫single_image
      return (
        <SingleImage
          key={key}
          sectionStamp={sectionStamp}
          section={section}
          onChange={onChange}
        />
      );
    case "recommended":
      return (
        <Recommended
          key={key}
          sectionStamp={sectionStamp}
          section={section}
          onChange={onChange}
        />
      );
    case "logo_and_text":
      return (
        <LogoAndText
          key={key}
          sectionStamp={sectionStamp}
          section={section}
          onChange={onChange}
        />
      );
    case "subscribe_email":
      return (
        <SubscribeEmail
          key={key}
          sectionStamp={sectionStamp}
          section={section}
          onChange={onChange}
        />
      );
    case "two_images":
      return (
        <TwoImages
          key={key}
          sectionStamp={sectionStamp}
          section={section}
          onChange={onChange}
        />
      );
    case "three_images":
    case "four_images":
    case "five_images":
      return (
        <MulitiImages
          key={key}
          sectionStamp={sectionStamp}
          section={section}
          onChange={onChange}
        />
      );
    case "collection_list":
      return (
        <CollectionList
          key={key}
          sectionStamp={sectionStamp}
          section={section}
          onChange={onChange}
        />
      );
    case "product_list":
      return (
        <ProductList
          key={key}
          sectionStamp={sectionStamp}
          section={section}
          onChange={onChange}
        />
      );
    case "single_product":
      return (
        <SingleProduct
          key={key}
          sectionStamp={sectionStamp}
          section={section}
          onChange={onChange}
        />
      );
    case "carousel_images":
      return (
        <CarouselImages
          key={key}
          sectionStamp={sectionStamp}
          section={section}
          onChange={onChange}
        />
      );
    case "collection_detail_list":
      return (
        <CollectionDetailList
          key={key}
          sectionStamp={sectionStamp}
          section={section}
          onChange={onChange}
        />
      );
    case "collection_detail_list_cover":
      return (
        <CollectionDetailListCover
          key={key}
          sectionStamp={sectionStamp}
          section={section}
          onChange={onChange}
        />
      );
    case "blog_list":
      return (
        <BlogList
          key={key}
          sectionStamp={sectionStamp}
          section={section}
          onChange={onChange}
        />
      );
    case "header":
      return (
        <Header
          sectionStamp={sectionStamp}
          section={section}
          onChange={onChange}
        />
      );
    case "footer":
      return (
        <Footer
          sectionStamp={sectionStamp}
          section={section}
          onChange={onChange}
        />
      );
    case "rich_text":
      return (
        <ConfigRender
          key={key}
          sectionStamp={sectionStamp}
          section={section}
          onChange={onChange}
        />
      );
    default:
      return <> no data </>;
  }
};

export default ConfigItem;
