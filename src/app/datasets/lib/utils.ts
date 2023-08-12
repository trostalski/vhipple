import { datasetDefaultCards } from "@/app/dashboard/lib/exampleCards";
import { Dataset } from "./types";
import { createChartJsDataForDashboardCard } from "@/app/dashboard/lib/utils";
import { addDashboardCards } from "@/app/db/utils";
import { generateUniqueId } from "@/app/lib/utils";

export const generateDefaultDatasetDashboardCards = async (
  dataset: Dataset
) => {
  const newCards = [];
  for (let i = 0; i < datasetDefaultCards.length; i++) {
    console.log(i);
    const newCard = { ...datasetDefaultCards[i] };
    const data = createChartJsDataForDashboardCard([dataset], newCard);
    newCard.forDatasetId = dataset.id;
    newCard.data = data;
    newCard.positionIndex = i;
    newCard.createdAt = new Date().toISOString();
    newCard.updatedAt = new Date().toISOString();
    newCard.id = generateUniqueId();
    newCards.push(newCard);
  }
  await addDashboardCards(newCards);
};
