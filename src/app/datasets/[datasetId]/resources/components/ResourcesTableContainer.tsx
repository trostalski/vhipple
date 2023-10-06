import React from "react";
import ResourcesTable, { TableResource } from "./ResourcesTable";
import { Dataset } from "@/app/datasets/lib/types";

interface ResourcesTableContainerProps {
  dataset: Dataset;
}

const ResourcesTableContainer = (props: ResourcesTableContainerProps) => {
  const { dataset } = props;

  const computeResourcesTableInputData = () => {
    const inputData: TableResource[] = dataset.resourceContainers.map((rc) => ({
      id: rc.resource.id,
      resourceType: rc.resource.resourceType,
      resource: rc.resource,
      profile: rc.resource.meta?.profile?.[0],
      references: rc.references.filter((r) => r.id).map((r) => r.id!),
      lastUpdated: rc.resource.meta?.lastUpdated,
    }));
    return inputData;
  };

  return (
    <ResourcesTable
      datasetId={dataset.id}
      inputData={computeResourcesTableInputData()}
    />
  );
};

export default ResourcesTableContainer;
