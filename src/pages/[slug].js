import React from 'react';
import RelatedPosts from '../../components/blog/RelatedPost';
import BreadcrumbHeader from '../../components/blog/Breadcrumb';
import Blog from '../../components/blog';
import { getBlog, getBlogBySlug, getRelatedPosts } from "../../lib/api";
import { revalidateIntervalDay } from "@/lib/utils";
import CustomNextSeo from "../../components/CustomNextSeo";

export async function getServerSideProps({ params }) {
    const blog = await getBlogBySlug(params?.slug);

    const relatedPosts = await getRelatedPosts(blog?._id, blog?.category?._id);

    return {
        props: { blog, relatedPosts, seo: blog?.seo || {} },
        // revalidate: revalidateIntervalDay(1),
    };
}

/*export async function getStaticPaths() {
    const blogs = await getBlog();
    const paths = blogs?.map((b) => ({ params: { slug: b.slug } }));
    return {
        paths,
        fallback: "blocking",
    };
}*/

export default function BlogDetails({ blog, relatedPosts, seo }) {

    if (!blog) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {seo && <CustomNextSeo seo={seo} slug={blog?.slug} />}
            <div className='bg-gray-50 py-16 '>
                <div className='px-4 md:p-12 max-w-[1140px] m-auto bg-white'>
                    <div>
                        <BreadcrumbHeader />
                    </div>
                    <div>
                        <Blog blog={blog} />
                    </div>
                    <RelatedPosts blogs={relatedPosts} />
                </div>
            </div>
        </>
    );
}
