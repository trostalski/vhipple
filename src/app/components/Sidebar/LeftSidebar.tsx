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
import useJoyRide from "@/app/hooks/useJoyRide";
import dynamic from "next/dynamic";
import Cookies from "universal-cookie";

const JoyRideNoSSR = dynamic(() => import("react-joyride"), { ssr: false });

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

  // handle joyride guided tour
  const { joyrideSidebar } = useJoyRide();
  const cookies = new Cookies();
  if (cookies.get("sidebar_joyride")) {
    joyrideSidebar.run = false;
  }

  if (!dataset) {
    return null;
  }

  const sidebarNavIcons = [
    {
      icon: <BiHomeAlt size={24} />,
      id: "overviewSidebarNavIcon",
      text: "Overview",
      pathname: `/datasets/${dataset.id}`,
      onClick: () => {
        router.push(`/datasets/${dataset.id}/`);
      },
    },
    {
      icon: <RxDashboard size={24} />,
      text: "Dashboard",
      id: "dashboardSidebarNavIcon",
      pathname: `/datasets/${dataset.id}/dashboard`,
      onClick: () => {
        router.push(`/datasets/${dataset.id}/dashboard`);
      },
    },
    {
      icon: <BsPeople size={24} />,
      text: "Patients",
      id: "patientsSidebarNavIcon",
      pathname: `/datasets/${dataset.id}/patients`,
      onClick: () => {
        router.push(`/datasets/${dataset.id}/patients`);
      },
    },
    {
      icon: <AiOutlineExport size={24} />,
      text: "Export",
      id: "exportSidebarNavIcon",
      pathname: `/datasets/${dataset.id}/export`,
      onClick: () => {
        router.push(`/datasets/${dataset.id}/export`);
      },
    },
    {
      icon: <AiOutlineSetting size={24} />,
      text: "Settings",
      id: "settingsSidebarNavIcon",
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
      <JoyRideNoSSR
        callback={(state) => {
          if (state.action === "close") {
            cookies.set("dataset_joyride", true, { path: "/" });
          }
        }}
        steps={joyrideSidebar.steps}
        run={joyrideSidebar.run}
        continuous={joyrideSidebar.continuous}
      />
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
            id={icon.id}
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
