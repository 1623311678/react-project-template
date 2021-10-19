/**
 * @description FPP 常量
 */

// 重量单位
export const weightUnitOptions = [{
  label: "磅",
  value: "POUNDS",
  abbreviation: "lb",
}, {
  label: "盎司",
  value: "OUNCES",
  abbreviation: "oz",
}, {
  label: "公斤",
  value: "KILOGRAMS",
  abbreviation: "kg",
}, {
  label: "克",
  value: "GRAMS",
  abbreviation: "g",
}];

// 重量单位缩写
export const weightUnitAbbreviation = {
  "POUNDS": "lb",
  "OUNCES": "oz",
  "KILOGRAMS": "kg",
  "GRAMS": "g",
}

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
  "CLP": "$",
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

// 导入产品示例CSV地址
export const SAMPLE_CSV_URL = "https://cdn1.funpinpin.com/product_import_template/funpinpin_products_template.csv";

// 产品状态
export const PRODUCT_STATUS = {
  "ACTIVE": "活跃",
  "DRAFT": "草稿",
};

// 导入产品评论示例XLSX地址
export const SAMPLE_XLSX_URL = "https://cdn1.funpinpin.com/product_import_template/reviews_template.zip";
// 上传文件支持的视频类型
export const VIDEO_ACCEPT = "video/mp4,video/quicktime,video/x-sgi-movie";

// 上传文件支持的图片类型
export const IMAGE_ACCEPT = "image/*";

// 上传文件支持的类型
export const FILE_ACCPET = "image/*,video/mp4,video/quicktime,video/x-sgi-movie,video/glb";

// 限制视频文件大小 10MB
export const MAX_VIDEO_SIZE = 1024 * 1024 * 10;

export const PAGE_SIZE_OPTIONS = [{
  value: 10,
  label: '10 条/页',
}, {
  value: 50,
  label: '50 条/页',
}, {
  value: 200,
  label: '200 条/页',
}, {
  value: 400,
  label: '400 条/页',
}, {
  value: 600,
  label: '600 条/页',
}];

// 以下货币不显示小数
export const INTERGER_CURRENCY = ["HUF", "JPY", "TWD", "CLP"];

// 图片尺寸options
export const IMAGE_SIZE_OPTIONS = [{
  label: '初始',
  value: 'x',
}, {
  label: '微型 (16x16)',
  value: '16x16',
}, {
  label: '图标 (32x32)',
  value: '32x32',
}, {
  label: '缩略 (50x50)',
  value: '50x50',
}, {
  label: '小 (100x100)',
  value: '100x100',
}, {
  label: '简洁 (160x160)',
  value: '160x160',
}, {
  label: '中 (240x240)',
  value: '240x240',
}, {
  label: '大 (480x480)',
  value: '480x480',
}, {
  label: '特大 (600x600)',
  value: '600x600',
}, {
  label: '1024x1024 (1024x1024)',
  value: '1024x1024',
}, {
  label: '2048x2048 (2048x2048)',
  value: '2048x2048',
}];
// 产品变体上限数量
export const MAX_VARIANTS_NUMBER = 200;

// 设备展示类型
export const devices = {
  mobile: "mobile",
  pc: "pc"
};