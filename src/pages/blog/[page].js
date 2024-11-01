import React from 'react';
import {getBlog, getBlogCount} from "../../../lib/api";
import {revalidateIntervalDay} from "@/lib/utils";
import BlogCard from "@/components/BlogCard";
import Pagination from "@/components/Pagination";

export async function getStaticProps(context) {
    const page = parseInt(context.params.page) || 1; // Get page from params or default to 1
    const blogs = await getBlog(page, parseInt(process.env.NEXT_PUBLIC_BLOG_POST_PER_PAGE_SHOW));
    const totalBlogs = await getBlogCount(); // Get total blog count

    return {
        props: { blogs, page, totalBlogs }, // Pass the total count to the component
        revalidate: revalidateIntervalDay(1),
    };
}

export async function getStaticPaths() {
    const totalBlogs = await getBlogCount(); // Get total blog count
    const itemsPerPage = parseInt(process.env.NEXT_PUBLIC_BLOG_POST_PER_PAGE_SHOW); // Set the number of blogs per page
    const totalPages = Math.ceil(totalBlogs / itemsPerPage);


    // Generate an array of paths based on the total number of pages
    const paths = Array.from({ length: totalPages }, (_, index) => ({
        params: { page: (index + 1).toString() }, // Convert to string for params
    }));

    return { paths, fallback: true }; // Set fallback to false for static pages
}

const BlogPage = ({ blogs, page, totalBlogs }) => {

    const itemsPerPage = parseInt(process.env.NEXT_PUBLIC_BLOG_POST_PER_PAGE_SHOW); // Set the number of blogs per page
    const totalPages = Math.ceil(totalBlogs / itemsPerPage);

    return (
        <>
            <div>
                <div className='w-full bg-[#f9fbfe]'>
                    <div className="max-w-screen-xl mx-auto pt-10">
                        <div className="space-y-6">
                            {blogs?.map((blog, index) => (
                                <BlogCard key={index} blog={blog}/>
                            ))}
                        </div>

                        <div>
                            <Pagination currentPage={page} totalPages={totalPages} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogPage;