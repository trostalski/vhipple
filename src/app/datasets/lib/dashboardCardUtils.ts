import { updateDataset } from "@/app/db/utils";
import { DashboardCard } from "../[datasetId]/dashboard/lib/types";
import { Dataset } from "./types";

export const updateDashboardCard = async (
  dashboardCard: DashboardCard,
  dataset: Dataset
) => {
  dataset.dashboardCards = dataset.dashboardCards.map((dc) => {
    if (dc.id === dashboardCard.id) {
      return dashboardCard;
    } else {
      return dc;
    }
  });
  const res = await updateDataset(dataset.id, dataset);
  return res;
};

export const deleteDashboardCard = async (
  dashboardCardId: string,
  dataset: Dataset
) => {
  dataset.dashboardCards = dataset.dashboardCards.filter(
    (dc) => dc.id !== dashboardCardId
  );
  const res = await updateDataset(dataset.id, dataset);
  return res;
};

export const getDashboardCard = (dashboardCardId: string, dataset: Dataset) => {
  const dashboardCard = dataset.dashboardCards.find(
    (dc) => dc.id === dashboardCardId
  );
  return dashboardCard;
};

export const addDashboardCard = async (
  dashboardCard: DashboardCard,
  dataset: Dataset
) => {
  dataset.dashboardCards.push(dashboardCard);
  const res = await updateDataset(dataset.id, dataset);
  return res;
};
