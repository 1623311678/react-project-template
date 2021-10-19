import { orderDraftListUrl, orderListUrl } from "@src/orders/urls";
import { matchPath } from "react-router";
import { cloneDeep } from "lodash";

export function isMenuActive(location: string, menuItem) {
  if (menuItem.children) {
    return menuItem.children.reduce(
      (acc, subMenuItem) => acc || isMenuActive(location, subMenuItem),
      false
    );
  }

  const activeUrl = location.split("?")[0];
  const menuItemUrl = menuItem.url.split("?")[0];

  return activeUrl === orderDraftListUrl().split("?")[0] &&
    menuItemUrl === orderListUrl().split("?")[0]
    ? false
    : !!matchPath(activeUrl, {
      exact: menuItemUrl === "/",
      path: menuItemUrl
    });
}

/**
 * Convert an array to a tree-structured array.
 * @param   {array}     array     The Array need to Converted.
 * @param   {string}    key        The alias of the unique ID of the object in the array.
 * @param   {string}    parentKey      The alias of the parent ID of the object in the array.
 * @param   {string}    children  The alias of children of the object in the array.
 * @return  {array}    Return a tree-structured array.
 */
export function arrayToTree(
  array,
  key = "key",
  parentKey = "parentKey",
  children = "children"
) {
  const result = [];
  const hash = {};
  const data = cloneDeep(array);

  data.forEach((item, index) => {
    hash[data[index][key]] = data[index];
  });

  data.forEach(item => {
    const hashParent = hash[item[parentKey]];
    if (hashParent) {
      !hashParent[children] && (hashParent[children] = []);
      hashParent[children].push(item);
    } else {
      result.push(item);
    }
  });
  return result;
}

/**
 * In an array of objects, specify an object that traverses the objects whose parent ID matches.
 * @param   {array}     array     The Array need to Converted.
 * @param   {string}    current   Specify the object that needs to be queried.
 * @param   {string}    parentKey  The alias of the parent ID of the object in the array.
 * @param   {string}    key        The alias of the unique ID of the object in the array.
 * @return  {array}    Return a key array.
 */
export function queryAncestors(array, current, parentKey, key = "key") {
  const result = [current];
  const hashMap = new Map();
  array.forEach(item => hashMap.set(item[key], item));

  const getPath = current => {
    const currentParentKey = hashMap.get(current[key])[parentKey];
    if (currentParentKey) {
      result.push(hashMap.get(currentParentKey));
      getPath(hashMap.get(currentParentKey));
    }
  };

  getPath(current);
  return result;
}
