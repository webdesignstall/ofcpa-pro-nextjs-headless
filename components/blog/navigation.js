import React, { useState } from 'react';

const articles = [
    'Maximizing Business Growth: Unleash the Power of Tax Deductions for Content Creators',
    'Navigating Global Growth: Reducing Tax Liability for Expanding Content Creators',
    'Building Financial Security: Strategies for Stable Growth for Content Creators',
    'Expanding Revenue Streams: Tax Optimization for Content Entrepreneurs',
];

const ArticleNavigation = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        if (currentIndex < articles.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <div className="flex flex-col items-center p-8 bg-blue-100 rounded-lg mt-16">
            <div className="flex w-full justify-between items-center">
                <div>
                    <p className='text-xl py-3'>
                        Maximizing Business Growth: Unleash the Power of Tax Deductions for Content Creators
                    </p>
                    <button
                        onClick={handlePrevious}
                        disabled={currentIndex === 0}
                        className="text-blue-600 hover:text-blue-800 disabled:text-gray-400 flex items-center"
                    >
                        <span className="mr-2">←</span> Previous
                    </button>
                </div>
                <div className='flex justify-end flex-col'>
                    <p className='text-xl py-3 text-right'>
                        Navigating Global Growth: Reducing Tax Liability for Expanding Content Creators
                    </p>
                    <button
                        onClick={handleNext}
                        disabled={currentIndex === articles.length - 1}
                        className="text-blue-600 hover:text-blue-800 disabled:text-gray-400 flex items-end justify-end"
                    >
                        Next <span className="ml-2">→</span>
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ArticleNavigation;
