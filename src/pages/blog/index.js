import {revalidateIntervalDay} from "@/lib/utils";
import Head from "next/head";
import parse from "html-react-parser";

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

          return (
              <>
                {
                    seo?.head && <Head>
                      {parse(seo.head)}
                    </Head>
                }

                <Blog posts={posts} pageCount={pageCount} url={'blog'}/>
              </>

          );
};

export default BlogHomePage;
