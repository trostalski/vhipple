import {
  Row,
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import TablePagination from "@/app/components/TablePagination";
import { useState } from "react";
import { Resource } from "fhir/r4";
import PreviewModal from "../../components/PreviewModal";
import { FaSortUp, FaSortDown } from "react-icons/fa";

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
  const { inputData, datasetId } = props;
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewResource, setPreviewResource] = useState<Resource | undefined>(
    undefined
  );
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data: inputData,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  const handleOnRowClick = (row: Row<TableResource>) => {
    return () => {
      setPreviewResource(row.original.resource);
      setShowPreviewModal(true);
    };
  };

  return (
    <div className="flex flex-col h-full w-full bg-white rounded-md border shadow-lg">
      <div className="h-[65vh] overflow-scroll rounded-md">
        <table
          {...{
            style: {
              width: "100%",
            },
          }}
        >
          <thead className="h-16 text-sm bg-slate-50 p-2">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="text-left px-2"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "cursor-pointer select-none flex flex-row gap-2"
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
                                ? "text-black"
                                : "text-gray-400"
                            }`}
                            size={20}
                          />
                          <FaSortDown
                            className={`absolute top-0 ${
                              header.column.getIsSorted() && sorting[0].desc
                                ? "text-black"
                                : "text-gray-400"
                            }`}
                            size={20}
                          />
                        </div>
                      </div>
                    )}
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
      {showPreviewModal && previewResource && (
        <PreviewModal
          resource={previewResource}
          setShowModal={setShowPreviewModal}
          showModal={showPreviewModal}
        />
      )}
    </div>
  );
};

export default ResourcesTable;
