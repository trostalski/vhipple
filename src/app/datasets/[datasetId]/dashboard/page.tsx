"use client";
import React from "react";
import MainWrapper from "../../../components/MainWrapper";
import DashboardHeader from "./components/DashboardHeader";
import DashboardCardList from "./components/DashboardCardList";
import { useLiveQuery } from "dexie-react-hooks";
import { getDataset } from "@/app/db/utils";

const page = ({ params }: { params: { datasetId: string } }) => {
  const { datasetId } = params;
  const dataset = useLiveQuery(() => getDataset(datasetId));

  if (!dataset) {
    return null;
  }

  return (
    <MainWrapper>
      <div className="flex flex-col w-full h-full shrink-0">
        <DashboardHeader />
        <DashboardCardList dataset={dataset} />
      </div>
    </MainWrapper>
  );
};

export default page;
