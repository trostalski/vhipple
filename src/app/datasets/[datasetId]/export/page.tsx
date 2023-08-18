"use client";
import MainWrapper from "@/app/components/MainWrapper";
import React from "react";
import { ExportHeader } from "./components/ExportHeader";
import DisplayTabs from "../patients/components/DisplayTabs";
import CSVExport from "./components/CSVExport";
import { useLiveQuery } from "dexie-react-hooks";
import { getDataset } from "@/app/db/utils";
import FHIRExport from "./components/FHIRExport";

export const availableExportDisplayTabs = ["CSV", "FHIR"];

const page = ({ params }: { params: { datasetId: string } }) => {
  const [displayTab, setDisplayTab] = React.useState<
    (typeof availableExportDisplayTabs)[number]
  >(availableExportDisplayTabs[0]);
  const dataset = useLiveQuery(() => getDataset(params.datasetId));

  if (!dataset) {
    return null;
  }

  const contentToRender = {
    CSV: <CSVExport dataset={dataset} />,
    FHIR: <FHIRExport dataset={dataset} />,
  };

  return (
    <MainWrapper>
      <div className="flex flex-col w-full h-full overflow-scroll">
        <ExportHeader />
        <DisplayTabs
          availableDisplayTabs={availableExportDisplayTabs}
          displayTab={displayTab}
          setDisplayTab={setDisplayTab}
        />
        {contentToRender[displayTab as keyof typeof contentToRender]}
      </div>
    </MainWrapper>
  );
};

export default page;
