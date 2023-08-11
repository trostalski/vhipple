import React, { useState } from "react";
import { Dataset } from "../../lib/types";
import SearchBar from "@/app/components/SearchBar";
import { Resource } from "fhir/r4";
import Pagination from "@/app/components/Pagination";
import PreviewModal from "../../components/PreviewModal";
import { LuFileJson } from "react-icons/lu";
interface ResourceOverviewProps {
  dataset: Dataset;
}

const ResourceOverview = (props: ResourceOverviewProps) => {
  const { dataset } = props;
  const numberToDisplay = 20;
  const [page, setPage] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [previewResource, setPreviewResource] = useState<Resource>();
  const [searchTerm, setSearchTerm] = useState("");
  const resourcesIn = dataset.resourceContainers.map((rc) => rc.resource);
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
    <div className="flex flex-col h-full gap-4 mt-4 bg-white shadow-md rounded-md">
      <div className="flex flex-col p-4 h-full">
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
            <div key={resource.id} className="flex flex-row text-xs">
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
  );
};

export default ResourceOverview;
