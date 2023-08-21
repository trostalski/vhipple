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
import { toastError, toastSuccess } from "@/app/lib/toasts";
import DataPointsRange from "../../components/DataPointsRange";
import {
  allPatientsCohortId,
  allPatientsCohortName,
  availableChartColours,
  defaultNumDataPoints,
} from "../../lib/constants";
import { generateUniqueId } from "@/app/lib/utils";
import { addDashboardCard, updateDashboardCard } from "@/app/db/utils";
import { addMode } from "@/app/datasets/lib/constants";

interface ChartEditorProps {
  mode: "add" | "edit";
  initialCard?: DashboardCard;
  patientCohorts: PatientCohort[];
  dataset: Dataset;
}

const ChartEditor = (props: ChartEditorProps) => {
  const { mode, initialCard, patientCohorts, dataset } = props;
  const [numDataPoints, setNumDataPoints] =
    useState<number>(defaultNumDataPoints);
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

  const addDataToCard = (baseCard: DashboardCard) => {
    const cardIsValid = validateDashboardCardInput(baseCard);
    if (!cardIsValid) {
      toastError("Invalid card input");
      return;
    }
    if (baseCard.cohortColorPalletes.length === 0) {
      baseCard.cohortColorPalletes.push({
        id: allPatientsCohortId,
        name: allPatientsCohortName,
        chartColour: availableChartColours[0].name,
      });
    }
    const usedPatientCohorts = patientCohorts.filter((pc) =>
      baseCard.cohortColorPalletes.map((d) => d.name).includes(pc.name)
    );
    let data = createChartJsDataForDashboardCard(
      usedPatientCohorts,
      baseCard,
      dataset,
      true
    );
    baseCard.data = data;
    return baseCard;
  };

  const showPreviewCard = (baseCard: DashboardCard) => {
    const card = addDataToCard(baseCard);
    if (!card || !card.data) return;
    card.data = sliceChartJsData(card.data, numDataPoints);
    const previewCard = { ...baseCard };
    setPreviewCard(previewCard);
  };

  const handleCreate = async () => {
    const finalCard = addDataToCard(card);
    if (!finalCard) return;
    finalCard.id = generateUniqueId();
    finalCard.createdAt = new Date().toISOString();
    finalCard.updatedAt = new Date().toISOString();
    finalCard.forDatasetId = dataset.id;
    const res = await addDashboardCard(finalCard);
    if (res) {
      toastSuccess("Card created");
    } else {
      toastError("Error creating card");
    }
  };

  const handleUpdate = async () => {
    const finalCard = addDataToCard(card);
    if (!finalCard) return;
    finalCard.updatedAt = new Date().toISOString();
    const res = await updateDashboardCard(finalCard.id, finalCard);
    if (res) {
      toastSuccess("Card updated");
    } else {
      toastError("Error updating card");
    }
  };

  useEffect(() => {
    if (!previewCard) return;
    if (!previewCard.data) return;
    showPreviewCard(previewCard);
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
        handleSave={mode === addMode ? handleCreate : handleUpdate}
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
