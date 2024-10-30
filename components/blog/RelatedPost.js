// components/RelatedPosts.js
import React from 'react';

const RelatedPosts = () => {
    const posts = [
        {
            title: 'How to Leverage Self-Employed Tax Credit for Your OnlyFans Income',
            date: 'August 27, 2024',
            category: 'Accounting and Tax',
        },
        {
            title: 'Safeguard Your Finances: Expert Tips for Error-Free Tax Filing as a Content Creator',
            date: 'March 7, 2024',
            category: 'Accounting and Tax',
        },
        {
            title: 'Maximizing Business Growth: Unleash the Power of Tax Deductions for Content Creators',
            date: 'October 19, 2023',
            category: 'Accounting and Tax',
        },
    ];

    return (
        <div className=''>
            <section className="">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">Related Posts</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 cursor-pointer">
                    {posts.map((post, index) => (
                        <div
                            key={index}
                            className=" p-4"
                        >
                            <div className="h-64 rounded-md mb-4 bg-sky-50"></div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-blue-700 cursor-pointer duration-200">{post.title}</h3>
                            <p className="text-sm text-gray-500 mb-1">{post.date}</p>
                            <p className="text-sm text-gray-500">{post.category}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default RelatedPosts;
