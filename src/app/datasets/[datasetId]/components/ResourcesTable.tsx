import {
  Row,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import TableFilter from "@/app/components/TableFilter";
import TablePagination from "@/app/components/TablePagination";
import { useState } from "react";
import { Resource } from "fhir/r4";
import PreviewModal from "../../components/PreviewModal";

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
  columnHelper.accessor((row) => row.profile, {
    id: "profile",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Profile</span>,
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
  const table = useReactTable({
    data: inputData,
    columns: columns,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
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
