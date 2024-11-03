// app/404.js
import React from 'react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-8">Oops! The page you are looking for does not exist.</p>
      <a href="/" className="text-blue-500 hover:underline">
        Go back to the homepage
      </a>
    </div>
  );
}
