import React from "react";
import { DashboardCard } from "../../lib/types";

interface LabelsInputProps {
  card: DashboardCard;
  onChangeXLabels: (e: any) => void;
  onChangeYLabels: (e: any) => void;
}

const LabelsInput = (props: LabelsInputProps) => {
  const { card, onChangeXLabels, onChangeYLabels } = props;
  return (
    <>
      <div className="flex flex-row items-center gap-2 px-2">
        <input
          id="x-labels"
          type="checkbox"
          className=""
          checked={card.showXLabels}
          onChange={onChangeXLabels}
        />
        <label htmlFor="x-labels" className="">
          x-Labels
        </label>
      </div>
      <div className="flex flex-row items-center gap-2 px-2">
        <input
          id="y-labels"
          type="checkbox"
          className=""
          checked={card.showYLabels}
          onChange={onChangeYLabels}
        />
        <label htmlFor="y-labels" className="">
          y-Labels
        </label>
      </div>
    </>
  );
};

export default LabelsInput;
