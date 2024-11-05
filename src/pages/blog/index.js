import {revalidateIntervalDay} from "@/lib/utils";

import BlogCard from "@/components/BlogCard";

import CustomPagination from "../../../components/CustomPagination";
import Head from "next/head";
import parse from "html-react-parser";
import BlogCardSkeleton from "../../../components/blog/BlogCardSkeleton";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import useLoading from "@/hooks/useLoading";
import BlogContentSkeleton from "../../../components/blog/BlogContentSkeleton";
import Blog from "../../../components/blog/Blog";

export async function getStaticProps() {

  let postData;
  let totalPages = 0
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/wp-json/wp/v2/posts?per_page=10&page=1&_embed`);
    const posts = await response.json();
    const totalPosts = response.headers.get('X-WP-Total');
    const postsPerPage = 10;
    totalPages = Math.ceil(totalPosts / postsPerPage);

    const filteredPost = posts.map(post => ({
      id: post.id,
      title: post.title.rendered,
      slug: post.slug,
      excerpt: post?.excerpt?.rendered,
      date: post.date,
      author: {
        name: post._embedded.author ? post._embedded.author[0].name : null,
        slug: post._embedded.author ? post._embedded.author[0].slug : null
      },
      categories: post._embedded['wp:term']
          ? post._embedded['wp:term'][0].map(cat => ({ id: cat.id, name: cat.name, slug: cat.slug }))
          : []
    }));

    postData = filteredPost



  } catch (error) {
    console.error('Error fetching posts:', error);
    postData = [];
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/wp-json/rankmath/v1/getHead?url=${process.env.NEXT_PUBLIC_BACKEND_URL}/blog`)

  const seo = await response.json();

  return {
    props: {
      posts: postData,
      pageCount: totalPages,
      seo
    },
    revalidate: revalidateIntervalDay(1),
  };
}


const BlogHomePage = ({ posts, pageCount, seo }) => {

 /* const loading = useLoading(["/blog", "/blog/[page]"]);
  const authorBlogLoading = useLoading(["/author", "/author/[slug]"]);
  const categoryBlogLoading = useLoading(["/category", "/category/[slug]"]);
  const singlePostLoading = useLoading(["/[slug]"]);

  if (authorBlogLoading) {
    return (
        <>
          <div className="w-full bg-[#f9fbfe]">
            <div className="max-w-screen-xl mx-auto pt-10">
              <div className="space-y-2">
                <BlogCardSkeleton/>
                <BlogCardSkeleton/>
                <BlogCardSkeleton/>
              </div>
            </div>
          </div>
        </>
    )
  }
  if (categoryBlogLoading) {
    return (
        <>
          <div className="w-full bg-[#f9fbfe]">
            <div className="max-w-screen-xl mx-auto pt-10">
              <div className="space-y-2">
                <BlogCardSkeleton/>
                <BlogCardSkeleton/>
                <BlogCardSkeleton/>
              </div>
            </div>
          </div>
        </>
    )
  }

  if (singlePostLoading) {
    return (
        <>
          <div className='bg-gray-50 py-16 '>
            <div className='px-4 md:p-12 max-w-[1140px] m-auto bg-white'>
          <BlogContentSkeleton/>
          <BlogContentSkeleton/>
          </div>
          </div>
          </>
          )
        }*/

          return (
          <>
            <Head>
              {parse(seo.head)}
            </Head>

            <Blog posts={posts} pageCount={pageCount} url={'blog'}/>
           {/* <CustomPagination pageCount={pageCount} url={'blog'}/>*/}

            {/*<div className="w-full bg-[#f9fbfe]">
              <div className="max-w-screen-xl mx-auto pt-10">
                <div className="space-y-2">
                  {
                    loading ?
                        <>
                          <BlogCardSkeleton/>
                          <BlogCardSkeleton/>
                          <BlogCardSkeleton/>
                        </>
                        :
                        posts?.map((blog, index) => (
                            <BlogCard key={index} blog={blog}/>
                        ))
                  }
                </div>

                <CustomPagination pageCount={pageCount} url={'blog'}/>
              </div>
            </div>*/}
          </>

          );
          };

          export default BlogHomePage;
