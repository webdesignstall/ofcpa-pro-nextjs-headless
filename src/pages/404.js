// app/404.js
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[85vh]">
      {/* Error Icon with Animation */}
      <div data-aos="fade-up" className="mb-6 text-red-500 animate-pulse">
        <AlertTriangle size={80} strokeWidth={1.5} />
      </div>

      {/* Error Heading */}
      <h1
        data-aos="fade-up"
        className="text-5xl font-semibold text-gray-800 mb-4 text-center"
      >
        404 - Page Not Found
      </h1>

      {/* Error Message */}
      <p
        data-aos="fade-up"
        className="text-lg text-gray-600 mb-8 text-center max-w-lg"
      >
        Oops! The page you are looking for does not exist or may have been moved.
      </p>

      {/* Back to Homepage Button */}
      <Link
        href="/"
        data-aos="fade-up"
        className="px-6 py-3 bg-sky-800 text-white font-semibold duration-200 rounded-md shadow-lg hover:bg-sky-900 transition-colors"
      >
        Go back to the homepage
      </Link>
    </div>
  );
}
