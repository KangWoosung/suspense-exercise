/*  2024-08-03 03:09:35


*/

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  currentDatasetRange: { start: number; end: number };
  totalItems: number;
};

import React from "react";

const maxPagesToShow = 5; // 한 번에 보여줄 최대 페이지 수

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  currentDatasetRange,
  totalItems,
}) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    console.log(currentDatasetRange, totalItems);

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-3 py-1 mx-1 rounded-md transition-colors duration-300 ${
            currentPage === i
              ? "bg-indigo-900 text-white"
              : "bg-white text-indigo-900 hover:bg-indigo-100"
          }`}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="flex justify-center items-center space-x-2">
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-md bg-white text-indigo-900 hover:bg-indigo-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        &lt;&lt;
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-md bg-white text-indigo-900 hover:bg-indigo-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        &lt;
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded-md bg-white text-indigo-900 hover:bg-indigo-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        &gt;
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded-md bg-white text-indigo-900 hover:bg-indigo-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        &gt;&gt;
      </button>
    </div>
  );
};

export default Pagination;
