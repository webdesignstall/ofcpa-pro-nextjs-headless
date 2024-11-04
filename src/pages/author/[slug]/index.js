import {revalidateIntervalDay} from "@/lib/utils";

import parse from "html-react-parser";
import Head from "next/head";
import BlogCard from "@/components/BlogCard";
import {initializeApollo} from "../../../../lib/apolloInstance";
import {GET_AUTHORS, GET_TOTAL_POST_COUNT_BY_AUTHOR} from "../../../../lib/query";
import CustomPagination from "../../../../components/CustomPagination";



export async function getStaticPaths() {
    const apolloClient = initializeApollo();

    // Fetch authors from your GraphQL endpoint
    const { data: authorsData } = await apolloClient.query({
        query: GET_AUTHORS,
    });

    const authors = authorsData.users.nodes;
    const itemsPerPage = parseInt(process.env.NEXT_PUBLIC_BLOG_POST_PER_PAGE_SHOW) || 10; // Set your items per page
    const paths = [];

    for (const author of authors) {
        const decodedId = parseInt(atob(author.id).split(':')[1], 10);
        // Get the total number of posts for each author
        const { data: totalPostByAuthor } = await apolloClient.query({
            query: GET_TOTAL_POST_COUNT_BY_AUTHOR,
            variables: { authorId: decodedId }, // Ensure this is correct according to your schema
        });

        const totalPosts = parseInt(totalPostByAuthor.totalPublishedPostsByAuthor); // Adjust according to your API response
        const totalPages = Math.ceil(totalPosts / itemsPerPage); // Calculate total pages

        // Generate paths for each page
        for (let page = 1; page <= totalPages; page++) {
            paths.push({
                params: { slug: author.slug, page: page.toString() }, // Ensure page is a string
            });
        }
    }

    return {
        paths,
        fallback: false, // No fallback; 404 for any paths not generated
    };
}


export async function getStaticProps({ params }) {
    const apolloClient = initializeApollo();

    const { data } = await apolloClient.query({
        query: GET_AUTHORS,
    });

    const user = data.users.nodes.find((user) => user.slug === params.slug);
    if (!user) {
        return {
            notFound: true,
        };
    }

    const decodedId = parseInt(atob(user.id).split(':')[1], 10);

    let postData;
    let totalPages = 0;

    try {
        // Adjust the fetch URL to include pagination
        const page = parseInt(params.page) || 1; // Default to page 1 if undefined
        const response = await fetch(`https://ofcpa.pro/wp-json/wp/v2/posts?per_page=10&page=${page}&author=${decodedId}&_embed`);
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

        postData = filteredPost;

    } catch (error) {
        console.error('Error fetching posts:', error);
        postData = [];
    }

    const response = await fetch(`https://ofcpa.pro/wp-json/rankmath/v1/getHead?url=https://ofcpa.pro/author/${params.slug}`);
    const result = await response.json();

    return {
        props: {
            posts: postData,
            pageCount: totalPages,
            seo: result,
            slug: params.slug
        },
        revalidate: revalidateIntervalDay(1),
    };
}


const AuthorPost = ({ posts, pageCount, seo, slug}) => {

    return (
        <>
            <Head>
                {parse(seo.head)}
            </Head>

            <div className="w-full bg-[#f9fbfe]">
                <div className="max-w-screen-xl mx-auto pt-10">
                    <div className="space-y-2">
                        {posts?.map((blog, index) => (
                            <BlogCard key={index} blog={blog}/>
                        ))}
                    </div>
                    <CustomPagination pageCount={pageCount} url={`author/${slug}/page`} />
                </div>
            </div>s
        </>
    );
};

export default AuthorPost;