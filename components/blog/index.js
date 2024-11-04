import React, { Suspense } from 'react';
import Link from 'next/link';
import moment from "moment";

// Dynamically import Moment to optimize load time


// Lazy load heavy or long-content elements
const BlogContent = React.lazy(() => import('./BlogContent'));

export default function Blog({ blog }) {
    const category = blog?.categories?.nodes[0];
    const author = blog?.author?.node;

    return (
        <div style={{ overflow: "hidden" }}>
            <Link href={`/category/${category?.slug}`} className="text-blue-500 mt-4">
                <p>{category?.name}</p>
            </Link>

            <h1 className="text-2xl md:text-4xl font-bold leading-10 py-4">
                {blog?.title}
            </h1>

            <p>
                By <Link href={`/author/${author?.slug}`} className="text-blue-500">{author?.name}</Link>
                {` ${moment(blog?.date).format('LL')}`}
                <Link href="#comment"> Write a Comment</Link>
            </p>

            {/* Lazy-load the main blog content */}
            <Suspense fallback={<p>Loading content...</p>}>
                <BlogContent content={blog?.content} />
            </Suspense>
        </div>
    );
}
