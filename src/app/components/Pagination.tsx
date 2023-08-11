import React from "react";
import { BiFirstPage, BiLastPage } from "react-icons/bi";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  numberToDisplay: number;
  totalLength: number;
}

const Pagination = (props: PaginationProps) => {
  const { page, setPage, numberToDisplay, totalLength } = props;
  const nextPage = () => {
    return () =>
      setPage(Math.min(page + 1, Math.floor(totalLength / numberToDisplay)));
  };
  const lastPage = () => {
    return () => setPage(Math.floor(totalLength / numberToDisplay));
  };
  const previousPage = () => {
    return () => setPage(Math.max(page - 1, 0));
  };
  const firstPage = () => {
    return () => setPage(0);
  };

  return (
    <div className="flex flex-row justify-between items-center p-4">
      <span className="text-gray-500">
        Showing {page * numberToDisplay + 1} to{" "}
        {Math.min((page + 1) * numberToDisplay, totalLength)} of {totalLength}{" "}
        entries
      </span>

      <div className="flex flex-row gap-4">
        <button
          className="bg-secondary-button text-white font-bold py-2 px-4 rounded-md transition hover:bg-secondary-button-hover"
          onClick={firstPage()}
        >
          <BiFirstPage />
        </button>
        <button
          className="bg-secondary-button text-white font-bold py-2 px-4 rounded transition hover:bg-secondary-button-hover"
          onClick={previousPage()}
        >
          <GrFormPrevious />
        </button>
        <button
          className="bg-secondary-button text-white font-bold py-2 px-4 rounded transition hover:bg-secondary-button-hover"
          onClick={nextPage()}
        >
          <GrFormNext />
        </button>
        <button
          className="bg-secondary-button text-white font-bold py-2 px-4 rounded transition hover:bg-secondary-button-hover"
          onClick={lastPage()}
        >
          <BiLastPage />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
