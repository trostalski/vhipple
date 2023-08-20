"use client";
import MainWrapper from "@/app/components/MainWrapper";
import { getPatient } from "@/app/db/utils";
import { useLiveQuery } from "dexie-react-hooks";
import React, { useState } from "react";
import PatientHeader from "./components/PatientHeader";
import { Patient } from "fhir/r4";
import { PatientData } from "../lib/patientData";
import LoadingScreen from "@/app/components/LoadingScreen";
import DisplayTabs from "../components/DisplayTabs";
import PatientOverview from "./components/PatientOverview";
import VisTimeline from "./components/VisTimeline";
import VisNetwork from "./components/VisNetwork";
import { availablePatientDisplayTabs } from "./lib/constants";

const page = ({
  params,
}: {
  params: { datasetId: string; patientId: string };
}) => {
  const { datasetId, patientId } = params;
  const [displayTab, setDisplayTab] = useState<
    (typeof availablePatientDisplayTabs)[number]
  >(availablePatientDisplayTabs[0]);
  const patientContainer = useLiveQuery(() =>
    getPatient(patientId, datasetId)
  )!;

  if (!patientContainer) return <LoadingScreen />;

  const patient = patientContainer?.resource as Patient;
  const patientData = new PatientData(
    patient,
    patientContainer.referencedBy,
    datasetId
  );

  const contentToRender = {
    Overview: <PatientOverview patientData={patientData} />,
    Timeline: <VisTimeline resources={patientData.connectedResources} />,
    Network: <VisNetwork patientData={patientData} />,
  };

  return (
    <MainWrapper>
      {!patient ? (
        <span className="text-gray-500">No patient found.</span>
      ) : (
        <div className="flex flex-col gap-4 h-full w-full">
          <PatientHeader patient={patient! as Patient} />
          <DisplayTabs
            displayTab={displayTab}
            setDisplayTab={setDisplayTab}
            availableDisplayTabs={availablePatientDisplayTabs}
          />
          {displayTab in contentToRender &&
            contentToRender[displayTab as keyof typeof contentToRender]}
        </div>
      )}
    </MainWrapper>
  );
};

export default page;
