import { updateDashboardCard } from "@/app/db/utils";
import React, { useEffect, useState } from "react";
import AddCardModal from "./AddCardModal";
import { editMode } from "@/app/datasets/lib/constants";
import {
  availableChartColours,
  availableLegendPositions,
} from "../lib/constants";
import { DashboardCard } from "../lib/types";

interface BoxMenuProps {
  card: DashboardCard;
  handleDelete: () => void;
  setShowMenu: (showMenu: boolean) => void;
}

const BoxMenu = (props: BoxMenuProps) => {
  const { card, handleDelete, setShowMenu } = props;
  useEffect(() => {
    window.addEventListener("click", function (e: any) {
      if (
        !document.getElementById("dashboard-card-box-menu")?.contains(e.target)
      ) {
        setShowMenu(false);
      }
    });
    return () => {
      window.removeEventListener("click", () => setShowMenu(false));
    };
  }, []);
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <div
      id="dashboard-card-box-menu"
      className="flex flex-col border-2 w-80 absolute items-start bg-white p-2 right-0 top-16 rounded-md shadow-md z-10"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="flex flex-row w-full justify-between">
        <button
          className="text-blue-500 hover:underline"
          onClick={() => {
            setShowEditModal(true);
          }}
        >
          Edit
        </button>
        <button className="text-red-500 hover:underline" onClick={handleDelete}>
          Delete
        </button>
      </div>
      <div className="flex flex-row items-center gap-2 px-2">
        <input
          id="show-chart"
          type="checkbox"
          className=""
          checked={card.showChart}
          onChange={() => {
            updateDashboardCard(card.id, {
              ...card,
              showChart: !card.showChart,
            });
          }}
        />
        <label htmlFor="show-chart" className="">
          show Chart
        </label>
      </div>
      <hr className="border-gray-200 w-full my-1" />
      <div className="flex flex-row items-center gap-2 px-2">
        <input
          id="x-labels"
          type="checkbox"
          className=""
          checked={card.showXLables}
          onChange={async () => {
            await updateDashboardCard(card.id, {
              ...card,
              showXLables: !card.showXLables,
            });
          }}
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
          checked={card.showYLables}
          onChange={() => {
            updateDashboardCard(card.id, {
              ...card,
              showYLables: !card.showYLables,
            });
          }}
        />
        <label htmlFor="y-labels" className="">
          y-Labels
        </label>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex flex-row items-center gap-2 px-2">
          <input
            id="y-min"
            type="number"
            className="border border-gray-300 rounded-md w-12"
            value={card.yMin}
            onChange={async (e) => {
              await updateDashboardCard(card.id, {
                ...card,
                yMin: e.target.value,
              });
            }}
          />
          <label htmlFor="y-min" className="">
            y-Min
          </label>
          <input
            id="y-max"
            type="number"
            className="border border-gray-300 rounded-md w-12"
            value={card.yMax}
            onChange={async (e) => {
              await updateDashboardCard(card.id, {
                ...card,
                yMax: e.target.value,
              });
            }}
          />
          <label htmlFor="y-max" className="">
            y-Max
          </label>
        </div>
      </div>
      <hr className="border-gray-200 w-full my-1" />
      <div className="flex flex-row items-center gap-2 px-2">
        <input
          id="legend"
          type="checkbox"
          className=""
          checked={card.showLegend}
          onChange={() => {
            updateDashboardCard(card.id, {
              ...card,
              showLegend: !card.showLegend,
            });
          }}
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
          onChange={(e) => {
            updateDashboardCard(card.id, {
              ...card,
              legendPosition: e.target.value,
            });
          }}
        >
          {availableLegendPositions.map((pos) => (
            <option value={pos} key={pos}>
              {pos}
            </option>
          ))}
        </select>
      </div>
      <hr className="border-gray-200 w-full my-1" />
      <div className="flex flex-col px-2 max-h-24 gap-1 w-full overflow-scroll">
        <span>Chart Colours</span>
        {card.datasetColorPalletes.map((dataset) => (
          <div className="flex flex-row w-full" key={dataset.id}>
            <span className="w-24">{dataset.name}</span>
            <select
              id="dataset-colour"
              className="border border-gray-300 rounded-md w-full"
              value={
                card.datasetColorPalletes.find((d) => d.id === dataset.id)!
                  .chartColour
              }
              onChange={(e) => {
                updateDashboardCard(card.id, {
                  ...card,
                  datasetColorPalletes: card.datasetColorPalletes.map((d) => {
                    if (d.id === dataset.id) {
                      return {
                        ...d,
                        chartColour: e.target.value,
                      };
                    }
                    return d;
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
      {showEditModal && (
        <AddCardModal
          mode={editMode}
          setShowModal={setShowEditModal}
          showModal={showEditModal}
          card={card}
        />
      )}
    </div>
  );
};
export default BoxMenu;
