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

const PatientDisplayTabs = () => {
  // create a tab bar for "Overview", "Timeline" and "Patient Network"
  const [activeTab, setActiveTab] = React.useState("Overview");
  return (
    <div className="flex flex-col bg-white w-full rounded-md shadow-md">
      <div className="flex flex-row w-full justify-between">
        <Tab
          name="Overview"
          isActive={activeTab === "Overview"}
          setActiveTab={setActiveTab}
        />
        <Tab
          name="Timeline"
          isActive={activeTab === "Timeline"}
          setActiveTab={setActiveTab}
        />
        <Tab
          name="Patient Network"
          isActive={activeTab === "Patient Network"}
          setActiveTab={setActiveTab}
        />
      </div>
    </div>
  );
};

export default PatientDisplayTabs;
