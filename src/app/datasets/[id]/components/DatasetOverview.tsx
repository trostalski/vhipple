import DashboardCardList from "@/app/dashboard/components/DashboardCardList";
import React from "react";
import { Dataset } from "../../lib/types";

interface DatasetOverviewProps {
  dataset: Dataset;
}

const DatasetOverview = (props: DatasetOverviewProps) => {
  const { dataset } = props;
  return <DashboardCardList dataset={dataset} />;
};

export default DatasetOverview;
