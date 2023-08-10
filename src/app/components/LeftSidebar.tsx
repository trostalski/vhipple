"use client";
import React, { useState } from "react";
import { RxDashboard, RxHamburgerMenu } from "react-icons/rx";
import { BsPeople, BsDatabase } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { AiOutlineSetting } from "react-icons/ai";

const LeftSidebar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  return (
    <nav
      className={`h-full relative shadow-md z-0 ${isOpen ? "w-64" : "w-16"}`}
    >
      <button
        className="absolute top-2 right-6"
        title="Toggle Menu"
        onClick={() => setIsOpen(!isOpen)}
      >
        <RxHamburgerMenu />
      </button>
      <div className="flex flex-col w-full items-start mt-12 gap-4">
        <button
          className="flex flex-row w-full items-center gap-4 p-4 hover:bg-gray-100 hover:rounded-xl"
          title="Datasets"
          onClick={() => router.push("/datasets")}
        >
          <BsDatabase size={24} />
          {isOpen && <span>Datasets</span>}
        </button>
        <button
          className="flex flex-row w-full items-center gap-4 p-4 hover:bg-gray-100 hover:rounded-xl"
          title="Dashboard"
          onClick={() => router.push("/dashboard")}
        >
          <RxDashboard size={24} />
          {isOpen && <span>Dashboard</span>}
        </button>
        <button
          className="flex flex-row w-full items-center gap-4 p-4 hover:bg-gray-100 hover:rounded-xl"
          title="Patients"
          onClick={() => router.push("/patients")}
        >
          <BsPeople size={24} />
          {isOpen && <span>Patients</span>}
        </button>
        {/* <button className="flex flex-row w-full items-center gap-4 p-4 hover:bg-gray-100 hover:rounded-xl"
          title="Settings"
          onClick={() => router.push("/settings")}
        >
          <AiOutlineSetting size={24} />
          {isOpen && <span>Settings</span>}
        </button> */}
      </div>
    </nav>
  );
};

export default LeftSidebar;
