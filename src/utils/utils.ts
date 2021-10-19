import { CURRENCY } from "./tools";
/**
 * 将颜色对象转换为可用颜色
 * @param: rgb: 颜色对象
 * @returns rgba(r,g,b,a)
 */
export interface rgbInterface {
  r: number;
  g: number;
  b: number;
  a?: number;
}
export const getRebaFromRgbobj = (rgb: rgbInterface) => {
  if (!rgb) return;
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`;
};
// 获取字符长度
export function getBLen (str:string) {
  return str.replace(/[^\x00-\xff]/g,"01").length;
}
export const getCurrencySymbol = (currency?: string): string => {
  currency = currency || localStorage.getItem("currency") || "USD";
  return CURRENCY[currency];
};
