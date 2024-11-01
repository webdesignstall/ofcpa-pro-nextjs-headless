import React from 'react'
import BlogBody from "@/components/BlogContent";
import Link from "next/link";
import moment from "moment";

export default function Blog({blog}) {


    return (
        <div style={{overflow:"hidden"}}>


            <Link style={{marginTop: '20px', display: 'block'}} className='text-blue-500 mt-4' href={`/category/${blog?.category?.slug}`}>
                <p>{blog?.category?.name}</p>
            </Link>

            <h1 className='text-2xl md:text-4xl font-bold leading-10 py-4'>{ blog?.title }</h1>

            <p>By <Link className='text-blue-500' href={`/author/${blog?.author}`}>_{blog?.author}_</Link>  {moment(blog?.date).format('LL')} <Link href='#comment'>Write a Comment</Link> </p>

            <div className="prose max-w-none md:prose-xl prose-tr::border-none lg:prose-strong:text-2xl prose-a:text-blue-600 overflow-hidden">
                <BlogBody content={blog?.content}/>
            </div>
        </div>
    )
}
