"use client";
import React, { useMemo, useState } from "react";
import MainWrapper from "@/app/components/MainWrapper";
import { useLiveQuery } from "dexie-react-hooks";
import { getDataset } from "@/app/db/utils";
import DatasetHeader from "./components/DatasetHeader";
import CohortList from "./components/CohortList";
import { DatasetInfo } from "./components/DatasetInfo";
import DisplayTabs from "./patients/components/DisplayTabs";
import ResourcesTableContainer from "./components/ResourcesTableContainer";

export const availableDatasetDisplayTabs = ["Overview", "Cohorts", "Resources"];

const page = ({ params }: { params: { datasetId: string } }) => {
  const { datasetId } = params;
  const [displayTab, setDisplayTab] = useState<
    (typeof availableDatasetDisplayTabs)[number]
  >(availableDatasetDisplayTabs[0]);

  const dataset = useLiveQuery(() => getDataset(datasetId));

  if (!dataset) {
    return null;
  }

  const contentToRender = {
    Overview: <DatasetInfo dataset={dataset} />,
    Cohorts: <CohortList dataset={dataset} />,
    Resources: <ResourcesTableContainer dataset={dataset} />,
  };

  return (
    <MainWrapper>
      <div className="flex flex-col w-full h-full gap-4">
        <DatasetHeader dataset={dataset} />
        {!dataset.description ? (
          <span className="text-gray-500">No description.</span>
        ) : (
          <span className="text-gray-500">{dataset.description}</span>
        )}
        <DisplayTabs
          availableDisplayTabs={availableDatasetDisplayTabs}
          displayTab={displayTab}
          setDisplayTab={setDisplayTab}
        />
        {displayTab in contentToRender &&
          contentToRender[displayTab as keyof typeof contentToRender]}
      </div>
    </MainWrapper>
  );
};

export default page;
