// components/RelatedPosts.js
import React from 'react';
import moment from "moment";
import Link from "next/link";

const RelatedPosts = ({blogs}) => {

    return (
        <div className='my-8'>
            <section className="">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">Related Posts</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 cursor-pointer">
                    {blogs?.map((post, index) => (
                        <div
                            key={post?.id}
                            className=" p-4"
                        >
                            <div className="h-64 rounded-md mb-4 bg-sky-50"></div>
                            <Link href={`/${post?.slug}`}>
                                <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-blue-700 cursor-pointer duration-200">{post?.title}</h3>
                            </Link>
                            <p className="text-sm text-gray-500 mb-1">{moment(post?.date).format('LL')}</p>
                            <Link href={`/category/${post?.categories?.nodes[0]?.slug}`}> <p className="text-sm text-gray-500">{post?.categories?.nodes[0]?.name}</p> </Link>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default RelatedPosts;
