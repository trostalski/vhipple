import { Table } from "@tanstack/react-table";
import React, { useEffect } from "react";

interface TablePaginationProps {
  table: Table<any>;
  initialPageSize?: number;
}

const TablePagination = (props: TablePaginationProps) => {
  const { table } = props;
  useEffect(() => {
    table.setPageSize(props.initialPageSize || 10);
  }, []);
  return (
    <div className="flex justify-end items-center gap-2">
      <div className="flex flex-row gap-1">
        <button
          className="text-primary-button border rounded px-2 py-1 transition hover:bg-primary-button-hover"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          className="text-primary-button border rounded px-2 py-1 transition hover:bg-primary-button-hover"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          className="text-primary-button border rounded px-2 py-1 transition hover:bg-primary-button-hover"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          className="text-primary-button border rounded px-2 py-1 transition hover:bg-primary-button-hover"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>
      </div>
      <span className="flex items-center justify-center gap-1 w-28">
        <div>Page</div>
        <strong>
          {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </strong>
      </span>
      <span className="flex items-center gap-1">
        | Go to page:
        <input
          type="number"
          defaultValue={table.getState().pagination.pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            table.setPageIndex(page);
          }}
          className="border p-1 rounded w-16"
        />
      </span>
      <select
        value={table.getState().pagination.pageSize}
        onChange={(e) => {
          table.setPageSize(Number(e.target.value));
        }}
        className="border p-1 rounded"
      >
        {[10, 20, 30, 40, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TablePagination;
