"use client";
import React, { useState } from "react";
import MainWrapper from "../../../components/MainWrapper";
import PatientsHeader from "./components/PatientsHeader";
import { useLiveQuery } from "dexie-react-hooks";
import { getDataset } from "@/app/db/utils";
import { getPatientInfo } from "@/app/lib/utils";
import { Patient } from "fhir/r4";
import PatientsTable from "./components/PatientsTable";
import { useSearchParams } from "next/navigation";

const page = ({ params }: { params: { datasetId: string } }) => {
  const { datasetId } = params;
  const dataset = useLiveQuery(() => getDataset(datasetId));
  const searchParams = useSearchParams();
  const queryPatientCohortId = searchParams.get("cohortId");
  const [selectedPatientCohort, setSelectedPatientCohort] = useState<
    string | undefined
  >(queryPatientCohortId || "");

  if (!dataset) return null;

  let patients = dataset.resourceContainers.filter(
    (rc) => rc.resource.resourceType === "Patient"
  );

  if (selectedPatientCohort) {
    const patientCohort = dataset.patientCohorts.find(
      (pc) => pc.id === selectedPatientCohort
    );
    if (patientCohort) {
      patients = patients.filter((rc) =>
        patientCohort.patientIds.includes(rc.resource.id!)
      );
    }
  }

  const patientsInfo = patients.map((rc) =>
    getPatientInfo(rc.resource as Patient)
  );

  return (
    <MainWrapper>
      <div className="flex flex-col h-full w-full">
        <PatientsHeader
          selectedPatientCohort={selectedPatientCohort}
          patientCohorts={dataset.patientCohorts}
          setSelectedPatientCohort={setSelectedPatientCohort}
        />
        <PatientsTable datasetId={datasetId} inputData={patientsInfo} />
      </div>
    </MainWrapper>
  );
};

export default page;
