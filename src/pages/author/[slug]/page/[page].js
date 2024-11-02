import React from 'react';
import {
    getAuthors, getBlogByAuthor,
    getBlogCountByAuthor,
    getPageSeo
} from "../../../../../lib/api";
import CustomNextSeo from "../../../../../components/CustomNextSeo";
import BlogCard from "@/components/BlogCard";
import Pagination from "@/components/Pagination";
import {revalidateIntervalDay} from "@/lib/utils";

export async function getStaticProps(context) {

    const page = parseInt(context?.params?.page) || 1;
    const slug = context?.params?.slug;
    const blogs = await getBlogByAuthor(page, parseInt(process.env.NEXT_PUBLIC_BLOG_POST_PER_PAGE_SHOW), slug);
    const totalBlogs = await getBlogCountByAuthor(slug);
    const seo = await getPageSeo('Blog');
    return {
        props: { blogs, page, totalBlogs, seo, slug },
        revalidate: revalidateIntervalDay(1)
    };
}


export async function getStaticPaths() {
    // Fetch authors
    const authors = await getAuthors(); // Replace with your actual function to fetch categories

    const itemsPerPage = parseInt(process.env.NEXT_PUBLIC_BLOG_POST_PER_PAGE_SHOW) || 10;

    // Generate paths for each category and page
    const paths = [];

    for (const author of authors) {
        // Fetch blog count for each category to determine pagination
        const { count: totalBlogs } = await getBlogCountByAuthor(author.slug);
        const totalPages = Math.ceil(totalBlogs / itemsPerPage);

        for (let page = 1; page <= totalPages; page++) {
            paths.push({
                params: { author: author.slug, page: page.toString() }
            });
        }
    }

    return { paths, fallback: 'blocking' };
}

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
                        <Pagination currentPage={page} totalPages={totalPages}  url={`author/${slug}/page`}/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CategoryPage;