import React from "react";
import { DashboardCard } from "../../lib/types";
import { availableLegendPositions } from "../../lib/constants";

interface LegendInputProps {
  card: DashboardCard;
  onChangeShowLegend: (e: any) => void;
  onChangeLegendPosition: (e: any) => void;
}

const LegendInput = (props: LegendInputProps) => {
  const { card, onChangeShowLegend, onChangeLegendPosition } = props;
  return (
    <>
      <div className="flex flex-row items-center gap-2 px-2">
        <input
          id="legend"
          type="checkbox"
          className=""
          checked={card.showLegend}
          onChange={onChangeShowLegend}
        />
        <label htmlFor="legend" className="">
          Legend
        </label>
      </div>
      <div className="flex flex-row items-center gap-2 px-1 w-full">
        <select
          id="legend-pos"
          disabled={!card.showLegend}
          className="border border-gray-300 rounded-md w-full"
          value={card.legendPosition}
          onChange={onChangeLegendPosition}
        >
          {availableLegendPositions.map((pos) => (
            <option value={pos} key={pos}>
              {pos}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default LegendInput;
