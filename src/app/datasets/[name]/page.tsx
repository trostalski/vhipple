"use client";
import { getDataset } from "@/app/db/utils";
import { useLiveQuery } from "dexie-react-hooks";
import React from "react";
import MainWrapper from "@/app/components/MainWrapper";
import DatasetHeader from "./components/DatasetHeader";
import ResourceOverview from "./components/ResourceOverview";
import DisplayTabs from "@/app/patients/components/DisplayTabs";
import PatientsList from "@/app/patients/components/PatientsList";

export const availableDisplayTabs = ["Overview", "Patients", "Resources"];

const page = ({ params }: { params: { name: string } }) => {
  const dataset = useLiveQuery(() => getDataset(params.name));
  const [displayTab, setDisplayTab] = React.useState<
    (typeof availableDisplayTabs)[number]
  >(availableDisplayTabs[0]);

  if (!dataset) {
    return null;
  }

  const contentToRender = {
    Resources: <ResourceOverview dataset={dataset} />,
    Patients: <PatientsList />,
  };

  return (
    <MainWrapper>
      <div className="flex flex-col w-full h-full">
        <DatasetHeader datasetName={dataset.name} />
        <DisplayTabs
          availableDisplayTabs={availableDisplayTabs}
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
