"use client";
import React from "react";
import { RxDashboard } from "react-icons/rx";
import { BsPeople } from "react-icons/bs";
import { usePathname, useRouter } from "next/navigation";
import { AiOutlineSetting, AiOutlineExport } from "react-icons/ai";
import AnimatedBurger from "./AnimatedBurger";
import SidebarNavIcon from "./SidebarNavIcon";
import { useGlobalStore } from "@/app/stores/useGlobalStore";
import { useLiveQuery } from "dexie-react-hooks";
import { getDataset } from "@/app/db/utils";
import { BiHomeAlt } from "react-icons/bi";

interface LeftSidebarProps {
  datasetId: string;
}

const LeftSidebar = (props: LeftSidebarProps) => {
  const { sidebarOpen, setSidebarOpen } = useGlobalStore((state) => ({
    sidebarOpen: state.sidebarOpen,
    setSidebarOpen: state.setSidebarOpen,
  }));
  const router = useRouter();
  const pathname = usePathname();
  const dataset = useLiveQuery(() => getDataset(props.datasetId));

  if (!dataset) {
    return null;
  }

  const sidebarNavIcons = [
    {
      icon: <BiHomeAlt size={24} />,
      text: "Overview",
      pathname: `/datasets/${dataset.id}`,
      onClick: () => {
        router.push(`/datasets/${dataset.id}/`);
      },
    },
    {
      icon: <RxDashboard size={24} />,
      text: "Dashboard",
      pathname: `/datasets/${dataset.id}/dashboard`,
      onClick: () => {
        router.push(`/datasets/${dataset.id}/dashboard`);
      },
    },
    {
      icon: <BsPeople size={24} />,
      text: "Patients",
      pathname: `/datasets/${dataset.id}/patients`,
      onClick: () => {
        router.push(`/datasets/${dataset.id}/patients`);
      },
    },
    {
      icon: <AiOutlineExport size={24} />,
      text: "Export",
      pathname: `/datasets/${dataset.id}/export`,
      onClick: () => {
        router.push(`/datasets/${dataset.id}/export`);
      },
    },
    {
      icon: <AiOutlineSetting size={24} />,
      text: "Settings",
      pathname: `/datasets/${dataset.id}/settings`,
      onClick: () => {
        router.push(`/datasets/${dataset.id}/settings`);
      },
    },
  ];
  return (
    <nav
      className={`bg-sidebar-bg fixed w-[16vw] rounded-r-lg top-0 -left-[12vw] text-white text-sm h-full shadow-md z-0 ease-in-out duration-200 ${
        sidebarOpen ? "translate-x-[12vw]" : "translate-x-0"
      }`}
    >
      <div
        className={`flex flex-row items-center justify-center h-12 ${
          sidebarOpen ? "pr-8" : "pr-10"
        }`}
      >
        <button
          className={`text-2xl font-bold mx-auto ease-in-out duration-500 ${
            sidebarOpen ? "opacity-100" : "opacity-100"
          } hover:text-secondary-button-hover`}
          onClick={() => router.push("/")}
        >
          Vhipple
        </button>
        <AnimatedBurger isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      </div>
      {sidebarNavIcons.map((icon, index) => {
        return (
          <SidebarNavIcon
            key={index}
            icon={icon.icon}
            text={icon.text}
            onClick={icon.onClick}
            sidebarOpen={sidebarOpen}
            isActive={pathname === icon.pathname}
          />
        );
      })}
    </nav>
  );
};

export default LeftSidebar;
