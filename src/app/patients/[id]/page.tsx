"use client";
import MainWrapper from "@/app/components/MainWrapper";
import { getPatient } from "@/app/db/utils";
import { useLiveQuery } from "dexie-react-hooks";
import { useSearchParams } from "next/navigation";
import React from "react";
import PatientHeader from "./components/PatientHeader";
import { Patient } from "fhir/r4";
import { PatientData } from "../lib/patientData";
import LoadingScreen from "@/app/components/LoadingScreen";
import PatientResources from "./components/PatientResources";
import PatientInfoActive from "./components/PatientInfoActive";
import PatientDisplayTabs from "./components/PatientDisplayTabs";

const page = ({ params }: { params: { id: string } }) => {
  const searchParams = useSearchParams();
  const datasetName = searchParams.get("dataset");
  const patientContainer = useLiveQuery(() =>
    getPatient(params.id, datasetName!)
  )!;

  if (!patientContainer) return <LoadingScreen />;

  const patient = patientContainer?.resource as Patient;
  const patientData = new PatientData(patient, patientContainer.referencedBy);

  return (
    <MainWrapper>
      {!patient ? (
        <span className="text-gray-500">No patient found.</span>
      ) : (
        <div className="flex flex-col gap-4">
          <PatientHeader patient={patient! as Patient} />
          <PatientDisplayTabs />
          <PatientInfoActive patientData={patientData} />
          <PatientResources patientData={patientData} />
        </div>
      )}
    </MainWrapper>
  );
};

export default page;
