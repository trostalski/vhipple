"use client";
import { getDashboardCards } from "@/app/db/utils";
import { useLiveQuery } from "dexie-react-hooks";
import React from "react";
import DashboardCardBox from "./DashboardCardBox";

const DashboardCardList = () => {
  const dashboardCards = useLiveQuery(getDashboardCards) || [];
  return (
    <div className="flex flex-row flex-wrap gap-4 mt-4">
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
