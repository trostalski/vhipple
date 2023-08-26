"use client";
import dynamic from "next/dynamic";

const JoyRideNoSSR = dynamic(() => import("react-joyride"), { ssr: false });
import React, { useState } from "react";
import DatasetsHeader from "./components/DatasetsHeader";
import DatasetList from "./components/DatasetList";
import HNSHeader from "../components/HNSHeader";

const page = () => {
  const [{ run, steps }, setState] = useState({
    run: true,
    steps: [
      {
        target: "#add-dataset-button",
        content: "Press this button to add a new dataset.",
      },
      {
        target: "#bundle-upload-div",
        content: "Upload FHIR R4 Bundles to your dataset.",
      },
    ],
  });

  return (
    <div className="flex flex-col w-full h-full px-48 py-12">
      <JoyRideNoSSR
        callback={() => {}}
        steps={steps}
        run={run}
        showProgress={true}
      />
      <HNSHeader />
      <DatasetsHeader />
      <DatasetList />
    </div>
  );
};

export default page;
