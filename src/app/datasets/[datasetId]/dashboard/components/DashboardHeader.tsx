"use client";
import React, { useState } from "react";
import { addMode } from "@/app/datasets/lib/constants";
import { BiRefresh } from "react-icons/bi";
import { usePathname, useRouter } from "next/navigation";

const DashboardHeader = () => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const path = usePathname();
  return (
    <div className="flex flex-row justify-between items-center h-12 shrink-0">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <span className="grow" />
      <button
        className="bg-primary-button text-white font-bold py-2 px-4 rounded transition hover:bg-primary-button-hover"
        onClick={() => router.push(path + "/chart-editor")}
      >
        New Card
      </button>
    </div>
  );
};

export default DashboardHeader;
