"use client";
import { getDashboardCards } from "@/app/db/utils";
import { useLiveQuery } from "dexie-react-hooks";
import React from "react";
import DashboardCardBox from "./DashboardCardBox";

interface DashboardCardListProps {
  datasetId?: string;
}

const DashboardCardList = (props: DashboardCardListProps) => {
  const dashboardCards = useLiveQuery(getDashboardCards) || [];
  return (
    <div className="grid h-full w-full grid-cols-2 content-start gap-4 items-center justify-center rounded-md mt-2">
      {!dashboardCards || dashboardCards?.length === 0 ? (
        <span className="text-gray-500">No card found.</span>
      ) : (
        dashboardCards.map((card) => (
          <DashboardCardBox card={card} key={card.title} />
        ))
      )}
    </div>
  );
};

export default DashboardCardList;
