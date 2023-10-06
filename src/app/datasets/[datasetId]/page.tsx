"use client";
import ExpandAccordionToggle from "@/app/components/ExpandAccordionToggle";
import MainWrapper from "@/app/components/MainWrapper";
import SearchBar from "@/app/components/SearchBar";
import { getDataset } from "@/app/db/utils";
import { useLiveQuery } from "dexie-react-hooks";
import { Resource } from "fhir/r4";
import React, { useState } from "react";
import { getDisplayForResource } from "@/app/lib/resourceTypeDisplay";
import DatasetHeader from "./components/DatasetHeader";
import { useRouter } from "next/navigation";
import PreviewModal from "../components/PreviewModal";

interface Props {}

interface State {
  searchTerm: string;
  searchResults: Map<string, Resource[]>;
  openResourceTypes: string[];
  showPreviewModal: boolean;
  previewResource: Resource | undefined;
}

const page = ({ params }: { params: { datasetId: string } }) => {
  const { datasetId } = params;
  const dataset = useLiveQuery(() => getDataset(datasetId));
  const router = useRouter();

  //state
  const [state, setState] = useState<State>({
    searchTerm: "",
    searchResults: new Map(),
    openResourceTypes: [],
    showPreviewModal: false,
    previewResource: undefined,
  });

  //logic
  const resources = dataset?.resourceContainers.map((rc) => rc.resource);
  const resourceTypeMap = new Map();

  for (const resource of resources ?? []) {
    if (!resourceTypeMap.has(resource.resourceType)) {
      resourceTypeMap.set(resource.resourceType, []);
    }
    resourceTypeMap.get(resource.resourceType).push(resource);
  }

  const resourceTypeIsOpen = (resourceType: string) => {
    return state.openResourceTypes.includes(resourceType);
  };
  const handleResourceTypeToggle = (resourceType: string) => {
    const openResourceTypes = [...state.openResourceTypes];
    if (resourceTypeIsOpen(resourceType)) {
      const index = openResourceTypes.indexOf(resourceType);
      openResourceTypes.splice(index, 1);
    } else {
      openResourceTypes.push(resourceType);
    }
    setState({ ...state, openResourceTypes });
  };

  const handleSearch = () => {
    const searchTerm = state.searchTerm;
    if (searchTerm === "") {
      setState({ ...state, searchResults: new Map() });
      return;
    }
    const searchResults = new Map();
    for (let [resourceType, resources] of Array.from(resourceTypeMap)) {
      const filteredResources = resources.filter(
        (r: Resource) =>
          r.resourceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
          getDisplayForResource(r)
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          r.id?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (filteredResources.length > 0) {
        searchResults.set(resourceType, filteredResources);
      }
    }
    setState({ ...state, searchResults });
  };

  const handleClickResource = (resource: Resource) => {
    const resourceType = resource.resourceType;
    if (resourceType == "Patient") {
      router.push(`/datasets/${datasetId}/patients/${resource.id}`);
    } else {
      setState({
        ...state,
        showPreviewModal: true,
        previewResource: resource,
      });
    }
  };

  if (!dataset) {
    return null;
  }

  const usedMap =
    state.searchResults.size > 0 ? state.searchResults : resourceTypeMap;

  return (
    <MainWrapper>
      <div className="flex flex-col gap-2">
        <DatasetHeader dataset={dataset} />
        <div>
          <SearchBar
            searchTerm={state.searchTerm}
            setSearchTerm={(input: string) => {
              setState({ ...state, searchTerm: input });
            }}
            handleSearch={handleSearch}
            placeholder="Search"
          />
        </div>
        <div className="flex flex-col px-4 py-2 bg-white shadow-md rounded-md">
          {Array.from(usedMap).map(([resourceType, resources]) => (
            <div className="flex flex-col">
              <div
                key={resourceType}
                className="flex flex-row items-center gap-2"
              >
                <button
                  className="p-2 rounded-md transition hover:bg-primary-button-hover"
                  onClick={() => handleResourceTypeToggle(resourceType)}
                >
                  <ExpandAccordionToggle
                    isOpen={resourceTypeIsOpen(resourceType)}
                  />
                </button>
                <h1 className="text-2xl font-bold">{resourceType}</h1>
              </div>
              {resourceTypeIsOpen(resourceType) && (
                <div className="ml-8 flex flex-col gap-2">
                  {resources.map((r: Resource) => (
                    <button
                      key={r.id}
                      className="flex flex-row items-center gap-2 justify-between px-4 py-2 bg-gray-50 rounded-md transition hover:shadow-lg"
                      onClick={() => handleClickResource(r)}
                    >
                      <span>{getDisplayForResource(r)}</span>
                      <span className="text-gray-500 text-sm">{r.id}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        {state.showPreviewModal && state.previewResource && (
          <PreviewModal
            resource={state.previewResource}
            showModal={state.showPreviewModal}
            setShowModal={(showModal) => {
              setState({ ...state, showPreviewModal: showModal });
            }}
          />
        )}
      </div>
    </MainWrapper>
  );
};

export default page;
