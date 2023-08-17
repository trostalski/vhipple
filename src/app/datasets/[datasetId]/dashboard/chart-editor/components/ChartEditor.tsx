import React, { useState } from "react";
import ChartDataSettings from "./ChartDataSettings";
import { DashboardCard } from "../../lib/types";
import { defaultCard } from "../../lib/exampleCards";
import { Dataset, PatientCohort } from "@/app/datasets/lib/types";
import ChartDisplaySettings from "./ChartDisplaySettings";

interface ChartEditorProps {
  mode: "add" | "edit";
  initialCard?: DashboardCard;
  patientCohorts: PatientCohort[];
  dataset: Dataset;
}

const ChartEditor = (props: ChartEditorProps) => {
  const { mode, initialCard, patientCohorts, dataset } = props;
  const [card, setCard] = useState<DashboardCard>(
    initialCard || { ...defaultCard }
  );

  const patientCohortOptions = patientCohorts.map((pc) => ({
    value: pc.id,
    label: pc.name,
  }));

  return (
    <div
      id="ce-main-container"
      className="flex flex-row bg-white rounded-md h-full w-full"
    >
      <ChartDataSettings
        card={card}
        setCard={setCard}
        patientCohortOptions={patientCohortOptions}
        dataset={dataset}
      />
      <div className="flex flex-col h-full w-full">
        <div id="ce-display-container" className="w-full h-5/6"></div>
        <ChartDisplaySettings card={card} setCard={setCard} />
      </div>
    </div>
  );
};

export default ChartEditor;
