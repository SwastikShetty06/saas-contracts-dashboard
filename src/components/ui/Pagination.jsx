import React from 'react';

const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  const handlePageClick = (page) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  return (
    <div className="flex justify-center items-center space-x-2 mt-6">
      <button 
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-md bg-white border border-slate-300 text-slate-600 disabled:opacity-50"
      >
        Prev
      </button>
      <span className="text-slate-600">
        Page {currentPage} of {totalPages}
      </span>
      <button 
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded-md bg-white border border-slate-300 text-slate-600 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
