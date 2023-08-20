"use client";
import MainWrapper from "@/app/components/MainWrapper";
import React from "react";
import SettingsHeader from "./components/SettingsHeader";
import FhirPathSettings from "./components/FhirPathSettings";
import { useLiveQuery } from "dexie-react-hooks";
import { getDataset } from "@/app/db/utils";

const page = ({ params }: { params: { datasetId: string } }) => {
  const dataset = useLiveQuery(() => getDataset(params.datasetId));

  if (!dataset) {
    return null;
  }

  return (
    <MainWrapper>
      <div className="flex flex-col w-full h-full overflow-scroll">
        <SettingsHeader />
        <FhirPathSettings dataset={dataset} />
      </div>
    </MainWrapper>
  );
};

export default page;
