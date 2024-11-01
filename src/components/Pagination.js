import React from 'react';
import {useRouter} from "next/router";
import ReactPaginate from 'react-paginate';


const Pagination = ({ currentPage, totalPages }) => {
    const router = useRouter()
    const handlePageClick = ({selected})=> {
        router.push(`/blog/${selected + 1}`);
    }


    return (
        <>
            <ReactPaginate
                breakLabel="..."
                nextLabel="Next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={parseInt(process.env.NEXT_PUBLIC_BLOG_POST_PER_PAGE_SHOW)}
                pageCount={totalPages}
                previousLabel="< Previous"
                renderOnZeroPageCount={null}
                className='pagination'
                forcePage={currentPage - 1}
            />
        </>
    );
};

export default Pagination;