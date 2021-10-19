/**
 * 此功能用于锁定 dnd 元素拖动时的 Y 轴移动
 *
 * @see https://github.com/atlassian/react-beautiful-dnd/issues/538
 * @param style
 * @param snapshot
 */

const getStyle = (style, snapshot) => {
  if (style?.transform) {
    const axisLockY = `translate(0px, ${style.transform.split(',').pop()}`;
    return { ...style, transform: axisLockY };
  }
  return style;
}

export default getStyle;