import React, { useState } from "react";
import { IoAdd } from "react-icons/io5";
import SavePatientCohortModal from "./SavePatientCohortModal";

interface CohortsHeaderProps {
  openModal: () => void;
}

const CohortsHeader = (props: CohortsHeaderProps) => {
  const { openModal } = props;
  return (
    <div className="flex flex-row gap-4 justify-between items-center h-12">
      <h1 className="text-3xl font-bold">Cohorts</h1>
      <span className="grow" />
      <button
        className="bg-primary-button text-white font-bold py-2 px-4 rounded transition hover:bg-primary-button-hover"
        onClick={openModal}
      >
        <IoAdd className="" size={24} />
      </button>
    </div>
  );
};

export default CohortsHeader;
