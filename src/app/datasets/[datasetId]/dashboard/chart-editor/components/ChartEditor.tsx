import React, { useEffect, useState } from "react";
import ChartDataSettings from "./ChartDataSettings";
import { DashboardCard } from "../../lib/types";
import { defaultCard } from "../../lib/exampleCards";
import { Dataset, PatientCohort } from "@/app/datasets/lib/types";
import ChartDisplaySettings from "./ChartDisplaySettings";
import ChartComp from "../../components/ChartComp";
import {
  createChartJsDataForDashboardCard,
  sliceChartJsData,
  validateDashboardCardInput,
} from "../../lib/utils";
import { toastError } from "@/app/lib/toasts";
import DataPointsRange from "../../components/DataPointsRange";
import {
  allPatientsCohortId,
  allPatientsCohortName,
  availableChartColours,
} from "../../lib/constants";

interface ChartEditorProps {
  mode: "add" | "edit";
  initialCard?: DashboardCard;
  patientCohorts: PatientCohort[];
  dataset: Dataset;
}

const ChartEditor = (props: ChartEditorProps) => {
  const { mode, initialCard, patientCohorts, dataset } = props;
  const [numDataPoints, setNumDataPoints] = useState<number>(20);
  const [card, setCard] = useState<DashboardCard>(
    initialCard || { ...defaultCard }
  );
  const [previewCard, setPreviewCard] = useState<DashboardCard | undefined>(
    undefined
  );

  const patientCohortOptions = patientCohorts.map((pc) => ({
    value: pc.id,
    label: pc.name,
  }));

  const showPreviewCard = () => {
    const cardIsValid = validateDashboardCardInput(card);
    if (!cardIsValid) {
      toastError("Invalid card input");
      return;
    }
    if (card.cohortColorPalletes.length === 0) {
      card.cohortColorPalletes.push({
        id: allPatientsCohortId,
        name: allPatientsCohortName,
        chartColour: availableChartColours[0].name,
      });
    }
    const usedPatientCohorts = patientCohorts.filter((pc) =>
      card.cohortColorPalletes.map((d) => d.name).includes(pc.name)
    );
    let data = createChartJsDataForDashboardCard(
      usedPatientCohorts,
      card,
      dataset,
      true
    );
    data = sliceChartJsData(data, numDataPoints);
    card.data = data;
    const previewCard = { ...card };
    setPreviewCard(previewCard);
  };

  useEffect(() => {
    if (!previewCard) return;
    if (!previewCard.data) return;
    showPreviewCard();
  }, [numDataPoints]);

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
        showPreviewCard={showPreviewCard}
      />
      {previewCard && (
        <div className="flex flex-col h-full w-full">
          <div id="ce-display-container" className="w-full p-4 h-5/6">
            <ChartComp card={previewCard} />
          </div>
          <DataPointsRange
            card={previewCard}
            numDataPoints={numDataPoints}
            setNumDataPoints={setNumDataPoints}
          />
          <hr className="w-full my-2" />
          <div className="grid grid-cols-5 pt-4 w-full h-1/12 px-32">
            <ChartDisplaySettings card={previewCard} setCard={setPreviewCard} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChartEditor;
