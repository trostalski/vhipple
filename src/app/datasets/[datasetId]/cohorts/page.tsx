"use client";
import React from "react";
import CohortList from "./components/CohortList";
import { useLiveQuery } from "dexie-react-hooks";
import { getDataset } from "@/app/db/utils";
import MainWrapper from "@/app/components/MainWrapper";

const page = ({ params }: { params: { datasetId: string } }) => {
  const { datasetId } = params;
  const dataset = useLiveQuery(() => getDataset(datasetId));
  if (!dataset) {
    return null;
  }
  return (
    <MainWrapper>
      <CohortList dataset={dataset} />
    </MainWrapper>
  );
};

export default page;
