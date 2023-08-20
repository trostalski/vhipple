import React, { useState } from "react";
import { PatientData } from "../../lib/patientData";
import { MdOutlineExpandMore, MdOutlineExpandLess } from "react-icons/md";
import {
  getCodedResourceDisplay,
  getConditionDateDisplay,
  getImmunizationDisplay,
  getMedicationRequestDateDisplay,
  getMedicationRequestDisplay,
  getObservationDateDisplay,
  getOccurrenceDateDisplay,
  getPerformedDateDisplay,
  getValueDisplay,
} from "../../lib/utils";

interface PatientResourcesProps {
  patientData: PatientData;
}

interface TabContentProps<T> {
  name: string;
  resources: T[];
  getDisplay: (resource: T) => string;
  getDateDisplay: (resource: T) => string;
  getValueDisplay?: (resource: T) => string;
}

const TabContent = <T extends unknown>(props: TabContentProps<T>) => {
  const displayResourceMap: Map<string, T[]> = new Map();

  props.resources.forEach((resource) => {
    const display = props.getDisplay(resource);
    if (displayResourceMap.has(display)) {
      displayResourceMap.get(display)?.push(resource);
    } else {
      displayResourceMap.set(display, [resource]);
    }
  });

  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  return (
    <div>
      {props.resources.length === 0 ? (
        <span className="text-gray-500">No {props.name}.</span>
      ) : (
        Array.from(displayResourceMap.keys()).map((display) => (
          <div key={display} className="flex flex-col">
            <button
              className="flex items-center hover:underline"
              onClick={() =>
                setExpandedItems(
                  expandedItems.includes(display)
                    ? expandedItems.filter((item) => item !== display)
                    : [...expandedItems, display]
                )
              }
            >
              {expandedItems.includes(display) ? (
                <MdOutlineExpandLess />
              ) : (
                <MdOutlineExpandMore />
              )}
              <span className="">{display}</span>
            </button>
            <div className="flex flex-col px-8">
              {expandedItems.includes(display) &&
                displayResourceMap
                  .get(display)
                  ?.sort((a, b) => {
                    const dateA = props.getDateDisplay(a);
                    const dateB = props.getDateDisplay(b);
                    return dateA > dateB ? -1 : 1;
                  })
                  .map((resource, i) => (
                    <div key={i} className="flex flex-row items-center">
                      <span className="w-24 text-gray-500">
                        {props.getDateDisplay(resource)}
                      </span>
                      {props.getValueDisplay && (
                        <span className="font-bold">
                          {props.getValueDisplay(resource)}
                        </span>
                      )}
                    </div>
                  ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const PatientResources = (props: PatientResourcesProps) => {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const tabs = [
    {
      name: "Conditions",
      resources: props.patientData.conditions,
      getDisplay: getCodedResourceDisplay,
      getDateDisplay: getConditionDateDisplay,
    },
    {
      name: "Prescriptions",
      resources: props.patientData.medicationRequests,
      getDisplay: getMedicationRequestDisplay,
      getDateDisplay: getMedicationRequestDateDisplay,
    },
    {
      name: "Observations",
      resources: props.patientData.observations,
      getDisplay: getCodedResourceDisplay,
      getDateDisplay: getObservationDateDisplay,
      getValueDisplay: getValueDisplay,
    },
    {
      name: "Procedures",
      resources: props.patientData.procedures,
      getDisplay: getCodedResourceDisplay,
      getDateDisplay: getPerformedDateDisplay,
    },
    {
      name: "Immunizations",
      resources: props.patientData.immunizations,
      getDisplay: getImmunizationDisplay,
      getDateDisplay: getOccurrenceDateDisplay,
    },
    {
      name: "Allergies",
      resources: props.patientData.allergies,
      getDisplay: getCodedResourceDisplay,
      getDateDisplay: getConditionDateDisplay,
    },
  ];

  return (
    <div className="flex flex-col bg-white rounded-md shadow-md p-4">
      <h1 className="text-3xl font-bold">All Info</h1>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row gap-4">
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`hover:cursor-pointer hover:border-b-2 hover:border-blue-300 ${
                selectedTab === index ? "border-b-2 border-blue-500" : ""
              }`}
              onClick={() => setSelectedTab(index)}
            >
              <span>{tab.name}</span>
            </div>
          ))}
        </div>
      </div>
      <hr className="border-blue-200 my-2" />
      <div className="h-96 overflow-scroll">
        <TabContent
          name={tabs[selectedTab].name}
          getDisplay={tabs[selectedTab].getDisplay as any}
          resources={tabs[selectedTab].resources as any}
          getDateDisplay={tabs[selectedTab].getDateDisplay as any}
          getValueDisplay={tabs[selectedTab].getValueDisplay as any}
        />
      </div>
    </div>
  );
};

export default PatientResources;
