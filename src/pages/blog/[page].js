import React from 'react';
import {getBlog, getBlogCount, getPageSeo} from "../../../lib/api";
import {revalidateIntervalDay} from "@/lib/utils";
import BlogCard from "@/components/BlogCard";
import Pagination from "@/components/Pagination";
import CustomNextSeo from "../../../components/CustomNextSeo";

export async function getStaticProps(context) {
    const page = parseInt(context.params.page) || 1; // Get page from params or default to 1
    const blogs = await getBlog(page, parseInt(process.env.NEXT_PUBLIC_BLOG_POST_PER_PAGE_SHOW));
    const totalBlogs = await getBlogCount(); // Get total blog count
    const seo = await getPageSeo('Blog');

    return {
        props: { blogs, page, totalBlogs, seo }, // Pass the total count to the component
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

const BlogPage = ({ blogs, page, totalBlogs, seo }) => {

    const itemsPerPage = parseInt(process.env.NEXT_PUBLIC_BLOG_POST_PER_PAGE_SHOW); // Set the number of blogs per page
    const totalPages = Math.ceil(totalBlogs / itemsPerPage);

    return (
        <>
            <CustomNextSeo seo={seo} slug={'/blog'}/>
            <div>
                <div className='w-full bg-[#f9fbfe]'>
                    <div className="max-w-screen-xl mx-auto pt-10">
                        <div className="space-y-6">
                            {blogs?.map((blog, index) => (
                                <BlogCard key={index} blog={blog}/>
                            ))}
                        </div>
                            
                        <div>
                            <Pagination currentPage={page} totalPages={totalPages} url={'blog'} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogPage;