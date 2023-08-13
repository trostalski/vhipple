"use client";
import MainWrapper from "@/app/components/MainWrapper";
import React from "react";
import { ExportHeader } from "./components/ExportHeader";
import DisplayTabs from "../patients/components/DisplayTabs";

export const availableExportDisplayTabs = ["CSV", "FHIR"];

const page = ({ params }: { params: { datasetId: string } }) => {
  const [displayTab, setDisplayTab] = React.useState<
    (typeof availableExportDisplayTabs)[number]
  >(availableExportDisplayTabs[0]);

  return (
    <MainWrapper>
      <div className="flex flex-col w-full h-full">
        <ExportHeader />
        <DisplayTabs
          availableDisplayTabs={availableExportDisplayTabs}
          displayTab={displayTab}
          setDisplayTab={setDisplayTab}
        />
      </div>
    </MainWrapper>
  );
};

export default page;
