import React from 'react'
import RelatedPosts from '../../components/blog/RelatedPost'
import BreadcrumbHeader from '../../components/blog/Breadcrumb'
import Blog from '../../components/blog'


export default function BlogDetails() {
    return (
        <div>
            <div className='bg-gray-50 py-16 '>
                <div className='p-12 max-w-7xl m-auto bg-white'>
                    <div className=''>
                        <BreadcrumbHeader />
                    </div>
                    <div>
                        <Blog />
                    </div>
                    <div>
                        <RelatedPosts />
                    </div>
                </div>
            </div>
        </div>
    )
}
