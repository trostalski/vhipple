import { datasetDefaultCards } from "@/app/datasets/[datasetId]/dashboard/lib/exampleCards";
import { Dataset, ResourceContainer } from "./types";
import { createChartJsDataForDashboardCard } from "@/app/datasets/[datasetId]/dashboard/lib/utils";
import { addDashboardCards } from "@/app/db/utils";
import { generateUniqueId } from "@/app/lib/utils";
import {
  allPatientsCohortId,
  availableChartColours,
} from "../[datasetId]/dashboard/lib/constants";

export const generateDefaultDatasetDashboardCards = async (
  dataset: Dataset
) => {
  const newCards = [];
  for (let i = 0; i < datasetDefaultCards.length; i++) {
    const newCard = { ...datasetDefaultCards[i] };
    const data = createChartJsDataForDashboardCard([], newCard, dataset, true);
    newCard.forDatasetId = dataset.id;
    newCard.cohortColorPalletes = [
      {
        id: allPatientsCohortId,
        chartColour:
          availableChartColours[i % availableChartColours.length].name,
        name: dataset.name,
      },
    ];
    newCard.data = data;
    newCard.positionIndex = i;
    newCard.createdAt = new Date().toISOString();
    newCard.updatedAt = new Date().toISOString();
    newCard.id = generateUniqueId();
    newCards.push(newCard);
  }
  await addDashboardCards(newCards);
};

export const getConnectedResourcesForResourceContainer = (
  resourceContainer: ResourceContainer,
  includeSource?: boolean
) => {
  includeSource = includeSource || false;
  let connectedResources = [
    ...resourceContainer.referencedBy,
    ...resourceContainer.references,
  ];
  if (includeSource) {
    connectedResources.push(resourceContainer.resource);
  }
  return connectedResources;
};
