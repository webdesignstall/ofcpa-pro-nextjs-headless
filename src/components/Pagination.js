import React from 'react';
import { useRouter } from "next/router";
import ReactPaginate from 'react-paginate';

const Pagination = ({ currentPage, totalPages, url }) => {
    const router = useRouter();

    const handlePageClick = ({ selected }) => {
        const page = selected + 1;
        router.push(`/${url}/${page}`);
    };

    return (
        <ReactPaginate
            breakLabel="..."
            nextLabel="Next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={totalPages}
            previousLabel="< Previous"
            className="pagination"
            forcePage={currentPage - 1}
        />
    );
};

export default Pagination;
