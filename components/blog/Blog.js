import React, {useState} from 'react';
import BlogCard from "@/components/BlogCard";
import {initializeApollo} from "../../lib/apolloInstance";

const Blog = ({posts, setPosts, pageInfo, query, }) => {
    const [cursor, setCursor] = useState(pageInfo.endCursor);
    const [hasNextPage, setHasNextPage] = useState(pageInfo.hasNextPage);

    const apolloClient = initializeApollo();



    const loadMore = async () => {
        const { data } = await apolloClient.query({
            query: query,
            variables: { first: 10, after: cursor }, // Adjust the number of posts per page
        });

        setPosts([...posts, ...data.posts.nodes]);
        setCursor(data.posts.pageInfo.endCursor);
        setHasNextPage(data.posts.pageInfo.hasNextPage);
    };

    return (
        <>
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

        {/*<div>
            <Pagination currentPage={page} totalPages={totalPages} url={'blog'} />
          </div>*/}
</>
)

};

export default Blog;