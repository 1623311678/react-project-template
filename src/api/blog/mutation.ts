import gql from "graphql-tag";

export const createArticle = gql`
  mutation articlecreate($input:ArticleInput){
    createArticle(input: $input){
      id
      title
      excerpt
      content
      published
      author
      seoTitle
      seoDescription
      seoKeywords
      seoUrl
      handle
      independentSeo
      publishedAt
      createdAt
      updatedAt
      image {
        src
        width
        height
        path
      }
      blogs{
        id
        title
      }
    }
  }
`;

export const updateArticle = gql`
  mutation articleupdate($input:ArticleInput){
    updateArticle(input: $input){
      id
      title
      excerpt
      content
      published
      author
      seoTitle
      seoDescription
      seoKeywords
      handle
      independentSeo
      publishedAt
      createdAt
      updatedAt
      image{
        src
        width
        height
        path
      }
      blogs{
        id
        title
      }
    }
  }
`;

export const deleteArticle = gql`
  mutation deleteArticle($id: Int!){
    deleteArticle(id:$id){
      field
      message
    }
  }
`;

export const createAlbum = gql`
  mutation albumcreate($input:AlbumInput){
    createAlbum(input: $input){
      id
      title
      description
      handle
      seoTitle
      seoDescription
      seoKeywords
      independentSeo
      seoUrl
      articles {
        id
        published
        title
        image {
          src
          width
          height
          path
        }
      }
    }
  }
`;

export const updateAlbum = gql`
  mutation albumupdate($input:AlbumInput){
    updateAlbum(input: $input){
      id
      title
      description
      handle
      seoTitle
      seoDescription
      seoKeywords
      independentSeo
      seoUrl
      createdAt
      updatedAt
      articles {
        id
        published
        title
        image {
          src
          width
          height
          path
        }
      }
    }
  }
`;

export const deleteAlbum = gql`
  mutation deleteAlbum($id: Int!){
    deleteAlbum(id:$id){
      field
      message
    }
  }
`;

export const updateArticlePublish = gql`
  mutation updateArticlePublish($input:articlePublishInput){
    updateArticlePublish(input: $input){
      msg
    }
  }
`;

export const bulkDeleteArticle = gql`
  mutation bulkDeleteArticle($input:bulkDeleteArticleInput){
    bulkDeleteArticle(input: $input){
     msg
    }
  }
`;

export const bulkUpdateArticle = gql`
  mutation bulkUpdateArticle($input:bulkUpdateArticleInput){
    bulkUpdateArticle(input: $input){
      msg
    }
  }
`;






