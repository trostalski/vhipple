import React from "react";
import { DashboardCard } from "../lib/types";
import { updateDashboardCard } from "@/app/db/utils";
import { maxNumDataPoints } from "../lib/constants";

interface DataPointsRangeProps {
  numDataPoints: number;
  setNumDataPoints: (numDataPoints: number) => void;
  card: DashboardCard;
}

const DataPointsRange = (props: DataPointsRangeProps) => {
  const { numDataPoints, setNumDataPoints, card } = props;
  const updateCardDataPoints = async () => {
    await updateDashboardCard(card.id, {
      ...card,
      numDataPoints: numDataPoints,
    });
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === "Enter" ||
      e.key === "ArrowUp" ||
      e.key === "ArrowDown" ||
      e.key === "ArrowLeft" ||
      e.key === "ArrowRight"
    ) {
      await updateCardDataPoints();
    }
  };

  const handleMouseUp = async () => {
    await updateCardDataPoints();
  };

  return (
    <div className="flex items-center justify-center w-full">
      <input
        type="range"
        min="1"
        max={maxNumDataPoints}
        className="w-48 h-2 bg-gray-200 mb-2 rounded-lg appearance-none cursor-pointer"
        value={numDataPoints}
        onChange={(e) => {
          setNumDataPoints(Number(e.target.value));
        }}
        onKeyDown={(e) => handleKeyDown(e)}
        onMouseUp={async () => handleMouseUp()}
      />
      <span className="text-gray-400 w-4 ml-2 pb-2">{numDataPoints}</span>
    </div>
  );
};

export default DataPointsRange;
