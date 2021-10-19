/**
 * 此模块用于生成唯一的 id，时间戳加上计数，确保不会出现重复的情况
 *
 * @return number 唯一 id
 */

const timesmap = Date.now();
let counter = -1;

export default () => {
  counter++;
  return Number(`${timesmap}${counter}`);
}