import React, { useState, useEffect } from "react";
import "./index.scss";
import iconSingleImage from "@assets/images/config-items/add-section/icon-single-image.png";
import iconTwoImage from "@assets/images/config-items/add-section/icon-two-images.png";
import iconMulityImages3 from "@assets/images/config-items/add-section/icon-muliti-images-3.png";
import iconMulityImages4 from "@assets/images/config-items/add-section/icon-muliti-images-4.png";
import iconMulityImages5 from "@assets/images/config-items/add-section/icon-muliti-images-5.png";
import iconCollectionList from "@assets/images/config-items/add-section/icon-collection-list.png";
import iconCollectionDetail1 from "@assets/images/config-items/add-section/icon-collection-detail-1.png";
import iconCollectionDetail2 from "@assets/images/config-items/add-section/icon-collection-detail-2.png";
import iconBlog from "@assets/images/config-items/add-section/icon-blog.png";
import iconProductList from "@assets/images/config-items/add-section/icon-product-list.png";
import iconBrandInfo from "@assets/images/config-items/add-section/icon-brand-info.png";
import iconConsumerFeed from "@assets/images/config-items/add-section/icon-consumer-feed.png";
import iconRecommended from "@assets/images/config-items/add-section/icon-recommended.png";
import iconLogoAndText from "@assets/images/config-items/add-section/icon-logo_and_text.png";
import iconSubscribeEmail from "@assets/images/config-items/add-section/icon-subscribe-email.png";
import iconSingleProduct from "@assets/images/config-items/add-section/icon-single-product.png";
import iconCaroucelImages from "@assets/images/config-items/add-section/icon-single-product.png";
import iconRichText from "@assets/images/config-items/add-section/icon-richtext.png";

interface AddSectionsProps {
  handleItemClick: (section: object) => void
}

const materials = [
  {
    label: "富文本",
    icon: iconRichText,
    name: "RichText",
    type: "rich_text"
  },
  {
    label: "单图片",
    icon: iconSingleImage,
    name: "SingleImage",
    type: "overlay_image"
  },
  {
    label: "多图2",
    icon: iconTwoImage,
    name: "TwoImages",
    type: "two_images"
  },
  {
    label: "多图3",
    icon: iconMulityImages3,
    name: "ThreeImages",
    type: "three_images"
  },
  {
    label: "多图4",
    icon: iconMulityImages4,
    name: "FourImages",
    type: "four_images"
  },
  {
    label: "多图5",
    icon: iconMulityImages5,
    name: "FiveImages",
    type: "five_images"
  },
  {
    label: "品牌信息",
    icon: iconBrandInfo,
    name: "BrandInfo",
    type: "brand_info"
  },
  {
    label: "用户感言",
    icon: iconConsumerFeed,
    name: "ConsumerFeed",
    type: "consumer_feed"
  },
  {
    label: "特别推荐",
    icon: iconRecommended,
    name: "Recommended",
    type: "recommended"
  },
  {
    label: "图标文字",
    icon: iconLogoAndText,
    name: "logo_and_text",
    type: "logo_and_text"
  },
  {
    label: "邮件订阅",
    icon: iconSubscribeEmail,
    name: "subscribe_email",
    type: "subscribe_email"
  },
  {
    label: "轮播图",
    icon: iconCaroucelImages,
    name: "carousel_images",
    type: "carousel_images"
  }
];

const activties = [
  {
    label: "系列列表", // 也叫  专辑or类别 列表
    icon: iconCollectionList,
    name: 'CollectionList',
    type: "collection_list"
  },
  {
    label: "产品列表",
    icon: iconProductList,
    name: 'ProductList',
    type: "product_list"
  },
  {
    label: "特色产品",// 之前叫 单个商品
    icon: iconSingleProduct,
    name: 'SingleProduct',
    type: "single_product"
  },
  {
    label: "系列详情1",
    icon: iconCollectionList,
    name: 'collection_detail_list_cover',
    type: "collection_detail_list_cover"
  },
  {
    label: "系列详情2",
    icon: iconCollectionList,
    name: 'collection_detail_list',
    type: "collection_detail_list"
  },
  {
    label: "博客专辑",
    icon: iconBlog,
    name: 'blog_list',
    type: "blog_list"
  },
]

const AddSections: React.FC<AddSectionsProps> = props => {
  return (
    <div className="add-section-wrapper">
      <div className="box-wrapper">
        <div className="box-title">素材</div>
        <div className="box-list">
          {
            materials.map(m => {
              return (
                <div className="asw-box" key={m.name} onClick={() => props.handleItemClick(m)}>
                  <div className="img"><img src={m.icon} alt={m.name} /></div>
                  <div className="l">{m.label}</div>
                </div>
              );
            })
          }
        </div>
      </div>
      <div className="line-1 mt-10"></div>
      <div className="box-wrapper">
        <div className="box-title">营销</div>
        <div className="box-list">
          {
            activties.map(m => {
              return (
                <div className="asw-box" key={m.name} onClick={() => props.handleItemClick(m)}>
                  <div className="img"><img src={m.icon} alt={m.name} /></div>
                  <div className="l">{m.label}</div>
                </div>
              );
            })
          }
        </div>

      </div>

    </div>
  );

};

export default AddSections;
