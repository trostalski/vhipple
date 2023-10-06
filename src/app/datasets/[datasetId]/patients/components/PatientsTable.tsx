import React, { useState } from "react";
import {
  Row,
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import TablePagination from "@/app/components/TablePagination";
import TableFilter from "@/app/components/TableFilter";
import { useRouter } from "next/navigation";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import { BaseTable } from "@/app/datasets/components/BaseTable";

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

  const handleOnRowClick = (row: Row<TablePatient>) => {
    router.push(`/datasets/${datasetId}/patients/${row.original.id}`);
  };

  return (
    <BaseTable
      columns={columns}
      handleOnRowClick={handleOnRowClick}
      inputData={inputData}
      columnResize={true}
    />
  );
};

export default PatientsTable;
