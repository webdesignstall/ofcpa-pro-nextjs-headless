import React from 'react';
import RelatedPosts from '../../components/blog/RelatedPost';
import BreadcrumbHeader from '../../components/blog/Breadcrumb';
// import Blog from '../../components/blog';
import TagSection from '../../components/blog/Tags';
import ArticleNavigation from '../../components/blog/navigation';
import {gql} from "@apollo/client";
import {initializeApollo} from "../../lib/apolloInstance";
import Head from "next/head";
import parse from 'html-react-parser';
import {GET_ALL_ITEMS, postByCategoryQuery} from "../../lib/query";
import {revalidateIntervalDay} from "@/lib/utils";
import useLoading from "@/hooks/useLoading";
import BlogCardSkeleton from "../../components/blog/BlogCardSkeleton";
import Blog from '../../components/blog';

const queryForSinglePost = gql`
    query GetPostBySlug($slug: String!) {
        postBy(slug: $slug) {
            id
            title
            slug
            content
            excerpt
            date
             tags {
                  nodes {
                    slug
                    tagId
                    name
                  }
             }
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
                    id
                    slug
                    name
                    avatar {
                        url
                    }
                }
            }          
        }
    }
`;


export async function getStaticPaths() {
    const apolloClient = initializeApollo(); // initialize Apollo client

    // Fetch data using Apollo client
    const { data } = await apolloClient.query({
        query: GET_ALL_ITEMS,
        variables: { first: 30 }
    });

    const paths = data?.posts?.nodes?.map(post => ({
        params: { slug: post?.slug } // `params` is required for dynamic routes
    }));

    return {
        paths,
        fallback: 'blocking' // `blocking` or `true` if you want incremental static generation
    };
}


export async function getStaticProps({ params }) {

    const apolloClient = initializeApollo(); // initialize apollo client
    const slug = params.slug
    // Fetch data using Apollo client
    const { data } = await apolloClient.query({
        query: queryForSinglePost,
        variables: { slug },
    });

    if (!data?.postBy) {
        return {
            notFound: true, // This should return a 404 response in Next.js
        };
    }

    const decodedId = parseInt(atob(data?.postBy.id).split(':')[1], 10);


    const { data: categoryPosts } = await apolloClient.query({
        query: postByCategoryQuery,
        variables: { categorySlugs: data?.postBy?.categories?.nodes[0]?.name, id: decodedId , first: 3 },
    });

   const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/wp-json/rankmath/v1/getHead?url=${process.env.NEXT_PUBLIC_BACKEND_URL}/${slug}`)
    const result = await response.json();

    return {
        props: {
            blog: data?.postBy,
            relatedPosts: categoryPosts?.posts?.nodes,
            seo: result
        },
        revalidate: revalidateIntervalDay(1)
    };
}



export default function BlogDetails({ blog, relatedPosts, seo }) {

    const blogLoading = useLoading(["/blog", "/blog/[page]", "/author/[slug]", "/category/[slug]"]);

    if (blogLoading) {
        return (
            <>
                <div className="w-full bg-[#f9fbfe]">
                    <div className="max-w-screen-xl mx-auto pt-10">
                        <div className="space-y-2">
                            <BlogCardSkeleton/>
                            <BlogCardSkeleton/>
                            <BlogCardSkeleton/>
                        </div>
                    </div>
                </div>
            </>
        );
    }

return (
<>
    {
        seo?.head && <Head>
            {parse(seo?.head)}
        </Head>
    }
    <div className='bg-gray-50 py-16 '>
        <div className='px-4 md:p-12 max-w-[1140px] m-auto bg-white'>
            {/*<div>
                <BreadcrumbHeader post={blog} />
            </div>*/}
           <Blog blog={blog}/>

            {
                blog?.tags?.nodes?.length > 0 &&  <TagSection tags={blog?.tags?.nodes} />
            }


            {/*<ArticleNavigation />*/}

            <RelatedPosts blogs={relatedPosts}/>
        </div>
    </div>
</>
);
}
