import {gql} from "@apollo/client";
import {initializeApollo} from "./apolloInstance";

export const CATEGORY_SLUGS_QUERY = gql`
  query GetCategorySlugs {
    categories {
      nodes {
        slug
        id
        name
        categoryId
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
          userId
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



export const postByCategoryQuery = gql`
      query GetPostsByCategorySlugs($categorySlugs: String, $id: ID, $first: Int!) {
        posts(where: { categoryName: $categorySlugs, notIn: [$id], status: PUBLISH  }, first: $first) {
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



export const getHomePageContent = async () => {
    const pageContent = gql`
  query NewQuery {
  headlessOptions {
    pageContent {
      heroSection {
        description
        sectionTitle
        slogan
        image {
          node {
            altText
            srcSet
            sourceUrl
          }
        }
      }
      pricingPlan {
        sectionTitle
        features {
          description
          planName
          price
          items {
            point
          }
        }
      }
      reviews {
        label
        sectionTitle
        items {
          rating
          reviewText
          reviewerName
          reviewerTitle
        }
      }
      services {
        sectionTitle
        items {
          itemTitle
          price
        }
      }
      workingWithUs {
      sectionTitle
        items {
          description
          title
          icon {
            node {
              altText
              srcSet
              sourceUrl
            }
          }
        }
      }
    }
  }
}
    `;

    const apolloClient = initializeApollo(); // initialize apollo client

    // Fetch data using Apollo client
    const { data } = await apolloClient.query({
        query: pageContent,
    });

    const {heroSection, pricingPlan, reviews, services, workingWithUs } = data?.headlessOptions?.pageContent;

    return {heroSection, pricingPlan, reviews, services, workingWithUs }

}


export const getComparison = async () => {
    const comparisonQuery = gql`
  query GetComparison {
  headlessOptions {
    pageContent {
      comparion {
        sectionTitle
        sectionSubtitle
        ourColumnTitle
        ourColumnSubtitle
        otherColumnTitle
        tables {
          items {
            ourPart
            otherPart
            label
          }
        }
      }
    }
  }
}
    `;

    const apolloClient = initializeApollo(); // initialize apollo client

    // Fetch data using Apollo client
    const { data } = await apolloClient.query({
        query: comparisonQuery,
    });

    const comparisonData = data?.headlessOptions?.pageContent?.comparion;

    return comparisonData

}


export const getPostsBySearch = async (searchQuery, page = 1) => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/wp-json/wp/v2/posts?per_page=10&page=${page}&_embed${
        searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : ""
    }`;

    const response = await fetch(url);
    const data = await response.json();

    const totalPosts = response.headers.get('X-WP-Total');
    const postsPerPage = 10;
    const totalPages = Math.ceil(totalPosts / postsPerPage);

    const filteredPost = data?.map(post => ({
        id: post.id,
        title: post.title.rendered,
        slug: post.slug,
        excerpt: post?.excerpt?.rendered,
        date: post.date,
        author: {
            name: post._embedded.author ? post._embedded.author[0].name : null,
            slug: post._embedded.author ? post._embedded.author[0].slug : null
        },
        categories: post._embedded['wp:term']
            ? post._embedded['wp:term'][0].map(cat => ({ id: cat.id, name: cat.name, slug: cat.slug }))
            : []
    }));

    return {
        posts: filteredPost,
        totalPage: totalPages
    }

};


export const getGeneralSetting = async () => {
    const generalQuery = gql `
        query GeneralSetting {
  headlessOptions {
    general {
      siteName
      favicon {
        node {
          sourceUrl
          srcSet
        }
      }
      logo {
        node {
          altText
          sourceUrl
          srcSet
        }
      }
    }
    footer {
      copyRight
      email
      phone
      logo {
        node {
          altText
          sourceUrl
          srcSet
        }
      }
    }
  }
}
    `

    const apolloClient = initializeApollo(); // initialize apollo client

    // Fetch data using Apollo client
    const { data } = await apolloClient.query({
        query: generalQuery,
    });

    const {general, footer} = data?.headlessOptions;

    return {
        general, footer
    }

};








