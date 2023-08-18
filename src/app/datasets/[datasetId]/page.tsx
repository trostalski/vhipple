"use client";
import React, { useMemo } from "react";
import MainWrapper from "@/app/components/MainWrapper";
import { useLiveQuery } from "dexie-react-hooks";
import { getDataset } from "@/app/db/utils";
import DatasetHeader from "./components/DatasetHeader";
import CohortList from "./components/CohortList";
import { DatasetInfo } from "./components/DatasetInfo";

interface BoxWrapperProps {
  children: React.ReactNode;
}

const page = ({ params }: { params: { datasetId: string } }) => {
  const { datasetId } = params;
  const dataset = useLiveQuery(() => getDataset(datasetId));

  if (!dataset) {
    return null;
  }

  return (
    <MainWrapper>
      <div className="flex flex-col w-full h-full gap-4">
        <DatasetHeader dataset={dataset} />
        {!dataset.description ? (
          <span className="text-gray-500">No description.</span>
        ) : (
          <span className="text-gray-500">{dataset.description}</span>
        )}
        <DatasetInfo dataset={dataset} />
        <CohortList dataset={dataset} />
      </div>
    </MainWrapper>
  );
};

export default page;
