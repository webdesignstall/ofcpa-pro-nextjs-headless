import Link from 'next/link';

function CustomPagination({ pageCount, pageRangeDisplayed = 2, url, page = '1' }) {
    // const router = useRouter();
    const currentPage = parseInt(page);

    // Generate page numbers based on page count
    const pageNumbers = Array.from({ length: pageCount }, (_, i) => i + 1);

    // Calculate the visible page range around the current page
    const startPage = Math.max(currentPage - pageRangeDisplayed, 2); // Ensure start page doesn't overlap the first page
    const endPage = Math.min(currentPage + pageRangeDisplayed, pageCount - 1); // Ensure end page doesn't overlap the last page
    const visiblePages = pageNumbers.slice(startPage - 1, endPage);

    // Utility functions to determine next/previous pages
    const prevPage = currentPage > 1 ? currentPage - 1 : null;
    const nextPage = currentPage < pageCount ? currentPage + 1 : null;

    return (
        <div className="pagination">
            {/* Previous Button */}
            {prevPage ? (
                <Link href={`/${url}/${prevPage}`} passHref>
                    <span className="pagination-button">{"< Previous"}</span>
                </Link>
            ) : (
                <span className="pagination-button disabled">{"< Previous"}</span>
            )}

            {/* First Page */}
            <Link href={`/${url}/1`} passHref>
                <span className={`pagination-button ${currentPage === 1 ? 'active' : ''}`}>1</span>
            </Link>

            {/* Dots before the visible range if necessary */}
            {startPage > 2 && <span className="pagination-dots">...</span>}

            {/* Visible Page Range */}
            {visiblePages.map((page) => (
                <Link href={`/${url}/${page}`} key={page} passHref>
                    <span
                        className={`pagination-button ${
                            page === currentPage ? 'active' : ''
                        }`}
                    >
                        {page}
                    </span>
                </Link>
            ))}

            {/* Dots after the visible range if necessary */}
            {endPage < pageCount - 1 && <span className="pagination-dots">...</span>}

            {/* Last Page */}
            {pageCount > 1 && (
                <Link href={`/${url}/${pageCount}`} passHref>
                    <span className={`pagination-button ${currentPage === pageCount ? 'active' : ''}`}>
                        {pageCount}
                    </span>
                </Link>
            )}

            {/* Next Button */}
            {nextPage ? (
                <Link href={`/${url}/${nextPage}`} passHref>
                    <span className="pagination-button">{"Next >"}</span>
                </Link>
            ) : (
                <span className="pagination-button disabled">{"Next >"}</span>
            )}

            {/* Styles for the pagination buttons */}
            <style jsx>{`
                .pagination {
                    display: flex;
                    gap: 8px;
                    margin: 16px;
                    justify-content: left;
                    align-items: center;
                }
                .pagination-button {
                    padding: 8px 12px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    text-decoration: none;
                    color: #0070f3;
                    transition: background-color 0.3s;
                }
                .pagination-button.active {
                    font-weight: bold;
                    color: white;
                    background-color: #0070f3;
                }
                .pagination-button.disabled {
                    color: #ccc;
                    pointer-events: none;
                }
                .pagination-button:hover:not(.active):not(.disabled) {
                    background-color: #e2e2e2;
                }
                .pagination-dots {
                    padding: 8px;
                    color: #999;
                }
            `}</style>
        </div>
    );
}

export default CustomPagination;