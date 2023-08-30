"use client";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import DatasetsHeader from "./components/DatasetsHeader";
import DatasetList from "./components/DatasetList";
import HNSHeader from "../components/HNSHeader";
import useJoyRide from "../hooks/useJoyRide";
import Cookies from "universal-cookie";
import { addDataset } from "../db/utils";
import {
  getExampleDataset,
  generateDefaultDatasetDashboardCards,
  generateDefaultPatientCohorts,
} from "./lib/datasetUtils";
const JoyRideNoSSR = dynamic(() => import("react-joyride"), { ssr: false });

const page = () => {
  const { joyrideDatasets } = useJoyRide();
  const cookies = new Cookies();

  useEffect(() => {
    const addExampleDataset = async () => {
      const dataset = await getExampleDataset();
      await addDataset(dataset);
      await generateDefaultDatasetDashboardCards(dataset);
      await generateDefaultPatientCohorts(dataset);
    };

    if (!cookies.get("known_user")) {
      addExampleDataset();
      cookies.set("known_user", true, { path: "/" });
    }
  }, []);

  if (cookies.get("datasets_joyride")) {
    joyrideDatasets.run = false;
  }
  return (
    <div className="flex flex-col w-full h-full px-48 py-12">
      <HNSHeader />
      <DatasetsHeader />
      <DatasetList />
      <JoyRideNoSSR
        callback={(state) => {
          if (state.status === "finished") {
            cookies.set("datasets_joyride", true, { path: "/" });
          }
        }}
        steps={joyrideDatasets.steps}
        run={joyrideDatasets.run}
        showProgress={true}
      />
    </div>
  );
};

export default page;
