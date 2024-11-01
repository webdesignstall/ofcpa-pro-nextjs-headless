import React from 'react'
import RelatedPosts from '../../components/blog/RelatedPost'
import BreadcrumbHeader from '../../components/blog/Breadcrumb'
import Blog from '../../components/blog'
import {getBlog, getBlogBySlug, getRelatedPosts} from "../../lib/api";
import {revalidateIntervalDay} from "@/lib/utils";
import BlogCard from "@/components/BlogCard";


//  Set the revalidate time in days
const REVALIDATE_DAYS = 1; // 1 day

// Convert days to seconds for Next.js revalidate
const REVALIDATE_INTERVAL = REVALIDATE_DAYS * 24 * 60 * 60;

export async function getStaticProps({params}) {
    const blog = await getBlogBySlug(params?.slug);
    const relatedPosts = await getRelatedPosts(blog?._id, blog?.category?._id)

    return {
        props: { blog, relatedPosts },
        revalidate: revalidateIntervalDay(1),
    };
}

export async function getStaticPaths() {
    const blogs = await getBlog();
    const paths = blogs?.map(b => ({params: {slug: b.slug}}));
    return {
        paths,
        fallback: true
    }
}

export default function BlogDetails({blog, relatedPosts}) {

    return (
        <div>
            <div className='bg-gray-50 py-16 '>
                <div className='px-4 md:p-12 max-w-[1140px] m-auto bg-white'>
                    <div className=''>
                        <BreadcrumbHeader />
                    </div>
                    <div>
                        <Blog blog={blog} />
                    </div>


                   <RelatedPosts blogs={relatedPosts} />


                </div>
            </div>
        </div>
    )
}
