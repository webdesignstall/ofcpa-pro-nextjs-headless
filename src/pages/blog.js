import Link from 'next/link';
import { useRef, useState } from 'react';
import PaginationFooter from '../../components/blog/Pagination';
import { MoveRight } from 'lucide-react';
import { motion } from 'framer-motion';
import {getBlog, urlFor} from "../../lib/api";
import moment from "moment";
import BlockContent from '@sanity/block-content-to-react';
import Image from "next/image";


export async function getStaticProps() {
  const blogs = await getBlog();

  return {
    props: { blogs },
  };
}

// @ts-ignore
function stripHtmlTags(str) {
  if (!str) return "";
  return str.replace(/<\/?[^>]+(>|$)/g, "");
}

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

const BlogPage = ({ blogs }) => {

  return (
    <div>
      <div className='w-full bg-[#f9fbfe]'>
        <div className="max-w-screen-xl mx-auto pt-10">
          <div className="space-y-6">
            {blogs?.map((blog, index) => (
              <div key={index} className='px-4 py-8 lg:pb-16 lg:px-0'>
                <div className="px-4 py-10 lg:p-10 border border-gray-50 bg-white">
                  <Link href={'/category/' + blog?.category?.slug}>
                    <p>{blog?.category?.name}</p>
                  </Link>
                  <Link href={blog?.slug}>
                    <h2 className="text-2xl md:text-4xl lg:text-4xl xl:text-5xl text-gray-900 font-bold leading-relaxed py-2 hover:text-blue-600 cursor-pointer duration-200">{blog?.title}</h2>
                  </Link>
                  <p className="text-sm text-gray-500 py-3">
                    By <Link href={`/author/${blog?.author}`}><span
                      className="font-medium text-blue-500">{blog?.author}</span></Link> on {moment(blog?.date).format('LL')} <Link
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
                    <Link href={blog?.slug}>
                      <motion.button
                        className="mt-3 text-blue-500 hover:text-blue-700 font-normal text-lg flex items-center gap-2"
                        whileHover="hover"
                      >
                        Read More
                        <motion.span
                          variants={{
                            hover: { x: 10 },
                            initial: { x: 0 }
                          }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          <MoveRight />
                        </motion.span>
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/*<div>
            <PaginationFooter />
          </div>*/}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
