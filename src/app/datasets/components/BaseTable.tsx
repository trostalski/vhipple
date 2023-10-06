import TableFilter from "@/app/components/TableFilter";
import TablePagination from "@/app/components/TablePagination";
import {
  Row,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useState } from "react";
import { FaSortUp, FaSortDown } from "react-icons/fa";

interface TableProps {
  handleOnRowClick: (row: Row<any>) => void;
  inputData: any[];
  columns: any[];
  columnResize: boolean;
}

export const BaseTable = (props: TableProps) => {
  const { handleOnRowClick, inputData, columns, columnResize } = props;
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable<any>({
    data: inputData,
    columns: columns,
    state: {
      sorting: sorting,
    },
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="flex flex-col h-full w-full bg-white rounded-md border shadow-lg">
      <div className="h-[75vh] overflow-scroll rounded-md">
        <table
          {...{
            style: {
              width: columnResize ? table.getCenterTotalSize() : "100%",
            },
          }}
        >
          <thead className="bg-primary-button-hover h-16 text-sm p-2">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="relative text-left px-2"
                    colSpan={header.colSpan}
                    style={{
                      width: header.getSize(),
                    }}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "cursor-pointer select-none flex flex-row gap-4 text-white"
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        <div className="flex flex-col items-center relative">
                          <FaSortUp
                            className={`absolute top-0 ${
                              header.column.getIsSorted() && !sorting[0].desc
                                ? "text-sidebar-bg"
                                : "text-white"
                            }`}
                            size={20}
                          />
                          <FaSortDown
                            className={`absolute top-0 ${
                              header.column.getIsSorted() && sorting[0].desc
                                ? "text-sidebar-bg"
                                : "text-white"
                            }`}
                            size={20}
                          />
                        </div>
                      </div>
                    )}
                    {header.column.getCanFilter() ? (
                      <TableFilter column={header.column} table={table} />
                    ) : null}
                    {columnResize && (
                      <div
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                        className={`absolute right-0 top-0 h-full w-1 cursor-ew-resize bg-gray-200 transition hover:bg-gray-500 ${
                          header.column.getIsResizing() ? "isResizing" : ""
                        }`}
                      />
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="text-sm">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-y cursor-pointer transition hover:bg-gray-100"
                onClick={() => handleOnRowClick(row)}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-2"
                    style={{ width: cell.column.getSize() }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            {table.getFooterGroups().map((footerGroup) => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot>
        </table>
      </div>
      <div className="grow" />
      <div className="p-2">
        <TablePagination table={table} initialPageSize={20} />
      </div>
    </div>
  );
};
