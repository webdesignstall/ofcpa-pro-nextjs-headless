// BlogContent.js
import React from 'react';
import parse from "html-react-parser";

export default function BlogContent({ content }) {
    return (
        <div className="prose max-w-none md:prose-xl prose-tr::border-none lg:prose-strong:text-2xl prose-a:text-blue-600 overflow-hidden">
            {/*<div dangerouslySetInnerHTML={{ __html: content }} />*/}
            {parse(content)}
        </div>
    );
}
