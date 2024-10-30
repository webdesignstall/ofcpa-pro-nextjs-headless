import { useState } from 'react';
import PaginationFooter from '../../components/blog/Pagination';

const BlogPage = () => {
  const postsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const blogs = [
    {
      id: 1,
      title: "Income Tracker for OnlyFans Creators: Tax Tips & Compliance Guide",
      author: "_ofcpa_",
      date: "October 21, 2024",
      description:
        "As an OnlyFans creator, managing your income and staying on top of taxes can be overwhelming. Whether you’re just starting out or already earning a steady monthly income, knowing how [...]",
    },
    {
      id: 2,
      title: "Excess Social Security Tax Withheld? Tax Tips for OnlyFans Creators",
      author: "_ofcpa_",
      date: "October 21, 2024",
      description:
        "Managing taxes can be a challenge for any self-employed individual, but it becomes particularly nuanced for OnlyFans creators. If you’ve experienced excess Social Security tax withheld, you may be eligible [...]",
    },
    {
      id: 3,
      title: "2024 Tax Guide: Essential Tips for OnlyFans Creators",
      author: "_ofcpa_",
      date: "October 21, 2024",
      description:
        "If you’re an OnlyFans creator, managing your finances can get tricky, especially when it comes to taxes. Understanding how to file taxes correctly will not only help you avoid penalties [...]",
    }
  ];

  const totalPages = Math.ceil(blogs.length / postsPerPage);
  const paginatedBlogs = blogs.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      <div className='w-full bg-gray-50 px-6'>
        <div className="max-w-screen-xl mx-auto p-4">
          {/* <h1 className="text-3xl font-bold mb-4">OnlyFans Creator Tax Tips & Guides</h1> */}

          <div className="space-y-6">
            {paginatedBlogs.map((blog) => (
              <div key={blog.id} className="p-12 border border-gray-50 my-14 bg-white">
                <p>Accounting and tex</p>
                <h2 className="text-4xl font-bold leading-relaxed py-2 hover:text-blue-600 cursor-pointer duration-200">{blog.title}</h2>
                <p className="text-sm text-gray-500 py-3">
                  By <span className="font-medium">{blog.author}</span> on {blog.date}
                </p>
                <p className="text-gray-700 mt-2 pb-8">{blog.description}</p>
                <div className='border-t border-gray-200 py-3'>
                  <button className="mt-3 text-blue-500 hover:text-blue-700 font-normal text-lg">
                    Read More <span></span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div>
            <PaginationFooter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
