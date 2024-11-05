import BlogCard from "@/components/BlogCard";
import Head from "next/head";
import parse from "html-react-parser";
import { useEffect, useState } from "react";

import { useRouter } from "next/router";
import {getPostsBySearch} from "../../../lib/query";
import CustomPagination from "../../../components/CustomPagination";
import BlogCardSkeleton from "../../../components/blog/BlogCardSkeleton";

const SearchPage = () => {
    const router = useRouter();
    const { q, page } = router.query; // Extract 'q' and 'page' from query parameters

    const [posts, setPosts] = useState([]);
    const [totalPost, setTotalPost] = useState(0);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (q) { // Fetch only if 'q' is available
            (async () => {
                setLoading(true)

                const { posts, totalPage } = await getPostsBySearch(q, page || 1);
                setPosts(posts);
                setTotalPost(totalPage);
                setLoading(false)
            })();
        }
    }, [q, page]); // Re-run on query or page change

    return (
        <>
            {/* Uncomment and set up the Head component when SEO data is available */}
            {
                <Head>
                    <title>{q ? `${q}-` : '' } The OnlyFans Accountant</title>
                </Head>
            }

            <div className="bg-[#e9f1fa] p-10">
                <div className='max-w-screen-xl mx-auto'>
                    <h1 className='text-4xl font-bold'>Search Result for: {q}</h1>
                </div>
            </div>

            <div className="w-full bg-[#f9fbfe]">
                <div className="max-w-screen-xl mx-auto pt-10">
                    <div className="space-y-2">



                        {
                            !loading ?
                            posts?.map((blog, index) => (
                            <BlogCard key={index} blog={blog} />
                        ))
                        : <>
                                <BlogCardSkeleton/>
                                <BlogCardSkeleton/>
                                <BlogCardSkeleton/>
                                </>
                        }
                    </div>
                    {
                        !loading && <CustomPagination pageCount={totalPost} queryUrl={true} url={`/search?q=${q}&page=`} page={page} />
                    }

                </div>
            </div>
        </>
    );
};

export default SearchPage;
