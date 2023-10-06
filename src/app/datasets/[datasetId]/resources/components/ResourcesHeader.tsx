"use client";
import React from "react";

interface ResourcesHeaderProps {}

const ResourcesHeader = (props: ResourcesHeaderProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-4 justify-between items-center h-12">
        <h1 className="text-3xl font-bold">Resources</h1>
      </div>
      <div className="flex flex-row"></div>
    </div>
  );
};

export default ResourcesHeader;
