import React, { useEffect } from "react";
import { DashboardCard } from "../lib/types";
import LabelsInput from "./ChartDisplay/LabelsInput";
import YAxisRangeInput from "./ChartDisplay/YAxisRangeInput";
import LegendInput from "./ChartDisplay/LegendInput";
import DatasetColorInput from "./ChartDisplay/DatasetColorInput";
import { useRouter } from "next/navigation";
import { updateDashboardCard } from "@/app/datasets/lib/dashboardCardUtils";
import { Dataset } from "@/app/datasets/lib/types";

interface BoxMenuProps {
  card: DashboardCard;
  handleDelete: () => void;
  setShowMenu: (showMenu: boolean) => void;
  dataset: Dataset;
}

const BoxMenu = (props: BoxMenuProps) => {
  const { card, handleDelete, setShowMenu, dataset } = props;
  const router = useRouter();
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
            router.push(
              `/datasets/${dataset.id}/dashboard/chart-editor?cardId=${card.id}`
            );
          }}
        >
          Edit
        </button>
        <button className="text-red-500 hover:underline" onClick={handleDelete}>
          Delete
        </button>
      </div>
      <hr className="border-gray-200 w-full my-1" />{" "}
      <LabelsInput
        card={card}
        onChangeXLabels={async (e) => {
          await updateDashboardCard(
            {
              ...card,
              showXLabels: !card.showXLabels,
            },
            dataset
          );
        }}
        onChangeYLabels={async (e) => {
          await updateDashboardCard(
            {
              ...card,
              showYLabels: !card.showYLabels,
            },
            dataset
          );
        }}
      />
      <div className="flex flex-row items-center gap-2 px-2">
        <YAxisRangeInput
          card={card}
          onChangeYMax={async (e) => {
            await updateDashboardCard(
              {
                ...card,
                yMax: e.target.value,
              },
              dataset
            );
          }}
          onChangeYMin={async (e) => {
            await updateDashboardCard(
              {
                ...card,
                yMin: e.target.value,
              },
              dataset
            );
          }}
        />
      </div>
      <hr className="border-gray-200 w-full my-1" />
      <LegendInput
        card={card}
        onChangeLegendPosition={async (e) => {
          await updateDashboardCard(
            {
              ...card,
              legendPosition: e.target.value,
            },
            dataset
          );
        }}
        onChangeShowLegend={async (e) => {
          await updateDashboardCard(
            {
              ...card,
              showLegend: !card.showLegend,
            },
            dataset
          );
        }}
      />
      <hr className="border-gray-200 w-full my-1" />
      <DatasetColorInput
        card={card}
        onChange={async (e, itemId) =>
          await updateDashboardCard(
            {
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
            },
            dataset
          )
        }
      />
    </div>
  );
};
export default BoxMenu;
