import React from "react";
import { DashboardCard } from "../../lib/types";

interface YAxisRangeInputProps {
  card: DashboardCard;
  onChangeYMin: (e: any) => void;
  onChangeYMax: (e: any) => void;
}

const YAxisRangeInput = (props: YAxisRangeInputProps) => {
  const { card, onChangeYMin, onChangeYMax } = props;
  return (
    <>
      <div className="flex flex-row gap-1">
        <input
          id="y-min"
          type="number"
          className="border border-gray-300 rounded-md w-12"
          value={card.yMin}
          onChange={onChangeYMin}
        />
        <label htmlFor="y-min" className="">
          y-Min
        </label>
      </div>
      <div className="flex flex-row gap-1">
        <input
          id="y-max"
          type="number"
          className="border border-gray-300 rounded-md w-12"
          value={card.yMax}
          onChange={onChangeYMax}
        />
        <label htmlFor="y-max" className="">
          y-Max
        </label>
      </div>
    </>
  );
};

export default YAxisRangeInput;
