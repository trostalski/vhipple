import React from "react";
import {
  Row,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import TablePagination from "@/app/components/TablePagination";
import TableFilter from "@/app/components/TableFilter";
import { useRouter } from "next/navigation";

export type TablePatient = {
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  birthDate: string;
  country: string;
  city: string;
  postalCode: string;
  phone: string;
  street: string;
  id: string;
};

const columnHelper = createColumnHelper<TablePatient>();

const columns = [
  columnHelper.accessor("firstName", {
    cell: (info) => info.getValue(),
    header: () => <span>First Name</span>,
  }),
  columnHelper.accessor((row) => row.lastName, {
    id: "lastName",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Last Name</span>,
  }),
  columnHelper.accessor((row) => row.gender, {
    id: "gender",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Gender</span>,
  }),
  columnHelper.accessor((row) => row.age, {
    id: "age",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Age</span>,
  }),
  columnHelper.accessor((row) => row.birthDate, {
    id: "birthDate",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Birth Date</span>,
  }),
  columnHelper.accessor((row) => row.country, {
    id: "country",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Country</span>,
  }),
  columnHelper.accessor((row) => row.city, {
    id: "city",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>City</span>,
  }),
  columnHelper.accessor((row) => row.postalCode, {
    id: "postalCode",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Postal Code</span>,
  }),
  columnHelper.accessor((row) => row.phone, {
    id: "phone",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Phone</span>,
  }),
  columnHelper.accessor((row) => row.street, {
    id: "street",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Street</span>,
  }),
  columnHelper.accessor((row) => row.id, {
    id: "id",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Id</span>,
  }),
];

interface PatientsTableProps {
  inputData: TablePatient[];
  datasetId: string;
}

const PatientsTable = (props: PatientsTableProps) => {
  const { inputData, datasetId } = props;
  const router = useRouter();
  const [data, setData] = React.useState(() => [...inputData]);

  const table = useReactTable({
    data,
    columns,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleOnRowClick = (row: Row<TablePatient>) => {
    return () =>
      router.push(`/datasets/${datasetId}/patients/${row.original.id}`);
  };

  return (
    <div className="flex flex-col h-full w-full bg-white rounded-md border shadow-lg">
      <div className="h-[75vh] overflow-scroll rounded-md">
        <table
          {...{
            style: {
              width: table.getCenterTotalSize(),
            },
          }}
        >
          <thead className="h-16 text-sm bg-slate-50 p-2">
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
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {header.column.getCanFilter() ? (
                      <div>
                        <TableFilter column={header.column} table={table} />
                      </div>
                    ) : null}
                    <div
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                      className={`absolute right-0 top-0 h-full w-1 cursor-ew-resize bg-gray-200 transition hover:bg-gray-500 ${
                        header.column.getIsResizing() ? "isResizing" : ""
                      }`}
                    />
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="text-xs">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-y cursor-pointer transition hover:bg-gray-100"
                onClick={handleOnRowClick(row)}
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
        <TablePagination table={table} initialPageSize={30} />
      </div>
    </div>
  );
};

export default PatientsTable;
