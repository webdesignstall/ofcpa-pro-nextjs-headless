import React from 'react';
import {getBlogByCategory, getBlogCountByCategory, getCategories, getPageSeo} from "../../../../../lib/api";
import CustomNextSeo from "../../../../../components/CustomNextSeo";
import BlogCard from "@/components/BlogCard";
import Pagination from "@/components/Pagination";

export async function getServerSideProps(context) {

    const page = parseInt(context?.params?.page) || 1;
    const category = context?.params?.category;
    const {blogs, count} = await getBlogByCategory(page, parseInt(process.env.NEXT_PUBLIC_BLOG_POST_PER_PAGE_SHOW), category);
    const totalBlogs = count;
    const seo = await getPageSeo('Blog');
    return {
        props: { blogs, page, totalBlogs, seo: seo, slug: category },
    };
}


/*export async function getStaticPaths(context) {
    // Fetch categories
    const categories = await getCategories(); // Replace with your actual function to fetch categories

    const itemsPerPage = parseInt(process.env.NEXT_PUBLIC_BLOG_POST_PER_PAGE_SHOW) || 10;

    // Generate paths for each category and page
    const paths = [];

    for (const category of categories) {
        // Fetch blog count for each category to determine pagination
        const { count: totalBlogs } = await getBlogCountByCategory(category.slug);
        const totalPages = Math.ceil(totalBlogs / itemsPerPage);

        for (let page = 1; page <= totalPages; page++) {
            paths.push({
                params: { category: category.slug, page: page.toString() }
            });
        }
    }

    return { paths, fallback: 'blocking' };
}*/

const CategoryPage = ({blogs, totalBlogs, seo, page, slug}) => {

    const itemsPerPage = parseInt(process.env.NEXT_PUBLIC_BLOG_POST_PER_PAGE_SHOW) || 10; // Set the number of blogs per page
    const totalPages = Math.ceil(totalBlogs / itemsPerPage);

    return (
        <>
            <CustomNextSeo seo={seo} slug={'/blog'} />
            <div className='w-full bg-[#f9fbfe]'>
                <div className="max-w-screen-xl mx-auto pt-10">
                    <div className="space-y-2">
                        {blogs?.map((blog, index) => (
                            <BlogCard key={index} blog={blog}/>
                        ))}
                    </div>

                    <div>
                        <Pagination currentPage={page} totalPages={totalPages}  url={`category/${slug}/page`}/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CategoryPage;