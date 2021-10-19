
/**
 * @description FPP 订单工具方法
 */

// 货币符号
export const CURRENCY = {
  "AED": "د.إ",
  "AFN": "؋",
  "ALL": "L",
  "AMD": "AMD",
  "ANG": "ƒ",
  "AOA": "Kz",
  "ARS": "$",
  "AUD": "$",
  "AWG": "Afl.",
  "AZN": "AZN",
  "BAM": "KM",
  "BBD": "$",
  "BDT": "৳",
  "BGN": "лв.",
  "BHD": ".د.ب",
  "BIF": "Fr",
  "BMD": "$",
  "BND": "$",
  "BOB": "Bs.",
  "BRL": "R$",
  "BSD": "$",
  "BTC": "฿",
  "BTN": "Nu.",
  "BWP": "P",
  "BYR": "Br",
  "BYN": "Br",
  "BZD": "$",
  "CAD": "$",
  "CDF": "Fr",
  "CHF": "CHF",
  "CLP": "CLP$",
  "CNY": "¥",
  "COP": "$",
  "CRC": "₡",
  "CUC": "$",
  "CUP": "$",
  "CVE": "$",
  "CZK": "Kč",
  "DJF": "Fr",
  "DKK": "DKK",
  "DOP": "RD$",
  "DZD": "د.ج",
  "EGP": "EGP",
  "ERN": "Nfk",
  "ETB": "Br",
  "EUR": "€",
  "FJD": "$",
  "FKP": "£",
  "GBP": "£",
  "GEL": "₾",
  "GGP": "£",
  "GHS": "₵",
  "GIP": "£",
  "GMD": "D",
  "GNF": "Fr",
  "GTQ": "Q",
  "GYD": "$",
  "HKD": "$",
  "HNL": "L",
  "HRK": "kn",
  "HTG": "G",
  "HUF": "Ft",
  "IDR": "Rp",
  "ILS": "₪",
  "IMP": "£",
  "INR": "₹",
  "IQD": "ع.د",
  "IRR": "﷼",
  "IRT": "تومان",
  "ISK": "kr.",
  "JEP": "£",
  "JMD": "$",
  "JOD": "د.ا",
  "JPY": "¥",
  "KES": "KSh",
  "KGS": "сом",
  "KHR": "៛",
  "KMF": "Fr",
  "KPW": "₩",
  "KRW": "₩",
  "KWD": "د.ك",
  "KYD": "$",
  "KZT": "KZT",
  "LAK": "₭",
  "LBP": "ل.ل",
  "LKR": "රු",
  "LRD": "$",
  "LSL": "L",
  "LYD": "ل.د",
  "MAD": "د.م.",
  "MDL": "MDL",
  "MGA": "Ar",
  "MKD": "ден",
  "MMK": "Ks",
  "MNT": "₮",
  "MOP": "P",
  "MRU": "UM",
  "MUR": "₨",
  "MVR": ".ރ",
  "MWK": "MK",
  "MXN": "$",
  "MYR": "RM",
  "MZN": "MT",
  "NAD": "$",
  "NGN": "₦",
  "NIO": "C$",
  "NOK": "kr",
  "NPR": "₨",
  "NZD": "$",
  "OMR": "ر.ع.",
  "PAB": "B/.",
  "PEN": "S/",
  "PGK": "K",
  "PHP": "₱",
  "PKR": "₨",
  "PLN": "zł",
  "PRB": "р.",
  "PYG": "₲",
  "QAR": "ر.ق",
  "RMB": "¥",
  "RON": "lei",
  "RSD": "дин.",
  "RUB": "₽",
  "RWF": "Fr",
  "SAR": "ر.س",
  "SBD": "$",
  "SCR": "₨",
  "SDG": "ج.س.",
  "SEK": "kr",
  "SGD": "$",
  "SHP": "£",
  "SLL": "Le",
  "SOS": "Sh",
  "SRD": "$",
  "SSP": "£",
  "STN": "Db",
  "SYP": "ل.س",
  "SZL": "L",
  "THB": "฿",
  "TJS": "ЅМ",
  "TMT": "m",
  "TND": "د.ت",
  "TOP": "T$",
  "TRY": "₺",
  "TTD": "$",
  "TWD": "NT$",
  "TZS": "Sh",
  "UAH": "₴",
  "UGX": "UGX",
  "USD": "$",
  "UYU": "$",
  "UZS": "UZS",
  "VEF": "Bs F",
  "VES": "Bs.S",
  "VND": "₫",
  "VUV": "Vt",
  "WST": "T",
  "XAF": "CFA",
  "XCD": "$",
  "XOF": "CFA",
  "XPF": "Fr",
  "YER": "﷼",
  "ZAR": "R",
  "ZMW": "ZK"
};

// 订单状态
export const ORDER_STATUS = {
  open: "未结",
  closed: "隐藏",
  cancelled: "已取消",
};
// 付款状态
export const PAYMENT_STATUS = {
  // authorized: "已授权",
  paid: "已付款",
  partially_paid: "部分付款",
  refunded: "已退款",
  partially_refunded: "已部分退款",
  pending: "支付确认中",
  unpaid: "待付款",
  voided: "已作废",
};
// 发货状态
export const SHIPPED_STATUS = {
  shipped: "已发货",
  unshipped: "未发货",
  partial: "部分已发货",
  // scheduled: "已安排",
  on_hold: "待处理",
};

// 付款状态tag color
export const PAYMENT_TAG_COLOR = {
  // authorized: "#FD8F57",
  paid: "#068468",
  partially_refunded: "#7483FB",
  partially_paid: "#FF9D19",
  pending: "#FD8F57",
  refunded: "#FF9D19",
  unpaid: "#FD8F57",
  voided: "#9A9A9A",
}
// 发货状态tag color
export const SHIPPED_TAG_COLOR = {
  shipped: "#068468",
  unshipped: "#E36060",
  partial: "#FF9D19",
  // scheduled: "#C8C0C0",
  on_hold: "#FF9D19",
}



import yifahuo from '@assets/orderStatus/yifahuo.svg'
import weifahuo from '@assets/orderStatus/weifahuo.svg'
import bufenfahuo from '@assets/orderStatus/bufenfahuo.svg'
import bufentuikuan from '@assets/orderStatus/bufentuikuan.svg'
import bufenfukuan from '@assets/orderStatus/bufenfukuan.svg'
import daichuli from '@assets/orderStatus/daichuli.svg'
import yituikuan from '@assets/orderStatus/yituikuan.svg'
import yizuofei from '@assets/orderStatus/yizuofei.svg'
export const SHIPPED_STATUS_GOODS = {
  null: {
    name: '未发货',
    color: '#E36060',
    icon: 'iconweifahuodaifukuan',
    svg: weifahuo
  },
  shipped: {
    name: '已发货',
    color: '#068468',
    icon: 'iconyifahuofukuanquxiao',
    svg: yifahuo
  },
  unshipped: {
    name: '未发货',
    color: '#E36060',
    icon: 'iconweifahuodaifukuan',
    svg: weifahuo
  },
  partial: {
    name: '部分已发货',
    color: '#FF9D19',
    icon: 'iconbufenfahuofukuantuikuan',
    svg: ''
  },
  paid: {
    name: '已付款',
    color: '#068468',
    icon: 'iconyifahuofukuanquxiao',
    svg: yifahuo
  },
  partially_refunded: {
    name: '已部分退款',
    color: '#7483FB',
    icon: 'iconbufenfahuofukuantuikuan',
    svg: bufentuikuan
  },
  partially_paid: {
    name: '部分付款',
    color: '#FF9D19',
    icon: 'iconbufenfahuofukuantuikuan',
    svg: bufenfukuan
  },
  pending: {
    name: '支付确认中',
    color: '#FF9D19',
    icon: 'iconweifahuodaifukuan',
    svg: daichuli
  },
  refunded: {
    name: '已退款',
    color: '#7483FB',
    icon: 'iconyifahuofukuanquxiao',
    svg: yituikuan
  },
  unpaid: {
    name: '待付款',
    color: '#FF9D19',
    icon: 'iconyifahuofukuanquxiao',
    svg: daichuli
  },
  voided: {
    name: '已作废',
    color: '#9A9A9A',
    icon: 'iconyifahuofukuanquxiao',
    svg: yizuofei
  },

  open: {

  },
  closed: {
    name: '已隐藏',
    color: '#9A9A9A',
    icon: 'iconyifahuofukuanquxiao',
    svg: yizuofei
  },
  archive: {
    name: '已存档',
    color: '#9A9A9A',
    icon: 'iconyifahuofukuanquxiao',
    svg: yizuofei
  },
  cancelled: {
    name: '已取消',
    color: '#9A9A9A',
    icon: 'iconyifahuofukuanquxiao',
    svg: ''
  },
}

/**
 * 保留2位小数，不足补0
 * @param val number | string
 * @returns  string (12.00)
 */
export const returnFloat2 = val => {
  let value: any = Math.round(parseFloat(val) * 100) / 100;
  const s = value.toString().split(".");
  if (s.length == 1) {
    value = value.toString() + ".00";
    return value;
  }
  if (s.length > 1) {
    if (s[1].length < 2) {
      value = value.toString() + "0";
    }
    return value;
  }
};
/**
 *  16进制 转 rgba
 * @param rColor 色值
 * @param num 透明度
 * @returns rgba(0,0,0,0)
 */
export const colorRgb = (rColor, num) => {
  if (!rColor) { return ""; }
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  let sColor = rColor.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      let sColorNew = "#";
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    // 处理六位的颜色值
    const sColorChange = [];
    for (var i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
    }
    return `RGB( ${sColorChange.join(",")},${num})`;
  } else {
    return sColor;
  }
}
/**
 *  16进制 转 rgba
 * @param arr 排序arr
 * @param name 根据name进行排序
 * @returns null
 */
export const letterSort = (arr: any[], name: string) => {
  const _arr = [...arr]
  _arr.sort((a: any, b: any) => {
    const value1 = typeof a === 'object' ? a[name] : a;
    const value2 = typeof b === 'object' ? b[name] : b;
    if (value1 < value2) {
      return -1;
    } else if (value1 < value2) {
      return 1;
    } else {
      return 0
    }
  })
  return _arr
}
/**
 * @description 复杂数组去重
 * @param key 根据key进行去重
 * @param arg 数组
 * @returns Array
 */
export function complexArrRepetition(key, ...arg) {
  if (!key || typeof key !== "string") { return new Error("请传入正确的key值"); }
  const arr = [...arg].flat(Infinity);
  const hash = {};
  return arr.reduce((next, item) => {
    hash[item[key]] ? "" : (hash[item[key]] = true && next.push(item));
    return next;
  }, []);
}
const _takeGoodAddress = [
  { 'name': 'China Post', 'url': 'http://www.track-chinapost.com' },
  { 'name': 'DHL eCommerce Asia', 'url': 'https://dhlecommerce.asia/Portal/Track?ref' },
  { 'name': 'WanbExpress', 'url': 'https://tracking.wanbexpress.com/?trackingNumbers' },
  { 'name': 'YunExpress', 'url': 'https://www.yuntrack.com/Track/Detail/sd' },
  { 'name': 'Anjun Logistics', 'url': 'http://www.szanjuntrack.com/szanjuntrack.asp' },
  { 'name': 'SFC Fulfillment', 'url': 'http://www.sfcservice.com/track?tracknumbers' },
  { 'name': 'FSC', 'url': 'https://tms.futuresupplychains.com/GUI/Tracking_New/Website/DocketTrack.aspx?st_Docnolist' },
  { 'name': 'Royal Mail', 'url': 'https://www3.royalmail.com/track-your-item#/ ' },
  { 'name': 'UPS', 'url': 'https://www.ups.com/WebTracking?loc=en_US&requester=ST' },
  { 'name': 'Canada Post', 'url': 'https://www.canadapost.ca/track-reperage/en#/search?searchFor=' },
  { 'name': 'China Post', 'url': 'http://www.track-chinapost.com/result_china.php?order_no=' },
  { 'name': 'FedEx', 'url': 'https://www.fedex.com/en-us/tracking.html' },
  { 'name': 'PostNord', 'url': 'http://www.postnord.dk/en/track-and-trace#dynamicloading=True&shipmentid=' },
  { 'name': 'USPS', 'url': 'https://tools.usps.com/go/TrackConfirmAction_input?qtc_tLabels1=' },
  { 'name': 'DHL Express', 'url': 'https://www.dhl.com/us-en/home/tracking.html' },
  { 'name': 'DHL eCommerce', 'url': 'http://webtrack.dhlglobalmail.com/?trackingnumber=' },
  { 'name': 'DHL eCommerce Asia', 'url': 'https://dhlecommerce.asia/Portal/Track?ref=' },
  { 'name': 'Eagle', 'url': 'https://etracking.eaglegl.com/' },
  { 'name': 'Purolator', 'url': 'https://www.purolator.com/en/shipping/tracker?pin=' },
  { 'name': 'Australia Post', 'url': 'https://auspost.com.au/mypost/track/#/search' },
  { 'name': 'New Zealand Post', 'url': 'http://www.nzpost.co.nz/tools/tracking' },
  { 'name': 'Correios', 'url': 'http://www.correios.com.br/rastreamento' },
  { 'name': 'La Poste', 'url': 'https://www.laposte.fr/outils/suivre-vos-envois?code=' },
  { 'name': 'TNT', 'url': 'https://www.tnt.com/express/en_us/site/tracking.html?searchType=con&cons=' },
  { 'name': 'Whistl', 'url': 'https://trackmyitem.whistl.co.uk/tracking/' },
  { 'name': '4PX', 'url': 'http://track.4px.com' },
  { 'name': 'APC', 'url': 'https://us.mytracking.net/APC/track/Track.aspx' },
  { 'name': 'FSC', 'url': 'https://tms.futuresupplychains.com/GUI/Tracking_New/Website/DocketTrack.aspx?st_Docnolist=' },
  { 'name': 'GLS', 'url': 'https://gls-group.eu/EU/en/parcel-tracking?match=' },
  { 'name': 'GLS (US)', 'url': 'https://www.gls-us.com/tracking' },
  { 'name': 'Globegistics', 'url': 'https://globetrak.globegisticsinc.com/' },
  { 'name': 'Amazon Logistics US', 'url': 'https://track.amazon.com/tracking/' },
  { 'name': 'Amazon Logistics UK', 'url': 'https://track.amazon.com/' },
  { 'name': 'Bluedart', 'url': 'https://www.bluedart.com/tracking' },
  { 'name': 'Delhivery', 'url': 'https://www.delhivery.com/track/package/' },
  { 'name': 'Japan Post (EN)', 'url': 'https://trackings.post.japanpost.jp/services/srv/search/direct?reqCodeNo1=&searchKind=S002&locale=en' },
  { 'name': 'Japan Post (JA)', 'url': 'https://trackings.post.japanpost.jp/services/srv/search/direct?reqCodeNo1=&searchKind=S002&locale=ja' },
  { 'name': 'Sagawa (EN)', 'url': 'https://k2k.sagawa-exp.co.jp/p/sagawa/web/okurijosearcheng.jsp' },
  { 'name': 'Sagawa (JA)', 'url': 'https://k2k.sagawa-exp.co.jp/p/web/okurijosearch.do?okurijoNo=' },
  { 'name': 'Singapore Post', 'url': 'https://www.singpost.com/track-items' },
  { 'name': 'Yamato (EN)', 'url': 'http://track.kuronekoyamato.co.jp/english/tracking' },
  { 'name': 'Yamato (JA)', 'url': 'http://track.kuronekoyamato.co.jp/english/tracking' },
  { 'name': 'DPD', 'url': 'https://www.dpd.com/tracking' },
  { 'name': 'DPD UK', 'url': 'https://www.dpd.co.uk/apps/tracking/' },
  { 'name': 'DPD Local', 'url': 'https://www.dpdlocal.co.uk/content/how-can-we-help/index.jsp' },
  { 'name': 'Newgistics', 'url': 'http://tracking.newgistics.com/' },
  { 'name': 'SF Express', 'url': 'http://www.sf-express.com/cn/en/dynamic_function/waybill/' },
  { 'name': 'PostNL', 'url': 'https://www.postnl.nl/' },
  { 'name': 'YunExpress', 'url': 'http://www.yuntrack.com/Track/Detail/' },
  { 'name': 'Chukou1', 'url': 'https://ec-firstclass.chukou1.com/?track_number=' },
  { 'name': 'Anjun Logistics', 'url': 'http://www.szanjuntrack.com/szanjuntrack.asp' },
  { 'name': 'SFC Fulfillment', 'url': 'http://www.sfcservice.com/track?tracknumbers=' },
  { 'name': 'Canpar', 'url': 'https://www.canpar.com/en/tracking/track.htm?barcode=' },
  { 'name': 'Sendle', 'url': 'https://track.sendle.com/tracking' },
  { 'name': 'Couriers Please', 'url': 'https://www.couriersplease.com.au/tools-track' },
  { 'name': 'Toll IPEC', 'url': 'https://www.mytoll.com/web/guest' },
  { 'name': 'StarTrack', 'url': 'https://startrack.com.au/track/search' },
  { 'name': '其他', 'url': 'else' }]
// 收获跟踪地址
export const takeGoodAddress = complexArrRepetition('name', letterSort(_takeGoodAddress, 'name'))

export const TimeLineListArr = [
  {
    type: "key_value_pair",
    content: [
      {
        name: "订单",
        name_type: "text", // [text / list_item]
        value: "123",
        value_type: "text", // [text / list_item]
        option: {
          button_test: true
        }
      },
      {
        name: "金额",
        name_type: "text", // [text / list_item]
        value: [
          {
            name: "1 x",
            option: {}
          },
          {
            name: "副本副本副本副本副本副本",
            option: {}
          },
          {
            name: "副本副本副本副本副本副本",
            option: {}
          }
        ],
        value_type: "list_item", // [text / list_item]
        option: {

        }
      }
    ]
  },
  {
    type: "titled_section",
    content: [
      {
        name: "Cod",
        name_type: "text", // [text / list_item]
        value: "123",
        value_type: "text", // [text / list_item]
        option: {
        }
      },
      {
        name: "呼呼呼",
        name_type: "text", // [text / list_item]
        value: [
          {
            name: "1 x",
            option: {}
          },
          {
            name: "副本副本副本副本副本副本",
            option: {}
          },
          {
            name: "副本副本副本副本副本副本",
            option: {}
          }
        ],
        value_type: "list_item", // [text / list_item]
        option: {
        }
      }
    ]
  }
];
// 订单列表发货状态筛选
export const tabOptions = [
  {
    label: "所有",
    value: 0
  },
  {
    label: "未发货",
    value: 1
  },
  {
    label: "待付款",
    value: 2
  },
  {
    label: "未结",
    value: 3
  },
  {
    label: "隐藏",
    value: 4
  }
];
// / 订单列表订单状态筛选
export const statusOptions = [
  {
    label: "未结",
    value: "open"
  },
  // {
  //   label: "隐藏",
  //   value: "closed"
  // },
  {
    label: "已取消",
    value: "cancelled"
  }
];
// / 订单列表支付状态筛选
export const paymentStatusOptions = [
  // {
  //   label: "已授权",
  //   value: "authorized"
  // },
  {
    label: "已付款",
    value: "paid"
  },
  {
    label: "已部分退款",
    value: "partially_refunded"
  },
  {
    label: "部分付款",
    value: "partially_paid"
  },
  {
    label: "支付确认中",
    value: "pending"
  },
  {
    label: "已退款",
    value: "refunded"
  },
  {
    label: "待付款",
    value: "unpaid"
  },
  {
    label: "已作废",
    value: "voided"
  }
];

// / 订单列表支付方式筛选
// var cod = "Cash on Delivery(COD)"
export const OF_PAYMENT_STATUS = {
  "paypal": "PayPal",
  "cod": "COD",
  "credit_card": "信用卡",
  "local_pay": "本地支付"
}
export const ofPaymentListOptions = [
  {
    label: "PayPal",
    value: "paypal"
  },
  {
    label: "Cash on Delivery(COD)",
    value: "cod"
  },
  {
    label: "信用卡",
    value: "credit_card"
  },
  {
    label: "本地支付",
    value: "local_pay"
  }
];
// 发货状态
export const deliveryStatusOptions = [
  {
    label: "已发货",
    value: "shipped"
  },
  {
    label: "未发货",
    value: "unshipped"
  },
  {
    label: "部分已发货",
    value: "partial"
  },
  // {
  //   label: "已安排",
  //   value: "scheduled"
  // },
  // {
  //   label: "待处理",
  //   value: "on_hold"
  // }
];
// 排序
export const sortOptions = [
  {
    label: "日期（最新到最旧）",
    value: "CREATED_AT;true"
  },
  {
    label: "日期（最旧到最新）",
    value: "CREATED_AT;false"
  },
  {
    label: "客户名称 A–Z",
    value: "CUSTOMER_NAME;false"
  },
  {
    label: "客户名称 Z–A",
    value: "CUSTOMER_NAME;true"
  },
  {
    label: "总价（高至低）",
    value: "TOTAL_PRICE;true"
  },
  {
    label: "总价（低至高）",
    value: "TOTAL_PRICE;false"
  },
];
/**
 * 非空判断
 * @param  {[type]}  param 变量
 * @return {Boolean}
 */
export function isNotEmpty(param) {
  try {
    if (param == null || param == undefined) {
      return false;
    }
    // 判断数字是否是NaN
    if (typeof param === "number") {
      if (isNaN(param)) {
        return false;
      } else {
        return true;
      }
    }
    // 判断参数是否是布尔、函数、日期、正则，是则返回true
    if (
      typeof param === "boolean" ||
      typeof param === "function" ||
      param instanceof Date ||
      param instanceof RegExp
    ) {
      return true;
    }
    // 判断参数是否是字符串，去空，如果长度为0则返回false
    if (typeof param === "string") {
      if (param.trim().length == 0) {
        return false;
      } else {
        return true;
      }
    }
    if (typeof param === "object") {
      // 判断参数是否是数组，数组为空则返回false
      if (param instanceof Array) {
        if (param.length == 0) {
          return false;
        } else {
          return true;
        }
      }
      // 判断参数是否是对象，判断是否是空对象，是则返回false
      if (param instanceof Object) {
        // 判断对象属性个数
        if (Object.getOwnPropertyNames(param).length == 0) {
          return false;
        } else {
          return true;
        }
      }
    }
  } catch (e) {
    console.log(e);
    return false;
  }
}

// 列表搜索条件，格式转换
export const queryToString = (obj) => {
  try {
    const arr = [];
    const types = {
      // filterInputSearch: (i, obj) => `"${obj[i]}"`,
      status: (i, obj) => `${i}:${obj[i]}`,
      is_archive: (i, obj) => `${i}:${obj[i]}`,
      payment_status: (i, obj) => `${i}:(${obj[i].join(" OR ")})`,
      fulfillment_status: (i, obj) => `${i}:(${obj[i].join(" OR ")})`,
      shipping_method: (i, obj) => `${i}:(${obj[i].map(t => t && String(`"${t}"`)).join(" OR ")})`,
      payment_method: (i, obj) => `${i}:(${obj[i].join(" OR ")})`,
      created_at: (i, obj) => `${i}:[${obj[i].join(" TO ")}]`
    };
    for (const i in obj) {
      if (types[i]) {
        isNotEmpty(obj[i]) && arr.push(types[i](i, obj));
      }
    }
    return arr.join(" AND ");
  } catch (e) {
    console.log(e);
  }
};
/**
 * @description 验证手机号格式是否正确
 * @param phone  手机号
 * @returns boolean
 */
export function checkMobile(phone) {
  const reg = /^(\+?)\d{6,}$/;
  return !!reg.test(phone);
}
// export function checkMobile(phone) {
//   let reg = /^1\d{10}$/;
//   return !!reg.test(phone);
// }

/**
 * @description 验证邮箱格式是否正确
 * @param email  邮箱
 * @returns boolean
 */
export function isEmail(email) {
  const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  return !!reg.test(email);
}
export const checkEmail = (string: string) => {
  if (typeof string !== 'string') { return false; }
  const emailReg = /^\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
  return emailReg.test(string);
};