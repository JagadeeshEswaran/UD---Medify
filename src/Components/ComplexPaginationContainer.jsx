import React from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

const ComplexPaginationContainer = ({ position }) => {
  const { meta } = useLoaderData();
  const { pageCount, page } = meta.pagination;

  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (pageNum) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNum);

    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const addPageButton = ({ pageNumber, activeClass }) => {
    return (
      <button
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
        className={`btn btn-xs md:btn-md border-none join-item ${
          activeClass ? " bg-slate-800 border-base-300" : ""
        }`}
      >
        {pageNumber}
      </button>
    );
  };

  const renderPageButtons = () => {
    const pageButtons = [];

    // FIRST BUTTON
    pageButtons.push(addPageButton({ pageNumber: 1, activeClass: page === 1 }));

    // DOTS - 1
    page > 2 &&
      pageButtons.push(
        <button
          className="btn btn-xs md:btn-md border-none join-item "
          key="dot-1"
        >
          ...
        </button>
      );

    // ACTIVE/CURRENT BUTTON
    if (page !== 1 && page !== pageCount) {
      pageButtons.push(
        addPageButton({
          pageNumber: page,
          activeClass: true,
        })
      );
    }

    // DOTS - 2
    page < pageCount - 1 &&
      pageButtons.push(
        <button
          className="btn btn-xs md:btn-md border-none join-item "
          key="dot-2"
        >
          ...
        </button>
      );

    // LAST BUTTON
    pageButtons.push(
      addPageButton({ pageNumber: pageCount, activeClass: page === pageCount })
    );

    return pageButtons;
  };

  if (pageCount < 2) return null;

  return (
    <div
      className={`${position === "start" ? "mt-4" : "mt-16"} flex ${
        position === "start" ? "justify-start" : "justify-end"
      }`}
    >
      <div className="join">
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => {
            let prevPage = page - 1;
            prevPage < 1 && (prevPage = pageCount);
            handlePageChange(prevPage);
          }}
        >
          Prev
        </button>

        {/* DYNAMIC PAGENUMBER BUTTONS */}
        {renderPageButtons()}

        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => {
            let nextPage = page + 1;
            nextPage > pageCount && (nextPage = 1);
            handlePageChange(nextPage);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ComplexPaginationContainer;
