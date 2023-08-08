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
  return (
    <div className="flex flex-row justify-between items-center p-4">
      <span className="text-gray-500">
        Showing {props.page * props.numberToDisplay + 1} to{" "}
        {Math.min((props.page + 1) * props.numberToDisplay, props.totalLength)}{" "}
        of {props.totalLength} entries
      </span>

      <div className="flex flex-row gap-4">
        <button
          className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            props.setPage(0);
          }}
        >
          <BiFirstPage />
        </button>
        <button
          className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            props.setPage(Math.max(props.page - 1, 0));
          }}
        >
          <GrFormPrevious />
        </button>
        <button
          className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            props.setPage(
              Math.min(
                props.page + 1,
                Math.floor(props.totalLength / props.numberToDisplay)
              )
            );
          }}
        >
          <GrFormNext />
        </button>
        <button
          className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            props.setPage(
              Math.floor(props.totalLength / props.numberToDisplay)
            );
          }}
        >
          <BiLastPage />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
