import React, { Suspense } from 'react';
import Link from 'next/link';
import moment from "moment";
import BlogContentSkeleton from "./BlogContentSkeleton";
import BlogContent from "./BlogContent";


export default function Blog({ blog }) {
    const category = blog?.categories?.nodes[0];
    const author = blog?.author?.node;

    return (
        <div style={{ overflow: "hidden" }}>
            <Link href={`/category/${category?.slug}`} className="text-blue-500 mt-4 block hover:underline">
                <p>{category?.name}</p>
            </Link>

            <h1 className="text-2xl md:text-4xl font-bold leading-10 py-4">
                {blog?.title}
            </h1>

            <div className='mb-16'>
                By <Link href={`/author/${author?.slug}`} className="text-blue-500 hover:underline">{author?.name}</Link>
                {` ${moment(blog?.date).format('LL')}`}
                {/*<Link href={`${blog?.slug}/#comment`}> Write a Comment</Link>*/}
            </div>

            {/* Lazy-load the main blog content */}

                <BlogContent content={blog?.content} />
        </div>
    );
}
