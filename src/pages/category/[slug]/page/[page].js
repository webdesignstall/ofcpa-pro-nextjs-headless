import {revalidateIntervalDay} from "@/lib/utils";
import parse from "html-react-parser";
import Head from "next/head";
import {initializeApollo} from "../../../../../lib/apolloInstance";
import {
    CATEGORY_SLUGS_QUERY,
    GET_TOTAL_POST_COUNT_BY_CATEGORY
} from "../../../../../lib/query";
import Blog from "../../../../../components/blog/Blog";


export async function getStaticPaths() {
    const apolloClient = initializeApollo();

    // Fetch authors from your GraphQL endpoint
    const { data: categoriesData } = await apolloClient.query({
        query: CATEGORY_SLUGS_QUERY,
    });

    const categories = categoriesData.categories.nodes;
    const itemsPerPage = parseInt(process.env.NEXT_PUBLIC_BLOG_POST_PER_PAGE_SHOW) || 10; // Set your items per page
    const paths = [];

    for (const category of categories) {
        const decodedId = parseInt(atob(category.id).split(':')[1], 10);
        // Get the total number of posts for each author
        const { data: totalPostByCategory } = await apolloClient.query({
            query: GET_TOTAL_POST_COUNT_BY_CATEGORY,
            variables: { categoryId: decodedId }, // Ensure this is correct according to your schema
        });

        const totalPosts = parseInt(totalPostByCategory.totalPublishedPostsByCategory); // Adjust according to your API response
        const totalPages = Math.ceil(totalPosts / itemsPerPage); // Calculate total pages

        // Generate paths for each page
        for (let page = 1; page <= totalPages; page++) {
            paths.push({
                params: { slug: category.slug, page: page.toString() }, // Ensure page is a string
            });
        }
    }

    return {
        paths,
        fallback: false, // No fallback; 404 for any paths not generated
    };
}


export async function getStaticProps({ params }) {

    let postData;
    let totalPages = 0;
    let totalPosts = 0;

    const apolloClient = initializeApollo();

    // Fetch authors from your GraphQL endpoint
    const { data: categoriesData } = await apolloClient.query({
        query: CATEGORY_SLUGS_QUERY,
    });

    const category = categoriesData.categories.nodes?.find((cat) => cat.slug === params.slug.toLowerCase());

    if (!category) {
        return {
            notFound: true,
        };
    }

    // const decodedId = parseInt(atob(category.id).split(':')[1], 10);
    try {
        // Adjust the fetch URL to include pagination
        const page = parseInt(params.page) || 1; // Default to page 1 if undefined
        const response = await fetch(`https://ofcpa.pro/wp-json/wp/v2/posts?per_page=10&page=${page}&categories=${category?.categoryId}&_embed`);
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

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/wp-json/rankmath/v1/getHead?url=${process.env.NEXT_PUBLIC_BACKEND_URL}/category/${params.slug}`);
    const result = await response.json();

    return {
        props: {
            posts: postData,
            pageCount: totalPages,
            seo: result,
            currentPage: params.page,
            category,
            totalPosts,
            slug: params.slug,
        },
        revalidate: revalidateIntervalDay(1),
    };
}

const AuthorPost = ({ posts, pageCount, seo, slug, category, totalPosts, currentPage}) => {


    return (
        <>
            {
                seo?.head && <Head>
                    {parse(seo.head)}
                </Head>
            }


            <div className="bg-[#e9f1fa] p-10">
                <div className='max-w-screen-xl mx-auto'>
                    <h1 className='text-4xl font-bold'>{category?.name}</h1>
                    <p className='italic'>Showing {totalPosts && posts?.length} of {totalPosts}</p>
                </div>
            </div>

            <Blog posts={posts} pageCount={pageCount} currentPage={currentPage} url={`category/${slug}/page`}
                  page={['/category/[slug]', '/category/[slug]/[page]']}/>
        </>
    );
};

export default AuthorPost;