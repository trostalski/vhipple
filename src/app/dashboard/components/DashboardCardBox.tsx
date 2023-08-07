import React, { useState, useRef, useEffect } from "react";
import useResize from "../hooks/useResize";
import {
  cardMaxHeight,
  cardMaxWidth,
  cardMinHeight,
  cardMinWidth,
  cardStartHeight,
  cardStartWidth,
  maxNumDataPoints,
} from "../lib/constants";
import { CiMenuKebab } from "react-icons/ci";
import { deleteDashboardCard, updateDashboardCard } from "@/app/db/utils";
import BoxMenu from "./BoxMenu";
import ChartComp from "./ChartComp";
import { DashboardCard } from "../lib/types";

interface DashboardCardBoxProps {
  card: DashboardCard;
}

const DashboardCardBox = (props: DashboardCardBoxProps) => {
  const resizeRef = useRef<HTMLInputElement>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [numDataPoints, setNumDataPoints] = useState(props.card.numDataPoints); // specifies the number of data points to show in the chart
  const { resizeWidth, resizeHeight, startResizing, stopResizing, isResizing } =
    useResize(
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
        className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize bg-blue-500 rounded-md"
        onMouseDown={(e) => {
          e.preventDefault();
          startResizing();
        }}
        onMouseUp={(e) => {
          e.preventDefault();
          stopResizing();
        }}
      />
      <div className="flex flex-row justify-between items-center p-4">
        <div>
          <h1 className="text-2xl font-bold">{props.card.title}</h1>
          <p className="text-gray-500">{props.card.description}</p>
        </div>
        <div className="">
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
              card={props.card}
              handleDelete={handleDelete}
              setShowMenu={setShowMenu}
              showMenu
            />
          )}
        </div>
      </div>
      {props.card.showChart && (
        <>
          <ChartComp card={props.card} />{" "}
          <div className="flex items-center justify-center w-full">
            <input
              type="range"
              min="1"
              max={maxNumDataPoints}
              className="w-48 h-2 bg-gray-200 mb-2 rounded-lg appearance-none cursor-pointer"
              value={numDataPoints}
              onChange={(e) => {
                setNumDataPoints(Number(e.target.value));
              }}
              onKeyDown={async (e) => {
                if (
                  e.key === "Enter" ||
                  e.key === "ArrowUp" ||
                  e.key === "ArrowDown" ||
                  e.key === "ArrowLeft" ||
                  e.key === "ArrowRight"
                ) {
                  await updateDashboardCard(props.card.title, {
                    ...props.card,
                    numDataPoints: numDataPoints,
                  });
                }
              }}
              onMouseUp={async () => {
                await updateDashboardCard(props.card.title, {
                  ...props.card,
                  numDataPoints: numDataPoints,
                });
              }}
            />
            <span className="text-gray-400 w-4 ml-2 pb-2">{numDataPoints}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardCardBox;
