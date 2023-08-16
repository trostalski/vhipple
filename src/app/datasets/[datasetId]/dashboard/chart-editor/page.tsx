"use client";
import MainWrapper from "@/app/components/MainWrapper";
import React from "react";

const page = () => {
  return (
    <MainWrapper>
      <div
        id="ce-main-container"
        className="flex flex-row bg-white rounded-md h-full w-full"
      >
        <div
          id="ce-settings-container"
          className="flex flex-col h-full w-1/4 bg-gray-50 shadow-xl rounded-md"
        >
          <div className="flex flex-row justify-between">
            <span className="font-bold">Chart Editor</span>
            <button>Preview</button>
          </div>
        </div>
        <div id="ce-display-container"></div>
      </div>
    </MainWrapper>
  );
};

export default page;
