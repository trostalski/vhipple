import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { BiFirstPage, BiLastPage } from "react-icons/bi";
import { LuFileJson } from "react-icons/lu";
import React, { useState } from "react";
import PreviewModal from "./PreviewModal";
import { Resource } from "fhir/r4";
import SearchBar from "@/app/components/SearchBar";
import { Dataset } from "../lib/types";
import Pagination from "@/app/components/Pagination";

interface DatasetViewProps {
  dataset: Dataset;
}

const DatasetView = (props: DatasetViewProps) => {
  const numberToDisplay = 20;
  const [page, setPage] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [previewResource, setPreviewResource] = useState<Resource>();
  const [searchTerm, setSearchTerm] = useState("");
  const resourcesIn = props.dataset.resourceContainers.map((rc) => rc.resource);
  const [displayResources, setDisplayResources] =
    useState<Resource[]>(resourcesIn);

  const handleSearch = () => {
    if (searchTerm === "") {
      setDisplayResources(resourcesIn);
    } else {
      const filteredResources = resourcesIn.filter((r) => {
        return (
          r.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          r.resourceType.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      setDisplayResources(filteredResources);
    }
  };

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
          <SearchBar
            handleSearch={handleSearch}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          <div className="flex flex-row font-bold rounded-md p-2">
            <span className="w-1/3">Type</span>
            <span className="w-1/2">Id</span>
            <span className="w-1/6">View</span>
          </div>
          {displayResources
            .slice(page * numberToDisplay, (page + 1) * numberToDisplay)
            .map((resource) => (
              <div key={resource.id} className="flex flex-row p-1 text-xs">
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
        <Pagination
          numberToDisplay={numberToDisplay}
          page={page}
          setPage={setPage}
          totalLength={displayResources.length}
        />
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
