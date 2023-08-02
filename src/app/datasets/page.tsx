"use client";
import React, { useState } from "react";
import MainWrapper from "../components/MainWrapper";
import DatasetBox from "./components/DatasetBox";
import { useLiveQuery } from "dexie-react-hooks";
import { getDatasets } from "../db/utils";
import AddDatasetModal from "./components/AddDatasetModal";

const page = () => {
  const datasets = useLiveQuery(getDatasets);
  const [showModal, setShowModal] = useState(false);
  return (
    <MainWrapper>
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <h1 className="text-3xl font-bold">Datasets</h1>
          <button
            className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => setShowModal(true)}
          >
            New Dataset
          </button>
        </div>
        <div className="flex flex-row flex-wrap gap-4 mt-4">
          {!datasets || datasets?.length === 0 ? (
            <span className="text-gray-500">No dataset found.</span>
          ) : (
            datasets.map((dataset) => (
              <DatasetBox dataset={dataset} key={dataset.id} />
            ))
          )}
        </div>
      </div>
      <AddDatasetModal showModal={showModal} setShowModal={setShowModal} />
    </MainWrapper>
  );
};

export default page;
