"use client";
import React, { useState } from "react";
import { RxDashboard } from "react-icons/rx";
import { BsPeople, BsDatabase } from "react-icons/bs";
import { usePathname, useRouter } from "next/navigation";
import { AiOutlineSetting } from "react-icons/ai";
import AnimatedBurger from "./AnimatedBurger";
import SidebarNavIcon from "./SidebarNavIcon";
import { useGlobalStore } from "@/app/stores/useGlobalStore";

const LeftSidebar = () => {
  const { sidebarOpen, setSidebarOpen } = useGlobalStore((state) => ({
    sidebarOpen: state.sidebarOpen,
    setSidebarOpen: state.setSidebarOpen,
  }));
  const router = useRouter();
  const pathname = usePathname();

  const sidebarNavIcons = [
    {
      icon: <BsDatabase size={24} />,
      text: "Datasets",
      pathname: "/datasets",
      onClick: () => {
        router.push("/datasets");
      },
    },
    {
      icon: <RxDashboard size={24} />,
      text: "Dashboard",
      pathname: "/dashboard",
      onClick: () => {
        router.push("/dashboard");
      },
    },
    {
      icon: <BsPeople size={24} />,
      text: "Patients",
      pathname: "/patients",
      onClick: () => {
        router.push("/patients");
      },
    },
    {
      icon: <AiOutlineSetting size={24} />,
      text: "Settings",
      pathname: "/settings",
      onClick: () => {
        router.push("/settings");
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
        <span
          className={`text-2xl font-bold mx-auto ease-in-out duration-500 ${
            sidebarOpen ? "opacity-100" : "opacity-100"
          }`}
        >
          Vhipple
        </span>
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
