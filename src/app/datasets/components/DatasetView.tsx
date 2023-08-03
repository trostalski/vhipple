import { Dataset } from "@/app/lib/types";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { BiFirstPage, BiLastPage } from "react-icons/bi";
import { LuFileJson } from "react-icons/lu";
import React, { useState } from "react";
import PreviewModal from "./PreviewModal";
import { Resource } from "fhir/r4";

interface DatasetViewProps {
  dataset: Dataset;
}

const DatasetView = (props: DatasetViewProps) => {
  const numberToDisplay = 20;
  const [page, setPage] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [previewResource, setPreviewResource] = useState<Resource>();
  return (
    <div className="flex flex-col w-full bg-white rounded-lg shadow-md">
      <div className="flex flex-col w-full bg-white rounded-lg shadow-md">
        <div>
          <h1 className="text-2xl font-bold py-2 px-4">{props.dataset.name}</h1>
          <span className="text-gray-500 py-2 px-4">
            {props.dataset.description || "No description."}
          </span>
        </div>
        <div className="flex flex-col p-4">
          <div className="flex flex-row font-bold rounded-md p-2">
            <span className="w-1/3">Type</span>
            <span className="w-1/2">Id</span>
            <span className="w-1/6">View</span>
          </div>
          {props.dataset.resources
            .slice(page * numberToDisplay, (page + 1) * numberToDisplay)
            .map((resource) => (
              <div className="flex flex-row p-1 text-xs">
                <span className="w-1/3">{resource.resourceType}</span>
                <span className="w-1/2">{resource.id}</span>
                <button
                  className="w-1/6"
                  onClick={() => {
                    setPreviewResource(resource);
                    setShowPreview(true);
                  }}
                >
                  <LuFileJson size={16} className="hover:scale-125" />
                </button>
              </div>
            ))}
        </div>
        <div className="flex flex-row justify-between items-center p-4">
          <span className="text-gray-500">
            Showing {page * numberToDisplay + 1} to{" "}
            {Math.min(
              (page + 1) * numberToDisplay,
              props.dataset.resources.length
            )}{" "}
            of {props.dataset.resources.length} entries
          </span>

          <div className="flex flex-row gap-4">
            <button
              className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                setPage(0);
              }}
            >
              <BiFirstPage />
            </button>
            <button
              className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                setPage(Math.max(page - 1, 0));
              }}
            >
              <GrFormPrevious />
            </button>
            <button
              className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                setPage(page + 1);
              }}
            >
              <GrFormNext />
            </button>
            <button
              className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                setPage(
                  Math.floor(props.dataset.resources.length / numberToDisplay)
                );
              }}
            >
              <BiLastPage />
            </button>
          </div>
        </div>
        {showPreview && (
          <PreviewModal
            resource={previewResource!}
            showModal={showPreview}
            setShowModal={setShowPreview}
          />
        )}
      </div>
    </div>
  );
};

export default DatasetView;
