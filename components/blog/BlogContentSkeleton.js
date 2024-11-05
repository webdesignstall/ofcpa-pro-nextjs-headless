// BlogContentSkeleton.js
import React from 'react';

export default function BlogContentSkeleton() {
    return (
        <div className="animate-pulse prose max-w-none md:prose-xl overflow-hidden mb-4">
            <div className="h-8 w-1/3 bg-gray-300 rounded mb-4"></div>
            <div className="h-6 w-1/2 bg-gray-300 rounded mb-4"></div>
            <div className="space-y-4">
                <div className="h-5 w-full bg-gray-300 rounded"></div>
                <div className="h-5 w-11/12 bg-gray-300 rounded"></div>
                <div className="h-5 w-10/12 bg-gray-300 rounded"></div>
                <div className="h-5 w-full bg-gray-300 rounded"></div>
                <div className="h-5 w-2/3 bg-gray-300 rounded"></div>
            </div>
        </div>
    );
}
