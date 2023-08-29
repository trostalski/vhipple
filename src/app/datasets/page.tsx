"use client";
import dynamic from "next/dynamic";
import React from "react";
import DatasetsHeader from "./components/DatasetsHeader";
import DatasetList from "./components/DatasetList";
import HNSHeader from "../components/HNSHeader";
import useJoyRide from "../hooks/useJoyRide";
import Cookies from "universal-cookie";
const JoyRideNoSSR = dynamic(() => import("react-joyride"), { ssr: false });

const page = () => {
  const { joyrideDatasets } = useJoyRide();
  const cookies = new Cookies();
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
          if (
            state.status === "finished" ||
            state.index === joyrideDatasets.steps.length - 1
          ) {
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
