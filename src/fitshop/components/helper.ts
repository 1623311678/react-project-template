class LocaleHelper {
  getCardName(locale: string, nameObj: {}) {
    // B端暂时没有多语言支持,但是模板中参考的数据是从店匠爬来的,所以先统一返回中文
    // if (locale.indexOf("zh") > -1) {
    return nameObj["zh-CN"];
    // }
    // return nameObj["en-US"];
  }
}

export default new LocaleHelper();
