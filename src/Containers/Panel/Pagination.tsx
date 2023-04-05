import React, { useState } from "react";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const [visiblePages, setVisiblePages] = useState(5); // Set the number of visible pages to 10
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Calculate the range of page numbers to display based on the current page and the number of visible pages
  const startIndex = Math.max(
    0,
    currentPage - 1 - Math.floor(visiblePages / 2)
  );
  const endIndex = Math.min(totalPages - 1, startIndex + visiblePages - 1);

  return (
    <div className="flex items-center justify-center">
      {currentPage > 1 && (
        <button
          className="bg-gray-200 text-sm font-bold py-2 px-4 rounded-l"
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </button>
      )}

      {/* Only show the first 10 pages initially */}
      {pageNumbers.slice(startIndex, endIndex + 1).map((pageNumber) => (
        <button
          key={pageNumber}
          className={`text-sm ${
            pageNumber === currentPage
              ? "bg-primary text-white"
              : "bg-gray-200 text-gray-800"
          } font-bold py-2 px-4 mx-1 rounded`}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}

      {/* Show the remaining pages when the user navigates to the last page of the visible range */}
      {/* {endIndex < totalPages - 1 && (
        <button
          className="bg-gray-200 text-sm font-bold py-2 px-4 rounded-l"
          onClick={() => setVisiblePages(visiblePages + 10)} // Increase the number of visible pages by 10 when the user clicks this button
        >
          ...
        </button>
      )} */}

      {currentPage < totalPages && (
        <button
          className="bg-gray-200 text-sm font-bold py-2 px-4 rounded-l"
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
