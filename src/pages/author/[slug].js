import React, {useState} from 'react';
import {initializeApollo} from "../../../lib/apolloInstance";
import {GET_AUTHOR_BY_SLUG, GET_AUTHORS, GET_POSTS_BY_AUTHOR, paginationBlogQuery} from "../../../lib/query";
import {revalidateIntervalDay} from "@/lib/utils";
import Blog from "../../../components/blog/Blog";
import parse from "html-react-parser";
import Head from "next/head";
import BlogCard from "@/components/BlogCard";


export async function getServerSideProps({ params }) {
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
}


const AuthorPost = ({ blogs, pageInfo, seo, authorId }) => {
    const [posts, setPosts] = useState(blogs);

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
    };


    return (
        <>
            <Head>
                {parse(seo.head)}
            </Head>

            <div className='w-full bg-[#f9fbfe]'>
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
            </div>
        </>
    );
};

export default AuthorPost;