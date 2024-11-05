import {revalidateIntervalDay} from "@/lib/utils";

import parse from "html-react-parser";
import Head from "next/head";
import {initializeApollo} from "../../../../lib/apolloInstance";
import {GET_AUTHORS, GET_TOTAL_POST_COUNT_BY_AUTHOR} from "../../../../lib/query";
import Blog from "../../../../components/blog/Blog";



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

    // const decodedId = parseInt(atob(user.id).split(':')[1], 10);

    let postData;
    let totalPages = 0;
    let totalPosts = 0;

    try {
        // Adjust the fetch URL to include pagination
        const page = parseInt(params.page) || 1; // Default to page 1 if undefined
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/wp-json/wp/v2/posts?per_page=10&page=${page}&author=${user?.userId}&_embed`);
        const posts = await response.json();
        totalPosts = response.headers.get('X-WP-Total');
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

        postData = filteredPost;

    } catch (error) {
        console.error('Error fetching posts:', error);
        postData = [];
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/wp-json/rankmath/v1/getHead?url=${process.env.NEXT_PUBLIC_BACKEND_URL}/author/${params.slug}`);
    const result = await response.json();

    return {
        props: {
            posts: postData,
            pageCount: totalPages,
            seo: result,
            slug: params.slug,
            user,
            totalPosts
        },
        revalidate: revalidateIntervalDay(1),
    };
}


const AuthorPost = ({ posts, pageCount, seo, slug, user, totalPosts}) => {


    return (
        <>
            {
                seo?.head && <Head>
                    {parse(seo.head)}
                </Head>
            }


            <div className="bg-[#e9f1fa] p-10">
                <div className='max-w-screen-xl mx-auto'>
                    <h1 className='text-4xl font-bold'>{user?.name}</h1>
                    <p className='italic'>Showing {posts?.length} of {totalPosts}</p>
                </div>
            </div>

            <Blog posts={posts} pageCount={pageCount} url={`author/${slug}/page`}
                  page={['/author/[slug]', '/author/[slug]/[page]']}/>
        </>
    );
};

export default AuthorPost;