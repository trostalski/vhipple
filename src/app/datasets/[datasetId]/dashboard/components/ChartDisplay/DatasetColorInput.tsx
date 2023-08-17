import React from "react";
import { DashboardCard } from "../../lib/types";
import { availableChartColours } from "../../lib/constants";
import { updateDashboardCard } from "@/app/db/utils";

interface DatasetColorInputProps {
  card: DashboardCard;
}

const DatasetColorInput = (props: DatasetColorInputProps) => {
  const { card } = props;
  return (
    <div className="flex flex-col px-2 max-h-24 gap-1 w-full overflow-scroll">
      <span className="">Chart Colours</span>
      {card.cohortColorPalletes.map((item) => (
        <div className="flex flex-row w-full" key={item.id}>
          <span className="w-24">{item.name}</span>
          <select
            id="dataset-colour"
            className="border border-gray-300 rounded-md w-full"
            value={
              card.cohortColorPalletes.find((d) => d.id === item.id)!
                .chartColour
            }
            onChange={async (e) => {
              await updateDashboardCard(card.id, {
                ...card,
                cohortColorPalletes: card.cohortColorPalletes.map((c) => {
                  if (c.id === item.id) {
                    return {
                      ...c,
                      chartColour: e.target.value,
                    };
                  }
                  return c;
                }),
              });
            }}
          >
            {availableChartColours.map((colour) => (
              <option value={colour.name} key={colour.name}>
                {colour.name}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default DatasetColorInput;
