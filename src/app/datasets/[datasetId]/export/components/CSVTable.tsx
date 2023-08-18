import React, { use, useMemo } from "react";
import { CSVColumn } from "../lib/types";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

interface CSVTableProps {
  csvColumns: CSVColumn[];
  inputData: any[];
}

const CSVTable = (props: CSVTableProps) => {
  const { csvColumns, inputData } = props;

  const columnHelper = createColumnHelper<any>();
  const tableColumns = csvColumns
    .filter((col) => col.name !== "")
    .map((col) =>
      columnHelper.accessor(col.name, {
        cell: (row) => row.getValue(),
        header: () => <span>{col.name}</span>,
      })
    );

  const table = useReactTable({
    data: inputData,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex flex-col h-[40vh] w-full bg-white rounded-md border shadow-lg px-4">
      <table className="overflow-scroll">
        <thead className="h-12 bg-slate-50 p-2">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className="text-left"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {inputData.length !== 0 && (
          <tbody className="text-sm">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-y cursor-pointer transition hover:bg-gray-100"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-2 border-y"
                    style={{ width: cell.column.getSize() }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        )}
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
  );
};

export default CSVTable;
