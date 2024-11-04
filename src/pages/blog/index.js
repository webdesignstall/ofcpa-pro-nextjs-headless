import {revalidateIntervalDay} from "@/lib/utils";

import BlogCard from "@/components/BlogCard";

import CustomPagination from "../../../components/CustomPagination";

export async function getStaticProps() {

  let postData;
  let totalPages = 0
  try {
    const response = await fetch(`https://ofcpa.pro/wp-json/wp/v2/posts?per_page=10&page=1&_embed`);
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

  return {
    props: {
      posts: postData,
      pageCount: totalPages
    },
    revalidate: revalidateIntervalDay(1),
  };
}


const BlogHomePage = ({ posts, pageCount }) => {

  return (
      <div className="w-full bg-[#f9fbfe]">
        <div className="max-w-screen-xl mx-auto pt-10">
          <div className="space-y-2">
            {posts?.map((blog, index) => (
                <BlogCard key={index} blog={blog} />
            ))}
          </div>

          <CustomPagination pageCount={pageCount} url={'blog'}/>
        </div>
      </div>
  );
};

export default BlogHomePage;
