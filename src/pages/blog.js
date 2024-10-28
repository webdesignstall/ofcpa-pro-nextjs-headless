import { useState } from 'react';

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
    <div className="max-w-6xl mx-auto p-4">
      {/* <h1 className="text-3xl font-bold mb-4">OnlyFans Creator Tax Tips & Guides</h1> */}

      <div className="space-y-6">
        {paginatedBlogs.map((blog) => (
          <div key={blog.id} className="p-4 border border-gray-50">
            <h2 className="text-3xl font-semibold py-2 hover:text-blue-600 cursor-pointer duration-200">{blog.title}</h2>
            <p className="text-sm text-gray-500">
              By <span className="font-medium">{blog.author}</span> on {blog.date}
            </p>
            <p className="text-gray-700 mt-2">{blog.description}</p>
            <button className="mt-3 text-blue-500 hover:text-blue-700 font-medium">
              Read More
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-8">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${
            currentPage === 1
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          Previous
        </button>

        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded ${
            currentPage === totalPages
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BlogPage;
