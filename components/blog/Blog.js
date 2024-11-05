import useLoading from "@/hooks/useLoading";
import BlogCardSkeleton from "./BlogCardSkeleton";
import BlogContentSkeleton from "./BlogContentSkeleton";

import BlogCard from "@/components/BlogCard";
import CustomPagination from "../CustomPagination";

const BlogHomePage = ({ posts, pageCount, currentPage, url, page = ["/blog", "/blog/[page]"] }) => {

    const loading = useLoading(page);
    const authorBlogLoading = useLoading(["/author", "/author/[slug]"]);
    const categoryBlogLoading = useLoading(["/category", "/category/[slug]"]);
    const singlePostLoading = useLoading(["/[slug]"]);

    if (authorBlogLoading) {
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
        )
    }
    if (categoryBlogLoading) {
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
        )
    }

    if (singlePostLoading && !loading) {
        return (
            <>
                <div className='bg-gray-50 py-16 '>
                    <div className='px-4 md:p-12 max-w-[1140px] m-auto bg-white'>
                        <BlogContentSkeleton/>
                        <BlogContentSkeleton/>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="w-full bg-[#f9fbfe]">
                <div className="max-w-screen-xl mx-auto pt-10">
                    <div className="space-y-2">
                        {
                            loading ?
                                <>
                                    <BlogCardSkeleton/>
                                    <BlogCardSkeleton/>
                                    <BlogCardSkeleton/>
                                </>
                                :
                                posts?.map((blog, index) => (
                                    <BlogCard key={index} blog={blog}/>
                                ))
                        }
                    </div>

                    <CustomPagination pageCount={pageCount} url={url} page={currentPage}/>
                </div>
            </div>
        </>

    );
};

export default BlogHomePage;