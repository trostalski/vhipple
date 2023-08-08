"use client";
import { getDatasetNames } from "@/app/db/utils";
import { useLiveQuery } from "dexie-react-hooks";
import React from "react";
import Select from "react-select";

const PatientsHeader = () => {
  const datasetNames = useLiveQuery(getDatasetNames);
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between items-center h-12">
        <h1 className="text-3xl font-bold">Patients</h1>
        <span className="grow" />
      </div>
      <div className="flex flex-row"></div>
    </div>
  );
};

export default PatientsHeader;
