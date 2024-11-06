import ReactPaginate from "react-paginate";
import "./Pagination.css";
// Example items, to simulate fetching from another resources.
const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

export default function PaginatedItems({ itemsPerPage,total, data, setPage }) {
  const pageCount = total / itemsPerPage;

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">>"
        onPageChange={(e) => setPage(e.selected + 1)}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="<<"
        renderOnZeroPageCount={null}
        containerClassName="custom-pagination"
        pageLinkClassName="pagination-tag-anchor"
        // activeLinkClassName="btn bg-danger"
      />
    </>
  );
}
