"use client";
import React from "react";
import MainWrapper from "@/app/components/MainWrapper";
import { useLiveQuery } from "dexie-react-hooks";
import { getDataset } from "@/app/db/utils";
import DatasetHeader from "./components/DatasetHeader";

interface BoxWrapperProps {
  children: React.ReactNode;
}

const BoxWrapper = (props: BoxWrapperProps) => {
  const { children } = props;
  return (
    <div
      className={`flex flex-row gap-4 items-center bg-white rounded-lg shadow-md p-4`}
    >
      {children}
    </div>
  );
};

const page = ({ params }: { params: { datasetId: string } }) => {
  const { datasetId } = params;
  const dataset = useLiveQuery(() => getDataset(datasetId));

  if (!dataset) {
    return null;
  }

  return (
    <MainWrapper>
      <div className="flex flex-col w-full h-full">
        <DatasetHeader dataset={dataset} />
        {!dataset.description ? (
          <span className="text-gray-500">No description.</span>
        ) : (
          <span className="text-gray-500">{dataset.description}</span>
        )}
        <BoxWrapper>
          <span className="text-gray-500">No card found.</span>
        </BoxWrapper>
      </div>
    </MainWrapper>
  );
};

export default page;
