"use client";
import React, { useEffect } from "react";
import DatasetsHeader from "./components/DatasetsHeader";
import DatasetList from "./components/DatasetList";
import HNSHeader from "../components/HNSHeader";
import { addDataset } from "../db/utils";
import {
  getExampleDataset,
  generateDefaultDatasetDashboardCards,
  generateDefaultPatientCohorts,
} from "./lib/datasetUtils";

const page = () => {
  useEffect(() => {
    const addExampleDataset = async () => {
      const dataset = await getExampleDataset();
      await addDataset(dataset);
      await generateDefaultDatasetDashboardCards(dataset);
      await generateDefaultPatientCohorts(dataset);
    };

    const alreadyVisited = localStorage.getItem("already_visited");

    if (!alreadyVisited) {
      addExampleDataset();
      localStorage.setItem("already_visited", "true");
    }
  }, []);

  return (
    <div className="flex flex-col w-full h-full px-48 py-12">
      <HNSHeader />
      <DatasetsHeader />
      <DatasetList />
    </div>
  );
};

export default page;
