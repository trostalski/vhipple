"use client";
import MainWrapper from "@/app/components/MainWrapper";
import React from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { getDataset } from "@/app/db/utils";
import ResourcesTableContainer from "./components/ResourcesTableContainer";

const page = ({ params }: { params: { datasetId: string } }) => {
  const { datasetId } = params;
  const dataset = useLiveQuery(() => getDataset(datasetId));
  if (!dataset) {
    return null;
  }
  return (
    <MainWrapper>
      <ResourcesTableContainer dataset={dataset} />
    </MainWrapper>
  );
};

export default page;
