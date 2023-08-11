"use client";
import React, { useState } from "react";
import MainWrapper from "../components/MainWrapper";
import DatasetsHeader from "./components/DatasetsHeader";
import DatasetList from "./components/DatasetList";

const page = () => {
  return (
    <MainWrapper>
      <div className="flex flex-col w-full h-full">
        <DatasetsHeader />
        <DatasetList />
      </div>
    </MainWrapper>
  );
};

export default page;
