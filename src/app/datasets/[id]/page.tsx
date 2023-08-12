"use client";
import { getDataset } from "@/app/db/utils";
import { useLiveQuery } from "dexie-react-hooks";
import React from "react";
import MainWrapper from "@/app/components/MainWrapper";
import DatasetHeader from "./components/DatasetHeader";
import DisplayTabs from "@/app/patients/components/DisplayTabs";
import PatientsTable from "@/app/patients/components/PatientsTable";
import { getPatientInfo } from "@/app/lib/utils";
import { Patient } from "fhir/r4";
import DatasetOverview from "./components/DatasetOverview";

export const availableDisplayTabs = ["Overview", "Patients"];

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const dataset = useLiveQuery(() => getDataset(id));
  const [displayTab, setDisplayTab] = React.useState<
    (typeof availableDisplayTabs)[number]
  >(availableDisplayTabs[0]);

  if (!dataset) {
    return null;
  }

  const contentToRender = {
    Overview: <DatasetOverview dataset={dataset} />,
    Patients: (
      <PatientsTable
        datasetId={id}
        inputData={dataset.resourceContainers
          .filter((rc) => rc.resource.resourceType === "Patient")
          .map((rc) => getPatientInfo(rc.resource as Patient))}
      />
    ),
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
