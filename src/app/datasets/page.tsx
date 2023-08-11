"use client";
import React, { useState } from "react";
import MainWrapper from "../components/MainWrapper";
import DatasetHeader from "./components/DatasetHeader";
import DatasetList from "./components/DatasetList";
import DatasetView from "./components/DatasetView";
import { mainListComp, mainViewComp } from "./lib/constants";
import { Dataset } from "./lib/types";

const page = () => {
  const [mainComp, setMainComp] = useState("list"); // list, view, edit
  const [viewDataset, setViewDataset] = useState<Dataset>();

  return (
    <MainWrapper>
      <div className="flex flex-col w-full h-full">
        <DatasetHeader mainComp={mainComp} setMainComp={setMainComp} />
        {mainComp === mainListComp && (
          <DatasetList
            setMainComp={setMainComp}
            setViewDataset={setViewDataset}
          />
        )}
        {mainComp === mainViewComp && viewDataset && (
          <DatasetView dataset={viewDataset} />
        )}
      </div>
    </MainWrapper>
  );
};

export default page;
