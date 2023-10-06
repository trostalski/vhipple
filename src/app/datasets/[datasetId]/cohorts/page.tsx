"use client";
import React, { useState } from "react";
import CohortList from "./components/CohortList";
import { useLiveQuery } from "dexie-react-hooks";
import { getDataset } from "@/app/db/utils";
import MainWrapper from "@/app/components/MainWrapper";
import SavePatientCohortModal from "./components/SavePatientCohortModal";
import { addMode } from "../../lib/constants";
import CohortsHeader from "./components/CohortsHeader";

const page = ({ params }: { params: { datasetId: string } }) => {
  const { datasetId } = params;
  const dataset = useLiveQuery(() => getDataset(datasetId));
  const [showModal, setShowModal] = useState(false);
  if (!dataset) {
    return null;
  }
  const handleOpenModal = () => {
    setShowModal(true);
  };

  return (
    <MainWrapper>
      <div className="flex flex-col h-full w-full">
        <CohortsHeader openModal={handleOpenModal} />
        <CohortList dataset={dataset} />
      </div>
      {showModal && (
        <SavePatientCohortModal
          showModal={showModal}
          setShowModal={setShowModal}
          dataset={dataset}
          mode={addMode}
        />
      )}
    </MainWrapper>
  );
};

export default page;
