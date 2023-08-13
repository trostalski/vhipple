import React from "react";

interface TabProps {
  name: string;
  isActive: boolean;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const Tab = (props: TabProps) => {
  const { name, isActive, setActiveTab } = props;
  return (
    <button
      className={`${
        isActive
          ? "bg-primary-button text-white"
          : "transition hover:bg-primary-button-hover"
      } px-4 py-2 rounded-md w-full`}
      onClick={() => setActiveTab(name)}
    >
      {name}
    </button>
  );
};

interface DisplayTabsProps {
  displayTab: string;
  setDisplayTab: React.Dispatch<React.SetStateAction<string>>;
  availableDisplayTabs: string[];
}

export const DisplayTabs = (props: DisplayTabsProps) => {
  const { displayTab, setDisplayTab, availableDisplayTabs } = props;
  return (
    <div className="flex flex-col bg-white w-full rounded-md shadow-md">
      <div className="flex flex-row w-full justify-between">
        {availableDisplayTabs.map((tab) => (
          <Tab
            key={tab}
            name={tab}
            isActive={displayTab === tab}
            setActiveTab={setDisplayTab}
          />
        ))}
      </div>
    </div>
  );
};

export default DisplayTabs;
