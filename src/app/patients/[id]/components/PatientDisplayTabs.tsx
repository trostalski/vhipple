import React from "react";

interface TabProps {
  name: string;
  isActive: boolean;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const Tab = (props: TabProps) => {
  return (
    <button
      className={`${
        props.isActive ? "bg-sky-600 text-white" : "hover:bg-sky-100"
      } px-4 py-2 rounded-md w-full`}
      onClick={() => props.setActiveTab(props.name)}
    >
      {props.name}
    </button>
  );
};

interface PatientDisplayTabsProps {
  displayTab: string;
  setDisplayTab: React.Dispatch<React.SetStateAction<string>>;
}

const PatientDisplayTabs = (props: PatientDisplayTabsProps) => {
  return (
    <div className="flex flex-col bg-white w-full rounded-md shadow-md">
      <div className="flex flex-row w-full justify-between">
        <Tab
          name="Overview"
          isActive={props.displayTab === "Overview"}
          setActiveTab={props.setDisplayTab}
        />
        <Tab
          name="Timeline"
          isActive={props.displayTab === "Timeline"}
          setActiveTab={props.setDisplayTab}
        />
        <Tab
          name="Network"
          isActive={props.displayTab === "Network"}
          setActiveTab={props.setDisplayTab}
        />
      </div>
    </div>
  );
};

export default PatientDisplayTabs;
