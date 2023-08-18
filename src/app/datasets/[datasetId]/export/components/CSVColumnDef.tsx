import React from "react";
import { IoAdd } from "react-icons/io5";
import { CSVColumn } from "../lib/types";
import CSVColumnDefInput from "./CSVColumnDefInput";
import { defaultCsvColumn } from "../lib/constants";

interface CSVColumnDefInputProps {
  setCSVColumns: React.Dispatch<React.SetStateAction<CSVColumn[]>>;
  setTableInputData: React.Dispatch<React.SetStateAction<any[]>>;
  csvColumns: CSVColumn[];
}

const CSVColumnDef = (props: CSVColumnDefInputProps) => {
  const { setCSVColumns, csvColumns, setTableInputData } = props;

  const handleAddColumn = () => {
    return () => {
      let newIndex = 1;
      let newName = `Column ${newIndex}`;
      const existingNames = csvColumns.map((column) => column.name);
      while (existingNames.includes(newName)) {
        newIndex++;
        newName = `Column ${newIndex}`;
      }
      setTableInputData([]);
      setCSVColumns([...csvColumns, { ...defaultCsvColumn, name: newName }]);
    };
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-row items-center gap-2 mt-4">
        <span className="text-xl font-bold">Columns</span>
        <button
          title="Add Column"
          className="border bg-white rounded-md px-2 py-1 text-secondary-button transition hover:border-secondary-button"
          onClick={handleAddColumn()}
        >
          <IoAdd size={24} />
        </button>
      </div>
      <div className="grid grid-cols-5 items-start content-start w-full gap-2 bg-white p-4 rounded-md shadow-md h-64 overflow-scroll">
        <label className="text-sm font-bold">Column Name</label>
        <label className="text-sm font-bold col-span-2">Value Path</label>
        <label className="text-sm font-bold">Multiple Value Policy</label>
        <label className="text-sm font-bold">Delete</label>
        {csvColumns.map((column, i) => (
          <CSVColumnDefInput
            key={i}
            column={column}
            setCSVColumns={setCSVColumns}
            csvColumns={csvColumns}
          />
        ))}
      </div>
    </div>
  );
};

export default CSVColumnDef;
