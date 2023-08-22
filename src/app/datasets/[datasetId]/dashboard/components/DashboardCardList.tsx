"use client";
import { updateDataset } from "@/app/db/utils";
import React from "react";
import DashboardCardBox from "./DashboardCardBox";
import { Dataset } from "@/app/datasets/lib/types";
import { RiRefreshLine } from "react-icons/ri";

interface DashboardCardListProps {
  dataset: Dataset;
}

const DashboardCardList = (props: DashboardCardListProps) => {
  const { dataset } = props;
  const [expandedId, setExpandedId] = React.useState<string | undefined>(
    undefined
  );

  const dashboardCards = dataset.dashboardCards;

  if (!dashboardCards) {
    return null;
  }

  return (
    <div className="h-full w-full pb-24">
      <div className="flex flex-row items-center gap-2">
        <label htmlFor="colNumber">Number of columns </label>
        <input
          id="colNumber"
          type="number"
          className="p-2 my-2 w-16 border rounded-md text-center"
          onChange={async (e) => {
            const newColNum = Math.max(parseInt(e.target.value), 1);
            await updateDataset(dataset.id, {
              ...dataset,
              dashboardColNums: newColNum,
            });
          }}
          value={dataset.dashboardColNums}
        />
        <button
          className="px-2 py-2 border rounded-md bg-white text-primary-button transition hover:scale-110"
          onClick={() => window.location.reload()}
        >
          <RiRefreshLine size={24} />
        </button>
      </div>
      {!expandedId ? (
        <div
          className={`grid h-full w-full content-start gap-4 rounded-md`}
          style={{
            gridTemplateColumns: `repeat(${dataset.dashboardColNums}, minmax(0, 1fr))`,
          }}
        >
          {!dashboardCards || dashboardCards?.length === 0 ? (
            <span className="text-gray-500">No card found.</span>
          ) : (
            dashboardCards.map((card) => (
              <div
                key={card.id}
                style={{
                  height: `${Math.min(140 / dataset.dashboardColNums, 100)}vh`,
                }}
              >
                <DashboardCardBox
                  dataset={dataset}
                  card={card}
                  key={card.title}
                  expandedId={expandedId}
                  setExpandedId={setExpandedId}
                />
              </div>
            ))
          )}
        </div>
      ) : (
        dashboardCards
          .filter((card) => card.id === expandedId)
          .map((card) => (
            <div className="h-full w-full">
              <DashboardCardBox
                dataset={dataset}
                card={card}
                key={card.id}
                expandedId={expandedId}
                setExpandedId={setExpandedId}
              />
            </div>
          ))
      )}
    </div>
  );
};

export default DashboardCardList;
