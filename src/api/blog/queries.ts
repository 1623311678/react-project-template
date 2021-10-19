import gql from "graphql-tag";


export const getBlogDetail = gql`
  query  article($id: ID!){
    article(id:$id){
      id
      title
      excerpt
      content
      published
      author
      seoUrl
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
`

export const getBlogs = gql`
  query articles($first: Int, $last: Int, $before: String, $after: String,$title: String,$status: String){
    articles(first:$first,last:$last,before:$before,after:$after,title:$title,status:$status){
      edges{
        cursor
        node{
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
      pageInfo{
        hasNextPage
        hasPreviousPage
      }
    }
  }
`

export const getBlogAlbumDetail = gql`
  query album($id: ID!){
    album(id:$id){
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
      articles{
        id
        published
        title
      image{
        src
        width
        height
        path
      }
    }
  }
}
`

export const getBlogAlbums = gql`
query albums($first: Int, $last: Int, $before: String, $after: String,$title: String){
  albums(first:$first,last:$last,before:$before,after:$after,title:$title){
    edges{
      cursor
      node{
        id
        handle
        ArticleCount
        seoUrl
        title
        updatedAt
      }
    }
    pageInfo{
      hasNextPage
      hasPreviousPage
    }
  }
}
`
