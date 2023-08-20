"use client";
import React, { useState } from "react";
import DatasetsHeader from "./components/DatasetsHeader";
import DatasetList from "./components/DatasetList";
import HNSHeader from "../components/HNSHeader";

const page = () => {
  return (
    <div className="flex flex-col w-full h-full px-48 py-12">
      <HNSHeader />
      <DatasetsHeader />
      <DatasetList />
    </div>
  );
};

export default page;
