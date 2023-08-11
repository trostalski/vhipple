import React from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

export type TablePatient = {
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  birthDate: string;
  country: string;
  city: string;
  postalCode: string;
  phoneNumber: string;
  street: string;
};

const columnHelper = createColumnHelper<TablePatient>();

const columns = [
  columnHelper.accessor("firstName", {
    cell: (info) => info.getValue(),
    header: () => <span>First Name</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.lastName, {
    id: "lastName",
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Last Name</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.gender, {
    id: "gender",
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Gender</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.age, {
    id: "age",
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Age</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.birthDate, {
    id: "birthDate",
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Birth Date</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.country, {
    id: "country",
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Country</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.city, {
    id: "city",
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>City</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.postalCode, {
    id: "postalCode",
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Postal Code</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.phoneNumber, {
    id: "phoneNumber",
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Phone Number</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.street, {
    id: "street",
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Street</span>,
    footer: (info) => info.column.id,
  }),
];

interface PatientsTableProps {
  inputData: TablePatient[];
}

const PatientsTable = (props: PatientsTableProps) => {
  const { inputData } = props;
  const [data, setData] = React.useState(() => [...inputData]);
  const rerender = React.useReducer(() => ({}), {})[1];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-2">
      <table>
        <thead className="">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
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
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
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
      <div className="h-4" />
      <button onClick={() => rerender()} className="border p-2">
        Rerender
      </button>
    </div>
  );
};

export default PatientsTable;
