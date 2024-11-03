import Pagination from "@/components/Pagination";
import {revalidateIntervalDay} from "@/lib/utils";
import {initializeApollo} from "../../../lib/apolloInstance";
import React, {useState} from "react";
import parse from "html-react-parser";
import Head from "next/head";
import Blog from "../../../components/blog/Blog";
import {paginationBlogQuery} from "../../../lib/query";


export async function getStaticProps() {

  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: paginationBlogQuery,
    variables: { first: 10 }, // Adjust the number of posts per page
  });

  const response = await fetch(`https://ofcpa.pro/wp-json/rankmath/v1/getHead?url=https://ofcpa.pro/blog`)

  const result = await response.json();

  return {
    props: {
      blogs: data?.posts?.nodes,
      pageInfo: data?.posts?.pageInfo,
      seo: result
    },
    revalidate: revalidateIntervalDay(1),
  };

}



const BlogPage = ({ blogs, pageInfo, seo }) => {
/*
debugger
  return ''*/
/*  const itemsPerPage = parseInt(process.env.NEXT_PUBLIC_BLOG_POST_PER_PAGE_SHOW); // Set the number of blogs per page
  const totalPages = Math.ceil(totalBlogs / itemsPerPage);*/
  const [posts, setPosts] = useState(blogs);

  return (
    <>
      <Head>
        {parse(seo.head)}
      </Head>
      <div className='w-full bg-[#f9fbfe]'>
        <div className="max-w-screen-xl mx-auto pt-10">
          <Blog posts={posts} pageInfo={pageInfo} setPosts={setPosts} query={paginationBlogQuery} />
        </div>
      </div>
    </>
  );
};

export default BlogPage;
