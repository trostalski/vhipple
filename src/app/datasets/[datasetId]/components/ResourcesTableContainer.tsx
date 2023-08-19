import React, { useState } from "react";
import { Dataset } from "../../lib/types";
import CohortSingleSelect from "./CohortSingleSelect";
import ResourcesTable, { TableResource } from "./ResourcesTable";

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
    <div className="flex flex-col">
      <div className="flex flex-row items-center justify-between">
        <span className="text-xl font-bold">Resources</span>
      </div>
      <ResourcesTable
        datasetId={dataset.id}
        inputData={computeResourcesTableInputData()}
      />
    </div>
  );
};

export default ResourcesTableContainer;
