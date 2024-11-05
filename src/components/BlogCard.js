import React from 'react';
import Link from "next/link";
import moment from "moment/moment";
import {motion} from "framer-motion";
import {MoveRight} from "lucide-react";
import parse from "html-react-parser";

const BlogCard = ({blog = {}}) => {

    const category = blog?.categories?.nodes ? blog?.categories?.nodes[0] : blog?.categories[0];
    const author = blog?.author?.node || blog?.author;

    return (
        <>
            <div className='px-4 py-4 lg:px-0'>
                <div className="px-4 py-10 lg:p-10 border border-gray-50 bg-white">
                    <Link className='text-blue-500 hover:underline' href={'/category/' + category?.slug}>
                        <p>{category?.name}</p>
                    </Link>
                    <Link href={`/${blog?.slug?.replace(/\/{2,}/g, '/')}`}>
                        <h2 className="text-2xl md:text-4xl lg:text-4xl xl:text-5xl text-gray-900 font-bold leading-relaxed py-2 hover:text-blue-600 cursor-pointer duration-200">{ parse(blog?.title) }</h2>
                    </Link>
                    <p className="text-sm text-gray-500 py-3">
                        By <Link className='hover:underline' href={`/author/${author?.slug}`}><span
                        className="font-medium text-blue-500">{author?.name}</span></Link> on {moment(blog?.date).format('LL')}
                        <Link
                            className='hover:text-blue-500 ml-2'
                            href={`/${blog?.slug}`}> Write Comment</Link>
                    </p>

                    <div className="text-gray-700 mt-2 pb-8" dangerouslySetInnerHTML={{__html: blog?.excerpt}} />
                    <div className='border-t border-gray-200 py-3'>
                        <Link href={`/${blog?.slug}`}>
                            <motion.button
                                className="mt-3 text-blue-500 hover:text-blue-700 font-normal text-lg flex items-center gap-2"
                                whileHover="hover"
                            >
                                Read More
                                <motion.span
                                    variants={{
                                        hover: {x: 10},
                                        initial: {x: 0}
                                    }}
                                    transition={{type: 'spring', stiffness: 300}}
                                >
                                    <MoveRight/>
                                </motion.span>
                            </motion.button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogCard;