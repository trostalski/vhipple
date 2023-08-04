import React, { useState, useRef, useEffect } from "react";
import useResize from "../hooks/useResize";
import {
  cardMaxHeight,
  cardMaxWidth,
  cardMinHeight,
  cardMinWidth,
  cardStartHeight,
  cardStartWidth,
} from "../lib/constants";
import { DashboardCard } from "@/app/lib/types";
import { CiMenuKebab } from "react-icons/ci";
import { deleteDashboardCard, updateDashboardCard } from "@/app/db/utils";
import BoxMenu from "./BoxMenu";
import { Bar } from "react-chartjs-2";
import { ChartData } from "chart.js";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface DashboardCardBoxProps {
  card: DashboardCard;
}

interface ChartCompProps {
  card: DashboardCard;
}

const ChartComp = (props: ChartCompProps) => {
  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        display: false,
      },
    },
    plugins: {
      legend: { display: false },
    },
  };
  return (
    <div className="h-full overflow-hidden">
      <Bar
        options={options}
        style={{
          width: "100%",
          height: "100%",
        }}
        data={
          props.card.data as ChartData<
            "bar",
            (number | [number, number] | null)[],
            unknown
          >
        }
      />
    </div>
  );
};

const DashboardCardBox = (props: DashboardCardBoxProps) => {
  const resizeRef = useRef<HTMLInputElement>(null);
  const [showMenu, setShowMenu] = useState(false);
  const { resizeWidth, resizeHeight, startResizing, isResizing } = useResize(
    resizeRef,
    props.card.width || cardStartWidth,
    props.card.height || cardStartHeight
  );

  useEffect(() => {
    const updateCard = async () => {
      await updateDashboardCard(props.card.title, {
        ...props.card,
        width: resizeWidth,
        height: resizeHeight,
      });
    };
    if (!isResizing) {
      updateCard();
    }
  }, [isResizing]);

  const handleDelete = async () => {
    await deleteDashboardCard(props.card.title);
  };

  return (
    <div
      className="flex flex-col relative bg-white rounded-lg shadow-md flex-shrink-0"
      ref={resizeRef}
      style={{
        width: resizeWidth,
        height: resizeHeight,
        maxHeight: cardMaxHeight,
        minHeight: cardMinHeight,
        maxWidth: cardMaxWidth,
        minWidth: cardMinWidth,
      }}
      onClick={() => setShowMenu(false)}
    >
      <div
        className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize bg-blue-500"
        onMouseDown={(e) => {
          e.preventDefault();
          startResizing();
        }}
      />
      <div className="flex flex-row justify-between items-center p-4">
        <div>
          <h1 className="text-2xl font-bold">{props.card.title}</h1>
          <p className="text-gray-500">{props.card.description}</p>
        </div>
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
          >
            <CiMenuKebab size={24} />
          </button>
          {showMenu && (
            <BoxMenu
              handleDelete={handleDelete}
              setShowMenu={setShowMenu}
              showMenu
            />
          )}
        </div>
      </div>
      <ChartComp card={props.card} />
    </div>
  );
};

export default DashboardCardBox;
