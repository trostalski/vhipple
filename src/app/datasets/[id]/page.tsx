"use client";
import { getDataset } from "@/app/db/utils";
import { useLiveQuery } from "dexie-react-hooks";
import React from "react";
import MainWrapper from "@/app/components/MainWrapper";
import DatasetHeader from "./components/DatasetHeader";
import ResourceOverview from "./components/ResourceOverview";
import DisplayTabs from "@/app/patients/components/DisplayTabs";
import PatientsTable from "@/app/patients/components/PatientsTable";
import { getPatientInfo } from "@/app/lib/utils";
import { Patient } from "fhir/r4";

export const availableDisplayTabs = ["Overview", "Patients", "Resources"];

const page = ({ params }: { params: { id: string } }) => {
  const dataset = useLiveQuery(() => getDataset(params.id));
  const [displayTab, setDisplayTab] = React.useState<
    (typeof availableDisplayTabs)[number]
  >(availableDisplayTabs[0]);

  if (!dataset) {
    return null;
  }

  const contentToRender = {
    Resources: <ResourceOverview dataset={dataset} />,
    Patients: (
      <PatientsTable
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
