import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Switch from "@material-ui/core/Switch";
import InputBase from "@material-ui/core/InputBase";
import layout_1JPG from "@assets/images/config-items/product-layout1.png";
import layout_2JPG from "@assets/images/config-items/product-layout2.png";
import layout_3JPG from "@assets/images/config-items/product-layout3.png";
import { shopSettingCheckout } from "@src/api/settlement";

const BootstrapInput = withStyles(theme => ({
  root: {
    width: "100%"
  },
  input: {
    borderRadius: 4,
    position: "relative",
    border: "1px solid #ced4da", 
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
    }
  }
}),{ name: "ShowMode" })(InputBase);

const layoutPlaceholder = [
  {
    imgUrl: layout_1JPG,
    label: "1"
  },
  {
    imgUrl: layout_2JPG,
    label: "2"
  },
  {
    imgUrl: layout_3JPG,
    label: "3"
  }
];

interface ShowModeProps {
  data?: {
    layout_type?: string;
    thumbLayout?: string;
    shakeShopBtn?: boolean;
    leftFixed?: boolean;
    rightFixed?: boolean;
    leftFixedNav?: boolean;
    productAttrType?: string;
    buttonColorBlock?: boolean;
    noVariantImageFirst?: boolean;
    detailsType?:string;
    detailsPosition?:string;
  };
  onChange: any;
}

const ShowMode: React.FC<ShowModeProps> = ({
  data: {
    layout_type='1',
    thumbLayout='1',
    shakeShopBtn,
    leftFixed,
    rightFixed,
    leftFixedNav,
    productAttrType,
    buttonColorBlock,
    noVariantImageFirst,
    detailsType = '1',
    detailsPosition = '1',
  },
  onChange
}) => {
  const [isShowLayout, setIsShowLayout] = React.useState(true)

  React.useEffect(() => {
    console.log('shopSettingCheckout', shopSettingCheckout)
    shopSettingCheckout().then(({ data: { shopSettingCheckout: _shopSettingCheckout } }) => {
      if (_shopSettingCheckout.checkoutPageType == 1) {
        setIsShowLayout(false)
      }
    });
  }, [])

  return (
    <div className="module-detail pt-20 border-bottom-1px">
      <div className="t16 pl-16 pb-16">展示方式</div>
      {isShowLayout && <div className="module__item">
        <div className="image-layout-types">
          {layoutPlaceholder.map((lp: any) => (
              <div
                key={lp.label}
                style={{
                  marginBottom:'6px'
                }}
                className={`type t2_1 ${(layout_type==undefined?'1':layout_type) == lp.label && "selected"}`}
                onClick={() => onChange("layout_type", lp.label)}
              >
                <img src={lp.imgUrl} alt="" />
              </div>
            ))}
        </div>
      </div>}
      {layout_type === "1" && (
        <div className="module__item">
          <div className="t14 mb-8">缩略图布局</div>
          <div>
            <Select
              value={thumbLayout }
              input={<BootstrapInput />}
              onChange={e => {
                onChange("thumbLayout", e.target.value);
              }}
            >
              <MenuItem value="1">居左</MenuItem>
              <MenuItem value="2">居下</MenuItem>
            </Select>
          </div>
        </div>
      )}
      <div className="module__item">
        <div className="t14 mb-8">产品属性展示方式</div>
        <div>
          <Select
            value={productAttrType || "button"}
            input={<BootstrapInput />}
            onChange={e => {
              onChange("productAttrType", e.target.value);
            }}
          >
            <MenuItem value="button">按钮</MenuItem>
            <MenuItem value="dropDown">选择框</MenuItem>
          </Select>
        </div>
      </div>
      {/* {productAttrType !== "dropDown" && (
        <div className="module__item">
          <div className="t14 mb-8 title-only-one-row">
            属性展示色块
            <Switch
              checked={buttonColorBlock || false}
              color="primary"
              name="buttonColorBlock"
              inputProps={{ "aria-label": "primary checkbox" }}
              onChange={e => {
                onChange("buttonColorBlock", e.target.checked);
              }}
            />
          </div>
        </div>
      )} */}
      {layout_type === "1"&&
      <div className="module__item">
        <div className="t14 mb-8 title-only-one-row">
          左侧固定
          <Switch
            checked={leftFixed || false}
            color="primary"
            name="leftFixed"
            inputProps={{ "aria-label": "primary checkbox" }}
            onChange={e => {
              onChange("leftFixed", e.target.checked);
            }}
          />
        </div>
      </div>}
      {layout_type === "2"&&
      <div className="module__item">
        <div className="t14 mb-8 title-only-one-row">
          右侧固定
          <Switch
            checked={rightFixed || false}
            color="primary"
            name="rightFixed"
            inputProps={{ "aria-label": "primary checkbox" }}
            onChange={e => {
              onChange("rightFixed", e.target.checked);
            }}
          />
        </div>
      </div>}
      {layout_type === "2"&&
      <div className="module__item">
        <div className="t14 mb-8 title-only-one-row">
          开启左侧缩略图布局
          <Switch
            checked={leftFixedNav || false}
            color="primary"
            name="leftFixedNav"
            inputProps={{ "aria-label": "primary checkbox" }}
            onChange={e => {
              onChange("leftFixedNav", e.target.checked);
            }}
          />
        </div>
      </div>}
      <div className="module__item">
        <div className="t14 mb-8">内容展示模式</div>
        <div>
          <Select
            value={detailsType}
            input={<BootstrapInput />}
            onChange={e => {
              onChange("detailsType", e.target.value);
            }}
          >
            <MenuItem value="1">标签</MenuItem>
            <MenuItem value="2">收缩框</MenuItem>
          </Select>
        </div>
      </div>
      {layout_type !== "3"&&
      <div className="module__item">
        <div className="t14 mb-8">内容展示位置</div>
        <div>
          <Select
            value={detailsPosition}
            input={<BootstrapInput />}
            onChange={e => {
              onChange("detailsPosition", e.target.value);
            }}
          >
            <MenuItem value="1">右侧</MenuItem>
            <MenuItem value="2">下侧</MenuItem>
          </Select>
        </div>
      </div>
      }
      <div className="module__item">
        <div className="t14 mb-8 title-only-one-row">
          抖动购物按钮
          <Switch
            checked={shakeShopBtn || false}
            color="primary"
            name="shakeShopBtn"
            inputProps={{ "aria-label": "primary checkbox" }}
            onChange={e => {
              onChange("shakeShopBtn", e.target.checked);
            }}
          />
        </div>
      </div>

      <div className="module__item">
        <div className="t14 mb-8 title-only-one-row">
          首图不展示变体图
          <Switch
            checked={noVariantImageFirst || false}
            color="primary"
            name="noVariantImageFirst"
            inputProps={{ "aria-label": "primary checkbox" }}
            onChange={e => {
              onChange("noVariantImageFirst", e.target.checked);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ShowMode;
