import React from "react";
import { DashboardCard } from "../../lib/types";

interface YAxisRangeInputProps {
  card: DashboardCard;
  onChangeYMin: (e: any) => void;
  onChangeYMax: (e: any) => void;
}

const YAxisRangeInput = (props: YAxisRangeInputProps) => {
  const { card, onChangeYMin, onChangeYMax } = props;
  const [yMin, setYMin] = React.useState<string | number | undefined>(
    card.yMin
  );
  const [yMax, setYMax] = React.useState<string | number | undefined>(
    card.yMax
  );
  return (
    <>
      <div className="flex flex-row gap-1">
        <input
          id="y-min"
          type="number"
          className="border border-gray-300 rounded-md w-12"
          value={yMin}
          onChange={(e) => setYMin(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onChangeYMin(e);
            }
          }}
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
          value={yMax}
          onChange={(e) => setYMax(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onChangeYMax(e);
            }
          }}
        />
        <label htmlFor="y-max" className="">
          y-Max
        </label>
      </div>
    </>
  );
};

export default YAxisRangeInput;
