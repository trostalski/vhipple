import React, { useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import BoxMenu from "./BoxMenu";
import ChartComp from "./ChartComp";
import { DashboardCard } from "../lib/types";
import DataPointsRange from "./DataPointsRange";
import { IoExpand } from "react-icons/io5";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Tooltip } from "react-tooltip";
import { BiCollapse } from "react-icons/bi";
import { Dataset } from "@/app/datasets/lib/types";
import { deleteDashboardCard } from "@/app/datasets/lib/dashboardCardUtils";
import { toastSuccess } from "@/app/lib/toasts";

interface DashboardCardBoxProps {
  card: DashboardCard;
  setExpandedId: React.Dispatch<React.SetStateAction<string | undefined>>;
  expandedId: string | undefined;
  dataset: Dataset;
}

const DashboardCardBox = (props: DashboardCardBoxProps) => {
  const { card, setExpandedId, expandedId, dataset } = props;
  const [showMenu, setShowMenu] = useState(false);
  const [numDataPoints, setNumDataPoints] = useState(card.numDataPoints); // specifies the number of data points to show in the chart

  const handleDelete = async () => {
    const res = await deleteDashboardCard(card.id, dataset);
    if (res) {
      toastSuccess("Card deleted successfully");
    } else {
      toastSuccess("Error deleting card");
    }
  };

  const isExpanded = card.id === expandedId;

  const TopButtons = () => {
    return (
      <div className="flex flex-row items-center gap-1">
        <button
          className="text-primary-button border rounded-md p-1 transition hover:scale-110"
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu(!showMenu);
          }}
        >
          <CiMenuKebab size={16} />
        </button>
        {showMenu && (
          <BoxMenu
            dataset={dataset}
            card={card}
            handleDelete={handleDelete}
            setShowMenu={setShowMenu}
          />
        )}
        {isExpanded ? (
          <button
            className="text-primary-button border rounded-md p-1 transition hover:scale-110"
            onClick={() => {
              setExpandedId(undefined);
            }}
          >
            <BiCollapse size={16} />
          </button>
        ) : (
          <button
            className="text-primary-button border rounded-md p-1 transition hover:scale-110"
            onClick={() => {
              setExpandedId(card.id);
            }}
          >
            <IoExpand size={16} />
          </button>
        )}
      </div>
    );
  };

  return (
    <div
      className="relative flex flex-grow flex-col h-full w-full bg-white rounded-lg shadow-md overflow-scroll"
      onClick={() => setShowMenu(false)}
    >
      <div className="flex flex-row justify-between items-center p-4">
        <div className="flex flex-row items-center gap-2">
          <h1 className="text-sm font-bold">{card.title}</h1>
          <AiOutlineInfoCircle
            size={24}
            className="text-primary-button"
            data-tooltip-id={`description-tooltip-${card.id}`}
            data-tooltip-content={card.description}
          />
          <Tooltip id={`description-tooltip-${card.id}`} />
          {/* <p className="text-gray-500">{card.description}</p> */}
        </div>
        <TopButtons />
      </div>
      <div className="h-5/6">
        <ChartComp card={card} />
      </div>
      <DataPointsRange
        card={card}
        dataset={dataset}
        numDataPoints={numDataPoints}
        setNumDataPoints={setNumDataPoints}
      />
    </div>
  );
};

export default DashboardCardBox;
