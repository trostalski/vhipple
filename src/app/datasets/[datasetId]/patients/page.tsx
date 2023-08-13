"use client";
import React from "react";
import MainWrapper from "../../../components/MainWrapper";
import PatientsHeader from "./components/PatientsHeader";
import { useLiveQuery } from "dexie-react-hooks";
import { getDataset } from "@/app/db/utils";
import { getPatientInfo } from "@/app/lib/utils";
import { Patient } from "fhir/r4";
import PatientsTable from "./components/PatientsTable";

const page = ({ params }: { params: { datasetId: string } }) => {
  const { datasetId } = params;
  const dataset = useLiveQuery(() => getDataset(datasetId));

  if (!dataset) return null;

  const patients = dataset.resourceContainers.filter(
    (rc) => rc.resource.resourceType === "Patient"
  );
  const patientsInfo = patients.map((rc) =>
    getPatientInfo(rc.resource as Patient)
  );

  return (
    <MainWrapper>
      <div className="flex flex-col h-full w-full">
        <PatientsHeader />
        <PatientsTable datasetId={datasetId} inputData={patientsInfo} />
      </div>
    </MainWrapper>
  );
};

export default page;
