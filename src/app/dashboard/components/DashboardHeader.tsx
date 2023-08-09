"use client";
import React, { useState } from "react";
import AddCardModal from "./AddCardModal";
import { addMode } from "@/app/datasets/lib/constants";
import { BiRefresh } from "react-icons/bi";

const DashboardHeader = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="flex flex-row justify-between items-center h-12">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <button
        className=""
        onClick={() => {
          window.location.reload();
        }}
      >
        <BiRefresh size={48} />
      </button>
      <span className="grow" />
      <button
        className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded"
        onClick={() => setShowModal(true)}
      >
        New Card
      </button>
      {showModal && (
        <AddCardModal
          showModal={showModal}
          setShowModal={setShowModal}
          mode={addMode}
        />
      )}
    </div>
  );
};

export default DashboardHeader;
