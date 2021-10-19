import * as mutations from "./mutation";
import * as queries from "./queries";
import fppClient from "@src/api/base";

export const getBlogs = (input) => {
  return fppClient.query({
    query: queries.getBlogs,
    variables: input,
    fetchPolicy: "network-only"
  });
};

export const getBlogDetail = (id) => {
  return fppClient.query({
    query: queries.getBlogDetail,
    variables: {id},
    fetchPolicy: "network-only"
  });
};

export const getBlogAlbums = (input) => {
  return fppClient.query({
    query: queries.getBlogAlbums,
    variables: input,
    fetchPolicy: "network-only"
  });
};

export const getBlogAlbumDetail = (id) => {
  return fppClient.query({
    query: queries.getBlogAlbumDetail,
    variables: {id},
    fetchPolicy: "network-only"
  });
};

export const createArticle = (input) => {
  return fppClient.mutate({
    mutation: mutations.createArticle,
    variables: {input}
  });
};

export const updateArticle = (input) => {
  return fppClient.mutate({
    mutation: mutations.updateArticle,
    variables: {input}
  });
};

export const deleteArticle = (id) => {
  return fppClient.mutate({
    mutation: mutations.deleteArticle,
    variables: {id}
  });
};

export const createAlbum = (input) => {
  return fppClient.mutate({
    mutation: mutations.createAlbum,
    variables: {input}
  });
};

export const updateAlbum = (input) => {
  return fppClient.mutate({
    mutation: mutations.updateAlbum,
    variables: {input}
  });
};

export const deleteAlbum = (id) => {
  return fppClient.mutate({
    mutation: mutations.deleteAlbum,
    variables: {id}
  });
};


export const updateArticlePublish = (input) => {
  return fppClient.mutate({
    mutation: mutations.updateArticlePublish,
    variables: {input}
  });
};


export const bulkDeleteArticle = (input) => {
  return fppClient.mutate({
    mutation: mutations.bulkDeleteArticle,
    variables: {input}
  });
};

export const bulkUpdateArticle = (input) => {
  return fppClient.mutate({
    mutation: mutations.bulkUpdateArticle,
    variables: {input}
  });
};



