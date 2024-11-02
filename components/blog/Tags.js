import React, { useState } from 'react';

const TagSection = () => {
  const [tags, setTags] = useState([
    'Asset Protection for Content Creators',
    'Business Entity Formation Tips',
    'Content Creator Asset Preservation',
    'Content creator insurance',
    'Expert Asset Protection Guidance',
    'Financial Stability for Creators',
    'Intellectual Property Protection',
    'Prenuptial Agreements in Content Creation',
    'The OnlyFans Accountant',
    'Trusts for Asset Protection',
    'Wealth Preservation Strategies',
  ]);

  return (
    <div className="p-4 flex border-t">
      <div className="flex flex-wrap gap-3">
        <span className='className=" px-3 py-1 rounded-lg text-lg font-normal cursor-pointer transition-all duration-200"'>
        Tagged In
        </span>
        {tags.map((tag, index) => (
          <span
            key={index}
            className="bg-blue-50 text-sky-800 px-3 py-1 rounded-lg text-lg font-normal hover:bg-sky-800 hover:text-white cursor-pointer transition-all duration-200"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TagSection;
