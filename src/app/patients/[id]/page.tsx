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
import PatientDisplayTabs from "./components/PatientDisplayTabs";
import PatientOverview from "./components/PatientOverview";
import VisTimeline from "./components/VisTimeline";
import VisNetwork from "./components/VisNetwork";

export const availableDisplayTabs = ["Overview", "Timeline", "Network"];

const page = ({ params }: { params: { id: string } }) => {
  const searchParams = useSearchParams();
  const datasetName = searchParams.get("dataset");
  const [displayTab, setDisplayTab] =
    React.useState<(typeof availableDisplayTabs)[number]>("Overview");
  const patientContainer = useLiveQuery(() =>
    getPatient(params.id, datasetName!)
  )!;

  if (!patientContainer) return <LoadingScreen />;

  const patient = patientContainer?.resource as Patient;
  const patientData = new PatientData(
    patient,
    patientContainer.referencedBy,
    datasetName!
  );

  return (
    <MainWrapper>
      {!patient ? (
        <span className="text-gray-500">No patient found.</span>
      ) : (
        <div className="flex flex-col gap-4 h-full w-full">
          <PatientHeader patient={patient! as Patient} />
          <PatientDisplayTabs
            displayTab={displayTab}
            setDisplayTab={setDisplayTab}
          />
          {displayTab === "Overview" && (
            <PatientOverview patientData={patientData} />
          )}
          {displayTab === "Timeline" && (
            <VisTimeline resources={patientData.connectedResources} />
          )}
          {displayTab === "Network" && <VisNetwork patientData={patientData} />}
        </div>
      )}
    </MainWrapper>
  );
};

export default page;
