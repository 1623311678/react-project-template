import * as mutations from "./mutation";
import * as queries from "./queries";
import fppClient from "@src/api/base";

export const applyChange = ({ root, items }) => {
  return fppClient.mutate({
    mutation: mutations.applyChange,
    variables: {
      root,
      items
    }
  });
};

export const applyDelete = ({ tid }) => {
  return fppClient.mutate({
    mutation: mutations.applyDelete,
    variables: {
      tid
    }
  });
};

export const fppMenu = () => {
  return fppClient.query({
    query: queries.fppMenu,
    variables: {},
    fetchPolicy: "network-only"
  });
};

export const fppMenuDetail = ({ tid }) => {
  return fppClient.query({
    query: queries.fppMenuDetail,
    variables: {
      tid
    },
    fetchPolicy: "network-only"
  });
};

export const productList = () => {
  return fppClient.query({
    query: queries.productList,
    fetchPolicy: "network-only" //不需要缓存
  });
};

export const collectionList = () => {
  return fppClient.query({
    query: queries.collectionList,
    fetchPolicy: "network-only" //不需要缓存
  });
};

export const getDecorateHeader = ({ flag }) => {
  return fppClient.query({
    query: queries.getDecorateHeader,
    variables: {
      flag
    },
    fetchPolicy: "network-only" //不需要缓存
  });
};

export const decorateHeaderUpdate = ({
  id, name, data, type
}) => {
  console.log('id, name, data, type', id, name, data, type)
  return fppClient.mutate({
    mutation: mutations.decorateHeaderUpdate,
    variables: {
      input: {
        id,
        name,
        data,
        type
      }
    }
  });
};