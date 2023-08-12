import React, { useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { deleteDashboardCard } from "@/app/db/utils";
import BoxMenu from "./BoxMenu";
import ChartComp from "./ChartComp";
import { DashboardCard } from "../lib/types";
import DataPointsRange from "./DataPointsRange";
import { IoExpand } from "react-icons/io5";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Tooltip } from "react-tooltip";

interface DashboardCardBoxProps {
  card: DashboardCard;
}

const DashboardCardBox = (props: DashboardCardBoxProps) => {
  const { card } = props;
  const [showMenu, setShowMenu] = useState(false);
  const [numDataPoints, setNumDataPoints] = useState(card.numDataPoints); // specifies the number of data points to show in the chart

  const handleDelete = async () => {
    await deleteDashboardCard(card.id);
  };

  const TopButtons = () => {
    return (
      <div className="flex flex-row items-center gap-2">
        <button className="text-primary-button border rounded-md px-2 py-1 transition hover:scale-110">
          {"<"}
        </button>
        <button className="text-primary-button border rounded-md px-2 py-1 transition hover:scale-110">
          {">"}
        </button>
        <button
          className="text-primary-button border rounded-md px-2 py-1 transition hover:scale-110"
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu(!showMenu);
          }}
        >
          <CiMenuKebab size={24} />
        </button>
        {showMenu && (
          <BoxMenu
            card={card}
            handleDelete={handleDelete}
            setShowMenu={setShowMenu}
          />
        )}
        <button
          className="text-primary-button border rounded-md px-2 py-1 transition hover:scale-110"
          onClick={(e) => {}}
        >
          <IoExpand size={24} />
        </button>
      </div>
    );
  };

  return (
    <div
      className="flex flex-col h-[60vh] relative bg-white rounded-lg shadow-md flex-shrink-0 grow-0"
      onClick={() => setShowMenu(false)}
    >
      <div className="flex flex-row grow-0 justify-between items-center p-4">
        <div className="flex flex-row items-center gap-2">
          <h1 className="text-2xl font-bold">{card.title}</h1>
          <AiOutlineInfoCircle
            size={24}
            className="text-primary-button"
            data-tooltip-id="description-tooltip"
            data-tooltip-content={card.description}
          />
          <Tooltip id="description-tooltip" />
          {/* <p className="text-gray-500">{card.description}</p> */}
        </div>
        <TopButtons />
      </div>
      <div className="h-full">
        <ChartComp card={card} />
      </div>
      <DataPointsRange
        card={card}
        numDataPoints={numDataPoints}
        setNumDataPoints={setNumDataPoints}
      />
    </div>
  );
};

export default DashboardCardBox;
