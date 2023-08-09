import React, { useState } from "react";
import { PatientData } from "../../lib/patientData";
import {
  AllergyIntolerance,
  CarePlan,
  Condition,
  Immunization,
  Medication,
  MedicationRequest,
  Observation,
  Procedure,
} from "fhir/r4";
import {
  getCodedResourceDisplay,
  getConditionDateDisplay,
  getImmunizationDisplay,
  getMedicationRequestDateDisplay,
  getMedicationRequestDisplay,
  getYYYYMMDD,
} from "../../lib/utils";
import { MdOutlineExpandMore } from "react-icons/md";

interface PatientResourcesProps {
  patientData: PatientData;
}

interface ConditionTabProps {
  conditions: Condition[];
}

interface ObservationTabProps {
  observations: Observation[];
}

interface MedicationTabProps {
  medications: MedicationRequest[];
}

interface ProcedureTabProps {
  procedures: Procedure[];
}

interface ImmunizationTabProps {
  immunizations: Immunization[];
}

interface AllergyTabProps {
  allergies: AllergyIntolerance[];
}

const ConditionTab = (props: ConditionTabProps) => {
  const displayConditionMap: Map<string, Condition[]> = new Map();
  const [showList, setShowList] = useState(true);

  props.conditions.forEach((condition) => {
    const display = getCodedResourceDisplay(condition);
    if (displayConditionMap.has(display)) {
      displayConditionMap.get(display)?.push(condition);
    } else {
      displayConditionMap.set(display, [condition]);
    }
  });

  return (
    <div>
      {props.conditions.length === 0 ? (
        <span className="text-gray-500">No conditions.</span>
      ) : (
        Array.from(displayConditionMap.keys()).map((display) => (
          <div className="flex flex-col">
            <div className="flex flex-row items-center">
              <button onClick={() => setShowList(!showList)}>
                <MdOutlineExpandMore />
              </button>
              <span className="font-bold">{display}</span>
            </div>
            <div className="flex flex-col px-8">
              {showList &&
                displayConditionMap
                  .get(display)
                  ?.sort((condition) => {
                    const date = getConditionDateDisplay(condition);
                    return date === "Unknown" ? 1 : -1;
                  })
                  .map((condition) => (
                    <span className="text-xs">
                      {getConditionDateDisplay(condition)}
                    </span>
                  ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const PrescriptionTab = (props: MedicationTabProps) => {
  const displayMedicationMap: Map<string, MedicationRequest[]> = new Map();

  props.medications.forEach((medication) => {
    const display = getMedicationRequestDisplay(medication);
    if (displayMedicationMap.has(display)) {
      displayMedicationMap.get(display)?.push(medication);
    } else {
      displayMedicationMap.set(display, [medication]);
    }
  });

  return (
    <div>
      {props.medications.length === 0 ? (
        <span className="text-gray-500">No medications.</span>
      ) : (
        Array.from(displayMedicationMap.keys()).map((display) => (
          <div className="flex flex-col">
            <span className="font-bold">{display}</span>
            {displayMedicationMap
              .get(display)
              ?.sort((medication) => {
                const date = getMedicationRequestDisplay(medication);
                return date === "Unknown" ? 1 : -1;
              })
              .map((medication) => (
                <span className="text-xs">
                  {getMedicationRequestDateDisplay(medication)}
                </span>
              ))}
          </div>
        ))
      )}
    </div>
  );
};

const ObservationTab = (props: ObservationTabProps) => {
  return (
    <div>
      {props.observations.length === 0 ? (
        <span className="text-gray-500">No observations.</span>
      ) : (
        props.observations.map((observation) => (
          <div>{getCodedResourceDisplay(observation)}</div>
        ))
      )}
    </div>
  );
};

const ProcedureTab = (props: ProcedureTabProps) => {
  return (
    <div>
      {props.procedures.length === 0 ? (
        <span className="text-gray-500">No procedures.</span>
      ) : (
        props.procedures.map((procedure) => (
          <div>{getCodedResourceDisplay(procedure)}</div>
        ))
      )}
    </div>
  );
};

const ImmunizationTab = (props: ImmunizationTabProps) => {
  return (
    <div>
      {props.immunizations.length === 0 ? (
        <span className="text-gray-500">No immunizations.</span>
      ) : (
        props.immunizations.map((immunization) => (
          <div>{getImmunizationDisplay(immunization)}</div>
        ))
      )}
    </div>
  );
};

const AllergyTab = (props: AllergyTabProps) => {
  return (
    <div>
      {props.allergies.length === 0 ? (
        <span className="text-gray-500">No allergies.</span>
      ) : (
        props.allergies.map((allergy) => (
          <div>{getCodedResourceDisplay(allergy)}</div>
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
      comp: ConditionTab,
      props: { conditions: props.patientData.conditions },
    },
    {
      name: "Prescriptions",
      comp: PrescriptionTab,
      props: { medications: props.patientData.medicationRequests },
    },
    {
      name: "Observations",
      comp: ObservationTab,
      props: { observations: props.patientData.observations },
    },
    {
      name: "Procedures",
      comp: ProcedureTab,
      props: { procedures: props.patientData.procedures },
    },
    {
      name: "Immunizations",
      comp: ImmunizationTab,
      props: { immunizations: props.patientData.immunizations },
    },
    {
      name: "Allergies",
      comp: AllergyTab,
      props: { allergies: props.patientData.allergies },
    },
  ];
  console.log(props.patientData.medications);
  return (
    <div className="flex flex-col bg-white w-full h-full rounded-md shadow-md p-4 overflow-scroll">
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
        {tabs[selectedTab].comp(tabs[selectedTab].props as any)}
      </div>
    </div>
  );
};

export default PatientResources;
