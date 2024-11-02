import {getBlogByCategory, getBlogCount, getPageSeo} from "../../../../lib/api";
import BlogCard from "@/components/BlogCard";
import Pagination from "@/components/Pagination";
import CustomNextSeo from "../../../../components/CustomNextSeo";



export async function getServerSideProps(context) {

  const page = parseInt(context?.params?.page) || 1;
  const category = context?.params?.category;
  const {blogs, count} = await getBlogByCategory(page, parseInt(process.env.NEXT_PUBLIC_BLOG_POST_PER_PAGE_SHOW), category);
  const totalBlogs = count;
  const seo = await getPageSeo('Blog');
  return {
    props: { blogs, page, totalBlogs, seo: seo, slug: category },
  };
}



const BlogPage = ({ blogs, page, totalBlogs, seo, slug }) => {

  const itemsPerPage = parseInt(process.env.NEXT_PUBLIC_BLOG_POST_PER_PAGE_SHOW); // Set the number of blogs per page
  const totalPages = Math.ceil(totalBlogs / itemsPerPage);

  return (
    <>
      <CustomNextSeo seo={seo} slug={'/blog'} />
      <div className='w-full bg-[#f9fbfe]'>
        <div className="max-w-screen-xl mx-auto pt-10">
          <div className="space-y-2">
            {blogs?.map((blog, index) => (
              <BlogCard key={index} blog={blog}/>
            ))}
          </div>

          <div>
            <Pagination currentPage={page} totalPages={totalPages}  url={`category/${slug}/page`}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPage;
