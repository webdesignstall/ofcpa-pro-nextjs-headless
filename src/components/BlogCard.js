import React from 'react';
import Link from "next/link";
import moment from "moment/moment";
import BlockContent from "@sanity/block-content-to-react";
import {motion} from "framer-motion";
import {MoveRight} from "lucide-react";

const serializers = {
    types: {
        block: (props) => {
            // Render the first 20 words of the first paragraph as a preview
            const text = props.children[0]; // Access the first text child
            const previewText = text.split(" ").slice(0, 30).join(" ") + " [...]"; // First 20 words with ellipsis

            return <p className="text-lg">{previewText}</p>;
        },
    },
};

const BlogCard = ({blog}) => {

    return (
        <>
            <div className='px-4 py-4 lg:px-0'>
                <div className="px-4 py-10 lg:p-10 border border-gray-50 bg-white">
                    <Link href={'/category/' + blog?.category?.slug}>
                        <p>{blog?.category?.name}</p>
                    </Link>
                    <Link href={`/${blog?.slug}`}>
                        <h2 className="text-2xl md:text-4xl lg:text-4xl xl:text-5xl text-gray-900 font-bold leading-relaxed py-2 hover:text-blue-600 cursor-pointer duration-200">{blog?.title}</h2>
                    </Link>
                    <p className="text-sm text-gray-500 py-3">
                        By <Link href={`/author/${blog?.author}`}><span
                        className="font-medium text-blue-500">{blog?.author}</span></Link> on {moment(blog?.date).format('LL')}
                        <Link
                            className='hover:text-blue-500 ml-2'
                            href={`/${blog?.slug}/#comment`}>Write Comment</Link>
                    </p>

                    <BlockContent
                        renderContainerOnSingleChild={false}
                        serializers={serializers}
                        blocks={blog?.content?.slice(0, 1)}
                    />

                    <p className="text-gray-700 mt-2 pb-8">{blog?.description}</p>
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