import React, { useState } from "react";
import { PatientData } from "../../lib/patientData";
import Select from "react-select";
import {
  getCodedResourceDisplay,
  getObservationDateDisplay,
  getValueDisplay,
} from "../../lib/utils";
import ChartComp from "@/app/dashboard/components/ChartComp";
import { num2DExampleCards } from "@/app/dashboard/lib/constants";
import { onlyUnique } from "@/app/dashboard/lib/utils";
import { Observation } from "fhir/r4";
import { DashboardCard } from "@/app/dashboard/lib/types";

interface PatientLabGraphProps {
  patientData: PatientData;
}

const PatientObservationGraph = (props: PatientLabGraphProps) => {
  const observations = props.patientData.observations.filter(
    (observation) =>
      observation.valueQuantity &&
      observation.valueQuantity.value &&
      observation.valueQuantity.unit
  );
  const observationDisplays = observations.map((observation) =>
    getCodedResourceDisplay(observation)
  );
  const generateCard = (input: string, observations: Observation[]) => {
    const card: DashboardCard = {
      ...num2DExampleCards[0],
      title: input,
      showXLables: true,
      showYLables: true,
      data: {
        labels: observations.map((observation) =>
          getObservationDateDisplay(observation)
        ),
        datasets: [
          {
            data: observations.map((observation) =>
              getValueDisplay(observation, false)
            ),
          },
        ],
      },
    };
    return card;
  };
  const [card, setCard] = useState(
    generateCard(
      observationDisplays[0],
      observations.filter(
        (observation) =>
          getCodedResourceDisplay(observation) === observationDisplays[0]
      )
    )
  );

  return (
    <div className="flex flex-col bg-white rounded-md shadow-md p-4 overflow-scroll">
      <h1 className="text-3xl font-bold">Observations Graphs</h1>
      <div className="flex flex-row items-center justify-between p-4">
        <Select
          className="w-full"
          value={{
            value: card.title,
            label: card.title,
          }}
          options={observationDisplays.filter(onlyUnique).map((display) => ({
            value: display,
            label: display,
          }))}
          onChange={(e) => {
            if (e && e.value) {
              setCard(
                generateCard(
                  e.value,
                  observations.filter(
                    (observation) =>
                      getCodedResourceDisplay(observation) === e.value
                  )
                )
              );
            }
          }}
        />
      </div>
      <div className="p-4">
        <ChartComp card={card} />
      </div>
    </div>
  );
};

export default PatientObservationGraph;
