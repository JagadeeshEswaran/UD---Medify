import React from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

const PaginationContainer = ({ position }) => {
  const { meta } = useLoaderData();
  const { pageCount, page } = meta.pagination;

  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (pageNum) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNum);

    navigate(`${pathname}?${searchParams.toString()}`);
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

        {pages.map((item) => (
          <button
            key={item}
            onClick={() => handlePageChange(item)}
            className={`btn btn-xs md:btn-md border-none join-item ${
              item === page ? " bg-slate-800 border-base-300" : ""
            }`}
          >
            {item}
          </button>
        ))}

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

export default PaginationContainer;
