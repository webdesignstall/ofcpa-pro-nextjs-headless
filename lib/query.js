import {gql} from "@apollo/client";

export const CATEGORY_SLUGS_QUERY = gql`
  query GetCategorySlugs {
    categories {
      nodes {
        slug
      }
    }
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
