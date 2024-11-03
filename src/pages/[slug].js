import React from 'react';
import RelatedPosts from '../../components/blog/RelatedPost';
import BreadcrumbHeader from '../../components/blog/Breadcrumb';
import Blog from '../../components/blog';
import { revalidateIntervalDay } from "@/lib/utils";
import TagSection from '../../components/blog/Tags';
import ArticleNavigation from '../../components/blog/navigation';
import {gql} from "@apollo/client";
import {initializeApollo} from "../../lib/apolloInstance";
import Head from "next/head";
import parse from 'html-react-parser'; // Import the parser

const queryForSinglePost = gql`
    query GetPostBySlug($slug: String!) {
        postBy(slug: $slug) {
            id
            title
            slug
            content
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
`;

const queryForAllPosts = gql`
                                query NewQuery {
 posts{
  nodes{
    id
    title
    slug
    excerpt
    date
    featuredImage{
      node{
      srcSet
      sourceUrl
      }
    }
    categories{
      nodes{
        id
        name
        slug
      }
    }
    author{
      node{
        name
        avatar{
          url
        }
      }
    }
  }
}
}
`;

export async function getStaticPaths() {
    const apolloClient = initializeApollo(); // initialize apollo client
    // Fetch data using Apollo client
    const { data } = await apolloClient.query({
        query: queryForAllPosts,
    });

    //@ts-ignore
    const paths = data?.posts?.nodes?.map(post => ({ params: { slug: post?.slug } }));
    return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {

    const apolloClient = initializeApollo(); // initialize apollo client
    const slug = params.slug
    // Fetch data using Apollo client
    const { data } = await apolloClient.query({
        query: queryForSinglePost,
        variables: { slug },
    });

   /* const { data: categoryPosts } = await apolloClient.query({
        query: postByCategoryQuery,
        variables: { categorySlugs: data?.postBy?.categories?.nodes[0]?.name, first: 3 },
    });*/

   const response = await fetch(`https://ofcpa.pro/wp-json/rankmath/v1/getHead?url=https://ofcpa.pro/${slug}`)

    const result = await response.json();

    return {
        props: {
            blog: data?.postBy,
            // categoryPosts: categoryPosts?.posts?.nodes
            seo: result
        },
        revalidate: revalidateIntervalDay(1),
    };
}



export default function BlogDetails({ blog, seo }) {

    if (!blog) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Head>
                {parse(seo.head)}
            </Head>
            <div className='bg-gray-50 py-16 '>
                <div className='px-4 md:p-12 max-w-[1140px] m-auto bg-white'>
                    <div>
                        <BreadcrumbHeader />
                    </div>
                    <div>
                        <Blog blog={blog} />
                    </div>

                        {/*<TagSection /> */}
                        {/*<ArticleNavigation />*/}

                    {/*<RelatedPosts blogs={relatedPosts} />*/}
                </div>
            </div>
        </>
    );
}
