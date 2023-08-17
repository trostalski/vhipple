import React from "react";
import { DashboardCard } from "../../lib/types";
import { availableChartColours } from "../../lib/constants";

interface DatasetColorInputProps {
  card: DashboardCard;
  onChange: (e: any, itemid: string) => void;
}

const DatasetColorInput = (props: DatasetColorInputProps) => {
  const { card, onChange } = props;
  return (
    <div className="flex flex-col px-2 max-h-24 gap-1 w-full overflow-scroll">
      {card.cohortColorPalletes.map(
        (item) => (
          console.log(item),
          (
            <div className="flex flex-row w-full" key={item.id}>
              <span className="w-24 grow">{item.name}</span>
              <select
                id="dataset-colour"
                className="border border-gray-300 rounded-md w-20"
                value={
                  card.cohortColorPalletes.find((d) => d.id === item.id)!
                    .chartColour
                }
                onChange={async (e) => onChange(e, item.id)}
              >
                {availableChartColours.map((colour) => (
                  <option value={colour.name} key={colour.name}>
                    {colour.name}
                  </option>
                ))}
              </select>
            </div>
          )
        )
      )}
    </div>
  );
};

export default DatasetColorInput;
