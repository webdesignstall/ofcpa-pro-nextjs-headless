import React from 'react';
import RelatedPosts from '../../components/blog/RelatedPost';
import BreadcrumbHeader from '../../components/blog/Breadcrumb';
import Blog from '../../components/blog';
import TagSection from '../../components/blog/Tags';
import ArticleNavigation from '../../components/blog/navigation';
import {gql} from "@apollo/client";
import {initializeApollo} from "../../lib/apolloInstance";
import Head from "next/head";
import parse from 'html-react-parser';
import { postByCategoryQuery} from "../../lib/query"; // Import the parser

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

export async function getServerSideProps({ params }) {

    const apolloClient = initializeApollo(); // initialize apollo client
    const slug = params.slug
    // Fetch data using Apollo client
    const { data } = await apolloClient.query({
        query: queryForSinglePost,
        variables: { slug },
    });

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
    };
}



export default function BlogDetails({ blog, relatedPosts, seo }) {

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

                    <RelatedPosts blogs={relatedPosts} />
                </div>
            </div>
        </>
    );
}
