import React from "react";

const Pagination = ({ TotalPages, page, setPage }) => {
  // --------------------------------

  const handlePagination = (page) => {
    setPage(page); // update page
  };

  // --------------------------------

  return (
    <>
      <div className="flex justify-center flex-wrap my-[2rem] sm:my-[1rem]">
        <nav className="flex space-x-2" aria-label="Pagination">
          <button
            onClick={() => setPage((next) => next - 1)}
            className={` 
                 relative inline-flex items-center px-4 py-2 text-sm
                 ${
                   page <= 1
                     ? "disabled:bg-slate-50 disabled:text-slate-500 cursor-default"
                     : "bg-blue-500"
                 } text-white font-semibold cursor-pointer leading-5 rounded-md transition duration-150 ease-in-out focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 `}
            disabled={page <= 1}
          >
            Previous
          </button>
          {Array.from({ length: TotalPages }, (_, index) => (
            <button
              onClick={() => handlePagination(index + 1)}
              key={index + 1}
              className={`relative inline-flex items-center px-4 py-2 text-sm 
                    ${
                      page === index + 1
                        ? `bg-red-500 text-white`
                        : "text-gray-400"
                    }font-medium  cursor-pointer leading-5 rounded-md transition duration-150 ease-in-out focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => setPage((next) => next + 1)}
            className={`relative inline-flex items-center px-4 py-2 text-sm 
                   ${
                     page >= TotalPages
                       ? "disabled:bg-slate-50 disabled:text-slate-500 cursor-default"
                       : "bg-blue-500"
                   } text-white font-semibold cursor-pointer leading-5 rounded-md transition duration-150 ease-in-out focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10`}
            disabled={page >= TotalPages}
          >
            Next
          </button>
        </nav>
      </div>
    </>
  );
};

export default Pagination;
