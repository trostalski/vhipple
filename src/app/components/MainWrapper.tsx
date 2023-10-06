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
      className={`mx-auto h-full w-full py-2 overflow-y-scroll overflow-x-clip pr-[4vw] transition-all ${
        sidebarOpen ? "pl-56" : "pl-20"
      } `}
    >
      {props.children}
    </div>
  );
};

export default MainWrapper;
