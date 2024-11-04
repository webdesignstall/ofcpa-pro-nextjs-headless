/*
import React from 'react';
import {getBlog, getBlogCount, getPageSeo} from "../../../lib/api";
import {revalidateIntervalDay} from "@/lib/utils";
import BlogCard from "@/components/BlogCard";
import Pagination from "@/components/Pagination";
import CustomNextSeo from "../../../components/CustomNextSeo";

export async function getStaticProps(context) {
    const page = parseInt(context.params.page) || 1; // Get page from params or default to 1
    const blogs = await getBlog(page, parseInt(process.env.NEXT_PUBLIC_BLOG_POST_PER_PAGE_SHOW));
    const totalBlogs = await getBlogCount(); // Get total blog count
    const seo = await getPageSeo('Blog');

    return {
        props: { blogs, page, totalBlogs, seo }, // Pass the total count to the component
        revalidate: revalidateIntervalDay(1),
    };
}

export async function getStaticPaths() {
    const totalBlogs = await getBlogCount(); // Get total blog count
    const itemsPerPage = parseInt(process.env.NEXT_PUBLIC_BLOG_POST_PER_PAGE_SHOW); // Set the number of blogs per page
    const totalPages = Math.ceil(totalBlogs / itemsPerPage);


    // Generate an array of paths based on the total number of pages
    const paths = Array.from({ length: totalPages }, (_, index) => ({
        params: { page: (index + 1).toString() }, // Convert to string for params
    }));

    return { paths, fallback: true }; // Set fallback to false for static pages
}

const BlogPage = ({ blogs, page, totalBlogs, seo }) => {

    const itemsPerPage = parseInt(process.env.NEXT_PUBLIC_BLOG_POST_PER_PAGE_SHOW); // Set the number of blogs per page
    const totalPages = Math.ceil(totalBlogs / itemsPerPage);

    return (
        <>
            <CustomNextSeo seo={seo} slug={'/blog'}/>
            <div>
                <div className='w-full bg-[#f9fbfe]'>
                    <div className="max-w-screen-xl mx-auto pt-10">
                        <div className="space-y-6">
                            {blogs?.map((blog, index) => (
                                <BlogCard key={index} blog={blog}/>
                            ))}
                        </div>
                            
                        <div>
                            <Pagination currentPage={page} totalPages={totalPages} url={'blog'} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogPage;*/











import Pagination from "@/components/Pagination";
import {revalidateIntervalDay} from "@/lib/utils";
import {initializeApollo} from "../../../lib/apolloInstance";
import React, {useState} from "react";
import parse from "html-react-parser";
import Head from "next/head";
import Blog from "../../../components/blog/Blog";
import {
    allPosts,
    GET_ALL_ITEMS,
    GET_PAGINATED_ITEMS,
    GET_TOTAL_POST_COUNT, GET_TOTAL_PUBLISHED_POSTS,
    paginationBlogQuery
} from "../../../lib/query";
import BlogCard from "@/components/BlogCard";
import ReactPaginate from "react-paginate";
import {useRouter} from "next/router";
import CustomPagination from "../../../components/CustomPagination";

/*
export async function getStaticProps() {

  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: paginationBlogQuery,
    variables: { first: 10 }, // Adjust the number of posts per page
  });

  const { data: totalPost } = await apolloClient.query({
    query: allPosts,
    variables: { first: 1000 },
  });

  const response = await fetch(`https://ofcpa.pro/wp-json/rankmath/v1/getHead?url=https://ofcpa.pro/blog`)

  const result = await response.json();

  return {
    props: {
      blogs: data?.posts?.nodes,
      pageInfo: data?.posts?.pageInfo,
      seo: result,
      totalPost: totalPost.posts.nodes.length
    },
    revalidate: revalidateIntervalDay(1),
  };

}*/

export async function getStaticPaths() {
    const response = await fetch(`https://ofcpa.pro/wp-json/wp/v2/posts?per_page=10&page=1&_embed`);
    const totalPosts = response.headers.get('X-WP-Total');
    const postsPerPage = 10;
    const totalPages = Math.ceil(totalPosts / postsPerPage);

    // Create paths for each page
    const paths = Array.from({ length: totalPages }, (_, i) => ({
        params: { page: (i + 1).toString() }, // Convert page number to string
    }));

    return {
        paths,
        fallback: false, // Use 'blocking' to generate pages on request if not pre-generated
    };
}



/*export async function getServerSideProps({ params }) {
    const apolloClient = initializeApollo();
    const page = parseInt(params.page, 10) || 1;
    const itemsPerPage = 10;

    // Calculate the cursor based on the page number
    let after = null;

    if (page > 1) {
        for (let i = 1; i < page; i++) {
            const { data: paginationData } = await apolloClient.query({
                query: GET_PAGINATED_ITEMS,
                variables: { first: itemsPerPage, after },
            });
            after = paginationData.posts.pageInfo.endCursor;
        }
    }

    const { data } = await apolloClient.query({
        query: GET_PAGINATED_ITEMS,
        variables: { first: itemsPerPage, after },
    });

    const { data: totalPostCount } = await apolloClient.query({ query: GET_TOTAL_PUBLISHED_POSTS });
    const totalCount = totalPostCount.totalPublishedPosts;

    const totalPages = Math.ceil(totalCount / itemsPerPage);

    return {
        props: {
            posts: data.posts.nodes,
            pageCount: totalPages,
            currentPage: page,
        },
        // revalidate: revalidateIntervalDay(1),
    };
}*/


export async function getStaticProps({ params }) {
    let postData;
    let totalPages = 0
    try {
     /*   const response = await fetch(`https://ofcpa.pro/wp-json/wp/v2/posts?per_page=10&page=${params.page}`);
        const totalPosts = response.headers.get('X-WP-Total');
        const postsPerPage = 10;
        const totalPages = Math.ceil(totalPosts / postsPerPage);

        console.log(`Total Pages: ${totalPages}`);*/

        const response = await fetch(`https://ofcpa.pro/wp-json/wp/v2/posts?per_page=10&page=${params.page}&_embed`);
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
                ? post._embedded['wp:term'][0].map(cat => ({ id: cat.id, name: cat.name, slug: cat.name }))
                : []
        }));

        postData = filteredPost



    } catch (error) {
        console.error('Error fetching posts:', error);
        postData = []; // Set to an empty array in case of an error to avoid undefined issues
    }



    return {
        props: {
            posts: postData,
            pageCount: totalPages,
            currentPage: params.page,
        },
        revalidate: revalidateIntervalDay(1)
    };
}




// { blogs, pageInfo, seo, totalPost }

const BlogPage = ({ posts, pageCount, currentPage }) => {

 /*   debugger
    return*/
    const router = useRouter();

    /*const handlePageChange = ({ selected }) => {
        const newPage = selected + 1;
        router.push(`/blog/${newPage}`);
    };*/

    return (
        <div className="w-full bg-[#f9fbfe]">
            <div className="max-w-screen-xl mx-auto pt-10">
                <div className="space-y-2">
                    {posts?.map((blog, index) => (
                        <BlogCard key={index} blog={blog} />
                    ))}
                </div>
                {/*<ReactPaginate
                    breakLabel="..."
                    nextLabel="Next >"
                    onPageChange={handlePageChange}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< Previous"
                    className="pagination"
                    forcePage={currentPage - 1}
                />*/}
                <CustomPagination pageCount={pageCount} url={'blog'} page={currentPage}/>
            </div>
        </div>
    );
};

export default BlogPage;





