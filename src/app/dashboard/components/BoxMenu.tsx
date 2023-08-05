import { updateDashboardCard } from "@/app/db/utils";
import { DashboardCard } from "@/app/lib/types";
import React, { useEffect, useState } from "react";
import AddCardModal from "./AddCardModal";
import { editMode } from "@/app/datasets/lib/constants";
import {
  availableChartColours,
  availableLegendPositions,
} from "../lib/constants";

interface BoxMenuProps {
  card: DashboardCard;
  handleDelete: () => void;
  setShowMenu: (showMenu: boolean) => void;
  showMenu: boolean;
}

const BoxMenu = (props: BoxMenuProps) => {
  useEffect(() => {
    window.addEventListener("click", function (e: any) {
      if (
        !document.getElementById("dashboard-card-box-menu")?.contains(e.target)
      ) {
        props.setShowMenu(false);
      }
    });
    return () => {
      window.removeEventListener("click", () => props.setShowMenu(false));
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
        <button
          className="text-red-500 hover:underline"
          onClick={props.handleDelete}
        >
          Delete
        </button>
      </div>
      <div className="flex flex-row items-center gap-2 px-2">
        <input
          id="show-chart"
          type="checkbox"
          className=""
          checked={props.card.showChart}
          onChange={() => {
            updateDashboardCard(props.card.title, {
              ...props.card,
              showChart: !props.card.showChart,
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
          checked={props.card.showXLables}
          onChange={async () => {
            await updateDashboardCard(props.card.title, {
              ...props.card,
              showXLables: !props.card.showXLables,
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
          checked={props.card.showYLables}
          onChange={() => {
            updateDashboardCard(props.card.title, {
              ...props.card,
              showYLables: !props.card.showYLables,
            });
          }}
        />
        <label htmlFor="y-labels" className="">
          y-Labels
        </label>
      </div>
      <hr className="border-gray-200 w-full my-1" />
      <div className="flex flex-row items-center gap-2 px-2">
        <input
          id="legend"
          type="checkbox"
          className=""
          checked={props.card.showLegend}
          onChange={() => {
            updateDashboardCard(props.card.title, {
              ...props.card,
              showLegend: !props.card.showLegend,
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
          disabled={!props.card.showLegend}
          className="border border-gray-300 rounded-md w-full"
          value={props.card.legendPosition}
          onChange={(e) => {
            updateDashboardCard(props.card.title, {
              ...props.card,
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
        {props.card.datasets.map((dataset) => (
          <div className="flex flex-row w-full">
            <span className="w-24">{dataset.name}</span>
            <select
              id="dataset-colour"
              className="border border-gray-300 rounded-md w-full"
              value={dataset.chartColour}
              onChange={(e) => {
                updateDashboardCard(props.card.title, {
                  ...props.card,
                  datasets: props.card.datasets.map((d) => {
                    if (d.name === dataset.name) {
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
          card={props.card}
        />
      )}
    </div>
  );
};
export default BoxMenu;
