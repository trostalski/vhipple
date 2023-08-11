"use client";
import React from "react";
import { useGlobalStore } from "../stores/useGlobalStore";

interface MainWrapperProps {
  children: React.ReactNode;
}

const MainWrapper = (props: MainWrapperProps) => {
  const sidebarOpen = useGlobalStore((state) => state.sidebarOpen);
  return (
    <div
      className={`container mx-auto h-full w-full py-6 overflow-y-scroll overflow-x-clip pr-[4vw] transition-all ${
        sidebarOpen ? "pl-[20vw]" : "pl-[8vw]"
      }`}
    >
      {props.children}
    </div>
  );
};

export default MainWrapper;
