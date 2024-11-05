import React from 'react';

// Skeleton loading styles
const skeletonStyle = "bg-gray-200 animate-pulse rounded";

const BlogCardSkeleton = () => {
    return (
        <div className='px-4 py-4 lg:px-0'>
            <div className="px-4 py-10 lg:p-10 border border-gray-50 bg-white">
                {/* Category Skeleton */}
                <div className={`${skeletonStyle} h-4 w-24 mb-3`} />

                {/* Title Skeleton */}
                <div className={`${skeletonStyle} h-8 w-full mb-3`} />
                <div className={`${skeletonStyle} h-8 w-3/4 mb-3`} />

                {/* Date and Author Skeleton */}
                <div className="flex items-center gap-2 mb-4">
                    <div className={`${skeletonStyle} h-4 w-16`} />
                    <div className={`${skeletonStyle} h-4 w-20`} />
                </div>

                {/* Excerpt Skeleton */}
                <div className={`${skeletonStyle} h-4 w-full mb-2`} />
                <div className={`${skeletonStyle} h-4 w-5/6 mb-2`} />
                <div className={`${skeletonStyle} h-4 w-3/4 mb-2`} />

                {/* Button Skeleton */}
                <div className='border-t border-gray-200 py-3'>
                    <div className={`${skeletonStyle} h-8 w-24`} />
                </div>
            </div>
        </div>
    );
};

export default BlogCardSkeleton;
