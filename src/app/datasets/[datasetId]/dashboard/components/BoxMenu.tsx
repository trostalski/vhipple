import { updateDashboardCard } from "@/app/db/utils";
import React, { useEffect, useState } from "react";
import AddCardModal from "./AddCardModal";
import { editMode } from "@/app/datasets/lib/constants";
import { DashboardCard } from "../lib/types";
import LabelsInput from "./ChartDisplay/LabelsInput";
import YAxisRangeInput from "./ChartDisplay/YAxisRangeInput";
import LegendInput from "./ChartDisplay/LegendInput";
import DatasetColorInput from "./ChartDisplay/DatasetColorInput";

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
      <LabelsInput
        card={card}
        onChangeXLabels={async (e) => {
          await updateDashboardCard(card.id, {
            ...card,
            xLabels: e.target.value,
          });
        }}
        onChangeYLabels={async (e) => {
          await updateDashboardCard(card.id, {
            ...card,
            yLabels: e.target.value,
          });
        }}
      />
      <div className="flex flex-row items-center gap-2 px-2">
        <YAxisRangeInput
          card={card}
          onChangeYMax={async (e) => {
            await updateDashboardCard(card.id, {
              ...card,
              yMax: e.target.value,
            });
          }}
          onChangeYMin={async (e) => {
            await updateDashboardCard(card.id, {
              ...card,
              yMin: e.target.value,
            });
          }}
        />
      </div>
      <hr className="border-gray-200 w-full my-1" />
      <LegendInput
        card={card}
        onChangeLegendPosition={async (e) => {
          await updateDashboardCard(card.id, {
            ...card,
            legendPosition: e.target.value,
          });
        }}
        onChangeShowLegend={async (e) => {
          await updateDashboardCard(card.id, {
            ...card,
            showLegend: !card.showLegend,
          });
        }}
      />
      <hr className="border-gray-200 w-full my-1" />
      <DatasetColorInput
        card={card}
        onChange={async (e, itemId) =>
          await updateDashboardCard(card.id, {
            ...card,
            cohortColorPalletes: card.cohortColorPalletes.map((c) => {
              if (c.id === itemId) {
                return {
                  ...c,
                  chartColour: e.target.value,
                };
              }
              return c;
            }),
          })
        }
      />
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
