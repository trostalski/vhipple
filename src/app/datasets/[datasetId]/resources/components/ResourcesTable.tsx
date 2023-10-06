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
import { useState } from "react";
import { Resource } from "fhir/r4";
import PreviewModal from "../../../components/PreviewModal";
import { FaSortUp, FaSortDown } from "react-icons/fa";
import TableFilter from "@/app/components/TableFilter";
import { BaseTable } from "@/app/datasets/components/BaseTable";

export type TableResource = {
  id?: string;
  resourceType: string;
  resource: Resource;
  profile?: string;
  references?: string[];
  lastUpdated?: string;
};

const columnHelper = createColumnHelper<TableResource>();

const columns = [
  columnHelper.accessor((row) => row.id, {
    id: "id",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Id</span>,
  }),
  columnHelper.accessor((row) => row.resourceType, {
    id: "resourceType",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Resource Type</span>,
  }),
  columnHelper.accessor((row) => row.lastUpdated, {
    id: "lastUpdated",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Last Updated</span>,
  }),
];

interface ResourcesTableProps {
  inputData: TableResource[];
  datasetId: string;
}

const ResourcesTable = (props: ResourcesTableProps) => {
  const { inputData } = props;
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewResource, setPreviewResource] = useState<Resource | undefined>(
    undefined
  );
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data: inputData,
    columns: columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleOnRowClick = (row: Row<TableResource>) => {
    setPreviewResource(row.original.resource);
    setShowPreviewModal(true);
  };

  return (
    <>
      <BaseTable
        handleOnRowClick={handleOnRowClick}
        columns={columns}
        inputData={inputData}
        columnResize={false}
      />
      {showPreviewModal && previewResource && (
        <PreviewModal
          resource={previewResource}
          showModal={showPreviewModal}
          setShowModal={setShowPreviewModal}
        />
      )}
    </>
  );
};

export default ResourcesTable;
