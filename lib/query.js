import {gql} from "@apollo/client";

export const CATEGORY_SLUGS_QUERY = gql`
  query GetCategorySlugs {
    categories {
      nodes {
        slug
        id
      }
    }
  }
`;

export const GET_TOTAL_POST_COUNT_BY_CATEGORY = gql`
 query GetTotalPublishedPostsByCategory($categoryId: Int!) {
  totalPublishedPostsByCategory(categoryId: $categoryId)
}
`;



export const GET_AUTHORS = gql`
  query GetAuthorSlugs {
    users {
      nodes {
          id
          slug
          name
          avatar {
            url
          }
      }
    }
  }
`;


export const paginationBlogQuery = gql`
  query NewQuery($first: Int, $after: String) {
    posts(first: $first, after: $after) {
      nodes {
        id
        title
        slug
        excerpt      
        date
        featuredImage {
          node {
            srcSet
            sourceUrl
          }
        }
        categories {
          nodes {
            id
            name
            slug
          }
        }
        author {
          node {
            name
            slug
            avatar {
              url
            }
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

export const allPosts = gql`
  query NewQuery ($first: Int, $after: String) {
    posts (first: $first, after: $after){
      nodes {
        id
        title
        slug  
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;


export const GET_POSTS_BY_AUTHOR = gql`
  query GetPostsByAuthor($authorId: Int!, $first: Int!, $after: String) {
    posts(where: { author: $authorId }, first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        id
        title
        slug
        excerpt
        date
        featuredImage {
          node {
            sourceUrl
            srcSet
          }
        }
        categories {
          nodes {
            id
            name
            slug
          }
        }
        author {
          node {
            name
            avatar {
              url
            }
          }
        }
      }
    }
  }
`;



export const GET_PAGINATED_ITEMS = gql`
  query GetPaginatedItems($first: Int!, $after: String) {
    posts(first: $first, after: $after) {
      nodes {
        id
        title
        slug
        excerpt
        date
        featuredImage {
          node {
            sourceUrl
            srcSet
          }
        }
        categories {
          nodes {
            id
            name
            slug
          }
        }
        author {
          node {
            name
            slug
            avatar {
              url
            }
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }     
    }
  }
`;

export const GET_ALL_ITEMS = gql`
  query GetAllPosts($first: Int!, $after: String) {
    posts(first: $first, after: $after) {
      nodes {
        id
        slug
      }
      pageInfo {
        endCursor
        hasNextPage
      } 
    }
  }
`;

export const GET_TOTAL_PUBLISHED_POSTS = gql `
    query GetTotalPublishedPosts {
      totalPublishedPosts
    }
`
export const GET_PUBLISHED_POSTS_SLUG_ID = gql `
    query {
    publishedPostsSlugId {
        id
        slug
    }
}`

export const GET_TOTAL_POST_COUNT_BY_AUTHOR = gql `
   query GetTotalPublishedPostsByAuthor($authorId: Int!) {
  totalPublishedPostsByAuthor(authorId: $authorId)
}
`





