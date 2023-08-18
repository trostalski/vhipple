import { Table, flexRender } from "@tanstack/react-table";
import React from "react";

interface CSVTableBodyProps {
  table: Table<any>;
}

const CSVTableBody = (props: CSVTableBodyProps) => {
  const { table } = props;
  return (
    <tbody>
      {table.getRowModel().rows.map((row) => (
        <tr
          key={row.id}
          className="border-y cursor-pointer transition hover:bg-gray-100"
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
  );
};

export default React.memo(CSVTableBody);
