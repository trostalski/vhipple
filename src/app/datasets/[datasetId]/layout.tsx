"use client";
import LeftSidebar from "@/app/components/Sidebar/LeftSidebar";

import React from "react";

const layout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { datasetId: string };
}) => {
  const { datasetId } = params;

  return (
    <div className="h-full w-full flex flex-row">
      <LeftSidebar datasetId={datasetId} />
      <main className="h-full w-full">{children}</main>
    </div>
  );
};

export default layout;
