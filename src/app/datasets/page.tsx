"use client";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import DatasetsHeader from "./components/DatasetsHeader";
import DatasetList from "./components/DatasetList";
import HNSHeader from "../components/HNSHeader";
import Cookies from "universal-cookie";
import { addDataset } from "../db/utils";
import {
  getExampleDataset,
  generateDefaultDatasetDashboardCards,
  generateDefaultPatientCohorts,
} from "./lib/datasetUtils";

const page = () => {
  const cookies = new Cookies();

  useEffect(() => {
    const addExampleDataset = async () => {
      const dataset = await getExampleDataset();
      await addDataset(dataset);
      await generateDefaultDatasetDashboardCards(dataset);
      await generateDefaultPatientCohorts(dataset);
    };

    if (!cookies.get("known_user")) {
      addExampleDataset();
      cookies.set("known_user", true, { path: "/" });
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
