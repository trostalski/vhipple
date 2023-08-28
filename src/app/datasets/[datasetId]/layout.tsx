"use client";
import LeftSidebar from "@/app/components/Sidebar/LeftSidebar";
import useJoyRide from "@/app/hooks/useJoyRide";
import dynamic from "next/dynamic";
import React from "react";
import Cookies from "universal-cookie";
const JoyRideNoSSR = dynamic(() => import("react-joyride"), { ssr: false });

const layout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { datasetId: string };
}) => {
  const { datasetId } = params;

  // handle joyride guided tour
  const { joyrideDataset } = useJoyRide();
  const cookies = new Cookies();
  if (cookies.get("dataset_joyride")) {
    joyrideDataset.run = false;
  }

  return (
    <div className="h-full w-full flex flex-row">
      <JoyRideNoSSR
        callback={(state) => {
          console.log(state);
          if (state.action === "close") {
            console.log("finished");
            cookies.set("dataset_joyride", true, { path: "/" });
          }
        }}
        steps={joyrideDataset.steps}
        run={joyrideDataset.run}
        continuous={joyrideDataset.continuous}
      />
      <LeftSidebar datasetId={datasetId} />
      <main className="h-full w-full">{children}</main>
    </div>
  );
};

export default layout;
