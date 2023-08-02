"use client";
import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { BsDatabase } from "react-icons/bs";
import { RxDashboard } from "react-icons/rx";
import { BsPeople } from "react-icons/bs";
import { useRouter } from "next/navigation";

const LeftSidebar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  return (
    <nav
      className={`h-full relative shadow-md z-0 ${isOpen ? "w-64" : "w-16"}`}
    >
      <button
        className="absolute top-2 right-6"
        onClick={() => setIsOpen(!isOpen)}
      >
        <RxHamburgerMenu />
      </button>
      <div className="flex flex-col w-full items-start mt-12 gap-4">
        <button
          className="flex flex-row w-full items-center gap-4 p-4 hover:bg-gray-100 hover:rounded-xl"
          onClick={() => router.push("/datasets")}
        >
          <BsDatabase size={24} />
          {isOpen && <span>Datasets</span>}
        </button>
        <button
          className="flex flex-row w-full items-center gap-4 p-4 hover:bg-gray-100 hover:rounded-xl"
          onClick={() => router.push("/dashboard")}
        >
          <RxDashboard size={24} />
          {isOpen && <span>Dashboard</span>}
        </button>
        <button
          className="flex flex-row w-full items-center gap-4 p-4 hover:bg-gray-100 hover:rounded-xl"
          onClick={() => router.push("/patients")}
        >
          <BsPeople size={24} />
          {isOpen && <span>Patients</span>}
        </button>
      </div>
    </nav>
  );
};

export default LeftSidebar;
