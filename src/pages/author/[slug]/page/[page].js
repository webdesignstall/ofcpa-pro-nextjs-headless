import React, {useState} from 'react';

import {revalidateIntervalDay} from "@/lib/utils";
import parse from "html-react-parser";
import Head from "next/head";
import BlogCard from "@/components/BlogCard";
import ReactPaginate from "react-paginate";
import {useRouter} from "next/router";
import {getAuthors, getBlogCountByAuthor} from "../../../../../lib/api";
import {initializeApollo} from "../../../../../lib/apolloInstance";
import {GET_AUTHORS, GET_TOTAL_POST_COUNT_BY_AUTHOR} from "../../../../../lib/query";
import CustomPagination from "../../../../../components/CustomPagination";




/*export async function getServerSideProps({ params }) {
    const apolloClient = initializeApollo();





    const { data } = await apolloClient.query({
        query: GET_AUTHORS,
    });

    const user = data.users.nodes.find((user) => user.slug === params.slug);
    if (!user) {
        return {
            notFound: true,
        };
    }

    const decodedId = parseInt(atob(user.id).split(':')[1], 10);

    const { data: totalPostCountByAuthor } = await apolloClient.query({
        query: GET_TOTAL_POST_COUNT_BY_AUTHOR,
        variables: {authorId: decodedId}
    });

    console.log({totalPostCountByAuthor})

    console.log(decodedId);
    const { data: postsData } = await apolloClient.query({
        query: GET_POSTS_BY_AUTHOR,
        variables: { authorId: decodedId, first: 10 },
    });

    const response = await fetch(`https://ofcpa.pro/wp-json/rankmath/v1/getHead?url=https://ofcpa.pro/author/${params.slug}`);
    const result = await response.json();

    return {
        props: {
            blogs: postsData?.posts?.nodes || [], // Ensure this is an array if undefined
            pageInfo: postsData?.posts?.pageInfo || null, // Set pageInfo to null if undefined
            seo: result,
            authorId: decodedId,
        },
        // revalidate: revalidateIntervalDay(1),
    };
}*/

export async function getStaticPaths() {
    const apolloClient = initializeApollo();

    // Fetch authors from your GraphQL endpoint
    const { data: authorsData } = await apolloClient.query({
        query: GET_AUTHORS,
    });

    const authors = authorsData.users.nodes;
    const itemsPerPage = parseInt(process.env.NEXT_PUBLIC_BLOG_POST_PER_PAGE_SHOW) || 10; // Set your items per page
    const paths = [];

    for (const author of authors) {
        const decodedId = parseInt(atob(author.id).split(':')[1], 10);
        // Get the total number of posts for each author
        const { data: totalPostByAuthor } = await apolloClient.query({
            query: GET_TOTAL_POST_COUNT_BY_AUTHOR,
            variables: { authorId: decodedId }, // Ensure this is correct according to your schema
        });

        const totalPosts = parseInt(totalPostByAuthor.totalPublishedPostsByAuthor); // Adjust according to your API response
        const totalPages = Math.ceil(totalPosts / itemsPerPage); // Calculate total pages

        // Generate paths for each page
        for (let page = 1; page <= totalPages; page++) {
            paths.push({
                params: { slug: author.slug, page: page.toString() }, // Ensure page is a string
            });
        }
    }

    return {
        paths,
        fallback: false, // No fallback; 404 for any paths not generated
    };
}


export async function getStaticProps({params}) {

    const apolloClient = initializeApollo();

    const { data } = await apolloClient.query({
        query: GET_AUTHORS,
    });

    const user = data.users.nodes.find((user) => user.slug === params.slug);
    if (!user) {
        return {
            notFound: true,
        };
    }

    const decodedId = parseInt(atob(user.id).split(':')[1], 10);

    let postData;
    let totalPages = 0
    try {
        const response = await fetch(`https://ofcpa.pro/wp-json/wp/v2/posts?per_page=10&page=1&author=${decodedId}&_embed`);
        const posts = await response.json();
        const totalPosts = response.headers.get('X-WP-Total');
        const postsPerPage = 10;
        totalPages = Math.ceil(totalPosts / postsPerPage);

        const filteredPost = posts.map(post => ({
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
                ? post._embedded['wp:term'][0].map(cat => ({ id: cat.id, name: cat.name, slug: cat.name }))
                : []
        }));

        postData = filteredPost



    } catch (error) {
        console.error('Error fetching posts:', error);
        postData = []; // Set to an empty array in case of an error to avoid undefined issues
    }

    const response = await fetch(`https://ofcpa.pro/wp-json/rankmath/v1/getHead?url=https://ofcpa.pro/author/${params.slug}`);
    const result = await response.json();

    return {
        props: {
            posts: postData,
            pageCount: totalPages,
            seo: result,
            slug: params.slug,
            currentPage: params.page,
        },
        revalidate: revalidateIntervalDay(1),
    };
}

const AuthorPost = ({ posts, pageCount, seo, slug, currentPage}) => {
    /*const [posts, setPosts] = useState(blogs);

    const [cursor, setCursor] = useState(pageInfo.endCursor);
    const [hasNextPage, setHasNextPage] = useState(pageInfo.hasNextPage);

    const apolloClient = initializeApollo();

    const loadMore = async () => {
        const { data } = await apolloClient.query({
            query: GET_POSTS_BY_AUTHOR,
            variables: { authorId, first: 10, after: cursor }, // Adjust the number of posts per page
        });

        setPosts([...posts, ...data.posts.nodes]);
        setCursor(data.posts.pageInfo.endCursor);
        setHasNextPage(data.posts.pageInfo.hasNextPage);
    };*/

  /*  const router = useRouter();
    const handlePageChange = async ({ selected }) => {
        const newPage = selected + 1;
        router.push(`/blog/${newPage}`);
    };*/


    return (
        <>
            {/*<Head>
                {parse(seo.head)}
            </Head>*/}

            <div className="w-full bg-[#f9fbfe]">
                <div className="max-w-screen-xl mx-auto pt-10">
                    <div className="space-y-2">
                        {posts?.map((blog, index) => (
                            <BlogCard key={index} blog={blog}/>
                        ))}
                    </div>
                    <CustomPagination pageCount={pageCount} page={currentPage} url={`author/${slug}/page`} />
                    {/*<ReactPaginate
                        breakLabel="..."
                        nextLabel="Next >"
                        onPageChange={handlePageChange}
                        pageRangeDisplayed={2}
                        pageCount={pageCount}
                        previousLabel="< Previous"
                        className="pagination"
                        forcePage={0}
                    />*/}
                </div>
            </div>

            {/*<div className='w-full bg-[#f9fbfe]'>
                <div className="max-w-screen-xl mx-auto pt-10">
                    <div className="space-y-2">
                        {posts?.map((blog, index) => (
                            <BlogCard key={index} blog={blog}/>
                        ))}
                    </div>

                    {hasNextPage && (
                        <div className="text-center my-4">
                            <button
                                onClick={loadMore}
                                className="bg-[#333333]  px-6 py-2 rounded-[28px] text-[14px] text-white ibm-plex-sans-medium"
                            >
                                Load More
                            </button>
                        </div>
                    )}
                </div>
            </div>*/}
        </>
    );
};

export default AuthorPost;